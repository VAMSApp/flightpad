import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, FloatingLabel, ButtonGroup, FormControl } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import classNames from 'classnames'
import { companyService } from 'services/company.service'



const uuid4RegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

const companySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Company Name is required'),
  identifier: Yup.string()
    .min(3, 'Too Short!')
    .max(4, 'Too Long!')
    .required('Company Identifier is required'),
  guid: Yup.string()
    .min(36, 'Too Short!')
    .max(36, 'Too Long!')
    .matches(uuid4RegExp, 'Company ID is not correct'),
  apiKey: Yup.string()
    .min(36, 'Too Short!')
    .max(36, 'Too Long!')
    .matches(uuid4RegExp, 'Company API Key is not correct'),
}).required()

export function AddCompanyForm({ worlds, doSubmit, }) {
  const initialState = {
    syncOnAir: false,
    identifier: '',
    name: '',
    guid: '3a5bdf29-82f8-4c3c-8d21-ccbca8dfca34',
    apiKey: '5e4c21b0-59a3-4113-a5eb-16e8eca0ef51',
    isLoading: false,
    hasLoaded: false,
    formIsValid: false,
  }

  const [state, setState] = useState(initialState)

  const {
    identifier,
    name,
    syncOnAir,
    guid,
    apiKey,
    isLoading,
    hasLoaded,
    formIsValid,
  } = state

  const loadOnAirCompanyDetails = async () => {

    const x = {
      guid: guid,
      apiKey: apiKey,
    }

    toggleIsLoadding()
    await companyService.getOnAirCompanyDetails(x)
    .then((company) => {
      setState({
        ...state,
        hasLoaded: true,
        isLoading: false,
        identifier: company.AirlineCode,
        name: company.Name,
      })
    })

  }

  const onSubmit = (e) => {
    e.preventDefault()

    let x = {
      name,
      identifier,
      syncOnAir,
      guid: (syncOnAir && guid) ? guid : undefined,
      apiKey: (syncOnAir && apiKey) ? apiKey : undefined,
    }

    console.log('addCompanyForm::onSubmit', x)
    doSubmit(x)
  }

  const toggleIsLoadding = (override) => {
    setState({
      ...state,
      isLoading: override || !isLoading
    })
  }

  const toggleHasLoaded = (override) => {
    setState({
      ...state,
      hasLoaded: override || !hasLoaded
    })
  }

  const handleFieldChange = (e) => {
    const {
      name,
      type,
      value,
      checked,
    } = e.target

    console.log(e)

    setState({
      ...state,
      [name]: (type === 'checkbox') ? checked : value,
    })
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Check
                type='switch'
                name='syncOnAir'
                id='syncOnAir'
                label='Sync OnAir?'
                onChange={handleFieldChange}
                value={syncOnAir}
                className='mb-3'
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label='Company Identifier (CAO) Code'>
                <Form.Control
                  type='text'
                  name='identifier'
                  id='identifier'
                  className='mb-3'
                  defaultValue={identifier}
                  onChange={handleFieldChange}
                  disabled={(syncOnAir === true)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group>
              <FloatingLabel label='Company Name'>
                <Form.Control
                  type='text'
                  name='name'
                  id='name'
                  className='mb-3'
                  defaultValue={name}
                  onChange={handleFieldChange}
                  disabled={(syncOnAir === true)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        {syncOnAir &&
        <>
        <Row>
          <Col md={6}>
          <Form.Group>
            <FloatingLabel label='OnAir Company ID'>
              <Form.Control
                type='text'
                name='guid'
                id='guid'
                className='mb-3'
                onChange={handleFieldChange}
                value={guid}
              />  
            </FloatingLabel>
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label='OnAir Company API Key'>
                <Form.Control
                  type='text'
                  name='apiKey'
                  id='apiKey'
                  className='mb-3'
                  onChange={handleFieldChange}
                  value={apiKey}
                />
                </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
              <Button
                variant='primary'
                onClick={loadOnAirCompanyDetails}
                disabled={(hasLoaded || isLoading || (!apiKey || !guid))}
              >
                Load OnAir Company Details
              </Button>
          </Col>
        </Row>
        </>
        }
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type='submit'
              variant='success'
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddCompanyForm