import React from 'react'
import ReactDOM from 'react-dom/client'
import { AdminProvider } from './context/AdminContext'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>,
)
