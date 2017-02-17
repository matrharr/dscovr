var Request = require('superagent');

class NewsApi {

  constructor() {
    this.req = null;
    this.key = '66b5b9c2-d33d-4e84-b5de-5f73c780b6c4';
  }

  call(query, callBack) {
    this.cancel();

    var url = `http://content.guardianapis.com/search?show-elements=all&q=${query}&api-key=${this.key}`;
    this.req = Request.get(url);

    this.req.then((response) => {
      callBack(response.body.response.results);
    });

    this.req.catch((reject) => {
      console.log(reject);
    });

  }

  cancel(){
    if(this.req !== null){
      this.req.abort();
      this.req = null
    }
  }
}


module.exports = NewsApi;