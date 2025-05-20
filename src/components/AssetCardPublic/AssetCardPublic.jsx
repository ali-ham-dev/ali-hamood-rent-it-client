import './AssetCardPublic.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const AssetCardPublic = ({ assetId }) => {

    const [asset, setAsset] = useState({});
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState({});
    const [mediaIndex, setMediaIndex] = useState(0);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);

    // Render functions

    const getMediaType = (url) => {
        if (!url) 
            return '';

        const fileExtension = url.split('.').pop().toLowerCase();

        if (imageExtensions.includes(fileExtension)) 
            return 'image';
        if (videoExtensions.includes(fileExtension)) 
            return 'video';

        return '';
    }

    const noImageFound = (className = '') => {
        return <img 
            src={'/media/images/place_holder.png'} 
            alt={'placeholder image'} 
            className={className}
        />;
    }

    const renderMedia = (url, className = '') => {
        const mediaType = getMediaType(url);

        if (loading || mediaType === '')
            return noImageFound(className);

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

        return noImageFound(className);
    }

    // Loading data

    const fetchAssetDetails = async () => {

        if (!assetId) {
            throw new Error('Invalid asset id');
        }

        const response = await axios.get(`${apiUrl}/assets/${assetId}`);
        if (response.status === 200) {
            setAsset(response.data);
            setMedia([
                ...(response.data.media.images || []), 
                ...(response.data.media.videos || [])
            ]);
        }
    }

    const fetchFileExtensions = async () => {
        const imageResponse = await axios.get(`${apiUrl}/file-extensions/image-file-extensions`);

        if (imageResponse.status === 200) {
            const ext = imageResponse.data.map(item => item.extension);
            setImageExtensions(ext);
        }

        const videoResponse = await axios.get(`${apiUrl}/file-extensions/video-file-extensions`);

        if (videoResponse.status === 200) {
            const ext = videoResponse.data.map(item => item.extension);     
            setVideoExtensions(ext);
        }
    }

    useEffect(()=>{
        const fetchAsset = async () => {
            try {
                await fetchAssetDetails();
                await fetchFileExtensions();
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching asset with id: ${assetId}`, error);
                setLoading(true);
            }
        }
        fetchAsset();
    }, []);

    // Event Handlers

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
                {renderMedia(loading ? '' : media[mediaIndex], 'asset-card-public__image')}
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
                        {loading ? 'loading...' : asset.asset.title}
                    </h3>
                </Link>
                <p className="asset-card-public__description">
                    {loading ? 'loading...' : asset.asset.description}
                </p>
                <p className="asset-card-public__price">
                    {loading ? 'loading...' : `$${asset.asset.billing.price} / ${asset.asset.billing.billing_frequency}`}
                </p>
            </section>
        </div>
    );
}

export default AssetCardPublic;