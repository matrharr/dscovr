var React = require('react');
import ReactHtmlParser from 'react-html-parser';
var styles = require('./wikiStyles')

class Wiki extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
            <div style={styles}>
                <div>
                    {ReactHtmlParser(this.props.entry)}
                </div>
            </div>
        )
    }

}

export default Wiki;
