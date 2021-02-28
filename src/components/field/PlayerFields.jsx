import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import RegionSelect from '../select/RegionSelect';
import PlatformSelect from '../select/PlatformSelect';
import styles from './PlayerFields.scss';

class PlayerFields extends Component {
  static propTypes = {
    appData: PropTypes.object,
    userName: PropTypes.string,
    region: PropTypes.string,
    platform: PropTypes.string,
    onChange: PropTypes.func,
    validation: PropTypes.object,
  };

  static defaultProps = {
    appData: {},
    userName: '[DE]Steve',
    region: 'North America',
    platform: 'pc',
    onChange: () => {},
    validation: {},
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      userName: null,
      region: null,
      platform: null,
      onChange: props.onChange,
      validation: props.validation,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      appData: nextProps.appData,
      onChange: nextProps.onChange,
      validation: nextProps.validation,
    });
  }

  onChangeUsername(event) {
    const { onChange, platform, region } = this.state;
    this.setState({ userName: event.currentTarget.value });
    onChange({ userName: event.currentTarget.value, region, platform });
  }

  onChangeRegion(value) {
    const { onChange, userName, platform } = this.state;
    this.setState({ region: value });
    onChange({ userName, region: value, platform });
  }

  onChangePlatform(value) {
    const { onChange, userName, region } = this.state;

    this.setState({ platform: value });
    onChange({ userName, region, platform: value });
  }

  render() {
    const { validation, appData } = this.state;
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <TextField
              floatingLabelText="username"
              style={{
                fontSize: '1em', width: '90%', display: 'inline-block', overflow: 'visible',
              }}
              floatingLabelStyle={{ fontSize: '1.2em' }}
              multiLine
              onBlur={this.onChangeUsername.bind(this)}
              errorText={!validation || validation.userName ? '' : 'This field is required'}
            />
          </div>
          <div className={styles.colHalf} />
        </div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <PlatformSelect
              platforms={appData.platforms}
              onChange={this.onChangePlatform.bind(this)}
              errorText={!validation || validation.platform ? '' : 'This field is required'}
            />
          </div>
          <div className={styles.colHalf}>
            <RegionSelect
              regions={appData.regions}
              onChange={this.onChangeRegion.bind(this)}
              errorText={!validation || validation.region ? '' : 'This field is required'}
            />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PlayerFields;
