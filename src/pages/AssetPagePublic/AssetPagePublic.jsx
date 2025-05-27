import './AssetPagePublic.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from '../../components/Gallery/Gallery';

const apiUrl = import.meta.env.VITE_API_URL;

const AssetPagePublic = () => {
    const { assetId } = useParams();
    const [asset, setAsset] = useState({});
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState({});

    const fetchAssetDetails = async () => {

        if (!assetId) {
            throw new Error('Invalid asset id');
        }

        const response = await axios.get(`${apiUrl}/assets/${assetId}`);
        if (response.status === 200) {
            setAsset(response.data);
            setMedia([
                ...(response.data.media.images || []), 
                ...(response.data.media.videos || [])
            ]);
        }
    }

    useEffect( () => {
        const fetchAsset = async () => {
            try {
                await fetchAssetDetails();
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching asset with id: ${assetId}`, error);
                setLoading(true);
            }
        }
        fetchAsset();
    }, [])

    return (
        <main className='asset-page-public'>
            <Gallery media={media} />
            <p className='asset-page-public__text'>Asset Page</p>
        </main>
    )
}

export default AssetPagePublic;
