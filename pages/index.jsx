import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
} from 'react-bootstrap'
import { useState, useEffect, useCallback, } from 'react'
import _ from 'lodash'
import { FlightsTable, AddFlightForm } from 'components/flight'
import { PrismaClient } from '@prisma/client'
import { CompanyTable } from 'components/company'
import { FleetTable, } from 'components/aircraft'
import { flightService, companyService, } from 'services'
import Repos from 'repos'

export async function getServerSideProps(context) {
  let flights = await Repos.flightRepo.findAll({
    stringify: true,
  })

  let companies = await Repos.companyRepo.findAll({
    stringify: true,
  })

  let fleet = await Repos.aircraftRepo.findAll({
    stringify: true,
    include: {
      aircraftType: true
    }
  })

  let aircraftTypes = await Repos.aircraftRepo.findAllAircraftClass({
    stringify: true
  })

  let nextFlightNumber = await Repos.flightRepo.nextFlightNumber();

  return {
    props: {
      flights: flights || undefined,
      companies: companies || null,
      company: company || null,
      fleet: fleet || undefined,
      aircraftTypes: aircraftTypes || undefined,
      nextFlightNumber: nextFlightNumber || undefined,
    }
  }
}

async function doAddFlight(values) {
  console.log('doAddFlight', values)
  return await flightService.create(values)
}

async function doDeleteFlight(id) {
  return await flightService.destroy(id)  
}

const initialState = {
  addCompanyModalVisible: false,
}

async function doToggleOnAirSync (id) {
  return await companyService.toggleOnAirSync(id)
}

export default function Home({ flights, companies, company, aircraftTypes, fleet, nextFlightNumber, ...props }) {
  const [state, setState] = useState(initialState)
  
  const {
    addCompanyModalVisible,
  } = state

  const router = useRouter()

  const toggleAddCompanyModal = (override) => {
    setState({
      ...state,
      addCompanyModalVisible: override || !addCompanyModalVisible
    })
  }

  const addCompany = (e) => {
    console.log(e)
  }

  const addFlight = async (values) => {
    console.log('doAddFlight', values)
    
    return await doAddFlight(values).then((flight) => {
      router.reload(window.location.pathname)
    })
  }

  const toggleOnAirSync = async (id) => {
    return await doToggleOnAirSync(id).then((company) => {
      router.reload(window.location.pathname)
    })
  }

  return (
    <div>
      <Head>
        <title>FlightPad</title>
        <meta name="description" content="FlightPad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <Col>
          <h1>OnAir Companies</h1>
        </Col>
      </Row>
      {(companies && companies.length > 0)
        ? (<>
          <Row>
            <Col>
              <CompanyTable
                data={companies}
                toggleOnAirSync={toggleOnAirSync}
              />
            </Col>
          </Row>
        </>)
        : (<>
          <Row>
            <Col>
              <p className='text-center'>You have no companies defined yet.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant='primary'
                href='/addCompany'
                onClick={toggleAddCompanyModal}
              >
                Add a new company
              </Button>            
            </Col>
          </Row>
        </>)
      }
      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Fleet</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <FleetTable
            data={fleet}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant='primary'
            href='/fleet/add'
          >
            Add to Your Fleet
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Flight Log</h2>
        </Col>
      </Row>
      {(flights && flights.length > 0)
        ? (<Row>
            <Col>
              <FlightsTable
                data={flights}
              />
            </Col>
          </Row>)
        : (<>
          <Row>
            <Col>
              <p className='text-center'>You have no flights defined yet.</p>
            </Col>
          </Row>
        </>)
      }
      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddFlightForm
            company={company}
            fleet={fleet}
            nextFlightNumber={nextFlightNumber}
            doSubmit={addFlight}
          />
        </Col>
      </Row>
    </div>
  )
}
