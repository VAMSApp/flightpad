import { faSpinner, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
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

export function AddCompanyForm({ worlds, doSubmit, defaults, storeDefaults }) {

  const initialState = {
    identifier: '',
    name: '',
    guid: defaults?.guid || '',
    apiKey: defaults?.apiKey || '',
    worlduuid: '',
    worldId: '',
    level: '',
    checkrideLevel: '',
    levelXP: '',
    reputation: '',
    syncOnAirCompany: false,
    syncOnAirEmployees: false,
    syncOnAirFleet: false,
    syncOnAirFlights: false,
    isLoading: false,
    hasLoaded: false,
    formIsValid: false,
    firstLoad: true,
  }

  const [state, setState] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    identifier,
    name,
    guid,
    syncOnAirCompany,
    syncOnAirEmployees,
    syncOnAirFleet,
    syncOnAirFlights,
    apiKey,
    level,
    checkrideLevel,
    levelXP,
    reputation,
    isLoading,
    hasLoaded,
    formIsValid,
    firstLoad,
    worlduuid,
    worldId,
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
    .catch((err) => {
      setState({
        ...state,
        hasLoaded:true,
        isLoading: false,
      })
    })

  }

  const onSubmit = (e) => {
    e.preventDefault()

    let x = {
      name,
      identifier,
      syncOnAirCompany,
      syncOnAirEmployees,
      syncOnAirFleet,
      syncOnAirFlights,
      level,
      checkrideLevel,
      levelXP,
      reputation,
      worlduuid,
      worldId,
      guid: (syncOnAirCompany && guid) ? guid : undefined,
      apiKey: (syncOnAirCompany && apiKey) ? apiKey : undefined,
    }

    console.log('addCompanyForm::onSubmit', x)
    setIsSubmitting(true)
    doSubmit(x)
    .then((c) => {
      setIsSubmitting(false)
    })
    .catch((e) => {
      setIsSubmitting(false)
    })
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

  useEffect(function () {
    if (syncOnAirCompany && firstLoad) {
      console.log('AddCompanyForm::useEffect-firstLoad()')
      setState({
        ...state,
        guid: defaults.guid,
        apiKey: defaults.apiKey,
        firstLoad: false,
      })
    }

  }, [defaults?.apiKey, defaults?.guid, firstLoad, state, syncOnAirCompany])

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Check
                type='switch'
                name='syncOnAirCompany'
                id='syncOnAirCompany'
                label='Sync OnAir?'
                onChange={handleFieldChange}
                value={syncOnAirCompany}
                className='mb-3'
              />
            </Form.Group>
          </Col>
          {syncOnAirCompany &&
          <>
          <Col>
            <Form.Group>
              <Form.Check
                type='switch'
                name='trackOnAirFleet'
                id='trackOnAirFleet'
                label='Sync OnAir Fleet?'
                onChange={handleFieldChange}
                value={syncOnAirFleet}
                className='mb-3'
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Check
                type='switch'
                name='syncOnAirFlights'
                id='syncOnAirFlights'
                label='Sync OnAir Flights?'
                onChange={handleFieldChange}
                value={syncOnAirFlights}
                className='mb-3'
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Check
                type='switch'
                name='syncOnAirEmployees'
                id='syncOnAirEmployees'
                label='Sync OnAir Employees?'
                onChange={handleFieldChange}
                value={syncOnAirEmployees}
                className='mb-3'
              />
            </Form.Group>
          </Col>
          </>
          }
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
                  disabled={(syncOnAirCompany === true)}
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
                  disabled={(syncOnAirCompany === true)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        {syncOnAirCompany &&
        <>
        <Row>
          <Col md={6}>
            <Form.Group>
              level levelXP
            </Form.Group>
            <Form.Group>
              reputation
            </Form.Group>

          </Col>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label='Onair World'>
                <Form.Select
                  name='worldId'
                  id='worldId'
                  className='mb-3'
                  onChange={handleFieldChange}
                  value={worldId}
                >
                  {worlds.map((w, k) => (<option key={k} value={w.id}>{`${w.shortName}`}</option>))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
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
                {(isLoading) 
                  ? (<FontAwesomeIcon icon={faSpinner} spin />)
                  : 'Load OnAir Company Details'
                }
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
            <ButtonGroup>
              <Button
                type='submit'
                variant='success'
                disabled={isSubmitting}
              >
                {(isSubmitting) 
                  ? (<span>
                      <FontAwesomeIcon icon={faSpinner} spin/>
                      &nbsp;Submitting
                    </span>)
                  :'Submit'
                }
              </Button>
              <Button
                type='button'
                variant='light'
                onClick={(e) => storeDefaults({ guid, apiKey })}
              >Store Defaults</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddCompanyForm
