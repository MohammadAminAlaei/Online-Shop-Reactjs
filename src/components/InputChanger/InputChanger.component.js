import React from 'react';

function InputChanger(props) {
    const {placeholder, style, type, name, onChange, onBlur, onInput} = props
    return (
        <>
            <input placeholder={placeholder} type={type} name={name} onChange={onChange} onBlur={onBlur}
                   onInput={onInput}
                   style={{
                       // display: !!displayInput.length && displayInput.includes(item.id) ? 'block' : 'none',
                       width: '80px',
                       padding: '.1rem .3rem',
                       borderRadius: '.3rem',
                       border: ' 1.5px solid #ccc',
                       outline: 'none',
                       ...style
                   }}
            />
        </>
    );
}

export {InputChanger};