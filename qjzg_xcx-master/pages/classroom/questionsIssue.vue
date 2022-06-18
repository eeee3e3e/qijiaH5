<template>
  <view class="pastesIssue">
    <view class="header">
      <input @input="titlevalue" v-model="titleValue" placeholder="请输入问题标题，并以问号结尾" placeholder-style="color:#aaa" />
      <view class="tip">
        <view class="titlebar">
          <image src="../../static/classroom/tips.jpg" mode=""></image>
          <view class="title"> 让您的第一个提问获得更多解答 </view>
        </view>
        <view class="content">
          <view> · 保持文字简单，表述清晰问题的关键点 </view>
          <view> · 补充详细的内容，让老师更清楚了解 </view>
          <view> · 确保问题没有被提问过 </view>
        </view>
		<view class="pos_del">
		  <image src="../../static/classroom/close.jpg" mode=""></image>
		</view>
      </view>
    </view>
    <view class="contentwarp">
      <textarea @input="coutmmvalue" v-model="coutmmValue" placeholder="为问题做补充说明，可以更快获得解答（必填）" placeholder-style="color:#aaa" maxlength="-1"/>
    </view>
	<view>
		<imgUpload :count="count" @obtain_img="obtain_img" :name="name" :header="header" :url="url"></imgUpload>
	</view>
    <view class="posBtn">
      <view class="" @tap="goBack"> 提交问题 </view>
    </view>
  </view>
</template>
<script>
  import imgUpload from '@/components/linzq-imgUpload/linzq-imgUpload.vue'
  export default {
	  data() {
	  	return {
	  		hotnotelist:[],
			titleValue:'',
			coutmmValue:'',
			count: 9,
			name: 'pic',
			url: 'https://www.qijiazhiguo.top/api/System/UploadFileBack',
			header: {'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
			imglist:[]
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
	  components: {
	  	imgUpload
	  },
    methods: {
	  titlevalue(){
		  console.log(this.titleValue)
	  },
	  coutmmvalue(){
		  console.log(this.coutmmValue)
	  },
      goBack() {
		  var myDate = new Date();
		  var year = myDate.getFullYear();
		  var month = myDate.getMonth(); 
		  var date = myDate.getDate(); 
		  var hours =  myDate.getHours();
		  var minuter = myDate.getMinutes(); 
		  var CreateTime = year + '-' + month + '-' + date + ' ' + hours + ':' + minuter
		if(wx.getStorageSync('ID') == ''){
			uni.showModal({
				title:'提示',
				content:'当前用户未登录',
				confirmText:'去登陆',
				success:res=>{
					if(res.confirm){
						uni.switchTab({url:`/pages/my/my`})
					}
				}
			})
		}else if(this.titleValue == ''){
			uni.showLoading({
			    title: '请输入标题',
			    duration: 1000
			});
		}else if(this.coutmmValue == ''){
			uni.showLoading({
			    title: '请输入问题内容',
			    duration: 1000
			});
		}else{
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ClassRoom/AddNoteInfo',
				method:'POST',
				header:this.header,
				data:{
						Title: this.titleValue,
						Content: this.coutmmValue,
						UserID: wx.getStorageSync('ID'),
						CreateTime: CreateTime,
						Images: this.imglist,
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
					this.homelist = res.data.Data
					console.log(res.data.Data)
					this.isLogin = false
				},
			})
			uni.showToast({
			  title: '您的问题已发布，审核完成后将会有专业老师回复，请耐心等待',
			  icon: 'none',
			  duration: 2500,
			  success() {
			    setTimeout(() => { uni.navigateBack({}) }, 2500)
			  }
			});
		}
		console.log(CreateTime)
      },
	  obtain_img(data) {
		  this.imglist = data
	  	console.log(data, "获取到的图片组" + data.length + "张")
	  }
    }
  }
</script>
<style lang="scss" scoped>
  .pastesIssue {
    .header {
      margin: 0 36rpx;
      padding: 4rpx 0 40rpx;
      border-bottom: 2rpx solid #f6f6f6;
      input {
        width: 100%;
        height: 108rpx;
        font-size: 36rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 108rpx;
      }
      .tip {
        padding: 28rpx 30rpx 22rpx;
        background: #f9f9f9;
        border-radius: 16rpx;
        position: relative;
        .pos_del {
          position: absolute;
          top: 24rpx;
          right: 28rpx;
          image {
			width: 30rpx;
			height: 30rpx;
          }
        }
        .titlebar {
          display: flex;
          align-items: center;
          image {
			width: 35rpx;
			height: 35rpx;
          }
          .title {
            margin-left: 12rpx;
            height: 28rpx;
            font-size: 28rpx;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            color: #666666;
          }
        }
        .content {
          margin: 22rpx 12rpx 0;
          view {
            font-size: 24rpx;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #aaaaaa;
            line-height: 40rpx;
          }
        }
      }
    }
    .contentwarp {
      margin: 36rpx;
      textarea {
        width: 100%;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 48rpx;
      }
    }
    .posAddImg {
      position: fixed;
      left: 34rpx;
      bottom: 188rpx;
      width: 180rpx;
      height: 180rpx;
      background: #f6f6f6;
      overflow: hidden;
      image {
        margin: 46rpx auto 16rpx;
        width: 60rpx;
        height: 48rpx;
      }
      .text {
        height: 24rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #91929b;
      }
    }
    .posBtn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #FFFFFF;
      padding: 18rpx 32rpx 20rpx;
      border-top: 2rpx solid #eee;
      view {
        height: 88rpx;
        background: #f5a236;
        border: 2rpx solid #f5a236;
        border-radius: 12rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 84rpx;
      }
    }
  }.content {
	background: #fff;
	padding: 0 20rpx;
	display: flex;
	flex-wrap: wrap;
	.image {
		margin-right: calc((100% - 632rpx) / 3);
		margin-bottom: 20rpx;
		background-color: #f4f4f4;
		width: 158rpx;
		height: 158rpx;
		border-radius: 10rpx;
		overflow: hidden;
		text-align: center;
		position: relative;
		.closeImg {
			position: absolute;
			right: 0;
			top: 0;
			width: 40rpx;
			height: 40rpx;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 24rpx;
				height: 24rpx;
			}
		}
		&:nth-child(4n) {
			margin-right: 0;
		}
		.icon {
			position: absolute;
			top: calc(50% - 22rpx);
			left: calc(50% - 22rpx);
			width: 44rpx;
			height: 44rpx;
			border-radius: 50%;
			background-color: #ff8030;
			font-size: 26rpx;
			line-height: 43rpx;
			color: #fff;
			text-align: center;
		}
		.icon2 {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			line-height: 158rpx;
			color: #fff;
		}
		.image_1 {
			width: 100%;
			height: 100%;
		}

		.image_2 {
			display: block;
			margin: 40rpx auto 6rpx;
			width: 51rpx;
			height: 47rpx;
		}
		text {
			font-size: 20rpx;
			line-height: 44rpx;
			color: #666;
		}
	}
}
</style>
<style>
  page { background: #fff; }
</style>
