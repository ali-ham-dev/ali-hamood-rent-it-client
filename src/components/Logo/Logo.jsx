import './Logo.scss';
import { Link } from 'react-router-dom';

const Logo = ({ userName }) => {
    return (
        <Link to='/' className='logo'>
            <h1 className='logo__title'>{userName ? `${userName}'s ` : ''}Rent it</h1>
        </Link>
    )
}

export default Logo;