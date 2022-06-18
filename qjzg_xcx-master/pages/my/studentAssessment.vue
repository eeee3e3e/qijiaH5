<template>
  <view class="studentAssessment">
    <view>
      <view class="nape" v-for="(item,index) in hotnotelist" :key="item" @tap="goto(`/pages/my/studentQuestion?ID=` + hotnotelist[index].ID)">
        <view class="main">
          <view class="top">
            <view class="t"> {{hotnotelist[index].ReportName}} </view>
          </view>
          <view class="btm">  {{hotnotelist[index].CreateTime}}</view>
        </view>
        <view class="arrow">
          <u-icon name="arrow-right" size="28" color="#ccc"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
	  data() {
	  	return {
	  		hotnotelist:[],
	  	}
	  },
	  onLoad() {
	  	uni.request({
	  		url: 'https://www.qijiazhiguo.top/api/Questionnaire/GetReportTests',
			header: { 'authorization': wx.getStorageSync('Ticket') },
	  		data:{
	  			reportName:'问卷',
	  			pageIndex:1,
	  			pageSize:5,
	  		},
	  		success: res => {
				console.log(res.data.Data)
	  			this.hotnotelist = res.data.Data
	  		},
	  	})
	  },
    methods: {
      goto(url) { uni.navigateTo({ url }) }
    }
  }
</script>
<style lang="scss" scoped>
  .studentAssessment {
    padding-top: 4rpx;
    .nape {
      margin: 20rpx auto;
      width: 702rpx;
      height: 144rpx;
      background: #ffffff;
      border-radius: 12rpx;
      box-shadow: 0px 2px 4px 0px #EAEAEA;
      padding: 32rpx 30rpx 32rpx 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .main {
        .top {
          display: flex;
          .t {
            height: 32rpx;
            font-size: 32rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #333333;
          }
          .answer {
            margin-left: 20rpx;
            width: 76rpx;
            height: 32rpx;
            font-size: 20rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            line-height: 32rpx;
          }
          .answer1 {
            background: #ebf4ff;
            color: #3563e6;
          }
          .answer2 {
            background: #f5f5f5;
            color: #969696;
          }
        }
        .btm {
          margin-top: 24rpx;
          height: 24rpx;
          font-size: 24rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }
  }
</style>
