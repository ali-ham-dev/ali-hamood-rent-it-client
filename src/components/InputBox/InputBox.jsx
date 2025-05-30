import './InputBox.scss';

const InputBox = ({inputBoxData, onChange = () => {}}) => {

    if (!inputBoxData)
        return
    
    return (
        <div className='input-box'>
            <label className='input-box__label' htmlFor={inputBoxData.htmlFor}>
                    {inputBoxData.labelText}
            </label>
            <input
                className='input-box__input'
                type={inputBoxData.type}
                id={inputBoxData.id}
                name={inputBoxData.name}
                value={inputBoxData.value}
                onChange={onChange}
                autoComplete={inputBoxData.autoComplete ? inputBoxData.autoComplete : 'off'}
            />
            <p className='input-box__error'>"fkusdhkljfhdsljkh</p>
        </div>
    )
}

export default InputBox;