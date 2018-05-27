class videoApi {

  constructor(){
    gapi.load('client', () =>
      gapi.client.load('youtube', 'v3', () => gapi.client.setApiKey('AIzaSyDcB7YTBZclI4Ylr1qtZchrm5Ce8-EJA1o')
      )
    )
  }


  call(query, callBack){
    function _call(retry, context){

      if(retry <= 0){
        return
      } else {

        if(gapi.client === undefined || gapi.client.youtube === undefined){
          if(retry === 1){
            return
          }
          setTimeout(function(){
             _call(retry-1, context)
          }, 2000)
        } else {

          context.id_request = gapi.client.youtube.search.list({
              part: 'snippet',
              q:query
            });

          context.id_request.execute(function(videoId){
            console.log(videoId)
            context.iframe_request = gapi.client.youtube.videos.list({
              part: 'id, player',
              id: videoId['items'][0]['id']['videoId']})
            context.iframe_request.execute(function(response){
              var iframe_src = context.parseResponse(response)
              callBack(iframe_src)
            })
          })
        }
      }
    }
    _call(3, this)
  }

  // cancel(){

  // }

  parseResponse(response) {
    var res = response['items'][0]['player']['embedHtml'];

    var that = this;

    var regEx = /(src)=["']([^"']*)["']/gi;
    res.replace(regEx, function(a, t, v){
      that.parsed = v
    })

    return that.parsed
  }

  onClientLoad(){
    gapi.client.load('youtube', 'v3', this.onYouTubeApiLoad.bind(this));

  }

  onYouTubeApiLoad(){
    gapi.client.setApiKey('AIzaSyDcB7YTBZclI4Ylr1qtZchrm5Ce8-EJA1o');

    this.collectId();

  }

  collectId(){
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:this.query
      });

    request.execute(this.onCollectIdResponse.bind(this));
  };

  onCollectIdResponse(response){
    this.search(response);
  };


  search(input) {
    var id = input['items'][0]['id']['videoId']
    var request = gapi.client.youtube.videos.list({
        part: 'id, player',
        id: id,
    });

    request.execute(this.onSearchResponse.bind(this));
  }

  onSearchResponse(response) {
    this.showResponse(response);
  }
}

export default videoApi ;








// class VideoAPI {

//   constructor(){
//     this.response = ''
//   }

//   main(query){
//     gapi.load('client',function(){
//       gapi.client.load('youtube', 'v3', function(){
//         gapi.client.setApiKey('AIzaSyDcB7YTBZclI4Ylr1qtZchrm5Ce8-EJA1o');
//       });
//     });

//     setTimeout(function(){
//     var request = gapi.client.youtube.search.list({
//         part: 'snippet',
//         q:query
//       });

//     request.execute(function(input){
//       var id = input['items'][0]['id']['videoId']
//       var request = gapi.client.youtube.videos.list({
//           part: 'id, player',
//           id: id,
//       });

//       request.execute(function(response){
//         var res = response['items'][0]['player']['embedHtml']
//         // var responseString = JSON.stringify(response, '', 2);

//         this.response = res
//       });
//     });
//     }, 3000);
//   }
// }

// module.exports = VideoAPI;
