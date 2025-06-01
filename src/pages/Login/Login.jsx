import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import InputBox from '../../components/InputBox/InputBox';

const apiUrl = import.meta.env.VITE_API_URL;
const resendVerificationTokenEp = import.meta.env.VITE_RESEND_TOK_EP;
const verifyEmailTokenEp = import.meta.env.VITE_VERIFY_EMAIL_TOKEN_EP;
const Login = () => {

    // const { userId, email } = useParams();
    const [expires, setExpires] = useState(useParams().expires);
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [email, setEmail] = useState({
        htmlFor: 'email',
        labelText: 'Please enter your email to login:',
        type: 'email',
        name: 'email',
        value: '',
        placeholder: 'Enter your email',
        error: false,
        errorMessage: '',
        isRequired: true,
        maxLength: 254
    });

    const calcTimeLeft = (expires) => {
        const expirationTime = new Date(expires).getTime();
        const now = new Date().getTime();
        return Math.max(0, Math.floor((expirationTime - now) / 1000));
    }

    useEffect(() => {
        // if (!userId || !email || !expires) {
        //     setError('Invalid credentials, please try again.');
        //     return;
        // }

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

    const handleEmailBlur = (e) => {

    }

    const handleEmailChange = (e) => {

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="login">
            <div className="login__container">
                <h1 className="login__title">Login</h1>
                
                {error && (
                    <div className="login__error">
                        <p>{error}</p>
                    </div>
                )}

                <form className="login__form" onSubmit={handleSubmit}>
                    <InputBox inputBoxData={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
                    <div className="login__buttons">
                        <button
                            type="submit"
                            className="login__submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;