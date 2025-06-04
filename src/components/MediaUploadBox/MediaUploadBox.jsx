import './MediaUploadBox.scss';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE_MB;
const maxTotalFileSize = import.meta.env.VITE_MAX_TOTAL_SIZE_MB;
const apiUrl = import.meta.env.VITE_API_URL;
const imageExtensionsEp = import.meta.env.VITE_IMG_FILE_EX_EP;
const videoExtensionsEp = import.meta.env.VITE_VID_FILE_EX_EP;

const MediaUploadBox = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);


    const fetchFileExtensions = async () => {
        try {
            const imageResponse = await axios.get(`${apiUrl}${imageExtensionsEp}`);
            if (imageResponse.status === 200) {
                const ext = imageResponse.data.map(item => item.extension);
                const formattedExt = ext.map(item => item.startsWith('.') ? item : `.${item}`);
                setImageExtensions(formattedExt);
                console.log('image extensions');
                console.log(formattedExt); 
            }
    
            const videoResponse = await axios.get(`${apiUrl}${videoExtensionsEp}`);
            if (videoResponse.status === 200) {
                const ext = videoResponse.data.map(item => item.extension);
                const formattedExt = ext.map(item => item.startsWith('.') ? item : `.${item}`);
                setVideoExtensions(formattedExt);
                console.log('video extensions');
                console.log(formattedExt); 
            }
            console.log('------');
            console.log(imageExtensions);
            console.log(videoExtensions);
        } catch (error) {
            console.error('Error fetching file extensions:', error);
        }
    }

    useEffect(() => {
        fetchFileExtensions();
    }, []);
    
    useEffect(() => {
        setIsLoading(false);
    }, [imageExtensions, videoExtensions]);

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: {
            'image/*': imageExtensions,
            'video/*': videoExtensions
        },
        multiple: true,
        maxFiles: 10,
        maxSize: maxFileSize * 1024 * 1024
    });

    return (
        <div className='media-upload-box'>
            { isLoading ? (
                <div className='media-upload-box__dropzone-text'>Loading...</div>
            ) : (                
                <div className='media-upload-box__dropzone' {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className='media-upload-box__dropzone-text'>Drop your photos and videos here...</p>
                    ) : (
                        <p className='media-upload-box__dropzone-text'>Drag and drop images and/or videos here, or click to select files</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MediaUploadBox;