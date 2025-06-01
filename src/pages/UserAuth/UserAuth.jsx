import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserAuth.scss';
import InputBox from '../../components/InputBox/InputBox';

const apiUrl = import.meta.env.VITE_API_URL;

const UserAuth = () => {
    const { userId, email, expires } = useParams();
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [verificationCode, setVerificationCode] = useState({
        htmlFor: 'verificationCode',
        labelText: 'Verification Code',
        type: 'text',
        name: 'verificationCode',
        value: '',
        error: false,
        errorMessage: 'Please enter a valid 6-digit code',
        isRequired: true,
        maxLength: 6
    });

    // Validate URL parameters
    useEffect(() => {
        if (!userId || !email || !expires) {
            navigate('/signup');
            return;
        }

        const expirationTime = new Date(expires).getTime();
        const now = new Date().getTime();
        
        if (now >= expirationTime) {
            navigate('/signup');
            return;
        }

        // Start countdown
        const timer = setInterval(() => {
            const currentTime = new Date().getTime();
            const remainingTime = Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
            setTimeLeft(remainingTime);

            if (remainingTime === 0) {
                clearInterval(timer);
                navigate('/signup');
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [userId, email, expires, navigate]);

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setVerificationCode(prev => ({
            ...prev,
            value,
            error: false
        }));
    };

    const handleResendCode = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await axios.post(`${apiUrl}/auth/resend-verification-token/${userId}`);
            if (response.status === 200) {
                // Update expiration time from response
                const newExpires = response.data.verificationTokenExpires;
                navigate(`/user-auth/${userId}/${email}/${newExpires}`);
            }
        } catch (error) {
            setError('Failed to resend verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (verificationCode.value.length !== 6) {
            setVerificationCode(prev => ({
                ...prev,
                error: true
            }));
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const response = await axios.post(
                `${apiUrl}/auth/verify-email-token/${userId}/${verificationCode.value}`
            );

            if (response.status === 200) {
                const { token, user } = response.data;
                
                // Store JWT token and user data in cookies
                document.cookie = `jwt=${token}; path=/`;
                document.cookie = `user=${JSON.stringify(user)}; path=/`;
                
                // Navigate to home page or dashboard
                navigate('/');
            }
        } catch (error) {
            setError('Verification code not valid, please try again, or request a new code.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="code-confirmation">
            <div className="code-confirmation__container">
                <h1 className="code-confirmation__title">Code Verification</h1>
                <p className="code-confirmation__email">
                    A code has been sent to {email}
                </p>
                <p className="code-confirmation__instruction">
                    Please enter the code below to confirm your identity:
                </p>
                <p className="code-confirmation__timer">
                    Your code will expire in {timeLeft} seconds
                </p>
                
                {error && (
                    <div className="code-confirmation__error">
                        <p>{error}</p>
                    </div>
                )}

                <form className="code-confirmation__form" onSubmit={handleSubmit}>
                    <InputBox
                        inputBoxData={verificationCode}
                        onChange={handleCodeChange}
                    />
                    <div className="code-confirmation__buttons">
                        <button
                            type="button"
                            className="code-confirmation__resend"
                            onClick={handleResendCode}
                            disabled={isLoading}
                        >
                            Resend Code
                        </button>
                        <button
                            type="submit"
                            className="code-confirmation__submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Submit Code'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default UserAuth;