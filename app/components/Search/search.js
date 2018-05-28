var React = require('react');

var Radium = require('radium').default;


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
                <h1 style={styles.h1}><img style={{width:"300px"}}src="app/img/logo_teal.png"></img></h1>
                <div>
                    <h3 style={styles.h3}>Find relevant videos, news and wiki!</h3>
                    <input style={styles.input} placeholder='Search something...' onChange={this.handleChange.bind(this)} type="text"/>
                </div>
            </div>
        )
    }
}


var styles = {
  div: {
      backgroundColor: '#5EBACF',
      position: 'fixed',
      top: '0',
      left: '0',
      paddingBottom: '30px',
      marginTop: '0',
      marginLeft: '0',
      zIndex: '999',
      width: '100%',
      height: '150px',
      textAlign: 'center',
  },
  h3: {
      '@media (max-width: 1000px)': {
          float: 'left',
          marginTop: '30px'
      },
      fontFamily: 'Arial',
      display: 'inline-block',
      width: '40%',
  },
  input: {
    '@media (max-width: 1000px)': {
      float: 'right',
      marginRight: '10%',
      marginTop: '30px'
    },
    width: '30%',
    height: '30px',
    fontSize: '18px',
    display: 'inline-block',
  },

  h1: {
      '@media (max-width: 1000px)': {
          textAlign: 'center',
      },
          fontFamily: 'Arial',
          // width: '40%',
          margin: 'auto',
      }
}

export default Radium(Search);
