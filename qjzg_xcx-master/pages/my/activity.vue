<template>
	<view class="activity">
		<view class="tab">
			<view style="display: flex;width: 100%;" v-for="(item,index) in simplelist" @tap="close(index,item)">
				<view :class="current == index ? 'node_lik nodeActive':'node_lik'" >
					<image src="../../static/logo.png" mode=""></image>
					<view class="nickname"> {{simplelist[index].Name}} </view>
				</view>
			</view>
		</view>
		<view class="menu">
			<view class="time">
				<view class="info" v-if="homelist != ''"> 活动：{{TotalCount}}&nbsp;&nbsp;</view>
			</view>
			<view class="classify">
				<picker :range="Activity" range-key="TypeName" @change="ActivityChange">
					<text>{{Activity[Activityvalue].TypeName}}</text>
				</picker>
				<u-icon name="arrow-down-fill" color="#3567cb" size="14"></u-icon>
			</view>
		</view>

		<view class="introduce" v-if="Feedbacks != ''">
			<view class="per" v-for="(item,index) in Feedbacks" >
				<view class="hd">
					<image src="../../static/my/hd_icon.png" mode=""></image>
					<view class="main">
						<view class="title">{{Feedbacks[index].ActTitle}} </view>
						<view class="time">{{Feedbacks[index].AddTime}}</view>
					</view>
				</view>
				<view class="bd" v-if=" Feedbacks[index].BehaviorScore != ''">
					<view class="outermain">
						<view class="main">
							<view class="stuffs">
								<view class="nape" v-for="(items,indexs) in Feedbacks[index].BehaviorScore">
									<view class="just">{{Feedbacks[index].BehaviorScore[indexs].Score}}</view>
									<view class="title">{{Feedbacks[index].BehaviorScore[indexs].Name}} </view>
									<view class="line" :style="{ background:Feedbacks[index].BehaviorScore[indexs].Color}"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="floor" v-if="Feedbacks != ''">
			<image src="../../static/home/loadmore.png" mode=""></image>
			<view>已经到底啦 ~ ~</view>
		</view>
		<view v-else style="text-align: center;justify-content: center;height: 700px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;">
			<image style="margin: 160px 0 0 80px;width: 230px;height: 230px;" :src="blank" mode=""></image>
			<text style="color: #c7c7c7;">暂无活动情况</text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			simplelist:[],
			current:0,
			Feedbacks:[],
			NumDto:[],
			company: [],
			companyvalue:0,
			Activity:[{
				"ID": "",
				"TypeName":'全部',
				}],
			Activityvalue:0,
			pageIndex:1,
			TotalCount:0,
			startTime:'',
			endTime:'',
			blank:''
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
	onLoad(options) {
		this.startTime = options.startTime
		this.endTime = options.endTime
		if(options.current != null){
			this.current = options.current
		}
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Activities/GetActivitiesTypes',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			success: res => {
				for(var i = 0;i<res.data.Data.length;i++){
					this.Activity.push(res.data.Data[i])
				}
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildrenSimple',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				parentId: wx.getStorageSync('ID'),
			},
			success: res => {
				console.log(res.data.Data);
				this.simplelist = res.data.Data;
				if(options.current == null){
					this.close(0,res.data.Data[0])
				}else{
					this.close(options.current,res.data.Data[options.current])
				}
			}
		});
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
	},
	methods: {
		binPickerChange(e) {
			this.companyvalue = e.target.value;
		},
		ActivityChange(t) {
			this.Activityvalue = t.target.value;
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetGrowupRoadMonthList',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:this.simplelist[this.current].ID
				},
				success: res => {
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetMyActCir',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: {
							userId:this.simplelist[this.current].ID,
							type:this.Activity[this.Activityvalue].ID,
							pageIndex:this.pageIndex,
							pageSize:10,
						},
						success: res => {
							console.log(res.data.Data);
							this.TotalCount = res.data.TotalCount
							this.Feedbacks = res.data.Data;
						}
					});
				}
			})
		},
		close(index,item) {
			this.Activityvalue = 0
			this.current = index;
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetGrowupRoadMonthList',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:item.ID
				},
				success: res => {
					this.company = res.data.Data
					if(res.data.Data[0] == undefined){
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/Child/GetChildJoinNumDto',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data:{
								userId:this.simplelist[index].ID,
								date:'2022-01-01'
							},
							success: res => {
								this.NumDto = res.data.Data
							},
						})
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetMyActCir',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								userId:this.simplelist[index].ID,
								pageIndex:this.pageIndex,
								pageSize:10,
								startTime:this.startTime,
								endTime:this.endTime
							},
							success: res => {
								console.log(res.data.Data);
								this.TotalCount = res.data.TotalCount
								this.Feedbacks = res.data.Data;
							}
						});
					}else{
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/Child/GetChildJoinNumDto',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data:{
								userId:item.ID,
								date:res.data.Data[0]
							},
							success: res => {
								this.NumDto = res.data.Data
							},
						})
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetMyActCir',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								userId:item.ID,
								pageIndex:this.pageIndex,
								pageSize:10,
								startTime:this.startTime,
								endTime:this.endTime
							},
							success: res => {
								this.TotalCount = res.data.TotalCount
								console.log(res.data.Data);
								this.Feedbacks = res.data.Data;
							}
						});
					}
				}
			})
		},
	}
};
</script>
<style lang="scss" scoped>
.activity {
	padding-bottom: 48rpx;
	.tab {
		display: flex;
		border-bottom: 2rpx solid #eeeeee;
	}
	.menu {
		padding: 20rpx 40rpx 28rpx;
		display: flex;
		justify-content: space-between;
		.time {
			height: 40rpx;
			display: flex;
			align-items: center;
			text {
				margin-right: 22rpx;
				font-size: 40rpx;
				font-family: DINAlternate, DINAlternate-Bold;
				font-weight: 700;
				color: #333333;
			}
		}
		.classify {
			height: 40rpx;
			display: flex;
			align-items: center;
			text {
				margin-right: 18rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #3567cb;
				line-height: 40rpx;
			}
		}
	}
	.info {
		margin: 20rpx 40rpx 14rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #aaaaaa;
	}
	.introduce {
		.per {
			padding: 34rpx 24rpx 0 48rpx;
			.hd {
				height: 86rpx;
				display: flex;
				image {
					margin-top: 4rpx;
					width: 48rpx;
					height: 40rpx;
				}
				.main {
					margin-left: 28rpx;
					.title {
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Semibold;
						font-weight: 600;
						color: #333333;
						line-height: 40rpx;
						text-overflow: ellipsis;
																			
						display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																			
						-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																			
						-webkit-line-clamp: 2; /** 显示的行数 **/
																			
						overflow: hidden;  /** 隐藏超出的内容 **/
					}
					.time {
						padding-top: 12rpx;
						height: 24rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #aaaaaa;
					}
				}
			}
			.bd {
				margin-top: 12rpx;
				margin-left: 24rpx;
				height: 452rpx;
				display: flex;
				.connectLine {
					border-left: 2rpx dotted #ccc;
				}
				.outermain {
					width: 100%;
					padding: 18rpx 0 26rpx 51rpx;
					.main {
						background: #ffffff;
						border-radius: 12rpx;
						box-shadow: 0rpx 2rpx 4rpx 0rpx #eaeaea;
						padding: 28rpx;
						.top {
							display: flex;
							justify-content: space-between;
							.node {
								width: 104rpx;
								padding: 12rpx 0;
								.t1 {
									height: 44rpx;
									font-size: 44rpx;
									font-family: DINAlternate, DINAlternate-Bold;
									font-weight: 700;
									text-align: center;
									color: #333333;
								}
								.t2 {
									margin: 24rpx 0 20rpx;
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
									border-radius: 4rpx;
								}
							}
						}
						.btm {
							margin-top: 34rpx;
							width: 546rpx;
							background: #fbfbfc;
							border-radius: 18rpx;
							padding: 28rpx 32rpx;
							.titlebar {
								display: flex;
								justify-content: space-between;
								align-items: center;
								text {
									height: 24rpx;
									font-size: 24rpx;
									font-family: PingFangSC, PingFangSC-Medium;
									font-weight: 500;
									color: #333333;
								}
							}
							.content {
								margin-top: 16rpx;
								font-size: 24rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #666666;
								line-height: 40rpx;
							}
						}
					}
				}
			}
		}
	}
	.floor {
		margin-top: 14rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			margin-right: 12rpx;
			width: 20rpx;
			height: 20rpx;
		}
		view {
			height: 20rpx;
			font-size: 20rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #aaaaaa;
		}
	}
}
	.node_lik {
		padding: 34rpx 0 40rpx;
		background: #FFFFFF;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.node_lik image{
			width: 44rpx;
			height: 44rpx;
	}
	.nickname {
		margin-left: 18rpx;
		height: 36rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		color: #666666;
		line-height: 36rpx;
	}
	.nodeActive {
		padding-bottom: 38rpx;
		border-bottom: 4rpx solid #0066ff;
	}
	.nickname {
		color: #333333;
	}
	.stuffs {
		padding: 48rpx 0 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	
		.nape {
			width: 130rpx;
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
</style>
