<template>
	<view class="orderReply">
		<textarea v-model="search" value="" placeholder="可以从活动经历、人员服务、活动环境等方面分享活动感想，以便我们提供更优质的服务，您的评价内容仅用于后台收集，暂不对外展示。（必填）" placeholder-style="color:#ccc" />
		<view class="posBtn"><view class="" @tap="goback">确认评价</view></view>
	</view>
</template>
<script>
import commentStars from '@/components/commentStars.vue';
import imgUpload from '@/components/linzq-imgUpload/linzq-imgUpload.vue';
export default {
	components: { commentStars, imgUpload },
	data() {
		return {
			Title: '',
			Experience: '',
			count: 4,
			name: 'pic',
			url: 'https://www.qijiazhiguo.top/api/System/UploadFileBack',
			header: { 'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
			imglist: [],
			keyid: '',
			search:''
		};
	},
	onLoad(option) {
		this.keyid = option.ID
		console.log(option)
	},
	methods: {
		goto(url) {
			uni.navigateTo({ url });
		},
		getScore(num) {
			console.log(num);
		},
		goback(num) {
			console.log(this.search)
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/AddPlayersComent',
				method:'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					id: this.keyid,
					Comment: this.search,
					userId: wx.getStorageSync('ID'),
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
						 uni.navigateBack();
					}
				}
			});
		},
		obtain_img(data) {
			this.imglist = data;
			console.log(data, '获取到的图片组' + data.length + '张');
		}
	}
};
</script>
<style lang="scss" scoped>
.orderReply {
	.header {
		margin: 24rpx 24rpx 20rpx;
		padding: 38rpx 40rpx 42rpx;
		background: #ffffff;
		display: flex;
		.title {
			height: 50rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #333333;
			line-height: 50rpx;
		}
		.stars {
			flex: 1;
			margin-left: 48rpx;
		}
		.content {
			height: 50rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #f7a900;
			line-height: 50rpx;
		}
	}
	textarea {
		margin: 20rpx auto;
		padding: 26rpx 40rpx;
		width: 622rpx;
		height: 388rpx;
		background: #ffffff;
		border-radius: 8rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		line-height: 48rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ededed;
	}
	.voucher {
		margin: 20rpx 24rpx 48rpx;
		padding: 32rpx 40rpx 28rpx;
		background: #ffffff;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ededed;
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
	.posBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #ffffff;
		padding: 18rpx 32rpx 20rpx;
		border-top: 2rpx solid #eee;
		view {
			height: 88rpx;
			background: #ff8a0c;
			border: 2rpx solid #ff8a0c;
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
