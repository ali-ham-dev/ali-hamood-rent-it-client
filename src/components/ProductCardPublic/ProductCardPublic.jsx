import './ProductCardPublic.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductCardPublic = ({}) => {

    // Load product media.
    // Product title 
    // Product tags
    // Product description 
    // Product details 
    // Product specifications 
    // Contract const 
    // Product charge period
    // is active

    const productId = 1;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
                console.log(response.data);
                console.log(`${apiUrl}/products/${productId}`);

            } catch (error) {
                console.error(`Error fetching product with id: ${productId}`, error);
            }
        }
        fetchProduct();
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

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
    );
}

export default ProductCardPublic;