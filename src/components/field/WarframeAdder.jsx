import React from 'react';

import {
  FloatingActionButton, PersonalAddIcon, EditIcon, Popover, MenuItem,
} from '@material-ui/core';
import _ from 'underscore';

import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

import question from 'url:../../images/question.png';
import styles from './WarframeAdder.scss';

class WarframeAdder extends React.Component {
  static propTypes = {
    appData: PropTypes.object,
    warframes: PropTypes.object,
    openSpots: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string,
    anchorEl: PropTypes.element,
  };

  static defaultProps = {
    appData: {},
    warframes: [],
    openSpots: 3,
    onChange: () => {},
    value: '',
    anchorEl: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      appData: props.appData,
      warframes: props.warframes,
      openSpots: props.openSpots,
      warframeList: [{ name: 'Any', build: 'Any' }, { name: 'Any', build: 'Any' }, { name: 'Any', build: 'Any' }, { name: 'Any', build: 'Any' }],
      open: false,
      onChange: props.onChange,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      warframes: nextProps.warframes,
      openSpots: nextProps.openSpots,
    });
  }

  handleChange(event, index, value) {
    this.setState({ value });
    // this.state.selectHandler(value);
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleMenuTouch(event) {
    const { warframeList, anchorEl, onChange } = this.state();
    warframeList[anchorEl.id].name = event.currentTarget.textContent;
    this.setState({ warframeList, open: false });
    onChange(warframeList);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  renderMenuItems() {
    const { warframes } = this.state;
    return Object.keys(warframes)
      .map((warframe) => (
        <MenuItem
          onTouchTap={this.handleMenuTouch.bind(this)}
          style={{ overflowX: 'hidden' }}
          key={warframe}
          value={warframe}
          primaryText={warframe}
        />
      ));
  }

  renderHaveWarframes() {
    const { openSpots, warframeList, appData } = this.state;
    const haveCount = 4 - openSpots;
    const haveList = warframeList.slice(0, haveCount);
    return haveList.map((warframe, index) => {
      if (appData.warframes[warframe.name]) {
        return (
          <div key={index}>
            <img
              alt={warframe.name}
              className={styles.haveWarframeImage}
              src={appData.warframes[warframe.name].image}
            />
            <FloatingActionButton
              id={index}
              onClick={this.handleTouchTap.bind(this)}
              secondary
              className={styles.add}
              mini
            >
              <EditIcon />
            </FloatingActionButton>
          </div>
        );
      }

      return (
        <div key={index}>
          <img
            alt="Unknown"
            className={styles.haveWarframeImage}
            src={question}
          />
          <FloatingActionButton
            id={index}
            onClick={this.handleTouchTap.bind(this)}
            secondary
            className={styles.add}
            mini
          >
            <PersonalAddIcon />
          </FloatingActionButton>
        </div>
      );
    }, this);
  }

  renderNeedWarframes() {
    const { openSpots, warframeList, appData } = this.state;
    const haveCount = 4 - openSpots;
    const needList = warframeList.slice(haveCount);
    return needList.map((warframe, index) => {
      if (appData.warframes[warframe.name]) {
        return (
          <div key={index + haveCount}>
            <img
              alt={warframe.name}
              className={styles.needWarframeImage}
              src={appData.warframes[warframe.name].image}
            />
            <FloatingActionButton
              id={index + haveCount}
              onClick={this.handleTouchTap.bind(this)}
              secondary
              className={styles.add}
              mini
            >
              <EditIcon />
            </FloatingActionButton>
          </div>
        );
      }

      return (
        <div key={index + haveCount}>
          <img
            alt="Unknown"
            className={styles.needWarframeImage}
            src={question}
          />
          <FloatingActionButton
            id={index + haveCount}
            onClick={this.handleTouchTap.bind(this)}
            secondary
            className={styles.add}
            mini
          >
            <PersonalAddIcon />
          </FloatingActionButton>
        </div>
      );
    }, this);
  }

  render() {
    const { open, anchorEl } = this.state;
    return (
      <div className={styles.wfWrapper}>
        <div style={{ display: 'inline-block' }}>
          <div className={styles.label}>group composition</div>
          <div className={styles.wfAll}>
            <div className={styles.wfHave}>
              {this.renderHaveWarframes()}
            </div>
            {this.renderNeedWarframes()}
          </div>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
          className={styles.popOver}
          animated={false}
        >
          <MenuItem
            focusState="keyboard-focused"
            onTouchTap={this.handleMenuTouch.bind(this)}
            style={{ overflowX: 'hidden' }}
            value="Any"
            primaryText="Any"
          />
          {this.renderMenuItems()}
        </Popover>
      </div>
    );
  }
}

module.exports = WarframeAdder;
