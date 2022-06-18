<template>
	<view class="pastes">
		<view class="header">
			<image src="../../static/experience/list.jpg" mode="" class="bgimg"></image>
			<view class="mainbd">
				<view class="img"><image :src="'https://www.qijiazhiguo.top' + hotnotelist_one.IconUrl" mode=""></image></view>
				<view class="main">
					<view class="title">{{hotnotelist_one.Name}}</view>
					<view class="extra">
						<view>发布 {{Numslist.PostsNum}}</view>
						<view>评论 {{Numslist.ReplyNum}}</view>
					</view>
				</view>
			</view>
			<view class="pos">
				<view class="main">
					<text class="mark">置顶</text>
					<text>{{GetTopMessage}}</text>
				</view>
			</view>
		</view>
		<view class="mainbody" v-if="hotnotelist != ''">
			<view v-for="(item, index) in hotnotelist" :key="index">
				<view class="node" @tap="goto(`/pages/experience/paste?ID=` + 1 + '&key=' + hotnotelist[index].ID)">
					<view class="title">{{ hotnotelist[index].Title }}</view>
					<view class="content">
						<view class="text">{{ hotnotelist[index].Experience }}</view>
						<view class="img"><image :src="'https://www.qijiazhiguo.top' + hotnotelist[index].Urls[0]" mode=""></image></view>
					</view>
					<view class="extra">
						<image :src="hotnotelist[index].HeadImage" mode=""></image>
						<text class="t1">{{ hotnotelist[index].UserName }}</text>
						<text class="t2">{{ hotnotelist[index].PointNum }}赞 · {{ hotnotelist[index].ReplyNum }}评论</text>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 580px;align: center;background: #FFFFFF;text-align: center;padding-top: 120px;" v-else>
			<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
			<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无内容</text>
		</view>
		<view v-if="false" class="tip">
			<image src="../../static/logo.png" mode=""></image>
			<text>努力加载中…</text>
		</view>
		<view class="fixed">
			<view class="btn" @click="toTop"><image :src="rocket" mode=""></image></view>
			<view class="btn" @click="chuangjian"><image :src="add" mode=""></image></view>
		</view>
		<view v-show="isPop" class="popup">
			<view class="mainbd">
				<view class="menus">
					<view
						class="menu"
						@tap="
							goto(`/pages/experience/pastesIssue?id=` + hotnotelist_one.ID);
							isPop = false;
						"
					>
						<image :src="note_1" mode=""></image>
						<view class="title">文字</view>
					</view>
					<view
						class="menu"
						@tap="
							goto(`/pages/experience/pastesIssue?id=` + hotnotelist_one.ID);
							isPop = false;
						"
					>
						<image :src="note_2" mode=""></image>
						<view class="title">拍摄</view>
					</view>
					<view
						class="menu"
						@tap="
							goto(`/pages/experience/pastesIssue?id=` + hotnotelist_one.ID);
							isPop = false;
						"
					>
						<image :src="note_3" mode=""></image>
						<view class="title">相册</view>
					</view>
				</view>
				<view class="del" @tap="isPop = false"><image src="../../static/experience/close.jpg" mode=""></image></view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			isPop: false,
			hotnotelist: [],
			Numslist:[],
			hotnotelist_one:[],
			keyid:'',
			GetTopMessage:'',
			rocket:'',
			add:'',
			blank:'',
			note_1:'',
			note_2:'',
			note_3:''
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
		this.urljiekou(this.keyid)
	},
	onLoad(option) {
		this.keyid = option.ID
		console.log(option)
		this.urljiekou(option.ID)
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'rocket'
			},
			success: res => {
				this.rocket = 'https://www.qijiazhiguo.top' + res.data.Data
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'add'
			},
			success: res => {
				this.add = 'https://www.qijiazhiguo.top' + res.data.Data
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
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'note1'
			},
			success: res => {
				this.note_1 = 'https://www.qijiazhiguo.top' + res.data.Data
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'note2'
			},
			success: res => {
				this.note_2 = 'https://www.qijiazhiguo.top' + res.data.Data
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'note3'
			},
			success: res => {
				this.note_3 = 'https://www.qijiazhiguo.top' + res.data.Data
			}
		});
	},
	methods: {
		goto(url) {
			uni.navigateTo({
				url
			});
		},
		toTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		chuangjian(){
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
				this.isPop = true
			}
		},
		urljiekou(id){
			let that = this
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetTopMessage',
				data: {
					typeId:id
				},
				success: res => {
					console.log('zhe',res.data)
					this.GetTopMessage = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetAdultTypes',
				success: res => {
					console.log(res.data.Data)
					for(var i=0;i<res.data.Data.length;i++){
						if(res.data.Data[i].ID == id){
							that.hotnotelist_one = res.data.Data[i]
						}
					}
				},
			})
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetExperienceAdults',
				data: {
					typeId: id,
					pageIndex: 1,
					pageSize: 10
				},
				success: res => {
					console.log(res.data.Data);
					this.hotnotelist = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetNums',
				data: {
					typeId:id,
				},
				success: res => {
					this.Numslist = res.data.Data;
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.pastes {
	padding-bottom: 48rpx;

	.header {
		position: relative;
		.bgimg {
			width: 100%;
			height: 240rpx;
		}
		.mainbd {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 240rpx;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 60rpx 48rpx 100rpx;
			display: flex;
			align-items: center;

			.img {
				width: 80rpx;
				height: 80rpx;
				border: 2rpx solid #979797;
				border-radius: 24rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.main {
				margin-left: 28rpx;

				.title {
					height: 36rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					color: #ffffff;
				}

				.extra {
					margin-top: 12rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #ffffff;
					display: flex;

					view {
						margin-right: 32rpx;
					}
				}
			}
		}
		.pos {
			position: absolute;
			top: 196rpx;
			left: 40rpx;
			width: 670rpx;
			padding: 44rpx 40rpx;
			background: #ffffff;
			border-radius: 12rpx;
			box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;

			.main {
				height: 32rpx;

				text {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
				}

				.mark {
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					color: #0066ff;
					margin-right: 40rpx;
				}
			}
		}
	}

	.mainbody {
		margin-top: 112rpx;

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
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
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

	.fixed {
		position: fixed;
		right: 32rpx;
		bottom: 298rpx;

		.btn {
			margin-top: 32rpx;
			width: 108rpx;
			height: 108rpx;
			background: #ffffff;
			border-radius: 50%;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.btn1 {
			border: 2rpx solid #e4e4e4;
		}

		.btn1 {
			border: 2rpx solid #4d4d4d;
		}
	}

	.popup {
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
			padding: 60rpx 80rpx 72rpx;
			background: #ffffff;
			border-radius: 24rpx;

			.menus {
				display: flex;
				justify-content: space-between;

				.menu {
					image {
						margin: 0 auto 24rpx;
						width: 112rpx;
						height: 112rpx;
						background: linear-gradient(180deg, #5998ff, #5b80ff 100%);
						border-radius: 36rpx;
					}

					.title {
						height: 32rpx;
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #333333;
					}
				}
			}

			.del {
				margin: 104rpx auto 0;
				width: 36rpx;
				height: 36rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
