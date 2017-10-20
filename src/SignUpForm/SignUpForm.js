import React from 'react'
import { connect } from 'react-redux'
import { signUp } from "../state/auth";

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
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                />

                <input
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                />

                <button>Sign Up</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpHelper: (email, password) => dispatch(signUp(email, password))
})

export default connect(
    null,
    mapDispatchToProps
)(SignUpForm)
