import './InputBox.scss';
import errorIcon from '/media/svg/error-24px.svg';

const InputBox = ({
        inputBoxData, 
        onChange = () => {}, 
        onBlur = () => {}}) => {

    if (!inputBoxData)
        return;

    const renderError = () => {
        if (inputBoxData.error)
            return (
                <div className='input-box__error-container'>
                    <img src={errorIcon} alt='error' className='input-box__error-icon'/>
                    <p className='input-box__error'>{inputBoxData.errorMessage}</p>
                </div>
            );
    }
    
    return (
        <div className='input-box'>
            <label className='input-box__label' htmlFor={inputBoxData.htmlFor}>
                    {inputBoxData.labelText}
            </label>
            <input
                className={`input-box__input ${inputBoxData.error ? 'input-box__input--error' : ''}`}
                type={inputBoxData.type}
                id={inputBoxData.id}
                name={inputBoxData.name}
                value={inputBoxData.value}
                placeholder={inputBoxData.placeholder}
                onChange={onChange}
                onBlur={onBlur}   
                autoComplete={inputBoxData.autoComplete ? inputBoxData.autoComplete : 'off'}
                maxLength={inputBoxData.maxLength}
                readOnly={inputBoxData.readOnly}
            />
            {renderError()}
        </div>
    )
}

export default InputBox;