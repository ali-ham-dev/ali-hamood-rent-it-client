import './MakeAd.scss';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import InputBox from '../../components/InputBox/InputBox';
import DropDown from '../../components/DropDown/DropDown';

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
    const [price, setPrice] = useState({
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
    const [content, setContent] = useState([
        'day',
        'week',
        'month',
        'year'
    ]);

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
            <Section title='Title:' headingLevel='h2' isCollapsible={true} content={
                <InputBox inputBoxData={title} onChange={handleInputBoxChange} onBlur={handleInputBoxBlur} />
            } />
            <Section title='Media:' headingLevel='h2' isCollapsible={true} content={
                <DropDown title='Category:' content={content} />
            } />
            <Section title='Price:' headingLevel='h2' isCollapsible={true} content={
                <div className='make-ad__price-container'>
                    <InputBox inputBoxData={price} onChange={handleInputBoxChange} onBlur={handleInputBoxBlur} />
                    <DropDown title='Period:' content={content} /> 
                </div>
            } />
            <Section title='Location:' headingLevel='h2' isCollapsible={true} content={
                <InputBox inputBoxData={location} onChange={handleInputBoxChange} onBlur={handleInputBoxBlur} />
            } />
            <Section title='Description:' headingLevel='h2' isCollapsible={true} content={
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
            <Section title='Media:' headingLevel='h2' isCollapsible={true} content={
                <div className='make-ad__media-container'>
                    <div className='make-ad__media-item'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nam necessitatibus excepturi natus eum, architecto praesentium voluptates rerum ratione minima culpa! Voluptatibus saepe nam facilis, eveniet, ducimus ipsa impedit, molestias quia accusantium nostrum fugiat quasi eaque sequi a voluptate. Fugiat officiis dolor maiores dolorem illum quia ducimus laborum distinctio quidem vero, culpa explicabo perferendis eius iure molestias aperiam quas magni architecto in vitae facilis. Explicabo molestiae eligendi quae alias quo doloremque vero omnis, molestias corrupti inventore fuga non aliquid accusantium optio numquam! Itaque, maiores ullam corporis deserunt molestias fugit vitae adipisci praesentium aperiam nesciunt atque sapiente distinctio officia minus nostrum doloremque odio illum tempora excepturi ipsum tempore voluptatem asperiores? Quos, reiciendis provident asperiores veniam cupiditate temporibus iure quas magnam qui culpa minus, expedita maiores architecto voluptatibus molestiae perferendis quae ex saepe odio! Aperiam sapiente cumque minus voluptatum! Dolores dignissimos velit voluptatem, rem aut distinctio aliquid. Quam in repellendus voluptatem sunt aliquid maxime eum dolorum rerum, cupiditate odit cumque doloribus enim cum fugiat distinctio unde nulla, repellat ab earum at assumenda veniam? Ad veritatis necessitatibus, non voluptas enim numquam illum! Laborum ullam harum libero id velit maiores neque ut voluptatum a, et nesciunt laboriosam natus magni sequi aspernatur accusantium ducimus debitis veniam. Magnam, accusamus perspiciatis! Est velit ad unde eius minus voluptas incidunt dolores, maiores voluptate voluptatem minima aliquam odit dicta sit impedit necessitatibus sed iste fugit eligendi. Tempore maxime eaque quam facere nisi sapiente dolores velit aperiam porro tenetur culpa, aliquid sint molestiae earum aut temporibus fugiat, praesentium, autem deleniti dolorum beatae nihil dignissimos nobis odit. Odio dolore incidunt nemo hic ratione, ullam eligendi accusantium, a repellat nostrum veritatis, sed ut quisquam itaque error ipsa deserunt maxime consequuntur voluptatum neque! Hic blanditiis earum autem voluptatem dolorum aliquid eveniet laboriosam quidem ducimus, ea quae laudantium odio dolor distinctio consequatur consectetur sequi. Blanditiis sequi vero nostrum eius odit officia libero, quisquam quaerat, perferendis aliquid magnam debitis sapiente quam assumenda porro. Hic autem aliquid atque, illo porro alias, in consectetur quam error, ea sit consequatur. Voluptates necessitatibus molestias tenetur nesciunt dolores fugiat eligendi dignissimos veniam perspiciatis dicta optio odio, laborum voluptas officiis? Perferendis amet, in iusto error doloribus earum voluptatum dolores consequatur distinctio dolore id, voluptates maiores quaerat beatae voluptatem quod voluptatibus eligendi! Ipsum labore minus quo officia magnam dolorum consequuntur officiis debitis esse totam aliquid amet nobis, numquam commodi voluptatibus neque incidunt repellendus quaerat aliquam necessitatibus molestiae. Deserunt quae eum minus, fugiat, quibusdam ullam eius praesentium magnam molestias aspernatur, possimus corrupti distinctio illum itaque asperiores quisquam autem voluptates et quidem a illo reprehenderit? Dignissimos, corrupti iure ullam nemo delectus nam molestiae esse, quia adipisci consequatur vero quisquam? Quibusdam, illo est aspernatur deleniti, a ipsam nostrum ex inventore doloremque qui nesciunt fugiat! Culpa maiores perspiciatis molestiae dolorum corporis delectus ut dignissimos assumenda! Excepturi enim voluptatum qui corporis sapiente natus id ut magni suscipit labore aliquid soluta nemo, reprehenderit itaque ipsum impedit numquam quaerat? Architecto maxime ipsa vel tempore voluptates placeat eos, odio odit voluptas quas cumque ratione quibusdam assumenda quos optio adipisci distinctio eligendi pariatur laudantium, quia fugiat, nostrum hic! Fuga necessitatibus velit laudantium ad consequatur optio voluptas corrupti sint harum, dolor alias commodi reiciendis autem hic, provident adipisci accusamus? Temporibus nesciunt qui facere voluptates, commodi facilis corrupti, exercitationem maiores numquam libero laborum autem mollitia, inventore expedita sunt porro praesentium ex quae suscipit id. Error asperiores corporis aut reiciendis enim, rerum, sapiente atque placeat tempora dicta ut eum sint! Autem explicabo, beatae fugiat ducimus labore cum, illo quasi quis eaque veniam officia dolorem esse quod perferendis? Iure, sunt obcaecati soluta ipsa error laborum velit eius incidunt illo facilis possimus, dolores culpa quis, distinctio ipsam voluptatum quibusdam dolorem voluptatem. Est dolore impedit voluptas obcaecati, voluptatem odio nemo in, similique explicabo reprehenderit voluptatibus provident! Quibusdam corporis, laudantium fugit, ipsum ratione magni ea minima at consequuntur minus temporibus ullam explicabo commodi earum aspernatur, tempora rerum accusamus. Sint dignissimos fugit vero totam? Neque, quasi distinctio? Numquam, excepturi odio velit tenetur voluptas natus modi sunt, eos nemo expedita architecto laudantium impedit deleniti non aperiam veniam? Dicta quibusdam provident quisquam perspiciatis quo neque porro soluta harum nulla nemo cumque, nobis explicabo perferendis fuga itaque nostrum? Accusamus voluptas magnam, atque error odio reiciendis, veniam, aspernatur quo excepturi ullam repudiandae cumque quam repellat? Iste commodi deserunt maxime velit modi optio at illo vel iusto molestias? Eaque nostrum voluptate, magnam quae voluptatibus illum obcaecati molestias dolorem quam possimus odio totam nam iste? Quisquam sint cum vero consequatur facilis explicabo nemo quia, aliquid maiores totam soluta magnam necessitatibus officia quibusdam quod deleniti expedita porro, accusantium ex distinctio illum! Reiciendis eligendi laudantium nihil tempora fuga sed non adipisci magni corrupti repellendus, est quibusdam in iste? Illum laudantium eum similique saepe vero doloremque eaque, asperiores et velit, repellat voluptatem consectetur ipsa. Ullam, reprehenderit quis. Excepturi maiores iure veniam deserunt eius, tempore, dolores deleniti tenetur, voluptatibus distinctio quis repellendus quo animi enim nobis. Perferendis dolorum quibusdam quidem dolorem modi ullam temporibus hic possimus, illo voluptatibus, ipsam omnis debitis, ex adipisci distinctio vel voluptates consequatur iure harum? Non cum corrupti magni. Inventore ipsum laudantium ratione animi, libero officia eveniet fugiat amet, aperiam quo perferendis sequi. Illo illum porro laboriosam tenetur. Eligendi, tempore amet molestiae aperiam, consequatur exercitationem nisi repellat, odit unde hic incidunt a eveniet dicta reprehenderit labore placeat officia. Dolorum hic rerum ad excepturi temporibus, esse ipsam beatae cupiditate mollitia labore sit nihil qui aut autem dolores corporis molestiae at id iusto ut! Labore officia quod esse? Accusantium laboriosam minima hic officia cupiditate assumenda id nemo tempora repellendus, ullam nihil error provident! Nisi iusto beatae fugit accusantium modi illum et sapiente, quisquam, ullam doloribus hic eaque. Beatae quis repellat voluptas repellendus placeat! Quaerat odio commodi tenetur. Consequatur quo, dicta in repellendus distinctio reiciendis fugiat sunt inventore fugit aspernatur libero soluta nesciunt autem repellat quisquam sint iusto architecto officia ducimus necessitatibus. Unde numquam cupiditate a porro minima maxime exercitationem necessitatibus, ullam praesentium dicta voluptates quisquam, nesciunt iste nulla? Obcaecati, blanditiis modi recusandae nostrum ullam non! Eum ipsum ullam enim quaerat libero velit culpa dolore asperiores? Repellendus, sapiente.
                    </div>
                </div>
            } />
        </main>
    );
};

export default MakeAd;