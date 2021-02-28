import React, { Component } from 'react';

import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

import MissionQuestionSelect from '../select/MissionQuestionSelect';
import styles from './AdvancedFilters.scss';

class AdvancedFilters extends Component {
  static propTypes = {
    selectedMission: PropTypes.object,
    onChangeCallback: PropTypes.func,
  };

  static defaultProps = {
    selectedMission: () => {},
    onChangeCallback: () => {},
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      selectedMission: null,
      onChangeCallback: props.onChangeCallback,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      selectedMission: nextProps.selectedMission,
      onChangeCallback: nextProps.onChangeCallback,
    });
  }

  handleOnChange(key, value) {
    const { onChangeCallback } = this.state;
    onChangeCallback(key, value);
  }

  renderMissionDetail() {
    const { selectedMission, validation } = this.state;
    if (!selectedMission) {
      return null;
    }
    // Reverse for non-alphabetic order..
    const keys = Object.keys(selectedMission).reverse();
    return keys.map((key) => {
      // handle the 'what' key separately, because it's dependent on the 'type' question
      if (selectedMission[key] instanceof Array && key !== 'what') {
        return (
          <MissionQuestionSelect
            onChange={this.handleOnChange.bind(this, key)}
            key={key + selectedMission.name}
            keyName={key}
            errorText={!validation || validation[key] ? '' : 'This field is required'}
            valueList={selectedMission[key]}
          />
        );
      }
      return false;
    });
  }

  render() {
    return (
      <div>
        {this.renderMissionDetail()}
      </div>
    );
  }
}

module.exports = AdvancedFilters;
