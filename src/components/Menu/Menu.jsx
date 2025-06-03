import './Menu.scss';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// TODO: add correct paths.
// TODO: notifications should change appearance when unReadNotifications is true.
const Menu = ({ headerHeight, unReadNotifications }) => {
    const menuRef = useRef(null);
    const menuItems = [
        {
            label: 'Settings',
            path: '/',
        },
        {
            label: 'User Profile',
            path: '/',
        }, 
        {
            label: 'Inbox',
            path: '/',
        },
        {
            label: 'Post a Rental',
            path: '/',
        },
        {
            label: 'Manage Rented Assets',
            path: '/',
        },
        {
            label: 'Manage Assets for Rent',
            path: '/',
        }
    ];

    const renderMenuItems = () => {
        return menuItems.map((item, index) => (
            <div className='menu__item' key={index}>
                <Link to={item.path} key={index}>
                    <button className='menu__button'>{item.label}</button>
                </Link>
            </div>
        ));
    }

    useEffect(() => {
        if (menuRef.current && headerHeight) {
            menuRef.current.style.top = `${headerHeight}px`;
        }
    }, [headerHeight]);

    return (
        <div className="menu" ref={menuRef}>
            {renderMenuItems()} 
        </div>
    )
}

export default Menu;