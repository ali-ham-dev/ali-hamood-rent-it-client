import './HeaderPublic.scss';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const HeaderPublic = () => {
    return (
        <header className='header-public'>
            <Logo />
            <Search />
        </header>        
    )
}

export default HeaderPublic;

