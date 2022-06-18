<template>
	<view class="activityPay">
		<view class="header">
			<view class="posbg"><image src="../../static/logo.png" mode=""></image></view>
			<view class="title">{{weekendlist.ActivityName }}丨{{weekendlist.Introduction }}</view>
			<view class="address"> {{weekendlist.ProvinceName }}{{weekendlist.CityName}} 丨 {{weekendlist.Address}}</view>
		</view>
		<view class="mainwrap">
			<view class="session">
				<view class="titlebar">
					<view class="title">场次</view>
					<view class="extra">活动时间以实际为准</view>
				</view>
				<view class="contentwrap" v-for="(items,indexs) in weekendlist.ActivityExes" @tap="close1(items,indexs)">
					
						<view class="main" style="font-size: 15px;font-weight: 800;">{{weekendlist.ShowActTimeAll}}</view>
				
				</view>
			</view>
			<view class="children">
				<view class="titlebar"><view class="title">参加子女</view></view>
				<view class="children_aa">
					<view class="contentwrap" v-for="(item,index) in simplelist" @tap="close(index,item)">
						<view :class="current == index ? 'nape napeActive' :'nape'">{{simplelist[index].Name}}</view>
					</view>
				</view>
				
			</view>
			<!-- <view class="attention">注意：本活动自愿参加，出险组织方免责，保险赔付(详见入营安全协议)。本活动名额有限，欲报从速。</view> -->
			<view class="payWay">
				<view class="title">支付方式</view>
				<view class="content">
					<image src="../../static/home/wx.jpg" mode=""></image>
					<view>
						微信支付
					</view>
				</view>
			</view>
		</view>
		<view class="posBtn" v-if="Moneylist.RealPayMoney == 0">
			<view class="price">
				<text class="t3">免费支付</text>
			</view>
			<view class="pay" @click="paymentine">立即支付</view>
		</view>
		<view class="posBtn" v-if="Moneylist.RealPayMoney != 0">
			<view class="price">
				<text class="t1">合计：</text>
				<text class="t2">￥</text>
				<text class="t3">{{Moneylist.RealPayMoney }}</text>
			</view>
			<view class="pay" @click="payment">立即支付</view>
		</view>
		<view class="posBtn" v-if="Moneylist.ReduceMoney != 0">
			<view class="price">
				<view class="">
					<text class="t1">合计：</text>
					<text class="t2">￥</text>
					<text class="t3">{{Moneylist.RealPayMoney }}</text>
				</view>
				<view v-if="Moneylist.ReduceMoney != 0">
					<text class="t1">已优惠：</text>
					<text class="t2">￥</text>
					<text class="t3">{{Moneylist.ReduceMoney }}</text>
				</view>
			</view>
			<view class="pay" @click="payment">立即支付</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			simplelist:[],
			current:0,
			current1:0,
			weekendlist:[],
			company:[
				"微信支付","卡券支付"
			],
			companyvalue:0,
			userid:'',
			CardNum:false,
			childrenid:'',
			Moneylist:[],
			activityId:''
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
		this.activityId = options.id
		console.log(options)
		this.userid = wx.getStorageSync('ID')
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildrenSimple',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				parentId:options.userId
			},
			success: res => {
				console.log(res.data.Data)
				this.simplelist = res.data.Data
				this.childrenid = res.data.Data[0].ID
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Vip/CalculateMoney',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data:{
						"userId": res.data.Data[0].ID,
						"activityId": options.id,
						"num": 1
					},
					method:'POST',
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
						console.log(res)
						this.Moneylist = res.data.Data
					},
				})
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetVerifyChildIsFree',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data:{
						childId:res.data.Data[0].ID,
						actExId: options.id,
					},
					success: res => {
						this.CardNum = res.data.Data
					},
				})
			},
		})
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Activities/GetOne',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				id:options.id,
				userId:options.userId
			},
			success: res => {
				console.log(res)
				this.weekendlist = res.data.Data
			},
		})
	},
	methods: {
		payment() {
			let that = this
			if(this.simplelist == ''){
				uni.showModal({  
					title:"暂无子女信息",// 标题  
					content:"请添加子女信息",// 内容  
					showCancel:true // 可以不要  
				});
			}else{
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/BuyActivity',
					method:'POST',
					header: {'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
					data:{
						"UserID": that.userid,
						"ActivityID": that.weekendlist.ActivityExes[0].ActivityID,
						"ActivityExId": that.weekendlist.ActivityExes[0].ID ,
						"BillName": that.weekendlist.ActivityName,
						"Children": [
							that.simplelist[that.current].ID
						],
						"PayType": this.companyvalue
					},
					success: res => {
						console.log('微信支付',res.data.ReturnCode)
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
						}else if(res.data.ReturnCode != "200"){
							uni.showModal({
							    title: '友情提示',
							    content:res.data.ReturnMessage,
							});
						}else{
							uni.requestPayment({
							timeStamp: res.data.Data.timeStamp,
							nonceStr: res.data.Data.nonce_str,
							package:res.data.Data.package,
							signType: "MD5",
							paySign: res.data.Data.sign,
							success: (res) => {
								uni.navigateTo({ url:'./activityPaySucceed?ID=' + that.weekendlist.ActivityExes[0].ID });
							},
							fail: (err) => {
								console.log(err)
							}
						});
						}
						
					},
				})
			}
		},
		paymentine(){
			let that = this
			if(this.simplelist == ''){
				uni.showModal({  
					title:"暂无子女信息",// 标题  
					content:"请添加子女信息",// 内容  
					showCancel:true // 可以不要  
				});
			}else{
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/BuyActivity',
					method:'POST',
					header: {'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
					data:{
						"UserID": that.userid,
						"ActivityID": that.weekendlist.ActivityExes[0].ActivityID,
						"ActivityExId": that.weekendlist.ActivityExes[0].ID ,
						"BillName": that.weekendlist.ActivityName,
						"Children": [
							that.simplelist[that.current].ID
						],
						"PayType": this.companyvalue
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
						}else if(res.data.ReturnCode == '500'){
							uni.showModal({
							    title: '友情提示',
							    content:res.data.ReturnMessage,
							});
						}else{
							uni.navigateTo({url:'./activityPaySucceed?ID=' + that.weekendlist.ActivityExes[0].ID  });
						}
					},
				})
			}
		},
		close(index,item) {
			this.childrenid = item.ID
			this.current = index;
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Vip/CalculateMoney',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					"userId": item.ID,
					"activityId": this.activityId,
					"num": 1
				},
				method:'POST',
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
					console.log(res)
					this.Moneylist = res.data.Data
				},
			})
		},
		close1(items,indexs){
			let that = this
			if(this.weekendlist.ActivityExes[indexs].IsChildFull == true){
				that.current1 = '';
			}else{
				that.current1 = indexs;
			}
		},
		binPickerChange(e){
			this.companyvalue = e.target.value
		}
	}
};
</script>

