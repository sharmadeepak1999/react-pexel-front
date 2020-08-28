import React, { Component } from 'react';
import Images from "../../../components/Images/Images"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Box from "@material-ui/core/Box"
import Spinner from "../../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
import axios from '../../../axios-pexel'

class Pexels extends Component {
  
  componentDidMount() {
    this.props.onInitImages()
  }

  render() {
    let images = <Spinner />
        
    if(!this.props.loading) {
      if(this.props.images.length <= 0) {
        images = <h4 style={{ textAlign: 'center', marginTop: '180px', color: 'grey' }}>No results to show!</h4>
      } else {
        images = <Images images={this.props.images} />
      }
    }
    return (
      <Box mt={5}>
        {images}
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
      images: state.reactPexel.images,
      loading: state.reactPexel.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onInitImages: () => dispatch(actions.initImages()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(Pexels, 'Unable to load images!', axios) )
