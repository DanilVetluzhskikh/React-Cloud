import React from 'react'
import {Navbar as BtsNavbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <BtsNavbar bg="light" expand="sm">
            <BtsNavbar.Brand as={Link} to="/">
                React Cloud
            </BtsNavbar.Brand>
            <Nav.Link as={Link} to="/user">
                Profile
            </Nav.Link>
        </BtsNavbar>
    )
}
