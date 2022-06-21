import { useState, useEffect, useCallback, } from 'react'
import {
    Form,
    Modal,
    Button,
    FormControl,
    FloatingLabel,
    Row,
    Col,
} from 'react-bootstrap'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import classNames from 'classnames'
import { padService } from 'services/pad.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TextInput, } from 'components/form'
import { flightService } from 'services/flight.service'
import moment from 'moment'

export function AddAircraftForm ({ aircraftTypes, doSubmit, }) {
    const initialValues = {
        identifier: '',
        shortName: '',
        aircraftTypeId: '',
        formIsValid: false,
        errors: {},
        touched: {},
    }

    const [state, setState] = useState(initialValues)

    const {
        identifier,
        shortName,
        aircraftTypeId,
        formIsValid,
        errors,
        touched,
    } = state

    const handleFieldChange = (e) => {
        const { name, type, checked, value, } = e.target;

        setState({
            ...state,
            [name]: (type === 'checkbox') ? checked : value
        })
    }

    const handleFieldBlur = (e) => {
        const { name, type, checked, value, } = e.target;

        setState({
            ...state,
            touched: {
                [name]: true
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        doSubmit({
            identifier: identifier,
            shortName: shortName,
            aircraftTypeId: aircraftTypeId || undefined,
        })
    }

    return (<>
        <Form>
             <Row>
                <Col md={2}>
                    <Form.Group>
                        <FloatingLabel label='Aircraft Identifier'>
                            <Form.Control
                                name='identifier'
                                className='mb-3'
                                type='text'
                                isValid={(touched?.identifier && !errors?.identifier)}
                                isInvalid={(touched?.identifier && errors.identifier)}
                                value={identifier}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <FloatingLabel label='Aircraft Name'>
                            <Form.Control
                                name='shortName'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                value={shortName}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <FloatingLabel label='Aircraft Type'>
                            <Form.Select
                                name='aircraftTypeId'
                                className='mb-3'
                                defaultValue={aircraftTypeId}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                            >
                                <option>PICK</option>
                                {aircraftTypes &&
                                    aircraftTypes.map((at, k) => (<option key={k} value={at.id}>{at.shortName}</option>))
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button
                        className='btn btn-success btn-lg'
                        onClick={onSubmit}
                    >
                        Save
                    </button>
                </Col>
            </Row>
        </Form>
    </>)
}