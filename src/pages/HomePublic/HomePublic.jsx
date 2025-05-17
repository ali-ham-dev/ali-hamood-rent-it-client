import './HomePublic.scss';
import ProductCardPublic from '../../components/ProductCardPublic/ProductCardPublic';
import { Link } from 'react-router-dom';

const HomePublic = () => {
    return (
        <main>
            <div className='home-public'>
                <ProductCardPublic productId={1} />
            </div>
        </main>
    )
}

export default HomePublic;