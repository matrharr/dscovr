var React = require('react');

var Radium = require('radium');


class Search extends React.Component {
  
  constructor(){
    super();
  }

  handleChange(e){
    var s = e.target.value;
    this.props.onChange(s)
  }

  render(){

    return (
      <div style={styles.div}>
        <h1 style={styles.h1}>DscovR</h1>
        <input style={styles.input} placeholder='Search for something!' onChange={this.handleChange.bind(this)} type="text"/>
      </div>
    )
  }
}


var styles = {
  div: {
  backgroundColor: '#5bc0de',
  position: 'fixed',
  top: '0',
  left: '0',
  paddingBottom: '30px',
  marginTop: '0',
  marginLeft: '0',
  zIndex: '999',
  width: '100%',
  height: '50px',
  },
  h3: {
    fontFamily: 'Arial'
  },

  input: {
    '@media (max-width: 1000px)': {
      float: 'right',
      marginRight: '10%',
      marginTop: '30px'
    },
    width: '40%',
    height: '30px',
    fontSize: '18px',
    display: 'inline-block',
    marginLeft: '-275px'
  },

  h1: {
  '@media (max-width: 1000px)': {
      float: 'left',
      marginLeft: '20%',
      marginTop: '30px'
    },
  fontFamily: 'Arial',
  display: 'inline-block',
  width: '40%',
  marginLeft: '425px'
  }
}

module.exports = Radium(Search);