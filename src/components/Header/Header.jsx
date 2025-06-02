import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, userData, clearAllUserData}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        clearAllUserData && clearAllUserData();
        navigate('/');
    }

    return (
        <header className='header'>
            <Logo userName={userData?.firstName} />
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
                    isLoggedIn ? (
                        <Link to='/'>
                            <button className='header__button'>Notifications</button>
                        </Link>
                    ) : (
                        <Link to='/signup'>
                            <button className='header__button'>Sign Up</button>
                        </Link>
                    )
                }
                <button className='header__button'>Menu</button>
            </div>
        </header>         
    )
 }

 export default Header;

