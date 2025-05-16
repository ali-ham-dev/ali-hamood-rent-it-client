import './HomePublic.scss';
import ProductCardPublic from '../../components/ProductCardPublic/ProductCardPublic';

const HomePublic = () => {
    return (
        <main>
            <div className='home-public'>
                <ProductCardPublic />
            </div>
        </main>
    )
}

export default HomePublic;