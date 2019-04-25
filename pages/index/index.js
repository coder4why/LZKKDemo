

Page({
  data: {
    currentIndex:0,
    videoList:[],
  },

  onPullDownRefresh: function () {
    console.log('下拉加载更多');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.requestMsgs(false);
  },
  onReachBottom:function(){
    console.log('上拉刷新');
    wx.showNavigationBarLoading();
    this.requestMsgs(true);
  },
  onShareAppMessage: function (msg) {
      console.log(msg);
  },

  shareMsg: function (msg) {
    console.log(msg);
    this.onShareAppMessage(msg);
  },

  f1: function (itemMsg) {
    console.log(itemMsg);
    var index = itemMsg.currentTarget.dataset.index;
    var item = itemMsg.currentTarget.dataset.videoMsgs;
    var img = 'videoList[' + index + '].thumbnail'
    this.setData({
      [img]: '../../images/loadFail.png'
    });
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

  requestMsgs:function(isBottom){
    var that = this;
    wx.request({
      url: 'https://api.apiopen.top/getJoke',
      data: {
        "page": 0,
        "count": "20",
        "type": "video"
      },
      success: function (res) {
        if(res.data.code==200){
         var data = res.data.result;
         if(isBottom){
           data = that.data.videoList.concat(data);
         }else{
           data = data.concat(that.data.videoList);
         }
        that.setData({
          videoList: data
        });
        wx.hideNavigationBarLoading();
        if(isBottom==false){
          wx.stopPullDownRefresh();
        }
        }
      },
      fail: function (err) {
      },
      complete: function (res) {
      },

    });
  },

  onLoad: function () {
    this.requestMsgs(false);
  },
  
})
