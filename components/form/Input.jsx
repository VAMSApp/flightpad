import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Form, FormControl, FloatingLabel, } from 'react-bootstrap';


export function InputField ({
    label,
    touched,
    placeholder,
    errors,
    name,
    field,
    helpText,
    ...props
}) {
    return (<>
        {label &&
            <Form.Label>{label}</Form.Label>
        }
        <Form.Control
            placeholder={placeholder}
            isValid={(touched[name] && !errors[name])}
            isInvalid={(touched[name] && errors[name])}
            {...field}
        />
        {(touched[name] && errors[name]) &&
            <FormControl.Feedback type='invalid'>{errors[name]}</FormControl.Feedback>
        }
        {(touched[name] && !errors[name]) &&
            <FormControl.Feedback type='valid'>Looks Good!</FormControl.Feedback>
        }
        {helpText &&
            <Form.Text>{helpText}</Form.Text>
        }
    </>)
}

export default function Input({
    field,
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    floatingLabel,
    placeholder,
    helpText,
    className,
    ...props
}) {

    return (floatingLabel)
        ? (<Form.Group>
            <FloatingLabel
                className={className}
                label={floatingLabel}
            >
                <InputField
                    label={label}
                    name={field.name}
                    touched={touched}
                    placeholder={placeholder}
                    errors={errors}
                    field={field}
                    helpText={helpText}
                    {...props}
                />
            </FloatingLabel>
          </Form.Group>)
        : (<Form.Group>
            <InputField
                label={label}
                name={field.name}
                touched={touched}
                placeholder={placeholder}
                errors={errors}
                field={field}
                helpText={helpText}
                className={className}                
                {...props}
            />
          </Form.Group>)
}
