import React, { Component } from 'react';
import { SelectField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

class RegionSelect extends Component {
  static propTypes = {
    regions: PropTypes.array,
    onChange: PropTypes.func,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    regions: ['North America', 'South America', 'Europe', 'SouthEast Asia'],
    onChange: () => {},
    errorText: null,
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      regions: props.regions,
      value: null,
      onChange: props.onChange,
      errorText: props.errorText,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      regions: nextProps.regions,
      onChange: nextProps.onChange,
      errorText: nextProps.errorText,
    });
  }

  handleChange(event, index, value) {
    const { onChange } = this.state;
    this.setState({ value });
    onChange(value);
  }

  renderMenuItems() {
    const { regions } = this.state;
    return regions.map((region) => (<MenuItem key={region} value={region} primaryText={region} />));
  }

  render() {
    const { value, errorText } = this.state;
    return (
      <SelectField
        value={value}
        autoWidth
        style={{
          fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block',
        }}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="region"
        floatingLabelStyle={{ fontSize: '1.2em' }}
        errorText={errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = RegionSelect;
