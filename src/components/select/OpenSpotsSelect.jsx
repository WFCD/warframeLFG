import React, { Component } from 'react';
import { SelectField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

class OpenSpotsSelect extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    onChangeCallback: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: '',
    onChangeCallback: () => {},
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      value: props.defaultValue,
      onChangeCallback: props.onChangeCallback,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //       regions: nextProps.regions
  //   });
  // }

  handleChange(event, index, value) {
    this.setState({ value });
    const { onChangeCallback } = this.state;
    onChangeCallback(value);
  }

  renderMenuItems() {
    const { regions } = this.state;
    return regions.map((region) => (
      <MenuItem
        key={region}
        value={region}
        primaryText={region}
      />
    ));
  }

  render() {
    const { value } = this.state;
    return (
      <SelectField
        autoWidth
        style={{
          fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block',
        }}
        value={value}
        maxHeight={250}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="open spots"
        floatingLabelStyle={{ fontSize: '1.2em' }}
      >
        <MenuItem key={1} value={1} primaryText={1} />
        <MenuItem key={2} value={2} primaryText={2} />
        <MenuItem key={3} value={3} primaryText={3} />
      </SelectField>
    );
  }
}

module.exports = OpenSpotsSelect;
