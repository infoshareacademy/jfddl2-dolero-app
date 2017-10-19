import React from 'react'
import { connect } from 'react-redux'

import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'

const Auth = props => (
    <div>
        {
            props.user === null ?
                <div>
                    <p>LOGIN FORM</p>
                    <SignInForm/>
                    <p>SIGN UP</p>
                    <SignUpForm/>
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