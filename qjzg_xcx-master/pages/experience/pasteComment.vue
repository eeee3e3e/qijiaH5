<template>
  <view class="comment">
    <view class="mainbody">
      <view class="titlebar"> </view>
      <view class="body">
        <view class="node" v-for="(item,index) in comment" :key="index">
          <image class="photo" :src="comment[index].HeadImage" mode=""></image>
          <view class="main">
            <view class="up">
              <view class="left">
                <view class="nickname"> {{comment[index].UserName}} </view>
                <view class="time">{{comment[index].CreateTime}}</view>
              </view>
              <view class="right" @click="PointNum1(comment[index].ID)">
              	<text v-if="!comment[index].CurrentLookUserIsPoint" class="iconfont">{{ '\ue603' }}</text>
              	<text v-else class="iconfont color">{{ '\ue627' }}</text>
              	<view v-if="comment[index].PointNum == 0" class="v">赞</view>
              	<view v-else class="v color">{{ comment[index].PointNum }}</view>
              </view>
            </view>
            <view class="down">{{comment[index].ReplyContent }}</view>
			<view style="position: relative;left: 90%;top: -9%;font-size: 12px;color: red;"v-if="keyid === comment[index].UserID" @click="delet(item)">
				删除
			</view>
          </view>
        </view>
        <view class="without"> 暂无更多回复 </view>
      </view>
    </view>
    <view class="posReply">
      <view class="body">
      	<image src="../../static/my/photoLogin.png" mode=""></image>
      	<input @input="goSearch" confirm-type="搜索" @confirm="confirmTap" v-model="search"  placeholder="我来说两句"/>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
	  data() {
	  	return {
	  		comment:[],
			search:'',
			authorUserID:'',
			Pointnum1:true,
			experienceId:'',
			keyid:''
	  	}
	  },
	  created() {
	      //#ifdef MP-WEIXIN
	      wx.showShareMenu({
	          withShareTicket: true,
	          menus: ['shareAppMessage', 'shareTimeline']
	      });
	      //#endif
	  },
	  onLoad(option) {
		  this.keyid = wx.getStorageSync('ID')
		this.authorUserID = option.authorUserID
		this.experienceId = option.experienceId
		console.log(option)
	  	if(option.ID == 0){
	  		uni.request({
	  			url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetOneExperienceReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
	  			data:{
	  				id:option.authorUserID,
	  				currentLookUserId:1,
	  				pageIndex:1,
	  				pageSize:10,
	  			},
	  			success: res => {
	  				this.comment = res.data.Data
	  			},
	  		})
	  	}else{
	  		uni.request({
	  			url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
	  			data:{
	  				experienceId:option.authorUserID,
	  				currentLookUserId:wx.getStorageSync('ID'),
	  				pageIndex:1,
	  				pageSize:10,
	  			},
	  			success: res => {
	  				this.comment = res.data.Data
	  			},
	  		})
	  	}
	  },
    methods: {
      goto(url) { uni.navigateTo({ url }) },
	  delet(e){
	  	let that = this
	  	console.log(e)
	  	uni.request({
	  		url: 'https://www.qijiazhiguo.top/api/Reply/DeleteReplyWeb/' + e.ID + '?userId=' + wx.getStorageSync('ID'),
	  		method:'DELETE',
			header: { 'authorization': wx.getStorageSync('Ticket') },
	  		success: res => {
	  			uni.request({
	  				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
	  				data:{
	  					experienceId:this.authorUserID,
	  					currentLookUserId:wx.getStorageSync('ID'),
	  					pageIndex:1,
	  					pageSize:10,
	  				},
	  				success: res => {
						if(res.data.ReturnCode == 401){
							uni.removeStorageSync('ID');
							uni.removeStorageSync('openID');
							this.isLogin = false
							this.gethome(wx.getStorageSync('openID'),wx.getStorageSync('ID'))
							uni.showModal({
							    title: '友情提示',
							    content:res.data.ReturnMessage,
								success: (res) => {
									uni.switchTab({
										url:'../my/my'
									})
								},
							})
						}
	  					this.comment = res.data.Data
	  				},
	  			})
	  		}
	  	});
	  },
	  PointNum1(id) {
		  console.log(id)
	  	let that = this
	  	uni.request({
	  		url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/UserPoint',
	  		method: 'POST',
			header: { 'authorization': wx.getStorageSync('Ticket') },
	  		data: {
	  			userId: wx.getStorageSync('ID'),
	  			sourceId: id,
	  		},
	  		success: res => {
				if(res.data.ReturnCode == 401){
					uni.removeStorageSync('ID');
					uni.removeStorageSync('openID');
					this.isLogin = false
					this.gethome(wx.getStorageSync('openID'),wx.getStorageSync('ID'))
					uni.showModal({
					    title: '友情提示',
					    content:res.data.ReturnMessage,
						success: (res) => {
							uni.switchTab({
								url:'../my/my'
							})
						},
					})
				}else{
					console.log(res.data.Data);
					this.Pointnum1 = res.data.Data.PointNum;
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: {
							experienceId: this.experienceId,
							currentLookUserId: wx.getStorageSync('ID'),
							pageIndex: 1,
							pageSize: 10
						},
						success: res => {
							console.log('这里这里', res.data.Data);
							that.comment = res.data.Data;
						}
					});
				}
	  		}
	  	});
	  },
	  confirmTap: function() {
	  	let that = this;
	  	console.log('我点击了回车')
		uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/AddReply',
				method:'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:wx.getStorageSync('ID'),
					content:this.search,
					sourceId:this.authorUserID,
					authorUserID:1,
					rootId:1
				},
				success: res => {
					if(res.data.ReturnCode == 401){
						uni.removeStorageSync('ID');
						uni.removeStorageSync('openID');
						this.isLogin = false
						this.gethome(wx.getStorageSync('openID'),wx.getStorageSync('ID'))
						uni.showModal({
						    title: '友情提示',
						    content:res.data.ReturnMessage,
							success: (res) => {
								uni.switchTab({
									url:'../my/my'
								})
							},
						})
					}else{
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data:{
								experienceId:this.authorUserID,
								currentLookUserId:wx.getStorageSync('ID'),
								pageIndex:1,
								pageSize:10,
							},
							success: res => {
								that.comment = res.data.Data;
							}
						});
					}
				}
			});
		uni.navigateTo({
			url: `../../pagesA/list/listItem?search=${this.search}`
		});
		this.search = '';
	  },
    }
  }
