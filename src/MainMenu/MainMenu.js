import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
} from 'react-bootstrap'

import {
    LinkContainer
} from 'react-router-bootstrap'


const MainMenu = () => (
    <Navbar>
        <Nav>
            <LinkContainer exact to="/">
                <NavItem>
                    Short History
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/history">
                <NavItem>
                    History
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/diagrams">
                <NavItem>
                    Diagrams
                </NavItem>
            </LinkContainer>

        </Nav>
    </Navbar>
)

export default MainMenu