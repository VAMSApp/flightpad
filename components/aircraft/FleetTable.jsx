import { useRouter } from 'next/router'
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import React, { useState } from 'react'
import { Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { aircraftService } from 'services/aircraft.service'

async function doAircraftDelete(id) {
    return await aircraftService.destroy(id)
}

export function FleetTable ({ data, onDelete, ...props }) {
const router = useRouter()

    const deleteAircraft = async (aircraft) => {
        return doAircraftDelete(aircraft.id)
        .then((aircraft) => {
            router.reload(window.location.pathname)
        })
    }

    const columns = [
        {
            name: 'Identifier',
            cell: (row) => (<a href={`/fleet/${row.id}`}>{row.identifier}</a>)
        },
        {
            name: 'Type',
            selector: (row) => row.aircraftType?.shortName,

        },
        {
            name: 'actions',
            className: 'text-center',
            cell: (row) => (<ButtonGroup>
                <Button
                    size='md'
                    variant='danger'
                    onClick={() => deleteAircraft(row)}
                >
                    Delete
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

export default FleetTable