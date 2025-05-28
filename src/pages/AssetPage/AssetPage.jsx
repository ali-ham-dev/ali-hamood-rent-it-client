import './AssetPage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from '../../components/Gallery/Gallery';

const apiUrl = import.meta.env.VITE_API_URL;

const AssetPage = () => {
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
            setAsset(response.data.asset);
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
        <main className='asset-page'>
            <Gallery media={media} />
            <section className='asset-page__container'>
                <h2 className='asset-page__title'>{asset.title}</h2>
                <p className='asset-page__description'>{asset.description}</p>
                <table className='asset-page__table'> 
                    <thead className='asset-page__table-header'>
                        <tr className='asset-page__table-row'>
                            <th className='asset-page__table-header-cell'>Asset ID</th>
                            <th className='asset-page__table-header-cell'>Asset Title</th>
                            <th className='asset-page__table-header-cell'>Asset Description</th>
                        </tr>
                    </thead>
                    <tbody className='asset-page__table-body'>
                        <tr className='asset-page__table-row'>
                            <td className='asset-page__table-cell'>{asset.id}</td>
                            <td className='asset-page__table-cell'>{asset.title}</td>
                            <td className='asset-page__table-cell'>{asset.description}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default AssetPage;
