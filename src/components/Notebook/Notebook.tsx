import { Ball } from "./Ball";
import { Form } from "../Form/Form";
import { Loading } from "../Loading/Loading";
import { Chat } from "../Chat/Chat";
import { useState, useEffect } from "react";
import "./Notebook.css";

type View = "home" | "loading" | "chat";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  wikiUrl: string;
  messages: Message[];
}

interface NotebookProps {
  activeChat: ChatSession | null;
  onSaveChat: (chat: ChatSession) => void;
}

type Chat200 = {
  wiki_url: string;
  answer: string;
  sources: { title: string; section: string }[];
  used_legacy_vector_store: boolean;
};

type Chat202 = {
  indexing: true;
  job_id: string;
  wiki_base_url: string;
  message: string;
  status_url: string;
};

type JobStatus = {
  job_id: string;
  wiki_base_url: string;
  status: "queued" | "running" | "completed" | "failed";
  error?: string | null;
  created_at: number;
  finished_at?: number | null;
};

const API_BASE = "http://localhost:8000";

export function Notebook({ activeChat, onSaveChat }: NotebookProps) {
  const [view, setView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [wikiUrl, setWikiUrl] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages);
      setWikiUrl(activeChat.wikiUrl);
      setView("chat");
    } else {
      setMessages([]);
      setWikiUrl("");
      setView("home");
    }
  }, [activeChat?.id]);

  async function postChat(url: string, question: string): Promise<Chat200 | Chat202> {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wiki_url: url,
        message: question,
        auto_ingest: true,
      }),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 202) {
      return data;
    }

    throw new Error(data?.detail ?? `Erro HTTP ${response.status}`);
  }

  async function pollIngest(statusUrl: string, timeoutMs = 120000): Promise<void> {
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
      const res = await fetch(`${API_BASE}${statusUrl}`);
      if (!res.ok) throw new Error(`Falha ao consultar ingestão (${res.status})`);

      const job: JobStatus = await res.json();

      if (job.status === "completed") return;
      if (job.status === "failed") throw new Error(job.error || "Ingestão falhou");

      await new Promise((r) => setTimeout(r, 1500));
    }

    throw new Error("Timeout aguardando ingestão concluir");
  }

  async function askWithAutoIngest(url: string, question: string): Promise<Chat200> {
    const first = await postChat(url, question);

    if ("answer" in first) return first; // 200

    // 202 -> aguarda ingestão e repete pergunta
    await pollIngest(first.status_url);

    const second = await postChat(url, question);
    if ("answer" in second) return second;

    throw new Error("Índice ainda em construção, tente novamente em instantes.");
  }

  const handleSubmit = async (url: string, question: string) => {
    try {
      setWikiUrl(url);
      setView("loading");

      const data = await askWithAutoIngest(url, question);

      const newMessages: Message[] = [
        { role: "user", content: question },
        { role: "ai", content: data.answer },
      ];

      setMessages(newMessages);
      setView("chat");

      onSaveChat({
        id: crypto.randomUUID(),
        title: question.slice(0, 30),
        wikiUrl: url,
        messages: newMessages,
      });
    } catch (err) {
      setView("home");
      console.error(err);
      alert(err instanceof Error ? err.message : "Erro inesperado no chat");
    }
  };

  const handleNewMessage = async (question: string) => {
    const updated: Message[] = [...messages, { role: "user", content: question }];
    setMessages(updated);
    setIsTyping(true);

    try {
      const data = await askWithAutoIngest(wikiUrl, question);

      const final: Message[] = [...updated, { role: "ai", content: data.answer }];
      setMessages(final);

      if (activeChat) {
        onSaveChat({ ...activeChat, messages: final });
      }
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Erro inesperado no chat");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="notebook">
      <Ball visible={view !== "loading"} />

      <div className="main-container">
        {view === "home" && (
          <>
            <div className="logo-container">
              <img className="logo-svg" src="src/assets/stan_dark.png" />
              <div className="logo-title">StanAI</div>
            </div>
            <div className="forms-container">
              <Form onSubmit={handleSubmit} />
            </div>
          </>
        )}

        {view === "chat" && (
          <Chat
            messages={messages}
            wikiUrl={wikiUrl}
            onNewMessage={handleNewMessage}
            isTyping={isTyping}
          />
        )}
      </div>

      {view === "loading" && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
    </div>
  );
}