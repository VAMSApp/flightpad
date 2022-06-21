import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function TextArea({
    field,
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    placeholder,
    helpText,
    rows,
    ...props
}) {

    return (
        <Form.Group>
            {label &&
                <Form.Label>{label}</Form.Label>
            }
            <Form.Control
                placeholder={placeholder}
                isValid={(touched[field.name] && !errors[field.name])}
                isInvalid={(touched[field.name] && errors[field.name])}
                rows={rows}
                as='textarea'
                {...field}
            />
            {(touched[field.name] && errors[field.name]) &&
                <FormControl.Feedback type='invalid'>{errors[field.name]}</FormControl.Feedback>
            }
            {(touched[field.name] && !errors[field.name]) &&
                <FormControl.Feedback type='valid'>Looks Good!</FormControl.Feedback>
            }
            {helpText &&
                <Form.Text>{helpText}</Form.Text>
            }
        </Form.Group>
    );
}
