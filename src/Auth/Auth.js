import React from 'react'
import {connect} from 'react-redux'
import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'
import './Auth.css';
import {Button, Col, Jumbotron, Panel, Row} from "react-bootstrap";


const Auth = props => (

    <div className="auth-bg">

        <Row className="show-grid" style={{}}>
            <Col md={12}>
                <Jumbotron>
                    <h1>SAVE MONEY</h1>
                </Jumbotron>
            </Col>
            <Col md={12}>
                {
                    props.user === null ?
                        <div>

                            <div className='loginForm'>

                                <SignInForm/>

                            </div>

                            <div className='logUpForm'>
                                <SignUpForm/>

                            </div>
                        </div>
                        :
                        props.children
                }
            </Col>

        </Row>

    </div>
)

const mapStateToProps = state => ({
    user: state.auth.user
})
// export const googleProvider= new firebase.auth.GoogleAuthProvider();

export default connect(
    mapStateToProps
)(Auth)