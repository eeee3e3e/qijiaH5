<template>
	<view class="messagePraise">
		<view class="node" v-for="(item, index) in Countlist">
			<image class="photo" :src="Countlist[index].HeadImage " mode=""></image>
			<view class="bd">
				<view class="up">
					<view class="main">
						<view class="nickname">{{ Countlist[index].UserName }}</view>
						<view class="ask">赞了我的回复</view>
					</view>
					<view class="img"><image :src="'https://www.qijiazhiguo.top' + Countlist[index].Image" mode=""></image></view>
				</view>
				<view class="down">{{Countlist[index].ChildTypeName}}·{{Countlist[index].CreateTime}}</view>
			</view>
		</view>
		<view class="without">暂无更多回复</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Countlist: [],
			pageIndex: 1
		};
	},
	onReachBottom () {
		console.log('触底了')
		this.pageIndex++
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyPoints',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				userId: wx.getStorageSync('ID'),
				pageIndex: this.pageIndex,
				pageSize: 10
			},
			success: res => {
				console.log(res.data.Data);
				for(var i = 0;i<res.data.Data.length;i++){
					this.Countlist.push(res.data.Data[i])
				}
			}
		});
	},
	onLoad() {
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyPoints',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				userId: wx.getStorageSync('ID'),
				pageIndex: this.pageIndex,
				pageSize: 10
			},
			success: res => {
				console.log(res.data.Data);
				this.Countlist = res.data.Data;
			}
		});
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.messagePraise {
	margin: 2rpx 0 48rpx;
	background: #ffffff;
	box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;
	.node {
		padding: 32rpx 32rpx 8rpx;
		display: flex;
		.photo {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
		}
		.bd {
			flex: 1;
			margin-left: 16rpx;
			border-bottom: 2rpx solid #eeeeee;
			.up {
				display: flex;
				justify-content: space-between;
				.main {
					.nickname {
						height: 40rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
					}
					.ask {
						margin-top: 10rpx;
						height: 44rpx;
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
						line-height: 44rpx;
					}
				}
				.img {
					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: 4rpx;
					}
				}
			}
			.down {
				margin: 32rpx 0 36rpx;
				height: 28rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #aaaaaa;
				line-height: 28rpx;
			}
		}
	}
	.without {
		padding: 28rpx 0 44rpx;
		font-size: 24rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #aaaaaa;
	}
}
</style>
