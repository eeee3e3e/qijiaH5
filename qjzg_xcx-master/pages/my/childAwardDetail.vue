<template>
	<view class="childAwardDetail">
		<view class="img">
			<image :src="img" mode="aspectFit"></image>
		</view>
		<view class="explain">
			<view class="main">
				<!-- <view class="name"> 第三届城市生存大赛 </view> -->
				<view class="extra">{{Remark}}</view>
			</view>
			<view class="download">
				<image src="../../static/my/download.jpg" mode=""></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
					img:'',
					Remark :''
			};
		},
		onLoad(option) {
			console.log(option.img)
			this.img = option.img
			this.Remark  = option.Remark 
		}
	}
</script>
<style lang="scss" scoped>
	.childAwardDetail {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: #000000;

		.img>image {
			width: 100%;
			height: 1078rpx;
		}

		.explain {
			position: absolute;
			bottom: 40rpx;
			left: 40rpx;
			right: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.main {
				.name {
					height: 32rpx;
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #ffffff;
				}

				.extra {
					margin-top: 20rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #999999;
				}
			}

			.download {
				image {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}
	}
</style>
