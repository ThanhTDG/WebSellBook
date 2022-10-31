import React from 'react'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import "./layout.scss"

function Layout(props) {
    return (
        <div className='content'>
            <div className="appGlass">
                <Sidebar />
                <div className="container" >
                    <Navbar />
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default Layout