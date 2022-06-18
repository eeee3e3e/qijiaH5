<template>
	<view class="home">
		<image src="../../static/home/homeimges.png" mode="" style="width: 100%;position: absolute;top: 8%;"></image>
		<view class="search">
			<view class="left">
				<view>
					<picker :range="company" @change="binPickerChange">
						<view>{{ company[companyvalue] }}</view>
					</picker>
				</view>
				<u-icon v-if="false" name="arrow-up-fill" size="14" color="#aaa"></u-icon>
				<u-icon v-else name="arrow-down-fill" size="14" color="#aaa"></u-icon>
			</view>
			<view class="main">
				<u-icon name="search" color="#aaa" size="28"></u-icon>
				<input @click="goSearch" confirm-type="搜索" @confirm="confirmTap" v-model="search" placeholder="请输入查找内容" placeholder-style="color:#aeaeae" />
			</view>
			<view class="right" @tap="goto(`/pages/my/nuechild`)"><image src="@/static/home/icon1.png" mode=""></image></view>
		</view>
		<view class="banner">
			<swiper class="swiper" @change="swiperChange" :current="banner_current" autoplay="true" interval="3000" duration="500" circular="true">
				<swiper-item v-for="(item, index) in banner_list" :key="index" @click="bannernav(item)">
					<view class="swiper-item"><image :src="'https://www.qijiazhiguo.top' + banner_list[index].BannerURL" mode=""></image></view>
				</swiper-item>
			</swiper>
			<view class="indicator-dots"><view :class="['dot', { dotActive: index == banner_current }]" v-for="(item, index) in banner_list" :key="index"></view></view>
		</view>
		<!-- <view class="" v-if="isfteom">
			<web-view ：src="urlwai"></web-view>
		</view> -->
		<view class="links" style="position: absolute;">
			<view class="nope" v-for="(index, item) in typelist1" @click="clicklistq(index)">
				<image :src="arrlist[item]" mode=""></image>
				<view class="name">{{ index.TypeName }}</view>
			</view>
		</view>
		<view class="survival" style="margin-top: 60%;box-shadow: 0rpx 2rpx 4rpx 0rpx #e1e8ec;" v-if="weekendlist != ''">
			<view class="titlebar">
				<image src="../../static/home/item1.png" mode=""></image>
				<view class="">周末生存训练</view>
				<image style="width: 50px;height: 50px;margin-left: -20px;" src="../../static/home/iocn_1.png" mode=""></image>
				<view @click="pasttraining" style="position: absolute;left: 75%;color:  #c2c2c2;font-size: 14px;font-weight: 500;" >
					过往训练
				</view>
				<u-icon style="position: absolute;left: 93%;" name="arrow-right" size="26" color="#ccc"></u-icon>
			</view>
			<view class="contentwrap" v-for="(index,item) in weekendlist">
				<view class="img"><image :src="'https://www.qijiazhiguo.top' + weekendlist[item].FrontCoverImage " mode=""></image></view>
				<view class="main">
					<view class="title">{{ weekendlist[item].ActivityName }}</view>
					<view class="extra">
						<view class="time">{{weekendlist[item].ActivityExes[0].StartTime}}</view>
						<view class="applicantsNums">
							<text class="t">{{ weekendlist[item].CurrentNumber }}</text>
							<text>人已报名</text>
						</view>
					</view>
				</view>
				<view class="menus">
					<view class="menu m1" @tap="goto(`/pages/home/activityDetail?state=2` + '&id=' + weekendlist[item].ID + '&userId=' + keyid)">
						<image src="../../static/home/icon2.png" mode=""></image>
						<text>立即报名</text>
					</view>
					<view class="menu m2" @tap="goto(`/pages/bei_fen/activityPay?state=2` + '&id=' + weekendlist[item].ID + '&userId=' + keyid)">
						<image src="../../static/home/icon3.png" mode=""></image>
						<text>￥{{ weekendlist[item].Price }}</text>
					</view>
				</view>
			</view>
		</view>
		<view  class="survival" style="margin-top: 60%;box-shadow: 0rpx 2rpx 4rpx 0rpx #e1e8ec;" v-else>
			<view class="titlebar">
				<image src="../../static/home/item1.png" mode=""></image>
				<view class="">周末生存训练</view>
				<image style="width: 50px;height: 50px;margin-left: -20px;" src="../../static/home/iocn_1.png" mode=""></image>
				<view @click="pasttraining" style="position: absolute;left: 75%;color:  #c2c2c2;font-size: 14px;font-weight: 500;" >
					过往训练
				</view>
				<u-icon style="position: absolute;left: 93%;" name="arrow-right" size="26" color="#ccc"></u-icon>
			</view>
			<view class="contentwrap">
				<view style="text-align: center;justify-content: center;">
					<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
					<text style="color: #c7c7c7;">暂无近期热门活动</text>
				</view>
			</view>
		</view>
		<!-- <view class="agency">
			<view class="titlebar">
				<image src="../../static/home/title2.png" mode=""></image>
				<view class="">合作机构</view>
				<image style="width: 50px;height: 50px;margin-left: -20px;" src="../../static/home/iocn_1.png" mode=""></image>
			</view>
			<scroll-view class="contentwrap" scroll-x="true">
				<view class="img" v-for="(item, index) in loadallcompany" :key="index">
					<image :src="'https://www.qijiazhiguo.top' + loadallcompany[index].IconUrl" mode=""></image>
					<view class="title">{{ loadallcompany[index].CompanyName }}</view>
					<view class="title2" v-if="loadallcompany[index].Introduce != ''">{{loadallcompany[index].Introduce}}</view>
					<view style="color: #ff9829;" v-else>空</view>
				</view>
			</scroll-view>
		</view> -->
		<view class="activity">
			<view class="titlebar">
				<image src="../../static/home/title3.png" mode=""></image>
				<view class="">推荐活动</view>
				<image style="width: 50px;height: 50px;margin-left: -20px;" src="../../static/home/iocn_1.png" mode=""></image>
			</view>
			<view class="contentwrap">
				<view class="gonggong" style="padding-left: 30rpx;">
					<view class="nono">
						<view class="huanjt" v-for="(index, item) in typelist">
							<view class="tabbar">
								<view class="node" :class="current == item ? 'nodeActive' : 'en'" @click="clicklist(item)">{{ index.TypeName }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tabitem" v-if="tabzhuangt">
					<view class="node" v-for="(item, index) in tablist" :key="index">
						<view @tap="goto(`/pages/home/activityDetail?state=2` + '&id=' + tablist[index].ID + '&userId=' + keyid)">
							<view class="mainbody">
								<view v-if="tablist[index].IsClosedForApplication == 'false'" :class="'img imgHot'"><image :src="'https://www.qijiazhiguo.top' + tablist[index].FrontCoverImage" mode=""></image></view>
								<view v-else :class="'img imgHott'"><image :src="'https://www.qijiazhiguo.top' + tablist[index].FrontCoverImage" mode=""></image></view>
								<view class="main">
									<text class="title">{{ tablist[index].ActivityName }}</text>
									<view class="site">{{ tablist[index].Address }}</view>
								</view>
							</view>
							<view class="extra">
								<view class="time">{{tablist[index].ShowActTime}}</view>
								<view class="price">
									<view v-if="tablist[index].Price == 0"><text class="">免费</text></view>
									<view v-else>
										<text class="flag">￥</text>
										<text class="">{{ tablist[index].Price }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 310px;text-align: center;background: #FFFFFF;" v-else>
					<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
					<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无数据</text>
				</view>
			</view>
			<view class="floor">
				<image src="../../static/home/loadmore.png" mode=""></image>
				<view>已经到底啦 ~ ~</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			banner_current: 0,
			current: 0,
			typelist1:[],
			typelist: [
				{"TypeName":"全部"}
			],
			banner_list: [],
			arrlist: [],
			tablist: [],
			id:'',
			weekendlist: [],
			company: [],
			companyvalue: 0,
			loadallcompany: [],
			search: '',
			pageIndex:1,
			tabzhuangt:true,
			keyid:'',
			isfteom:false,
			urlwai:'',
			blank:'',
			companylist:[]
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
	onShow() {
		this.current = 0
		this.pageIndex = 1
		this.typelist = [
			{"TypeName":"全部"}
		]
		this.arrlist = []
		this.company = []
		this.banner_list = []
		let that = this
		that.pageIndex = 1
		this.keyid = wx.getStorageSync('ID')
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Activities/GetActivitiesTypes',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			success: res => {
				this.typelist1 = res.data.Data
				for(var i=0;i<res.data.Data.length;i++){
					this.typelist.push(res.data.Data[i])
				}
				for (var i = 0; i < this.typelist1.length; i++) {
					this.arrlist.push('https://www.qijiazhiguo.top' + this.typelist1[i].TypeUrl);
				}
				console.log(this.typelist)
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/FriendCompany/LoadAllCompany',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			method: 'POST',
			success: res => {
				this.loadallcompany = res.data.Data;
				if(res.data.ReturnCode == 401){
					console.log(111)
					uni.removeStorageSync('ID');
					uni.removeStorageSync('openID');
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
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserInfo/GetUsersByOpenID',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				openID:wx.getStorageSync('openID')
			},
			success: res => {
				// if()
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Banner/GetBannerManage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				type: 1
			},
			success: res => {
				this.banner_list = res.data.Data
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
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Activities/GetCurrentWeekActs',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				userId:wx.getStorageSync('ID')
			},
			success: res => {
				console.log('热门',res.data.Data)
				this.weekendlist = res.data.Data;
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Dic/GetCityInfoes',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				parentId:0
			},
			success: res => {
				uni.setStorage({
					key: 'ParentID',
					data: res.data.Data[0].ID,
					success: function() {
						console.log('存储成功');
					}
				});
				this.companylist = res.data.Data
				for (var i = 0; i < res.data.Data.length; i++) {
					that.company.push(res.data.Data[i].Name);
				}
				console.log(this.company);
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Activities/GetListView',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				PageIndex: this.pageIndex,
				PageSize: 10,
				ActivityType: '',
				TimeType:1
			},
			success: res => {
				this.tablist = res.data.Data;
				this.tabzhuangt = true
				console.log('这里这里',this.tablist)
			}
		});
	},
	methods: {
		bannernav(e){
			uni.navigateTo({
				url:'./nav?url=' + e.LinkUrl
			})
		},
		swiperChange(e) {
			this.banner_current = e.detail.current;
		},
		goto(url) {
			uni.navigateTo({
				url
			});
			this.pageIndex = 1
			this.current = 0
		},
		clicklistq(e){
			console.log(e)
			uni.navigateTo({
				url:'./nav?url=' + e.LinkUrl
			})
		},
		clicklist(e) {
			this.current = e;
			if(e == 0){
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Activities/GetListView',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						PageIndex: this.pageIndex,
						PageSize: 10,
						ActivityType: '',
						TimeType:1
					},
					success: res => {
						this.tablist = res.data.Data;
						this.tabzhuangt = true
						console.log('这里这里',this.tablist)
					}
				});
			}else{
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Activities/GetListView',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						PageIndex: this.pageIndex,
						PageSize: 10,
						ActivityType: this.typelist[e].ID,
						TimeType:1
					},
					success: res => {
						if(res.data.Data == ''){
							uni.showLoading({
								title: '暂无更多评论',
								duration: 800
							});
							this.tablist = res.data.Data
							this.tabzhuangt = false
							console.log('这里这里',this.tablist)
						}else{
							this.tablist = res.data.Data
							console.log('这里这里',this.tablist)
							this.tabzhuangt = true
						}
					}
				});
			}
			 this.pageIndex = 1
		},
		binPickerChange(e) {
			this.companyvalue = e.target.value;
			console.log(this.companylist[e.target.value].ID)	
			uni.setStorage({
				key: 'ParentID',
				data: this.companylist[e.target.value].ID,
				success: function() {
					console.log('存储成功');
				}
			});
		},
		goSearch(){
			uni.navigateTo({
				url:'../classroom/classroomsearch?key=' + 0
			})
		},
		confirmTap: function() {
			let that = this;
			console.log('我点击了回车');
		},
		pasttraining(){
			uni.navigateTo({
				url:'./pasttraining'
			});
		},
		goToSearch() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Activities/GetListView',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					PageIndex: 1,
					PageSize: 10,
					Country:1,
					Title:this.search,
					TimeType:1
				},
				success: res => {
					this.tablist = res.data.Data;
					if (res.data.TotalCount == 0) {
						uni.showToast({
							title: '暂无搜索数据',
							icon: 'none'
						});
						return;
					}
				}
			});
			if (!this.search.trim()) {
				uni.showToast({
					title: '请输入搜索内容',
					icon: 'none'
				});
				return;
			}
			this.search = '';
		}
	}
};
</script>
<style lang="scss" scoped>
.nono {
	overflow-x: auto;
	display: flex;
	align-items: center;
	white-space: nowrap;
}
.huanjt {
	margin-right: 24rpx;
}
.home {
	.search {
		padding: 22rpx 30rpx;
		background: #ffffff;
		border-top: 2rpx solid #eeeeee;
		display: flex;
		align-items: center;

		.left {
			display: flex;
			align-items: center;

			view {
				height: 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}

			u-icon {
				margin-left: 12rpx;
			}
		}

		.main {
			margin: 0 28rpx;
			padding: 0 30rpx;
			flex: 1;
			height: 64rpx;
			background: #f7f7f7;
			border-radius: 34rpx;
			display: flex;
			align-items: center;

			input {
				margin: 0 16rpx;
				flex: 1;
			}
		}

		.right > image {
			width: 64rpx;
			height: 64rpx;
		}
	}

	.banner {
		margin-top: 20rpx;
		position: relative;
		margin-left: 5px;
		width: 96%;
		.swiper {
			height: 292rpx;

			.swiper-item {
				image {
					width: 100%;
					height: 292rpx;
					margin: 0 28rpx;
				}
			}
		}

		.indicator-dots {
			position: absolute;
			bottom: 16rpx;
			left: calc(50% - 32rpx);
			display: flex;

			.dot {
				margin: 0 8rpx;
				width: 8rpx;
				height: 8rpx;
				opacity: 0.4;
				background: #ffffff;
				border-radius: 4rpx;
			}

			.dotActive {
				opacity: 1;
				width: 16rpx;
			}
		}
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
			width: 172rpx;

			image {
				margin: 0 auto;
				width: 68rpx;
				height: 68rpx;
			}

			view {
				margin-top: 26rpx;
				height: 26rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #444444;
			}
		}
	}

	.titlebar {
		padding: 0 4rpx 12rpx;
		display: flex;
		align-items: center;

		image {
			width: 38rpx;
			height: 38rpx;
		}

		view {
			margin-left: 18rpx;
			height: 88rpx;
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Semibold;
			font-weight: 600;
			color: #444444;
			line-height: 88rpx;
		}
	}

	.survival {
		margin: 0 20rpx;

		.contentwrap {
			width: 100%;
			margin-top: 12rpx;
			padding-bottom: 32rpx;
			background: #ffffff;
			border-radius: 16rpx;
			white-space:nowrap;
			.img {
				width: 100%;
				height: 400rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.main {
				margin: 32rpx 40rpx 40rpx 38rpx;

				.title {
					height: 36rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					color: #444444;
					text-overflow: ellipsis;
																		
					display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																		
					-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																		
					-webkit-line-clamp: 2; /** 显示的行数 **/
																		
					overflow: hidden;  /** 隐藏超出的内容 **/
				}

				.extra {
					margin-top: 28rpx;
					display: flex;
					justify-content: space-between;

					.time {
						height: 26rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #aaaaaa;
					}

					.applicantsNums {
						height: 26rpx;
						line-height: 26rpx;

						text {
							font-size: 26rpx;
							font-family: PingFangSC, PingFangSC-Medium;
							font-weight: 500;
							color: #999999;
						}

						.t {
							color: #f16e21;
						}
					}
				}
			}

			.menus {
				margin: 0 36rpx;
				display: flex;
				justify-content: space-between;

				.menu {
					width: 300rpx;
					height: 84rpx;
					border-radius: 8rpx;
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
					border: 2rpx solid #3567cb;

					text {
						color: #3567cb;
					}
				}

				.m2 {
					background: linear-gradient(180deg, #ef9040, #f77625);
					border: 2rpx solid #ffd3bb;

					text {
						color: #ffffff;
					}
				}
			}
		}
	}

	.agency {
		margin: 50rpx 20rpx 0;
		overflow: hidden;
		.contentwrap {
			margin-top: 18rpx;
			display: flex;
			white-space: nowrap;
			.img {
				display: inline-block;
				margin-right: 28rpx;
				width: 240rpx;
				height: 320rpx;
				padding-top: 36rpx;
				background: #ff9829;
				border-radius: 16rpx;
				box-shadow: 0rpx 4rpx 16rpx 0rpx #ebebeb;

				image {
					display: block;
					margin: 0 auto;
					width: 100rpx;
					height: 100rpx;
					margin-bottom: 20rpx;
				}

				&:last-child {
					margin-right: 0rpx;
				}
			}
			.title {
				margin: 0 auto;
				width: 184rpx;
				font-size: 26rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				margin-bottom: 30rpx;
			}
			.title2 {
				margin: 0 auto;
				width: 184rpx;
				font-size: 22rpx;
				font-weight: 400;
				text-align: center;
				color: #FFFFFF;
				line-height: 38rpx;
				white-space: pre-wrap;
			}
		}
	}

	.activity {
		margin: 54rpx 20rpx 48rpx;

		.contentwrap {
			margin: 14rpx 0 40rpx;

			.tabbar {
				margin: 0 16rpx 40rpx;
				display: flex;
				justify-content: space-between;
				.node {
					white-space:nowrap;
					width: 100%;
					height: 64rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
					line-height: 40rpx;
				}
				.nodeActive {
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
				}
				.nodeActive::after {
					content: '';
					display: block;
					margin: 16rpx auto 0;
					width: 44rpx;
					height: 8rpx;
					background: #ff9829;
					border-radius: 4rpx;
				}
			}

			.tabitem {
				padding: 0 36rpx 10rpx;
				background: #ffffff;
				border-radius: 16rpx;
				box-shadow: 0rpx 4rpx 16rpx 0rpx #ebebeb;

				.node {
					margin-top: 8rpx;
					padding: 28rpx 0;
					border-bottom: 2rpx solid #f2f2f2;

					&:last-child {
						border-bottom-width: 0rpx;
					}

					.mainbody {
						display: flex;

						.img {
							margin-top: 2rpx;
							width: 260rpx;
							height: 148rpx;
							border-radius: 8rpx;
							overflow: hidden;
							position: relative;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.imgHot::after {
							content: '进行中';
							display: block;
							position: absolute;
							left: 0;
							top: 0;
							width: 64rpx;
							height: 28rpx;
							background: #e24545;
							border-radius: 8rpx 0rpx 8rpx 0rpx;
							font-size: 20rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							line-height: 28rpx;
						}
						.imgHott::after {
							content: '已结束';
							display: block;
							position: absolute;
							left: 0;
							top: 0;
							width: 64rpx;
							height: 28rpx;
							background: #f8932e;
							border-radius: 8rpx 0rpx 8rpx 0rpx;
							font-size: 20rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							line-height: 28rpx;
						}
						.main {
							flex: 1;
							margin-left: 26rpx;

							.title {
								height: 96rpx;
								font-size: 32rpx;
								font-family: PingFangSC, PingFangSC-Medium;
								font-weight: 500;
								color: #444444;
								line-height: 48rpx;
								word-break: break-all;
													
								  text-overflow: ellipsis;
													
								  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
													
								  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
													
								  -webkit-line-clamp: 2; /** 显示的行数 **/
													
								  overflow: hidden;  /** 隐藏超出的内容 **/
							}

							.site {
								line-height: 30rpx;
								margin-top: 18rpx;
								font-size: 26rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #aaaaaa;
								word-break: break-all;
													
								  text-overflow: ellipsis;
													
								  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
													
								  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
													
								  -webkit-line-clamp: 2; /** 显示的行数 **/
													
								  overflow: hidden;  /** 隐藏超出的内容 **/
							}
						}
					}

					.extra {
						margin-top: 24rpx;
						display: flex;
						justify-content: space-between;

						.time {
							height: 40rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #aaaaaa;
							line-height: 40rpx;
						}

						.price {
							height: 40rpx;
							line-height: 40rpx;

							text {
								font-size: 36rpx;
								font-family: PingFangSC, PingFangSC-Semibold;
								font-weight: 600;
								color: #e25241;
							}

							.flag {
								font-size: 30rpx;
								font-family: PingFangSC, PingFangSC-Medium;
								font-weight: 500;
								color: #e25241;
							}
						}
					}
				}
			}
		}
	}
}
</style>
