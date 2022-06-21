import React from 'react'
import { Navigation, Alert } from 'components'
import { Container } from 'react-bootstrap'

export function AppLayout({ children }) {
    return (<div id='AppLayout'>
        <Navigation />
        <Alert />
        <Container className='pt-5 min-vh-100' style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '#3333330f 0 0 20px 0px'
        }}>
            {children}
        </Container>
    </div>)
}

export default AppLayout