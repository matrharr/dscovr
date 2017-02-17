var Request = require('superagent');
let jsonp = require('superagent-jsonp');
// var hget = require('hget');

class WikiApi {

  constructor() {
    this.entry = null;
  }

  call(query, callBack) {
    var url = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${query}&callback=?`;
    Request.get(url)
      .use(jsonp)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.parseResponse(res)
          console.log('inside wiki call success');
          callBack(res.body.parse.text['*']);
        }
    });
  }

  parseResponse(res){
  //   console.log(res)
  //   hget(res, {
  //     ignore: 'h1'
  //   });
  //   console.log('inside parseResponse')
  // }
  }

}


module.exports = WikiApi;