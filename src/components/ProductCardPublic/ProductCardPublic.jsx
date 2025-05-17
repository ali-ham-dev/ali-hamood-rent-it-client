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

    // TODO: get product id from url.
    const productId = 1;
    const apiUrl = import.meta.env.VITE_API_URL;

    const getMediaType = (url) => {
        if (!url) 
            return null;

        // TODO: backend should return the media type.
        const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
        const videoTypes = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

        const fileExtension = url.split('.').pop().toLowerCase();

        if (imageTypes.includes(fileExtension)) 
            return 'image';
        if (videoTypes.includes(fileExtension)) 
            return 'video';

        return null;
    }

    // 
    const renderMedia = (url, className = '') => {
        const mediaType = getMediaType(url);

        if (mediaType === 'image') {
            return <img 
                src={url} 
                alt={''} 
                className={className}
            />;
        }

        if (mediaType === 'video') {
            return <video 
                src={url} 
                controls
                className={className}
            />;
        }

        return <img 
            src={'/media/images/place_holder.png'} 
            alt={'placeholder image'} 
            className={className}
        />;
    }

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState(null);
    const [mediaIndex, setMediaIndex] = useState(0);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/${productId}`);
                setTimeout(() => {
                    setProduct(response.data);
                    setMedia(JSON.parse(response.data.media));
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error(`Error fetching product with id: ${productId}`, error);
            }
        }
        fetchProduct();
    }, [])

    return (
        <div className='product-card-public'>
            <section className="product-card-public__gallary">
                {/* <button className="product-card-public__button"></button> */}
                {loading ? (
                    <img
                        src={'/media/images/place_holder.png'}
                        alt="placeholder image"
                        className="product-card-public__image"
                    />
                ) : (
                    renderMedia(media[mediaIndex], 'product-card-public__image')
                )}
                {/* <button className="product-card-public__button"></button> */}
            </section>
            <section className="product-card-public__summary">
                <h3 className="product-card-public__title">Product Name</h3>
                <p className="product-card-public__description">Product Description</p>
                <p className="product-card-public__price">Product Price</p>
            </section>
        </div>
    );
}

export default ProductCardPublic;