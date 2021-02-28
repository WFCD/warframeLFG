import React, { Component } from 'react';
import { SelectField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

class MissionSelect extends Component {
  static propTypes = {
    missions: PropTypes.array,
    selectHandler: PropTypes.func,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    missions: [],
    selectHandler: () => {},
    errorText: null,
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      missions: props.missions,
      selectHandler: props.selectHandler,
      value: null,
      errorText: props.errorText,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      errorText: nextProps.errorText,
    });
  }

  handleChange(event, index, value) {
    this.setState({ value });
    const { selectHandler } = this.state;
    selectHandler(value);
  }

  renderMenuItems() {
    const { missions } = this.state;
    return Object.keys(missions)
      .reverse()
      .map((mission) => (
        <MenuItem
          key={mission}
          value={missions[mission]}
          primaryText={mission}
        />
      ));
  }

  render() {
    const { value, errorText } = this.state;
    return (
      <SelectField
        autoWidth
        style={{
          fontSize: '1em', width: '90%', display: 'inline-block', overflow: 'visible',
        }}
        value={value}
        onChange={this.handleChange.bind(this)}
        floatingLabelText="mission"
        floatingLabelStyle={{ fontSize: '1.2em' }}
        errorText={errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionSelect;
