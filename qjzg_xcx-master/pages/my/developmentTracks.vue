<template>
	<view class="">
		<view class="" v-if="simplelist != ''">
			<view class="developmentTracks">
				<view class="tab">
					<view style="display: flex;width: 100%;" v-for="(item,index) in simplelist" @tap="close(index,item)">
						<view :class="current == index ? 'node_lik nodeActive' :'node_lik'">
							<image src="../../static/logo.png" mode=""></image>
							<view class="nickname"> {{simplelist[index].Name}} </view>
						</view>
					</view>
				</view>
				<view class="menu" v-if="homelist != ''">
					<view class="time">
						<picker :range="company" @change="binPickerChange">
							<text>{{company[companyvalue]}}</text>
							<u-icon name="arrow-down-fill" color="#aaa" size="14"></u-icon>
						</picker>
					</view>
				</view>
				<view class="info" v-if="homelist != ''"> 活动：{{NumDto.ActivityNum }}&nbsp;&nbsp;|&nbsp;&nbsp;荣誉：{{NumDto.MedalNum }}&nbsp;&nbsp;</view>
				<view class="introduce" v-for="(items,indexs) in homelist" v-if="homelist != ''">
					<view class="per" v-if="homelist[indexs].TypeID ==1">
						<view class="hd">
							<image src="../../static/my/cz_item1.png" mode=""></image>
							<view class="main">
								<view class="title">{{homelist[indexs].Time}}</view>
								<view class="time"> 获得荣誉 </view>
							</view>
						</view>
						<view class="bd">
							<view v-if="true" class="connectLine"> </view>
							<view class="outermain">
								<view class="main">
									<view class="base1">
										<image :src="'https://www.qijiazhiguo.top' + homelist[indexs].ImgUrl" mode=""></image>
										<view class="title"> {{homelist[indexs].Remark }} </view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="per" v-if="homelist[indexs].TypeID ==0" @click="activity(homelist[indexs].SourceID)">
						<view class="hd">
							<image src="../../static/my/cz_item3.png" mode=""></image>
							<view class="main">
								<view class="title">{{homelist[indexs].Time}}</view>
								<view class="time"> 参加活动 </view>
							</view>
						</view>
						<view class="bd">
							<view v-if="true" class="connectLine"> </view>
							<view class="outermain">
								<view class="main">
									<view class="base2">
										<view class="top">
											<image :src="'https://www.qijiazhiguo.top' + homelist[indexs].ImgUrl" mode=""></image>
											<view style="width: 200px;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;line-height: 40rpx;">  {{homelist[indexs].Title}} </view>
										</view>
										<view class="btm">
											<view class="staple">
												<!-- <view class="node">
													<image src="../../static/my/cz_icon0.png" mode=""></image>
													<view>01/48活动 会员周末拓展</view>
												</view> -->
												<!-- <view class="node">
													<image src="../../static/my/cz_icon1.png" mode=""></image>
													<view>{{homelist[indexs].Address}}</view>
												</view> -->
												<view class="node">
													<image src="../../static/my/cz_icon2.png" mode=""></image>
													<view>{{homelist[indexs].Content}}</view>
												</view>
											</view>
											<u-icon name="arrow-right" size="28" color="#aaa"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="per"  v-if="homelist[indexs].TypeID ==2" @click="yeardatail(simplelist[current].ID,homelist[indexs].SourceID)">
						<view class="hd">
							<image src="../../static/my/cz_item2.png" mode=""></image>
							<view class="main">
								<view class="title">{{homelist[indexs].Time}}</view>
								<view class="time"> 年终报告 </view>
							</view>
						</view>
						<view class="bd">
							<view v-if="true" class="connectLine"> </view>
							<view class="outermain">
								<view class="main">
									<view class="base2">
										<view class="top">
											<!-- <image :src="'https://www.qijiazhiguo.top' + homelist[indexs].ImgUrl" mode=""></image> -->
											<view class="">  {{homelist[indexs].Title}} </view>
										</view>
										<view class="btm">
											<view class="staple">
												<view class="node">
													<image src="../../static/my/cz_icon2.png" mode=""></image>
													<view>点击查看您的年终汇总</view>
												</view>
											</view>
											<u-icon name="arrow-right" size="28" color="#aaa"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 580px;align: center;background: #FFFFFF;text-align: center;padding-top: 120px;" v-if="homelist == ''">
					<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
					<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无内容</text>
				</view>
				<view class="floor"  v-if="homelist != ''">
					<image src="../../static/home/loadmore.png" mode=""></image>
					<view>已经到底啦 ~ ~</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 720px;align: center;background: #FFFFFF;text-align: center;padding-top: 120px;" v-else>
			<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
			<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无内容</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				simplelist:[],
				current:0,
				company: ['全部'],
				companyvalue:0,
				homelist:[],
				NumDto:[],
				blank:'',
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
			let that = this
			this.current = options.current
			console.log(options)
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildrenSimple',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					parentId:wx.getStorageSync('ID')
				},
				success: res => {
					that.simplelist = res.data.Data
					if(options.current == null){
						this.close(0,res.data.Data[0])
					}else{
						this.close(options.current,res.data.Data[options.current])
					}
				},
			})
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
			activity(option){
				uni.navigateTo({
					url:'../home/activityDetail?id=' + option
				})
			},
			yeardatail(s,d){
				console.log(s)
				uni.navigateTo({
					url:'./yearReportDetail?id=' + s + '&SourceID=' + d + '&current=' + this.current 
				})
			},
			binPickerChange(e) {
				this.companyvalue = e.target.value;
				this.close(this.current,this.simplelist[this.current])
			},
			close(index,item) {
				if(this.current != index){
					this.companyvalue = 0
				}
				this.company = ['全部']
				this.keyid = item.ID
				let that = this
				this.current = index;
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/UserInfo/GetGrowupRoadMonthList',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data:{
						userId:item.ID
					},
					success: res => {
						for(var i=0;i<res.data.Data.length;i++){
							this.company.push(res.data.Data[i])
						}
						console.log(111,that.companyvalue)
						if(that.companyvalue == 0){
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/Child/GetGrowupRoads',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data:{
									userId:item.ID,
									pageIndex:1,
									pageSize:10,
									startTime:'',
									endTime:'',
								},
								success: res => {
									that.homelist = res.data.Data
								},
							})
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/Child/GetChildJoinNums',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data:{
									userId:item.ID,
									startTime:'',
									endTime:'',
								},
								success: res => {
									that.NumDto = res.data.Data
								},
							})
						}else{
							let time = this.company[that.companyvalue].split("-")
							var new_date = new Date(time[0],time[1],1);                //取当年当月中的第一天
							console.log('奥术大师大啊',(new Date(new_date.getTime()-1000*60*60*24)).getDate())
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/Child/GetGrowupRoads',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data:{
									userId:item.ID,
									pageIndex:1,
									pageSize:10,
									startTime:time[0] + '-' + time[1] + '-' + 1,
									endTime:time[0] + '-' + time[1] + '-'  + (new Date(new_date.getTime()-1000*60*60*24)).getDate(),
								},
								success: res => {
									that.homelist = res.data.Data
								},
							})
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/Child/GetChildJoinNums',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data:{
									userId:item.ID,
									startTime:time[0] + '-' + time[1] + '-' + 1,
									endTime:time[0] + '-' + time[1] + '-'  + (new Date(new_date.getTime()-1000*60*60*24)).getDate(),
								},
								success: res => {
									that.NumDto = res.data.Data
								},
							})
						}
					}
				})
			},
		}
	};
