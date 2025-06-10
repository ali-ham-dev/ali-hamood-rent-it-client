import './TinyMceEditor.scss';
import { Editor } from '@tinymce/tinymce-react';

const TinyMceEditor = ({ tinymceApiKey, handleEditorChange, initialValue = ''}) => {
    return (
        <Editor
            apiKey={tinymceApiKey}
            value={initialValue}
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
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default TinyMceEditor;