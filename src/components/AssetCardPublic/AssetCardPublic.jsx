import './AssetCardPublic.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { Link } from 'react-router-dom';

const AssetCardPublic = ({assetId}) => {

    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState(null);
    const [mediaIndex, setMediaIndex] = useState(0);
    const [imageExtensions, setImageExtensions] = useState(null);
    const [videoExtensions, setVideoExtensions] = useState(null);

    const getMediaType = (url) => {
        if (!url) 
            return null;

        const fileExtension = url.split('.').pop().toLowerCase();

        if (imageExtensions.includes(fileExtension)) 
            return 'image';
        if (videoExtensions.includes(fileExtension)) 
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

    const fetchAssetDetails = async () => {
        const response = await axios.get(`${apiUrl}/assets/${assetId}`);

        if (response.status === 200) {
            setAsset(response.data);
            setMedia(JSON.parse(response.data.media));
            setLoading(false);
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
                await fetchFileExtensions();
                await fetchAssetDetails();
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