import React from 'react'
import classes from './Input.module.css';

const input = (props) => {
    let inputEl = null;
    const inputClasses = [classes.InputEl];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            inputEl = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}></input>;
            break;
        case ('textarea'):
            inputEl = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}></textarea>;
            break;
        case ('select'):
            inputEl = <select 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option value={option.value} key={option.value}>{option.displayValue}</option>
                ))}    
                </select>;
            break;
        default:
            inputEl = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}></input>
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.Error}>Please enter a valid value!</p>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
            {validationError}
        </div>
    );
}

export default input;