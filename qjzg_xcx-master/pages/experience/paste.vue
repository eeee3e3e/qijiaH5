<template>
	<view class="paste">
		<view class="mainbody">
			<view class="titlebar">{{ hotnotelist.Title }}</view>
			<view class="userinfo">
				<image v-if="panduan" class="photo" :src="hotnotelist.UserHeadImage" mode=""></image>
				<image v-else class="photo" :src="hotnotelist.HeadImage" mode=""></image>
				<view class="main">
					<view class="up">
						<view class="nickname">{{ hotnotelist.UserName }}</view>
						<view class="vip" v-if="panduan"><image src="../../static/experience/hg.jpg" mode="" style="width:34rpx;height:28rpx;"></image></view>
					</view>
				</view>
				<view v-if="focusvalue == 0" class="btn" @click="focus">+关注</view>
				<view v-if="focusvalue == 1" class="btnnet" @click="focus_one">已关注</view>
			</view>
			<view class="content">
				<view v-if="panduan">
					<view class="characters">{{ hotnotelist.Content }}</view>
					<view class="imgs" v-for="(item, index) in hotnotelist.Images" :key="index">
						<image :src="'https://www.qijiazhiguo.top' + hotnotelist.Images[index]" mode="widthFix"></image>
					</view>
				</view>
				<view v-else>
					<view class="characters">{{ hotnotelist.Experience }}</view>
					<view class="imgs" v-for="(items, indexs) in imglist"><image :src="'https://www.qijiazhiguo.top' + imglist[indexs]" mode="widthFix"></image></view>
				</view>
			</view>
			<view class="menus">
				<view class="menu">
					<button open-type="share">
						<text class="iconfont">{{ '\ue606' }}</text>
						<text class="text">分享</text>
					</button>
				</view>
				<view class="menu" @tap="goto('/pages/experience/pasteComment?ID=' + zhuangtai + '&authorUserID=' + authorUserID + '&experienceId=' + experienceId)">
					<text class="iconfont">{{ '\ue63d' }}</text>
					<text class="text">{{ hotnotelist.ReplyNum }}</text>
				</view>
				<view class="menu" @click="PointNum">
					<text v-if="!hotnotelist.CurrentLookUserIsPoint" class="iconfont1">{{ '\ue603' }}</text>
					<text v-else class="iconfont1">{{ '\ue627' }}</text>
					<text class="text">{{ PointNumnum }}</text>
				</view>
			</view>
		</view> 
		<view class="comment">
			<view class="titlebar">全部评论（{{ hotnotelist.ReplyNum }}）</view>
			<view class="body" v-if="comment != ''">
				<view class="node" v-for="(item, index) in comment" :key="index">
					<image class="photo" :src="comment[index].HeadImage" mode=""></image>
					<view class="main">
						<view class="up">
							<view class="left">
								<view class="nickname">{{ comment[index].UserName }}</view>
								<view class="time">{{ comment[index].CreateTime }}</view>
							</view>
							<view class="right" @click="PointNum1(comment[index].ID)">
								<text v-if="!comment[index].CurrentLookUserIsPoint" class="iconfont">{{ '\ue603' }}</text>
								<text v-else class="iconfont color">{{ '\ue627' }}</text>
								<view v-if="comment[index].PointNum == 0" class="v">赞</view>
								<view v-else class="v color">{{ comment[index].PointNum }}</view>
							</view>
						</view>
						<view class="down">{{ comment[index].ReplyContent }}</view>
						<view style="position: relative;left: 90%;top: -9%;font-size: 12px;color: red;"v-if="keyid === comment[index].UserID" @click="delet(item)">
							删除
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 310px;text-align: center;background: #FFFFFF;" v-else>
				<image style="width: 320px;height: 260px;padding: 20px 0 0 80px;" :src="blank" mode=""></image>
				<text style="color: #CCCCCC;font-size: 18px;margin-top: 15px 0;">暂无评论</text>
			</view>
		</view>
		<view class="posReply">
			<view class="reply">
				<image src="../../static/my/photoLogin.png" mode=""></image>
				<input confirm-type="搜索" @confirm="confirmTap" v-model="search" placeholder="我来说两句" />
			</view>
			<view class="menus">
				<view class="menu">
					<text class="iconfont">{{ '\ue63d' }}</text>
					<!-- <view class="pos">25</view> -->
				</view>
				<view class="menu">
					<button open-type="share">
						<text class="iconfont">{{ '\ue606' }}</text>
					</button>
				</view>
				<view class="menu" @click="llection">
					<text v-if="Collection != 1" class="iconfont1">{{ '\ue658' }}</text>
					<text v-else class="iconfont1">{{ '\ue8bc' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			hotnotelist: [],
			comment: [],
			panduan: true,
			search: '',
			Pointnum1: true,
			imglist: [],
			keyid: '',
			authorUserID: '',
			zhuangtai: 0,
			focusUserId:'',
			rootid:'',
			PointNumnum:'',
			pageIndex:1,
			Collection:0,
			focusvalue:0,
			experienceId:'',
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
	onReachBottom () {
		console.log('触底了')
		this.pageIndex++
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					experienceId: this.hotnotelist.ID,
					currentLookUserId: wx.getStorageSync('ID'),
					pageIndex: this.pageIndex,
					pageSize: 10
				},
				success: res => {
					for(var i = 0;i<res.data.Data.length;i++){
						this.comment.push(res.data.Data[i])
					}
				}
			});
	},
	onLoad(option) {
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
		console.log(option);
		let that = this;
		this.zhuangtai = option.ID;
		this.authorUserID = option.key;
		this.keyid = wx.getStorageSync('ID');
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetExperienceAdult',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					id: option.key,
					currentLookUserId: wx.getStorageSync('ID')
				},
				success: res => {
					this.hotnotelist = res.data.Data;
					this.experienceId = res.data.Data.ID
					console.log(this.hotnotelist);
					this.imglist = res.data.Data.Urls;
					this.panduan = false;
					this.PointNumnum = res.data.Data.PointNum
					if(res.data.Data.CurrentLookUserIsCollect == false){
						this.Collection = 0
					}else{
						this.Collection = 1
					}
					if(res.data.Data.CurrentLookUserIsFocus == false){
						this.focusvalue = 0
					}else{
						this.focusvalue = 1
					}
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					experienceId: option.key,
					currentLookUserId: wx.getStorageSync('ID'),
					pageIndex: this.pageIndex,
					pageSize: 10
				},
				success: res => {
					this.comment = res.data.Data;
				}
			});
	},
	methods: {
		goto(url) {
			uni.redirectTo({
				url
			});
		},
		delet(e){
			let that = this
			console.log(e)
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Reply/DeleteReplyWeb/' + e.ID + '?userId=' + wx.getStorageSync('ID'),
				method:'DELETE',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				success: res => {
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetExperienceAdult',
						data: {
							id: that.hotnotelist.ID,
							currentLookUserId: wx.getStorageSync('ID')
						},
						success: res => {
							that.hotnotelist = res.data.Data;
							console.log(that.hotnotelist);
							that.imglist = res.data.Data.Urls;
						}
					});
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: {
							experienceId: that.hotnotelist.ID,
							currentLookUserId: wx.getStorageSync('ID'),
							pageIndex: 1,
							pageSize: 10
						},
						success: res => {
							that.comment = res.data.Data;
						}
					});
				}
			});
		},
		PointNum() {
			let that = this
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/UserPoint',
					method: 'POST',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						userId: wx.getStorageSync('ID'),
						sourceId: this.authorUserID
						// authorUserID:this.authorUserID,
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
						}else{
							console.log(res.data.Data);
							this.PointNumnum = res.data.Data.PointNum
							this.Pointnum = res.data.Data.returnInt;
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetExperienceAdult',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data: {
									id: that.hotnotelist.ID,
									currentLookUserId: wx.getStorageSync('ID')
								},
								success: res => {
									that.hotnotelist = res.data.Data;
									console.log(that.hotnotelist);
									that.imglist = res.data.Data.Urls;
								}
							});
						}
					}
				});
		},
		PointNum1(id) {
			let that = this
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/UserPoint',
				method: 'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: this.keyid,
					sourceId: id,
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
					}else{
						console.log(res.data.Data);
					this.Pointnum1 = res.data.Data.PointNum;
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						data: {
							experienceId: that.hotnotelist.ID,
							currentLookUserId: wx.getStorageSync('ID'),
							pageIndex: 1,
							pageSize: 10
						},
						success: res => {
							console.log('这里这里', res.data.Data);
							that.comment = res.data.Data;
						}
					});
					}
					
				}
			});
		},
		focus() {
			if(wx.getStorageSync('ID') && wx.getStorageSync('openID') != ''){
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/UserInfo/AddUserFocus',
					method: 'POST',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						userId: this.keyid,
						focusUserId: this.hotnotelist.UserID
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
						this.focusvalue = 1;
					}
				});
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
		focus_one() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/CancelUserFocus',
				method: 'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: this.keyid,
					focusUserId: this.hotnotelist.UserID
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
					this.focusvalue = 0;
				}
			});
		},
		confirmTap: function() {
			let that = this;
			console.log('我点击了回车');
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/AddReply',
					method: 'POST',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						userId: this.keyid,
						content: this.search,
						sourceId: this.hotnotelist.ID,
						authorUserID: this.authorUserID,
						rootId: this.rootid
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
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetExperienceAdult',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								id: that.hotnotelist.ID,
								currentLookUserId: wx.getStorageSync('ID')
							},
							success: res => {
								that.hotnotelist = res.data.Data;
								console.log(that.hotnotelist);
								that.imglist = res.data.Data.Urls;
							}
						});
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ExchangeExperienceAdult/GetOneExperienceReply',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								experienceId: that.hotnotelist.ID,
								currentLookUserId: wx.getStorageSync('ID'),
								pageIndex: 1,
								pageSize: 10
							},
							success: res => {
								that.comment = res.data.Data;
							}
						});
					}
				});
			uni.navigateTo({
				url: `../../pagesA/list/listItem?search=${this.search}`
			});
			this.search = '';
		},
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
		        path: `pages/experience/paste?ID=` + that.zhuangtai + '&key=' + that.authorUserID, //转发的路径
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
		llection() {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserCollection/UserCollection',
				method: 'POST',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userId: wx.getStorageSync('ID'),
					sourceId: this.hotnotelist.ID,
					authorUserID: this.hotnotelist.UserID,
					type: 0
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
					this.Collection = res.data.Data
				}
			});
		}
	}
};
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
.iconfont1 {
	font-family: uniicons;
	font-size: 40rpx;
	color: #ff8a0c;
}

