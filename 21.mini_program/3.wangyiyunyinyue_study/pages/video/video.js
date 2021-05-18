// pages/video/video.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航标签数据
    navId: '', // 导航的标识
    videoList: [], // 视频列表
    videoUpdateTime: [], // 记录video播放的时长
    isTriggered: false, // 标识下拉刷新是否被触发

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cookies = wx.getStorageSync('cookies')
    // console.log('cookies:',wx.getStorageSync('cookies'))
    if(!this.cookies){
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
    // 获得导航数据
    this.getVideoGroupListData();

  },

  // 获取导航数据
  async getVideoGroupListData() {
    let videoGroupListData = await request("/video/group/list");
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId:videoGroupListData.data[0].id
    });
    // 获得视频数据(这里调用而不在onload里，因为要让navId有值)

    this.getVideoList(this.data.navId);
  },

  // 获取视频列表数据
  async getVideoList(navId){
    if(!navId){ // 判断navId为空串的情况
      return;
    }
    let videoListData = await request('/video/group', {id: navId});
    // 关闭消息提示框
    wx.hideLoading();


    let index = 0;
    let videoList = videoListData.datas && videoListData.datas.map(item => {
      item.id = index++;
      return item;
    });
    this.setData({
      videoList,
      isTriggered: false // 关闭下拉刷新
    })
  },

  // 点击切换导航的回调
  changeNav(event) {
    // let navId = event.currentTarget.id; // 通过id向event传参的时候如果传的是number会自动转换成string
    let navId = event.currentTarget.dataset.id; // 通过data-key向event传参的时候如果传的是number【不会】会自动转换成string
    console.log(typeof navId);
    this.setData({
      // 将navId转为number有利于比较
      // navId: navId * 1

      navId, //data-key 传参不用转换
      videoList: [] // 切换导航先清空videoList
    });
    // console.log(typeof this.data.navId);

    // 显示正在加载
    wx.showLoading({
      title:"正则加载",
      mask: true
    })

    // 动态获取当前导航对应的视频列表数据
    this.getVideoList(this.data.navId);

  },

  // 点击播放/继续播放的回调
  handlePlay(event) {
    /*
      问题： 多个视频同时播放的问题
    * 需求：
    *   1. 在点击播放的事件中需要找到上一个播放的视频
    *   2. 在播放新的视频之前关闭上一个正在播放的视频
    * 关键：
    *   1. 如何找到上一个视频的实例对象
    *   2. 如何确认点击播放的视频和正在播放的视频不是同一个视频
    * 单例模式：
    *   1. 需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象，
    *   2. 节省内存空间
    * */


    // 当前视频vid
    let vid = event.currentTarget.id;
    // 关闭上一个播放的视频（不同视频）
    // this.vid !== vid && this.videoContext && this.videoContext.stop();
    // 更新为当前的vid
    // this.vid = vid;
    this.setData({
      videoId: vid
    })

    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);

    // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if (videoItem) {
      this.videoContext.seek(videoItem.currentTime);
    }
    this.videoContext.play();



  },

  // 监听视频播放进度的回调
  handleTimeUpdate(event) {
    // console.log(event.currentTarget.id);
    // console.log(event.detail.currentTime);

    let videoTimeObj = {vid:event.currentTarget.id, currentTime: event.detail.currentTime}

    let {videoUpdateTime} = this.data;
    /*
    * 思路： 判断记录播放时长的videoUpdateTime数组中是否有当前视频的播放记录
    *   1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
    *   2. 如果没有，需要在数组中添加当前视频的播放对象
    * */
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);

    if (videoItem) { // 之前有
      videoItem.currentTime = videoTimeObj.currentTime;
    }else { // 之前没有
      videoUpdateTime.push(videoTimeObj);
    }

    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime
    })


  },

  // 视频播放结束时调用
  handleEnded(event){
    // 移除记录播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1);
    this.setData({
      videoUpdateTime
    })
  },

  // 自定义下拉刷新的回调
  handleRefresher() {
    console.log("scroll-view 下拉刷新");
    this.getVideoList(this.data.navId);
  },

  // 自定义上拉触底的回调
  handleToLower() {
    // console.log("scroll-view 上拉触底回调");
    // 数据分页： 1. 后端分页， 2. 前端分页
    console.log('发送请求 || 在前端截取最新的数据 追加到视频列表的后方');
    console.log('网易云音乐暂时没有提供分页的api');
    // 模拟数据
    let newVideoList = [
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_7CCE862AF217DAAF24E801080832EF1B",
          "coverUrl": "https://p2.music.126.net/MA9SSqVNLjlWd_55TZFqww==/109951163574131933.jpg",
          "height": 720,
          "width": 1280,
          "title": "太震撼！这才是史诗级的现场，一开口就燃炸了！",
          "description": "《I Want My Tears Back》太震撼！这才是史诗级的现场，一开口就燃炸了，鸡皮疙瘩掉一地！",
          "commentCount": 8572,
          "shareCount": 26177,
          "resolutions": [
            {
              "resolution": 240,
              "size": 61182468
            },
            {
              "resolution": 480,
              "size": 100805765
            },
            {
              "resolution": 720,
              "size": 134693475
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/VPGeeVnQ0jLp4hK9kj0EPg==/18897306347016806.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 1002400,
            "birthday": -2209017600000,
            "userId": 449979212,
            "userType": 0,
            "nickname": "全球潮音乐",
            "signature": "有时候音乐是陪我熬过那些夜晚的唯一朋友。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18897306347016810,
            "backgroundImgId": 18987466300481468,
            "backgroundUrl": "http://p1.music.126.net/qx6U5-1LCeMT9t7RLV7r1A==/18987466300481468.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "华语音乐|欧美音乐资讯达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "18897306347016806",
            "backgroundImgIdStr": "18987466300481468",
            "avatarImgId_str": "18897306347016806"
          },
          "urlInfo": {
            "id": "7CCE862AF217DAAF24E801080832EF1B",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/9iLeVQCX_1863884725_shd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=iUhIIwpSLJjNRwkrWuhdSPIlIkKCLTxD&sign=65a3592e4976c6cb16ff484c8e46ffc7&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15DA7VJMBK%2BhKDNEyxW8wyGa",
            "size": 134693475,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": -8003,
              "name": "#点赞榜#",
              "alg": "groupTagRank"
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": "groupTagRank"
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "I Want My Tears Back",
              "id": 21311956,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 97516,
                  "name": "Nightwish",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 31,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 1968473,
                "name": "Imaginaerum",
                "picUrl": "http://p3.music.126.net/wYtAg4B0m2vN_6grbmXPGA==/109951164788987105.jpg",
                "tns": [],
                "pic_str": "109951164788987105",
                "pic": 109951164788987100
              },
              "dt": 307533,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 12303717,
                "vd": -30900
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 7382248,
                "vd": -28500
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4921513,
                "vd": -27300
              },
              "a": null,
              "cd": "01",
              "no": 5,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "mst": 9,
              "cp": 1416618,
              "mv": 0,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1334275200000,
              "privilege": {
                "id": 21311956,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "7CCE862AF217DAAF24E801080832EF1B",
          "durationms": 319600,
          "playTime": 12385615,
          "praisedCount": 84726,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_7CF362DE3F8492D8C6C4D881FDEA373C",
          "coverUrl": "https://p2.music.126.net/OiGdueL0_IVduE3-GSY9kA==/109951165094029548.jpg",
          "height": 1080,
          "width": 1920,
          "title": "当网红受邀参加歌唱比赛，舞台表现丝毫不逊色专业歌手！",
          "description": "赵方倩《芒种》\n冯提莫《世间美好与你环环相扣》\n戴羽彤《那个女孩对我说》\n韩甜甜《飞云之下》\n当网红受邀参加歌唱比赛！",
          "commentCount": 13,
          "shareCount": 14,
          "resolutions": [
            {
              "resolution": 240,
              "size": 28788811
            },
            {
              "resolution": 480,
              "size": 49497228
            },
            {
              "resolution": 720,
              "size": 73774767
            },
            {
              "resolution": 1080,
              "size": 144664395
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 510000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/88cl9b_PeNMUzmGCzRaEZw==/18758767883204803.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 510500,
            "birthday": -2209017600000,
            "userId": 394604291,
            "userType": 204,
            "nickname": "so-旧梦",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18758767883204804,
            "backgroundImgId": 2002210674180202,
            "backgroundUrl": "http://p1.music.126.net/pmHS4fcQtcNEGewNb5HRhg==/2002210674180202.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "超燃联盟视频达人"
            },
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "18758767883204803",
            "backgroundImgIdStr": "2002210674180202",
            "avatarImgId_str": "18758767883204803"
          },
          "urlInfo": {
            "id": "7CF362DE3F8492D8C6C4D881FDEA373C",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/mTgyKYOW_3039006881_uhd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=goZfuvyFOZHSMekjtNXRWUSXxvzjReXe&sign=9fc3ec2f0f3a4561f8325fc4ec57e7ab&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15DA7VJMBK%2BhKDNEyxW8wyGa",
            "size": 144664395,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 12111,
              "name": "冯提莫",
              "alg": "groupTagRank"
            },
            {
              "id": 3101,
              "name": "综艺",
              "alg": "groupTagRank"
            },
            {
              "id": 4101,
              "name": "娱乐",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "芒种",
              "id": 1369798757,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 12174521,
                  "name": "音阙诗听",
                  "tns": [],
                  "alias": []
                },
                {
                  "id": 12023202,
                  "name": "赵方婧",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 88,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 87547851,
                "name": "二十四节气",
                "picUrl": "http://p4.music.126.net/KFWbxh1ZLyy9WR77Ca08tA==/109951164866828786.jpg",
                "tns": [],
                "pic_str": "109951164866828786",
                "pic": 109951164866828780
              },
              "dt": 216000,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 8642395,
                "vd": -41821
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 5185454,
                "vd": -39210
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3456984,
                "vd": -37485
              },
              "a": null,
              "cd": "01",
              "no": 9,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "mst": 9,
              "cp": 1416678,
              "mv": 10908001,
              "rtype": 0,
              "rurl": null,
              "publishTime": 0,
              "privilege": {
                "id": 1369798757,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 258,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "7CF362DE3F8492D8C6C4D881FDEA373C",
          "durationms": 249024,
          "playTime": 72904,
          "praisedCount": 301,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_EF710121B29D5522F2B2BF57B57AD45C",
          "coverUrl": "https://p2.music.126.net/cMqX9QafuCjDfrlInThsDQ==/109951163574193251.jpg",
          "height": 1080,
          "width": 1920,
          "title": "180818 洪真英 (Hong Jinyoung) ring ring 饭拍",
          "description": "180818  (Hong Jinyoung) ring ring 饭拍 喜欢看她饭拍 ",
          "commentCount": 344,
          "shareCount": 546,
          "resolutions": [
            {
              "resolution": 240,
              "size": 55093746
            },
            {
              "resolution": 480,
              "size": 105618204
            },
            {
              "resolution": 720,
              "size": 167687081
            },
            {
              "resolution": 1080,
              "size": 263666314
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 510000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/-lLsUmqQYFVvpXwrN5ze6A==/109951164441786188.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 510100,
            "birthday": 762882072212,
            "userId": 34464619,
            "userType": 204,
            "nickname": "大囚崽儿",
            "signature": "我爱莱斯特城也爱蔡徐坤",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164441786190,
            "backgroundImgId": 109951164154567540,
            "backgroundUrl": "http://p1.music.126.net/xLCOcp05v4CiyMA-j3HdRg==/109951164154567533.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": [
              "电子"
            ],
            "experts": {
              "1": "音乐视频达人",
              "2": "华语音乐资讯达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951164441786188",
            "backgroundImgIdStr": "109951164154567533",
            "avatarImgId_str": "109951164441786188"
          },
          "urlInfo": {
            "id": "EF710121B29D5522F2B2BF57B57AD45C",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/xpvFEdKp_1894404157_uhd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=vmfOpNpVGOdQXbhFBSPyuoeKgSdsFnSX&sign=2b9148c33dd3feaa61cc500385e27732&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15D09csHNAHyq0u8VG9nDsT4",
            "size": 263666314,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": "groupTagRank"
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "EF710121B29D5522F2B2BF57B57AD45C",
          "durationms": 204034,
          "playTime": 1177035,
          "praisedCount": 2584,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_F530E3D473EAFAB4D188E8FCE6AB875C",
          "coverUrl": "https://p2.music.126.net/QaW5ehceia5T-H29ByKOWg==/109951163057510082.jpg",
          "height": 720,
          "width": 1280,
          "title": "beyond这首歌最经典的现场，家驹唱的太投入，听到全身发麻！",
          "description": "beyond这首歌最经典的现场，家驹唱的太投入，听到全身发麻！",
          "commentCount": 340,
          "shareCount": 467,
          "resolutions": [
            {
              "resolution": 240,
              "size": 12511092
            },
            {
              "resolution": 480,
              "size": 17855180
            },
            {
              "resolution": 720,
              "size": 28524539
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 430000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/s7UbKTvdHKzfQCRCoqbGEw==/18781857627506469.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 430100,
            "birthday": -2209017600000,
            "userId": 440542582,
            "userType": 0,
            "nickname": "虐心音乐厅",
            "signature": "音乐视频自媒体",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18781857627506468,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "18781857627506469",
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgId_str": "18781857627506469"
          },
          "urlInfo": {
            "id": "F530E3D473EAFAB4D188E8FCE6AB875C",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/PXrixaSx_37976371_shd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=CZyEexTbiHLDiRMrtMHcmtIlgJfjkPRV&sign=1b1f3e3de3d67d900105246af2e9cd3b&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15DA7VJMBK%2BhKDNEyxW8wyGa",
            "size": 28524539,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": -27782,
              "name": "#『一百首』经典华语怀旧老歌#",
              "alg": "groupTagRank"
            },
            {
              "id": 12100,
              "name": "流行",
              "alg": "groupTagRank"
            },
            {
              "id": 16237,
              "name": "粤语",
              "alg": "groupTagRank"
            },
            {
              "id": 16201,
              "name": "温暖",
              "alg": "groupTagRank"
            },
            {
              "id": 14137,
              "name": "感动",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "光辉岁月",
              "id": 346576,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 11127,
                  "name": "Beyond",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "600902000005267437",
              "fee": 8,
              "v": 37,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 34147,
                "name": "光辉岁月十五年",
                "picUrl": "http://p4.music.126.net/JOJvZc_7SqQjKf8TktQ_bw==/29686813951246.jpg",
                "tns": [],
                "pic": 29686813951246
              },
              "dt": 300000,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 12002787,
                "vd": 32625
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 7201689,
                "vd": 35236
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4801141,
                "vd": 36986
              },
              "a": null,
              "cd": "1",
              "no": 6,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "mst": 9,
              "cp": 7003,
              "mv": 28005,
              "rtype": 0,
              "rurl": null,
              "publishTime": 930758400000,
              "privilege": {
                "id": 346576,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            },
            {
              "name": "海阔天空",
              "id": 400162138,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 11127,
                  "name": "Beyond",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": null,
              "fee": 1,
              "v": 15,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 34430029,
                "name": "华纳23周年纪念精选系列",
                "picUrl": "http://p4.music.126.net/a9oLdcFPhqQyuouJzG2mAQ==/3273246124149810.jpg",
                "tns": [],
                "pic": 3273246124149810
              },
              "dt": 323693,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 12950508,
                "vd": -11100
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 7770322,
                "vd": -8500
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 5180229,
                "vd": -7100
              },
              "a": null,
              "cd": "1",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "mst": 9,
              "cp": 7002,
              "mv": 376199,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1452847401169,
              "privilege": {
                "id": 400162138,
                "fee": 1,
                "payed": 0,
                "st": 0,
                "pl": 0,
                "dl": 0,
                "sp": 0,
                "cp": 0,
                "subp": 0,
                "cs": false,
                "maxbr": 999000,
                "fl": 0,
                "toast": false,
                "flag": 1028,
                "preSell": false
              }
            },
            {
              "name": "Amani",
              "id": 346083,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 11127,
                  "name": "Beyond",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "600902000001128494",
              "fee": 8,
              "v": 109,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 34110,
                "name": "Beyond 25th Anniversary",
                "picUrl": "http://p3.music.126.net/XU-Z6hBKDNP5U91DxTTT8g==/109951165566448052.jpg",
                "tns": [],
                "pic_str": "109951165566448052",
                "pic": 109951165566448050
              },
              "dt": 288000,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 11535716,
                "vd": -25000
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6921447,
                "vd": -22500
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4614312,
                "vd": -20900
              },
              "a": null,
              "cd": "03",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "mst": 9,
              "cp": 7003,
              "mv": 5336900,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1205164800000,
              "privilege": {
                "id": 346083,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "F530E3D473EAFAB4D188E8FCE6AB875C",
          "durationms": 105000,
          "playTime": 778095,
          "praisedCount": 3560,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_9D1CE10671473FD49394A24C2232E135",
          "coverUrl": "https://p2.music.126.net/BOzqQowbpTMPkfx26hdiFw==/109951164625486113.jpg",
          "height": 1080,
          "width": 1920,
          "title": "萨顶顶又出神作，难度不输《左手指月》，网友：不愧是国家队!",
          "description": "萨顶顶又出神作，难度不输《左手指月》，网友：不愧是国家队!",
          "commentCount": 28,
          "shareCount": 10,
          "resolutions": [
            {
              "resolution": 240,
              "size": 15944396
            },
            {
              "resolution": 480,
              "size": 26974690
            },
            {
              "resolution": 720,
              "size": 39800311
            },
            {
              "resolution": 1080,
              "size": 67889120
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 430000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/Oxqbs1sQKIOHXhrCDLZlmQ==/109951165303461717.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 430100,
            "birthday": -2209017600000,
            "userId": 2086564934,
            "userType": 204,
            "nickname": "陈同学聊音乐",
            "signature": "一首音乐，一个故事，这里是陈同学撩音乐",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165303461710,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951165303461717",
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgId_str": "109951165303461717"
          },
          "urlInfo": {
            "id": "9D1CE10671473FD49394A24C2232E135",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/Uicq5l9r_2877193006_uhd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=eIrAfOKQdeXvMfGlSvnHHsTKtLWEIacl&sign=942defbe4e415b68f265a8064696e0de&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15DA7VJMBK%2BhKDNEyxW8wyGa",
            "size": 67889120,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 25137,
              "name": "音乐资讯",
              "alg": "groupTagRank"
            },
            {
              "id": 23116,
              "name": "音乐推荐",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "9D1CE10671473FD49394A24C2232E135",
          "durationms": 169408,
          "playTime": 200236,
          "praisedCount": 531,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_70CC972D74F7F5C9F4CCF2258E8D7310",
          "coverUrl": "https://p2.music.126.net/XVnaXTTzPyullowoxltOUQ==/109951164762048419.jpg",
          "height": 1080,
          "width": 1920,
          "title": "吴亦凡听了都跳舞的《飘向北方》，你听过几个版本？",
          "description": "素材来源于网络，如有侵权必删。\n喜欢唱跳rap音乐，欢迎关注",
          "commentCount": 57,
          "shareCount": 70,
          "resolutions": [
            {
              "resolution": 240,
              "size": 28618702
            },
            {
              "resolution": 480,
              "size": 46048892
            },
            {
              "resolution": 720,
              "size": 66476615
            },
            {
              "resolution": 1080,
              "size": 109822226
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 320000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/3EBXW82lvG1_4fvQA603cQ==/18894007812209926.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 320900,
            "birthday": 857404800000,
            "userId": 299322077,
            "userType": 0,
            "nickname": "好看的徐大王",
            "signature": "业余UP主，白日做梦派，B站ID:九号桌的徐先生",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18894007812209930,
            "backgroundImgId": 109951163691623490,
            "backgroundUrl": "http://p1.music.126.net/Xetk9fp3a6HPGMihxnI7zg==/109951163691623485.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "泛生活视频达人"
            },
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "18894007812209926",
            "backgroundImgIdStr": "109951163691623485",
            "avatarImgId_str": "18894007812209926"
          },
          "urlInfo": {
            "id": "70CC972D74F7F5C9F4CCF2258E8D7310",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/UX9mCINo_2922253717_uhd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=vLnwtsuGBgxwZfFRvcGNGdkYMtZcXboo&sign=1e0af83562b1799d218ef770b33c9c0e&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15DA7VJMBK%2BhKDNEyxW8wyGa",
            "size": 109822226,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": -31456,
              "name": "#KTV男生必点歌曲【惊艳】#",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "飘向北方 (Live)",
              "id": 1308818967,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 12514278,
                  "name": "那吾克热-NW",
                  "tns": [],
                  "alias": []
                },
                {
                  "id": 13058503,
                  "name": "尤长靖",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 149,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 73326637,
                "name": "中国新说唱 第10期",
                "picUrl": "http://p4.music.126.net/D-mpVLLwMrA-hPu0QPYUNQ==/109951163551410648.jpg",
                "tns": [],
                "pic_str": "109951163551410648",
                "pic": 109951163551410660
              },
              "dt": 258470,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 10341399,
                "vd": -39300
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6204857,
                "vd": -36700
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4136586,
                "vd": -35200
              },
              "a": null,
              "cd": "01",
              "no": 4,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 2,
              "s_id": 0,
              "mst": 9,
              "cp": 1376818,
              "mv": 0,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1536940800007,
              "privilege": {
                "id": 1308818967,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 256,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "70CC972D74F7F5C9F4CCF2258E8D7310",
          "durationms": 184725,
          "playTime": 673496,
          "praisedCount": 2029,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_9A56F0BDA8CCF1578945D8F5F90B6CA9",
          "coverUrl": "https://p2.music.126.net/nNR3wrEinG_gsoBjnG4lJg==/109951164353641470.jpg",
          "height": 1920,
          "width": 1080,
          "title": "Girl Crush Taeri 个人翻跳「1도 없어」180908 竖屏直拍",
          "description": "#回顾舞台#\n\n1年前的今天(18.09.08)，#GIRL CRUSH#〖金村 文化庆典〗 \n\n成员 Taeri (태리) 个人翻跳「一点都没有」舞台 直拍\n\n视频来源见水印",
          "commentCount": 24,
          "shareCount": 30,
          "resolutions": [
            {
              "resolution": 240,
              "size": 18923547
            },
            {
              "resolution": 480,
              "size": 34048023
            },
            {
              "resolution": 720,
              "size": 44512671
            },
            {
              "resolution": 1080,
              "size": 85263868
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 440000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/CvxKGRhpcgum4Pd6B6CxDQ==/109951165506426247.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 441300,
            "birthday": 792259200000,
            "userId": 1386833194,
            "userType": 204,
            "nickname": "砂糖味的金旼祉",
            "signature": "“多么希望，你不要再原地踏步”",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165506426240,
            "backgroundImgId": 109951165252022200,
            "backgroundUrl": "http://p1.music.126.net/xWXD92tFhnbRj_CnYrQefA==/109951165252022209.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165506426247",
            "backgroundImgIdStr": "109951165252022209",
            "avatarImgId_str": "109951165506426247"
          },
          "urlInfo": {
            "id": "9A56F0BDA8CCF1578945D8F5F90B6CA9",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/4K4XkgGh_2679050780_uhd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=nxwtIuQOUZiQtZhWJorTlBvFMRdULdBO&sign=763dd9cf8dc55c4dbcee5ed5073b41be&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15D09csHNAHyq0u8VG9nDsT4",
            "size": 85263868,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": -34539,
              "name": "#韩国男团女团精选#",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "1도 없어",
              "id": 863967341,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 126277,
                  "name": "Apink",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 15,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 71719695,
                "name": "ONE & SIX",
                "picUrl": "http://p3.music.126.net/lhUxKzbTIrwyeb7e8Hwwbw==/109951163387131801.jpg",
                "tns": [],
                "pic_str": "109951163387131801",
                "pic": 109951163387131800
              },
              "dt": 199402,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 7978885,
                "vd": -44400
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 4787348,
                "vd": -41800
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3191580,
                "vd": -40400
              },
              "a": null,
              "cd": "1",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "mst": 9,
              "cp": 1410822,
              "mv": 5961395,
              "rtype": 0,
              "rurl": null,
              "publishTime": 1530460800000,
              "tns": [
                "一点都没有"
              ],
              "privilege": {
                "id": 863967341,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 68,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "9A56F0BDA8CCF1578945D8F5F90B6CA9",
          "durationms": 81502,
          "playTime": 268302,
          "praisedCount": 376,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_82E33D8DF8A09470C6384CFA819B2B61",
          "coverUrl": "https://p2.music.126.net/DUDo34wK2RKfziT2orJtGA==/109951164880236151.jpg",
          "height": 1080,
          "width": 1920,
          "title": "新疆 : eifrat,modassar,abdulla urunlixida",
          "description": "okuhuqillirim eifrat,modassar,abdulla urunlixida xinjiang namidiki nahxa huzurung larha sunuldi,ussulda  kamila muallim ussul sinipi ukuhuqilliri.yahtturhan duslarning tarkitip kuyxini umid kilman rahmat[可爱][拜]",
          "commentCount": 15,
          "shareCount": 286,
          "resolutions": [
            {
              "resolution": 240,
              "size": 36496840
            },
            {
              "resolution": 480,
              "size": 60717106
            },
            {
              "resolution": 720,
              "size": 89607550
            },
            {
              "resolution": 1080,
              "size": 122722678
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 650000,
            "authStatus": 1,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/l5qSLAdhR3LUo2xkpB56mg==/109951164702778775.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 654000,
            "birthday": 437205879287,
            "userId": 489712300,
            "userType": 4,
            "nickname": "Rana-Mijit",
            "signature": "新疆著名歌手，作词作曲家：热娜阿衣·米吉提，艺名：Rena-Mijit。1983出生于新疆伊犁，代表作有：《Ayrildim-离别》、《San kitip-你走了之后》等等。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164702778770,
            "backgroundImgId": 109951164512979040,
            "backgroundUrl": "http://p1.music.126.net/PQz9QQ5eOlD3GsqdxAJxmA==/109951164512979041.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951164702778775",
            "backgroundImgIdStr": "109951164512979041",
            "avatarImgId_str": "109951164702778775"
          },
          "urlInfo": {
            "id": "82E33D8DF8A09470C6384CFA819B2B61",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/untwCNLF_2961700266_uhd.mp4?ts=1609301850&rid=B48B54E33AD80B392ED29B82C46E6B8C&rl=3&rs=uvdOSWdodMHaxeOWePfKfeQSdcihyBSm&sign=c13bbb359669460a27647cbe8ded5348&ext=Xq3S3e8A7aIDQdrIkDHf5huRAwE0MnvlRHEkTjK2fttgapz9mE2%2By5RxmhUpI2rjSrooGxofxtTCoBLVL3f1M3UdlODp6QSzphQe9CkQJnd28PV%2BucwSlqUOo%2FEr1Mn8a36bpAZpUQ4oasFbh7F5uumQzAZwGdPU9rxDV1mOGOtmAKdrug9On9TH0qv4DLdwQt4MOatD2n7Mwq4qaB5pNZ%2BU0H2GZu67q9rsZzwu15DA7VJMBK%2BhKDNEyxW8wyGa",
            "size": 122722678,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "Barlikim",
              "id": 1406700343,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 33804419,
                  "name": "Rena-Mijit",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 95,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 9,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 83754764,
                "name": "Barlikim",
                "picUrl": "http://p4.music.126.net/f5gz7DCdr8kKCnmhTHRwfg==/109951164517778916.jpg",
                "tns": [],
                "pic_str": "109951164517778916",
                "pic": 109951164517778910
              },
              "dt": 251689,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 10068680,
                "vd": -23467
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6041226,
                "vd": -20959
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4027498,
                "vd": -19314
              },
              "a": null,
              "cd": "01",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "mst": 9,
              "cp": 0,
              "mv": 0,
              "rtype": 0,
              "rurl": null,
              "publishTime": 0,
              "privilege": {
                "id": 1406700343,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 320000,
                "fl": 128000,
                "toast": false,
                "flag": 66,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "82E33D8DF8A09470C6384CFA819B2B61",
          "durationms": 130763,
          "playTime": 161479,
          "praisedCount": 836,
          "praised": false,
          "subscribed": false
        }
      }
    ];
    let videoList = this.data.videoList;
    // 将视频最新的数据更新原有视频列表数据中
    videoList.push(...newVideoList);
    this.setData({
      videoList
    })
  },

  /**
   * 跳转搜索页面的回调
   */
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
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
    console.log("页面的下拉刷新");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面的上拉触底");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({form,target,webViewUrl}) {
    console.log(form,target,webViewUrl);
    return {
      title: `来自${form}的自定义转发`,
      path: '/pages/video/video',
      imageUrl:'/static/images/nvsheng.jpg'
    }
  }
})
