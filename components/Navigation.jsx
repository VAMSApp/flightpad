import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from 'react-bootstrap'
import { Clock, } from 'components'

export function NavLink ({ menu, }) {
    const {
        href,
        label,
        exact,
        active,
    } = menu
    return (<Nav.Link
            href={href}
            active={active}
        >
            {label}
        </Nav.Link>)
}

export function Navigation() {
    const [showNavSecond, setShowNavSecond] = useState(false)
    const router = useRouter()

    const menu = [
        {
            href: '/',
            label: 'Home',
            exact: true
        },
        {
            href: '/fleet',
            label: 'Manage Fleet',
            exact: true
        },
        {
            href: '/flights',
            label: 'Manage Flights',
            exact: true
        },
    ]

    return (<>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {menu.map((m, k) => (<NavLink key={k} menu={m} active={(router.pathname === m.href)}/>))}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default Navigation
