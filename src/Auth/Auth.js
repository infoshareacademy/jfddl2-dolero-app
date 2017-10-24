import React from 'react'
import { connect } from 'react-redux'

import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'
import './Auth.css';

const Auth = props => (
    <div>
        {
            props.user === null ?
                <div className='loginForm'>

                    <SignInForm/>


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