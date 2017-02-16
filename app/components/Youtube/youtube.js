var React = require('react');
var styles = require('./youtubeStyles');

class YouTube extends React.Component {
  
  constructor(){
    super();
  }

  render(){

    return <div style={styles}>
      
      <iframe width="640" height="360" src={ this.props.video} allowFullScreen></iframe>
    </div>
  }

}






module.exports = YouTube;