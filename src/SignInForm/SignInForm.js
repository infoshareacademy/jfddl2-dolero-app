import React from 'react'
import { connect } from 'react-redux'
import { signIn} from "../state/auth";

class SignInForm extends React.Component {

    state = {
        email: '',
        password: '',
    }

    handleEmailChange = event => this.setState({email: event.target.value})
    handlePasswordChange = event => this.setState({password: event.target.value})

    handleSubmit = event => {
        event.preventDefault()
        this.props.signInHelper(this.state.email, this.state.password)
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

                <button>Sign in</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signInHelper: (email, password) => dispatch(signIn(email, password))
})

export default connect(
    null,
    mapDispatchToProps
)(SignInForm)
