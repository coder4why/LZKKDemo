
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    musics: [],
    playIndex:0,
    isPlaying:false,
  },

  reuqestMusic:function(key){
    if(key.length==0){
      return;
    }
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://api.apiopen.top/searchMusic?name='+key,
      success: function (res) {
        console.log(res);
        that.setData({
          musics: res.data.result
        });
        wx.hideNavigationBarLoading();
      },
      fail: function (error) {
       },
      complete: function () { 
        wx.hideNavigationBarLoading();
      },
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

    // innerAudioContext.pause();
    // this.setData({
    //   isPlaying: false,
    // });
  },
  onUnload() {
    // innerAudioContext.pause();
    // this.setData({
    //   isPlaying: false,
    // });
  },
  onShow(){
    wx.hideNavigationBarLoading();
    if (innerAudioContext){
      innerAudioContext.play();
    }
    
    // this.setData({
    //   isPlaying: isPlaying,
    // });
  },
  
  //播放音乐
  f0:function(event){

    wx.showNavigationBarLoading();
    console.log(event);
    var url = event.currentTarget.dataset.url;
    var index = event.currentTarget.dataset.index;
    this.setData({
      playIndex:index,
      isPlaying:true,
    });
    innerAudioContext.src = url;
    innerAudioContext.play();
    //开始正常播放音频文件：
    innerAudioContext.onPlay(()=>{
      wx.hideNavigationBarLoading();
    });
    innerAudioContext.onError((error)=>{
      this.setData({
        isPlaying: false,
      });
      var errCode = error.errorCode;
      var errorMsg = '';
      if (errCode == 10001){
        errorMsg = '系统错误';
      } else if (errCode == 10002){
        errorMsg = '网络错误';
      }
      else if (errCode == 10003){
        errorMsg = '文件错误';
      } else if (errCode == 10004){
        errorMsg = '格式错误';
      }else{
        errorMsg = '未知错误';
      }
      wx.showToast({
        title: errorMsg,
      })
    });

  },

  f1:function(key){
    console.log(key.detail.value);
    this.reuqestMusic(key.detail.value);
  }

  

})
