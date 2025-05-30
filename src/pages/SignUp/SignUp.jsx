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
            isRequired: true
        },
        {
            htmlFor: 'lastName',
            labelText: 'Last Name',
            type: 'text',
            name: 'lastName',
            value: '',
            error: false,
            isRequired: true
        },
        {
            htmlFor: 'email',
            labelText: 'Email',
            type: 'email',
            name: 'email',
            value: '',
            error: false,
            isRequired: true
        },
        {
            htmlFor: 'phone',
            labelText: 'Phone',
            type: 'text',
            name: 'phone',
            value: '',
            error: false,
            isRequired: true
        },
        {
            htmlFor: 'password',
            labelText: 'Password',
            type: 'password',
            name: 'password',
            value: '',
            error: false,
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
            isRequired: true,
            autoComplete: 'new-password'
        },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const index = formData.findIndex(item => item.name === name);
        const newFormData = [...formData];

        newFormData[index].value = value;
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
                        <InputBox inputBoxData={item} key={index} onChange={handleChange}/>
                    ))}
                    <button type="submit" className="signup__submit">Sign Up</button>
                </form>
            </div>
        </main>
    );
};

export default SignUp; 