import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { aircraftService } from 'services/aircraft.service'

async function DoSearch(query) {
    return await aircraftService.findByIdentifier(query.toUpperCase())
}

export function AircraftLookup ({ doSearch = DoSearch, ...props}) {
    const [state, setState] = useState({
        isLoading: false,
        options: []
    })

    const {
        isLoading,
        options,
    } = state

    const {
        className,
    } = props

    const onSearch = async (query) => {
        setState({
            isLoading: true,
        })

        await doSearch(query)
        .then((results) => {
            return results.map((r, k) => ({
                id: r.id,
                label: `${r.identifier} - ${r.aircraftType.shortName}`
            }))
        })
        .then((opts) => {
            setState({
                isLoading: false,
                options: opts
            })
        })
    }

    const filterBy = () => true

    return (<>
        <AsyncTypeahead
            id='aircraft'
            filterBy={filterBy}
            isLoading={isLoading}
            labelKey='label'
            onSearch={onSearch}
            options={options}
            className={className}
            style={{
                textTransform: 'uppercase'
            }}
            placeholder='Type an Aircraft Identifier'
        />
    </>)
}