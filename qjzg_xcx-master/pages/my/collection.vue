<template>
	<view class="content">
		<view class="tab">
			<view style="display: flex;width: 100%;" v-for="(item,index) in simplelist" @tap="close(index,item)">
				<view :class="current == index ? 'node_lik nodeActive':'node_lik'" >
					<image src="../../static/logo.png" mode=""></image>
					<view class="nickname"> {{simplelist[index].Name}} </view>
				</view>
			</view>
		</view>
		<view class="mainbody" v-if="hotnotelist_one != ''">
			<view v-for="(item, index) in hotnotelist_one" :key="index">
				<view class="node" @tap="goto(`/pages/classroom/question?ID=` + 1 + '&key=' + item.ID)" v-if="current == 1">
					<view class="title">{{ item.Title }}</view>
					<view class="content">
						<view class="text">{{ item.Content }}</view>
						<view class="img"><image :src="'https://www.qijiazhiguo.top' + item.Image[0]" mode=""></image></view>
					</view>
					<view class="extraaa">
						<image :src="item.UserImage" mode=""></image>
						<text class="t1">{{ item.UserName }}</text>
						<text class="t2">{{ item.PointNum }}赞 · {{ item.ReplyNum }}评论</text>
					</view>
				</view>
				<view class="node" @tap="goto(`/pages/experience/paste?ID=` + 1 + '&key=' + item.ID)" v-else>
					<view class="title">{{ item.Title }}</view>
					<view class="content">
						<view class="text">{{ item.Content }}</view>
						<view class="img"><image :src="'https://www.qijiazhiguo.top' + item.Image[0]" mode=""></image></view>
					</view>
					<view class="extraaa">
						<image :src="item.UserImage" mode=""></image>
						<text class="t1">{{item.UserName }}</text>
						<text class="t2">{{ item.PointNum }}赞 · {{ item.ReplyNum }}评论</text>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 580px;align: center;background: #FFFFFF;text-align: center;padding-top: 120px;" v-else>
			<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
			<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无内容</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hotnotelist_one:[],
			pageIndex:1,
			simplelist:[{'Name':'分享收藏'},{'Name':'课堂收藏'}],
			current:0,
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
	onReachBottom () {
		console.log('触底了')
		this.pageIndex++
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserCollection/GetMyCollections',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				PageIndex: this.pageIndex,
				PageSize: 10,
				collectType:this.current,
				userId: wx.getStorageSync('ID')
			},
			success: res => {
				for(var i = 0;i<res.data.Data.length;i++){
					this.hotnotelist_one.push(res.data.Data[i])
				}
			}
		});
	},
	onLoad() {
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
			url: 'https://www.qijiazhiguo.top/api/UserCollection/GetMyCollections',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				PageIndex: this.pageIndex,
				PageSize: 10,
				collectType:this.current,
				userId: wx.getStorageSync('ID')
			},
			success: res => {
				this.hotnotelist_one = res.data.Data;
			}
		});
	},
	methods: {
		close(index,item) {
			this.current = index;
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserCollection/GetMyCollections',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					PageIndex: this.pageIndex,
					PageSize: 10,
					collectType:this.current,
					userId: wx.getStorageSync('ID')
				},
				success: res => {
					this.hotnotelist_one = res.data.Data;
				}
			});
		},
		goto(url) {
			uni.navigateTo({
				url
			});
			this.pageIndex = 1
		},
	}
};
</script>

<style lang="scss" scoped>
	.tab {
		display: flex;
		border-bottom: 2rpx solid #eeeeee;
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
	.mainbody {
		margin-top: 20rpx;
	
		.node {
			margin-bottom: 16rpx;
			padding: 32rpx 32rpx 34rpx;
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
				margin: 30rpx 0;
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
				}
	
				.img {
					image {
						width: 204rpx;
						height: 132rpx;
					}
				}
			}
	
			.extraaa {
				display: flex;
				align-items: center;
	
				image {
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
			}
		}
	
		.randomImg {
			margin: 24rpx;
	
			image {
				width: 100%;
				height: 320rpx;
				border-radius: 16rpx;
			}
		}
	}
</style>
