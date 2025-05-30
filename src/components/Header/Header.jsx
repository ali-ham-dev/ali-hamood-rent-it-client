import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const Header = () => {
    return (
        <header className='header'>
            <Logo />
            <Search />
            <div className='header__buttons'>
                <button className='header__button'>Login</button>
                <Link to='/signup'>
                    <button className='header__button'>Sign Up</button>
                </Link>
            </div>
        </header>        
    )
 }

 export default Header;

