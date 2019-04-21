

Page({
  data: {
    currentIndex:0,
    videoList:[],
  },

  f0:function(event){

    var video = event.currentTarget.dataset.videoMsgs.video;
    var headerName = event.currentTarget.dataset.videoMsgs.top_comments_name;
    var headerImage = event.currentTarget.dataset.videoMsgs.header;
    var headerContent = event.currentTarget.dataset.videoMsgs.top_comments_content;
    wx.navigateTo({
      url: '../videoDetail/videoDetail?' + 'video=' + video + '&headerName=' + headerName + '&headerImage=' + headerImage +'&headerContent='+headerContent,
    })  

  },

  onLoad: function () {
    
    var that = this;
    wx.request({
      url: 'https://api.apiopen.top/getJoke',
      data: {
        "page":0,
        "count":"20",
        "type":"video"
      },
      success: function (res){
         
          // if(res.data.code==200){
            that.setData({
              videoList: res.data.result
            });
            // console.log(that.voideList);
          // }
      },
      fail: function (err){
      },
      complete: function (res){
      },

    });
  },
  
})
