import React, { Component } from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import PostForm from '../select/PostForm';

class PostFormModal extends Component {
  static propTypes = {
    appData: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
  };

  static defaultProps = {
    appData: {},
    open: false,
    handleClose: () => {},
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      open: false,
      handleClose: props.handleClose,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      appData: nextProps.appData,
      open: nextProps.open,
      handleClose: nextProps.handleClose,
    });
  }

  handleClose() {
    const { handleClose } = this.state;
    this.setState({ open: false });
    handleClose();
  }

  render() {
    const { appData, open } = this.state;
    return (
      <div>
        <Dialog
          bodyStyle={{ padding: '0px' }}
          modal={false}
          open={open}
          contentStyle={{ width: '100%', padding: 0 }}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent
        >
          <PostForm appData={appData} handleClose={this.handleClose.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

module.exports = PostFormModal;
