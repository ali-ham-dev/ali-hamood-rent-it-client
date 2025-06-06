import './AssetCard.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '../EditIcon/EditIcon';
import DeleteIcon from '../TrashCanIcon/TrashCanIcon';

const apiUrl = import.meta.env.VITE_API_URL;
const imageExtensionsEp = import.meta.env.VITE_IMG_FILE_EX_EP;
const videoExtensionsEp = import.meta.env.VITE_VID_FILE_EX_EP;

const AssetCard = ({ assetId, isEditable = false }) => {

    const [asset, setAsset] = useState({});
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState({});
    const [mediaIndex, setMediaIndex] = useState(0);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);

    const stripHtmlTags = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    };

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
                className={className}
                alt={''}
            />;
        }

        if (mediaType === 'video') {
            return <video 
                src={url} 
                className={className}
                controls
                autoPlay
                muted
                loop
                playsInline
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
            const assetData = response.data;
            assetData.description = stripHtmlTags(assetData.description);
            setAsset(assetData);
            setMedia([
                ...(response.data.media || [])
            ]);
        }
    }

    const fetchFileExtensions = async () => {
        const imageResponse = await axios.get(`${apiUrl}${imageExtensionsEp}`);
        if (imageResponse.status === 200) {
            const extensions = [];
            for (const ext of imageResponse.data) {
                extensions.push(ext);
            }
            setImageExtensions(extensions);
        }

        const videoResponse = await axios.get(`${apiUrl}${videoExtensionsEp}`);
        if (videoResponse.status === 200) {
            const extensions = [];
            for (const ext of videoResponse.data) {
                extensions.push(ext);
            }  
            setVideoExtensions(extensions);
        }
    }

    useEffect(() => {
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

    const handleEditButtonClick = () => {
        console.log('edit button clicked');
    }

    const handleDeleteButtonClick = () => {
        console.log('delete button clicked');
    }

    return (
        <div className={`asset-card ${isEditable ? '' : 'asset-card__floating'}`}>
            {isEditable && <div className='asset-card__edit-container'>
                <button className='asset-card__edit-button'>
                    <EditIcon />
                </button>
                <button className='asset-card__delete-button'>
                    <DeleteIcon />
                </button>
            </div>}
            <section className="asset-card__gallery">
                <button 
                    className="asset-card__button asset-card__button-left" 
                    onClick={handleLeftButtonClick}>
                        <img 
                            src={'/media/svg/arrow_left.svg'} 
                            alt="arrow left" 
                            className="asset-card__button-icon"/>
                </button>
                {renderMedia(loading ? '' : media[mediaIndex], 'asset-card__image')}
                <button 
                    className="asset-card__button asset-card__button-right"
                    onClick={handleRightButtonClick}>
                        <img 
                            src={'/media/svg/arrow_right.svg'} 
                            alt="arrow right" 
                            className="asset-card__button-icon"/>
                </button>
            </section>
            <section className="asset-card__summary">
                <Link to={`/asset/${assetId}`} className="asset-card__title-link">
                    <h3 className="asset-card__title">
                        {loading ? 'loading...' : asset.title}
                    </h3>
                </Link>
                <p className="asset-card__description">
                    {loading ? 'loading...' : asset.description}
                </p>
                <p className="asset-card__price">
                    {loading ? 'loading...' : `$${asset.price} / ${asset.period}`}
                </p>
            </section>
        </div>
    );
}

export default AssetCard;