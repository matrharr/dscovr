var React = require('react');
var Radium = require('radium');



class YouTube extends React.Component {
  
  constructor(){
    super();
  }

  render(){

    return <div style={styles.div}>
      <iframe width="640" height="360" src={ this.props.video} allowFullScreen></iframe>
    </div>
  }

}

var styles = {
  div: {
    '@media (max-width: 1000px)': {
      width: '100%'
    },
    textAlign: 'center',
    float: 'left',
    width: '49%',
    paddingTop: '200px',
    paddingBottom: '100px'
    // border: '.5px solid black'
  }
}





module.exports = Radium(YouTube);