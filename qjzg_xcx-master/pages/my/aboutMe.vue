<template>
  <view class="aboutMe">
    <view class="header">
      <view class="titlebar">
        <image src="../../static/logo.jpg" mode=""></image>
        <view class="title">齐家智国儿童团</view>
      </view>
      <!-- <view class="versions"> 版本号 v1.0.0 </view> -->
      <view class="content"> {{list}}</view>
    </view>
    <view class="main">
      <view class="nape" v-for="(index,item) in hmoelist">
        <view class="titlebar">
          <view class="title"> {{hmoelist[item].VersionName}} </view>
          <view class="time"> {{hmoelist[item].CreateTime}} </view>
        </view>
        <view class="content">
          <view class="node"> 本次更新： </view>
          <view class="node">  {{hmoelist[item].VersionDescribe}} </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
	export default {
		data() {
			return {
				list:'',
				hmoelist:[]
			}
		},
		onLoad() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetAboutMe',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				success: res => {
					this.list = res.data.Data
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetVersions',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					pageIndex:1,
					pageSize:10
				},
				success: res => {
					this.hmoelist = res.data.Data
				}
			});
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
  .aboutMe {
    .header {
      margin: 24rpx 24rpx 20rpx;
      padding: 60rpx 40rpx 42rpx;
      background: #ffffff;
      border-radius: 8rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #EDEDED;
      .titlebar {
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 88rpx;
          height: 88rpx;
          background: #ffffff;
          border-radius: 50%;
        }
        .title {
          margin-left: 24rpx;
          font-size: 44rpx;
          font-weight: 700;
          color: #333333;
        }
      }
      .versions {
        margin: 48rpx 0 50rpx;
        height: 32rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #9e9e9e;
        line-height: 32rpx;
      }
      .content {
        width: 622rpx;
        height: 260rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #666666;
        line-height: 52rpx;
      }
    }
    .main {
      margin: 20rpx 0 42rpx;
      .nape {
        margin: 20rpx 24rpx;
        padding: 36rpx 40rpx 8rpx;
        background: #ffffff;
        border-radius: 8rpx;
        box-shadow: 0rpx 2rpx 4rpx 0rpx #EDEDED;
        .titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            height: 24rpx;
            font-size: 24rpx;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            color: #3567cb;
          }
          .time {
            height: 24rpx;
            font-size: 24rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #aaaaaa;
          }
        }
        .content {
          margin: 24rpx 0;
          .node {
            height: 48rpx;
            font-size: 24rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #666666;
            line-height: 48rpx;
          }
        }
      }
    }
  }
</style>
