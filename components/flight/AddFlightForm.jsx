import { useState, useEffect, useCallback, } from 'react'
import {
    Form,
    Modal,
    Button,
    FormControl,
    FloatingLabel,
    Row,
    Col,
    ButtonGroup,
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
import { AircraftLookup } from 'components/aircraft'

import moment from 'moment'

export function AddFlightForm ({ company, fleet, nextFlightNumber, doSubmit, }) {
    const initialValues = {
        flightNumber: nextFlightNumber,
        plannedDepartureTime: '',
        departedAt: '',
        arrivedAt: '',
        plannedArrivalTime: '',
        departureAirport: '',
        arrivalAirport: '',
        airlineICAO: company?.identifier || '',
        flightPlan: '',
        aircraftId: '',
        cruiseAltitude: '',
        planningTime: 10,
        firstLoad: true,
    }

    const [state, setState] = useState(initialValues)

    const {
        flightNumber,
        departureAirport,
        arrivalAirport,
        airlineICAO,
        flightPlan,
        plannedDepartureTime,
        plannedArrivalTime,
        aircraftId,
        cruiseAltitude,
        planningTime,
        firstLoad,
    } = state

    const handleFieldChange = (e) => {
        const { name, type, checked, value, } = e.target;

        setState({
            ...state,
            [name]: (type === 'checkbox') ? checked : value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        doSubmit({
            flightNumber: flightNumber,
            plannedDepartureTime: plannedDepartureTime || undefined,
            plannedArrivalTime: plannedArrivalTime || undefined,
            departureAirport: departureAirport.toUpperCase(),
            arrivalAirport: arrivalAirport.toUpperCase(),
            airlineICAO: airlineICAO.toUpperCase(),
            aircraftId: aircraftId || undefined,
            flightPlan: flightPlan.toUpperCase(),
            cruiseAltitude: cruiseAltitude.toUpperCase(),
        })
    }

    const updatePlannedDepartureTime = useCallback(() => {                
        setState({
            ...state,
            plannedDepartureTime: moment().add(planningTime, 'm').format('yyyy-MM-DDTH:mm:ss').toString(),
        })
    }, [planningTime, state])

    const updatePlanningTime = (pt) => {
        const _planningTime = parseInt(pt.target.value)
        const _plannedDepartureTime = moment().add(_planningTime, 'm').format('yyyy-MM-DDTH:mm:ss').toString()

        setState({
            ...state,
            planningTime: _planningTime,
            plannedDepartureTime: _plannedDepartureTime
        })
    }

    const saveflightSettings = () => {
        let x = {
            planningTime,
            departureAirport,
            cruiseAltitude,
            aircraftId,
        }

        localStorage.setItem('flightSettings', JSON.stringify(x))
    }

    const getflightSettings = () => {
        let flightSettings = localStorage.getItem('flightSettings')

        if (flightSettings) {
            flightSettings = JSON.parse(flightSettings)
        }

        return flightSettings
    }

    useEffect(() => {
        if (firstLoad) {
            const flightSettings = getflightSettings()
            
            if (flightSettings) {
                setState({
                    ...state,
                    ...flightSettings,
                    firstLoad: false,
                })
            }
        }

        if (plannedDepartureTime === '') {
            updatePlannedDepartureTime()
        }


    }, [state, plannedDepartureTime, planningTime, updatePlannedDepartureTime, firstLoad])

    return (<>
        <Form>
            <Row>
                <Col>
                    <h3>New Flight</h3>
                </Col>
            </Row>
             <Row>
                <Col md={2}>
                    <Form.Group>
                        <FloatingLabel label='Flight Number'>
                            <Form.Control
                                name='flightNumber'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                value={flightNumber}
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <FloatingLabel label='Airline ICAO'>
                            <Form.Control
                                name='airlineICAO'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                value={airlineICAO}
                                disabled={company}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                                required
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <FloatingLabel label='Planning Time'>
                            <Form.Select
                                name='planningTime'
                                className='mb-3'
                                defaultValue={planningTime}
                                onChange={updatePlanningTime}
                            >
                                <option>PICK</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                                <option value={60}>60</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <FloatingLabel label='Aircraft'>
                            <AircraftLookup
                                className='form-control form-control-lg mb-3'
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <FloatingLabel label='Departure Airport ICAO'>
                            <Form.Control
                                name='departureAirport'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                                value={departureAirport}
                                required
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <FloatingLabel label='Arrival Airport ICAO'>
                            <Form.Control
                                name='arrivalAirport'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                                required
                                value={arrivalAirport}
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <FloatingLabel label={`Planned Departure Time (+${planningTime} mins)`}>
                            <Form.Control
                                name='plannedDepartureTime'
                                className='mb-3'
                                type='datetime-local'
                                isValid={false}
                                value={plannedDepartureTime}
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <FloatingLabel label='Estimated Arrival Time'>
                            <Form.Control
                                name='plannedArrivalTime'
                                className='mb-3'
                                type='datetime-local'
                                isValid={false}
                                value={plannedArrivalTime}
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>    
            </Row>  
            <Row>
                <Col md={2}>
                    <Form.Group>
                        <FloatingLabel label='Cruise Altitude'>
                            <Form.Control
                                name='cruiseAltitude'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                                required
                                value={cruiseAltitude}
                                onChange={handleFieldChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col md={10}>
                    <Form.Group>
                        <FloatingLabel label='Flight Plan'>
                            <Form.Control
                                name='flightPlan'
                                className='mb-3'
                                type='text'
                                isValid={false}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                                required
                                onChange={handleFieldChange}
                            />
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
                    <ButtonGroup>
                        <Button
                            variant='success'
                            size='lg'
                            onClick={onSubmit}
                        >
                            Save
                        </Button>
                        <Button
                            size='lg'
                            variant='secondary'
                            onClick={saveflightSettings}
                        >
                            Save Default
                        </Button>
                    </ButtonGroup>       
                </Col>
            </Row>
        </Form>
    </>)
}