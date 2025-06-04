import './MakeAd.scss';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const tinymceEp = import.meta.env.VITE_TINYMCE_EP;

const MakeAd = ({ jwt }) => {
    const [tinymceSessionJwt, setTinymceSessionJwt] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditorChange = (content, editor) => {
        console.log('TinyMCE Content:', content);
    };

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

    useEffect( () => {
        fetchTinymceSessionJwt();
    }, [jwt]);

    return (
        <div className='make-ad'>
            <Section title='Make Ad' headingLevel='h2' content={
                isLoading ? (
                    <div className='make-ad__loading-editor'>Loading editor...</div>
                ) : tinymceSessionJwt ? (
                    <Editor
                        apiKey={tinymceSessionJwt}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic underline | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                ) : (
                    <div>Please log in to use the editor.</div>
                )
            } />
        </div>
    );
};

export default MakeAd;