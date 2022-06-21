import { useRouter } from 'next/router'
import { faPlaneArrival, faPlaneDeparture, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import React, { useState } from 'react'
import moment from 'moment'
import { Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { flightService } from 'services/flight.service'

async function doFlightDelete(id) {
    return await flightService.destroy(id)
}

async function doFlightDeparted(id) {
    return await flightService.hasDeparted(id, {
        departedAt: new Date().to,
    })
}

async function doFlightArrived(id) {
    return await flightService.hasArrived(id, {
        arrivedAt: new Date(),
    })
}

export function FlightplanPopover ({ flightPlan, flight, ...props }) {
    const [isVisible, toggleIsVisible] = useState(false)

    const showFlightPlan = (e) => {
        toggleIsVisible(!isVisible)
    }

    const popover = (
        <Popover id={`flight-${flight.id}-flightplan`}>
            <Popover.Header as='h3'>
                Flight Plan
            </Popover.Header>
            <Popover.Body>
                <p>{flightPlan}</p>
            </Popover.Body>
        </Popover>
    )

    return (<>
        <OverlayTrigger trigger='click' placement='left' overlay={popover}>
            <Button
                size='md'
                variant='info'
                onClick={showFlightPlan}
            >
                Flight Plan
            </Button>
        </OverlayTrigger>
    </>)
}

export function FlightsTable ({ data, onDelete, ...props }) {
    const router = useRouter()

    const deleteFlight = async (flight) => {
        return doFlightDelete(flight.id)
        .then((flight) => {
            router.reload(window.location.pathname)
        })
    }

    const doSetDeparted = async (e, row) => {
        e.preventDefault()
        setDepartedIsProcessing(true)

        await doFlightDeparted(row.id)
        .then((flight) => {
            setDepartedIsProcessing(false)
            setDeparted(true)
        })
    }

    const doSetArrived = async (e, row) => {
        e.preventDefault()
        setArrivedIsProcessing(true)

        await doFlightArrived(row.id)
        .then((flight) => {
            setArrivedIsProcessing(false)
            setArrived(true)
        })
    }

    const [hasDeparted, setDeparted] = useState(false)
    const [hasDepartedProcessing, setDepartedIsProcessing] = useState(false)
    const [hasArrived, setArrived] = useState(false)
    const [hasArrivedProcessing, setArrivedIsProcessing] = useState(false)

    const columns = [
        {
            name: 'FLIGHT #',
            selector: (row) => row.flightNumber,
        },
        {
            name: 'COMPANY ICAO',
            selector: (row) => row.airlineICAO,

        },
        {
            name: 'DEPARTURE',
            cell: (row) => {
                if (row.departedAt) {
                    const humanDepartedAt = moment(row.departedAt).diff(new Date());
                    
                    console.log({
                        departedAt: row.departedAt,
                        humanDepartedAt
                    });
                }

                return (<span>
                    {row.departureAirport}
                </span>)
            }
        },
        {
            name: 'ARRIVAL',
            selector: (row) => row.arrivalAirport,

        },
        {
            name: 'actions',
            className: 'text-center',
            cell: (row) => (<ButtonGroup>
                {row.flightPlan &&
                <>
                    <FlightplanPopover
                        flightPlan={row.flightPlan}
                        flight={row}
                    />
                </>
                }
                <Button
                    size='md'
                    variant='info'
                    onClick={(e) => doSetDeparted(e, row)}
                    disabled={(hasDeparted || row.departedAt)}
                >
                    <FontAwesomeIcon icon={faPlaneDeparture} />
                </Button>
                <Button
                    size='md'
                    variant={(hasDeparted) ? 'light' : 'info'}
                    onClick={(e) => setArrived(e, row)}
                    disabled={(!hasDeparted || !row.departedAt)}
                >
                    <FontAwesomeIcon icon={faPlaneArrival} />
                </Button>
                <Button
                    size='md'
                    variant='danger'
                    onClick={() => deleteFlight(row)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </ButtonGroup>)
        }
    ]

    return (<>
        <DataTable
            data={data}
            columns={columns}
        />
    </>)
}

export default FlightsTable