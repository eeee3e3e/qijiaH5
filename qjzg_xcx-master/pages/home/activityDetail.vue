<template>
	<view class="activityDetail">
		<view class="header">
			<view class="img">
				<image :src="imges" mode=""></image>
			</view>
			<view class="mainbody">
				<view class="price-vipState">
					<view class="price"> 
						<text class="flag" v-if="state==2"> ￥ </text>
						<text class="price_title">{{state==1?'免费': weekendlist.Price}} </text>
					</view>
					<view class="vipState">
						<image src="../../static/home/detail_icon1.jpg" mode=""></image>
						<text >会员</text>
					</view>
				</view>
				<view class="title"> {{weekendlist.Introduction }} </view>
				<view class="integral"> 完成获得{{weekendlist.Score}}积分 </view>
				<view class="vipOpen" @tap="goto(`/pages/my/vipOpen`)" v-if="!homelist.vipInfo.IsActive">
					<view class="btn">
						<image src="../../static/home/detail_icon2.jpg" mode=""></image>
						<text>会员</text>
					</view>
					<view class="main">
						<text>加入齐家智国儿童团，见证孩子成长</text>
					</view>
					<u-icon name="arrow-right" size="22" color="#000"></u-icon>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="per">
				<view class="main">
					<view class="title" style="font-size: 18px;font-weight: 800;"> 活动安排 </view>
				</view>
			</view>
			<view class="per">
				<view class="main">
					<view class="title"> {{weekendlist.ShowActTimeAll}}</view>
					<view class="extra"> 具体时间以现场实际为准 </view>
				</view>
			</view>
			<view class="line"></view>
			<view class="per">
				<view class="main">
					<view class="title"> {{weekendlist.ProvinceName }}丨{{weekendlist.CityName}} </view>
					<view class="extra">{{weekendlist.Address}} </view>
				</view>
				<view class="img" @click="openMap">
					<image src="../../static/home/detail_icon3.jpg" mode=""></image>
				</view>
			</view>
		</view>
		<!-- <view class="buyNeedKnow">
			<view class="title"> 购买须知 </view>
			<view class="content" v-if="weekendlist.NoteForShop != null">
				<text>{{weekendlist.NoteForShop }}</text>
			</view>
		</view> -->
		<view class="expand">
			<view class="title"> 活动介绍 </view>
			<view class="content">
				<view class="img" v-html="ExpandIntroduce">
				</view>
			</view>
		</view>
		<view class="posbtn">
			<view class="left">
				<view class="per" @tap="goHome">
					<u-icon name="home" size="38" color="#666"></u-icon>
					<view class="text"> 首页 </view>
				</view>
				<view class="per" style="padding-top: 8rpx">
						<button open-type="share" style="height: 20px;line-height: 20px;background: #FFFFFF;margin-top: -4px;">
							<text class="iconfont">{{'\ue606'}}</text>
						</button>
					<view class="text"> 分享 </view>
				</view>
				<view class="per">
					<u-icon name="kefu-ermai" size="40" color="#666" @click="number"></u-icon>
					<view class="text"> 客服 </view>
				</view>
			</view>
			<view class="right" @tap="goto(state==1?`/pages/home/activitySubscribe`:`/pages/bei_fen/activityPay?state=2`+ '&id=' + id + '&userId=' + userId)"> 立即报名 </view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				state:'',//1免费2付费
				weekendlist:[],
				imges:'',
				id:'',
				userId:'',
				ExpandIntroduce:'',
				ReduceMoney:[],
				homelist:[]
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
		onLoad(options){
			this.id = options.id
			this.userId = wx.getStorageSync('ID')
			console.log(options)
			this.state=options.state
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Activities/GetOne/',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					id:options.id,
					userId:wx.getStorageSync('ID')
				},
				success: res => {
					console.log(res)
					this.weekendlist = res.data.Data
					this.imges = 'https://www.qijiazhiguo.top' + this.weekendlist.FrontCoverImage
					this.ExpandIntroduce = this.weekendlist.ExpandIntroduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
					console.log(this.ExpandIntroduce)
					// var that = this;
					// //处理富文本里的图片
					// var richtext=  that.strings;//富文本的内容
					// // console.log(apiUrl);
					// const regex = new RegExp('<img', 'gi');
					// const regex2 = new RegExp(' src="', 'gi');
					// const regex3 = new RegExp('<p>', 'gi');
					// // var richtext1= richtext.replace(regex2, ` src="${apiUrl}`);	
					// var richtext2= richtext.replace(regex, `<img style="max-width: 100%;display:block;margin:5px auto;"`);
					// var richtext3= richtext2.replace(regex3, `<p style="margin:5px 10px">`);
					// that.strings = richtext3;
				},
			})
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/CalculateMoney',
				method:'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:options.userId,
					activityId:options.id,
					num:1
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
									url:'../my/my'
								})
							},
						})
					}
					this.ReduceMoney = res.data.Data
					console.log(res.data.Data)
				},
			})
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetUsersByOpenID',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					openID:wx.getStorageSync('openID')
				},
				success: res => {
					this.homelist = res.data.Data;
				}
			});
		},
		methods: {
			onShareAppMessage: function (ops) {
				let that = this
			    //转发事件来源。
			    //button：页面内转发按钮；
			    //menu：右上角转发菜单
				
			    if (ops.from === 'button') {
			        var title = ops.target.dataset.title;
			    };
				
			    return {
			        title: title, //转发的标题。当前小程序名称
			        path: `pages/home/activityDetail?id=` + that.id, //转发的路径
			        imageUrl: '',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
			        success: function (res) {
			            // 转发成功
			            var shareTickets = res.shareTickets;
			            api.showToast('转发成功');
			        },
			        fail: function (res) {
			            // 转发失败
			            api.showToast("转发失败:" + JSON.stringify(res));
			        }
			    }
			},
			goto(url) {
				if(wx.getStorageSync('ID') && wx.getStorageSync('openID') != ''){
					uni.navigateTo({
						url
					})
				}else{
					uni.showModal({
					    title: '友情提示',
					    content: '请先登录账号',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.switchTab({//跳转页面
									url:"../my/my"
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			goHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			number(){
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/System/GetContactNumber',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					success: res => {
						uni.makePhoneCall({phoneNumber:res.data.Data});
					},
				})
			},
			openMap(){
				wx.openLocation({
					latitude: Number(this.weekendlist.Latitude),
					longitude: Number(this.weekendlist.Longitude),
					scale: 14,
					name: `${this.weekendlist.CountryName}丨${this.weekendlist.Address}`,
					address: this.weekendlist.Address
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	@font-face {
		font-family: uniicons;
		src: url('@/static/iconfont.ttf') format('truetype');
	}
	button::after{
		border: none;
		background-color: none;
	}
	.iconfont {
		font-family: uniicons;
		font-size: 40rpx;
		color: #333;
	}

	.activityDetail {
		padding-bottom: 128rpx;

		.header {
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

			.img {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.mainbody {
				padding: 36rpx 32rpx;

				.price-vipState {
					display: flex;

					.price {
						height: 44rpx;
						font-family: PingFangSC, PingFangSC-Semibold;
						font-weight: 600;
						color: #c74444;
						.flag {
							font-size: 30rpx;
							font-weight: 500;
							color: #e25241;
						}
						.price_title{
							font-size: 44rpx;
						}
					}

					.vipState {
						margin-left: 20rpx;
						width: 162rpx;
						height: 36rpx;
						background: #2a2a2a;
						border-radius: 0rpx 18rpx 18rpx 18rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 20rpx;
							height: 20rpx;
							background: #e9d1b1;
						}

						text {
							margin-left: 10rpx;
							height: 32rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Medium;
							font-weight: 500;
							color: #e9d1b1;
							line-height: 32rpx;
						}
					}
				}

				.title {
					margin: 40rpx 0 24rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					color: #333333;
					line-height: 48rpx;
				}

				.integral {
					display: inline-flex;
					padding: 0 8rpx;
					height: 36rpx;
					background: #fdeded;
					border-radius: 4rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #eb5454;
					line-height: 36rpx;
				}

				.vipOpen {
					margin-top: 44rpx;
					padding: 22rpx 20rpx 22rpx 24rpx;
					background: #fefbf1;
					border-radius: 4rpx;
					display: flex;
					align-items: center;

					.btn {
						background: #2a2a2a;
						border-radius: 4rpx;
						padding: 6rpx 10rpx;
						display: flex;
						align-items: center;

						image {
							width: 30rpx;
							height: 30rpx;
						}

						text {
							margin-left: 6rpx;
							height: 32rpx;
							font-size: 22rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #e9d1b1;
							line-height: 32rpx;
						}
					}

					.main {
						flex: 1;
						margin-left: 20rpx;

						text {
							height: 32rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #333333;
						}
					}
				}
			}
		}

		.info {
			margin: 20rpx 0;
			padding: 0 32rpx 6rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

			.line {
				height: 2rpx;
				background: #f6f6f6;
			}

			.per {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.main {
					padding: 36rpx 0;

					.title {
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 500;
						color: #333333;
					}

					.extra {
						margin-top: 20rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #aaaaaa;
					}
				}

				.img {
					margin: 0 12rpx;
					width: 64rpx;
					height: 64rpx;

					image {
						width: 26px;
						height: 26px
					}
				}
			}
		}

		.dataReservation {
			padding: 40rpx 24rpx 40rpx 32rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

			.title {
				height: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				color: #333333;
			}

			.content {
				margin-top: 48rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.main {
					display: flex;

					.per {
						margin-right: 24rpx;
						width: 192rpx;
						padding: 22rpx 0 14rpx;
						background: #ffffff;
						border: 2rpx solid #dcdcdc;
						border-radius: 12rpx;

						view {
							line-height: 18px;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							color: #333333;
						}

						.v {
							margin: 16rpx 0;
						}

						.mark {
							height: 32rpx;
							color: #c74444;

							.t1 {
								font-size: 24rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								line-height: 32rpx;
							}

							.t2 {
								margin-left: 8rpx;
								font-size: 24rpx;
								font-family: DINAlternate, DINAlternate-Bold;
								font-weight: 700;
								line-height: 32rpx;
							}
						}
					}
				}
			}
		}

		.buyNeedKnow {
			margin: 20rpx 0;
			padding: 40rpx 32rpx 44rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

			.title {
				height: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				color: #333333;
			}

			.content {
				margin-top: 36rpx;

				text {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
					line-height: 48rpx;
				}
			}
		}

		.expand {
			padding: 40rpx 32rpx 44rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

			.title {
				height: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				color: #333333;
			}

			.content {
				margin-top: 44rpx;

				.img {
					margin-top: 24rpx;

					image {
						width: 100%;
					}
				}
			}
		}

		.posbtn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background: #ffffff;
			box-shadow: 0rpx -2rpx 4rpx 0rpx #ebebeb;
			display: flex;
			align-items: center;

			.left {
				margin: 0 48rpx;
				flex: 1;
				display: flex;
				justify-content: space-between;

				.per {
					font-size: 20rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #666666;
					line-height: 28rpx;

					.text {
						margin-top: 4rpx;
					}
				}
			}

			.right {
				width: 370rpx;
				height: 100rpx;
				background: #ff7926;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 100rpx;
			}
		}
	}
</style>
