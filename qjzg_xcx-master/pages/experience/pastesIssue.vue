<template>
  <view class="pastesIssue">
    <view class="titlebar">
      <input v-model="Title" placeholder="这个帖子距离火起来就差个标题啦！" placeholder-style="color:#aaa" />
    </view>
    <view class="contentwarp">
      <textarea v-model="Experience" value="" placeholder="请尽情表述您的想法吧！" placeholder-style="color:#aaa" maxlength="-1" />
    </view>
    <view>
      <imgUpload :count="count" @obtain_img="obtain_img" :name="name" :header="header" :url="url"></imgUpload>
    </view>
    <view class="posBtn">
      <view class="" @tap="goBack"> 发布 </view>
    </view>
  </view>
</template>
<script>
  import imgUpload from '@/components/linzq-imgUpload/linzq-imgUpload.vue'
  export default {
	  data() {
	  	return {
	  		Title:'',
	  		Experience:'',
	  		count: 9,
	  		name: 'pic',
	  		url: 'https://www.qijiazhiguo.top/api/System/UploadFileBack',
	  		header: {'Content-Type': 'application/json'},
			imglist:[],
			id:''
	  	}
	  },
	  components: {
	  	imgUpload
	  },
	  onLoad(option) {
	  	this.id = option.id
	  },
	  created() {
	      //#ifdef MP-WEIXIN
	      wx.showShareMenu({
	          withShareTicket: true,
	          menus: ['shareAppMessage', 'shareTimeline']
	      });
	      //#endif
	  },
    methods: {
      goBack() {
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
		  }else{
			  uni.request({
			  	url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/AddExperienceAdult',
			  			method:'POST',
			  			header: { 'authorization': wx.getStorageSync('Ticket') },
			  			data:{
			  				UserID: wx.getStorageSync('ID'),
			  				Title: this.Title,
			  				ExchangeExperienceType: this.id,
			  				Experience: this.Experience,
			  				Urls: this.imglist,
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
			  		console.log(res.data.Data)
			  		// this.hotnotelist = res.data.Data
			  	},
			  })
			  uni.navigateBack({})
		  }
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
    .titlebar {
      margin: 0 36rpx;
      padding-bottom: 8rpx;
      border-bottom: 2rpx solid #f6f6f6;
      input {
        width: 100%;
        height: 116rpx;
        font-size: 36rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 116rpx;
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
      border: 2rpx solid #e8e6e8;
      border-radius: 8rpx;
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
  }
</style>
<style>
  page { background: #fff; }
</style>
