import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
} from 'react-bootstrap'
import {
    Link
} from 'react-router-dom'
import {
    LinkContainer
} from 'react-router-bootstrap'


const MainMenu = () => (
    <Navbar>
        <Nav>
            <LinkContainer to="/shorthistory">
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