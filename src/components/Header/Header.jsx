import './Header.scss';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const Header = () => {
    return (
        <header className='header'>
            <Logo />
            <div className='header__buttons header__buttons-mobile'>
                <button className='header__button'>Login</button>
                <button className='header__button'>Sign Up</button>
            </div>
            <Search />
            <div className='header__buttons header__buttons-desktop'>
                <button className='header__button'>Login</button>
                <button className='header__button'>Sign Up</button>
            </div>
        </header>        
    )
 }

 export default Header;

