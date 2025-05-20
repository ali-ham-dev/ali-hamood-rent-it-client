import './HomePublic.scss';
import AssetCardPublic from '../../components/AssetCardPublic/AssetCardPublic';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

// Future features:
// - Add categories to the home page.
// - Add pagination to the home page.
// - Add dynamic filters.

const HomePublic = () => {

    const [assetIds, setAssetIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Rendering functions.

    const renderLoading = () => {
        return (
            <div className='loading'>
                <h2 className='loading-title'>Loading...</h2>
                <p className='loading-description'>Please wait while we load the assets.</p>
            </div>
        );
    }

    const renderError = () => {
        return (
            <div className='error'>
                <h2 className='error-title'>Error</h2>
                <p className='error-description'>
                    An error occurred while loading the assets.
                    Please try again later.
                </p>
            </div>
        );
    }

    const renderAssetCards = () => {
        if (loading) {
            return renderLoading();
        }

        if (error || !assetIds.length) {
            return renderError();
        }

        return assetIds.map((assetId) => (
            <AssetCardPublic key={uuidv4()} assetId={assetId} />
        ));
    }

    // Loading data

    const fetchAssetIds = async () => { 
        const response = await axios.get(`${apiUrl}/assets`);

        if (response.status === 200) {
            setAssetIds(response.data.map(asset => asset.id));
        }

        setAssetIds(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    }

    // loading, or error? 

    useEffect(()=>{
        const fetchAsset = async () => {
            try {
                await fetchAssetIds();
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching asset ids: ${error}`);
                setError(true);
            }
        }
        fetchAsset();
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