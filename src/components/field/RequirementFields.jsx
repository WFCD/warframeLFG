import React, { Component } from 'react';

import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import WarframeAdder from './WarframeAdder';
import OpenSpotsSelect from '../select/OpenSpotsSelect';
import styles from './RequirementFields.scss';

class RequirementFields extends Component {
  static propTypes = {
    appData: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    appData: {},
    onChange: () => {},
  };

  constructor(props) { /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
      appData: props.appData,
      openSpots: 3,
      onChange: props.onChange,
      requirementObject: { openSpots: 3, haveWarframes: [{ build: 'Any', name: 'Any' }], needWarframes: [{ build: 'Any', name: 'Any' }, { build: 'Any', name: 'Any' }, { build: 'Any', name: 'Any' }] },
      warframeList: [{ name: 'Any', build: 'Any' }, { name: 'Any', build: 'Any' }, { name: 'Any', build: 'Any' }, { name: 'Any', build: 'Any' }],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      appData: nextProps.appData,
    });
  }

  handleOnChange(key, value) {
    const { requirementObject, onChange } = this.state;
    const newValue = {};
    // Check if string since we're using this for textfield changes that return an event
    newValue[key] = typeof value === 'string' || typeof value === 'number' || Array.isArray(value) ? value : value.currentTarget.value;
    this.setState({
      requirementObject: {
        ...requirementObject,
        ...newValue,
      },
    });
    onChange(requirementObject);
  }

  handleWarframeChange(warframeList, openSpots) {
    const { openSpots: stateOpenSpots } = this.state;
    const openSpotsUse = openSpots || stateOpenSpots;
    const haveCount = 4 - openSpotsUse;
    this.handleOnChange('haveWarframes', warframeList.slice(0, haveCount));
    this.handleOnChange('needWarframes', warframeList.slice(haveCount));
    this.setState({ warframeList });
  }

  openSpotsChangeCallback(openSpots) {
    const { warframeList } = this.state;

    this.setState({
      openSpots,
    });
    this.handleOnChange('openSpots', openSpots);
    this.handleWarframeChange(warframeList, openSpots);
  }

  render() {
    const { openSpots, appData } = this.state;
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.colHalf}>
            <OpenSpotsSelect
              defaultValue={openSpots}
              onChangeCallback={this.openSpotsChangeCallback.bind(this)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <WarframeAdder
            appData={appData}
            openSpots={openSpots}
            warframes={appData.warframes}
            onChange={this.handleWarframeChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

module.exports = RequirementFields;
