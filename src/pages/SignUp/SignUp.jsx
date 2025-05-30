import { useState } from 'react';
import './SignUp.scss';

const SignUp = () => {


    //     nameOnCard: '',
    //     cardNumber: '',
    //     expirationDate: '',
    //     cvv: '',
    //     cardType: '',
    //     billingCountry: '',
    //     billingCity: '',
    //     billingState: '',
    //     billingAddress: '',
    //     billingUnit: '',
    //     billingPostalCode: '',


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const renderInputFeilds = (
        htmlFor = '', 
        labelText = '', 
        type = 'text', 
        id = '', 
        name = '', 
        value = '', 
        onChange  = () => {return }, 
        required = false) => {
        return (
            <div className="signup__form-group">
                <label htmlFor={htmlFor}>{labelText}</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            </div>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
                    {renderInputFeilds(
                        'firstName',
                        'First Name',
                        'text',
                        'firstName',
                        'firstName',
                        formData.firstName,
                        handleChange,
                        true
                    )}
                    {renderInputFeilds(
                        'lastName',
                        'Last Name',
                        'text',
                        'lastName',
                        'lastName',
                        formData.lastName,
                        handleChange,
                        true
                    )}
                    {renderInputFeilds(
                        'email',
                        'Email',
                        'email',
                        'email',
                        'email',
                        formData.email,
                        handleChange,
                        true
                    )}
                    {renderInputFeilds(
                        'phone',
                        'Phone',
                        'phone',
                        'phone',
                        'phone',
                        formData.phone,
                        handleChange,
                        true
                    )}
                    {renderInputFeilds(
                        'password',
                        'Password',
                        'password',
                        'password',
                        'password',
                        formData.password,
                        handleChange,
                        true
                    )}
                    {renderInputFeilds(
                        'confirmPassword',
                        'Confirm Password',
                        'password',
                        'confirmPassword',
                        'confirmPassword',
                        formData.confirmPassword,
                        handleChange,
                        true
                    )}
                    <button type="submit" className="signup__submit">Sign Up</button>
                </form>
            </div>
        </main>
    );
};

export default SignUp; 