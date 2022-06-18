<template>
	<view class="message">
		<view class="titlebar" @tap="goto(`/pages/my/messagePraise`)">
			<view class="main">
				<image src="../../static/my/message_icon1.jpg" mode=""></image>
				<view class="title"> 获得点赞 </view>
				<view v-if="Replylist.MyRevPoint!=0" class="num">{{Countlist.MyRevPoint}}</view>
			</view>
			<u-icon name="arrow-right" size="24" color="#c5c5c5"></u-icon>
		</view>
		<view class="mainbody">
			<view class="node" @click="tiaozhuan(index)" v-for="(item,index) in Replylist" :key="item">
				<image class="photo" :src="Replylist[index].HeadImage " mode=""></image>
				<view class="bd">
					<view class="up">
						<view class="main">
							<view class="nickname"> {{Replylist[index].UserName}} </view>
							<view class="ask"> {{Replylist[index].ReplyContent}} </view>
							<view class="reply"> {{Replylist[index].Title}} </view>
						</view>
						<view class="img">
							<image :src="'https://www.qijiazhiguo.top' + Replylist[index].Image" mode=""></image>
						</view>
					</view>
					<view class="down">
						<view class="left"> {{Replylist[index].ChildTypeName}}·{{Replylist[index].CreateTime}} </view>
						<view class="right">
							<image src="../../static/my/message_icon2.jpg" mode=""></image>
							<view>查看详情</view>
						</view>
					</view>
				</view>
			</view>
			<view class="without"> 暂无更多回复 </view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				Countlist:[],
				pageIndex:1,
				Replylist:[]
			};
		},
		onReachBottom () {
			console.log('触底了')
			this.pageIndex++
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: wx.getStorageSync('ID'),
					pageIndex: this.pageIndex,
					pageSize:10
				},
				success: res => {
					console.log(res.data.Data);
					for(var i = 0;i<res.data.Data.length;i++){
						this.Replylist.push(res.data.Data[i])
					}
				}
			});
		},
		onLoad() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyCount',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					parentId: wx.getStorageSync('ID'),
				},
				success: res => {
					console.log(res.data.Data);
					this.Countlist = res.data.Data
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: wx.getStorageSync('ID'),
					pageIndex: this.pageIndex,
					pageSize:10
				},
				success: res => {
					console.log(res.data.Data);
					this.Replylist = res.data.Data
				}
			});

		},
		methods: {
			goto(url) {
				
				uni.navigateTo({
					url
				})
			},
			tiaozhuan(index){
				if(this.Replylist[index].ReplyType == 1){
					uni.navigateTo({
						url:`/pages/classroom/question?key=` + this.Replylist[index].ParentID 
					})
				}else{
					uni.navigateTo({
						url:`/pages/experience/paste?key=` + this.Replylist[index].ParentID 
					})
				}
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.message {
		.titlebar {
			padding: 0 38rpx 0 44rpx;
			height: 124rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #EBEBEB;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.main {
				display: flex;
				align-items: center;

				image {
					width: 44rpx;
					height: 44rpx;
					background: linear-gradient(180deg, #518bff, #336cff);
					border-radius: 50%;
				}

				.title {
					margin: 0 20rpx 0 24rpx;
					height: 32rpx;
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					color: #666666;
				}

				.num {
					width: 32rpx;
					height: 32rpx;
					background: #cb3535;
					border-radius: 50%;
					font-size: 20rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					text-align: center;
					color: #ffffff;
					line-height: 32rpx;
				}
			}
		}

		.mainbody {
			margin: 20rpx 0 48rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #EBEBEB;

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
								margin: 10rpx 0 8rpx;
								width: 474rpx;
								font-size: 32rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #333333;
								line-height: 44rpx;
								text-overflow: ellipsis;
																					
								display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																					
								-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																					
								-webkit-line-clamp: 2; /** 显示的行数 **/
																					
								overflow: hidden;  /** 隐藏超出的内容 **/
							}

							.reply {
								width: 474rpx;
								font-size: 32rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #aaaaaa;
								line-height: 52rpx;
								text-overflow: ellipsis;
																					
								display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																					
								-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																					
								-webkit-line-clamp: 2; /** 显示的行数 **/
																					
								overflow: hidden;  /** 隐藏超出的内容 **/
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
						margin: 26rpx 0 36rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.left {
							height: 28rpx;
							font-size: 26rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #aaaaaa;
							line-height: 28rpx;
						}

						.right {
							display: flex;
							align-items: center;

							image {
								width: 28rpx;
								height: 28rpx;
								background: #666666;
							}

							view {
								margin-left: 14rpx;
								font-size: 24rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #666666;
								line-height: 24rpx;
							}
						}
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
	}
</style>
