<template>
  <view class="childAward">
    <view class="header">
      <view class="honor"> 获得荣誉：{{TotalCount}} </view>
    </view>
    <view class="mainbody" v-if="homelist != ''">
      <view v-for="(item, index) in homelist" :key="index">
        <view class="node" @tap="goto(`/pages/my/childAwardDetail?img=` + 'https://www.qijiazhiguo.top' + homelist[index].MedalUrl + '&Remark=' + homelist[index].Remark)">
          <image :src="'https://www.qijiazhiguo.top' + homelist[index].MedalUrl" mode=""></image>
          <view class="name">{{homelist[index].Remark}}</view>
        </view>
      </view>
    </view>
	<view style="text-align: center;justify-content: center;height: 210px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;margin-top: 15px;" v-else>
		<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
		<text style="color: #c7c7c7;">暂无荣誉</text>
	</view>
  </view>
</template>
<script>
	
  export default {
	  data() {
	  	return {
			homelist:[],
			value:0,
			TotalCount:0,
			startTime:'',
			endTime:'',
			blank:''
	  	};
	  },
	  created() {
	      //#ifdef MP-WEIXIN
	      wx.showShareMenu({
	          withShareTicket: true,
	          menus: ['shareAppMessage', 'shareTimeline']
	      });
	      //#endif
	  },
	  onLoad(options) {
		  uni.request({
		  	url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
		  	data:{
		  		key:'blank'
		  	},
		  	success: res => {
		  		this.blank = 'https://www.qijiazhiguo.top' + res.data.Data
		  		console.log('这','https://www.qijiazhiguo.top' + res.data.Data)
		  	}
		  });
		  this.startTime = options.startTime
		  this.endTime = options.endTime
		  console.log(options)
		  let that = this
		  uni.request({
		  	url: 'https://www.qijiazhiguo.top/api/UserMedalRelations/GetChildMedals',
			header: { 'authorization': wx.getStorageSync('Ticket') },
		  	data: {
		  		userId: options.ID,
				pageIndex:1,
				pageSize:10,
				startTime:this.startTime,
				endTime:this.endTime
		  	},
		  	success: res => {
				this.TotalCount = res.data.TotalCount
				this.homelist = res.data.Data
		  		console.log(res.data.Data);
				for(var i=2; i<res.data.Data.length;i++){
					that.value = i+1
				}
		  	}
		  });
	  },
    methods: {
      goto(url) { uni.navigateTo({ url }) }
    }
  }
</script>
<style lang="scss" scoped>
  .childAward {
    padding: 36rpx 24rpx 48rpx;
    .header {
      .time {
        margin-left: 16rpx;
        height: 36rpx;
        font-size: 36rpx;
        font-family: DINAlternate, DINAlternate-Bold;
        font-weight: 700;
        color: #333333;
        display: flex;
        align-items: center;
        u-icon { margin-left: 22rpx; }
      }
      .honor {
        margin-top: 28rpx;
        margin-left: 16rpx;
        height: 28rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #aaaaaa;
      }
    }
    .mainbody {
      margin-top: 32rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .node {
        margin: 16rpx 0;
        padding: 24rpx 24rpx 28rpx;
        background: #ffffff;
        border-radius: 12rpx;
        box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
        image {
          width: 292rpx;
          height: 208rpx;
        }
        .name {
          width: 292rpx;
          margin: 24rpx 0 20rpx;
          height: 28rpx;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #333333;
        }
        .extra {
          width: 292rpx;
          height: 24rpx;
          font-size: 24rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
</style>
