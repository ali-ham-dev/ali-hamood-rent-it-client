import './ManageRented.scss';
import { useState, useEffect } from 'react';

const ManageRented = ({ jwt }) => {


    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [userMessage, setUserMessage] = useState('');

    return (
        <main className='manage-rented'>
            {displayMessage && 
                <div className={`manage-rented__message ${isError ? 'manage-rented__message--error' : ''}`}>
                    {isLoading ? 'Loading...' : userMessage}
                </div>}
            <h1>Manage Rented</h1>
        </main>
    );
};

export default ManageRented;