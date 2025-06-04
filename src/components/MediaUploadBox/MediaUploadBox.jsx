import './MediaUploadBox.scss';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import TrashCanIcon from '../TrashCanIcon/TrashCanIcon';

const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE_MB;
const maxTotalFileSize = import.meta.env.VITE_MAX_TOTAL_SIZE_MB;
const apiUrl = import.meta.env.VITE_API_URL;
const imageExtensionsEp = import.meta.env.VITE_IMG_FILE_EX_EP;
const videoExtensionsEp = import.meta.env.VITE_VID_FILE_EX_EP;

const MediaUploadBox = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);
    const [files, setFiles] = useState([]);

    const fetchFileExtensions = async () => {
        try {
            const imageResponse = await axios.get(`${apiUrl}${imageExtensionsEp}`);
            if (imageResponse.status === 200) {
                const ext = imageResponse.data.map(item => item.extension);
                const formattedExt = ext.map(item => item.startsWith('.') ? item : `.${item}`);
                setImageExtensions(formattedExt);
            }
    
            const videoResponse = await axios.get(`${apiUrl}${videoExtensionsEp}`);
            if (videoResponse.status === 200) {
                const ext = videoResponse.data.map(item => item.extension);
                const formattedExt = ext.map(item => item.startsWith('.') ? item : `.${item}`);
                setVideoExtensions(formattedExt);
            }
        } catch (error) {
            console.error('Error fetching file extensions:', error);
        }
    }

    useEffect(() => {
        fetchFileExtensions();
        setIsLoading(false);
    }, []);

    const onDrop = useCallback((dripedFiles) => {
        const newFiles = dripedFiles.map(file => {
            file.preview = URL.createObjectURL(file)
            return file;
        });

        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }, [files]);

    const removeFile = (index) => {
        const newFiles = files.filter((file, i) => i !== index);
        URL.revokeObjectURL(files[index].preview);
        setFiles(newFiles);
    }

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
                    <p className='media-upload-box__dropzone-text'>Drag and drop your photos and videos here...</p>
                    <p className='media-upload-box__dropzone-text'>Maximum 10 files, 100MB each</p>

                </div>
            )}
            {/* TODO: error box */}
            {files.length > 0 && (
                <div className='media-upload-box__preview'>
                    {files.map((file, index) => (
                        <div key={index} className='media-upload-box__preview-item'>
                            <button className='media-upload-box__preview-item-delete-button' onClick={() => removeFile(index)}>
                                <TrashCanIcon />
                            </button>
                            {file.type.startsWith('image/') ? (
                                <img className='media-upload-box__preview-image' src={file.preview} alt={file.name} />
                            ) : (
                                <video className='media-upload-box__preview-video' src={file.preview} controls />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MediaUploadBox;