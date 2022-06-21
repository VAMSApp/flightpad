import Head from 'next/head'
import Image from 'next/image'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import _ from 'lodash'
import { AddAircraftForm } from 'components/aircraft'
import { aircraftService } from 'services/aircraft.service'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'

async function doAddAircraft(payload, opts) {
    console.log('doAddAircraft()', payload)
    return await aircraftService.create(payload)
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient()
  let aircraftTypes = await prisma.aircraftType.findMany().then((x) => JSON.parse(JSON.stringify(x)))

  return {
    props: {
        aircraftTypes
    }
  }
}

export default function AddAircraft({ aircraftTypes, ...props}) {
    const router = useRouter()

    const addAircraft = async (values) => {
        console.log('addAircraft()', values)
        await doAddAircraft(values)
        .then((aircraft) => {
            router.push(`/fleet/${aircraft.id}`)
        })
    }

    return (<div>
        <Row>
            <Col>
                <h1>Add a new aircraft</h1>
            </Col>
        </Row>
        <Row>
            <AddAircraftForm
                aircraftTypes={aircraftTypes}
                doSubmit={addAircraft}
            />
        </Row>
    </div>)
}