import React from 'react'
import logo from './../logo.svg'

const Layout = ({ children }) => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            {children}
        </div>
    )
}

export default Layout
