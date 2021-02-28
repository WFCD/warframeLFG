import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import _ from 'underscore';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import MissionSelect from '../select/MissionSelect';
import MissionQuestionSelect from '../select/MissionQuestionSelect';
import styles from './MissionFields.scss';

module.exports = class MissionFields extends Component {
  static propTypes = {
    missions: PropTypes.array,
    onChange: PropTypes.func,
    validation: PropTypes.func,
    appData: PropTypes.object,
  };

  static defaultProps = {
    missions: [],
    onChange: () => {},
    validation: () => {},
    appData: {},
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      missions: props.missions,
      selectedMission: null,
      missionObject: {},
      onChange: props.onChange,
      validation: props.validation,
      farmType: null,
      appData: props.appData,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      missions: nextProps.missions,
      appData: nextProps.appData,
      validation: nextProps.validation,
    });
  }

  // handle main mission dropdown
  handleMissionSelect(mission) {
    const { onChange } = this.state;
    this.setState({
      selectedMission: mission,
    });

    const missionObject = {};
    _.each(_.keys(mission), (key) => {
      if (key !== 'name') {
        missionObject[key] = null;
      }
    });
    missionObject.mission = mission.name;
    this.setState({ missionObject });
    onChange(missionObject);
  }

  // onChange callback/postObj handle for all subquestions
  handleOnChange(key, value) {
    // temporary hack to prevent long comments
    if (key === 'comment') {
      value = value.substr(0, 200);
    }

    const { missionObject: stateMissionObject, onChange } = this.state;

    const newValue = {};
    // Check if string since we're using this for textfield changes that return an event
    newValue[key] = typeof value === 'string' ? value : value.currentTarget.value;
    const missionObject = _.extend(stateMissionObject, newValue);

    // Special case for 'farming' type
    if (key === 'type' && missionObject.mission === 'Farming') {
      this.setState({ farmType: value });
      missionObject.what = null;
      this.setState({ missionObject });
    }

    this.setState({ missionObject });
    onChange(missionObject);
  }

  // Rendering for subquestions
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

  // Hacky solution to handle farming dropdown..
  renderWhatSelect() {
    const {
      selectedMission, farmType, appData, validation,
    } = this.state;
    if (selectedMission && selectedMission.name === 'Farming' && farmType) {
      let dataList = [];
      switch (farmType) {
        case 'Affinity':
          dataList = _.keys(appData.affinity);
          break;
        case 'Resources':
          dataList = appData.resources;
          break;
        case 'Warframe Parts':
          dataList = _.keys(appData.warframes);
          break;
        case 'Archwing Parts':
          dataList = _.keys(appData.archwing);
          break;
        case 'Void Keys':
          dataList = _.keys(appData.void);
          break;
        default:
          break;
      }
      return (
        <MissionQuestionSelect
          key={farmType}
          onChange={this.handleOnChange.bind(this, 'what')}
          keyName="what"
          errorText={!validation || validation.what ? '' : 'This field is required'}
          valueList={dataList}
        />
      );
    }
    return (
      <>
      </>
    );
  }

  render() {
    const { missions, validation } = this.state;
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <MissionSelect
              missions={missions}
              selectHandler={this.handleMissionSelect.bind(this)}
              errorText={!validation || validation.mission ? '' : 'This field is required'}
            />
          </div>
          <div className={styles.colHalf}>
            {this.renderMissionDetail()}
            {this.renderWhatSelect()}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <TextField
              style={{
                fontSize: '1em', width: '100%', overflow: 'hidden', display: 'inline-block',
              }}
              floatingLabelStyle={{ fontSize: '1.2em' }}
              floatingLabelText="comment"
              multiLine
              onBlur={this.handleOnChange.bind(this, 'comment')}
            />
          </div>
        </div>
      </div>
    );
  }
};
