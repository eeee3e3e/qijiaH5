<template>
	<view class="studentQuestion">
		<!-- <view class="header">
			<image src="@/static/home/list1.png" class="img"></image>
			<view class="main">
				<view class="pubLabel">会员入会建档问卷测试</view>
			</view>
		</view>
		<view class="mainbody">
			<view @tap="goto(`/pages/my/studentQuestionWrite`)">
				<view class="node" v-for="(item, index) in 4" :key="index">
					<view class="questionnaire">
						<text class="index">{{item+1}}、</text>
						<text class="main">您的子女每天完成学校留的家庭作业大约要用时间？</text>
					</view>
					<view class="extra">
						<view class="time"> 30分钟 - 1小时 </view>
						<u-icon name="arrow-right" size="30rpx" color="#ccc"></u-icon>
					</view>
				</view>
			</view>
		</view> -->
		<image :src="stagetest" mode="widthFix" style="width: 100%;"></image>
		<view class="posBtn">
			<view class="" @tap="goback"> 确认 </view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				stagetest:''
			}
		},
		onLoad(option) {
			console.log(option)
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'usertests'
				},
				success: res => {
					this.stagetest = 'https://www.qijiazhiguo.top' + res.data.Data
					console.log('这',this.list[5].icon2)
				}
			});
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			},
			goback() {
				uni.navigateBack({})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.studentQuestion {
		padding-bottom: 176rpx;
		.header {
			position: relative;
			.img{
				width: 100%;
				height: 320rpx;
			}
			.main{
				width:100%;
				position: absolute;
				left:0;
				top:0;
                background-color: rgba(0,0,0,.7);
				padding-top: 72rpx;
				padding-bottom: 152rpx;
				padding: 72rpx 0 152rpx;
				.pubLabel {
					height: 92rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					text-align: center;
					color: #ffffff;
					line-height: 92rpx;
				}

				.pubLabel::after {
					content: '';
					display: block;
					margin: 0 auto;
					width: 32rpx;
					height: 4rpx;
					background: #ffffff;
					border-radius: 2rpx;
				}
			}
		}

		.mainbody {
			margin: -60rpx 24rpx 0;
			padding: 0 40rpx 6rpx;
			position: relative;
			background: #ffffff;
			border-radius: 12rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;

			.node {
				margin-top: 8rpx;
				padding: 32rpx 0 40rpx;
				border-bottom: 2rpx solid #f6f6f6;

				.questionnaire {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
					line-height: 44rpx;
				}

				.extra {
					margin-top: 26rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.time {
						height: 28rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #aaaaaa;
					}

					u-icon {
						height: 28rpx;
					}
				}
			}

			.node:last-child {
				border-bottom-width: 0;
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
				background: #487be0;
				border: 2rpx solid #6691e7;
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
