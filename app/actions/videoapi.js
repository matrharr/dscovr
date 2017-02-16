
class VideoAPI {

  constructor(query){
    this.response = null;
    this.query = query;
  }
  
  main(){
    gapi.load('client', this.onClientLoad.bind(this));
  }

  showResponse(response) {
    var res = response['items'][0]['player']['embedHtml'];
    
    var that = this;

    var regEx = /(src)=["']([^"']*)["']/gi;
    res.replace(regEx, function(a, t, v){
      that.response = v
    })

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

module.exports = VideoAPI;








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


