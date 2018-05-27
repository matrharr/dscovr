var Request = require('superagent');
let jsonp = require('superagent-jsonp');
var htmlParser = require('html-parser')

class WikiApi {

  constructor() {

  }

  call(query, callBack) {
    var url = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${query}&callback=?`;
    Request.get(url)
      .use(jsonp)
      .end((err, res) => {
        if (err) {
          console.log(err);
          callBack(`<p>Sorry! Wikipedia doesn't have a page on that. Try searching for something else. </p>`)
        } else {
          console.log(res);
          var out = this.parseResponse(res)
          callBack(out);
        }
    });
  }

  parseResponse(res){
    var body = res.body.parse.text['*'];
    var title = res.body.parse.title;
    console.log(body.length)
    var parsedRes;
    if (body.length < 1000){
      // redirect
      var new_query = htmlParser.parse(body, {
        attribute: function(name, value) {
          if(name === 'title'){
            parsedRes = `<p>Sorry! Wikipedia doesn't have a page on that. Try searching for <b>${value}</b> instead. </p>`
            // how to make a request with this.call() from here
          }
        }
      })

    } else if (body.length > 1000 && body.length < 5000) {
      // referral
      console.log(body)
      parsedRes = htmlParser.sanitize(body, {
        attributes: ['style'],
      });
    } else {
      // post
     parsedRes = htmlParser.sanitize(body, {
      elements: ['span', 'br', 'b', 'td', 'tr', 'th', 'table', 'div', 'ul', 'ol', 'hr', 'li', 'img'],
      attributes: ['style'],
      comments: true
    });

    }

    parsedRes = `<h1>${title}</h1>` + parsedRes;

    return parsedRes;
  }

}


export default WikiApi;
