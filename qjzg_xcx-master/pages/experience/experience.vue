<template>
	<view class="experience">
		<view class="nape" v-if="hotnotelist != ''">
			<view class="titlebar"> 家长专区 </view>
			<view class="content">
				<view v-for="(item, index) in hotnotelist" :key="index">
					<view class="node" @tap="goto(`/pages/experience/pastes?ID=` + hotnotelist[index].ID)">
						<view v-if="hotnotelist[index].IsHost" class="pos">
							<image src="../../static/experience/icon.png" mode=""></image>
						</view>
						<view class="img">
							<image class="mark" :src="'https://www.qijiazhiguo.top' + hotnotelist[index].IconUrl" mode=""></image>
						</view>
						<view class="main">
							<view class="up"> {{hotnotelist[index].Name}} </view>
							<view class="down">
								<image src="../../static/experience/icon2.png" mode=""></image>
								<view class="text"> {{hotnotelist[index].PostsNum }} </view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>	
		<view class="nape" v-if="hotnotelist_one != ''">
			<view class="titlebar"> 学员专区 </view>
			<view class="content">
				<view v-for="(item, index) in hotnotelist_one" :key="index"> 
					<view class="node" @tap="goto(`/pages/experience/pastes?ID=` + hotnotelist_one[index].ID)">
						<view v-if="item==0" class="pos">
							<image src="../../static/experience/icon.png" mode=""></image>
						</view>
						<view class="img">
							<image class="mark" src="../../static/experience/item.png" mode=""></image>
						</view>
						<view class="main">
							<view class="up"> 野营经验 </view>
							<view class="down">
								<image src="../../static/experience/icon2.png" mode=""></image>
								<view class="text"> 22003 </view>
							</view>
						</view>
					</view>
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
				hotnotelist_one:[]
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
		onShow() {
			let that = this
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetAdultTypes',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				success: res => {
					console.log(res.data.Data)
					that.hotnotelist = res.data.Data
				},
			})
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.experience {
		padding: 12rpx 24rpx 0;

		.nape {
			margin: 24rpx 0 60rpx;

			.titlebar {
				height: 28rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}

			.content {
				margin-top: 8rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.node {
					margin-top: 24rpx;
					padding: 34rpx 32rpx;
					width: 340rpx;
					height: 160rpx;
					background: #ffffff;
					border-radius: 12rpx;
					box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
					display: flex;
					align-items: center;
					position: relative;

					.pos {
						position: absolute;
						top: 0;
						right: 20rpx;
						width: 26rpx;
						height: 32rpx;
						border-radius: 0rpx 0rpx 200rpx 200rpx;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.img>image {
						width: 92rpx;
						height: 92rpx;
						background: #f3f9ff;
						border-radius: 50%;
					}

					.main {
						margin-left: 28rpx;

						.up {
							height: 32rpx;
							font-size: 32rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #333333;
						}

						.down {
							margin-top: 40rpx;
							display: flex;
							align-items: center;

							image {
								width: 20rpx;
								height: 20rpx;
								background: #aaaaaa;
							}

							.text {
								margin-left: 12rpx;
								height: 28rpx;
								font-size: 24rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #aaaaaa;
								line-height: 28rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
