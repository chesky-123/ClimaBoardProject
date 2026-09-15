import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

