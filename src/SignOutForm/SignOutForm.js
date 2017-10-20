import React from 'react'
import { connect } from 'react-redux'
import { signOut} from "../state/auth";

class SignOutForm extends React.Component {


    handleSubmit = event => {
        this.props.user()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <button>Sign out</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    user: () => {
        dispatch(signOut());
        return null;
    }
})

export default connect(
    null,
    mapDispatchToProps
)(SignOutForm)
