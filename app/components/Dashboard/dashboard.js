var React = require('react');
var _ = require('lodash');
var News = require('../News/news');
var Wiki = require('../Wiki/wiki');
var YouTube = require('../Video/video');
var Search = require('../Search/search');
var videoApi = require('../../actions/videoApi');
var newsApi = require('../../actions/newsApi');
var wikiApi = require('../../actions/wikiApi');

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.videoApi = new videoApi();
    this.newsApi = new newsApi();
    this.wikiApi = new wikiApi();
  }

  componentWillMount(){
    this.search();
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
  }


}

module.exports = Dashboard;