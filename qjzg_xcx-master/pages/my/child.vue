<template>
	<view class="child">
		<view>
			<view class="userinfo" v-if="homelist != ''">
				<view class="titlebar">
					<view class="title">活动统计</view>
					<view class="change">
						<picker :range="namelist" @change="namechange">
							<text>切换子女</text>
							<u-icon name="arrow-right" size="24" color="#ccc"></u-icon>
						</picker>
					</view>
				</view>
				<view class="user">
					<image :src="'https://www.qijiazhiguo.top' + homelist[namevalue].HeadImage" mode=""></image>
					<view class="nickname">{{ homelist[namevalue].Name }}</view>
				</view>
				<view class="info">
					<view class="per">
						<view class="value">
							<text class="t1">{{ homelist[namevalue].StudyTime }}</text>
							<text class="t2">天</text>
						</view>
						<view class="key">学习时间</view>
					</view>
					<view class="per" @tap="goto(`/pages/my/activity?current=` + namevalue)">
						<view class="value">{{homelist2.ActivityNum }}</view>
						<view class="key">参与活动</view>
					</view>
					<view class="per" @tap="goto(`/pages/my/childAward?ID=` + keyid)">
						<view class="value">{{homelist2.MedalNum }}</view>
						<view class="key">获得荣誉</view>
					</view>
				</view>
			</view>
			<view style="text-align: center;justify-content: center;height: 210px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;" v-else>
				<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
				<text style="color: #c7c7c7;">暂无添加子女信息</text>
			</view>
		</view>
		<view class="" style="margin: 10px 0;">
			<view class="character" v-if="zhuangtai1 || zhuangtai">
				<view class="titlebar">性格心理分析</view>
				<view class="main">
					<view class="charts-box"><qiun-data-charts type="radar" :chartData="chartData" /></view>
				</view>
			</view>
			<view class="character" style="text-align: center;justify-content: center;height: 210px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;" v-else>
				<view class="titlebar">性格心理分析</view>
				<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
				<text style="color: #c7c7c7;">暂无性格数据</text>
			</view>
		</view>
		<view class="feedback">
			<view class="titlebar">
				<view class="title">活动反馈</view>
			</view>
			<view class="">
				<view class="content" v-if="Feedbacks != ''">
					<view class="node" v-for="(item, index) in Feedbacks" :key="index">
						<view class="img"><image :src="'https://www.qijiazhiguo.top' + Feedbacks[index].TeacherImage" mode=""></image></view>
						<view class="main" @tap="fun(index)">
							<view class="up">
								<view class="name" style="flex:1;">{{ Feedbacks[index].TeacherName }}</view>
								<u-icon :name="list[index].isFold ? 'arrow-up' : 'arrow-down'" size="22" color="#aaa"></u-icon>
							</view>
							<view class="down" :class="[list[index].isFold ? 'ellipsis2' : '']">{{ Feedbacks[index].Content }}</view>
						</view>
					</view>
				</view>
				<view style="text-align: center;justify-content: center;height: 210px; background-color: #FFFFFF;border-radius: 10px;padding-top: 10px;" v-else>
					<image style="width: 120px;height: 120px; margin: 20px 0 20px 100px;" :src="blank" mode=""></image>
					<text style="color: #c7c7c7;">暂无反馈</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			chartData: {
				categories: [],
				series: [
					{
						name: '本年度得分',
						data: [],
						color: '#7aaaff'
					},
					{
						name: '上年度得分',
						data: [],
						color: '#ff931d'
					}
				]
			},
			list: [
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: false, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				},
				{
					isFold: true, //是否折叠
					title:
						'能歌善舞、兴趣广泛、知识全面、思维敏捷，语言丰富，与众不同，棒极了。朗读课文很有感情，学习接受能力强，按时认真完成作业，老师和同学会更喜欢你。老师相信你能改正这些毛病的。希望你再接再励，更上一层楼！'
				}
			],
			homelist: [],
			namelist: [],
			namevalue: 0,
			timelist: ['21-01', '21-02', '21-03', '21-04', '21-05', '21-06', '21-07', '21-08', '21-09', '21-10', '21-11', '21-12'],
			Feedbacks: [],
			zhuangtai: true,
			zhuangtai1: true,
			chaildId:'',
			homelist2:[],
			blank:'',
			keyid:'',
			pageIndex:1,
			isFold:true,
			keytoid:''
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
		this.feedbacks(this.keytoid);
	},
	onLoad(option) {
		this.pageIndex = 1
		this.namevalue = option.value
		console.log(option)
		this.chaildId = option.id
		let that = this;
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildren',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data: {
				parentId: wx.getStorageSync('ID')
			},
			success: res => {
				this.homelist = res.data.Data;
				for (var i = 0; i < res.data.Data.length; i++) {
					that.namelist.push(res.data.Data[i].Name);
				}
				if(option.id == null){
					this.keytoid = res.data.Data[0].ID
					console.log(res.data.Data[0].ID);
					this.getuserbehavior(res.data.Data[0].ID);
					this.feedbacks(res.data.Data[0].ID);
				}else{
					this.keytoid = option.id
					this.getuserbehavior(option.id);
					this.feedbacks(option.id);
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
		fun(index) {
		  this.list[index].isFold = !this.list[index].isFold
		},
		getuserbehavior(id) {
			this.keyid = id
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Child/GetUserBehaviorNew',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: id
				},
				success: res => {
					if (res.data.ReturnCode == 500) {
						this.zhuangtai = false;
					} else {
						this.zhuangtai = true;
					}
					for (var i = 0, k = 0, arr = []; i < res.data.Data.length; i++) {
						this.chartData.categories.push(res.data.Data[i].BehaviorName);
						arr.push(res.data.Data[i].Score);
						this.chartData.series[k].data = arr;
					}
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Child/GetUserBehaviorHistory',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: id
				},
				success: res => {
					console.log('奥术大师大',res.data)
					if (res.data.ReturnCode == 500) {
						this.zhuangtai1 = false;
					} else {
						this.zhuangtai1 = true;
					}
					console.log(res.data.Data);
					for (var i = 0, k = 1; i < res.data.Data.length; i++) {
						this.chartData.series[k].data.push(res.data.Data[i].Score);
						this.chartData.categories.push(res.data.Data[i].BehaviorName)
					}
				}
			});
		},
		feedbacks(id) {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Child/GetChildJoinNums',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:id,
					startTime: this.startTime,
					endTime:this.endTime,
				},
				success: res => {
					console.log(res.data.Data)
					this.homelist2 = res.data.Data
				},
			})
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetMyActFeedbacks',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: id,
					startTime: this.timelist[1] + '-01',
					endTime: this.timelist[1] + '-31',
					pageIndex:this.pageIndex,
					pageSize:10,
				},
				success: res => {
					console.log(res.data.Data);
					for(var i=0;i<res.data.Data.length;i++){
						this.Feedbacks.push(res.data.Data[i])
					}
				}
			});
		},
		goto(url) {
			uni.navigateTo({
				url
			});
		},
		namechange(e) {
			console.log(e);
			this.chartData.categories = []
			this.chartData.series[0].data = []
			this.chartData.series[1].data = []
			this.namevalue = e.detail.value;
			this.getuserbehavior(this.homelist[this.namevalue].ID);
			this.feedbacks(this.homelist[this.namevalue].ID);
			
		}
	}
};
</script>
<style lang="scss" scoped>
.child {
	padding: 24rpx 24rpx 48rpx;
	.userinfo {
		padding: 36rpx 40rpx 48rpx;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
		.titlebar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				height: 32rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}
			.change {
				text {
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #cccccc;
				}
				u-icon {
					margin-left: 6rpx;
				}
			}
		}
		.user {
			margin: 48rpx 0 54rpx;
			image {
				margin: 0 auto;
				width: 136rpx;
				height: 136rpx;
				border: 2rpx solid #ecf1f6;
				border-radius: 70rpx;
			}
			.nickname {
				margin-top: 28rpx;
				height: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #333333;
			}
		}
		.info {
			margin: 0 20rpx;
			display: flex;
			justify-content: space-between;
			.per {
				.value {
					height: 32rpx;
					font-size: 32rpx;
					font-family: DINAlternate, DINAlternate-Bold;
					font-weight: 700;
					text-align: center;
					color: #333333;
				}
				.key {
					margin-top: 22rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
	.character {
		margin: 20rpx 0;
		padding: 36rpx 40rpx 0;
		// padding: 36rpx 40rpx 48rpx;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
		.titlebar {
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #333333;
		}
		.main {
			// margin: 52rpx 0 48rpx;
			margin: 36rpx 0 0;
			height: 578rpx;
			/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
			.charts-box {
				width: 614rpx;
				height: 570rpx;
			}
		}
		.extra {
			margin: 0 130rpx;
			display: flex;
			justify-content: space-between;
			.explain {
				height: 24rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #666666;
				display: flex;
				align-items: center;
				&::before {
					content: '';
					display: block;
					width: 24rpx;
					height: 24rpx;
					border-radius: 50%;
					margin-right: 12rpx;
				}
			}
			.exp1::before {
				background: #d6e7ff;
				border: 2rpx solid #7aaaff;
			}
			.exp2::before {
				background: #ffe9d6;
				border: 2px solid #ff931d;
			}
		}
	}
	.feedback {
		padding: 36rpx 40rpx 48rpx;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ebebeb;
		.titlebar {
			display: flex;
			justify-content: space-between;
			.title {
				height: 36rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
				line-height: 36rpx;
			}
			.time {
				height: 36rpx;
				font-size: 36rpx;
				font-family: DINAlternate, DINAlternate-Bold;
				font-weight: 700;
				color: #333333;
				display: flex;
				align-items: center;
				u-icon {
					margin-left: 14rpx;
				}
			}
		}
		.content {
			.node {
				margin: 20rpx 0;
				padding: 24rpx 28rpx;
				background: #fbfbfc;
				border-radius: 18rpx;
				display: flex;
				.img > image {
					width: 62rpx;
					height: 62rpx;
					background: linear-gradient(180deg, #74abff, #3477ca);
					border-radius: 50%;
				}
				.main {
					margin-left: 24rpx;
					.up {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.name {
							height: 36rpx;
							font-size: 28rpx;
							font-family: PingFangSC, PingFangSC-Medium;
							font-weight: 500;
							color: #333333;
							line-height: 36rpx;
						}
					}
					.down {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #666666;
						line-height: 40rpx;
					}
				}
			}
		}
	}
}
</style>
