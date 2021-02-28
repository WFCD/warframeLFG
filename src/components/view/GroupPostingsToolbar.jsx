import {Component} from 'react';
import {RaisedButton, MenuItem, ToolbarSeparator, Toggle, SelectField} from '@material-ui/core';
import {Motion, spring} from 'react-motion';

import {AdvancedFilters} from '../filter/AdvancedFilters';

class GroupPostingsToolbar extends Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
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
      selectedMission: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      onCreatePost: nextProps.onCreatePost,
      appData: nextProps.appData,
      onChange: nextProps.onChange
    });
  }

  renderMissionMenuItems(){
    return Object.keys(this.state.appData.missions).reverse().map((mission) => {
      return <MenuItem key={mission} value={this.state.appData.missions[mission]} primaryText={mission} />
    });
  }

  renderPlatformMenuItems(){
    return this.state.appData.platforms.map((platform) => {
      return <MenuItem key={platform} value={platform} primaryText={platform} />
    });
  }

  renderRegionMenuItems(){
    return this.state.appData.regions.map((region) => {
      return <MenuItem key={region} value={region} primaryText={region} />
    });
  }

  handleMissionChange(event, index, value){
    this.setState({missionFilter: value, selectedMission: value, advancedFilterObject: {}});
    this.state.onChange({mission: value, platform: this.state.platformFilter, region: this.state.regionFilter, advanced: {}});
  }

  handlePlatformChange(event, index, value){
    this.setState({platformFilter: value});
    this.state.onChange({mission: this.state.missionFilter, platform: value, region: this.state.regionFilter, advanced: this.state.advancedFilterObject});
  }

  handleRegionChange(event, index, value){
    this.setState({regionFilter: value});
    this.state.onChange({mission: this.state.missionFilter, platform: this.state.platformFilter, region: value, advanced: this.state.advancedFilterObject});
  }

  handleToggle(event, index, value){
    this.setState({advancedToggle: index});
    if (!index) {
      this.setState({advancedFilterObject: {}});
      this.state.onChange({mission: this.state.missionFilter, platform: this.state.platformFilter, region: this.state.regionFilter, advanced: {}});
    }
  }

  handleAdvancedFilterChange(key, value){
    let advancedFilterObject = {};
    advancedFilterObject[key] = value;
    this.setState({advancedFilterObject});
    this.state.onChange({mission: this.state.missionFilter, platform: this.state.platformFilter, region: this.state.regionFilter, advanced: advancedFilterObject});
  }

  render() {
    return (
      <Motion style={{toolbarHeight: spring(this.state.advancedToggle ? 400 : 100, {stiffness: 120, damping: 17})}}>
        {({toolbarHeight}) =>
          <div className='group-posting-toolbar' style={{maxHeight: toolbarHeight}}>

            <div className='group-posting-row'>
              <div className='group-posting-toolbar-left'>
                <SelectField
                  autoWidth={true}
                  style={{maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block'}}
                  value={this.state.missionFilter}
                  onChange={this.handleMissionChange.bind(this)}
                  floatingLabelText='mission'
                  floatingLabelStyle={{fontSize: '1.2em'}}
                  >
                    <MenuItem value='1' primaryText='any mission' />
                    {this.renderMissionMenuItems()}
                </SelectField>

                <SelectField
                  autoWidth={true}
                  style={{maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block'}}
                  value={this.state.platformFilter}
                  onChange={this.handlePlatformChange.bind(this)}
                  floatingLabelText='platform'
                  floatingLabelStyle={{fontSize: '1.2em'}}
                  >
                    <MenuItem value='1' primaryText='any platform' />
                    {this.renderPlatformMenuItems()}
                </SelectField>

                <SelectField
                  autoWidth={true}
                  style={{maxWidth: 150, fontSize: '1em', width: '33%', overflow: 'hidden', display: 'inline-block'}}
                  value={this.state.regionFilter}
                  onChange={this.handleRegionChange.bind(this)}
                  floatingLabelText='region'
                  floatingLabelStyle={{fontSize: '1.2em'}}
                  >
                    <MenuItem value='1' primaryText='any region' />
                    {this.renderRegionMenuItems()}
                </SelectField>
              </div>


              <div className='group-posting-toolbar-right'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Toggle
                    toggled={this.state.advancedToggle}
                    onToggle={this.handleToggle.bind(this)}
                    className='grey-text'
                    label='Advanced'
                  />
                </div>

                <ToolbarSeparator style={{top: 0, marginRight: 25, height: 40}}/>

                <RaisedButton label='Post'
                  primary={true}
                  onClick={this.state.onCreatePost}
                />
              </div>
            </div>

            { this.state.advancedToggle ?
              <div className='group-posting-row'>
                <AdvancedFilters
                  appData={this.state.appData}
                  selectedMission={this.state.selectedMission}
                  onChangeCallback={this.handleAdvancedFilterChange.bind(this)}
                />
              </div> : null
            }

          </div>
        }
    </Motion>
    );
  }
}

module.exports = GroupPostingsToolbar;
