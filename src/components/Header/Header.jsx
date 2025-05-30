import './Header.scss';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const Header = () => {
    return (
        <header className='header'>
            <Logo />
            <Search />
            <div className='header__buttons'>
                <button className='header__button'>Login</button>
                <button className='header__button'>Sign Up</button>
            </div>
        </header>        
    )
 }

 export default Header;

