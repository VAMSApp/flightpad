import {
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import { FleetTable, } from 'components/aircraft'
import aircraftRepo from 'repos/aircraftRepo';

export async function getServerSideProps (context) {
    let fleet = await aircraftRepo.findAll({
        stringify: true,
        include: {
            aircraftType: true,
            flights: true,
        }
    })

    return {
        props: {
            fleet
        }
    }
}

export function FlightListPage ({ fleet, ...props }) {
    
    return (<>
        <Row>
            <Col>
                <h1>All Fleet</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <FleetTable
                    data={fleet}
                />
            </Col>
        </Row>
    </>)
}

export default FlightListPage