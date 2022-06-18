<template>
	<view class="content">
		<view class="content_head">
			<view class="content_head_ctn">
				<view style="color: #d6d6d6;font-size: 16px;padding-bottom: 15px;">可提现积分</view>
				<view style="font-size: 20px;font-weight:800">{{loadallcompany.CanUsePoint }}</view>
			</view>
			<view class="content_head_ink">
				<view class="content_head_ink_text">
					<view style="color: #d6d6d6;font-size: 16px;padding-bottom: 17px;">已使用积分</view>
					<view style="font-size: 20px;font-weight:800">{{loadallcompany.UsedPoint }}</view>
				</view>
				<view class="content_head_ink_text">
					<view style="color: #d6d6d6;font-size: 16px;padding-bottom: 17px;">冻结中积分</view>
					<view style="font-size: 20px;font-weight:800">{{loadallcompany.FrozenPoint}}</view>
				</view>
			</view>	
			<view class="content_head_ink_but" @click="withdrawal">
				提现
			</view>
		</view>
		<view class="points_index">
			<view class="titlebar">
				<view class="titlebar">
					<image src="../../static/my/icon6.png" mode=""></image>
					<view class="titlebar_item">积分明细</view>
				</view>
				<view class="points_pick">
					<view v-for="(item,index) in pointslist" >
						<view  :class="current == index ? 'nodeActive' : 'en'" @click="clicklist(index)">
							{{pointslist[index].name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content_button">
			<view class="characters" v-for="(items,indexs) in homelist">
				<view style="display: flex;flex: 1;">
					<view class="photo">
						<image src="../../static/my/inco-11.png" mode=""></image>
					</view>
					<view class="left">
						<view class="nickname"> {{homelist[indexs].Remark}} </view>
						<view class="time"> 积分收入 </view>
						<view class="time"> {{homelist[indexs].CreateTime}} </view>
					</view>
				</view>
				<view class="content_button_text">
					{{homelist[indexs].PointNum}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homelist:[],
				loadallcompany:[],
				pageIndex:1,
				pointslist:[{'name':'收入','type':0},{'name':'提现','type':1}],
				current: 0,
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
				url: 'https://www.qijiazhiguo.top/api/Point/GetPointDetails',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:wx.getStorageSync('ID'),
					pageIndex:this.pageIndex,
					pageSize:10,
					type:0
				},
				success: res => {
					this.homelist = res.data.Data
				}
			});
		},
		methods: {
			clicklist(e) {
				this.current = e;
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Point/GetPointDetails',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data:{
						userId:wx.getStorageSync('ID'),
						pageIndex:this.pageIndex,
						pageSize:10,
						type:this.pointslist[this.current].type
					},
					success: res => {
						this.homelist = res.data.Data
					}
				});
			},
			withdrawal(){
				uni.navigateTo({
					url:'./pointsnew'
				})
			},
		}
	}
</script>

<style>
	.content_head{
		border-radius: 15px;
		background: #FFFFFF;
		margin: 15px;
		height: 250px;
	}
	.content_button{
		border-radius: 15px;
		background: #FFFFFF;
		margin: 0 15px;
	}
	.nodeActive {
		font-weight: bold;
		color: #ff8a0c;
	}
	.nodeActive::after {
		content: '';
		display: block;
		margin: 16rpx auto 0;
		width: 44rpx;
		height: 8rpx;
	}
	.content_head_ctn{
		padding-top: 30px;
		padding-bottom: 20px;
		text-align: center;
		width: 100%;
	}
	.content_head_ink{
		width: 100%;
		display: flex;
	}
	.content_head_ink_text{
		flex: 2;
		text-align: center;
		padding-bottom: 15px;
	}
	.content_head_ink_but{
		line-height: 38px;
		text-align: center;
		width: 110px;
		height: 38px;
		background: #ff8a0c;
		color: #FFFFFF;
		border-radius: 5px;
		position: absolute;
		left: 36%;
	}
	.points_index{
		display: flex;
	}
	.titlebar image {
		width: 50rpx;
		height: 50rpx;
	}
	.titlebar {
		flex: 1;
		margin: 7px;
		padding: 0 4rpx 12rpx;
		display: flex;
		align-items: center;
	}
	.titlebar_item {
		margin-left: 18rpx;
		height: 88rpx;
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Semibold;
		font-weight: 600;
		color: #444444;
		line-height: 88rpx;
	}
	.points_pick{
		display: flex;
		text-align: center;
		margin-right: 10px;
	}
	.points_pick view{
		margin-right: 10px;
	}
	.characters{
		padding: 30rpx 32rpx 27rpx 0;
		display: flex;
		margin-bottom: 10px;
	}
	.photo image{
		margin: 7px 10px 0 12px;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}
	.nickname {
		height: 32rpx;
		font-size: 30rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
	}
	.time {
		margin-top: 12rpx;
		height: 28rpx;
		font-size: 26rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #aaaaaa;
		line-height: 28rpx;
	}
	.content_button_text{
		line-height: 56px;
		font-size: 20px;
	}
</style>