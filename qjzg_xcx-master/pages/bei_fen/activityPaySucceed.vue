<template>
	<view class="activityPaySucceed">
		<view class="show">
			<image src="../../static/home/fkcg.jpg"></image>
			<view class="text">付款成功</view>
			<view class="extra">别忘记准时参加哦！</view>
		</view>
		<view class="activity">
			<view class="title">报名活动</view>
			<view class="content">
				<view class="name">{{CardNum.ActivityName}}丨{{CardNum.ActivityContent}}</view>
				<view class="time">{{CardNum.StartTime}}</view>
				<view class="site">{{CardNum.CityName}}丨 {{CardNum.Address}}</view>
			</view>
		</view>
		<view class="menus">
			<view class="invitation" @tap="goto(`/pages/my/orderForm?leix=` + 9)">查看订单</view>
			<view class="gohome">
				<view class="text" @tap="goHome">
					<text>返回首页</text>
					<image src="../../static/arrow-right.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			CardNum:[]
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
	onLoad(option) {
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Activities/GetActivityAndEx',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				exId:option.ID
			},
			success: res => {
				this.CardNum = res.data.Data
			},
		})
	},
	methods: {
		goHome() {
			uni.switchTab({ url: '/pages/home/home' });
		},
		goto(url) {
			uni.navigateTo({ url });
		}
	}
};
</script>
<style lang="scss" scoped>
.activityPaySucceed {
	padding: 24rpx 28rpx 42rpx;
	.show {
		padding: 86rpx 32rpx 48rpx;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0rpx 4rpx 12rpx 0rpx #ebebeb;
		image {
			margin: 0 auto;
			width: 166rpx;
			height: 166rpx;
		}
		.text {
			margin: 68rpx 0 28rpx;
			height: 36rpx;
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #23519f;
		}
		.extra {
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #aaaaaa;
			text-align: center;
			line-height: 48rpx;
		}
	}
	.activity {
		margin: 24rpx 0 100rpx;
		padding: 32rpx 32rpx 40rpx;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0rpx 4rpx 12rpx 0rpx #ebebeb;
		.title {
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #333333;
		}
		.content {
			margin-top: 32rpx;
			.name {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: justify;
				color: #333333;
				line-height: 48rpx;
			}
			.time {
				margin: 16rpx 0;
				height: 48rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #0066ff;
				line-height: 48rpx;
			}
			.site {
				height: 48rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				line-height: 48rpx;
			}
		}
	}
	.menus {
		.invitation {
			height: 88rpx;
			background: linear-gradient(90deg, #4978c8, #335fb4);
			border-radius: 44rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #ffffff;
			line-height: 88rpx;
		}
		.gohome {
			display: flex;
			justify-content: center;
			.text {
				display: flex;
				padding: 32rpx;
				text {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #666666;
				}
				image {
					margin-top: 4rpx;
					margin-left: 20rpx;
					width: 12rpx;
					height: 20rpx;
				}
			}
		}
	}
}
</style>
