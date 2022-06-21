import { useRouter } from "next/router"
import { Button } from "react-bootstrap"
import aircraftRepo from "repos/aircraftRepo"
import { aircraftService } from "services/aircraft.service"

export async function getServerSideProps(context) {
    const {
        id
    } = context.params

    let aircraft = await aircraftRepo.findById(id, {
        stringify: true,
        include: {
            aircraftType: true,
            flights: true,
        }
    })

    return {
        props: {
            aircraft: aircraft
        }
    }
}

export function AircraftDetailPage ({ aircraft, ...props}) {
    const router = useRouter();

    async function doDeleteAircraft() {
        await aircraftService.destroy(aircraft.id)
        .then((a) => {
            router.push('/fleet')
        })
    }

    return (<>
        <h1>{`(${aircraft.identifier}) ${aircraft?.shortName}`}</h1>
        <Button
            onClick={doDeleteAircraft}
            variant='danger'
        >
            Delete Aircraft? (No confirmation)
        </Button>
    </>)
}

export default AircraftDetailPage