.paste {
	padding: 1rpx 0 140rpx;

	.mainbody {
		padding: 28rpx 32rpx 0;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

		.titlebar {
			font-size: 38rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #333333;
			line-height: 60rpx;
		}

		.userinfo {
			margin: 36rpx 0 40rpx;
			display: flex;
			align-items: center;

			.photo {
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
			}

			.main {
				flex: 1;
				margin-left: 16rpx;

				.up {
					display: flex;

					.nickname {
						margin-left: 2rpx;
						height: 32rpx;
						font-size: 30rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
						line-height: 32rpx;
					}

					.vip {
						margin-left: 16rpx;

						image {
							width: 32rpx;
							height: 32rpx;
						}
					}
				}

				.down {
					margin-top: 10rpx;
					height: 28rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
					line-height: 28rpx;
				}
			}

			.btn {
				width: 140rpx;
				height: 64rpx;
				background: #f5a236;
				border-radius: 12rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 64rpx;
			}
			.btnnet {
				width: 140rpx;
				height: 64rpx;
				background: #ffffff;
				border: 1px #f5a236 solid;
				border-radius: 12rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #f5a236;
				line-height: 64rpx;
			}
		}

		.content {
			.characters {
				font-size: 32rpx;
				// font-family: PingFangSC, PingFangSC-Regular;
				// font-weight: 400;
				color: #333333;
				line-height: 44rpx;
			}

			.imgs {
				margin-top: 28rpx;
				image {
					width: 100%;
				}
			}
		}

		.menus {
			padding: 40rpx 32rpx 48rpx 40rpx;
			display: flex;
			justify-content: space-between;

			.menu {
				button{
					padding: 0;
					background: #ffffff;
					line-height: 14px;
					margin-top: -3px;
				}
				.iconfont {
					font-size: 28rpx;
				}

				.text {
					margin-left: 10rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
				}
			}
		}
	}

	.node {
		padding: 48rpx 32rpx 0;
		display: flex;

		.photo {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
		}

		.main {
			flex: 1;
			margin-left: 18rpx;
			border-bottom: 2rpx solid #eeeeee;

			.up {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					.nickname {
						height: 32rpx;
						font-size: 30rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
					}

					.time {
						margin-top: 12rpx;
						height: 28rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #aaaaaa;
						line-height: 28rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 28rpx;
						color: #666666;
					}

					.v {
						padding: 0 8rpx 0 10rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #666666;
					}

					.color {
						color: #f5a236;
					}
				}
			}

			.down {
				padding: 18rpx 0;
				width: 596rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				line-height: 52rpx;
			}

			.link {
				margin: 6rpx 0 40rpx;
				display: flex;
				align-items: center;

				.vv {
					margin-right: 10rpx;
					height: 28rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #3567cb;
					line-height: 28rpx;
				}
			}
		}
	}

	.comment {
		margin-top: 20rpx;
		padding-top: 36rpx;
		background: #ffffff;
		box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

		.titlebar {
			padding: 0 32rpx;
			height: 60rpx;
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #333333;
			line-height: 60rpx;
		}

		.without {
			padding: 36rpx 0 42rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.vv {
				margin-right: 10rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #aaaaaa;
			}
		}
	}

	.posReply {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #ffffff;
		box-shadow: 0rpx -2rpx 4rpx 0rpx #ebebeb;
		padding: 22rpx 28rpx;
		display: flex;
		align-items: center;

		.reply {
			width: 418rpx;
			height: 68rpx;
			background: #fcfdff;
			border: 2rpx solid #eaedf2;
			border-radius: 38rpx;
			padding: 10rpx;
			display: flex;
			align-items: center;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			text {
				margin: 0 16rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #666666;
			}
		}

		.menus {
			flex: 1;
			margin-left: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.menu {
				padding: 0 10rpx;
				position: relative;
				button{
					background: #ffffff;
				}
				.iconfont {
					font-size: 42rpx;
				}

				.pos {
					position: absolute;
					top: -18rpx;
					right: -18rpx;
					width: 38rpx;
					height: 24rpx;
					background: #d74444;
					border-radius: 12rpx;
					font-size: 20rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					line-height: 24rpx;
				}
			}
		}
	}
}
</style>
