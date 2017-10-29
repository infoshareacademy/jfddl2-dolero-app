import React from 'react'
import { connect } from 'react-redux'
import { signUp } from "../state/auth";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import './SignUp.css';

class SignUpForm extends React.Component {

    state = {
        email: '',
        password: '',
    }

    handleEmailChange = event => this.setState({email: event.target.value})
    handlePasswordChange = event => this.setState({password: event.target.value})

    handleSubmit = event => {
        event.preventDefault()
        this.props.signUpHelper(this.state.email, this.state.password)
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Zarejestruj się
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text"
                                     placeholder="użytkownik"
                                     onChange={this.handleEmailChange}
                                     value={this.state.email}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}></Col>
                    <Col sm={4}>
                        <FormControl type="password"
                                     placeholder="hasło"
                                     onChange={this.handlePasswordChange}
                                     value={this.state.password}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="warning" type="submit">
                            Zarejestruj się
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
    );}

    }

const mapDispatchToProps = dispatch => ({
    signUpHelper: (email, password) => dispatch(signUp(email, password))
})


export default connect(
    null,
    mapDispatchToProps
)(SignUpForm)
