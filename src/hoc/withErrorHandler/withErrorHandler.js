import React, { Component } from 'react';

import Alert from '../../components/UI/Alert/Alert.js';

const withErrorHandler = ( WrappedComponent, generalErrorMessage, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        onAlertClose = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <React.Fragment>
                    {
                        this.state.error ? (
                            <Alert
                                open={this.state.error ? true : false}
                                onAlertClose={this.onAlertClose}
                                alertType="error"
                                positionVertical="top"
                                positionHorizontal="center">
                                {this.state.error ? generalErrorMessage : 'Something went wrong!'}
                            </Alert>
                        ) : null
                    }
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;