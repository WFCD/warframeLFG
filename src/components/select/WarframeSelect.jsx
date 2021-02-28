import React, { Component } from 'react';
import { SelectField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

class WarframesSelect extends Component {
  static propTypes = {
    warframes: PropTypes.array,
    label: PropTypes.string,
  };

  static defaultProps = {
    warframes: [],
    label: '',
  }

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      warframes: props.warframes,
      value: '1',
      label: props.label,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      warframes: nextProps.warframes,
    });
  }

  handleChange(event, index, value) {
    this.setState({ value });
    // this.state.selectHandler(value);
  }

  renderMenuItems() {
    const { warframes } = this.state;
    return Object.keys(warframes)
      .map((warframe) => <MenuItem key={warframe} value={warframe} primaryText={warframe} />);
  }

  render() {
    const { value, label } = this.state;
    return (
      <SelectField
        autoWidth
        style={{
          fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block',
        }}
        value={value}
        maxHeight={250}
        onChange={this.handleChange.bind(this)}
        floatingLabelText={label}
        floatingLabelStyle={{ fontSize: '1.2em', overflow: 'hidden', display: 'inline-block' }}
      >
        <MenuItem value="1" primaryText="Any" />
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = WarframesSelect;
