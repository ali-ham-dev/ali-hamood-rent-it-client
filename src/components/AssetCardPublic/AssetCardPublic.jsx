import './AssetCardPublic.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { Link } from 'react-router-dom';

const AssetCardPublic = ({assetId}) => {

    // Load asset media.
    // Asset title 
    // Asset tags
    // Asset description 
    // Asset details 
    // Asset specifications 
    // Contract const 
    // Asset charge period
    // is active

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



    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState(null);
    const [mediaIndex, setMediaIndex] = useState(0);

    useEffect(()=>{
        const fetchAsset = async () => {
            try {
                const response = await axios.get(`${apiUrl}/assets/${assetId}`);
                setAsset(response.data);
                setMedia(JSON.parse(response.data.media));
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching asset with id: ${assetId}`, error);
            }
        }
        fetchAsset();
    }, []);

    const handleLeftButtonClick = () => {
        const nextMediaIndex = mediaIndex - 1;
        
        if (nextMediaIndex < 0) {
            setMediaIndex(media.length - 1);
        } else {
            setMediaIndex(nextMediaIndex);
        }
    }

    const handleRightButtonClick = () => {
        const nextMediaIndex = mediaIndex + 1;
        
        if (nextMediaIndex >= media.length) {
            setMediaIndex(0);
        } else {
            setMediaIndex(nextMediaIndex);
        }
    }

    // TODO:  3. summary contetnt. 4. code clean up.

    // TODO: update file extensions
    // TODO: add product summar look at others.
    // TODO: AWS images and other assets. 

    return (
        <div className='asset-card-public'>
            <section className="asset-card-public__gallary">
                <button 
                    className="asset-card-public__button asset-card-public__button-left" 
                    onClick={handleLeftButtonClick}>
                        <img 
                            src={'/media/svg/arrow_left.svg'} 
                            alt="arrow left" 
                            className="asset-card-public__button-icon"/>
                </button>
                {loading ? (
                    <img
                        src={'/media/images/place_holder.png'}
                        alt="placeholder image"
                        className="asset-card-public__image"
                    />
                ) : (
                    renderMedia(media[mediaIndex], 'asset-card-public__image')
                )}
                <button 
                    className="asset-card-public__button asset-card-public__button-right"
                    onClick={handleRightButtonClick}>
                        <img 
                            src={'/media/svg/arrow_right.svg'} 
                            alt="arrow right" 
                            className="asset-card-public__button-icon"/>
                </button>
            </section>
            <section className="asset-card-public__summary">
                <Link to={`/products/${assetId}`} className="asset-card-public__title-link">
                    <h3 className="asset-card-public__title">
                        {loading ? 'loading...' : asset.title}
                    </h3>
                </Link>
                <p className="asset-card-public__description">
                    {loading ? 'loading...' : asset.description}
                </p>
                <p className="asset-card-public__price">
                    {loading ? 'loading...' : `$${asset.cost} per ${asset.charge_frequency}`}
                </p>
            </section>
        </div>
    );
}

export default AssetCardPublic;