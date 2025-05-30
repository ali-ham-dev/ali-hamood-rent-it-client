import './Logo.scss';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/' className='logo'>
            <h1 className='logo__title'>Rent it</h1>
        </Link>
    )
}

export default Logo;