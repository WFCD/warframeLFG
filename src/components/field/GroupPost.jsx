import React, { Component } from 'react';
import { Paper, ListItem } from '@material-ui/core';
import question from 'url:../../images/question.png'; // eslint-disable-line import/no-unresolved
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import styles from './GroupPost.scss';

module.exports = class GroupPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    appData: PropTypes.object,
  };

  static defaultProps = {
    post: {},
    appData: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      appData: props.appData,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      post: nextProps.post,
      appData: nextProps.appData,
    });
  }

  getElapsedTime() {
    const { post } = this.state;
    const date = new Date(post.createdOn);
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes`;
    }
    return `${Math.floor(seconds)} seconds`;
  }

  renderHaveWarframes() {
    const { post, appData } = this.state;
    return post.haveWarframes.map((warframe, index) => {
      if (appData.warframes[warframe.name] && appData.warframes[warframe.name].image) {
        return (
          <img
            alt={warframe.name}
            key={`have-${warframe.name}-${index}`}
            className={styles.haveWarframeImage}
            src={appData.warframes[warframe.name].image}
          />
        );
      }

      return (
        <img
          alt={warframe.name}
          key={`have-${warframe.name}-${index}`}
          className={styles.haveWarframeImage}
          src={question}
        />
      );
    }, this);
  }

  renderNeedWarframes() {
    const { post, appData } = this.state;

    return post.needWarframes.map((warframe, index) => {
      if (appData.warframes[warframe.name] && appData.warframes[warframe.name].image) {
        return (
          <img
            alt={warframe.name}
            key={`need-${warframe.name}-${index}`}
            className={styles.needWarframeImage}
            src={appData.warframes[warframe.name].image}
          />
        );
      }

      return (
        <img
          alt={warframe.name}
          key={`need-${warframe.name}-${index}`}
          className={styles.needWarframeImage}
          src={question}
        />
      );
    }, this);
  }

  render() {
    const { post } = this.state;

    return (
      <Paper className={styles.groupPost}>
        <ListItem>
          <div className={styles.rowMaster}>

            <div className={styles.rowWrapper}>

              <div className={styles.column}>
                <div style={{ paddingBottom: 20 }}>
                  <span className={styles.title}>
                    {post.creator}
                  </span>
                </div>
                <span className={styles.primaryText}>
                  {`${post.mission.name} - ${post.mission.type} ${post.mission.tier ? post.mission.tier : ''}
                  ${post.mission.what ? `: ${post.mission.what}` : ''}`}
                </span>
                <div
                  style={{ paddingBottom: 20 }}
                  className={styles.secondaryText}
                >
                  {post.mission.comment}
                </div>
                <div className={styles.column}>
                  <span className={styles.secondaryText}>
                    {post.platform}
                  </span>
                  <span className={styles.secondaryText}>
                    {post.region}
                  </span>
                </div>
              </div>

              <div className={styles.wfWrapper}>
                <div style={{ display: 'inline-block' }}>
                  <div className={styles.wfAll}>
                    <div className={styles.wfHave}>
                      {this.renderHaveWarframes()}
                    </div>
                    {this.renderNeedWarframes()}
                  </div>
                </div>
              </div>

            </div>

            <div className={styles.metaDataColumn}>
              <span className={styles.secondaryText}>
                {`${this.getElapsedTime()} ago`}
              </span>
              <span className={styles.secondaryText}>
                {`${post.spotsLeft} open spot(s)`}
              </span>
            </div>
          </div>
        </ListItem>
      </Paper>
    );
  }
};
