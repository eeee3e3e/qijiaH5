<template>
  <view class="feedback">
    <textarea @input="titlevalue" v-model="titleValue" placeholder="请详细描述您的问题或建议，我们将及时跟进并解决。（建议添加相关问题截图）" placeholder-style="color:#ccc" />
    <view class="voucher">
      <view class="titlebar"> 上传凭证(最多4张) </view>
      <view class="content">
        <imgUpload style="margin: -40px 0 0 -25px;" :count="count" @obtain_img="obtain_img" :name="name" :header="header" :url="url"></imgUpload>
      </view>
    </view>
    <view class="tag"> 我们希望听到您的声音并加以改进我们的服务 </view>
    <view class="contact">
      <view class="hd">手机号</view>
      <input @input="coutmmvalue" v-model="coutmmValue" placeholder="请输入(必填)" placeholderStyle="color: #ccc" />
    </view>

    <view class="posBtn" @click="goBack">
      <view class=""> 确认并提交 </view>
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
			count: 4,
			name: 'pic',
			url: 'https://www.qijiazhiguo.top/api/System/UploadFileBack',
			header: {'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
			imglist:[],
	  	}
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
		if(this.titleValue == ''){
			uni.showLoading({
			    title: '请输入反馈内容',
			    duration: 1000
			});
		}else if(this.coutmmValue == ''){
			uni.showLoading({
			    title: '请输入手机号',
			    duration: 1000
			});
		}else{
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/PostSuggestions',
				method:'POST',
				header:this.header,
				data:{
					ID: wx.getStorageSync('ID'),
					SuggestionMessage : this.titleValue,
					ContactNumber : this.ContactNumber ,
					AddUserId: wx.getStorageSync('ID'),
					Image1: this.imglist[0],
					Image2: this.imglist[1],
					Image3: this.imglist[2],
					Image4: this.imglist[3],
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
									url:'my'
								})
							},
						})
					}else{
						this.homelist = res.data.Data
						console.log(res.data.Data)
						this.isLogin = false
					}
				},
			})
			uni.showToast({
			  title: '提交成功',
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
  .feedback {
	margin-top: -66rpx;
    textarea {
      margin: 24rpx auto 20rpx;
      padding: 26rpx 40rpx;
      width: 622rpx;
      height: 300rpx;
      background: #FFFFFF;
      border-radius: 8rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      line-height: 48rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #EDEDED;
    }
    .voucher {
      margin: 20rpx 24rpx 48rpx;
      padding: 32rpx 40rpx 28rpx;
      background: #FFFFFF;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #EDEDED;
      .titlebar {
        height: 32rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #666666;
      }
      .content {
        display: flex;
        justify-content: space-between;
        margin-top: 36rpx;
        image {
          width: 160rpx;
          height: 160rpx;
        }
      }
    }
    .tag {
      margin: 48rpx 24rpx 36rpx;
      height: 28rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
    }
    .contact {
      margin: 36rpx 24rpx 80rpx;
      padding: 0 40rpx;
      height: 116rpx;
      background: #ffffff;
      border-radius: 8rpx;
      box-shadow: 0rpx 2rpx 4rpx 0rpx #EDEDED;
      display: flex;
      align-items: center;
      .hd {
        margin-right: 56rpx;
        height: 32rpx;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
        line-height: 32rpx;
      }
      input {
        color: #666;
        font-size: 32rpx;
        font-family: PingFangSC, PingFangSC-Regular;
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
  }
</style>
