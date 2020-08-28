import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from '../../axios-pexel'
import Alert from '../../components/UI/Alert/Alert.js';

import AuthComponent from "../../components/AuthComponent/AuthComponent"
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner'
import validator from 'validator'
import * as actions from '../../store/actions/index';

class Auth extends Component {
    
    state = {
        email: '',
        password: '',
        username: '',
        isSignup: false,
        validationError: null,
    }

    submitHandler = ( event ) => {
        event.preventDefault();

        const email = validator.escape(this.state.email).trim()
        const password = validator.escape(this.state.password).trim()
        const username = validator.escape(this.state.username).trim()

        let error = null
        
        if(this.state.isSignup && !username) {
            error = "Username required!"
        } else if(!email || !validator.isEmail(email)) {
            error = "Email not valid!"
        } else if(!password) {
            error = "Password required!"
        }

        if(error) {
            return this.setState({
                validationError: error
            })
        }

        this.props.onAuth(username, email, password, this.state.isSignup );
    }

    inputChangedHandler = ( event, field ) => {
        this.setState( { [field]: event.target.value } );
    }

    switchAuthTypeHandler = (event) => {
        event.preventDefault()
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup };
        } );
    }

    onAlertClose = () => {
        this.setState( { validationError: null } );
    }

    render () {
        let authRedirect = null
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to='/'/>
        }

        let authComponent = <AuthComponent 
            onFormSubmit={this.submitHandler} 
            onInputChange={this.inputChangedHandler}
            changeAuthType={this.switchAuthTypeHandler} 
            {...this.state}
        />

        if(this.props.loading) {
            authComponent = <Spinner />
        }

        return (
            <React.Fragment>
                {authRedirect}
                {
                    this.state.validationError ? (
                        <Alert
                            open={this.state.validationError ? true : false}
                            onAlertClose={this.onAlertClose}
                            alertType="error"
                            positionVertical="top"
                            positionHorizontal="center">
                            {this.state.validationError}
                        </Alert>
                    ) : null
                }
                {authComponent}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( username, email, password, isSignup ) => dispatch( actions.auth( username, email, password, isSignup ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(Auth, 'Invalid Credentials!', axios) );