import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import InputBox from '../../components/InputBox/InputBox';

const apiUrl = import.meta.env.VITE_API_URL;
const resendVerificationTokenEp = import.meta.env.VITE_RESEND_TOK_EP;
const verifyEmailTokenEp = import.meta.env.VITE_VERIFY_EMAIL_TOKEN_EP;
const Login = () => {

    const { userId, email } = useParams();
    const [expires, setExpires] = useState(useParams().expires);
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
        errorMessage: '',
        isRequired: true,
        maxLength: 6
    });

    const calcTimeLeft = (expires) => {
        const expirationTime = new Date(expires).getTime();
        const now = new Date().getTime();
        return Math.max(0, Math.floor((expirationTime - now) / 1000));
    }

    useEffect(() => {
        if (!userId || !email || !expires) {
            setError('Invalid credentials, please try again.');
            return;
        }

        const expirationTime = new Date(expires).getTime();
        const now = new Date().getTime();
        
        if (now >= expirationTime) {
            setError('Invalid credentials, please try again.');
            return;
        }

        const timer = setInterval(() => {
            const remainingTime = calcTimeLeft(expires);
            setTimeLeft(remainingTime);

            if (remainingTime <= 0) {
                setError('Code expired, please request a new code.');
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expires]);

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setVerificationCode((prev) => ({
            ...prev,
            value,
            error: false
        }));
    };

    const handleResendCode = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await axios.post(`${apiUrl}${resendVerificationTokenEp}/${userId}`);
            if (response.status === 200 && 
                response.data && 
                response.data.token && 
                response.data.token.expires) {

                setExpires(response.data.token.expires);
                setTimeLeft(calcTimeLeft(expires));
            }
        } catch (error) {
            console.log(`Failed to resend verification code: ${error}`);
            const generalErrorMessage = 'Failed to resend verification code. Please try again.';
            if (error.response && 
                error.response.status === 400 && 
                error.response.data?.error) {

                const backendErrorMessage = error.response.data?.error;
                const errorMessage = backendErrorMessage ?? generalErrorMessage;
                setError(errorMessage);

                if (error.response.data?.token &&
                    error.response.data.token?.expires) {
                    setExpires(error.response.data.token.expires);
                    setTimeLeft(calcTimeLeft(expires));
                }
            } else {
                setError(generalErrorMessage);
            }
        } finally { 
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (verificationCode.value.length !== 6) {
            setVerificationCode(prev => ({
                ...prev,
                error: true,
                errorMessage: 'Please enter a valid 6-digit code'
            }));
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const response = await axios.post(
                `${apiUrl}${verifyEmailTokenEp}/${userId}/${verificationCode.value}`
            );

            if (response.status === 200) {
                const { token, user } = response.data;
                document.cookie = `jwt=${token}; path=/`;
                document.cookie = `user=${JSON.stringify(user)}; path=/`;
                navigate('/');
            }
        } catch (error) {
            console.log(`Failed to verify email token: ${error}`);
            const generalErrorMessage = 'Verification code not valid, please try again, or request a new code.';
            if (error.response && error.response.status === 400 && error.response.data?.error) {
                const errorMessage = error.response.data?.error ?? generalErrorMessage;
                setError(errorMessage);
            } else {
                setError(generalErrorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="login">
            <div className="login__container">
                <h1 className="login__title">Code Verification</h1>
                <p className="login__email">
                    A code has been sent to {email}
                </p>
                <p className="login__instruction">
                    Please enter the code below to confirm your identity:
                </p>
                <p className="login__timer">
                    Your code will expire in {timeLeft} seconds
                </p>
                
                {error && (
                    <div className="login__error">
                        <p>{error}</p>
                    </div>
                )}

                <form className="login__form" onSubmit={handleSubmit}>
                    <InputBox inputBoxData={verificationCode} onChange={handleCodeChange} />
                    <div className="login__buttons">
                        <button
                            type="button"
                            className="login__resend"
                            onClick={handleResendCode}
                            disabled={isLoading}
                        >
                            Resend Code
                        </button>
                        <button
                            type="submit"
                            className="login__submit"
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

export default Login;