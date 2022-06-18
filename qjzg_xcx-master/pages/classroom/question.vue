<template>
	<view class="question">
		<view class="header">
			<view class="title"> {{hotnotelist.Title}} </view>
			<view class="content">
				<u-read-more :toggle="true" :show-height="showHeight" ref="uReadMore">
					<view class="">
						<view class="characters">{{ hotnotelist.Content }}</view>
						<view class="imgs" v-for="(item, index) in hotnotelist.Images" :key="index">
							<image :src="'https://www.qijiazhiguo.top' + hotnotelist.Images[index]" mode="widthFix"></image>
						</view>
					</view>
				</u-read-more>
			</view>
			<view class="extra">
				<view class="left"> {{hotnotelist.ReplyNum }}评论 · {{hotnotelist.CollectionNum}}收藏 </view>
				<view class="right" @click="PointNum">
					<view class="icon">
						<text v-if="!hotnotelist.CurrentLookUserIsPoint" class="iconfont">{{'\ue603'}}</text>
						<text v-else class="iconfont">{{'\ue627'}}</text>
					</view>
					<view class="text"> 好问题 {{hotnotelist.PointNum}} </view>
				</view>
			</view>
		</view>
		<view class="mainwrap" v-if="hotnotelist.Answer != null">
			<view class="titlebar">
				<view class="userinfo">
					<image class="photo" :src="'https://www.qijiazhiguo.top' + hotnotelist.Answer.UserHeadImage" mode=""></image>
					<view class="main">
						<view class="up">
							<view class="nickname"> {{hotnotelist.Answer.UserName}} </view>
							<view class="vip">
								<image src="../../static/experience/hg.jpg" mode=""></image>
							</view>
						</view>
						<view class="down"> 专注家庭成员心理健康 </view>
					</view>
					<view class="btn" @click="PointNum2(hotnotelist.Answer.ID)">
						<view class="icon">
							<text v-if="!Pointnum2" class="iconfont2">{{'\ue603'}}</text>
							<text v-else class="iconfont2">{{'\ue627'}}</text>
						</view>
						<view class="text"> {{hotnotelist.Answer.PointNum}} </view>
					</view>
				</view>
			</view>
			<view class="content"> {{hotnotelist.Answer.Content}}</view>
			<view class="time">回答于{{hotnotelist.Answer.CreateTime }}· 禁止转载 </view>
			<view class="appreciateBtn" @tap="isPay=true">赞赏</view>
			<view class='listPeople'>
				<image :src="hotnotelist.Answer.AllPayUserImages[indexs]" :style="{'left':'-'+(18*index+'rpx')}" v-for="(items,indexs) in hotnotelist.Answer.AllPayUserImages"
					:key="index"></image>
				<view>{{hotnotelist.Answer.AllPayCount}}人已赞赏</view>
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
				<image style="width: 320px;height: 260px;padding: 20px 0 0 55px;" :src="blank" mode=""></image>
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
					<text class="iconfont3">{{ '\ue63d' }}</text>
					<!-- <view class="pos">25</view> -->
				</view>
				<view class="menu">
					<button open-type="share">
						<text class="iconfont3">{{ '\ue606' }}</text>
					</button>
				</view>
				<view class="menu" @click="llection">
					<text v-if="Collection == 0" class="iconfont">{{ '\ue658' }}</text>
					<text v-else class="iconfont">{{ '\ue8bc' }}</text>
				</view>
			</view>
		</view>
		<view v-show="isPay" class="popPay">
			<view class="mainbd">
				<view class="head">
					<view class="left">
						<view class="node" v-for="(itemt, indext) in hotnotelist.Answer.AllPayUserImages" :key="index">
							<image :src=" hotnotelist.Answer.AllPayUserImages[indext]" mode=""></image>
						</view>
					</view>
					<view class="right"> 已有{{hotnotelist.Answer.AllPayCount}} 人赞赏 </view>
				</view>
				<view class="price">
					<view v-for="(item, index) in priceList" :key="index" @tap="priceIndex=index">
						<view :class="['node', {'nodeActive':index==priceIndex}]"> ￥{{item}} </view>
					</view>
				</view>
				<view class="payWay">
					<view class="title"> 支付方式 </view>
					<view class="content">
						<image src="../../static/logo.png" mode=""></image>
						<view>微信支付</view>
					</view>
					<u-icon name="arrow-right" size="32" color="#666"></u-icon>
				</view>
				<view class="btn" @tap="payment"> 确认支付 </view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				priceList: [0.01, 1, 3.33, 5, 6.66, 8.88],
				priceIndex: 0,
				isPay: false,
				content: '北京市教委通知：北京将启动小学生暑假托管服务，小学一到五年级可就近参加夏利营晚上八点小学一到五年级可就近参加夏利营晚上八点北京市教委通知：北京将启动小学生暑假托管服务，小学一到五年级可就近参加夏利营晚上八点小学一到五年级可就近参加夏利营晚上八点北京市教委通知：北京将启动小学生暑假托管服务，小学一到五年级可就近参加夏利营晚上八点小学一到五年级可就近参加夏利营晚上八点北京市教委通知：北京将启动小学生暑假托管服务，小学一到五年级可就近参加夏利营晚上八点小学一到五年级可就近参加夏利营晚上八点',
				showHeight: 100,
				pageIndex:1,
				zhuangtai: 0,
				authorUserID: '',
				keyid:'',
				rootid: '',
				comment:[],
				hotnotelist:[],
				PointNumnum:'',
				focusUserId:'',
				search:'',
				Collection:0,
				Pointnum2:true,
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
				url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetOneExperienceReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					id: this.hotnotelist.ID,
					currentLookUserId: this.keyid,
					pageIndex: this.pageIndex,
					pageSize: 10
				},
				success: res => {
					console.log('这里这里', this.comment);
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
			this.authorUserID = option.key;
			this.keyid = wx.getStorageSync('ID');
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfo',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					id: option.key,
					userId:wx.getStorageSync('ID')
				},
				success: res => {
					this.hotnotelist = res.data.Data;
					this.Pointnum2 = res.data.Data.Answer.CurrentLookUserIsPoint
					this.PointNumnum = res.data.Data.PointNum
					this.focusUserId = res.data.Data.UserID
					console.log('啊啊啊',res.data.Data)
					if(res.data.Data.CurrentLookUserIsCollect  == false){
						this.Collection = 0
					}else{
						this.Collection = 1
					}
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetOneExperienceReply',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					id: option.key,
					currentLookUserId: wx.getStorageSync('ID'),
					pageIndex: this.pageIndex,
					pageSize: 10
				},
				success: res => {
					this.rootid = res.data.Data.RootID
					this.comment = res.data.Data;
				}
			});
		},
		methods: {
			delet(e){
				let that = this
				console.log(e)
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/Reply/DeleteReplyWeb/' + e.ID + '?userId=' + wx.getStorageSync('ID'),
					method:'DELETE',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					success: res => {
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetOneExperienceReply',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								id: this.authorUserID,
								currentLookUserId: wx.getStorageSync('ID'),
								pageIndex: 1,
								pageSize: 10
							},
							success: res => { 
								this.comment = res.data.Data;
							}
						});
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfo',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								id: this.hotnotelist.ID,
								userId:wx.getStorageSync('ID')
							},
							success: res => {
								this.hotnotelist = res.data.Data;
							}
						});
					}
				});
			},
			goto(url) {
				uni.navigateTo({
					url
				})
			},
			PointNum1(id) {
				let that = this
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ClassRoom/UserPoint',
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
						}
						console.log(res.data.Data);
						this.Pointnum1 = res.data.Data.PointNum;
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetOneExperienceReply',
							header: { 'authorization': wx.getStorageSync('Ticket') },
							data: {
								id: that.hotnotelist.ID,
								currentLookUserId: that.keyid,
								pageIndex: 1,
								pageSize: 10
							},
							success: res => {
								console.log('这里这里', res.data.Data);
								this.comment = res.data.Data;
							}
						});
					}
				});
			},
			PointNum2(id){
				console.log(id)
				let that = this
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ClassRoom/UserPointAnswer',
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
						}
						console.log(res.data.Data);
						this.Pointnum2 = res.data.Data.returnInt;
						if(res.data.Data.returnInt == 0){
							this.Pointnum2 = false
						}else{
							this.Pointnum2 = true
						}
						this.hotnotelist.Answer.PointNum =  res.data.Data.PointNum;
					}
				});
			},
			llection() {
				let value = 0
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/UserCollection/UserCollection',
					method: 'POST',
					header: { 'authorization': wx.getStorageSync('Ticket') },
					data: {
						userId: wx.getStorageSync('ID'),
						sourceId: this.hotnotelist.ID,
						authorUserID: this.hotnotelist.UserID,
						type: 1
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
			},
			confirmTap: function() {
				let that = this;
				console.log('我点击了回车');
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/ClassRoom/AddReply',
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
							this.search = '';
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetOneExperienceReply',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data: {
									id: this.authorUserID,
									currentLookUserId: wx.getStorageSync('ID'),
									pageIndex: 1,
									pageSize: 10
								},
								success: res => { 
									this.comment = res.data.Data;
								}
							});
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfo',
								header: { 'authorization': wx.getStorageSync('Ticket') },
								data: {
									id: this.hotnotelist.ID,
									userId:wx.getStorageSync('ID')
								},
								success: res => {
									this.hotnotelist = res.data.Data;
								}
							});
						}
					});
					if (!this.search.trim()) {
						uni.showToast({
							title: '请输入搜索内容',
							icon: 'none'
						});
						return;
					}
				uni.navigateTo({
					url: `../../pagesA/list/listItem?search=${this.search}`
				});
			},
			payment() {
				console.log(this.priceList[this.priceIndex])
				let that = this
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ClassRoom/ClassRoomAdmire',
					method:'POST',
					header: {'Content-Type': 'application/json','authorization': wx.getStorageSync('Ticket')},
					data:{
						"UserID": wx.getStorageSync('ID'),
						"AnswerID": that.hotnotelist.Answer.ID,
						"AdmireMoney": that.priceList[this.priceIndex],
						"AdmireName": "测试",
					},
					success: res => {
						
						console.log('微信支付',res)
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
						}else if(res.data.ReturnCode == 500){
							uni.showModal({
							    title: '友情提示',
							    content: '此活动人数已达上限',
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
			},
			PointNum() {
				let that = this
				uni.request({
					url: 'https://www.qijiazhiguo.top/api/ClassRoom/UserPoint',
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
						}
						console.log(res.data.Data);
						this.PointNumnum =  res.data.Data.PointNum
						this.Pointnum = res.data.Data.returnInt;
						uni.request({
							url: 'https://www.qijiazhiguo.top/api/ClassRoom/GetNoteInfo',
							data: {
								id: that.authorUserID,
								userId:wx.getStorageSync('ID')
							},
							success: res => {
								that.hotnotelist = res.data.Data;
							}
						});
					}
				});
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
			        path: `pages/classroom/question?key=` + that.authorUserID, //转发的路径
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
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
		}
	}
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
		font-size: 20rpx;
		color: #ff9829;;
	}

	.iconfont2 {
		font-family: uniicons;
		font-size: 28rpx;
		color: #f5a236;
		font-weight: 900;
		transform: translateY(220rpx);
	}

	.iconfont3 {
		font-family: uniicons;
		font-size: 40rpx;
		color: #333;
	}

	.question {
		padding: 32rpx 0 140rpx;

		.header {
			margin: 0 32rpx;

			.title {
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 600;
				color: #333333;
				line-height: 52rpx;
			}

			.content {
				margin: 14rpx 0 32rpx;
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
				.read {
					font-size: 30rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
					line-height: 46rpx;
				}

				// .main {
				// 	display: inline-block;
				// 	font-size: 30rpx;
				// 	font-family: PingFangSC, PingFangSC-Regular;
				// 	font-weight: 400;
				// 	color: #666666;
				// 	line-height: 46rpx;
				// }

				image {
					display: inline-block;
					width: 32rpx;
					height: 28rpx;
					background: #3567cb;
				}

				.unfold {
					display: inline-block;

					text {
						height: 46rpx;
						font-size: 30rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #3567cb;
						line-height: 46rpx;
					}
				}
			}

			.extra {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					font-size: 30rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
				}

				.right {
					width: 220rpx;
					height: 68rpx;
					background: #f2f2f2;
					border: 2rpx solid #ececec;
					border-radius: 36rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.text {
						margin-left: 12rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #ff9829;;
						line-height: 64rpx;
					}
				}
			}
		}

		.mainwrap {
			margin: 32rpx 0;
			background-color: #ffffff;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;
			padding: 36rpx 32rpx;

			.titlebar {
				.userinfo {
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
						width: 160rpx;
						height: 64rpx;
						background: #f6f6f6;
						border-radius: 12rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						.text {
							margin-left: 12rpx;
							font-size: 28rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 600;
							text-align: center;
							color: #f5a236;
							line-height: 64rpx;
						}
					}
				}
			}

			.content {
				margin-top: 36rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				line-height: 44rpx;

				image {
					margin: 16rpx 0;
				}
			}

			.time {
				font-size: 26rpx;
				color: #aaa;
				margin-bottom: 40rpx;
				padding-top: 40rpx;
			}

			.appreciateBtn {
				width: 198rpx;
				height: 70rpx;
				background-color: #f6f6f6;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #e64d4d;
				font-weight: bold;
				margin: 0 auto;
				margin-bottom: 40rpx;
			}

			.listPeople {
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					position: relative;
					left: -18rpx;
					border: 4rpx solid #fff;
				}

				text {
					font-size: 26rpx;
					color: #aaa;
					margin-left: -28rpx;
				}
			}
		}

		.comment {
			margin-top: 20rpx;
			padding-top: 36rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;

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
			background: #FFFFFF;
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
				
				.menu {
					margin-top: 16rpx;
					padding: 0 10rpx;
					position: relative;
					button{
						background: #ffffff;
						position: absolute;
						top: -116%;
						left: -166%;
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
	}
</style>
