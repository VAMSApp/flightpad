import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { InputGroup, Form, FormControl, Button, } from 'react-bootstrap';

export default function UsernameInput({
    field,
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    placeholder,
    helpText,
    onBtnClick,
}) {

    return (
        <div>
            {label &&
                <Form.Label>{label}</Form.Label>
            }
            <InputGroup>
                <FormControl
                    isValid={(touched[field.name] && !errors[field.name])}
                    isInvalid={(touched[field.name] && errors[field.name])}
                    {...field}
                    placeholder={placeholder}
                />
                <Button variant='info' onClick={onBtnClick}>
                    <FontAwesomeIcon icon={faUserCheck} />
                </Button>
            </InputGroup>
            {(touched[field.name] && errors[field.name]) &&
                <FormControl.Feedback type='invalid'>{errors[field.name]}</FormControl.Feedback>
            }
            {(touched[field.name] && !errors[field.name]) &&
                <FormControl.Feedback type='valid'>Looks Good!</FormControl.Feedback>
            }
            {helpText &&
                <Form.Text>{helpText}</Form.Text>
            }
        </div>
    );
}
