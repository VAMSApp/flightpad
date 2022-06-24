import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, ButtonGroup, Badge, } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { companyService } from 'services/company.service'


async function doDeleteCompany(id) {
    return await companyService.destroy(id);
}

async function toggleOnAirCompanyTracking(id) {
    
}

export function CompanyTable ({ data, ...props }) {
    const [isDeleting, setIsDeleting] = useState(false)
    
    async function doDelete(e, id) {
        e.preventDefault()
        setIsDeleting(true)

        // await companyService.destroy(id)
        // .then((c) => {
        //     setIsDeleting(false)
        // });
    }

    async function toggleOnAirCompanyTracking(e, id) {
        e.preventDefault()
        return await companyService.toggleOnAirCompanyTracking(id)
    }

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
                bg={(row.trackOnAirCompany) ? 'success' : 'secondary'}
                style={{
                    cursor: 'pointer'
                }}
                onClick={(e) => toggleOnAirCompanyTracking(e, row.id)}
            >
                {(row.trackOnAirCompany)
                    ? 'Syncing'
                    : 'Not Syncing'
                }
            </Badge>),
        },
        {
            name: 'actions',
            id: 'actions',
            className: 'text-center',
            cell: (row) => (<Button
                variant='danger'
                size='md'
                onClick={(e) => doDelete(e, row.id)}
                disabled={(isDeleting)}
            >
                Delete
            </Button>)
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