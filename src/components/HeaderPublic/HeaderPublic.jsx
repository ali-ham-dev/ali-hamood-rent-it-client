import './HeaderPublic.scss';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const HeaderPublic = () => {
    return (
        <header className='header-public'>
            <Logo />
            <div className='header-public__buttons header-public__buttons-mobile'>
                <button className='header-public__button'>Login</button>
                <button className='header-public__button'>Sign Up</button>
            </div>
            <Search />
            <div className='header-public__buttons header-public__buttons-desktop'>
                <button className='header-public__button'>Login</button>
                <button className='header-public__button'>Sign Up</button>
            </div>
        </header>        
    )
 }

 export default HeaderPublic;

