import React from 'react'
import { connect } from 'react-redux'

import SignInForm from '../SignInForm'

const Auth = props => (
    <div>
        {
            props.user === null ?
                <div>
                    <p>LOGIN FORM</p>
                    <SignInForm/>
                </div>
                :
                props.children
        }
    </div>
)

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(
    mapStateToProps
)(Auth)