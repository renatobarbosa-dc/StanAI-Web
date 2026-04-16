import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-button-container">
      <button className="theme-button" onClick={toggleTheme}>
        {theme === 'dark' ? <Moon size="1.2rem" /> : <Sun size="1.2rem" />}
      </button>
    </div>
  );
};