var Request = require('superagent');
let jsonp = require('superagent-jsonp')

class WikiApi {

  constructor(query) {
    this.query = query
    this.entry = null;
  }

  call() {
    var url = `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${this.query}&callback=?`;
    Request.get(url)
      .use(jsonp)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('inside wiki call success')

          this.entry = res.body.parse.text['*']
        }
    });
    
    // this.req.then((response) => {
    //   this.entry = response.body.parse.text['*']
    //   console.log(this.headlines)
    // });

    // this.req.catch((reject) => {
    //   console.log(reject);
    // });
  }

  parseResponse(res){
    var that = this
    var regEx = /(<p)>["']([^"']*)["']/gi;
    res.replace(regEx, function(a, t, v){
      that.entry = v
    })
  }

  getResponse(){ 
    return this.req
  }
}


module.exports = WikiApi;