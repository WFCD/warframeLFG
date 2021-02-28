import React, { Component } from 'react';
import _ from 'underscore';
import Rebase from 're-base';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

import {
  Stepper,
  Step,
  StepLabel,
  RaisedButton,
  FlatButton,
} from '@material-ui/core';

import MissionFields from '../field/MissionFields';
import PlayerFields from '../field/PlayerFields';
import RequirementFields from '../field/RequirementFields';

const base = Rebase.createClass(process.env.FIREBASE_URL);

class PostForm extends Component {
  static propTypes = {
    appData: PropTypes.object,
    handleClose: PropTypes.func,
  };

  static defaultProps = {
    appData: {},
    handleClose: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      appData: props.appData,
      // open: false,
      handleClose: props.handleClose,
      stepIndex: 0,
      lastActiveStep: 0,
      playerObject: {},
      missionObject: {},
      requirementObject: { openSpots: 3, haveWarframes: [{ build: 'Any', name: 'Any' }], needWarframes: [{ build: 'Any', name: 'Any' }, { build: 'Any', name: 'Any' }, { build: 'Any', name: 'Any' }] },
      playerValid: null,
      missionValid: null,
      // requirementValid: null,
    };
  }

  componentDidMount() {
    this.setState({ stepIndex: 0 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      appData: nextProps.appData,
      handleClose: nextProps.handleClose,
    });
  }

  handlePlayerFormChange(playerForm) {
    this.setState({ playerObject: playerForm });
  }

  handleMissionFormChange(missionForm) {
    this.setState({ missionObject: missionForm });
  }

  handleRequirementFormChange(requirementForm) {
    this.setState({ requirementObject: requirementForm });
  }

  getStepContent(stepIndex) {
    const { playerValid, appData, missionValid } = this.state;
    switch (stepIndex) {
      case 0:
        return (
          <PlayerFields
            validation={playerValid}
            appData={appData}
            onChange={this.handlePlayerFormChange.bind(this)}
          />
        );
      case 1:
        return (
          <MissionFields
            validation={missionValid}
            missions={appData.missions}
            onChange={this.handleMissionFormChange.bind(this)}
            appData={appData}
          />
        );
      case 2:
        return (
          <RequirementFields
            appData={appData}
            onChange={this.handleRequirementFormChange.bind(this)}
          />
        );
      default:
        return 'Oops';
    }
  }

  submitPost() {
    const { playerObject, missionObject, requirementObject } = this.state;

    const postObject = {};
    postObject.createdOn = new Date().getTime();
    postObject.creator = playerObject.userName;
    postObject.platform = playerObject.platform;
    postObject.region = playerObject.region;
    postObject.mission = missionObject;
    postObject.mission.name = missionObject.mission;
    postObject.haveWarframes = requirementObject.haveWarframes;
    postObject.needWarframes = requirementObject.needWarframes;
    postObject.spotsLeft = requirementObject.openSpots;

    // better way to handle scope?
    const me = this;
    base.push('postings', {
      data: postObject,
      then() {
        me.state.handleClose();
      },
    });
  }

  triggerNextStep() {
    const {
      stepIndex,
      lastActiveStep,
    } = this.state;

    let valid = true;
    switch (stepIndex) {
      case 0:
        valid = this.validatePlayerFields();
        break;
      case 1:
        valid = this.validateMissionFields();
        break;
      case 2:
        valid = true;
        this.submitPost();
        break;
      default:
        break;
    }

    if (valid) {
      this.setState({
        stepIndex: stepIndex + 1,
        lastActiveStep: Math.max(lastActiveStep, stepIndex + 1),
      });
    }
  }

  validateMissionFields() {
    const { missionObject } = this.state;
    const missionValid = { mission: false, comment: true };

    _.each(_.keys(missionObject), (key) => {
      missionValid[key] = !!missionObject[key];
    });
    this.setState({ missionValid });

    return _.reduce(_.keys(missionValid), (memo, key) => memo && missionValid[key], true);
  }

  validatePlayerFields() {
    const { playerObject } = this.state;
    const playerValid = {
      userName: !!playerObject.userName,
      region: !!playerObject.region,
      platform: !!playerObject.platform,
    };
    this.setState({ playerValid });
    return playerObject.userName && playerObject.region && playerObject.platform;
  }

  renderStepActions(stepNumber) {
    const { handleClose } = this.state;
    return [
      <RaisedButton
        key={0}
        label={stepNumber === 3 ? 'Finish' : 'Continue'}
        primary
        onClick={this.triggerNextStep.bind(this)}
      />,
      <FlatButton
        key={1}
        label="Cancel"
        onClick={handleClose}
      />,
    ];
  }

  render() {
    const { stepIndex } = this.state;
    return (
      <div style={{ padding: '0px !important' }}>
        <Stepper
          style={{
            padding: '15px 0 15px 0', margin: '-24px 0 0 0', width: '100%', backgroundColor: 'rgb(232, 232, 232)',
          }}
          activeStep={stepIndex}
        >
          <Step style={{ flex: '0 3 auto' }}>
            <StepLabel>
              user details
            </StepLabel>
          </Step>
          <Step style={{ flex: '0 3 auto' }}>
            <StepLabel>
              mission details
            </StepLabel>
          </Step>
          <Step style={{ flex: '0 3 auto' }}>
            <StepLabel>
              party details
            </StepLabel>
          </Step>
        </Stepper>
        <div style={{ height: 'auto', width: 'auto', padding: '1em' }}>
          <div>
            {this.getStepContent(stepIndex)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5em' }}>
            {this.renderStepActions(stepIndex)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostForm;
