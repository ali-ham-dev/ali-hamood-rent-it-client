import './MakeAd.scss';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import { Editor } from '@tinymce/tinymce-react';

const MakeAd = () => {
    const handleEditorChange = (content, editor) => {
    console.log('TinyMCE Content:', content);
    };

    return (
        <div className='make-ad'>
            <Section title='Make Ad' headingLevel='h2' content={
                <Editor
                    apiKey='your-api-key-here' 
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
            } />
        </div>
    );
};

export default MakeAd;