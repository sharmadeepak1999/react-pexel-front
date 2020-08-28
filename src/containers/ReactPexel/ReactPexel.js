import React, { Component } from 'react';
import Pexels from "./Pexels/Pexels"
import SearchPexel from "../ReactPexel/SearchPexel/SearchPexel"

import { connect } from "react-redux"

class ReactPexel extends Component {
    render () {
        return (
            <React.Fragment>
                <SearchPexel />
                <Pexels />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(ReactPexel)