import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import InputBox from '../../components/InputBox/InputBox';

const apiUrl = import.meta.env.VITE_API_URL;
const checkEmailEp = import.meta.env.VITE_CHECK_EMAIL_EP;
const loginWithEmailEp = import.meta.env.VITE_LOGIN_WITH_EMAIL_EP;

const Login = () => {

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

    const validateEmailOnBlur = async (inputField) => {
        const value = inputField.value;
        inputField.error = false;

        if (value.length > 254) {
            inputField.error = true;
            inputField.errorMessage = 'Email must be less than 254 characters';
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            inputField.error = true;
            inputField.errorMessage = 'Please enter a valid email address';
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${apiUrl}${checkEmailEp}`, {
                email: value
            });
            if (response &&
                response.status === 200 &&
                response.data.emailIsAvailable === false
            ) {
                    inputField.error = true;
                    inputField.errorMessage = 'Email already exists';
                    return;
            }
        } catch (error) {
            console.error('Error checking email', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailBlur = (e) => {
        validateEmailOnBlur(email);
    }

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
                    <InputBox inputBoxData={email} onBlur={handleEmailBlur} />
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