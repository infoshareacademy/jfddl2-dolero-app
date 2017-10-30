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
                    Przegląd transakcji
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/history">
                <NavItem>
                    Historia wydatków
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/diagrams">
                <NavItem>
                    Wykresy
                </NavItem>
            </LinkContainer>

            <LinkContainer to="/settings">
                <NavItem>
                    Ustawienia
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/signOutForm">
                <NavItem>
                    Wyloguj się
                </NavItem>
            </LinkContainer>



        </Nav>
    </Navbar>
)

export default MainMenu