import React, { Component } from 'react';
import { List, Divider } from '@material-ui/core';
import Rebase from 're-base';
import _ from 'underscore';

import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import PostFormModal from '../modal/PostFormModal';
import GroupPostingsToolbar from './GroupPostingsToolbar';
import GroupPost from '../field/GroupPost';

import styles from './GroupPostings.scss';

const base = Rebase.createClass(process.env.FIREBASE_URL);

class GroupPostings extends Component {
  static propTypes = {
    appData: PropTypes.object,
  };

  static defaultProps = {
    appData: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      appData: props.appData,
      postFormOpen: false,
      posts: [],
      filter: {
        mission: '1', platform: '1', region: '1', advanced: {},
      },
    };
  }

  componentDidMount() {
    this.ref = base.syncState('postings', {
      context: this,
      state: 'posts',
      asArray: true,
      queries: {
        orderByChild: 'createdOn',
        startAt: (new Date().getTime() - (3600000)),
      },
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line camelcase
    this.setState({
      appData: nextProps.appData,
    });
  }

  handleCreate() {
    this.setState({ postFormOpen: true });
  }

  handleClose() {
    this.setState({ postFormOpen: false });
  }

  handleFilterChange(filter) {
    this.setState({ filter });
  }

  filterByAdvanced(posts) {
    const { filter: { advanced } } = this.state;
    const filter = advanced;
    let filteredPosts = posts;
    const keys = Object.keys(filter);
    if (keys.length) {
      filteredPosts = _.filter(filteredPosts,
        (post) => _.reduce(keys, (memo, key) => memo && filter[key] === post.mission[key], true));
    }
    return filteredPosts;
  }

  renderPosts() {
    const { filter, posts, appData } = this.state;
    let filteredPosts = _.filter(posts, (post) => (filter.platform === '1' || post.platform === filter.platform)
      && (filter.region === '1' || post.region === filter.region)
      && (filter.mission === '1' || post.mission.name === filter.mission.name));

    filteredPosts = this.filterByAdvanced(filteredPosts);

    const postMap = filteredPosts
      .map((post, index) => (
        <GroupPost post={post} key={index} appData={appData} />
      ));
    return postMap.length ? postMap.reverse() : <div className={styles.noResults} style={{ marginTop: '3em' }}>Sorry! There are no results that meet this criteria in the past hour.</div>;
  }

  render() {
    const { appData, postFormOpen } = this.state;
    return (
      <div className="group-posting container">
        <GroupPostingsToolbar
          onChange={this.handleFilterChange.bind(this)}
          appData={appData}
          onCreatePost={this.handleCreate.bind(this)}
        />
        <Divider />
        <List>
          {this.renderPosts()}
        </List>
        <PostFormModal
          appData={appData}
          open={postFormOpen}
          handleClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}

module.exports = GroupPostings;
