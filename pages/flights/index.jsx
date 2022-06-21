import {
    Row,
    Col,
    Button,

} from 'react-bootstrap'
import { FlightsTable, } from 'components/flight'
import flightRepo from "repos/flightRepo";

export async function getServerSideProps (context) {
    let flights = await flightRepo.findAll({
        stringify: true,
        include: {
            aircraft: true,
            aircraftType: true,
        }
    })

    return {
        props: {
            flights
        }
    }
}

export function FlightListPage ({ flights, ...props }) {
    
    return (<>
        <Row>
            <Col>
                <h1>All Tracked Flights</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <FlightsTable
                    data={flights}
                />
            </Col>
        </Row>
    </>)
}

export default FlightListPage