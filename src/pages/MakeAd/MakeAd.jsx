import './MakeAd.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/Section/Section';
import axios from 'axios';
import InputBox from '../../components/InputBox/InputBox';
import DropDown from '../../components/DropDown/DropDown';
import TinyMceEditor from '../../components/TinyMceEditor/TinyMceEditor';
import MediaUploadBox from '../../components/MediaUploadBox/MediaUploadBox';

const apiUrl = import.meta.env.VITE_API_URL;
const tinymceEp = import.meta.env.VITE_TINYMCE_EP;
const assetUploadEd = import.meta.env.VITE_ASSET_UPLOAD_EP;

const MakeAd = ({ jwt }) => {
    const navigate = useNavigate();
    const [tinymceSessionJwt, setTinymceSessionJwt] = useState(null);
    const [tinymceApiKey, setTinymceApiKey] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [titleInputBox, setTitleInputBox] = useState({
        htmlFor: 'ad',
        labelText: '',
        type: 'text',
        name: 'title',
        value: '',
        placeholder: 'Ad a title for your ad...',
        error: false,
        errorMessage: '',
        isRequired: true,
        maxLength: 254
    });
    const [priceInputBox, setPriceInputBox] = useState({
        htmlFor: 'ad',
        labelText: '',
        type: 'text',
        name: 'price',
        value: '',
        placeholder: '$100',
        error: false,
        errorMessage: '',
        isRequired: true,
        maxLength: 1000
    });
    const [period, setPeriod] = useState('month');
    const [content, setContent] = useState([
        'day',
        'week',
        'month',
        'year'
    ]);
    const [description, setDescription] = useState('');
    const [uploadMedia, setUploadMedia] = useState(false);

    const fetchTinymceSessionJwt = async() => {
        try {
            if (!jwt) {
                console.log('User is not logged in.');
                setIsLoading(false);
                return;
            }

            const headers = {
                'Authorization': `Bearer ${jwt}`
            }
            const response = await axios.get(`${apiUrl}${tinymceEp}`, { headers });

            if (response && 
                response.data && 
                response.status === 200 &&
                response.data.authToken) {
                setTinymceSessionJwt(response.data.authToken);
            } else {
                console.error('Error fetching TinyMCE plugin:', response);
            }
        } catch (error) {
            console.error('Error fetching TinyMCE plugin:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchTinymceApiKey = async() => {
        try {
            if (!jwt) {
                console.log('User is not logged in.');
                setIsLoading(false);
                return;
            }

            const headers = {
                'Authorization': `Bearer ${jwt}`
            }
            const response = await axios.get(`${apiUrl}${tinymceEp}`, { headers });

            if (response && 
                response.data && 
                response.status === 200 &&
                response.data.apiKey) {
                setTinymceApiKey(response.data.apiKey);
            } else {
                console.error('Error fetching TinyMCE api key:', response);
            }
        } catch (error) {
            console.error('Error fetching TinyMCE api key:', error);
        }
    }

    useEffect( () => {
        // TOKEN based auth is a paid tier.
        // TODO: self host tinymce or switch to prosemirror. For now, we're using the api key.
        fetchTinymceApiKey();
        setIsLoading(false);
    }, [jwt]);

    const handleEditorChange = (content, editor) => {
        console.log('TinyMCE Content:', content);
        setDescription(content);
    };

    const validateTitleChange = (input) => {
        if (input.length > 254) {
            titleInputBox.error = true;
            titleInputBox.errorMessage = 'Title must be less than 254 characters.';
        }
    }

    const validateTitleBlur = (input) => {
        if (input.length < 1) {
            titleInputBox.error = true;
            titleInputBox.errorMessage = 'Title is required.';
        }
    }

    const validatePriceChange = (input) => {
        if (input.length > 10000) {
            priceInputBox.error = true;
            priceInputBox.errorMessage = 'Price must be less than 1000 characters.';
            return false;
        }

        return true
    }

    const validatePriceBlur = (input) => {
        if (!input || input.length < 1) {
            priceInputBox.error = true;
            priceInputBox.errorMessage = 'Price is required.';
        }
    }

    const handleInputBoxChange = (e) => {
        if (e.target.name === 'title') {
            titleInputBox.error = false;
            titleInputBox.errorMessage = '';
            validateTitleChange(e.target.value);
            setTitleInputBox({
                ...titleInputBox,
                value: e.target.value
            });
        }
        if (e.target.name === 'price') {
            priceInputBox.error = false;
            priceInputBox.errorMessage = '';
            const value = e.target.value.replace(/[^0-9]/g, '');
            validatePriceChange(value);
            setPriceInputBox({
                ...priceInputBox,
                value: value
            });
        }
    };

    const handleInputBoxBlur = (e) => {
        if (e.target.name === 'title') {
            validateTitleBlur(e.target.value);
            setTitleInputBox({
                ...titleInputBox,
            });
        }

        if (e.target.name === 'price') {
            validatePriceBlur(e.target.value);
            setPriceInputBox({
                ...priceInputBox,
            });
        }
    };

    const handleSubmit = async () => {
        if (!jwt) {
            navigate('/login');
            setIsError(true);
            setErrorMessage('Please log in to submit an ad.');
            return;
        }

        validateTitleChange(titleInputBox.value);
        validateTitleBlur(titleInputBox.value);
        if (titleInputBox.error) {
            console.log('Title error');
            return;
        }

        validatePriceChange(priceInputBox.value);
        validatePriceBlur(priceInputBox.value);
        if (priceInputBox.error) {
            console.log('Price error');
            return;
        }

        setUploadMedia(!uploadMedia);

        try {
            setIsError(false);
            setErrorMessage('');
            setIsSubmitting(true);

            const headers = {
                'Authorization': `Bearer ${jwt}`
            }

            const payload = {
                title: titleInputBox.value,
                price: priceInputBox.value,
                period: period,
                description: description
            }

            const res = await axios.post(`${apiUrl}${assetUploadEd}`, payload, { headers });
            console.log(res);
            //navigate('/');
        } catch (error) {
            console.error('Error submitting ad:', error);
            setIsError(true);
            setErrorMessage('Error submitting ad. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className='make-ad'>
            {isError && <div className='make-ad__error'>{errorMessage}</div>}
            <Section title='Title:' headingLevel='h2' isCollapsible={true} content={
                <InputBox inputBoxData={titleInputBox} onChange={handleInputBoxChange} onBlur={handleInputBoxBlur} />
            } />
            <Section title='Media:' headingLevel='h2' isCollapsible={true} content={
                <MediaUploadBox uploadMedia={uploadMedia} jwt={jwt} />
            } />
            <Section title='Price:' headingLevel='h2' isCollapsible={true} content={
                <div className='make-ad__price-container'>
                    <InputBox inputBoxData={priceInputBox} onChange={handleInputBoxChange} onBlur={handleInputBoxBlur} />
                    <DropDown content={content} setValue={setPeriod} value={period} /> 
                </div>
            } />
            <Section title='Description:' headingLevel='h2' isCollapsible={true} content={
                isLoading ? (
                    <div className='make-ad__loading-editor'>Loading editor...</div>
                ) : tinymceApiKey ? (
                    <TinyMceEditor tinymceApiKey={tinymceApiKey} handleEditorChange={handleEditorChange} />
                ) : (
                    <div className='make-ad__not-logged-in'>Please log in to use the editor.</div>
                )
            } />
            <button className='make-ad__submit-button' onClick={handleSubmit}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </main>
    );
};

export default MakeAd;