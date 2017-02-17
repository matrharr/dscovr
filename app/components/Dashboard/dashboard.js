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
    this.videoApi = new videoApi(()=>console.log('done'));
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

    this.newsApi.call(query, (headlines) => this.setState({headlines: headlines}));
    this.wikiApi.call(query, (entry) => this.setState({entry:entry}));
    this.videoApi.call(query, (video) => this.setState({video:video}));
    // this.searchNews(query);
    // this.searchWiki(query);
    // this.searchYouTube(query);
  }

  searchYouTube(query){
    var that = this;
    // how to pass query to video
    var res = this.videoApi.call(query);

    setTimeout(function(){ 
      that.setState({
        video: res.response
      })
      console.log('done')
    }, 2000);

  }


}

module.exports = Dashboard;