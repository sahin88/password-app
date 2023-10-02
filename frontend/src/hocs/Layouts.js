import React from 'react'
import Navbar from '../components/Navigationbar'

export default function Layout(props) {
    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
}