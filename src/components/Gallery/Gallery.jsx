import './Gallery.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Circle from '../Circle/Circle';

const apiUrl = import.meta.env.VITE_API_URL;
const imgFileExtEp = import.meta.env.VITE_IMG_FILE_EX_EP;
const videoFileExtEp = import.meta.env.VITE_VID_FILE_EX_EP;


const Gallery = ({ media }) => {

    const [mediaIndex, setMediaIndex] = useState(0);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);
    const circles = [];

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
                    className={className}
                    controls
                    muted
                    playsInline
                    autoPlay
                />
            );
        }

        return noImageFound(className);
    }

    const renderCircles = () => {

        if (!media || media.length === 0)
            return null;

        const circles = [];
        const circleCount = media.length;

        if (circleCount > 20) {
            circleCount = 20;
        }

        for (let i = 0; i < circleCount; i++) {
            circles.push(
                <Circle 
                    selected={i === mediaIndex} 
                    defaultClass='gallery__circle'
                    selectedClass='gallery__circle-selected'
                    key={uuidv4()} />
            );
        }

        return circles;
    }

    const fetchFileExtensions = async () => {
        const imageResponse = await axios.get(`${apiUrl}${imgFileExtEp}`);

        if (imageResponse.status === 200) {
            const ext = imageResponse.data.map(item => item.extension);
            setImageExtensions(ext);
        }

        const videoResponse = await axios.get(`${apiUrl}${videoFileExtEp}`);

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
        <section className='gallery'>
            <button 
                className="gallery__button gallery__button-left" 
                onClick={handleLeftButtonClick}>
                    <img 
                        src={'/media/svg/arrow_left.svg'} 
                        alt="arrow left" 
                        className="gallery__button-icon"/>
            </button>
            <div className='gallery__container'>
                <div className='gallery__image-container'> 
                    {renderMedia(media[mediaIndex], 'gallery__image')}
                </div>
                <div className='gallery__carousel'>
                    {renderCircles()}
                </div>
            </div>
            <button 
                className="gallery__button gallery__button-right"
                onClick={handleRightButtonClick}>
                    <img 
                        src={'/media/svg/arrow_right.svg'} 
                        alt="arrow right" 
                        className="gallery__button-icon"/>
            </button>
        </section>
    )
}

export default Gallery;
