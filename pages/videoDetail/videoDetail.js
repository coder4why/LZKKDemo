

Page({
  data: {
    video:'',
    headerName:'',
    headerImage:'',
    headerContent:'',

  },

  onLoad: function (options) {
    
    console.log(options);
    this.setData({ 
      video:options.video,
      headerName: options.headerName,
      headerImage: options.headerImage,
      headerContent: options.headerContent,
      });

    wx.setNavigationBarTitle({
      title: options.headerName,
    })
    console.log(this.item);

  }
  
  })