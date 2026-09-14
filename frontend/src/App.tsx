import React from 'react'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='' element />
        <Route path='*' element={<div>404 not found</div>} />
      </Route>
    </Routes>
  )
}
