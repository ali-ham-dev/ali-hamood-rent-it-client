import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Menu from '../Menu/Menu';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = ({ isLoggedIn, userData, clearAllUserData}) => {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(84);

    const updateHeaderHeight = () => {
        if (headerRef.current) {
            const headerHeight = headerRef.current.offsetHeight;
            setHeaderHeight(headerHeight);
        }
    }

    useEffect(() => {
        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
        };
    }, []);

    const handleLogout = () => {
        clearAllUserData && clearAllUserData();
        navigate('/');
    }
    
    const handleMenu = () => {
        setDisplayMenu(!displayMenu);
    }

    return (
        <header className='header' ref={headerRef}>
            <div className='header__row-1'>
                <div className='header__logo-and-user-info'>
                    <Logo />
                    <div className='header__user-info-mobile'>
                        <Link to='/' className='header__link'>
                            <span className='header__first-name'>{userData?.firstName ? `${userData?.firstName} ` : ''}</span>
                            <span className='header__last-name'>{userData?.lastName ? `${userData?.lastName} ` : ''}</span>
                        </Link>
                    </div>
                </div>
                <Search />
                <div className='header__buttons'>
                    {
                        isLoggedIn ? (
                            <button className='header__button' onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link to='/login'>
                                <button className='header__button'>Login</button>
                            </Link>
                        )
                    }
                    {
                        (!isLoggedIn) && (
                            <Link to='/signup'>
                                <button className='header__button'>Sign Up</button>
                            </Link>
                        )
                    }
                    <button className='header__button' onClick={handleMenu}>
                        {displayMenu ? 'Close' : 'Menu'}
                    </button>
                    {displayMenu && <Menu headerHeight={headerHeight} />}
                </div>
            </div>
            <div className='header__user-info-desktop-tablet'>
                <Link to='/' className='header__link'>
                    <span className='header__first-name'>{userData?.firstName ? `${userData?.firstName} ` : ''}</span>
                    <span className='header__last-name'>{userData?.lastName ? `${userData?.lastName} ` : ''}</span>
                </Link>
            </div>
        </header>         
    )
 }

 export default Header;

