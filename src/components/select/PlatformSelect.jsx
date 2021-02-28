import React, { Component } from 'react';
import { SelectField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

class PlatformSelect extends Component {
  static propTypes = {
    platforms: PropTypes.array,
    onChange: PropTypes.func,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    platforms: ['pc', 'ps4', 'xb1', 'switch'],
    onChange: () => {},
    errorText: null,
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      platforms: props.platforms,
      value: null,
      onChange: props.onChange,
      errorText: props.errorText,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      // regions: nextProps.platforms,
      onChange: nextProps.onChange,
      errorText: nextProps.errorText,
    });
  }

  handleChange(event, index, value) {
    this.setState({ value });
    const { onChange } = this.state;
    onChange(value);
  }

  renderMenuItems() {
    const { platforms } = this.state;
    return platforms.map((platform) => (
      <MenuItem key={platform} value={platform} primaryText={platform} />
    ));
  }

  render() {
    const { value, errorText } = this.state;
    return (
      <SelectField
        autoWidth
        value={value}
        style={{
          fontSize: '1em', width: '90%', display: 'inline-block', overflow: 'visible',
        }}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="platform"
        floatingLabelStyle={{ fontSize: '1.2em' }}
        errorText={errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = PlatformSelect;
