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

    // Get image
    // Get Tags
    // Get payment schedule
    
    return (
        <div className='product-card-public'>
            <picture className='product-card-public__picture'>
                {/* <img src={product.image} alt={product.name} /> */}
            </picture>
            <section className="product-card-public__summary">
                <h2 className="product-card-public__title">Product Name</h2>
                <p className="product-card-public__description">Product Description</p>
                <p className="product-card-public__price">Product Price</p>
            </section>
        </div>
    )
}

export default ProductCardPublic;