
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProviderScan from './components/ProviderScan'
import ScanGames from './components/ScanGames'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

import WinPage from './components/WinPage'
import { useState } from 'react'


function App() {

  
  const [isLogin , setIsLogin] = useState(Boolean(localStorage.getItem('isLogin')))

  const handleIsLogin = () =>{

    setIsLogin(true);
  }

  

  return (
  <>
  <ToastContainer/>
    <Routes>
      <Route path='/*' element={<Navigate to="/"/>}/>
      
     {isLogin ? 
     <>
     <Route path='/' element={<ScanGames/>}/>
      <Route path='/select-provider' element={<ProviderScan/>}/>
      <Route path='/success-cheat/:id' element={<WinPage/>}/>
      </> :
      <Route path='/' element={<Login handleIsLogin={handleIsLogin}/>}/>
      }
    
    </Routes>
    </>
  )
}

export default App
