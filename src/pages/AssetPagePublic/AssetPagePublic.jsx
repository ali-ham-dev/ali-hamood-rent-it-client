import './AssetPagePublic.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const AssetPagePublic = () => {
    const { assetId } = useParams();
    const [asset, setAsset] = useState({});
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState({});
    const [mediaIndex, setMediaIndex] = useState(0);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);
    const [isZoomed, setIsZoomed] = useState(false);

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
            return (
                <div className="asset-page-public__image-container">
                    <img 
                        src={url} 
                        alt={asset.asset?.title || ''} 
                        className={className}
                        onClick={() => setIsZoomed(true)}
                    />
                </div>
            );
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

    useEffect( () => {
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
    }, [])

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
        <main className='asset-page-public'>
            <section className='asset-page-public__gallery'>
                <button 
                    className="asset-page-public__button asset-page-public__button-left" 
                    onClick={handleLeftButtonClick}>
                        <img 
                            src={'/media/svg/arrow_left.svg'} 
                            alt="arrow left" 
                            className="asset-page-public__button-icon"/>
                </button>
                {renderMedia(loading ? '' : media[mediaIndex], 'asset-page-public__image')}
                <button 
                    className="asset-page-public__button asset-page-public__button-right"
                    onClick={handleRightButtonClick}>
                        <img 
                            src={'/media/svg/arrow_right.svg'} 
                            alt="arrow right" 
                            className="asset-page-public__button-icon"/>
                </button>
            </section>

            {/* Zoom Modal */}
            {isZoomed && (
                <div 
                    className="asset-page-public__zoom-modal"
                    onClick={() => setIsZoomed(false)}
                >
                    <div className="asset-page-public__zoom-content">
                        <button 
                            className="asset-page-public__zoom-close"
                            onClick={() => setIsZoomed(false)}
                        >
                            ×
                        </button>
                        <img 
                            src={media[mediaIndex]} 
                            alt={asset.asset?.title || ''} 
                            className="asset-page-public__zoomed-image"
                        />
                    </div>
                </div>
            )}
            
            <p className='asset-page-public__text'>Asset Page</p>
        </main>
    )
}

export default AssetPagePublic;
