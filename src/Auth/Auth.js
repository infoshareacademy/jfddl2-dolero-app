import React from 'react'
import {connect} from 'react-redux'
import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'
import './Auth.css';
import {Col, Panel, Row} from "react-bootstrap";



const Auth = props => (
    <Row className="show-grid" style={{}}>
        <Col md={12}>
            {
                props.user === null ?
                    <div>
            <Panel header="Zaloguj się">
                <div>

                            <div className='loginForm'>

                                <SignInForm/>

                            </div>

                </div>
            </Panel>
            <Panel header="Nie masz jeszcze konta">
                <div>
                    <div>
                        <SignUpForm/>

                    </div>
                </div>
            </Panel></div>
                    :
                    props.children
            }
            </Col>

    </Row>


)

const mapStateToProps = state => ({
    user: state.auth.user
})
// export const googleProvider= new firebase.auth.GoogleAuthProvider();

export default connect(
    mapStateToProps
)(Auth)