var React = require('react');
var Request = require('superagent');
let jsonp = require('superagent-jsonp')
var _ = require('lodash');
var News = require('../News/news');
var Wiki = require('../Wiki/wiki');
var YouTube = require('../Youtube/youtube');
var API = require('../../actions/videoapi')
var Search = require('../Search/search')

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.search()
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps){

  }

  componentWillUpdate(nextProps, nextState){

  }

  componentDidUpdate(){

  }

  componentWillUnmount(){

  }

  updateSearch(input){
    this.search(input);
  }

  render(){
    return <div>
      <Search onChange={this.updateSearch.bind(this)} />
      <YouTube video={this.state.video} />
      <News headlines={this.state.headlines} />
      <Wiki entry={this.state.entry} />
    </div>
  }

  search(query='Donald Trump'){
    this.searchNews(query);
    this.searchWiki(query);
    this.searchYouTube(query);
  }

  searchWiki(query){
    var url = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${query}&callback=?`;
    Request.get(url)
      .use(jsonp)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          
          this.setState({ entry: res.body.parse.text['*'] });
        }
    });
  }

  searchNews(query){
    var key = '66b5b9c2-d33d-4e84-b5de-5f73c780b6c4'
    var url = `http://content.guardianapis.com/search?show-elements=all&q=${query}&api-key=${key}`;
    Request.get(url).then((response) => {
      this.setState({
        headlines: response.body.response.results
      });
    });
  }

  searchYouTube(query){
    var that = this;
    var api = new API(query);
    var res = api.main();

    setTimeout(function(){ 
      that.setState({
        video: api.response
      })
      console.log('done')
    }, 2000);

  }


}

module.exports = Dashboard;