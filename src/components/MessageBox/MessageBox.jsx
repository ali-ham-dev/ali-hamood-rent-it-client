import './MessageBox.scss';

const MessageBox = ({messageBox}) => {

    if (!messageBox) {
        messageBox = {
            message: 'No message provided',
            isError: false,
            onFirstButton: () => {},
            onFirstButtonText: 'Close',
            onSecondButton: () => {},
            onSecondButtonText: 'Confirm'
        }
    }

    if (!messageBox.onFirstButtonText) {
        messageBox.onFirstButtonText = 'Close';
    }

    const handleFirstButtonClick = () => {
        messageBox.onFirstButton();
    }

    const handleSecondButtonClick = () => {
        messageBox.onSecondButton && messageBox.onSecondButton();
    }

    return (
        <div className='message-box'>
            <div className='message-box__underlay'></div>
            <div className={`message-box__content ${messageBox.isError ? 'message-box__content--error' : ''}`}>
                <p className={`message-box__message ${messageBox.isError ? 'message-box__message--error' : ''}`}>
                    {messageBox.message}
                </p>
                <div className='message-box__button-container'>
                    {<button 
                        className={`message-box__close-button ${messageBox.isError ? 'message-box__close-button--error' : ''}`} 
                        onClick={handleFirstButtonClick}>
                            {messageBox.onFirstButtonText}
                        </button>}
                    {messageBox.onSecondButton && <button 
                        className={`message-box__confirm-button ${messageBox.isError ? 'message-box__confirm-button--error' : ''}`} 
                        onClick={handleSecondButtonClick}>
                            {messageBox.onSecondButtonText}
                        </button>}
                </div>
            </div>
        </div>
    );
};

export default MessageBox;