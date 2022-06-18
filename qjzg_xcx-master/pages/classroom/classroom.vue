<template>
	<view class="classroom">
		<view class="search">
			<view class="left">
				<u-icon name="search" color="#aaa" size="28"></u-icon>
				<input @click="goSearch" confirm-type="搜索" @confirm="confirmTap" v-model="search" placeholder="请输入查找内容" placeholder-style="color:#aeaeae" />
			</view>
			<view class="right" @click="chuangjian(`/pages/classroom/questionsIssue`)">+提问</view>
		</view>
		<view class="pubimgs">
			<swiper class="swiper" @change="swiperChange" :current="banner_current" :autoplay="true" interval="3000" duration="1000" circular="true">
				<swiper-item v-for="(item, index) in bannerimg" :key="index"  @click="bannernav(item)">
					<view class="swiper-item"><image :src="'https://www.qijiazhiguo.top' + bannerimg[index].BannerURL" mode=""></image></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="mainbody">
			<view  v-if="hotnotelist != '' && hotnotelist != null">
				<view class="node" @tap="goto(`/pages/classroom/question?key=` + hotnotelist.ID)">
					<view class="title">{{ hotnotelist.Title }}</view>
					<view class="content">
						<view class="text">{{ hotnotelist.Content }}</view>
						<view class="img"><image :src="'https://www.qijiazhiguo.top' + hotnotelist.Images[0]" mode=""></image></view>
					</view>
					<view class="extra">
						<view class="main">
							<image class="img" :src="hotnotelist.UserHeadImage" mode=""></image>
							<text class="t1">{{ hotnotelist.UserName }}</text>
							<text class="t2">{{ hotnotelist.PointNum }}赞</text>
							<text class="t2" space="nbsp">{{ ' ' }}· {{ hotnotelist.ReplyNum }}评论</text>
						</view>
						<view class="btn" @tap="goto(`/pages/classroom/question?key=` + hotnotelist.ID)">查看解答</view>
					</view>
					<view class="mark">
						<image src="../../static/classroom/icon1.png" style="width:30rpx;height:30rpx;"></image>
						<text class="t0">热门</text>
					</view>
				</view>
			</view>
			<view  v-else>
				<view class="contentwrap">
					<view style="text-align: center;justify-content: center;">
						<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
						<text style="color: #c7c7c7;">暂无提问信息</text>
					</view>
				</view>
			</view>
			<view class="randomImg">
				<view class="titlebar">
					<image class="icon" src="../../static/classroom/icon2.png" mode=""></image>
					<view class="title">齐老师聊教育</view>
				</view>
				<view class="content">
					<view class="content_view" v-for="(items,indexs) in bannerimg1" @click="videoApi(items,indexs)">
						<view>
							<image :src="'https://www.qijiazhiguo.top' + bannerimg1[indexs].BannerURL" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view v-for="(item, index) in hotnotelist_one">
				<view class="node" @tap="goto(`/pages/classroom/question?key=` + hotnotelist_one[index].ID)">
					<view class="title" style="text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">{{ hotnotelist_one[index].Title }}</view>
					<view class="content">
						<view class="text">{{ hotnotelist_one[index].Content }}</view>
						<view class="img"><image :src="'https://www.qijiazhiguo.top' + hotnotelist_one[index].Images[0]" mode=""></image></view>
					</view>
					<view class="extra">
						<view class="main">
							<image class="img" :src="hotnotelist_one[index].UserHeadImage" mode=""></image>
							<text class="t1">{{ hotnotelist_one[index].UserName }}</text>
							<text class="t2">{{ hotnotelist_one[index].PointNum }}赞</text>
							<text class="t2" space="nbsp">{{ ' ' }}· {{ hotnotelist_one[index].ReplyNum }}评论</text>
						</view>
						<view class="btn" @tap="goto(`/pages/classroom/question?key=` + hotnotelist_one[index].ID)">查看解答</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="false" class="tip">
			<image src="../../static/logo.png" mode=""></image>
			<text>努力加载中…</text>
		</view>
		<view class="floor">
			<image src="../../static/home/loadmore.png" mode=""></image>
			<view>已经到底啦 ~ ~</view>
		</view>
		<view class="videoPropu" v-if="videoPropu">
			<video style="width: 100%;" :src="'https://www.qijiazhiguo.top' + VideoAddr"></video>
			<view class="btns">
				<view class="btn_item" @click="videoClose">
					<image src="@/static/classroom/gb.png" class="img2"></image>
					<text class="t3">关闭</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			search_action_style: {
				marginLeft: '40rpx',
				fontSize: '32rpx',
				color: '#3567cb'
			},
			banner_current: 0,
			hotnotelist: [],
			hotnotelist_one: [],
			pageIndex: 1,
			search: '',
			bannerimg: [],
			bannerimg1: [],
			src: '',
			VideoAddr: '',
			blank:'',
			PointNum: '',
			videoPropu: false,
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
	onReachBottom() {
		this.pageIndex++;
		this.getdata();
	},
	onReady: function(res) {
	    // #ifndef MP-ALIPAY
	    this.videoContext = uni.createVideoContext('myVideo')
	    // #endif
	},
	onShow() {
		this.pageIndex = 1
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetHotNoteInfo',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			success: res => {
				console.log(res.data.Data);
				this.hotnotelist = res.data.Data;
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
			url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfoList',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				pageIndex: this.pageIndex,
				pageSize: 10,
			},
			success: res => {
				this.hotnotelist_one = res.data.Data;
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Banner/GetBannerManage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				type: 2
			},
			success: res => {
				this.bannerimg = res.data.Data;
				console.log(this.bannerimg);
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/Banner/GetBannerManage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				type: 3
			},
			success: res => {
				this.bannerimg1 = res.data.Data;
				console.log(this.bannerimg1);
			}
		});
	},
	methods: {
		bannernav(e){
			console.log(e)
			uni.navigateTo({
				url:'../home/nav?url=' + e.LinkUrl
			})
		},
		sendDanmu: function() {
		    this.videoContext.sendDanmu({
		        text: this.danmuValue,
		        color: this.getRandomColor()
		    });
		    this.danmuValue = '';
		},
		goSearch(){
			uni.navigateTo({
				url:'./classroomsearch?key=' + 1
			})
		},
		videoErrorCallback: function(e) {
		    uni.showModal({
		        content: e.target.errMsg,
		        showCancel: false
		    })
		},
		getRandomColor: function() {
		    const rgb = []
		    for (let i = 0; i < 3; ++i) {
		        let color = Math.floor(Math.random() * 256).toString(16)
		        color = color.length == 1 ? '0' + color : color
		        rgb.push(color)
		    }
		    return '#' + rgb.join('')
		},
		swiperChange(e) {
			this.banner_current = e.detail.current;
		},
		getdata() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfoList',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					pageIndex: this.pageIndex,
					pageSize: 10,
				},
				success: res => {
					if (res.data.Data == '') {
						uni.showLoading({
							title: '暂无更多评论',
							duration: 800
						});
					} else {
						this.hotnotelist_one.push(...res.data.Data);
					}
				}
			});
		},
		goto(url) {
			this.pageIndex = 1
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
		chuangjian(e){
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
					url:e
				})
			}
		},
		confirmTap: function() {
			let that = this;
			console.log('我点击了回车');
		},
		goToSearch() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfoList',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					pageIndex: this.pageIndex,
					pageSize: 10,
				},
				success: res => {
					console.log(res.data.Data);
					this.hotnotelist_one = res.data.Data;
				}
			});
			if (!this.search.trim()) {
				uni.showToast({
					title: '请输入搜索内容',
					icon: 'none'
				});
				return;
			}
			// uni.navigateTo({
			// 	url: `../../pagesA/list/listItem?search=${this.search}`
			// })
			this.search = '';
		},
		videoApi(item,index){
			console.log(item,index)
			this.VideoAddr=item.BannerVideoURL;
			this.PointNum=item.PointNum;
			this.videoPropu=true;
		},
		videoClose(){
			this.videoPropu=false;
		},
	}
};
</script>
<style lang="scss" scoped>
	.videoPropu{
		z-index: 10;
		position: fixed;left:0;top:0;width:100%;height:100%;background-color: rgba(0,0,0,.8);
		display: flex;align-items: center;justify-content: center;
		.myVideo{width:100%;height:424rpx;}
		.btns{
			position: fixed;left:0;bottom:100rpx;width:100%;height:68rpx;
			display: flex;align-items: center;justify-content:space-between;padding:56rpx 0;
			padding-left:100rpx;padding-right:60rpx;
			.btn_item{
				position: absolute;
				left: 32%;
				display:flex;align-items:center;justify-content:center;
				width:256rpx;height:68rpx;color:#fff;border-radius:34rpx;background:rgba(251,252,255,.2);
				.img1{width:32rpx;height:32rpx;margin-right:2rpx;}
				.img2{width:36rpx;height:36rpx;margin-right:20rpx;}
				.t1{min-width:16rpx;font-size:16rpx;font-weight:500;position:relative;left:0;top:-10rpx;margin-right:10rpx;}
				.t2{font-size: 24rpx;font-weight: 500;}
				.t3{font-size: 24rpx;font-weight: 500;}
			}
		}
	}
	/deep/ .u-scroll-box {
		.u-tab-item {
			padding: 0 !important;
			padding-right: 40rpx !important;
		}
	}
