import React, { Component } from 'react';
import PexelsTable from "../../components/PexelsTable/PexelsTable"
import Spinner from "../../components/UI/Spinner/Spinner"
import * as actions from '../../store/actions/index';

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import { connect } from "react-redux"
import { Box } from '@material-ui/core';
import axios from '../../axios-pexel'

class MyPexels extends Component {
    componentDidMount() {
        this.props.onFetchPexels(this.props.token)
    }

    deletePexelsHandler = (selectedPexels) => {
        if(selectedPexels.length <= 0) return
        this.props.onDeletePexels(selectedPexels, this.props.token)
    }

    render () {
        let pexelsTable = <Spinner />
        if(!this.props.loading) {
            pexelsTable = <PexelsTable pexelsData={this.props.pexelsData} deletePexels={this.deletePexelsHandler}/>
        }
        return (
            <Box m={3} mt={10}>
                {pexelsTable}
            </Box>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        pexelsData: state.myPexels.pexelsData,
        loading: state.myPexels.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPexels: (token) => dispatch(actions.fetchMyPexels(token)),
        onDeletePexels: (selectedPexels, token) => dispatch(actions.deletePexels(selectedPexels, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MyPexels, "Unable to load data!", axios))