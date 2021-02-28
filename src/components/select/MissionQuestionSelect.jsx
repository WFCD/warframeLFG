import React, { Component } from 'react';
import { SelectField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

class MissionQuestionSelect extends Component {
  static propTypes = {
    keyName: PropTypes.string,
    valueList: PropTypes.array,
    onChange: PropTypes.func,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    keyName: '',
    valueList: [],
    onChange: () => {},
    errorText: null,
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      keyName: props.keyName,
      valueList: props.valueList,
      value: null,
      onChange: props.onChange,
      errorText: props.errorText,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      // mission: nextProps.mission,
      errorText: nextProps.errorText,
    });
  }

  handleChange(event, index, value) {
    this.setState({ value });
    const { onChange } = this.state;
    onChange(value);
  }

  renderMenuItems() {
    const { valueList } = this.state;
    if (!valueList) {
      return null;
    }
    return valueList.map((value) => <MenuItem key={value} value={value} primaryText={value} />);
  }

  render() {
    const {
      value, valueList, keyName, errorText,
    } = this.state;
    return (
      <SelectField
        style={{
          fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block',
        }}
        autoWidth
        value={value}
        disabled={!valueList}
        onChange={this.handleChange.bind(this)}
        floatingLabelText={keyName}
        floatingLabelStyle={{ fontSize: '1.2em' }}
        errorText={errorText}
      >
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = MissionQuestionSelect;
