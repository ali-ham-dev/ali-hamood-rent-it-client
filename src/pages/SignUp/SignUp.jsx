import { useState } from 'react';
import './SignUp.scss';

const SignUp = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        country: '',
        city: '',
        state: '',
        address: '',
        unit: '',
        postalCode: '',
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardType: '',
        billingCountry: '',
        billingCity: '',
        billingState: '',
        billingAddress: '',
        billingUnit: '',
        billingPostalCode: '',
    });

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
                    <div className="signup__form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup__form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup__form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup__form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup__form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup__submit">Sign Up</button>
                </form>
            </div>
        </main>
    );
};

export default SignUp; 