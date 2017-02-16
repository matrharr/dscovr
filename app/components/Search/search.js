var React = require('react');
var styles = require('./searchStyles')

class Search extends React.Component {
  
  constructor(){
    super();
  }

  handleChange(e){
    var s = e.target.value;
    this.props.onChange(s)
  }

  render(){

    return <div style={styles.div}>
      <h1>DscovR</h1>
      <h3>watch - read - learn</h3>
      <input style={styles.input} onChange={this.handleChange.bind(this)} type="text"/>
    </div>
  }

}

module.exports = Search;