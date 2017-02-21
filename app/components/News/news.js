var React = require('react');
// var styles = require('./newsStyles');
var Radium = require('radium');


class News extends React.Component {
  
  constructor(){
    super();
  }

  render(){
    var headlines = _.map(this.props.headlines, (h) => {
      return <li style={styles.li} key={h.id}><a style={styles.a} href={h.webUrl}>{h.webTitle}</a></li>;
    });
    return <div className="news" style={styles.div}>
      <h1 style={styles.h1} >From: The Guardian</h1>
      <ul>{headlines}</ul>
    </div>
    
  }

}

var styles = {
  div: {
    '@media (max-width: 1000px)': {
      width: '100%',
    },

    float: 'right',
    width: '49%',
    border: '.5px solid black',
    height: '366px',
  },

  h1: {
    textAlign: 'center'
  },

  li: {
    fontSize: '23px',
    
  },

  a: {
    color: 'black'
  }
}


module.exports = Radium(News);