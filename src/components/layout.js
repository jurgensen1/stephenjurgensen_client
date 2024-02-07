import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

export const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <div className='container'>{children}</div>
        <Footer />
    </div>
  )
}
