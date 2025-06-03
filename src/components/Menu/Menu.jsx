import './Menu.scss';
import { useRef, useEffect } from 'react';

const Menu = ({ headerHeight }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        if (menuRef.current && headerHeight) {
            menuRef.current.style.top = `${headerHeight}px`;
        }
    }, [headerHeight]);

    return (
        <div className="menu" ref={menuRef}>
            <h1>Menu</h1>
        </div>
    )
}

export default Menu;