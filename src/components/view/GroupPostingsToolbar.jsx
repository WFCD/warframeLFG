import React, { Component } from 'react';
import {
  RaisedButton, MenuItem, ToolbarSeparator, Toggle, SelectField,
} from '@material-ui/core';
import { Motion, spring } from 'react-motion';

import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import AdvancedFilters from '../filter/AdvancedFilters';

class GroupPostingsToolbar extends Component {
  static defaultProps = {
    appData: {},
    onCreatePost: () => {},
    onChange: () => {},
  };

  static propTypes = {
    appData: PropTypes.object,
    onCreatePost: PropTypes.func,
    onChange: PropTypes.func,
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      onCreatePost: props.onCreatePost,
      missionFilter: '1',
      platformFilter: '1',
      regionFilter: '1',
      advancedFilterObject: {},
      advancedToggle: false,
      onChange: props.onChange,
      selectedMission: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      onCreatePost: nextProps.onCreatePost,
      appData: nextProps.appData,
      onChange: nextProps.onChange,
    });
  }

  handleMissionChange(event, index, value) {
    const {
      platformFilter, regionFilter, onChange,
    } = this.state;
    this.setState({ missionFilter: value, selectedMission: value, advancedFilterObject: {} });
    onChange({
      mission: value, platform: platformFilter, region: regionFilter, advanced: {},
    });
  }

  handlePlatformChange(event, index, value) {
    const {
      missionFilter, regionFilter, onChange, advancedFilterObject,
    } = this.state;
    this.setState({ platformFilter: value });
    onChange({
      mission: missionFilter, platform: value, region: regionFilter, advanced: advancedFilterObject,
    });
  }

  handleRegionChange(event, index, value) {
    this.setState({ regionFilter: value });
    const {
      platformFilter, missionFilter, onChange, advancedFilterObject,
    } = this.state;
    onChange({
      mission: missionFilter,
      platform: platformFilter,
      region: value,
      advanced: advancedFilterObject,
    });
  }

  handleToggle(event, index) {
    this.setState({ advancedToggle: index });
    const {
      platformFilter, missionFilter, regionFilter, onChange,
    } = this.state;
    if (!index) {
      this.setState({ advancedFilterObject: {} });
      onChange({
        mission: missionFilter, platform: platformFilter, region: regionFilter, advanced: {},
      });
    }
  }

  handleAdvancedFilterChange(key, value) {
    const {
      platformFilter, missionFilter, regionFilter, onChange,
    } = this.state;
    const advancedFilterObject = {};
    advancedFilterObject[key] = value;
    this.setState({ advancedFilterObject });
    onChange({
      mission: missionFilter,
      platform: platformFilter,
      region: regionFilter,
      advanced: advancedFilterObject,
    });
  }

  renderPlatformMenuItems() {
    const { appData } = this.state;

    return appData.platforms.map((platform) => (
      <MenuItem key={platform} value={platform} primaryText={platform} />));
  }

  renderMissionMenuItems() {
    const { appData } = this.state;
    return Object.keys(appData.missions)
      .reverse()
      .map((mission) => (
        <MenuItem
          key={mission}
          value={appData.missions[mission]}
          primaryText={mission}
        />
      ));
  }

  renderRegionMenuItems() {
    const { appData } = this.state;

    return appData.regions.map((region) => (
      <MenuItem key={region} value={region} primaryText={region} />));
  }

  render() {
    const {
      advancedToggle,
      missionFilter,
      platformFilter,
      regionFilter,
      onCreatePost,
      appData,
      selectedMission,
    } = this.state;
    return (
      <Motion style={{
        toolbarHeight: spring(
          advancedToggle ? 400 : 100,
          { stiffness: 120, damping: 17 },
        ),
      }}
      >
        {({ toolbarHeight }) => (
          <div className="group-posting-toolbar" style={{ maxHeight: toolbarHeight }}>

            <div className="group-posting-row">
              <div className="group-posting-toolbar-left">
                <SelectField
                  autoWidth
                  style={{
                    maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block',
                  }}
                  value={missionFilter}
                  onChange={this.handleMissionChange.bind(this)}
                  floatingLabelText="mission"
                  floatingLabelStyle={{ fontSize: '1.2em' }}
                >
                  <MenuItem value="1" primaryText="any mission" />
                  {this.renderMissionMenuItems()}
                </SelectField>

                <SelectField
                  autoWidth
                  style={{
                    maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block',
                  }}
                  value={platformFilter}
                  onChange={this.handlePlatformChange.bind(this)}
                  floatingLabelText="platform"
                  floatingLabelStyle={{ fontSize: '1.2em' }}
                >
                  <MenuItem value="1" primaryText="any platform" />
                  {this.renderPlatformMenuItems()}
                </SelectField>

                <SelectField
                  autoWidth
                  style={{
                    maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block',
                  }}
                  value={regionFilter}
                  onChange={this.handleRegionChange.bind(this)}
                  floatingLabelText="region"
                  floatingLabelStyle={{ fontSize: '1.2em' }}
                >
                  <MenuItem value="1" primaryText="any region" />
                  {this.renderRegionMenuItems()}
                </SelectField>
              </div>

              <div className="group-posting-toolbar-right">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Toggle
                    toggled={advancedToggle}
                    onToggle={this.handleToggle.bind(this)}
                    className="grey-text"
                    label="Advanced"
                  />
                </div>

                <ToolbarSeparator style={{ top: 0, marginRight: 25, height: 40 }} />

                <RaisedButton
                  label="Post"
                  primary
                  onClick={onCreatePost}
                />
              </div>
            </div>

            { advancedToggle
              ? (
                <div className="group-posting-row">
                  <AdvancedFilters
                    appData={appData}
                    selectedMission={selectedMission}
                    onChangeCallback={this.handleAdvancedFilterChange.bind(this)}
                  />
                </div>
              ) : null}

          </div>
        )}
      </Motion>
    );
  }
}

module.exports = GroupPostingsToolbar;
