import './DropDown.scss';
import { useState } from 'react';

const DropDown = ({ title, content, setValue, value }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = (e) => {
        e.preventDefault();
        if (isOpen) {
            setValue(e.target.textContent);
        }
        setIsOpen(!isOpen);
    };

    const renderHeader = () => {
        return (
            <button className={`drop-down__header-button ${isOpen ? 'drop-down__header-button--open' : ''}`} onClick={toggleDropDown}>
                <h2 className='drop-down__title'>{value}</h2>
                {
                    isOpen ? (
                        <svg className={`drop-down__header-icon ${isOpen ? 'drop-down__header-icon--open' : ''}`} xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10H7Z"/>
                        </svg>
                    ) : (
                        <svg className='drop-down__header-icon' xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 14L12 9L17 14H7Z"/>
                        </svg>
                    )
                }
            </button>
        );
    };

    const renderContent = () => {
        return (
            content.map((item, index) => {
                return (
                    <button className='drop-down__content' key={index} onClick={toggleDropDown}>
                        {item}
                    </button>
                );
            })
        );
    };

    return (
        <div className='drop-down'>
            {renderHeader()}
            {isOpen && renderContent()}
        </div>
    );
};

export default DropDown;