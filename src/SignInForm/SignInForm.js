import React from 'react'

class SignInForm extends React.Component {

    state = {
        email: '',
        password: '',
    }

    handleEmailChange = event => this.setState({email: event.target.value})
    handlePasswordChange = event => this.setState({password: event.target.value})

    render() {
        return (
            <form>
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

export default SignInForm