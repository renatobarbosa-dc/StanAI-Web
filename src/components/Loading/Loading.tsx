import { PuffLoader } from 'react-spinners'

export function Loading() {
  return (
    <div className="loading-container">
      <PuffLoader color="#4a7c59" size={'10rem'} />
    </div>
  )
}