.classroom {
	padding-bottom: 48rpx;

	.search {
		padding: 22rpx 24rpx 22rpx 40rpx;
		background: #ffffff;
		border-top: 2rpx solid #eee;
		display: flex;
		align-items: center;

		.left {
			flex: 1;
			height: 64rpx;
			padding: 0 32rpx;
			background: #f7f7f7;
			border-radius: 34rpx;
			display: flex;
			align-items: center;

			input {
				flex: 1;
				margin: 0 16rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
			}
		}

		.right {
			margin-left: 6rpx;
			padding: 12rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #ff8a0c ;
		}
	}

	.pubimgs {
		background: #fff;
		padding: 20rpx 0;
		.swiper {
			width: 100%;
			height: 220rpx;
			swiper-item {
				width: 460rpx !important;
			}
			.swiper-item {
				margin-left: 20rpx;
				width: 440rpx !important;
				image {
					width: 440rpx;
					height: 220rpx;
				}
			}
		}
	}

	.mainbody {
		.node {
			margin-bottom: 20rpx;
			padding: 32rpx;
			background: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

			.title {
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
				line-height: 48rpx;
			}

			.content {
				margin: 30rpx 0 28rpx;
				display: flex;
				align-items: center;

				.text {
					margin-right: 32rpx;
					flex: 1;
					height: 128rpx;
					font-size: 30rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
					line-height: 42rpx;
					text-overflow: ellipsis;
																		
					display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																		
					-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																		
					-webkit-line-clamp: 3; /** 显示的行数 **/
																		
					overflow: hidden;  /** 隐藏超出的内容 **/
				}

				.img {
					image {
						width: 204rpx;
						height: 132rpx;
					}
				}
			}

			.extra {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.main {
					display: flex;
					align-items: center;
				}


				.img {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
				}

				text {
					height: 32rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					line-height: 32rpx;
				}

				.t1 {
					color: #999999;
					margin: 0 36rpx 0 12rpx;
				}

				.t2 {
					color: #aaaaaa;
				}

				.btn {
					width: 136rpx;
					height: 48rpx;
					margin-right: 16rpx;
					background: #ffffff;
					border: 2rpx solid #ff8a0c;
					border-radius: 26rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #ff8a0c;
					line-height: 44rpx;
				}
			}
		}

		.randomImg {
			margin: 36rpx 32rpx 40rpx;

			.titlebar {
				display: flex;
				align-items: center;

				.icon {
					width: 32rpx;
					height: 28rpx;
					background: #3567cb;
				}

				.title {
					margin-left: 20rpx;
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					color: #333333;
				}
			}

			.content {
				margin-top: 44rpx;
				overflow-x: auto;
				display: flex;
				align-items: center;
				white-space: nowrap;
				.content_view {
					margin-right: 10px;
					position: relative;
					image {
						width: 216rpx;
						height: 380rpx;
					}
					.time {
						position: absolute;
						right: 12rpx;
						top: 12rpx;
						padding: 0 20rpx;
						height: 32rpx;
						line-height: 32rpx;
						background: rgba(0, 0, 0, 0.3);
						border-radius: 16rpx;
						font-size: 22rpx;
						text-align: center;
						color: #ffffff;
					}
					.title {
						position: absolute;
						bottom: 0;
						width: 216rpx;
						height: 108rpx;
						background: rgba(0, 0, 0, 0.6);
						border-radius: 0px 0px 12rpx 12rpx;
						padding: 0 18rpx;
						padding-top: 32rpx;
						font-size: 20rpx;
						font-weight: 400;
						text-align: justify;
						color: #ffffff;
						line-height: 28rpx;
					}
				}
			}
		}
	}

	.tip {
		margin-top: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			margin-right: 16rpx;
			width: 24rpx;
			height: 24rpx;
		}

		text {
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: right;
			color: #aaaaaa;
		}
	}
}
.mark {
	margin-top:5px;
	margin-right: 28rpx;
	display: flex;
	align-items: center;
	image {
		width: 22rpx;
		height: 28rpx;
		background: #cc4c4c;
	}
	text {
		margin-left: 10rpx;
		color: #cc4c4c;
	}
}
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
</style>
