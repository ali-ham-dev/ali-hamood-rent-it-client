import './Logo.scss';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className='logo'>  
            <Link to='/' className='logo__link'>
                <h1 className='logo__title'>Rent it</h1>
            </Link>
        </div>
    )
}

export default Logo;