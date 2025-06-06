import './MediaUploadBox.scss';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import TrashCanIcon from '../TrashCanIcon/TrashCanIcon';

const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE_MB;
const maxFileCount = import.meta.env.VITE_MAX_FILE_COUNT;
const apiUrl = import.meta.env.VITE_API_URL;
const imageExtensionsEp = import.meta.env.VITE_IMG_FILE_EX_EP;
const videoExtensionsEp = import.meta.env.VITE_VID_FILE_EX_EP;
const uploadMediaEp = import.meta.env.VITE_MEDIA_UPLOAD_EP;

const MediaUploadBox = ({ uploadMedia, jwt }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageExtensions, setImageExtensions] = useState([]);
    const [videoExtensions, setVideoExtensions] = useState([]);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const fetchFileExtensions = async () => {
        try {
            const imageResponse = await axios.get(`${apiUrl}${imageExtensionsEp}`);
            if (imageResponse.status === 200) {
                const formattedExt = [];
                for (const ext of imageResponse.data) {
                    if (ext[0] === '.') {
                        formattedExt.push(ext);
                    } else {
                        formattedExt.push(`.${ext}`);
                    }
                }
                setImageExtensions(formattedExt);
            }
    
            const videoResponse = await axios.get(`${apiUrl}${videoExtensionsEp}`);
            if (videoResponse.status === 200) {
                const formattedExt = [];
                for (const ext of videoResponse.data) {
                    if (ext[0] === '.') {
                        formattedExt.push(ext);
                    } else {
                        formattedExt.push(`.${ext}`);
                    }
                }
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

    useEffect(() => {
        const uploadFiles = async () => {
            if (!uploadMedia || !jwt || files.length === 0 || isUploading) {
                return;
            }

            setIsUploading(true);
            setError(false);
            setErrorMessage('');

            const headers = {
                'Authorization': `Bearer ${jwt}`
            };

            console.log('Sending files to server...');

            try {
                for (const file of files) {
                    if (uploadedFiles.includes(file.name)) {
                        continue;
                    }
                    const formData = new FormData();
                    formData.append('media', file);
                    await axios.post(`${apiUrl}${uploadMediaEp}`, formData, { headers });
                    setUploadedFiles(prev => [...prev, file.name]);
                }

                files.forEach(file => URL.revokeObjectURL(file.preview));
                setFiles([]);
                setUploadedFiles([]);
            } catch (error) {
                console.error('Error uploading media:', error);
                setError(true);
                setErrorMessage('Error uploading media. Please try again.');
            } finally {
                setIsUploading(false);
            }
        };

        uploadFiles();
    }, [uploadMedia]);

    const isFileUploadLimit = (droppedFiles) => {
        if (!droppedFiles || droppedFiles.length >= maxFileCount) {
            setError(true);
            setErrorMessage(`You can only upload up to ${maxFileCount} files`);
            return true;
        }
        return false;
    }

    const isFileSizeLimit = (droppedFiles) => {
        if (!droppedFiles) {
            setError(true);
            setErrorMessage('File size limit error.');
            return true;
        }
        droppedFiles.forEach(file => {
            if (file.size > maxFileSize * 1024 * 1024) {
                setError(true);
                setErrorMessage(`Each file size must be less than ${maxFileSize}MB`);
                return true;
            }
        });
        return false;
    }
    
    const getFileExtension = (mimeType) => {
        return mimeType.split('/')[1];
    };

    const isFileExtensionLimit = (droppedFiles) => {
        if (!droppedFiles || droppedFiles.length === 0) {
            setError(true);
            setErrorMessage('File type error.');
            return true;
        }
        droppedFiles.forEach(file => {
            if (!imageExtensions.includes(getFileExtension(file.type)) || 
            !videoExtensions.includes(getFileExtension(file.type))) {
                setError(true);
                setErrorMessage('File type error.');
                return true;
            }
        });

        return false;
    }

    const onDrop = useCallback((droppedFiles) => {
        if (isFileUploadLimit(droppedFiles)) return;
        if (isFileSizeLimit(droppedFiles)) return;
        if (isFileExtensionLimit(droppedFiles)) return;

        const newFiles = droppedFiles.map(file => {
            file.preview = URL.createObjectURL(file)
            return file;
        });

        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setError(false);
        setErrorMessage('');
    }, [files]);

    const removeFile = (index) => {
        const newFiles = files.filter((file, i) => i !== index);
        URL.revokeObjectURL(files[index].preview);
        setFiles(newFiles);
        setError(false);
        setErrorMessage('');
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: {
            'image/*': imageExtensions,
            'video/*': videoExtensions
        },
        multiple: true,
        maxFiles: maxFileCount,
        maxSize: maxFileSize * 1024 * 1024
    });

    // TODO: Progress bar.
    // TODO: Validate input in input box .

    return (
        <div className='media-upload-box'>
            {isLoading ? (
                <div className='media-upload-box__dropzone-text'>Loading...</div>
            ) : (                
                <div className='media-upload-box__dropzone' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className='media-upload-box__dropzone-text'>
                        {isUploading ? 'Uploading...' : 'Drag and drop your photos and videos here...'}
                    </p>
                    <p className='media-upload-box__dropzone-text'>Maximum {maxFileCount} files, {maxFileSize}MB each</p>
                </div>
            )}
            {error && (
                <div className='media-upload-box__error'>
                    <p className='media-upload-box__error-message'>{errorMessage}</p>
                </div>
            )}
            {files.length > 0 && (
                <div className='media-upload-box__preview'>
                    {files.map((file, index) => (
                        <div key={index} className='media-upload-box__preview-item'>
                            <button 
                                className='media-upload-box__preview-item-delete-button' 
                                onClick={() => removeFile(index)}
                                disabled={isUploading}>
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