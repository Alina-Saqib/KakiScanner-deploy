
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProviderScan from './components/ProviderScan'
import ScanGames from './components/ScanGames'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

import WinPage from './components/WinPage'


function App() {

  
  

  return (
  <>
  <ToastContainer/>
    <Routes>
      <Route path='/*' element={<Navigate to="/"/>}/>
      <Route path='/scan-games' element={<ScanGames/>}/>
      <Route path='/select-provider' element={<ProviderScan/>}/>
      <Route path='/success-cheat/:id' element={<WinPage/>}/>
    <Route path='/' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
