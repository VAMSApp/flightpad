import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Form, FormControl, FloatingLabel, } from 'react-bootstrap'

export default function Checkbox ({
    field,
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    type,
    floatingLabel,
    placeholder,
    helpText,
    className,
    ...props
}) {
    // return (
    //     <input
    //         type="checkbox"
    //         name={name}
    //         value={value}
    //         className={className}
    //     />
    // );

    return (<Form.Group>
        <div className="form-check form-switch">
            <input
                type='checkbox'
                className='form-check-input mb-3'
                {...field}
                {...props}
            />
            <label className='form-check-label'>
                &nbsp;{label}
            </label>
        </div>
    </Form.Group>)
}
