import videoApi from '../../actions/videoapi';
import newsApi from '../../actions/newsApi';
import wikiApi from '../../actions/wikiApi';
import News from '../News/news';
import Wiki from '../Wiki/wiki';
import YouTube from '../Video/video';
import Search from '../Search/search';
const React = require('react');
const _ = require('lodash');

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.videoApi = new videoApi();
    this.newsApi = new newsApi();
    this.wikiApi = new wikiApi();
    this.firstQuery = [
        'Donald Trump', 'Albert Einstein', 'Isaac Newton',
        'Google', 'Krusty the Clown', 'James Joyce', 'Batman',
        'Facebook', 'J. K. Rowling', 'Barack Obama',
    ]
  }

  componentWillMount(){
    var query = this.firstQuery[Math.floor(Math.random() * this.firstQuery.length)];
    this.setState({current_query: query});
    this.search(query);
  }


  updateSearch(input){
    this.setState({current_query: input});
    this.search(input);
  }

  render(){
    const h1Styles = {
        clear: 'both',
        marginTop: '200px',
        fontFamily: 'Arial',
    }
    let current_query_text = 'Currently showing results for: ' + this.state.current_query
    return (<div>
      <Search onChange={this.updateSearch.bind(this)} />
      <h1 style={h1Styles}>{current_query_text}</h1>
      <YouTube video={this.state.video} />
      <News headlines={this.state.headlines} />
      <Wiki entry={this.state.entry} />
    </div>)
  }

  search(query){
    this.newsApi.call(query, (headlines) => this.setState({headlines: headlines}));
    this.wikiApi.call(query, (entry) => this.setState({entry:entry}));
    this.videoApi.call(query, (video) => this.setState({video:video}));
  }


}

export default Dashboard;
