<template>
	<view class="openVip">
		<image src="@/static/my/bg.png" class="bgImg"></image>
		<view class="content">
			<view class="v1">
				<text class="t1"></text>
				<text class="t2">学员成长体系 全新升级</text>
				<text class="t1"></text>
			</view>
			<view class="v2">
				<image :src="VipBackImage"></image>
			</view>
			<view class="v3"></view>
			<view class="v4">
				齐家智国儿童团已推出全新vip会员， 成为会员可享受 <text style="color:#f8c989;">子女成长体系规划</text> 等功能， 每一场活动配备专业教师团队分析数据， 辅助孩子德智体美全方位健康成长， 成长过程点滴收获一目了然！
			</view>
			<view class="v5" @tap="goto(`/pages/my/vipChoice?id=` + id)">
				<text>立即开通会员</text>
				<u-icon name="arrow-right" size="30" color="#775241"></u-icon>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				hotnotelist:[],
				id:'',
				VipBackImage:''
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
		onLoad(option) {
			console.log(option)
			this.id = option.keyid
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'vipmember'
				},
				success: res => {
					this.VipBackImage = 'https://www.qijiazhiguo.top' + res.data.Data
					console.log('这',this.VipBackImage)
				}
			});
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
	.openVip {
		.bgImg{
			position: fixed;left:0;top:0;
			width:100%;height:100%;
		}
		.content{
			position: fixed;left:0;top:0;
			width:100%;height:100%;
			.v1{
				display: flex;align-items:center;justify-content: center;margin-bottom:80rpx;padding-top: 70rpx;
				margin-bottom:80rpx;
				.t1{
					width: 70rpx;
					height: 2rpx;
					background: linear-gradient(270deg,#ffeaba);
				}
				.t2{
					margin:0 28rpx;
					// width: 394rpx;
					height: 32rpx;
					font-size: 32rpx;
					color: #ffeaba;
					letter-spacing: 6px;
				}
			}
			.v2{
				margin-bottom:48rpx;
				image{
					margin:0 auto;
					display: block;
					width: 606rpx;
					height: 312rpx;
				}
			}
			.v3{
				margin:0 auto;
				margin-bottom:80rpx;
				width: 422rpx;
				height: 2rpx;
				background: linear-gradient(270deg,#ffeaba);
			}
			.v4{
				margin:0 auto;
				width: 552rpx;
				font-size: 28rpx;
				text-align: center;
				color: #ffffff;
				line-height: 56rpx;
				letter-spacing:3rpx;
				margin-bottom:64rpx;
			}
			.v5 {
				margin: 0 auto;
				width: 342rpx;
				height: 96rpx;
				background: linear-gradient(#F6C786, #FEE0A9);
				border: 2rpx solid #fff;
				border-radius: 48rpx;
				font-size: 32rpx;
				font-weight: 500;
				text-align: center;
				color: #775241;
				margin-bottom:48rpx;
				line-height: 96rpx;
				u-icon {
					margin-left: 8rpx;
				}
			}
			.v6{
				display: flex;align-items:center;justify-content: center;
				text{
					color:rgba(255,255,255,.6);
					margin-right:16rpx;
				}
			}
		}
	}
</style>
