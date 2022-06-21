import React from 'react'
import {
    Form,
    FormControl,
} from 'react-bootstrap';

export default function SelectComponent({
    field: { value, ...field},
    form: { errors, touched, ...form }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    placeholder,
    helpText,
    defaultselectmsg,
    options,
    multiple,
    ...props
}) {


    return (
        <div>
            {label &&
                <Form.Label>{label}</Form.Label>
            }
            <Form.Control
                as='select'
                multiple={multiple}
                placeholder={placeholder}
                isValid={(touched[field.name] && !errors[field.name])}
                isInvalid={(touched[field.name] && errors[field.name])}
                value={(value instanceof Array) ? value : [value] }
                {...field}
            >
                {(options && options.length > 0) &&
                    options.map((o, k) => (<option key={k} value={o.value}>{`${o.label}`}</option>))
                }

            </Form.Control>
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
