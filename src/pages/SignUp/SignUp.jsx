import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SignUp.scss';
import InputBox from '../../components/InputBox/InputBox';

const SignUp = () => {
    const [formData, setFormData] = useState([
       {
            htmlFor: 'firstName',
            labelText: 'First Name',
            type: 'text',
            name: 'firstName',
            value: '',
            error: false,
            errorMessage: 'First name is required',
            isRequired: true
        },
        {
            htmlFor: 'lastName',
            labelText: 'Last Name',
            type: 'text',
            name: 'lastName',
            value: '',
            error: false,
            errorMessage: 'Last name is required',
            isRequired: true
        },
        {
            htmlFor: 'email',
            labelText: 'Email',
            type: 'email',
            name: 'email',
            value: '',
            error: false,
            errorMessage: 'Email is required',
            isRequired: true
        },
        {
            htmlFor: 'phone',
            labelText: 'Phone',
            type: 'tel',
            name: 'phone',
            value: '',
            error: false,
            errorMessage: 'Phone is required',
            isRequired: true
        },
        {
            htmlFor: 'password',
            labelText: 'Password',
            type: 'password',
            name: 'password',
            value: '',
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
            value: '',
            error: false,
            errorMessage: 'Confirm password is required',
            isRequired: true,
            autoComplete: 'new-password'
        },
    ]);

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

    const validateEmail = (inputField) => {
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

    const handleBlur = (e) => {
        const { name } = e.target;
        const index = formData.findIndex(item => item.name === name);
        const newFormData = [...formData];

        if (name === 'firstName' || name === 'lastName') {
            validateNameOnBlur(newFormData[index]);
        }

        if (name === 'email') {
            validateEmail(newFormData[index]);
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

        formData.forEach(item => {
            payload[item.name] = item.value;
        });

        return payload;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        formData.forEach(item => {
            handleChange({target: item});
            handleBlur({target: item});
        });

        const isFormValid = formData.every(item => !item.error);

        if (!isFormValid) {
            return;
        }

        const payload = apiPayload();
        console.log(payload);

        // TODO: Add form validation and API call
    };

    return (
        <main className="signup">
            <div className="signup__container">
                <h1 className="signup__title">Create an Account</h1>
                <form className="signup__form" onSubmit={handleSubmit}>
                    {formData.map((item, index) => (
                        <InputBox 
                            inputBoxData={item} 
                            key={index} 
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    ))}
                    <button type="submit" className='signup__submit'>
                            Sign Up
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignUp; 