import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
function List(props) {
    return (
        <div className="list">
            <div className="appGlass">
                <Sidebar />
                <div className="homeContainer" style={{ overflowX: 'auto' }}>
                    are you oke girl
                    <Navbar />
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default List