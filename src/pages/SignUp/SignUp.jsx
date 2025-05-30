import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SignUp.scss';
import InputBox from '../../components/InputBox/InputBox';

const SignUp = () => {


    const [enableSubmit, setEnableSubmit] = useState(false);
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
            error: true,
            errorMessage: 'Email is required',
            isRequired: true
        },
        {
            htmlFor: 'phone',
            labelText: 'Phone',
            type: 'text',
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

    const validateNameOnBlur = (name) => {
        const value = name.value;

        if (value.length === 0) {
            name.error = true;
            name.errorMessage = 'First name is required';
            return;
        }

        if (value.length < 2) {
            name.error = true;
            name.errorMessage = 'First name must be at least 2 characters';
            return;
        }
    }

    const validateName = (name) => {
        const value = name.value;

        name.error = false;

        if (value.length > 50) {
            name.error = true;
            name.errorMessage = 'First name must be less than 50 characters';
            return;
        }

        if (!/^[A-Za-z\s-]+$/.test(value)) {
            name.error = true;
            name.errorMessage = 'First name can only contain letters, spaces, and hyphens';
            return;
        }

        if (/\s{2,}/.test(value)) {
            name.error = true;
            name.errorMessage = 'First name cannot contain multiple consecutive spaces';
            return;
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        const index = formData.findIndex(item => item.name === name);

        if (name === 'firstName' || name === 'lastName') {
            const newFormData = [...formData];
            validateNameOnBlur(newFormData[index]);
            setFormData(newFormData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const index = formData.findIndex(item => item.name === name);
        const newFormData = [...formData];

        newFormData[index].value = value.trim();
        
        if (name === 'firstName' || name === 'lastName') {
            validateName(newFormData[index]);
        }
        
        setFormData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add form validation and API call
        console.log('Form submitted:', formData);
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
                    <button 
                        type="submit" 
                        className={`signup__submit ${enableSubmit ? '' : 'signup__submit--disabled'}`}
                        disabled={!enableSubmit}>
                            Sign Up
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignUp; 