import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return; 
        }
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        let sideDrawer = null
        if(this.props.isAuthenticated) {
            sideDrawer = <SideDrawer 
            closeDrawer={this.sideDrawerClosedHandler}
            showSideDrawer={this.state.showSideDrawer}
            username={this.props.username}/>
        }
        return (
            <React.Fragment>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated} 
                    toggleDrawer={this.sideDrawerToggleHandler}/>
                {sideDrawer}
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username
    };
};

export default connect( mapStateToProps )( Layout );