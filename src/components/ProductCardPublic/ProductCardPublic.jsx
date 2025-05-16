import './ProductCardPublic.scss';
import { Link } from 'react-router-dom';

const ProductCardPublic = ({}) => {

    // Load product images.
    // Product description 
    // Product details 
    // Product features 
    // Product reviews 
    // Product rating 
    // Contract tearms 
    // Product payment schedule 
    
    return (
        <div className='product-card-public'>
            <picture className='product-card-public__image'>
                <img src={product.image} alt={product.name} />
            </picture>
            <section className="product-card-public__description">

            </section>
        </div>
    )
}

export default ProductCardPublic;