// pages/personal/personal.js
import request from "../../utils/request";

let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的实时坐标
let moveDistance = 0; // 手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: {}, // 用户信息
    recentPlayList: [], // 用户的播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户的基本信息
    let userInfo = wx.getStorageSync("userInfo")
    // console.log("userInfo:",userInfo)
    if (userInfo) {
      // 更新userInfo的状态
      this.setData({
        userInfo:JSON.parse(userInfo)
      })

      // 获取用户的播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId);
    }

  },

  // 获取用户播放记录的功能函数(用封装函数的方式避免在生命周期函数里使用async)
  async getUserRecentPlayList(userId) {
    let recentPlayListData = await request('/user/record', {uid: userId, type: 0});
    let index = 0
    let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
      // 给recentPlayList中的对象加个唯一值有利于遍历
      item.id = index++;
      return item;
    });
    this.setData({
      recentPlayList
    });
  },

  handleTouchStart(event) {
    // 点击时干掉回弹时的特效
    this.setData({
      coverTransition: ''
    });
    // 获取手指的起始坐标
    // console.log("handleTouchStart()");
    startY = event.touches[0].clientY;
  },

  handleTouchMove(event) {
    // 获取手指移动的实时坐标
    // console.log("handleTouchMove()");
    moveY = event.touches[0].clientY;

    // 获取手指移动的距离
    moveDistance = moveY - startY;
    // console.log(moveDistance);
    // 实时更新页面
    if (moveDistance <= 0) {
      return;
    }
    if (moveDistance >= 80) {
      moveDistance = 80;
    }
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`
    });
  },

  handleTouchEnd() {
    // 让页面返回原态
    // console.log("handleTouchEnd()");
    this.setData({
      coverTransform:'translateY(0)',
      coverTransition:'transform 1s linear'
    })

  },

  // 跳转至登录页面的回调
  toLogin() {
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
