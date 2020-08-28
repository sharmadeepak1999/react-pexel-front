import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Box from "@material-ui/core/Box"
import SearchBar from "../../../components/SearchBar/SearchBar"

class SearchPexel extends Component {
  state = {
    queryText: ''
  }

  searchImagesHandler = (e) => {
    e.preventDefault()
    let query = this.state.queryText.trim()

    if(!query) {
      return
    }

    this.props.onSearchImages(query)
  }

  inputChangeHandler = (e) => {
    this.setState({ queryText: e.target.value })
  }

  render() {
    return (
       <Box m={4} mt={10}>
            <SearchBar
              queryText={this.state.queryText} 
              onSearch={this.searchImagesHandler}
              onInputChange={this.inputChangeHandler}/>
       </Box>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onSearchImages: (query) => dispatch(actions.searchImages(query)),
  }
}

export default connect(null, mapDispatchToProps)(SearchPexel)
