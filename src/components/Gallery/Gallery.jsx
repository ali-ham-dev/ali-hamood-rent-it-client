import './Gallery.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Gallery = ({ media }) => {

    const [mediaIndex, setMediaIndex] = useState(0);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);

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

    const renderMedia = (url, className = '', alt = '') => {
        const mediaType = getMediaType(url);

        if (mediaType === '')
            return noImageFound(className);

        if (mediaType === 'image') {
            return (
                <img 
                    src={url} 
                    alt={alt} 
                    className={className}
                    onClick={() => setIsZoomed(true)}
                />
            );
        }

        if (mediaType === 'video') {
            return ( 
                <video 
                    src={url} 
                    controls
                    className={className}
                />
            );
        }

        return noImageFound(className);
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
                await fetchFileExtensions();
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
        <section className='gallery__gallery-container'>
            <div className='gallery__gallery'>
                <button 
                    className="gallery__button gallery__button-left" 
                    onClick={handleLeftButtonClick}>
                        <img 
                            src={'/media/svg/arrow_left.svg'} 
                            alt="arrow left" 
                            className="gallery__button-icon"/>
                </button>
                {renderMedia(media[mediaIndex], 'gallery__image')}
                <button 
                    className="gallery__button gallery__button-right"
                    onClick={handleRightButtonClick}>
                        <img 
                            src={'/media/svg/arrow_right.svg'} 
                            alt="arrow right" 
                            className="gallery__button-icon"/>
                </button>
            </div>
        </section>
    )
}

export default Gallery;
