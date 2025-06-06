import './ManageAssets.scss';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import axios from 'axios';
import AssetCard from '../../components/AssetCard/AssetCard';

const apiUrl = import.meta.env.VITE_API_URL;
const getForAssetsEp = import.meta.env.VITE_ASSET_FOR_RENT_EP;
const getRentedAssetsEp = import.meta.env.VITE_RENTED_ASSETS_EP;

const ManageAssets = ({ jwt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [assetsForRent, setAssetsForRent] = useState([]);
    const [rentedAssets, setRentedAssets] = useState([]);

    const renderAssetsForRent = () => {
        if (!assetsForRent || assetsForRent.length === 0) {
            return 
        }

        return assetsForRent.map(asset => (
            <div key={asset.id} className='manage-assets__asset-card-container'>
                <AssetCard assetId={asset.id} />
            </div>
        ));
    }

    const renderRentedAssets = () => {
        if (!rentedAssets || rentedAssets.length === 0) {
            return 
        }

        return rentedAssets.map(asset => (
            <div key={asset.id} className='manage-assets__asset-card-container'>
                <AssetCard assetId={asset.id} />
            </div>
        ));
    }

    const fetchAssetsForRent = async () => {
        const response = await axios.get(`${apiUrl}${getForAssetsEp}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (response.status === 200 && response.data)
            return setAssetsForRent(response.data);

        throw new Error('Error fetching rented assets.');
    }

    const fetchRentedAssets = async () => {
        const response = await axios.get(`${apiUrl}${getRentedAssetsEp}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (response.status === 200 && response.data)
            return setRentedAssets(response.data);

        throw new Error('Error fetching rented assets.');
    }

    useEffect( () => {
        if (!jwt) {
            setIsLoading(false);
            setDisplayMessage(true);
            setUserMessage('You are not logged in.');
            setIsError(true);
        }
        try {
            fetchAssetsForRent();
            fetchRentedAssets();
        } catch (error) {
            console.error('Error fetching rented assets:', error);
            setIsLoading(false);
            setDisplayMessage(true);
            setUserMessage('Error fetching rented assets.');
            setIsError(true);
        }
    }, [jwt]);

    return (
        <main className='manage-assets'>
            {displayMessage && 
                <div className={`manage-assets__message-box ${isError ? 'manage-assets__message-box--error' : ''}`}>
                    {isLoading ? 'Loading...' : userMessage}
                </div>}
            <Section title='Manage Assets for Rent:' headingLevel='h2' isCollapsible={true} content={
                assetsForRent.length > 0 ? renderAssetsForRent() : (
                    <div className='manage-assets__message'>
                        <p>No assets for rent.</p>
                    </div>
                )
            } />
            <Section title='Manage Rented Assets:' headingLevel='h2' isCollapsible={true} content={
                rentedAssets.length > 0 ? renderRentedAssets() : (
                    <div className='manage-assets__message'>
                        <p>No assets have been rented.</p>
                    </div>
                )
            } />
        </main>
    );
};

export default ManageAssets;