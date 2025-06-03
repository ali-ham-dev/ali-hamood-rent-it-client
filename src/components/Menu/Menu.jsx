import './Menu.scss';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// TODO: add correct paths.
// TODO: notifications should change appearance when unReadNotifications is true.
const Menu = ({ headerHeight, setDisplayMenu, unReadNotifications }) => {
    const handleClick = (e) => {
        setDisplayMenu(false);
    }

    const menuRef = useRef(null);
    const menuItems = [
        {
            label: 'Settings',
            path: '/',
            onClick: handleClick,
        },
        {
            label: 'User Profile',
            path: '/',
            onClick: handleClick,
        }, 
        {
            label: 'Inbox',
            path: '/',
            onClick: handleClick,
        },
        {
            label: 'Post a Rental',
            path: '/asset/make-ad',
            onClick: handleClick,
        },
        {
            label: 'Manage Rented Assets',
            path: '/',
            onClick: handleClick,
        },
        {
            label: 'Manage Assets for Rent',
            path: '/',
            onClick: handleClick,
        }
    ];

    const renderMenuItems = () => {
        return menuItems.map((item, index) => (
            <div className='menu__item' key={index}>
                <Link to={item.path} key={index}>
                    <button className='menu__button' onClick={item.onClick}>{item.label}</button>
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