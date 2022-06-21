import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, ButtonGroup, Badge, } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { companyService } from 'services/company.service'

export function CompanyTable ({ data, onDelete, toggleOnAirSync, ...props }) {
    const columns = [
        {
            name: 'Identifier',
            selector: (row) => row.identifier,
        },
        {
            name: 'Comany Name',
            selector: (row) => row.name,
        },
        {
            name: 'Sync On Air?',
            classname: 'text-center',
            cell: (row) => (<Badge
                bg={(row.syncOnAir) ? 'success' : 'secondary'}
                style={{
                    cursor: 'pointer'
                }}
                onClick={(e) => toggleOnAirSync(row.id)}
            >
                {(row.syncOnAir)
                    ? 'Syncing'
                    : 'Not Syncing'
                }
            </Badge>),
        },
        {
            name: 'actions',
            className: 'text-center',
            cell: (row) => (<ButtonGroup>
                <Button
                    size='md'
                    variant='danger'
                    onClick={() => onDelete(row.id)}
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

export default CompanyTable