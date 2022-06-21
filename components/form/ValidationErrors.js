import React from 'react';
import { Alert, }from 'react-bootstrap';

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <Alert variant='danger'>
                <Alert.Heading as='h5'>Whoops! Something went wrong.</Alert.Heading>

                <ul style={{textAlign: 'left'}}>
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index}>{errors[key]}</li>;
                    })}
                </ul>
            </Alert>
        )
    );
}
