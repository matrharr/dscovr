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

    return <div>
      <h1 style={styles.h1}>DscovR</h1>
      <div style={styles.div}>
        <h3 style={styles.h3}>Find video, news, facts</h3>
        <input style={styles.input} placeholder='Type Something!' onChange={this.handleChange.bind(this)} type="text"/>
      </div>
    </div>
  }

}

module.exports = Search;