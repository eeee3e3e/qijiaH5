<template>
	<view class="">
		<view class="tab">
			<view style="display: flex;width: 100%;" v-for="(item,index) in simplelist" @tap="close(index,item)">
				<view :class="current == index ? 'node_lik nodeActive':'node_lik'" >
					<image src="../../static/logo.png" mode=""></image>
					<view class="nickname"> {{simplelist[index].Name}} </view>
				</view>
			</view>
		</view>
		<view class="yearEndReport" v-if="hotnotelist != ''">
			<view class="node" v-for="(item, index) in hotnotelist" :key="item">
				<view class="imgpos"><image src="../../static/my/bg.png" mode=""></image></view>
				<view class="main">
					<view class="t1">{{ hotnotelist[index].Year }}</view>
					<view class="t2">年终总结报告</view>
					<view class="btn" @tap="goto(`/pages/my/yearReportDetail?id=` + hotnotelist[index].UserID + '&SourceID=' + hotnotelist[index].ID + '&current=' + current + '&Year=' + hotnotelist[index].Year)">点击开启</view>
				</view>
			</view>
		</view>
		<view v-else style="text-align: center;justify-content: center;height: 700px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;">
			<image style="margin: 160px 0 0 80px;width: 230px;height: 230px;" :src="blank" mode=""></image>
			<text style="color: #c7c7c7;">暂无年终报告</text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			hotnotelist: [],
			keyid: '',
			current:0,
			simplelist:[],
			blank:''
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
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildrenSimple',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				parentId: wx.getStorageSync('ID'),
			},
			success: res => {
				console.log(res.data.Data);
				this.simplelist = res.data.Data;
				if(options.current == null){
					this.close(0,res.data.Data[0])
				}else{
					this.close(options.current,res.data.Data[options.current])
					console.log(222)
				}
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
	},
	methods: {
		goto(url) {
			uni.navigateTo({ url });
		},
		close(index,item) {
			this.current = index;
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserYearReport/GetUserYearReports',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId:item.ID,
					pageIndex: 1,
					pageSize: 10
				},
				success: res => {
					console.log(res.data.Data);
					this.hotnotelist = res.data.Data;
				}
			});
		}
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
.yearEndReport {
	padding-top: 4rpx;
	padding-bottom: 50rpx;
	.node {
		margin: 20rpx auto;
		position: relative;
		width: 702rpx;
		padding: 72rpx 40rpx 36rpx;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 12rpx;
		.imgpos {
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
		}
		.main {
			.t1 {
				height: 80rpx;
				font-size: 80rpx;
				font-family: FZQUHJW, FZQUHJW-Regular;
				font-weight: 400;
				text-align: right;
				color: #ffffff;
			}
			.t2 {
				margin: 12rpx 0 20rpx;
				height: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: right;
				color: #ffffff;
			}
			.btn {
				margin-left: auto;
				width: 120rpx;
				height: 44rpx;
				border: 2rpx solid #ffffff;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 40rpx;
			}
		}
	}
}
</style>
