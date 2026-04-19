import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // এটি যোগ করুন
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <App /> কে BrowserRouter দিয়ে ঘিরে দিন */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)