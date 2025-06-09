import './AssetPage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from '../../components/Gallery/Gallery';
import Section from '../../components/Section/Section';
import InputBox from '../../components/InputBox/InputBox';

const apiUrl = import.meta.env.VITE_API_URL;
const assetsEp = import.meta.env.VITE_ASSETS_EP;

const AssetPage = () => {
    const { assetId } = useParams();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [asset, setAsset] = useState(null);
    const [media, setMedia] = useState(null);
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
        maxLength: 254,
        readOnly: true
    });
    
    useEffect( () => {
        const fetchAsset = async () => {
            try {
                if (!assetId) {
                    throw new Error('Invalid asset id');
                }
                const response = await axios.get(`${apiUrl}${assetsEp}/${assetId}`);
                if (response.status === 200) {
                    setAsset(response.data);
                    setMedia([
                        ...(response.data.media || [])
                    ]);
                }
            } catch (error) {
                console.error(`Error fetching asset with id: ${assetId}`, error);
            }
        }

        fetchAsset();
    }, [])

    useEffect( () => {
        if (asset) {
            setTitleInputBox({
                ...titleInputBox,
                value: asset.title
            });
        }

        if (media) {
            setMedia([
                ...(media || [])
            ]);
        }
    }, [asset]);

    const handleEditButtonClick = () => {
        console.log(asset);
    }

    return (
        <main className='asset-page'>
            {isError && <div className='asset-page__error'>{errorMessage}</div>}
            <Section title='Title' headingLevel='h2' isCollapsible={true} content={
                <InputBox inputBoxData={titleInputBox} />
            } />
            <Section title='Gallery' headingLevel='h2' isCollapsible={true} content={
                <Gallery media={media} />
            } />
            <button className='asset-page__edit-button' onClick={handleEditButtonClick}>Edit</button>
        </main>
    )
}
// TODO: Gallery, title, description, price, location, specifications {key value pairs}, embeded custom content. , rent process. -> questions and forms
// TODO: Active inactive?
export default AssetPage;