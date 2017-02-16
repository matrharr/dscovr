var React = require('react');
var styles = require('./newsStyles');

class News extends React.Component {
  
  constructor(){
    super();
  }

  render(){
    var headlines = _.map(this.props.headlines, (h) => {
      return <li style={styles.li} key={h.id}><a style={styles.a} href={h.webUrl}>{h.webTitle}</a></li>;
    });
    return <div style={styles.div}>
      <h1 style={styles.h1} >From: The Guardian</h1>
      <ul>{headlines}</ul>
    </div>
  }

}


module.exports = News;