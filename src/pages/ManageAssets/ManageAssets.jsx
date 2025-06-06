import './ManageAssets.scss';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const getAssetsEp = import.meta.env.VITE_ASSET_FOR_RENT_EP;

const ManageAssets = ({ jwt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [userMessage, setUserMessage] = useState('');

    useEffect( async () => {
        if (!jwt) {
            setIsLoading(false);
            setDisplayMessage(true);
            setUserMessage('You are not logged in.');
            setIsError(true);
        }

        try {
            // const response = await axios.get(`${apiUrl}/assets/rented`, {
            //     headers: {
            //         'Authorization': `Bearer ${jwt}`
            //     }
            // });
            // console.log('response', response);
        } catch (error) {
            console.error('Error fetching rented assets:', error);
            setIsLoading(false);
            setDisplayMessage(true);
            setUserMessage('Error fetching rented assets.');
            setIsError(true);
        }
    }, []);

    return (
        <main className='manage-assets'>
            {displayMessage && 
                <div className={`manage-assets__message ${isError ? 'manage-assets__message--error' : ''}`}>
                    {isLoading ? 'Loading...' : userMessage}
                </div>}
            <Section title='Manage Assets for Rent:' headingLevel='h2' isCollapsible={true} content={
                <div className='manage-assets__content'>
                    <h3>Manage Rented</h3>
                </div>
            } />
            <Section title='Manage Rented Assets:' headingLevel='h2' isCollapsible={true} content={
                <div className='manage-assets__content'>
                    <h3>Manage Rented</h3>
                </div>
            } />
        </main>
    );
};

export default ManageAssets;