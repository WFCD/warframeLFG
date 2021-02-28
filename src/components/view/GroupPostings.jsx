import {Component} from 'react';
import {List,Divider} from '@material-ui/core';
import Rebase from 're-base';
import _ from 'underscore';

import {PostFormModal} from '../modal';
import {GroupPostingsToolbar} from './';
import {GroupPost} from '../field';

import styles from './GroupPostings.scss';

const base = Rebase.createClass(process.env.FIREBASE_URL);

class GroupPostings extends Component{
  constructor(props) {
    super(props);
    this.state = {
      appData: props.appData,
      postFormOpen: false,
      posts: [],
      filter: {mission: '1', platform: '1', region: '1', advanced: {}}
    };
  }

  componentDidMount(){
    this.ref = base.syncState('postings', {
      context: this,
      state: 'posts',
      asArray: true,
      queries: {
        orderByChild: 'createdOn',
        startAt: (new Date().getTime() - (3600000))
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      appData : nextProps.appData
    });
  }

  handleCreate(){
    this.setState({postFormOpen: true});
  }

  handleClose(){
    this.setState({postFormOpen: false});
  }

  renderPosts() {
    const filter = this.state.filter;
    const posts = this.state.posts;
    let filteredPosts = _.filter(posts, (post) => {
      return (filter.platform === '1' || post.platform === filter.platform) &&
      (filter.region === '1' || post.region === filter.region) &&
      (filter.mission === '1' || post.mission.name === filter.mission.name);
    });

    filteredPosts = this.filterByAdvanced(filteredPosts);

    var postMap = filteredPosts.map((post, index) => {
      return <GroupPost post={post} key={index} appData={this.state.appData}/>
    });
    return postMap.length ? postMap.reverse() : <div className={styles.noResults} style={{marginTop: '3em'}}>Sorry! There are no results that meet this criteria in the past hour.</div>
  }

  filterByAdvanced(posts){
    const filter = this.state.filter.advanced;
    let filteredPosts = posts;
    let keys = Object.keys(filter);
    if (keys.length) {
      filteredPosts = _.filter(filteredPosts, (post) => {
        return _.reduce(keys, (memo, key) => {
          return memo && filter[key] === post.mission[key];
        }, true);
      });
    }
    return filteredPosts;

  }

  handleFilterChange(filter) {
    this.setState({filter});
  }

  render() {
    return (
      <div className='group-posting container'>
        <GroupPostingsToolbar
          onChange={this.handleFilterChange.bind(this)}
          appData={this.state.appData}
          onCreatePost={this.handleCreate.bind(this)}/>
        <Divider/>
        <List>
          {this.renderPosts()}
        </List>
      <PostFormModal
          appData={this.state.appData}
          open={this.state.postFormOpen}
          handleClose={this.handleClose.bind(this)}
      />
      </div>
    );
  }
}

module.exports = GroupPostings;
