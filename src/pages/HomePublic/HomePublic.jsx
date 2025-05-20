import './HomePublic.scss';
import AssetCardPublic from '../../components/AssetCardPublic/AssetCardPublic';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const HomePublic = () => {

    const [assetIds, setAssetIds] = useState(['1']);
    const [loading, setLoading] = useState(true);

    // Rendering functions.

    const renderAssetCards = () => {
        return assetIds.map((assetId) => (
            <AssetCardPublic key={uuidv4()} assetId={assetId} />
        ));
    }

    // Loading data

    const fetchAssetIds = async () => { 
        const response = await axios.get(`${apiUrl}/assets`);

        if (response.status === 200) {
            console.log(response.data);
            // setAssetIds([
            //     ...(response.data.map(asset => asset.id)) || []
            // ]);
        }
    }

    useEffect(()=>{
        const fetchAsset = async () => {
            try {
                await fetchAssetIds();
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching asset ids: ${error}`);
            }
        }
        // fetchAsset();
    }, []);

    return (
        <main>
            <div className='home-public'>
                {renderAssetCards()}
            </div>
        </main>
    )
}

export default HomePublic;