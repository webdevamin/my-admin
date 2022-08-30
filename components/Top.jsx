import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export const Top = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (toggle) => {
        setShowMenu(toggle);
    }

    return (
        <>
            <Header toggleMenu={toggleMenu} showMenu={showMenu} />
            <Sidebar show={showMenu} toggleMenu={toggleMenu} />
        </>
    )
}