<style lang="scss" scoped>
.activityPay {
	.header {
		padding: 40rpx 48rpx 104rpx;
		position: relative;
		z-index: -1;
		.posbg {
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			image {
				width: 100%;
				height: 100%;
			}
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				opacity: 0.9;
				background: #2952a4;
			}
		}
		.title {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #ffffff;
			line-height: 48rpx;
			    word-break: break-all;
			
			    text-overflow: ellipsis;
			
			    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			
			    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			
			    -webkit-line-clamp: 3; /** 显示的行数 **/
			
			    overflow: hidden;  /** 隐藏超出的内容 **/
		}
		.address {
			margin-top: 10px;
			height: 100rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #ffffff;
			text-overflow: ellipsis;
																
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																
			-webkit-line-clamp: 3; /** 显示的行数 **/
																
			overflow: hidden;  /** 隐藏超出的内容 **/
		}
	}
	.mainwrap {
		margin-top: -56rpx;
		padding: 36rpx 48rpx 148rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		.titlebar {
			display: flex;
			.title {
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				line-height: 40rpx;
			}
			.extra {
				margin-left: 20rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #aaaaaa;
				line-height: 40rpx;
			}
		}
		.session {
			.contentwrap {
				margin-top: 32rpx;
				.nape {
					margin: 20rpx 0;
					padding: 22rpx 30rpx;
					background: #ffffff;
					border: 2rpx solid #cccccc;
					border-radius: 8rpx;
					.main {
						height: 48rpx;
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 500;
						color: #333333;
						line-height: 48rpx;
					}
				}
				.napeActive {
					background: #3567cb;
					border-color: #6691e7;
					.main {
						color: #ffffff;
					}
				}
				.napeBear {
					background: #f6f6f6;
					border-color: #cccccc;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.main {
						color: #aaaaaa;
					}
					&::after {
						content: '满员';
						display: block;
						width: 92rpx;
						height: 44rpx;
						border: 2rpx solid #cccccc;
						border-radius: 26rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #aaaaaa;
						line-height: 40rpx;
					}
				}
			}
		}
		.children {
			margin: 60rpx 0 40rpx;
			.children_aa{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.contentwrap {
				
				.nape {
					margin-top: 32rpx;
					width: 304rpx;
					height: 96rpx;
					background: #ffffff;
					border: 2rpx solid #cccccc;
					border-radius: 8rpx;
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #333333;
					line-height: 92rpx;
				}
				.napeActive {
					background: #3567cb;
					border-color: #6691e7;
					color: #ffffff;
				}
			}
			}
		}
		.attention {
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #aaaaaa;
			line-height: 44rpx;
		}
		.payWay {
			margin-top: 48rpx;
			padding: 36rpx 0 48rpx;
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
	}
	.posBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #ffffff;
		box-shadow: 0rpx -2rpx 4rpx 0rpx #ebebeb;
		display: flex;
		.price {
			flex: 1;
			padding: 0 32rpx;
			height: 100rpx;
			line-height: 150rpx;
			.t1 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #666666;
				line-height: 28px;
			}
			.t2,
			.t3 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				color: #c74444;
			}
			.t3 {
				font-size: 32rpx;
			}
		}
		.pay {
			width: 370rpx;
			height: 150rpx;
			background: #f39e00;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 150rpx;
		}
	}
}
</style>
