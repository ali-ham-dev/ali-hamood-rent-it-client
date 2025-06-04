import './MakeAd.scss';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import InputBox from '../../components/InputBox/InputBox';

const apiUrl = import.meta.env.VITE_API_URL;
const tinymceEp = import.meta.env.VITE_TINYMCE_EP;

const MakeAd = ({ jwt }) => {
    const [tinymceSessionJwt, setTinymceSessionJwt] = useState(null);
    const [tinymceApiKey, setTinymceApiKey] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState({
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
        } finally {
            setIsLoading(false);
        }
    }

    useEffect( () => {
        // TOKEN based auth is a paid tier.
        // TODO: self host tinymce or switch to prosemirror. 
        // For now, we're using the api key.
        fetchTinymceApiKey();
    }, [jwt]);

    const handleEditorChange = (content, editor) => {
        console.log('TinyMCE Content:', content);
    };

    const handleInputBoxChange = (e) => {
        setTitle({
            ...title,
            value: e.target.value
        });
    };

    const handleInputBoxBlur = (e) => {

    };

    return (
        <main className='make-ad'>
            <Section title='Title:' headingLevel='h2' content={
                <InputBox inputBoxData={title} onChange={handleInputBoxChange} onBlur={handleInputBoxBlur} />
            } />
            <Section title='Description:' headingLevel='h2' content={
                isLoading ? (
                    <div className='make-ad__loading-editor'>Loading editor...</div>
                ) : tinymceApiKey ? (
                    <Editor
                        apiKey={tinymceApiKey}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code',
                                'insertdatetime', 'media', 'table', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic underline | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height: 0.25rem }'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                ) : (
                    <div className='make-ad__not-logged-in'>Please log in to use the editor.</div>
                )
            } />
        </main>
    );
};

export default MakeAd;