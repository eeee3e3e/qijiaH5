<template>
	<view class="orderForm">
		<view class="tabbar">
			<view v-for="(item, index) in homelist" :class="current == index ? 'tabitem itemActive' : 'tabitem'" @tap="close(index)">{{ homelist[index].name }}</view>
		</view>
		<view class="mainbody">
			<view class="node" v-for="(item, index) in currentlist" :key="index">
				<view class="titlebar">
					<text class="title">订单编号：{{ currentlist[index].BillID }}</text>
					<text class="state state1">{{currentlist[index].ApplyStatusName}}</text>
				</view>
				<view class="content">
					<image :src="'https://www.qijiazhiguo.top' + currentlist[index].FrontCoverImage" mode=""></image>
					<view class="text">{{ currentlist[index].Introduction }}</view>
				</view>
				<view class="extra">
					<view class="time">{{ currentlist[index].CreateTime }}</view>
					<view class="price">
						<text class="text1">合计：</text>
						<text class="text2">￥{{ currentlist[index].Payment }}</text>
					</view>
				</view>
				<view class="menus">
					<view @tap="goto(`/pages/home/activityDetail?state=2` + '&id=' + currentlist[index].ActivityID + '&userId=' + keyid)" class="menu menu1">查看详情</view>
					<view v-if="currentlist[index].ApplyStatus == 0" class="menu menu2" @click="activity(item)">签到</view>
					<view v-if="currentlist[index].ApplyStatus == 1" @tap="goto(`/pages/my/orderReply?ID=` + currentlist[index].ID)" class="menu menu3">评价</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			homelist: [{ name: '全部订单', value: '0' }, { name: '待使用', value: '1' }, { name: '待评价', value: '2' }, { name: '已完成', value: '3' }],
			current: 0,
			currentlist: [],
			keyid:''
		};
	},
	onLoad(option) {
		this.keyid = wx.getStorageSync('ID')
		if (option.leix == 9) {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetOneUserActivities',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: wx.getStorageSync('ID'),
					pageIndex: 1,
					PageSize: 10,
					status: ''
				},
				success: res => {
					console.log(res.data.Data);
					this.currentlist = res.data.Data;
				}
			});
		} else {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetOneUserActivities',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: wx.getStorageSync('ID'),
					pageIndex: 1,
					PageSize: 10,
					status: option.leix
				},
				success: res => {
					this.currentlist = res.data.Data;
				}
			});
		}
		this.current = option.id;
	},
	methods: {
		goto(url) {
			uni.navigateTo({ url });
		},
		close(index) {
			this.current = index;
			if (index == 0) {
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetOneUserActivities',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						userId: wx.getStorageSync('ID'),
						pageIndex: 1,
						PageSize: 10,
						status: ''
					},
					success: res => {
						this.currentlist = res.data.Data;
					}
				});
			} else {
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetOneUserActivities',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						userId: wx.getStorageSync('ID'),
						pageIndex: 1,
						PageSize: 10,
						status: index - 1
					},
					success: res => {
						console.log(res.data.Data);
						this.currentlist = res.data.Data;
					}
				});
			}
		},
		activity(item) {
			let that = this;
			console.log(item);
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/UserCheckInActivity',
				method: 'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					actExId: item.ActivityExID,
					userId: item.ChildID
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
					}
					console.log(res.data.Data);
					that.currentlist = res.data.Data;
					that.close(this.current);
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.orderForm {
	padding: 4rpx 0 48rpx;
	.tabbar {
		display: flex;
		background: #ffffff;
		.tabitem {
			width: 25%;
			height: 92rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
			line-height: 92rpx;
			position: relative;
		}
		.itemActive {
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #4469b4;
		}
		.itemActive::after {
			content: '';
			display: block;
			width: 20rpx;
			height: 4rpx;
			background: #5383d3;
			border-radius: 4rpx;
			position: absolute;
			bottom: 0;
			left: calc(50% - 10rpx);
		}
	}
	.mainbody {
		.node {
			margin: 20rpx 24rpx;
			padding: 32rpx;
			background: #ffffff;
			border-radius: 12rpx;
			.titlebar {
				display: flex;
				justify-content: space-between;
				.title {
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
				}
				.state {
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
				}
				.state1 {
					color: #eb6d1a;
				}
				.state2 {
					color: #3567cb;
				}
			}
			.content {
				margin: 32rpx 0;
				background: #f9fafc;
				display: flex;
				align-items: center;
				image {
					width: 238rpx;
					height: 140rpx;
				}
				.text {
					margin-left: 18rpx;
					width: 366rpx;
					height: 120rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
					 word-break: break-all;
					
					    text-overflow: ellipsis;
					
					    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					
					    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
					
					    -webkit-line-clamp: 3; /** 显示的行数 **/
					
					    overflow: hidden;  /** 隐藏超出的内容 **/
				}
			}
			.extra {
				height: 28rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				display: flex;
				justify-content: space-between;
				.time {
					color: #aaaaaa;
				}
				.price {
					.text1 {
						color: #666666;
					}
					.text2 {
						color: #c74444;
					}
				}
			}
			.menus {
				margin: 40rpx 0 8rpx;
				display: flex;
				flex-direction: row-reverse;
				.menu {
					margin-left: 32rpx;
					width: 160rpx;
					height: 60rpx;
					border-radius: 32rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					line-height: 56rpx;
				}
				.menu1 {
					background: #ffffff;
					border: 2rpx solid #aaaaaa;
					color: #333333;
				}
				.menu2 {
					background: #ff8a0c;
					border: 2rpx solid #a9cbf8;
					color: #ffffff;
				}
				.menu3 {
					background: #ff8a0c;
					border: 2rpx solid #ff8a0c;
					color: #ffffff;
				}
			}
		}
	}
}
</style>
