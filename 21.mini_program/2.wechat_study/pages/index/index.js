// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'初始化测试数据',
    userInfo:{},// 用户的基本信息
  },

  handleParent(){
    console.log("parent")
  },

  handleChild(){
    console.log('child')
  },

  // 跳转到logs的方法
  toLogs(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })

    // wx.redirectTo({
    //   url: '/pages/logs/logs',
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad() 监听页面加载")


    // 修改msg的状态数据
    // console.log(this)  // this代表当前页面的实例对象
    // console.log(this.data.msg)
    // this.setData({
    //   msg:'修改后的数据'
    // })
    // console.log(this.data.msg)

    // 测试是否异步
    // setTimeout(()=>{
    //   this.setData({
    //     msg:'修改后的数据'
    //   })
    //   console.log(this.data.msg)
    // },2000)

    // 授权以后，获取用户信息
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  // 获取用户信息的回调
  handleGetUserInfo(res){
    console.log(res)
    if (res.detail.userInfo) {// 允许
      // 修改userInfo的状态数据
      this.setData({
        userInfo: res.detail.userInfo
      })
    } else {
      
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady() 监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow() 监听页面显示,可以执行多次")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide() 监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload() 监听页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})