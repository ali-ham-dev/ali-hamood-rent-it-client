import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './SignUp.scss';
import InputBox from '../../components/InputBox/InputBox';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

const apiUrl = import.meta.env.VITE_API_URL;
const signUpEp = import.meta.env.VITE_SIGN_UP_EP;
const checkEmailEp = import.meta.env.VITE_CHECK_EMAIL_EP;

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([
       {
            htmlFor: 'firstName',
            labelText: 'First Name',
            type: 'text',
            name: 'firstName',
            value: 'Ali',
            error: false,
            errorMessage: 'First name is required',
            isRequired: true
        },
        {
            htmlFor: 'lastName',
            labelText: 'Last Name',
            type: 'text',
            name: 'lastName',
            value: 'ali',
            error: false,
            errorMessage: 'Last name is required',
            isRequired: true
        },
        {
            htmlFor: 'email',
            labelText: 'Email',
            type: 'email',
            name: 'email',
            value: 'ali@gmail.com',
            error: false,
            errorMessage: 'Email is required',
            isRequired: true
        },
        {
            htmlFor: 'phone',
            labelText: 'Phone',
            type: 'tel',
            name: 'phone',
            value: '1234567890',
            error: false,
            errorMessage: 'Phone is required',
            isRequired: true
        },
        {
            htmlFor: 'password',
            labelText: 'Password',
            type: 'password',
            name: 'password',
            value: 'Qq!12345',
            error: false,
            errorMessage: 'Password is required',
            isRequired: true,
            autoComplete: 'new-password'
        },
        {
            htmlFor: 'confirmPassword',
            labelText: 'Confirm Password',
            type: 'password',
            name: 'confirmPassword',
            value: 'Qq!12345',
            error: false,
            errorMessage: 'Confirm password is required',
            isRequired: true,
            autoComplete: 'new-password'
        },
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');

    const checkEmptyFieldOnBlur = (inputFeild) => {
        const value = inputFeild.value;

        if (value.length === 0) {
            inputFeild.error = true;
            inputFeild.errorMessage = 'This field is required';
            return;
        }
    }

    const validateNameOnBlur = (inputFeild) => {
        const value = inputFeild.value;

        if (value.length < 2) {
            inputFeild.error = true;
            inputFeild.errorMessage = 'Name must be at least 2 characters';
            return;
        }
    }

    const validateName = (inputFeild) => {
        const value = inputFeild.value;

        inputFeild.error = false;

        if (value.length > 50) {
            inputFeild.error = true;
            inputFeild.errorMessage = 'Name must be less than 50 characters';
            return;
        }

        const charOnlyRegex = /^[A-Za-z\s-]+$/;
        if (!charOnlyRegex.test(value)) {
            inputFeild.error = true;
            inputFeild.errorMessage = 'Name can only contain letters, spaces, and hyphens';
            return;
        }

        const consecutiveSpacesRegex = /\s{2,}/;
        if (consecutiveSpacesRegex.test(value)) {
            inputFeild.error = true;
            inputFeild.errorMessage = 'Name cannot contain multiple consecutive spaces';
            return;
        }
    }

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

    const validatePhoneOnBlur = (inputField) => {
        const numericValue = inputField.value.replace(/\D/g, '');

        if (numericValue.length <= 3) {
            const formattedNumber = numericValue.replace(/(\d{0,3})/, '($1)');
            inputField.value = formattedNumber;
        }

        if (numericValue.length > 3 && numericValue.length <= 6) {
            const formattedNumber = numericValue.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            inputField.value = formattedNumber;
        }

        if (numericValue.length > 6) {
            const formattedNumber = numericValue.replace(/(\d{3})(\d{3})(\d{0,4})/, '($1) $2-$3');
            inputField.value = formattedNumber;
        }

        if (numericValue.length < 10 || numericValue.length > 15) {
            inputField.error = true;
            inputField.errorMessage = 'Please enter a valid phone number';
            return;
        }

        inputField.error = false;
    }

    const validatePhone = (inputField) => {
        const value = inputField.value;
        inputField.error = false;

        if (!/^[0-9]+$/.test(value)) {
            inputField.error = true;
            inputField.errorMessage = 'Phone number can only contain numbers';
            inputField.value = value.replace(/\D/g, '');
        }
    };

    const validatePassword = (inputField) => {
        const value = inputField.value;
        inputField.error = false;

        if (value.length < 8) {
            inputField.error = true;
            inputField.errorMessage = 'Password must be at least 8 characters';
            return;
        }

        if (!/[A-Z]/.test(value)) {
            inputField.error = true;
            inputField.errorMessage = 'Password must contain at least one uppercase letter';
            return;
        }

        if (!/[a-z]/.test(value)) {
            inputField.error = true;
            inputField.errorMessage = 'Password must contain at least one lowercase letter';
            return;
        }

        if (!/[0-9]/.test(value)) {
            inputField.error = true;
            inputField.errorMessage = 'Password must contain at least one number';
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            inputField.error = true;
            inputField.errorMessage = 'Password must contain at least one special character: ! @ # $ % ^ & * ( ) , . ? : { } | < >';
            return;
        }

        if (value.length > 50) {
            inputField.error = true;
            inputField.errorMessage = 'Password must be less than 50 characters';
            return;
        }
    };

    const validateConfirmPassword = (inputField) => {
        const password = formData.find(item => item.name === 'password').value;
        const confirmPassword = inputField.value;
        inputField.error = false;

        if (confirmPassword !== password) {
            inputField.error = true;
            inputField.errorMessage = 'Passwords do not match';
            return;
        }
    };

    const handleBlur = async (e) => {
        const { name } = e.target;
        const index = formData.findIndex(item => item.name === name);
        const newFormData = [...formData];

        if (name === 'firstName' || name === 'lastName') {
            validateNameOnBlur(newFormData[index]);
        }

        if (name === 'email') {
            await validateEmailOnBlur(newFormData[index]);
        }

        if (name === 'phone') {
            validatePhoneOnBlur(newFormData[index]);
        }

        if (name === 'password') {
            validatePassword(newFormData[index]);
        }

        if (name === 'confirmPassword') {
            validateConfirmPassword(newFormData[index]);
        }

        checkEmptyFieldOnBlur(newFormData[index]);
        setFormData(newFormData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const index = formData.findIndex(item => item.name === name);
        const newFormData = [...formData];

        newFormData[index].value = value.trim();
        
        if (name === 'firstName' || name === 'lastName') {
            validateName(newFormData[index]);
        }

        if (name === 'phone') {
            validatePhone(newFormData[index]);
        }
        
        setFormData(newFormData);
    };

    const apiPayload = () => {
        const payload = {};
        const password = formData.find(item => item.name === 'password').value;

        // TODO: Learn about how this works.
        // Generate a random salt
        // const salt = window.crypto.getRandomValues(new Uint8Array(16));
        // const passwordBytes = new TextEncoder().encode(password);
        // const saltedPassword = new Uint8Array([...salt, ...passwordBytes]);
        // const hashedPassword = SHA256(saltedPassword).toString();
        
        // Send both the hash and salt to the backend
        // payload[item.name] = {
        //     hash: hashedPassword,
        //     salt: Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
        // };

        formData.forEach(item => {
            if (item.name === 'password') {
                payload[item.name] = SHA256(password).toString();
            } else if (item.name !== 'confirmPassword') {
                payload[item.name] = item.value;
            }
        });

        return payload;
    }

    const postSignUp = async (payload) => {
        try {
            const payload = apiPayload();

            const response = await axios.post(`${apiUrl}${signUpEp}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Sign up successful');
                navigate(`/user-auth/${response.data.userId}/${encodeURIComponent(payload.email)}/${encodeURIComponent(response.data.verificationTokenExpires)}`);
            }
        } catch (error) {
            console.error('Sign up failed', error);
            setSubmitError(true);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitError(false);
        setSubmitErrorMessage('');

        const newFormData = [...formData];
        let isFormValid = true;
        let errorMessage = '';

        for (const [index, item] of newFormData.entries()) {
            if (item.name === 'firstName' || item.name === 'lastName') {
                validateName(item);
                validateNameOnBlur(item);
            }

            if (item.name === 'email') {
                await validateEmailOnBlur(item);
            }

            if (item.name === 'phone') {
                validatePhone(item);
                validatePhoneOnBlur(item);
            }

            if (item.name === 'password') {
                validatePassword(item);
            }

            if (item.name === 'confirmPassword') {
                validateConfirmPassword(item);
            }

            if (item.error === true) {
                isFormValid = false;
                errorMessage = `There is an issue with the ${item.labelText} field.`;
                break;
            }

            newFormData[index] = item;
        }

        if (!isFormValid) {
            setIsLoading(false);
            setFormData(newFormData);
            setSubmitError(true);
            setSubmitErrorMessage(errorMessage);
            return;
        }

        setIsLoading(false);
        await postSignUp();
    };

    return (
        <main className="signup">
            <div className="signup__container">
                <h1 className="signup__title">Create an Account</h1>
                {submitError && (
                    <div className="signup__error">
                        <p className="signup__error-message">
                            {submitErrorMessage ? 
                                submitErrorMessage : 
                                'There was an error signing up. Please try again or contact support.'}
                        </p>
                    </div>
                )}
                <form className="signup__form" onSubmit={handleSubmit}>
                    {formData.map((item, index) => (
                        <InputBox 
                            inputBoxData={item} 
                            key={index} 
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    ))}
                    <button 
                        type="submit" 
                        className={`signup__submit ${isLoading ? 'signup__submit--loading' : ''}`}
                        disabled={isLoading}>
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignUp; 