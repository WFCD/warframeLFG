import {Component} from 'react';
import {SelectField, MenuItem} from '@material-ui/core';

class WarframesSelect extends Component{
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
    super(props);
    this.state = {
        warframes: props.warframes,
        value: '1',
        label: props.label
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        warframes: nextProps.warframes
    });
  }

  handleChange (event, index, value) {
    this.setState({value});
    //this.state.selectHandler(value);
  }

  renderMenuItems(){
    return Object.keys(this.state.warframes).map((warframe) => {
      return <MenuItem key={warframe} value={warframe} primaryText={warframe} />
    });
  }

  render() {
    return (
      <SelectField
        autoWidth={true}
        style={{ fontSize: '1em', width: '90%', overflow: 'hidden', display: 'inline-block'}}
        value={this.state.value}
        maxHeight={250}
        onChange={this.handleChange.bind(this)}
        floatingLabelText={this.state.label}
        floatingLabelStyle={{fontSize: '1.2em', overflow: 'hidden', display: 'inline-block'}}
      >
      <MenuItem value='1' primaryText='Any' />
        {this.renderMenuItems()}
      </SelectField>
    );
  }
}

module.exports = WarframesSelect;
