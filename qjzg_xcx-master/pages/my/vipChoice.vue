<template>
	<view class="vipChoice">
		<view class="userinfo">
			<view class="baseinfo">
				<view class="photo">
					<image :src="homelist.HeadImage" mode=""></image>
				</view>
				<view class="main">
					<view class="nickname"> {{homelist.Name}} </view>
					<view class="func">
						<text>开通会员</text>
						<text>开启子女成长体系</text>
					</view>
				</view>
			</view>
			<view class="extra"> </view>
			<view class="menu">
				<view class="nape">
					<image :src="Wisdomwith" mode=""></image>
					<view>智慧陪伴</view>
				</view>
				<view class="nape">
					<image :src="Exclusivebenefits" mode=""></image>
					<view>专享福利</view>
				</view>
				<view class="nape">
					<image :src="appraisalreport" mode=""></image>
					<view>评估报告</view>
				</view>
				<view class="nape">
					<image :src="growth" mode=""></image>
					<view>成长见证</view>
				</view>
			</view>
		</view>
		<view class="vip">
			<view class="titlebar"> 加入齐家智国儿童团 </view>
			<view class="combo-choice">
				<view class="title"> 成为会员 </view>
				<view class="" style="display: flex;">
					<view class="content" v-for="(item,index) in hotnotelist">
						<view :class="current == index ? 'node nodeActive' :'node'" @tap="close(index,item)" >
							<view class="months">{{hotnotelist[index].VIPName}}</view>
							<view class="price" style="text-align: center;">
								<text class="t1">￥</text>
								<text class="t2">{{hotnotelist[index].VIPPrice}}</text>
								<text class="t3">元</text>
							</view>
							<view class="extra">{{hotnotelist[index].Remark}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="askPermission">
				<u-checkbox v-model="checked" shape="circle" size="28" active-color="#aaa">
				</u-checkbox>
				<text class="t t1"> 已阅读并同意 </text>
				<text class="t t2" @click="agreement"> 《会员服务协议》 </text>
			</view>
			<view class="affirm" @click="affirm"> 立即开通 </view>
		</view>
		<view v-show="isPay" class="popPay">
			<view class="mainbd">
				<view class="head">
					<view class="left">
						选择子女
					</view>
					<view class="right" @tap="isPay=false">
						<image src="../../static/experience/close.jpg" mode=""></image>
					</view>
				</view>
				<view style="margin-bottom: 20px;">
					<view class="contentlik" v-for="(item,index) in childrenlist">
						<view :class="currentlik == index ? 'nopelik nopeActivelik' :'nopelik'" @tap="closelik(index,item)"> 
							<text style="position: fixed;left: 20%;">{{childrenlist[index].Name}}</text>
							<text style="position: fixed;right: 15%;">{{childrenlist[index].VipDescribe}}</text>
						</view>
					</view>
				</view>
				<view class="btn" @tap="payments"> 确认支付 </view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				checked: false,
				hotnotelist:[],
				isPay: false,
				current:0,
				currentlik:0,
				timeStamp:'',
				BillName:'',
				homelist:[],
				keyid:'',
				SetMealID:'',
				childrenlist:[],
				childrenlist1:[],
				growth:'',
				Wisdomwith:'',
				appraisalreport:'',
				Exclusivebenefits:'',
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
		onLoad() {
			this.keyid = wx.getStorageSync('ID')
			let value = Math.round(new Date() / 1000)
			this.timeStamp = value.toString()
			let that = this
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/LoginWebTest?openID=' + wx.getStorageSync('openID'),
				method: 'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				success: res => {
					that.homelist = res.data.Data;
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
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildrenSimple',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					parentId:wx.getStorageSync('ID'),
				},
				success: res => {
					this.childrenlist = res.data.Data
					this.childrenlist1 = res.data.Data[0]
				},
			})
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Vip/GetActiveVips',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				success: res => {
					console.log(res.data.Data)
					this.hotnotelist = res.data.Data
					this.BillName = res.data.Data[0].VIPName
					this.SetMealID = res.data.Data[0].ID
				},
			})
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'growth'
				},
				success: res => {
					this.growth = 'https://www.qijiazhiguo.top' + res.data.Data
					console.log(this.growth)
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'Wisdomwith'
				},
				success: res => {
					this.Wisdomwith = 'https://www.qijiazhiguo.top' + res.data.Data
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'appraisalreport'
				},
				success: res => {
					this.appraisalreport = 'https://www.qijiazhiguo.top' + res.data.Data
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/System/GetImage',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					key:'Exclusivebenefits'
				},
				success: res => {
					this.Exclusivebenefits = 'https://www.qijiazhiguo.top' + res.data.Data
				}
			});
		},
		methods: {
			affirm(){
				if(this.checked){
					this.isPay = true
				}else{
					
					uni.showModal({
						title: '提示',
						content: '请阅读会员服务协议，并勾选',
						showCancel:false
					})
				}
			},
			// goto(url) {
			// 	uni.request({
			// 		url: 'https://www.qijiazhiguo.top/api/Vip/AddVipInfo',
			// 		method:'POST',
			// 		data:{
			// 			ID: this.hotnotelist.ID,
			// 			VIPLevel: this.hotnotelist.VIPLevel,
			// 			DiscountRate: this.hotnotelist.DiscountRate,
			// 			VIPName: this.hotnotelist.VIPName,
			// 			DiscountAmount: this.hotnotelist.DiscountAmount,
			// 			DiscountTotalAmount: this.hotnotelist.DiscountTotalAmount,
			// 			VIPAttachmentNo: this.hotnotelist.VIPAttachmentNo,
			// 			FreeCardTimes: this.hotnotelist.FreeCardTimes,
			// 			VipDurationDays: this.hotnotelist.VipDurationDays
			// 		},
			// 		success: res => {
			// 			uni.navigateTo({
			// 				url
			// 			})
			// 		},
			// 	})
			// },
			payments(){
				let that = this
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Vip/BuyCard',
					method:'POST',
					header: {'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
					data:{
						"UserID": that.keyid,
						"BillName": that.BillName,
						"SetMealID": that.SetMealID,
						"ChildId":this.childrenlist1.ID,
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
						console.log('微信支付',res)
						uni.requestPayment({
							timeStamp: res.data.Data.timeStamp,
							nonceStr: res.data.Data.nonce_str,
							package:res.data.Data.package,
							signType: "MD5",
							paySign: res.data.Data.sign,
							success: (res) => {
								uni.switchTab({
									url:'./my'
								})
							},
							fail: (err) => {
								console.log(err)
							}
						});
					},
				})
			},
			close(index,item) {
				console.log(index,item)
				this.BillName = item.VIPName
				this.SetMealID = item.ID 
				console.log(this.BillName)
				this.current = index;
				this.hotnotelist.VIPName = item.VIPName
			},
			closelik(index,item) {
				this.childrenlist1 = item
				console.log(index,item)
				this.currentlik = index;
			},
			agreement(){
				uni.navigateTo({
					url:'./agreement'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.vipChoice {
		.userinfo {
			background-color: #383842;
			padding: 48rpx 0 81rpx;
			position: relative;
			.baseinfo {
				margin: 0 auto;
				width: 690rpx;
				height: 218rpx;
				padding: 0 42rpx;
				background: linear-gradient(270deg, #eac382, #fee5b7);
				border-radius: 16rpx 16rpx 0rpx 0rpx;
				display: flex;
				align-items: center;
				position: relative;
				overflow: hidden;

				.pos {
					position: absolute;
					top: 74rpx;
					right: -30rpx;
					opacity: 0.2;
					background: #ce9a41;

					image {
						width: 352rpx;
						height: 180rpx;
					}
				}

				.photo {
					image {
						width: 112rpx;
						height: 112rpx;
						border: 2rpx solid #eec36b;
						border-radius: 50%;
					}
				}

				.main {
					margin-left: 28rpx;

					.nickname {
						height: 28rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #845e18;
					}

					.func {
						margin-top: 24rpx;

						text {
							margin-right: 10rpx;
							height: 28rpx;
							font-size: 28rpx;
							font-family: PingFangSC, PingFangSC-Medium;
							font-weight: 500;
							color: #845e18;
						}
					}
				}
			}

			.extra {
				position: absolute;
				top: 250rpx;
				left: 20rpx;
				width: 710rpx;
				height: 56rpx;
				// background: #f40;
				opacity: 0.2;
				background: linear-gradient(270deg, #eac382, #fee5b7);
				border-radius: 16rpx 16rpx 0rpx 0rpx;
				filter: blur(16rpx);
			}

			.menu {
				margin: 44rpx 20rpx 0;
				display: flex;
				justify-content: space-around;

				.nape {
					image {
						margin: 0 auto;
						width: 80rpx;
						height: 80rpx;
					}

					view {
						margin-top: 16rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #cacdd9;
					}
				}
			}
		}

		.vip {
			// position: relative;
			z-index: 2;
			margin-top: -30rpx;
			background: #ffffff;
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			padding: 44rpx 28rpx 36rpx;

			.titlebar {
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}

			.versions {
				padding: 52rpx 0 8rpx;

				.title {
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: justify;
					color: #333333;
					line-height: 40rpx;
				}
			}

			.combo-choice {
				padding: 52rpx 0 52rpx;
				.title {
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: justify;
					color: #333333;
					line-height: 40rpx;
				}

				.content {
					margin-top: 28rpx;
					width: 110px;
					.node {
						width: 210rpx;
						// height: 240rpx;
						background: #ffffff;
						border: 2rpx solid #ececec;
						border-radius: 16rpx;
						padding: 50rpx 0 34rpx;
						position: relative;

						.pos {
							position: absolute;
							top: 0;
							left: 0;
							width: 96rpx;
							height: 34rpx;
							background: linear-gradient(270deg, #ff0010, #ff7675);
							border-radius: 16rpx 0rpx 16rpx 0rpx;
							font-size: 20rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							line-height: 34rpx;
						}

						.months {
							height: 24rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							color: #333333;
						}

						.price {
							height: 68rpx;
							margin: 16rpx 0 20rpx;

							.t1 {
								height: 24rpx;
								font-size: 28rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #a96b00;
								line-height: 24rpx;
							}

							.t2,
							.t3 {
								font-size: 22px;
								font-family: DINAlternate, DINAlternate-Bold;
								font-weight: 700;
								color: #a96b00;
								line-height: 62rpx;
							}

							.t3 {
								font-size: 42rpx;
							}
						}

						.extra {
							height: 24rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							color: #cea85c;
						}
					}

					.nodeActive {
						background: #fffcf7;
						border-color: #cea85c;

						.months {
							color: #cea85c;
						}
					}
				}
			}

			.askPermission {
				padding: 48rpx 0 40rpx;
				height: 116rpx;

					.t {
						height: 24rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
					}

					.t1 {
						color: #aaaaaa;
					}

					.t2 {
						color: #D69D38;
					}
				
			}

			.affirm {
				margin: 0 auto;
				background: linear-gradient(#F6C483, #FEE0A8);
				width: 694rpx;
				height: 96rpx;
				border-radius: 48rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #775241;
				line-height: 96rpx;
			}
		}
	}
	.popPay {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	
		&::before {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			opacity: 0.8;
			background: #000000;
		}
	
		.mainbd {
			position: absolute;
			left: 20rpx;
			right: 20rpx;
			bottom: 24rpx;
			padding: 28rpx 40rpx 50rpx;
			background: #ffffff;
			border-radius: 24rpx;
	
			.head {
				padding-bottom: 28rpx;
				border-bottom: 2rpx solid #eee;
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				.left {
					font-size: 16px;
					overflow: hidden;
					flex: 1;
					display: flex;
	
					.node {
						margin-right: 8rpx;
	
						image {
							width: 52rpx;
							height: 52rpx;
							border: 2rpx solid #eeeeee;
							border-radius: 50%;
						}
					}
				}
	
				.right {
					margin-left: 40rpx;
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
					image{
						width: 15px;
						height: 15px;
					}
				}
			}
	
			.price {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin: 12rpx 34rpx 0 36rpx;
	
				.node {
					margin-top: 36rpx;
					width: 160rpx;
					height: 80rpx;
					background: #ffffff;
					border: 2rpx solid #e13838;
					border-radius: 8rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					text-align: center;
					color: #e13838;
					line-height: 76rpx;
					letter-spacing: 6rpx;
	
					&:nth-child(3n) {
						margin-right: 0;
					}
				}
	
				.nodeActive {
					background: #e13838;
					border-color: #ffc4c4;
					color: #ffffff;
				}
			}
	
			.payWay {
				margin: 48rpx 0;
				padding: 32rpx 0 36rpx;
				border-top: 2rpx solid #eee;
				border-bottom: 2rpx solid #eee;
				display: flex;
				align-items: center;
	
				.title {
					height: 32rpx;
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #999999;
				}
	
				.content {
					margin-left: 100rpx;
					flex: 1;
					display: flex;
					align-items: center;
	
					image {
						width: 24rpx;
						height: 24rpx;
						background: #41b035;
					}
	
					view {
						margin-left: 16rpx;
						height: 60rpx;
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
						line-height: 60rpx;
					}
				}
	
				u-icon {
					transform: translateX(8rpx);
				}
			}
	
			.btn {
				margin: 0 auto;
				width: 638rpx;
				height: 88rpx;
				background: #3567cb;
				border: 2rpx solid #6691e7;
				border-radius: 12rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 84rpx;
				letter-spacing: -1px;
			}
		}
	}
	.contentlik {
		display: flex;
		margin: 28rpx 20rpx 0 0;
		justify-content: space-between;
	}
	.nopelik {
		width: 100%;
		height: 88rpx;
		background: #ffffff;
		border: 2rpx solid #ececec;
		border-radius: 16rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		line-height: 84rpx;
	}
		
	.nopeActivelik {
		background: #fffcf7;
		border: 2rpx solid #cea85c;
		color: #a96b00;
	}
</style>