</script>
<style lang="scss" scoped>
	.developmentTracks {
		padding-bottom: 48rpx;

		.tab {
			display: flex;
			border-bottom: 2rpx solid #eeeeee;
			.nodeActive {
				padding-bottom: 38rpx;
				border-bottom: 4rpx solid #0066ff;

				.nickname {
					color: #333333;
				}
			}
		}

		.menu {
			padding: 42rpx 40rpx 28rpx;
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
			margin: 0 40rpx 14rpx;
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
							height: 36rpx;
							font-size: 32rpx;
							font-family: PingFangSC, PingFangSC-Semibold;
							font-weight: 600;
							color: #333333;
							line-height: 36rpx;
						}

						.time {
							margin-top: 12rpx;
							height: 24rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #aaaaaa;
						}
					}
				}

				.bd {
					margin-left: 24rpx;
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
							box-shadow: 0rpx 2rpx 4rpx 0rpx #EAEAEA;
							padding: 36rpx 32rpx 40rpx;

							.base1 {
								image {
									margin: 12rpx auto 0;
									width: 270rpx;
									height: 196rpx;
								}

								.title {
									margin: 46rpx 0 22rpx;
									height: 32rpx;
									font-size: 32rpx;
									font-family: PingFangSC, PingFangSC-Semibold;
									font-weight: 600;
									text-align: center;
									color: #333333;
								}

								.extra {
									height: 24rpx;
									font-size: 24rpx;
									font-family: PingFangSC, PingFangSC-Regular;
									font-weight: 400;
									text-align: center;
									color: #999999;
								}
							}

							.base2 {
								.top {
									padding: 0 8rpx 20rpx;
									border-bottom: 2rpx dotted #eeeeee;
									display: flex;
									align-items: center;

									image {
										width: 88rpx;
										height: 72rpx;
									}

									view {
										margin-left: 14rpx;
										font-size: 32rpx;
										font-family: PingFangSC, PingFangSC-Semibold;
										font-weight: 600;
										color: #333333;
									}
								}

								.btm {
									display: flex;
									justify-content: space-between;

									.staple {
										padding: 8rpx 0 0 10rpx;

										.node {
											margin-top: 24rpx;
											display: flex;
											align-items: center;

											image {
												width: 28rpx;
												height: 32rpx;
											}

											view {
											
												margin: 0 18rpx;
												height: 24rpx;
												font-size: 24rpx;
												font-family: PingFangSC, PingFangSC-Regular;
												font-weight: 400;
												color: #aaaaaa;
											}
										}

										.node:first-child {
											view {
												color: #333;
											}
										}
									}

									u-icon {
										margin-top: 56rpx;
										height: 28rpx;
									}
								}
							}
						}
					}
				}
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
</style>
