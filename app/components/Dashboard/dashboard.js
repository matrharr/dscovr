var React = require('react');
var Request = require('superagent');
let jsonp = require('superagent-jsonp')
var _ = require('lodash');
var News = require('../News/news');
var Wiki = require('../Wiki/wiki');
var YouTube = require('../Youtube/youtube');
var Search = require('../Search/search');
var videoApi = require('../../actions/videoApi');
var newsApi = require('../../actions/newsApi');
var wikiApi = require('../../actions/wikiApi')

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.videoApi = new videoApi();
    this.newsApi = new newsApi();
    this.wikiApi = new wikiApi();
  }

  componentWillMount(){
    this.search()
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
    this.newsApi.cancel();
    this.newsApi.call(query, (headlines) => this.setState({headlines: headlines}));

    // this.searchNews(query);
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

  // searchNews(query){
  //   var key = '66b5b9c2d33d4e84b5de5f73c780b6c4'
  //   var url = `http://content.guardianapis.com/search?showelements=all&q=${query}&apikey=${key}`;
  //   Request.get(url).then((response) => {
  //     this.setState({
  //       headlines: response.body.response.results
  //     });
  //   });
  // }

  searchYouTube(query){
    var that = this;
    // how to pass query to video
    var res = this.videoApi.main(query);

    setTimeout(function(){ 
      that.setState({
        video: res.response
      })
      console.log('done')
    }, 2000);

  }


}

module.exports = Dashboard;