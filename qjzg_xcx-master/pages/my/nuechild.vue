<template>
	<view>
		<view class="" v-if="Childrenlist != ''">
			<view class="children" v-for="(item,index) in Childrenlist">
				<view class="baseinfo" @tap="goto(`/pages/my/child?id=` + Childrenlist[index].ID + '&value=' + index)">
					<view class="photo"><image :src="'https://www.qijiazhiguo.top' + Childrenlist[index].HeadImage"></image></view>
					<view class="main">
						<view class="top">{{ Childrenlist[index].Name }}</view>
						<view class="btm">
							<view class="address">
								<image src="../../static/my/adress.png" mode=""></image>
								<text class="t1">{{ Childrenlist[index].SchoolName }}</text>
							</view>
							<view class="grade">
								<text class="t2">{{ Childrenlist[index].Age}}岁</text>
							</view>
						</view>
					</view>
				</view>
				<view class="separate-line"></view>
				<view class="stuffs">
					<view class="nape" v-for="(items, indexs) in Childrenlist[index].BehaviorStandard">
						<view class="just" :style="{ color: Childrenlist[index].BehaviorStandard[indexs].Color }">{{ Childrenlist[index].BehaviorStandard[indexs].StandardName }}</view>
						<view class="title">{{ Childrenlist[index].BehaviorStandard[indexs].BehaviorName }}</view>
						<view class="line" :style="{ background: Childrenlist[index].BehaviorStandard[indexs].Color }"></view>
					</view>
				</view>
				<view class="menus">
					<view class="menu m1" @tap="goto('./mychild?key=' + Childrenlist[index].ID)">
						<text>修改信息</text>
					</view>
					<view class="menu m2" @tap="goto('./developmentTracks?id=' + Childrenlist[index].ID + '&current=' + [index])">
						<text>成长轨迹</text>
					</view>
				</view>
			</view>
			<view class="" style="height: 63px;">
				
			</view>
		</view>
		<view style="width: 100%;height: 720px;align: center;background: #FFFFFF;text-align: center;padding-top: 120px;" v-else>
			<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
			<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无内容</text>
		</view>
		<view class="children_wei">
			<view class="children_wei_but" @click="gotois">
				添加子女
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Childrenlist: [],
				homelist1:[],
				blank:''
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
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'blank'
				},
				success: res => {
					this.blank = 'https://www.qijiazhiguo.top' + res.data.Data
					console.log('这','https://www.qijiazhiguo.top' + res.data.Data)
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildren',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					parentId: wx.getStorageSync('ID')
				},
				success: res => {
					this.Childrenlist = res.data.Data;
					this.homelist1 = res.data.Data[0].BehaviorStandard
				}
			});
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				});
			},
			gotois(){
				if(wx.getStorageSync('ID') == ''){
					uni.showModal({
						title:'提示',
						content:'当前用户未登录',
						confirmText:'去登陆',
						success:res=>{
							if(res.confirm){
								uni.switchTab({url:`/pages/my/my`})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:'/pages/my/mychild'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.children {
		margin: 28rpx auto 20rpx;
		width: 706rpx;
		padding: 28rpx 0 2rpx 0;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #e1e8ec;
	
		.titlebar {
			padding: 8rpx 34rpx 8rpx 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
	
			.title {
				height: 32rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}
	
			.exchange {
				.t {
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
				}
	
				u-icon {
					margin-left: 6rpx;
				}
			}
		}
	
		.baseinfo {
			padding: 40rpx 50rpx;
			display: flex;
			align-items: center;
	
			.photo {
				image {
					width: 136rpx;
					height: 136rpx;
					border: 2rpx solid #ecf1f6;
					border-radius: 70rpx;
				}
			}
	
			.main {
				margin-left: 32rpx;
				image {
					width: 40px;
					height: 40px;
				}
				.top {
					padding: 0 8rpx;
					height: 36rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
				}
	
				.btm {
					margin-top: 28rpx;
					display: flex;
	
					image {
						width: 24rpx;
						height: 24rpx;
						margin-right: 12rpx;
					}
	
					.address,
					.grade {
						display: flex;
						align-items: center;
						padding: 12rpx 24rpx;
						border-radius: 24rpx;
	
						text {
							line-height: 24rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: left;
						}
	
						.t1 {
							color: #3567cb;
						}
	
						.t2 {
							color: #ff8a0c;
						}
					}
	
					.address {
						background-color: #f7f9ff;
					}
	
					.grade {
						margin-left: 24rpx;
						background-color: #fffae9;
					}
				}
			}
		}
	
		.separate-line {
			margin: 0 auto;
			width: 622rpx;
			height: 2rpx;
			background: #f6f6f6;
		}
	
		.stuffs {
			padding: 48rpx 0 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
	
			.nape {
				width: 25%;
				margin-bottom: 56rpx;
	
				.just {
					padding-top: 4rpx;
					height: 56rpx;
					font-size: 40rpx;
					font-family: zihun2hao, zihun2hao-Regular;
					font-weight: 400;
					text-align: center;
					line-height: 40rpx;
				}
	
				.good {
					color: #f8932e;
	
					&::before {
						content: '良好';
					}
				}
	
				.excellent {
					color: #e06656;
	
					&::before {
						content: '优秀';
					}
				}
	
				.bad {
					color: #59b48b;
	
					&::before {
						content: '待进取';
					}
				}
	
				.title {
					margin: 16rpx 0 20rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #666666;
				}
	
				.line {
					margin: 0 auto;
					width: 32rpx;
					height: 6rpx;
					border-radius: 4px;
				}
			}
		}
	}
	.menus {
		margin: 36rpx;
		display: flex;
		justify-content: space-between;
	
		.menu {
			width: 300rpx;
			height: 84rpx;
			border-radius: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 84px;
	
			image {
				width: 32rpx;
				height: 32rpx;
				background: #ffffff;
			}
	
			text {
				margin-left: 16rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
			}
		}
	
		.m1 {
			background: #f9fafe;
			border: 2rpx solid #dddddd;
	
			text {
				color: #3567cb;
			}
		}
	
		.m2 {
			background: #f5a236;
			border: 2rpx solid #ffd3bb;
	
			text {
				color: #ffffff;
			}
		}
	}
	.children_wei{
		width: 100%;
		height: 63px;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
	}
	.children_wei_but{
		height: 44px;
		line-height: 44px;
		text-align: center;
		color: #FFFFFF;
		background-color: #f5a236;
		margin: 10px 16px;
	}
</style>
