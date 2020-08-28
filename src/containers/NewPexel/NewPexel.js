import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from '../../axios-pexel'
import Alert from '../../components/UI/Alert/Alert.js';

import UploadPexel from "../../components/UploadPexel/UploadPexel"
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner'
import validator from 'validator'

import * as actions from '../../store/actions/index';

class NewPexel extends Component {
    
    state = {
        title: '',
        image: '',
        validationError: null
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        
        const title = validator.escape(this.state.title).trim()
        const image = this.state.image

        let error = null
        
        if(!title) {
            error = "Title required!"
        } else if(!image) {
            error = "Image required!"
        }

        if(error) {
            return this.setState({
                validationError: error
            })
        }
        this.props.onUploadPexel(this.state.title, this.state.image, this.props.token );
    }

    inputChangedHandler = ( event, field ) => {
        this.setState( { [field]: event.target.value } );
    }
    
    fileChangeHandler = (event, field) => {
        this.setState( { [field]: event.target.files[0] } );
    }

    onAlertClose = () => {
        this.setState( { validationError: null } );
    }
    
    render () {
        let redirect = null
        if ( !this.props.isAuthenticated ) {
            redirect = <Redirect to='/'/>
        }

        if ( this.props.success ) {
            redirect = <Redirect to='/pexels/my'/>
        }

        let uploadPexel = <UploadPexel 
            onFormSubmit={this.submitHandler} 
            onInputChange={this.inputChangedHandler}
            onFileChange={this.fileChangeHandler}
            {...this.state}
        />

        if(this.props.loading) {
            uploadPexel = <Spinner />
        }

        return (
            <React.Fragment>
                {redirect}
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
                {uploadPexel}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        loading: state.uploadPexel.loading,
        success: state.uploadPexel.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUploadPexel: (title, image, token) => dispatch( actions.uploadPexel( title, image, token ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(NewPexel, 'Unable to upload pexel!', axios) );