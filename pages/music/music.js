
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    musics: [],
    playIndex:0,
    isPlaying:false,
  },

  reuqestMusic:function(key){
    var that = this;
    wx.request({
      url: 'https://api.apiopen.top/searchMusic?name='+key,
      success: function (res) {

        console.log(res);
        that.setData({
          musics: res.data.result
        });
      },
      fail: function (error) { },
      complete: function () { },
    })
  },

  onLoad: function () {
    this.reuqestMusic('林俊杰');
    innerAudioContext.onStop((res) => {
      console.log('播放结束'+res);
          this.setData({
            isPlaying:false,
          });
    });
  },

  onHide() {
    innerAudioContext.pause();
    this.setData({
      isPlaying: false,
    });
  },
  onUnload() {
    innerAudioContext.pause();
    this.setData({
      isPlaying: false,
    });
  },
  onShow(){
    innerAudioContext.play();
    this.setData({
      isPlaying: isPlaying,
    });
  },
 
  //播放音乐
  f0:function(event){

    console.log(event);
    var url = event.currentTarget.dataset.url;
    var index = event.currentTarget.dataset.index;
    this.setData({
      playIndex:index,
      isPlaying:true,
    });
    innerAudioContext.src = url;
    innerAudioContext.play();

  },

  f1:function(key){
    console.log(key.detail.value);
    this.reuqestMusic(key.detail.value);
  }

  

})
