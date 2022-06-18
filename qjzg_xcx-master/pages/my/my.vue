<template>
	<view class="">
		<image src="../../static/home/homeimges.png" mode="" style="width: 100%;margin-bottom: 10%;"></image>
		
		<view class="my">
			<view class="userinfo">
				<view class="baseinfo">
					<view class="photo">
						<image v-if="isLogin" class="head-photo" :src="homelist.HeadImage" mode=""></image>
						<image v-else class="head-photo" :src="VipBackImage" mode=""></image>
						<!-- <image v-if="isLogin" class="pos" src="../../static/my/detail_icon3.jpg" mode=""></image> -->
					</view>
					<view class="main">
						<view class="top">
							<view class="nickname" @click="getUserProfile">{{ isLogin ? homelist.Name : '点击微信登录' }}</view>
							<view  class="vip-level">
								<image :src="'https://www.qijiazhiguo.top' + homelist.vipInfo.VipUrl" mode=""></image>
							</view>
						</view>
						<view class="btm">
							关注 {{ isLogin ? (MyCount.MyFocusUser  == null ? 0 : MyCount.MyFocusUser) : 0 }}&nbsp;&nbsp;&nbsp;&nbsp;粉丝
							{{ isLogin ? (MyCount.MyFansUser == null ? 0 : MyCount.MyFansUser) : 0 }}&nbsp;&nbsp;&nbsp;&nbsp;获赞
							{{ isLogin ? (MyCount.MyRevPoint == null ? 0 : MyCount.MyRevPoint) : 0 }}
						</view>
					</view>
				</view>
				<view class="stuffs"> 
					<view class="per" @click="quesion">
						<view class="t1" :style="isLogin ? 'color:#333' : 'color:#aaa'">{{ isLogin ? (Countlist.MyClassRoom == null ? 0 : Countlist.MyClassRoom) : 0 }}</view>
						<view class="t2">我的提问</view>
					</view>
					<view class="per" @click="experience">
						<view class="t1" :style="isLogin ? 'color:#333' : 'color:#aaa'">{{ isLogin ? (Countlist.MyExperience == null ? 0 : Countlist.MyExperience) : 0 }}</view>
						<view class="t2">我的分享</view>
					</view>
					<view class="per" @click="mychild">
						<view class="t1" :style="isLogin ? 'color:#333' : 'color:#aaa'">{{ isLogin ? (Countlist.ChildNum == null ? 0 : Countlist.ChildNum) : 0 }}</view>
						<view class="t2">我的子女</view>
					</view>
					<view class="per">
						<view class="t1" :style="isLogin ? 'color:#ff8a0c' : 'color:#aaa'">
							<text @tap="goto(`/pages/my/message`)">{{ isLogin ? (Countlist.MyReplyNum == null ? 0 : Countlist.MyReplyNum) : 0 }}</text>
						</view>
						<view class="t2" @tap="goto(`/pages/my/message`)">回复消息</view>
					</view>
				</view>
				<view class="govip" @tap="gotoVip">
					<image :src="membercard" mode=""></image>
					<view style="position: inherit;top: -25px;left: 25px;font-size: 11px;color: #ffffff;width: 90%;">{{MyCount.VipDescribe}}</view>
					<view class="btn">立即购买</view>
				</view>
			</view>
			<view v-if="isLogin" class="children">
				<view class="titlebar" @tap="goto(`/pages/my/child?keyid=` + keyid)">
					<view class="title">子女档案</view>
					<view class="exchange">
						<text class="t">切换子女</text>
						<u-icon name="arrow-right" size="26" color="#ccc"></u-icon>
					</view>
				</view>
				<view class="baseinfo" @tap="goto(`/pages/my/child`)" v-if="Childrenlist[Children].Name || Childrenlist[Children].SchoolName || Childrenlist[Children].Age != null">
					<view class="photo"><image :src="'https://www.qijiazhiguo.top' + Childrenlist[Children].HeadImage"></image></view>
					<view class="main">
						<view class="top">{{ Childrenlist[Children].Name }}</view>
						<view class="btm">
							<view class="address">
								<image src="../../static/my/adress.png" mode=""></image>
								<text class="t1">{{ Childrenlist[Children].SchoolName }}</text>
							</view>
							<view class="grade">
								<text class="t2">{{ Childrenlist[Children].Age}}岁</text>
							</view>
						</view>
					</view>
				</view>
				<view style="text-align: center;justify-content: center;" @tap="goto(`/pages/my/child`)" v-else>
					<image style="width: 120px;height: 120px; margin: 20px 0 20px 115px;" :src="blank" mode=""></image>
					<text style="color: #c7c7c7;">暂无添加子女信息</text>
				</view>
				<view class="separate-line"></view>
				<view class="stuffs">
					<view class="nape" v-for="(item, index) in homelist1">
						<view class="just" :style="{ color: homelist1[index].Color }">{{ homelist1[index].StandardName }}</view>
						<view class="title">{{ homelist1[index].BehaviorName }}</view>
						<view class="line" :style="{ background: homelist1[index].Color }"></view>
					</view>
				</view>
			</view>
			<view class="activities-attended">
				<view class="titlebar">
					<view class="title">我的活动</view>
					<view class="exchange" @tap="goto(`/pages/my/orderForm?id=` + 0 + '&leix=' + 9)">
						<text class="t">全部订单</text>
						<u-icon name="arrow-right" size="26" color="#ccc"></u-icon>
					</view>
				</view>
				<view class="main">
					<view class="node" v-for="(item, index) in list0" :key="index" @tap="goto(`/pages/my/orderForm?id=` + (index + 1) + '&leix=' + index)">
						<view class="img">
							<image :src="item.icon1" v-if="!isLogin"></image>
							<image :src="item.icon2" v-if="isLogin"></image>
							
						</view>
						<view class="asdasdasdadsa" v-if="isLogin && ActivityCount[index].Num != 0 && ActivityCount[index].ID != 2">
							{{ActivityCount[index].Num}}
						</view>
						<text :style="isLogin ? 'color:#333' : 'color:#aaa'">{{ item.title }}</text>
					</view>
				</view>
			</view>
			<view class="integral">
				<view class="titlebar">
					<view class="title">我的积分</view>
					<view class="exchange"><u-icon name="arrow-right" size="26" color="#ccc"></u-icon></view>
				</view>
				<view class="main" v-if="isLogin" @click="pointscilck">
					<view class="node">
						<view class="num" :style="isLogin ? 'color:#333' : 'color:#aaa'">{{ Point.TotalPoint  }}</view>
						<view class="t">累计积分</view>
					</view>
					<view class="line"></view>
					<view class="node">
						<view class="num" :style="isLogin ? 'color:#e06656' : 'color:#aaa'">{{ Point.CanUsePoint  }}</view>
						<view class="t">积分余额</view>
					</view>
					<view class="line"></view>
					<view class="node">
						<view class="num" :style="isLogin ? 'color:#333' : 'color:#aaa'">{{ Point.FrozenPoint }}</view>
						<view class="t">已冻结</view>
					</view>
				</view>
				<view class="main" v-else>
					<view class="node">
						<view class="num" :style="isLogin ? 'color:#333' : 'color:#aaa'">--</view>
						<view class="t">累计积分</view>
					</view>
					<view class="line"></view>
					<view class="node">
						<view class="num" :style="isLogin ? 'color:#e06656' : 'color:#aaa'">--</view>
						<view class="t">积分余额</view>
					</view>
					<view class="line"></view>
					<view class="node">
						<view class="num" :style="isLogin ? 'color:#333' : 'color:#aaa'">--</view>
						<view class="t">已使用</view>
					</view>
				</view>
			</view>
			<view class="menu">
				<view class="titlebar"><view class="title">全部功能</view></view>
				<view class="main">
					<view class="node" v-for="(item, index) in list" :key="index" @tap="goto(item.url, index)">
						<view class="img">
							<image :src="item.icon1" v-if="!isLogin"></image>
							<image :src="item.icon2" v-if="isLogin"></image>
						</view>
						<view class="t" :style="isLogin ? 'color:#333' : 'color:#aaa'">
							<text>{{ item.title }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="Logout" @click="Logout" v-if="isLogin">
				退出登录
			</view>
			<u-mask :show="isPhone" :mask-click-able="false" :zoom="false" :duration="0" :z-index="1">
				<view class="phone">
					<view class="rect" @click.stop>
						<view class="head">手机号授权</view>
						<view class="content">
							<text>小程序将申请您的权限来注册信息</text>
						</view>
						<view class="footer">
							<text class="rej" @click="phoneCancel">拒绝</text>
							<button class="res" hover-class="none" open-type="getPhoneNumber" @getphonenumber="getphonenumber">允许</button>
						</view>
					</view>
				</view>
			</u-mask>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			isLogin: false,
			list0: [
				{
					icon1: '../../static/my/icon_0.png',
					icon2: '',
					title: '待参加',
					url: '/pages/my/developmentTracks'
				},
				{
					icon1: '../../static/my/icon_1.png',
					icon2: '../../static/my/icon1.png',
					title: '待评价',
					url: `/pages/my/developmentTracks`
				},
				{
					icon1: '../../static/my/icon_2.png',
					icon2: '../../static/my/icon2.png',
					title: '已完成',
					url: `/pages/my/developmentTracks`
				}
			],
			list: [
				{
					icon1: '../../static/my/item_0.png',
					icon2: '../../static/my/item0.png',
					title: '成长轨迹',
					url: `/pages/my/developmentTracks`
				},
				{
					icon1: '../../static/my/item_1.png',
					icon2: '../../static/my/item1.png',
					title: '扩展圈',
					url: `/pages/my/myexpand`
				},
				{
					icon1: '../../static/my/item_2.png',
					icon2: '../../static/my/item2.png',
					title: '活动情况',
					url: `/pages/my/activity`
				},
				{
					icon1: '../../static/my/item_3.png',
					icon2: '../../static/my/item3.png',
					title: '我的收藏',
					url: `/pages/my/collection`
				},
				{
					icon1: '../../static/my/item_4.png',
					icon2: '../../static/my/item4.png',
					title: '年终报告',
					url: `/pages/my/yearEndReport`
				},
				{
					icon1: '../../static/my/item_5.png',
					icon2: '',
					title: '阶段评测',
					url: `/pages/my/studentAssessment`
				},
				{
					icon1: '../../static/my/item_6.png',
					icon2: '../../static/my/item6.png',
					title: '隐私设置',
					url: `/pages/my/intimity`
				},
				{
					icon1: '../../static/my/item_7.png',
					icon2: '../../static/my/item7.png',
					title: '关于我们',
					url: `/pages/my/aboutMe`
				},
				{
					icon1: '../../static/my/item_8.png',
					icon2: '../../static/my/item8.png',
					title: '意见反馈',
					url: `/pages/my/feedback`
				},
				{
					icon1: '../../static/my/item_9.png',
					icon2: '../../static/my/item9.png',
					title: '联系客服',
					url: ``
				}
			],
			Children: 0,
			Childrenlist: [],
			ActivityCount:[],
			homelist: [],
			Countlist: [],
			points: [],
			homelist1: [],
			formlist: [],
			keyid: '',
			openID:'',
			infoRes:[],
			isPhone:false,//授权手机号弹框
			iszhuangt: true,
			Point:[],
			MyCount:[],
			VipBackImage:'',
			membercard:'',
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
	onShow() {
		console.log(wx.getStorageSync('Ticket'))
		// options.isLogin && (that.isLogin = options.isLogin);
		console.log(wx.getStorageSync('openID'))
		if(wx.getStorageSync('ID') && wx.getStorageSync('openID') != ''){
			this.gethome(wx.getStorageSync('openID'),wx.getStorageSync('ID'))
			this.isLogin = true
		}else{
			this.iszhuangt = false
		}
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'head'
			},
			success: res => {
				this.VipBackImage = 'https://www.qijiazhiguo.top' + res.data.Data
				console.log('这',this.VipBackImage)
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'membercard'
			},
			success: res => {
				this.membercard = 'https://www.qijiazhiguo.top' + res.data.Data
				console.log('这',this.VipBackImage)
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'joinactivity'
			},
			success: res => {
				this.list0[0].icon2 = 'https://www.qijiazhiguo.top' + res.data.Data
				console.log('这',this.VipBackImage)
			}
		});
		uni.request({
			url: 'https://www.qijiazhiguo.top/api/System/GetImage',
			header: { 'authorization': wx.getStorageSync('Ticket') },
			data:{
				key:'stagetest'
			},
			success: res => {
				this.list[5].icon2 = 'https://www.qijiazhiguo.top' + res.data.Data
				console.log('这',this.list[5].icon2)
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
		goto(url, index) {
			if (this.isLogin) {
				if (index != 9) {
					uni.navigateTo({ url });
				} else if (index == 9) {
					//联系客服
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/System/GetContactNumber',
						header: { 'authorization': wx.getStorageSync('Ticket') },
						success: res => {
							uni.makePhoneCall({ phoneNumber: res.data.Data });
						}
					});
				}
			}
		},
		gethome(openID,id) {
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Point/GetMyPoint',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:id
				},
				success: res => {
					this.Point = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyCount',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					parentId:id
				},
				success: res => {
					this.MyCount = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/ActivitiesAndUser/GetMyActivityCount',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					userId:id
				},
				success: res => {
					this.ActivityCount = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetUsersByOpenID',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data:{
					openID:openID
				},
				success: res => {
					this.homelist = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserInfo/GetChildren',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					parentId: id
				},
				success: res => {
					this.Childrenlist = res.data.Data;
					this.homelist1 = res.data.Data[0].BehaviorStandard
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/UserMsg/GetMyCount',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					parentId: id
				},
				success: res => {
					this.Countlist = res.data.Data;
				}
			});
			uni.request({
				url: 'https://www.qijiazhiguo.top/api/Point/GetPoints',
				header: { 'authorization': wx.getStorageSync('Ticket') },
				data: {
					userName: '孙爸爸',
					phone: '18830297890',
					pageIndex: 1,
					pageSize: 10
				},
				success: res => {
					this.points = res.data.Data;
				}
			});
		},
		gotoVip() {
			if(this.isLogin == false){
				uni.showLoading({
					title: '请登录用户',
					duration: 800
				});
			}else{
				uni.navigateTo({
					url: `/pages/my/vipOpen?keyid=` + this.keyid
				});
			}
		},
		getUserProfile(){
			let that = this
			uni.showLoading({title: '登陆中',mask: true});
			uni.login({
				success: (res) =>{
					uni.setStorageSync('loginCode',res.code);
				}
			})
			wx.getUserProfile({
				desc: '获取用户信息用于完善资料',
				success: (infoRes) => {
					that.infoRes = infoRes;
					uni.request({
						url: 'https://www.qijiazhiguo.top/api/UserInfo/Login?js_code=' + uni.getStorageSync('loginCode'),
						method: 'POST',
						success: res => {
							console.log('jscode',res)
							that.isLogin = true;
							uni.showToast({icon: 'none',title: '登录成功'});
							that.homelist = res.data.Data;
							that.formlist = res.data.Data;
							if(res.data.ReturnCode == 200){
								if(res.data.Data.IsFirstLogin == "true"){
									let params = {
										HeadImage: that.infoRes.userInfo.avatarUrl,
										Name: that.infoRes.userInfo.nickName,
										OpenID: that.formlist.OpenID,
										encryptedData: '',
										iv: '',
										session_key: that.formlist.session_key
									};
									uni.request({
										url: 'https://www.qijiazhiguo.top/api/UserInfo/PostUser',
										method: 'POST',
										header: { 'Content-Type': 'application/x-www-form-urlencoded' },
										data: params,
										success: res => {
											that.isPhone = true;
											console.log(res.data.Data.OpenID);
											that.isLogin = true;
											that.gethome(res.data.Data.OpenID,res.data.Data.ID);
											console.log('这奥术大师大',res.data.Data.OpenID,res.data.Data.ID)
											uni.setStorage({
												key: 'ID',
												data: res.data.Data.ID,
												success: function() {
													console.log('存储成功');
												}
											});
											uni.setStorage({
												key: 'openID',
												data: res.data.Data.OpenID,
												success: function() {
													console.log('存储成功');
												}
											});
										}
									});
								}else{
									
								}
							}else{
								console.log("系统异常，请稍后再试")
							}
							uni.request({
								url: 'https://www.qijiazhiguo.top/api/UserInfo/GetUsersByOpenID',
								data: {
									openID: res.data.Data.OpenID
								},
								success: res => {
									console.log('这里这里',res)
									that.gethome(res.data.Data.OpenID,res.data.Data.ID);
									that.keyid = res.data.Data.ID;
									wx.setStorageSync('openID',res.data.Data.OpenID)
									wx.setStorageSync('ID',res.data.Data.ID)
									wx.setStorageSync('Ticket',("authorization" + " " + res.data.Data.Ticket))
								}
							});
						}
					})
				},
				fail:err=>{
					uni.hideLoading()
					uni.showToast({icon:'none',title:'登录失败'})
				}
			})
		},
		//手机号授权
		getphonenumber(e){
			this.isPhone=false;
			if(e.detail.errMsg == 'getPhoneNumber:ok'){ //允许获取
				let encryptedData = e['mp'].detail.encryptedData;
				let iv = e['mp'].detail.iv;
				wx.checkSession({
					success:()=>{
						let data={
							OpenId:this.OpenId,
							NickName:this.infoRes.userInfo.nickName,
							HeadImage:this.infoRes.userInfo.avatarUrl,
							Gender:this.infoRes.userInfo.gender,
							session_key:this.session_key,
							encryptedData,
							iv
						}
						this.$axios.post('api/users/PostUser',data).then(ref2=>{
							this.$store.commit('updateUserInfo',ref2.Data);//用户信息
							if (this.userInfo.HeadImage.includes('https')) {
								this.isPhoto = true;
							}else{
								this.isPhoto = false;
							}
							this.GetMyMeetingCountApi();
							this.GetContactNumberApi();
							uni.showToast({icon:'none',title:'登录成功'});
						})
				  },
				  fail :()=> {
				    uni.showModal({
				    	title: '提示',
				    	content: '操作时间过长，请重新操作',
						showCancel:false
				    })
				  }
				})
			}else{
				this.phoneCancel();
			}
		},
		//取消手机号授权
		phoneCancel(){
			this.isPhone=false;
			uni.showToast({icon:'none',title:'授权失败'})
		},
		pointscilck(){
			uni.navigateTo({
				url: `/pages/my/points`
			});
		},
		quesion(){
			uni.navigateTo({
				url: './myquestion'
			});
		},
		experience(){
			uni.navigateTo({
				url: './myexperience'
			});
		},
		mychild(){
			uni.navigateTo({
				url: './nuechild'
			});
		},
		mymessage(){
			if(this.isLogin == false){
				uni.showLoading({
					title: '请登录用户',
					duration: 800
				});
			}else{
				uni.navigateTo({
					url: './mymessage'
				});
			}
		},
		Logout(){
			 uni.removeStorageSync('ID');
			 uni.removeStorageSync('openID');
			 this.isLogin = false
			 this.gethome(wx.getStorageSync('openID'),wx.getStorageSync('ID'))
			 uni.pageScrollTo({
			 	duration: 100,//过渡时间
			 	scrollTop:0,//到达距离顶部的top值
			 	//scrollTop:data.top - res.top,//如果置顶
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.my {
	padding-bottom: 48rpx;
	position: absolute;
	top: 10%;
	left: 3%;
	border-radius: 12px;
	.userinfo {
		border-radius: 12px;
		margin-bottom: 28rpx;
		padding: 36rpx 0 40rpx;
		background-color: #ffffff;

		.baseinfo {
			display: flex;
			align-items: center;

			.photo {
				margin: 0 40rpx;
				position: relative;

				.head-photo {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
				}

				.pos {
					position: absolute;
					bottom: 0;
					right: 0;
					width: 44rpx;
					height: 44rpx;
					background: #c7c7c7;
					border: 2rpx solid #ffffff;
					border-radius: 50%;
				}
			}

			.main {
				flex: 1;

				.top {
					display: flex;
					align-items: center;

					.nickname {
						height: 45rpx;
						font-size: 40rpx;
						font-family: PingFangSC, PingFangSC-Semibold;
						font-weight: 600;
						text-align: left;
						color: #333333;
						width:142px;
						 white-space:nowrap;
						 word-break:keep-all;
						 overflow:hidden;
						 text-overflow:ellipsis;

					}

					.vip-level {
						margin-left: 44rpx;
						position: relative;

						image {
							position: absolute;
							top: -21rpx;
							left: -27rpx;
							width: 80px;
							height: 51rpx;
						}

						.mark {
							width: 128rpx;
							height: 36rpx;
							background: #d2d2d2;
							border-radius: 0rpx 18rpx 18rpx 0rpx;
							line-height: 36rpx;
							font-size: 20rpx;
							font-family: PingFangSC, PingFangSC-Medium;
							font-weight: 500;
							color: #ffffff;
							text-align: right;
							padding-right: 16rpx;
						}
					}
				}

				.btm {
					margin-top: 34rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #666666;
					line-height: 40rpx;
				}
			}

			.r-arrow {
				margin-right: 32rpx;
			}
		}

		.stuffs {
			margin: 48rpx 72rpx;
			display: flex;
			justify-content: space-between;

			.per {
				display: flex;
				flex-direction: column;
				align-items: center;

				.t1 {
					width: 44rpx;
					height: 44rpx;
					font-size: 44rpx;
					font-family: DINAlternate, DINAlternate-Bold;
					font-weight: 700;
					text-align: left;
					// color: #333333;
				}

				.t2 {
					margin-top: 16rpx;
					width: 96rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
				}
			}
		}

		.govip {
			padding: 0 20rpx;
			position: relative;

			image {
				width: 100%;
				height: 128rpx;
			}

			.tag {
				position: absolute;
				top: 80rpx;
				left: 48rpx;
				height: 20rpx;
				font-size: 20rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #cccccd;
			}

			.btn {
				position: absolute;
				top: 28rpx;
				right: 52rpx;
				width: 148rpx;
				height: 56rpx;
				background: linear-gradient(90deg, #f2e3b5, #f3dbae);
				border-radius: 12rpx;
				font-size: 24rpx;
				line-height: 56rpx;
				text-align: center;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}
		}
	}

	.children {
		margin: 28rpx auto 20rpx;
		width: 706rpx;
		padding: 28rpx 0 2rpx 0;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #e1e8ec;

		.titlebar {
			padding: 8rpx 34rpx 8rpx 40rpx;
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

			.exchange {
				.t {
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
				}

				u-icon {
					margin-left: 6rpx;
				}
			}
		}

		.baseinfo {
			padding: 40rpx 50rpx;
			display: flex;
			align-items: center;

			.photo {
				image {
					width: 136rpx;
					height: 136rpx;
					border: 2rpx solid #ecf1f6;
					border-radius: 70rpx;
				}
			}

			.main {
				margin-left: 32rpx;
				image {
					width: 40px;
					height: 40px;
				}
				.top {
					padding: 0 8rpx;
					height: 36rpx;
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					text-align: left;
					color: #333333;
				}

				.btm {
					margin-top: 28rpx;
					display: flex;

					image {
						width: 24rpx;
						height: 24rpx;
						margin-right: 12rpx;
					}

					.address,
					.grade {
						display: flex;
						align-items: center;
						padding: 12rpx 24rpx;
						border-radius: 24rpx;

						text {
							line-height: 24rpx;
							font-size: 24rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							text-align: left;
						}

						.t1 {
							color: #3567cb;
						}

						.t2 {
							color: #ff8a0c;
						}
					}

					.address {
						background-color: #f7f9ff;
					}

					.grade {
						margin-left: 24rpx;
						background-color: #fffae9;
					}
				}
			}
		}

		.separate-line {
			margin: 0 auto;
			width: 622rpx;
			height: 2rpx;
			background: #f6f6f6;
		}

		.stuffs {
			padding: 48rpx 0 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;

			.nape {
				width: 25%;
				margin-bottom: 56rpx;

				.just {
					padding-top: 4rpx;
					height: 56rpx;
					font-size: 40rpx;
					font-family: zihun2hao, zihun2hao-Regular;
					font-weight: 400;
					text-align: center;
					line-height: 40rpx;
				}

				.good {
					color: #f8932e;

					&::before {
						content: '良好';
					}
				}

				.excellent {
					color: #e06656;

					&::before {
						content: '优秀';
					}
				}

				.bad {
					color: #59b48b;

					&::before {
						content: '待进取';
					}
				}

				.title {
					margin: 16rpx 0 20rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #666666;
				}

				.line {
					margin: 0 auto;
					width: 32rpx;
					height: 6rpx;
					border-radius: 4px;
				}
			}
		}
	}

	.activities-attended {
		margin: 0 auto;
		width: 706rpx;
		padding: 36rpx 0 20rpx 0;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ededed;

		.titlebar {
			padding: 0rpx 34rpx 0rpx 40rpx;
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

			.exchange {
				.t {
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #aaaaaa;
				}

				u-icon {
					margin-left: 6rpx;
				}
			}
		}

		.main {
			display: flex;
			justify-content: space-between;
			padding: 32rpx 88rpx 20rpx;

			.node {
				.img {
					position: relative;
					width: 65rpx;
					height: 65rpx;
					margin: 0 auto;
					margin-bottom: 16rpx;

					image {
						width: 100%;
						height: 100%;
					}

					.mark {
						position: absolute;
						top: 2rpx;
						right: 0;
						width: 32rpx;
						height: 32rpx;
						background: #cb3535;
						border: 2rpx solid #ffd5d5;
						border-radius: 50%;
						font-size: 20rpx;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 32rpx;
					}
				}

				text {
					height: 28rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					// color: #333333;
					line-height: 28rpx;
				}
			}
		}
	}

	.integral {
		margin: 20rpx auto 22rpx;
		width: 706rpx;
		padding: 36rpx 0 52rpx 0;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ededed;

		.titlebar {
			padding: 0rpx 34rpx 0rpx 40rpx;
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
		}

		.main {
			margin: 52rpx 0 0 20rpx;
			display: flex;

			.line {
				width: 2rpx;
				height: 78rpx;
				background: #f6f6f6;
			}

			.node {
				width: 226rpx;

				.num {
					height: 48rpx;
					font-size: 48rpx;
					font-family: DINAlternate, DINAlternate-Bold;
					font-weight: 700;
					text-align: center;
					// color: #333333;
				}

				.t {
					margin-top: 20rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #aaaaaa;
				}
			}
		}
	}

	.menu {
		margin: 22rpx auto 48rpx;
		width: 706rpx;
		background: #ffffff;
		padding: 36rpx 0 2rpx 0;
		border-radius: 12rpx;
		box-shadow: 0rpx 2rpx 4rpx 0rpx #ededed;

		.titlebar {
			padding-left: 42rpx;

			.title {
				height: 32rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #333333;
			}
		}

		.main {
			padding: 46rpx 22rpx 0;
			display: flex;
			flex-wrap: wrap;

			.node {
				width: 152rpx;
				margin-right: 16rpx;
				margin-bottom: 46rpx;

				.img {
					display: flex;
					margin: 0 auto;
					width: 60rpx;
					height: 60rpx;
					position: relative;
					margin-bottom: 20rpx;

					image {
						width: 100%;
						height: 100%;
					}

					.mark {
						position: absolute;
						top: 0;
						right: 0;
						width: 32rpx;
						height: 32rpx;
						background: #cb3535;
						border: 2rpx solid #ffd5d5;
						border-radius: 50%;
						font-size: 20rpx;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 500;
						text-align: center;
						color: #ffffff;
						line-height: 32rpx;
					}
				}

				.t {
					margin-top: 2rpx;
					height: 28rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					// color: #333333;
					line-height: 28rpx;
				}
			}

			.node:nth-child(4n) {
				margin-right: 0;
			}
		}
	}
}
.phone {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			.rect {
				width:500rpx;height:300rpx;
				background-color: #fff;
				border-radius:20rpx;
				transform:scale(1.2);
				.head{
					height:90rpx;font-size:30rpx;font-weight: bold;
					text-align: center;line-height: 90rpx;
				}
				.content{
					display: flex;
					justify-content: center;
					align-items: center;
					height:100rpx;
					padding: 0 30rpx;
					image{
						width:60rpx;height:60rpx;margin-right:8rpx;
					}
					text{font-size:28rpx;color:#333;}
				}
				.footer{
					display: flex;
					font-size:28rpx;
					font-weight: bold;
					height:110rpx;
					align-items: center;
					.rej{flex:1;text-align: center;color:#333;}
					.res{font-size:28rpx;flex:1;text-align: center;color:rgb(87,107,149);padding:0;}
				}
			}
		}
		.Logout{
			width: 95%;
			height: 50px;
			text-align: center;
			background: #f5a236;
			color: #FFFFFF;
			line-height: 50px;
			border-radius: 8px;
			margin-left: 10px;
		}
		.asdasdasdadsa{
				font-size: 14px;
			    position: relative;
			    top: -69%;
			    left: 80%;
			    background: red;
			    border-radius: 50px;
			    width: 16px;
			    line-height: 16px;
			    height: 16px;
			    text-align: center;
				color: #FFFFFF;
		}
</style>
