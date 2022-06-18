<template>
	<view class="content">
		<view class="contentink">
			<image style="width: 20px;height: 20px;" src="../../static/nav.png" mode="" @click="nav"></image>
			<view style="margin-left: 45%;font-size: 15px;font-weight: 500;line-height: 19px;margin-left: 40%;">
				{{title}}
			</view>
		</view>
		<view class="search">
			<view class="main">
				<u-icon name="search" color="#aaa" size="28"></u-icon>
				<input confirm-type="搜索" @confirm="confirmTap" v-model="search" placeholder="请输入查找内容" placeholder-style="color:#aeaeae" />
			</view>
		</view>
		<view class="" v-if="hotnotelist_one != ''">
			<view v-for="(item, index) in hotnotelist_one">
				<view v-if="type == 1">
					<view class="node" @tap="goto(`/pages/classroom/question?ID=` + 0 + '&key=' + hotnotelist_one[index].ID)">
						<view class="title">{{ hotnotelist_one[index].Title }}</view>
						<view class="content">
							<view class="text ">{{ hotnotelist_one[index].Content }}</view>
							<view class="img"><image :src="'https://www.qijiazhiguo.top' + hotnotelist_one[index].Images[0]" mode=""></image></view>
						</view>
						<view class="extra">
							<view class="main">
								<image class="img" :src="hotnotelist_one[index].UserHeadImage" mode=""></image>
								<text class="t1">{{ hotnotelist_one[index].UserName }}</text>
								<text class="t2">{{ hotnotelist_one[index].PointNum }}赞</text>
								<text class="t2" space="nbsp">{{ ' ' }}· {{ hotnotelist_one[index].ReplyNum }}评论</text>
							</view>
						</view>
					</view>
				</view>
				<view class="tabitem" v-else>
					<view class="node">
						<view @tap="goto(`/pages/home/activityDetail?state=2` + '&id=' + hotnotelist_one[index].ID + '&userId=' + keyid)">
							<view class="mainbody">
								<view :class="['img', { imgHot: index == 0 || index == 1 }]"><image :src="'https://www.qijiazhiguo.top' + hotnotelist_one[index].FrontCoverImage" mode=""></image></view>
								<view class="main">
									<view class="title">{{ hotnotelist_one[index].ActivityName }}</view>
									<view class="site" style="line-height: 30rpx;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">{{ hotnotelist_one[index].Address }}</view>
								</view>
							</view>
							<view class="extra">
								<view class="time">{{hotnotelist_one[index].CreateTime}}</view>
								<view class="price">
									<view v-if="hotnotelist_one[index].Price == 0"><text class="">免费</text></view>
									<view v-else>
										<text class="flag">￥</text>
										<text class="">{{ hotnotelist_one[index].Price }}</text>
									</view>
								</view>
							</view>
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
				search:'',
				hotnotelist_one:[],
				pageIndex:1,
				type:'',
				blank:'',
				title:''
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
		onLoad(option) {
			console.log(option)
			this.type = option.key
			if(option.key == 1){
				this.title = '课堂'
			}else{
				this.title = '活动'
			}
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
			goto(url) {
				uni.navigateTo({
					url
				});
			},
			confirmTap: function() {
				let that = this;
				console.log('我点击了回车');
				console.log(this.search)
				that.goToSearch();
			},
			goToSearch() {
				let that = this
				if(this.type == 1){
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfoList',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: {
							pageIndex: that.pageIndex,
							pageSize: 10,
							Title: this.search
						},
						success: res => {
							console.log(res.data.Data);
							that.hotnotelist_one = res.data.Data;
						}
					});
				}else{
					let arr = {
						PageIndex: 1,
						PageSize: 10,
						Country:'',
						TimeType:1,
						"Title":this.search,
					}
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/Activities/GetListView',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: arr,
						success: res => {
							that.hotnotelist_one = res.data.Data;
							if (res.data.TotalCount == 0) {
								uni.showToast({
									title: '暂无搜索数据',
									icon: 'none'
								});
								return;
							}
						}
					});
				}
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
			nav(){
				uni.switchTab({
					url:'../home/home'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contentink{
		background: #ffffff;
		
		padding: 50px 10px 10px 10px;
		display: flex;
		height: 90px;
	}
	.search {
		margin-top: 20px;
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
	}
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
			text-overflow: ellipsis;
																
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
																
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
																
			-webkit-line-clamp: 2; /** 显示的行数 **/
																
			overflow: hidden;  /** 隐藏超出的内容 **/
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
	
			.mark {
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
				border: 2rpx solid #3567cb;
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #3567cb;
				line-height: 44rpx;
			}
		}
	}
	.tabitem {
		padding: 0 16px 0 16rpx;
		border-radius: 16px;
		.node {
			margin-top: 8rpx;
			padding: 28rpx 16px;
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
					content: '热门';
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
					}
	
					.site {
						margin-top: 18rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #aaaaaa;
					}
				}
			}
	
			.extra {
				margin-top: 24rpx;
				display: flex;
				justify-content: space-between;
	
				.time {
					height: 40rpx;
					font-size: 26rpx;
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
</style>
