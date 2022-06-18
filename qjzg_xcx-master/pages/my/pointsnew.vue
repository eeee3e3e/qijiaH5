<template>
	<view class="points">
		<view class="points_head">
			<image src="../../static/my/icon.png" mode=""></image>
			<view class="points_head_text">
				<view style="color: #FFFFFF;margin-top: 5px;">积分余额</view>
				<view style="color: #FFFFFF;font-size: 36px;font-weight: bold;margin-top: 12px;">{{loadallcompany.CanUsePoint}}</view>
				<view style="color: #FFFFFF;margin-top: 12px;">已累计兑换积分 {{loadallcompany.FrozenPoint}}</view>
			</view>
		</view>
		<view class="points_index">
			<text style="font-size: 16px;">提现金额</text>
			<view class="links">
				<view class="nope" v-for="(index,item) in Pointlist">
					<view :class="current == item ? 'nodeActive' : 'name'"  @click="clicklist(item)">{{Pointlist[item]}}元</view>
				</view>
			</view>
			<view style="font-size: 16px;margin-bottom: 10px;">提现规则</view>
			<view class="points_index_text">
				<view style="margin-top: 10px;">1、积分兑换零用钱为 10 积分兑换 1 元。 </view>
				<view style="margin-top: 10px; line-height: 20px;">2、提现申请将在七天内到账，如遇高峰期，可能会延退到账，烦请耐心等待</view>
				<view style="margin-top: 10px;">3、最终解释权归齐家智国儿童团所有。</view>
			</view>
		</view>
		<view class="children_wei">
			<view class="children_wei_but" @click="Withdrawal">
				立即兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homelist:[10,15,20,30],
				current: 0,
				PointNum:'',
				loadallcompany:[],
				Pointlist:[]
			}
		},
		onLoad() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Point/GetMyPoint',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:wx.getStorageSync('ID')
				},
				success: res => {
					this.loadallcompany = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Point/GetCashOutPoint',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				success: res => {
					this.Pointlist = res.data.Data
				}
			});
		},
		methods: {
			Withdrawal(){
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Point/GetPointMessageTips',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data:{
						point:this.Pointlist[this.current]
					},
					success: res => {
						uni.showModal({
						    title: '友情提示',
						    content:res.data.Data,
							success: (res) => {
								if (res.confirm) {
								    uni.request({
								    	url: 'https://www.qijiazhiguo.top/api/Point/CashOutPoint',
								    	method:'POST',
										header: { 'authorization': wx.getStorageSync('Ticket') },
								    	data: {
								    		UserId: wx.getStorageSync('ID'),
								    		PointNum: '-' + this.Pointlist[this.current],
								    	},
								    	success: res => {
								    		uni.showModal({
								    		    title: '友情提示',
								    		    content:res.data.ReturnMessage,
								    			showCancel: false,
								    			success: (ref) => {
								    				uni.request({
								    					url: 'https://www.qijiazhiguo.top/api/Point/GetMyPoint',
														header: { 'authorization': wx.getStorageSync('Ticket') },
								    					data:{
								    						userId:wx.getStorageSync('ID')
								    					},
								    					success: res => {
								    						this.loadallcompany = res.data.Data;
								    					}
								    				});
								    			}
								    		})
								    	}
								    });
								} else if (res.cancel) {
								    console.log('用户点击取消');
								}
							} 
						});
					}
				});
			},
			clicklist(e) {
				this.current = e;
				this.PointNum = this.Pointlist[e]
			},
		}
	}
</script>

<style lang="scss" scoped>
	.points{
		margin: 12px;
		background: #F9F9F9;
	}
	.points_head image{
		width: 351px;
		height: 136px;
		border-radius: 12px;
	}
	.points_head{
		width: 351px;
		height: 136px;
		border-radius: 12px;
	}
	.points_head_text{
		position: absolute;
		top: 30px;
		left: 45px;
	}
	.points_index{
		padding: 20px;
		margin-top: 20px;
		width: 351px;
		height: 410px;
		background: #ffffff;
		border-radius: 8px;
		box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.04); 
	}
	.links {
		margin: 24rpx 20rpx 46rpx;
		padding: 0 10rpx 8rpx;
		background: #ffffff;
		border-radius: 16rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	
		.nope {
			margin: 34rpx 0 32rpx;
			width: 130px;
			
			.name {
				border: 1rpx solid #EEEEEE;
				border-radius: 10px;
				height: 54px;
				line-height: 54px;
				margin-top: 26rpx;
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
			}
		}
	}
	.children_wei{
		width: 100%;
		height: 63px;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
	}
	.children_wei_but{
		border-radius: 6px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		color: #FFFFFF;
		background-color: #f5a236;
		margin: 10px 16px;
	}
	.nodeActive {
		border: 1rpx solid #f5a236;
		border-radius: 10px;
		height: 54px;
		line-height: 54px;
		margin-top: 26rpx;
		font-size: 30rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #f5a236;
	}
</style>
