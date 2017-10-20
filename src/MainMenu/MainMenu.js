import React from 'react'
import firebase from 'firebase'
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
            <LinkContainer to="/signOutForm">
                <NavItem>
                    Wyloguj się
                </NavItem>
            </LinkContainer>
            <NavItem onClick={() => {
                const email = firebase.auth().currentUser.email
                firebase.auth().sendPasswordResetEmail(email).then(
                    () => alert("Sprawdz swoją pocztę i kliknij w link")
                )
            }}>Reset hsała</NavItem>
        </Nav>


    </Navbar>
)

export default MainMenu