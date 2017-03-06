var React = require('react');
var Radium = require('radium');
var Slider = require('react-slick');


class News extends React.Component {
  
  constructor(){
    super();
  }

  render(){
    var headlines;
    if(this.props.headlines === undefined){
      headlines = <div>No data</div>
    } else {

      headlines = _.map(this.props.headlines, (h) => {
        return <div style={styles.card} key={h.id}><li style={styles.li}><a style={styles.a} href={h.webUrl}>{h.webTitle}</a></li></div>;
      });
    }

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      vertical: true,
      arrows: false,
      responsive: [{
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          // vertical: false,
          slidesToScroll: 1
        }
      }]
    };

    return (
    <div style={styles.div}>
      <Slider className='override' {...settings}>
        {headlines}
      </Slider>
    </div>
    );
    
  }

}

var styles = {
  div: {
    '@media (max-width: 1000px)': {
      width: '100%',
      paddingTop: '3%',
      paddingBottom: '0px'
    },
    paddingTop: '200px',
    paddingBottom: '100px',
    height: '50px',
    float: 'right',
    width: '49%',
    height: '366px',
  },

  li: {
    fontSize: '18px',
    textAlign: 'center',
    height: '60px',
    paddingTop: '5%',
    border: '8px solid #428bca'
  },

  a: {
    color: 'black',
    textDecoration: 'none'
  },

  card: {
    backgroundColor: 'white',
    // padding: '2px'
  },


}

module.exports = Radium(News);