</script>
<style lang="scss" scoped>
  @font-face { font-family: uniicons; src: url('@/static/iconfont.ttf') format('truetype'); }
  .iconfont { font-family: uniicons; font-size: 40rpx; color: #ff8a0c; }
  .comment {
    padding: 1rpx 0 140rpx;
    .node {
      padding: 48rpx 32rpx 0;
      display: flex;
      .photo {
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
      }
      .main {
        flex: 1;
        margin-left: 18rpx;
        border-bottom: 2rpx solid #eeeeee;
        .up {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            .nickname {
              height: 32rpx;
              font-size: 30rpx;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #333333;
            }
            .time {
              margin-top: 12rpx;
              height: 28rpx;
              font-size: 26rpx;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #aaaaaa;
              line-height: 28rpx;
            }
          }
          .right {
            display: flex;
            align-items: center;
            .iconfont { font-size: 28rpx; color: #ff8a0c }
            .v {
              padding: 0 8rpx 0 10rpx;
              font-size: 24rpx;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              color: #666666;
            }
          }
        }
        .down {
          padding: 18rpx 0;
          width: 596rpx;
          font-size: 32rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
          line-height: 52rpx;
        }
        .link {
          margin: 6rpx 0 40rpx;
          display: flex;
          align-items: center;
          .vv {
            margin-right: 10rpx;
            height: 28rpx;
            font-size: 26rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #3567cb;
            line-height: 28rpx;
          }
        }
      }
    }
    .mainbody {
      padding-top: 36rpx;
      background: #FFFFFF;
      box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;
      .titlebar {
        padding: 0 32rpx;
        height: 60rpx;
        font-size: 36rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 60rpx;
      }
      .without {
        padding: 36rpx 0 44rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #aaaaaa;
      }
    }
    .posReply {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      box-shadow: 0rpx -2rpx 4rpx 0rpx #ebebeb;
      padding: 22rpx 28rpx;
      .body {
        height: 68rpx;
        background: #fcfdff;
        border: 2rpx solid #eaedf2;
        border-radius: 38rpx;
        padding: 10rpx;
        display: flex;
        align-items: center;
        image {
          width: 48rpx;
          height: 48rpx;
        }
        text {
          margin: 0 16rpx;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }
</style>
