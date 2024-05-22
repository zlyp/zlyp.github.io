/* global params declaler*/
var pgmclick = true;
var messageTab;
var InterValObj;
var count = 60;
var curCount;
var code = ""; 
var codeLength = 6;
var interval;
var MAX_SECOND = 120;
var subNor = "";
var arrIdr;
var livePage = {
	pageNo:4,
	totalPage: 4,
	totalSize: 300,
	callback: getLiveInfo
};
var subNoc = "";
var arrIdc = "";
var subNo = "";
var arrId = "";
var isCheckCode = "";
/* global params declaler*/

//消息与咨询中,定位提示信息的方法
function msg_site(){
	var len=$(".table-msg table tbody tr").length;
	if(len>9){
		for(var i=1;i<7;i++){
			$(".table-msg table tbody tr").eq(len-i).find(".show_msg").css({
				top:"auto",
				bottom:"37.2%"
			})
		}	
	}
}

$(function() {
	var $submenu = $('.submenu');
	var $mainmenu = $('.mainmenu');
	$submenu.hide();
	$submenu.on('click', 'li', function() {
		if(pgmclick){
			$submenu.siblings().find('li').removeClass('chosen');
			$(this).addClass('chosen');
			var id = $(this).attr('id');
			pgmclick = false;
			loadContent(id);
			pgmclick = true;
		}else{
			return;
		}
	});

	$mainmenu.on('click', 'li', function() {
		$(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
	});
	
	$mainmenu.children('li:last-child').on('click', function() {
		$mainmenu.fadeOut().delay(500).fadeIn();
	});
	
	
	//检测手机号
	web.ajax(basePath + 'web/user/checkMobile.ajax', {userId:userId}, false, function(r) {
		if(!r.flag){
			$submenu.eq(0).delay(400).slideDown(700);
			$("#bindmobile").delay(100).trigger("click");
			$(".html-modal").hide();
		}else{
			//根据学生状态 设置 显示页面  不为'05' 显示 我的录取进程   为'05'时显示我的学习进程
			//首页 学生服务 教师服务 合作服务 链接
			if("05"!=state){
				if(serviceId== "wybm"){//报名
					$submenu.eq(1).delay(400).slideDown(700);
					$("#wybm").delay(100).trigger("click");
				}else if(serviceId== "testscores"){
					$submenu.eq(1).delay(400).slideDown(700);
					$("#testscores").delay(100).trigger("click");
				}else if(serviceId== "admissionprocess"){
					$submenu.eq(1).delay(400).slideDown(700);
					$("#admissionprocess").delay(100).trigger("click");
				}else if(serviceId == "wdzx"){
					$submenu.eq(2).delay(400).slideDown(700);
					$("#wdzx").delay(100).trigger("click");
				}else if(serviceId=="null"){
					$submenu.eq(1).delay(400).slideDown(700);
					$("#admissionprocess").delay(100).trigger("click");
				}else{
					$submenu.eq(1).delay(400).slideDown(700);
					$("#admissionprocess").delay(100).trigger("click");
					messageDialogShow('提示','您未被录取不能进行该操作!',2);
				}
			}else{
				if(serviceId== "studentstatus"){//学籍查询
					$submenu.eq(1).delay(400).slideDown(700);
					$("#studentstatus").delay(100).trigger("click");
				}else if(serviceId== "tuition_payments"){//我的学费缴纳
					$submenu.eq(2).delay(400).slideDown(700);
					$("#tuition_payments").delay(100).trigger("click");
				}else if(serviceId== "school_change"){//学籍异动申请
					$submenu.eq(1).delay(400).slideDown(700);
					$("#school_change").delay(100).trigger("click");
				}else if(serviceId== "curricula_variable"){//我的选课
					$submenu.eq(3).delay(400).slideDown(700);
					$("#curricula_variable").delay(100).trigger("click");
				}else if(serviceId == "wdzx"){//我的咨询
					$submenu.eq(11).delay(400).slideDown(700);
					$("#wdzx").delay(100).trigger("click");
				}else if(serviceId=="wdtkcj"){//我的统考成绩
					$submenu.eq(5).delay(400).slideDown(700);
					$("#wdtkcj").delay(100).trigger("click");
				}else if(serviceId=="wdxwwycj"){//我的学位外语成绩
					$submenu.eq(5).delay(400).slideDown(700);
					$("#wdxwwycj").delay(100).trigger("click");
				}else if(serviceId=="null"){
					$submenu.eq(3).delay(400).slideDown(700);
					$("#learning_process").delay(100).trigger("click");
				}else{
					$submenu.eq(3).delay(400).slideDown(700);
					$("#learning_process").delay(100).trigger("click");
					messageDialogShow('提示','您已经被录取不能进行该操作!',2);
				}
				
			}
			$(".html-modal").hide();
		}
	});
	
//	//消息提示
//	web.ajax(basePath + 'edu/eduStuCourse/findCourseForStuSelected.ajax', {
//		userId : userId
//	}, true, function(r) {
//		var height = $("#common-nav").height();
////		$("#opera-top").css("top",height+"px");
//		if (r.flag&&r.isSelectDtm) {
//			$("#xxts-neirong").html("选课计划("+r.selectcourPlan[0].selectcourseName+")已发布，选课时间为"+r.selectcourPlan[0].selectBtm+"至"+r.selectcourPlan[0].selectEtm+",请大家及时进行选课并学习。");
//			//$("#xxts-neirong").html("2019秋季选课计划已发布，选课时间为8月29日至9月13日，请大家及时进行选课并学习。");
//			$(".move_port").show();
//			$(".move_port_div").on('click',function(){
//				$(".move_port").hide();
//				$submenu.eq(3).delay(400).slideDown(700);
//				$("#curricula_variable").delay(100).trigger("click");
//			});
//			$(".closeicon").on('click',function(){
//				$(".move_port").hide();
//			});
//		} 
//	});
	
	var x= 3;
	var y= 3;
	var win_w=$(window).width();
	var win_h=$(window).height();
	var lefts =0;
	var tops =0;
   //移动方法
   function move_obj(obj){
     if (lefts>=$(window).width()-$(obj).width()||lefts<0)
     {
       x=-x
     }
     if (tops>=$(window).height()-$(obj).height()||tops<0)
     {
       y=-y
     }
     lefts+=x;
     tops+=y;
     $(obj).css({top:tops,left:lefts});
   }
   var move=setInterval(function () {
     move_obj(".move_port")
   },80);
   //悬停停止运动
   $(".move_port").mouseover(function(){
     clearInterval(move);
   });
   //移开鼠标后继续运动
   $(".move_port").mouseout(function(){
	 move=setInterval(function () {
	   move_obj(".move_port")
     },80);
   });
});

/**
 * 根据不同的菜单id,加载不同的内容
 */
function loadContent(id) {
	document.body.scrollTop = 0;
	//清空右侧内容
	var mainContent = document.getElementById('main_content');
	mainContent.innerHTML = '';//$('#main_content').empty();
	loadWaittingMask('gerenzhongxin');
	//id为空则默认加载报名进程
	if (isEmpty(id)) {
		$('#admissionprocess-tmpl').tmpl().appendTo('#main_content');
		return;
	}

	// 个人信息
	if ('newuserinfo' == id) {
		loadNewuserinfo(id);
	}

	//入学登记表
	if ('stuRegInfo' == id) {
		loadStuRegInfo(id);
	}
	
	// 修改密码
	if ('repassword' == id) {
		loadRepassword(id);
	}
	
	// 绑定手机号
	if ('bindmobile' == id) {
		loadBindmobile(id);
	}
	
	// 我要报名
	if ('wybm' == id) {
		loadwoyaobaoming(id);
	}
	
	// 我的咨询
	if('wdzx' == id){
		loadWdzx(id);
		msg_site();
	}

	// 入学考试
	if ('testscores' == id) {
		web.ajax(basePath+'/exam/examStuEntrance/queryTestScores.ajax',{userid:userId},true,function(r){
			removeWaittingMask();
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		});
	}

	// 我要考试
	if('examscores' == id){
		loadExamscores(id);
	}
	
	if('xfyhzwl' == id){
		loadxfyhzwl(id);
	}

	// 录取进程
	if ('admissionprocess' == id) {
		checkStudentState();
	}
	// 我的考前辅导
	if ('preExaminationGuidance' == id) {
		loadPreExaminationGuidance(id);
	}
	

	// 我的学籍信息
	if ('studentstatus' == id) {
		web.ajax(basePath + 'edu/student/findMyStuInfo.ajax', {userId : userId}, true, function(r) {
			removeWaittingMask();
			if ('-1' == r.state) {
				$("<div>您还未被录取,请先报名</div>").tmpl().appendTo('#main_content');
				return;
			} else {
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				$('#lookfordetail').on('click',function(){
					var name = $(this).attr('name');
					checkStuInfo(name,this);
				});
			}
		});
	}

	// 学籍注册
	if ('schoolroll' == id) {
		var info = '';
		web.ajax(basePath + 'edu/eduStuInfoReg/findMyStuInfoReg.ajax', {userId : userId}, true, function(r) {
			removeWaittingMask();
			if (r.flag == true) {
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			} else {
				return;
			}
		});
	}

	// 学籍异动
	if ('school_change' == id) {
		loadSchoolChange(id);
	}
	
	// 优秀(毕业)学生申请
	if ('yxbys' == id) {
		loadYxbys(id);
	}
	
	// 我的学费缴纳
	if ('tuition_payments' == id) {
//		loadWaittingMask('main_content');
		web.ajax(basePath + 'edu/student/findParmentsNew.ajax', {
			userId : userId
		}, true, function(r) {
			$("#main_content").empty();
			removeWaittingMask();
			if(r.flag){
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			}else{
				messageDialogShow('提示',r.msg);
				return;
			}
		});
	}
	
	// 我的专业
	if ('major' == id) {
		loadMajor(id);
	}

	// 我的培养计划-课程
	if ('cultivation_plan_course' == id) {
		if(trainplanTempType=="02"){
			loadMyTrainPlanNew("cultivation_plan_course_new");
		}else {
			loadMyTrainPlan(id);
		}
	}

	// 我的选课
	if ('curricula_variable' == id) {
		if(trainplanTempType=="02"){
			selectCourMainNew("curricula_variable_new");
		}else{
			selectCourMain(id);
		}
	}

	// 我的课程
	if ('curriculum' == id) {
		loadStuCourse(id);
	}
	// 我的课程
	if ('curriculum_gonggong' == id) {
		loadGgStuCourse(id);
	}
	// 我的课程
	if ('wangluoxuexi' == id) {
		loadWLXX(id);
	}
	
	// 我的教材
	if ('teaching_material' == id) {
		loadTeachingMeterial(id);
	}
	
	//我的学习进程
	if ('learning_process' == id) {
		loadLearningProcess(id);
	}
	
	// 我的约考
	if ('appointment' == id) {
		loadExamPlanInfo(id);
	}
	
	// 学位考试申请
	/*if ('xueweikaoshishenq' == id) {
		xueweikaoshishenq(id);
	}*/
	
	if ('xueweikaoshishenqing' == id) {
		xueweikaoshishenqing(id);
	}
	
	//统考免考
	if ('generalexamexemp' == id) {
		loadgeneralexamexemp(id);
	}

	//学位外语免考
	if ('degreeforeignexemp' == id) {
		loaddegreeforeignexemp(id);
	}

	// 跨站点
	if ('crossCenterAppointment' == id) {
		loadCrossCenExamPlanInfo(id);
	}

	// 补考
	if ('examAgain' == id) {
		loadExamAgainInfo(id);
	}
	
	// 考前辅导
	if ('beforePractice' == id) {
		loadBeforePractice(id);
	}
	
	// 我的考试
	if ('myTest' == id) {
		myTest(id);
	}
	
	// 我的缓考
	if ('wodehuankao' == id) {
		loadWodehuankao(id,"");
	}
	
	// 考试通知单
	if ('kaoshitongzhidan' == id) {
		loadkstzs(id);
	}
	
	// 统考通知单
	if ('kaoshitongzhidanTK' == id) {
		loadkstzsTK(id);
	}

	//统考约考
	if('mytkyk'==id){
		loadMytkyk(id);
	}

	// 我的学位英语
	if ('degreeEnglish' == id) {
		degreeEnglish(id);
	}

	//我的考试成绩
	if('examResults' == id){
		examResults(id);
	}
	
	//我的成绩复查 
	if('examReCheck' == id){
		examResults(id);
	}
	
	//课程直播
	if('courzhibo' == id){
		loadCourZhibo(1);
	}
	
	// 毕业设计选题
	if('graduationProject' == id){
		loadGraduationProject(id);
	}
	// 毕业设计信息
	if('graduationInformation' == id){
		loadGraduationInformation(id);
	}
	
	if ('lunwenchachong' == id) {
		loadLunwenchachong(id);
	}
	if('baogaochachong' == id) {
		loadBaogaochachong(id);
	}
	
	if ('bydayjsq' == id) {
		loadBydayjsq(id);
	}
	
	// 教学评价---教学过程评价
	if('evaluationTeaching' == id){
		loadEvalInstance(id);
	}
	
	// 教学评价---教师评价
	if('teacherEvaluation' == id){
		teacherEvaluation(id);
	}
	
	// 教学评价---专题评价
	if('zhuanTiEvaluation' == id){
		loadZhuanTiEvaluation(id);
	}
	
	// 教学评价---辅导员评价
	if('fuDaoYuanEvaluation' == id){
		loadFuDaoYuanEvaluation(id);
	}
	
	// 教学评价---评价记录
	if('evaluationRecord' == id){
		loadEvaluationRecord(id);
	}
	
	// 录取通知书
	if ('luqutongzhishu' == id) {
		loadLuqutongzhishu(id);
	}
	
	/**
	 * 毕业信息登记
	 */
	if('wdbyxxdj' == id){
		loadWdbyxxdj(id);
	}
	
	/**
	 * 我的毕业鉴定表
	 */
	if('wdbyjdb' == id){
		loadWdbyjdb(id);
	}
	
	/**
	 * 我的毕业证书
	 */
	if('wdbyzs' == id){
		loadWdbyzs(id);
	}
	/**
	 * 统考成绩
	 */
	if('wdtkcj' == id){
		loadWdtkcj(id);
	}

	/**
	 * 学位外语成绩
	 */
	if('wdxwwycj' == id){
		loadWdxwwycj(id);
	}
	
	/**
	 * 我的学位申请
	 */
	if('wdxwsq' == id){
		loadWdxwsq(id);
	}
	/**
	 * 我的消息
	 */
	if('myMessage' == id){
		loadMyMessage(id);
		msg_site();
	}
	/**
	 * 我的学位证书
	 */
	if('wdxwzs' == id){
		loadWdxwzs(id);
	}
	
	/**
	 * 互动论坛
	 */
	if('hdlt' == id){
		removeWaittingMask();
		window.open(basePath+'web/bbsindex.htm','_blank');
	}
	/**
	 * 群组交流
	 */
	if('qzjl' == id){
		removeWaittingMask();
		window.open(basePath+'web/groupindex.htm','_blank');
	}
	
	/**
	 * 我的免考申请
	 */
	if('wodemiankaoshenq' == id){
		loadWodemiankaoshenq(id);
	}
	
	
	/**
	 * 我的课程实践
	 */
	if ('wodebiyeshijian' == id){
		loadwodebiyeshijian(id);
		
	}
	
	/**
	 * 我的课程实践
	 */
	if ('wodekaochake' == id){
		loadWodekaochake(id);
		
	}
	
	
	/**
	 * 我的录取明细
	 */
	if ('admissiondetail' == id){
		web.ajax(basePath + 'edu/eduUserCheckInfo/findCheckInfo.ajax', { userId : userId }, true, function(r) {
			removeWaittingMask()
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		});
	}
	
	//removeWaittingMask();
}

/**
 * 加载我的个人信息
 */
function loadNewuserinfo(id){
	 var netnum = Base64.encode(userId).replace(/=/g,"_");
	 web.ajax(basePath + 'edu/student/findStuInfo.ajax', { userId : userId}, true,function(r){
			 removeWaittingMask();
			 $("#main_content").empty();
			 if(r){
				 if (false == r.flag) {
					 var html = "<div class='col-md-12' style='padding:0px;margin-top:20px;'>" +
					 "<p class='baseInfo baseInformation'>个人信息</p></div>" +
					 "<div class='col-md-12 news-info-tip'>" +
					 "<label style='margin-left: 10px; margin-top: 10px;'>信息说明：</label>" +
					 "<label style='margin-left: 10px;'>"+r.msg+"</label></div>";
					 $(html).appendTo('#main_content');
					 return;
				 } else {
					 $('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
					 if (r.edustudent) {
						 r.edustudent = Base64.decode(r.edustudent.replace(/_/g,"="));
						 $("#photoImgA").attr("src",basePath+r.photo);
						 $("input").attr("disabled","disabled");
						 $('#userInfoForm').setFormValue(JSON.parse(r.edustudent));
						 $('#userInfoBtn').on('click',function(){
							 saveStuInfo(this);
						 });
					 }
				 }
			 }
	});
}

/**
 * 入学登记
 */
function loadStuRegInfo(id){
	var netnum = Base64.encode(userId).replace(/=/g,"_");
	web.ajax(basePath + 'edu/student/findStuInfo.ajax', {userId : userId}, true, function(r) {
		removeWaittingMask();
		$("#main_content").empty();
		if (false == r.flag) {
			var html = "<div class='col-md-12' style='padding:0px;margin-top:20px;'>" +
					   "<p class='baseInfo baseInformation'>个人信息</p></div>" +
					   "<div class='col-md-12 news-info-tip'>" +
					   "<label style='margin-left: 10px; margin-top: 10px;'>信息说明：</label>" +
					   "<label style='margin-left: 10px;'>"+r.msg+"</label></div>";
			$(html).appendTo('#main_content');
			return;
		} else {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if (r.edustudent) {
				r.edustudent = Base64.decode(r.edustudent.replace(/_/g,"="));
				$("#photoImgA").attr("src",basePath+r.photo);
				$('#userInfoForm').setFormValue(JSON.parse(r.edustudent));
				$('#userInfoBtn').on('click',function(){
					saveStuInfo(this);
				});
			}
			
			//照片上传事件注册
			if($("#uploadify")){
				$("#uploadify").uploadify({
					'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
					'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
					'auto': true,
					'multi': false,
					'fileSizeLimit':'3072',
					'sizeLimit':640*480,
					'queueID' : 'queue',
					"buttonText": "上传照片",
					'fileTypeExts': '*.jpg;*.jpeg;*.png;',
			        'fileExt': '*.jpg',
			        'fileTypeDesc': 'Image(*.jpg;*.jpeg)',
					"buttonClass": "btn btn-primary",
					'overrideEvents': ['onDialogClose'],
			        'onUploadStart':function(file){
			        	if(file.size>30*1024){
			        		alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#uploadify').uploadify('settings', 'fileSizeLimit') + "大小！");
			        		return;
			        	}
			        },
			      //返回一个错误，选择文件的时候触发  
			        'onSelectError': function (file, errorCode, errorMsg) {  
			            switch (errorCode) {  
			                case -100:  
			                	messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#uploadify').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
			                    return;  
			                case -110:  
			                	messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#uploadify').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
			                    return;  
			                case -120:  
			                	messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
			                    return;  
			                case -130:  
			                	messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
			                    return;  
			            }
			            return false;
			        }, 
					'onUploadSuccess': function (file, data, response) {// 上传成功后执行
						data = JSON.parse(data);
						var path = data.value.replace('//','/').replace('/Liems/','');
						$('#photo').val(path);
						$('#' + file.id).find('.data').html(' 上传完毕');
						document.getElementById('photoImgA').src = basePath+path;
					},
					'onFallback': function () {
					},
					'onError': function (event, ID, fileObj, errorObj) {
						if (errorObj.type === "File Size"){
							messageDialogShow('提示','超过文件上传大小限制（3M）！', 2);
						    return;
						}
					}
				});
				$('#uploadify-button').css('line-height','normal');
			}
		}
	});
}

/**
 * 修改密码
 */
function loadRepassword(id){
	web.ajax(basePath + 'web/user/findMobileByUserId.ajax', {userId:userId}, true, function(r) {
		if(r.value){
			$("#mobile").val(r.value);
		}
	});
	clearInterval(interval);
	$("#main_content").empty();
	$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
	removeWaittingMask();
	$("#repassword-form input").blur(function(){
	});
	$("#repassword-form").bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			oldpassword : {
				validators : {
					notEmpty : {
						message : '原密码不能为空'
					}
				}
			},
			newpassword : {
				validators : {
					notEmpty : {
						message : '新密码不能为空'
					},
					regexp: {
						regexp: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,20}$/,
						message: '请输入8~20位的密码(含大小写字母、数字、特殊字符中的三种及以上)'
					},
					different: {//不能和用户名相同
						field: 'oldpassword',//需要进行比较的input name值
						message: '不能和原密码相同'
					}
				}
			},
			renewpassword : {
				validators : {
					notEmpty : {
						message : '确认密码不能为空'
					},
					identical : {
						message : '两次密码输入不同',
						field : 'newpassword'
					}
				}
			},
			mobileCode : {
				validators: {
					callback: {
						message: '验证码输入不正确!',
						callback: function(value, validator,$field) {
							var phonenum = $('#mobile').val();
							//var datajson = {"mobilePhoneNumber": phonenum};
							var flag = false;
							if(value.length<6){
								flag = false;
								return flag;
							}
							if(value.search(/^[\0-9]{6}$/)<0){
								flag = false;
								return flag;
							}
							/*$.ajax({
								type: "POST",
								url: "https://txp8thdp.api.lncld.net/1.1/verifySmsCode/"+value,
								contentType: 'application/json;charset=utf-8',
								async:false,
								headers: {
									"Content-Type": "application/json;charset=utf-8",
									'X-LC-Id':'txp8tHdp4wqwFBp27iR41vIv-gzGzoHsz',
									'X-LC-Key':'uF1SuCN4jyIbPcv8k547wDWN'
								},
								data: JSON.stringify(datajson),
								success: function (data) {
									web.ajax(basePath + 'web/user/saveMobileCode.ajax', 
											{userId:userId,mobile:phonenum,code:value,type:"1"}, 
											false, function(r) {
										if(r.state==0){
											flag = true;
										}else{
											flag = false;
										}
										return flag;
									});
								}
							});*/
							return true;
						}
					}
				}
			}
		}
	});
	$('#btn_repwd').on('click', function() {
		saveRepassword(this);
	});
	
	$('#getYzm').on('click', function() {
		getMobileCode();
	});
}

/**
 *  得到修改密码的手机验证码
 */
function getMobileCode() {
	$('#getYzm').attr("disabled", true);
	var phonenum = $('#mobile').val();
	//var datajson = {"mobilePhoneNumber": phonenum,"ttl":5};
	if(isEmpty(phonenum)){
		messageDialogShow('提示','请先绑定手机号!');
		$("#getYzm").removeAttr("disabled"); 
		return;
	}
	txyz();
	/*web.ajax(basePath + 'jw/eduGdCheckPaper/mobileSendSms.ajax',{mobile:phonenum, userId:userId},true,function(r) {
		if (r.state != "0") {
			$('#getYzm').removeAttr("disabled");
			messageDialogShow('提示', r.msgInfo);
		} else {
			interval = setInterval(function(){ setButton($('#getYzm'));},1000);
		}
	},function(data){
		if(typeof(data.responseJSON)=="undefined"){
    		setTimeout(function(){ 
    			messageDialogShow('提示',"网络异常,获取验证码失败！");
	        	$("#getYzm").removeAttr("disabled"); 
    		},5000);
    	}else{
    		messageDialogShow('提示',data.responseJSON.error);
        	$("#getYzm").removeAttr("disabled"); 
    	}
	});*/
	/*$.ajax({
        type: "POST",
        url: "https://txp8thdp.api.lncld.net/1.1/requestSmsCode",
        contentType: 'application/json;charset=utf-8',
        headers: {
        	"Content-Type": "application/json;charset=utf-8",
             'X-LC-Id':'txp8tHdp4wqwFBp27iR41vIv-gzGzoHsz',
             'X-LC-Key':'uF1SuCN4jyIbPcv8k547wDWN'
         },
        data: JSON.stringify(datajson),
        success: function (data) {
				interval = setInterval(function(){ setButton($('#getYzm'));},1000);
        },error:function (data) {
        	if(typeof(data.responseJSON)=="undefined"){
        		setTimeout(function(){ 
        			messageDialogShow('提示',"网络异常,获取验证码失败！");
    	        	$("#getYzm").removeAttr("disabled"); 
        		},5000);
        	}else{
        		messageDialogShow('提示',data.responseJSON.error);
	        	$("#getYzm").removeAttr("disabled"); 
        	}
        }
    });*/
}




/**
 * 绑定手机号
 * @param id
 */
function loadBindmobile(id){
	$("#main_content").empty();
	$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
	removeWaittingMask();
	clearInterval(interval);
	web.ajax(basePath + 'web/user/checkMobile.ajax', {userId:userId}, true, function(r) {
		if(!r.flag){
			$("#btn_skip").show();
		}
	});
	//获取验证码
	$('#getYzm').on('click',function(r){
		$('#getYzm').attr("disabled", true);
		var reg = /^1\d{10}$/;
		var phonenum = $('#mobile').val();
//		var datajson = {"mobilePhoneNumber": phonenum,"ttl":5};
		if(isEmpty(phonenum)){
			messageDialogShow('提示','请输入手机号码!');
			$("#getYzm").removeAttr("disabled"); 
			return;
		}
		if(!reg.test(phonenum)){
			messageDialogShow('提示','手机号码输入不正确!');
			$("#getYzm").removeAttr("disabled"); 
			return;
		}
		txyz();
		/*web.ajax(basePath + 'jw/eduGdCheckPaper/mobileSendSms.ajax',{mobile:phonenum, userId:userId},true,function(r) {
			if (r.state != "0") {
				$('#getYzm').removeAttr("disabled");
				messageDialogShow('提示', r.msgInfo);
			} else {
				interval = setInterval(function(){ setButton($('#getYzm'));},1000);
			}
		},function(data){
			if(typeof(data.responseJSON)=="undefined"){
	    		setTimeout(function(){ 
	    			messageDialogShow('提示',"网络异常,获取验证码失败！");
		        	$("#getYzm").removeAttr("disabled"); 
	    		},5000);
	    	}else{
	    		messageDialogShow('提示',data.responseJSON.error);
	        	$("#getYzm").removeAttr("disabled"); 
	    	}
		});*/
		/*$.ajax({
	        type: "POST",
	        url: "https://txp8thdp.api.lncld.net/1.1/requestSmsCode",
	        contentType: 'application/json;charset=utf-8',
	        headers: {
	        	"Content-Type": "application/json;charset=utf-8",
	             'X-LC-Id':'txp8tHdp4wqwFBp27iR41vIv-gzGzoHsz',
	             'X-LC-Key':'uF1SuCN4jyIbPcv8k547wDWN'
	         },
	        data: JSON.stringify(datajson),
	        success: function (data) {
					interval = setInterval(function(){ setButton($('#getYzm'));},1000);
	        },error:function (data) {
	        	if(typeof(data.responseJSON)=="undefined"){
	        		setTimeout(function(){ 
	        			messageDialogShow('提示',"网络异常,获取验证码失败！");
	    	        	$("#getYzm").removeAttr("disabled"); 
	        		},5000);
	        	}else{
	        		messageDialogShow('提示',data.responseJSON.error);
		        	$("#getYzm").removeAttr("disabled"); 
	        	}
	        }
	    });*/
	});
	
	//提交
	$('#btn_save').on('click',function(){
		$('#bindMobileForm').bootstrapValidator('validate');
	    var flag = $("#bindMobileForm").data("bootstrapValidator").isValid();
	    if(flag){
	    	var obj = $("#bindMobileForm").serializeJson();
	    	if(obj.confimCode){
	    		delete obj.confimCode;
	    	}
	    	if(obj.confimCode){
	    		delete obj.mobileConfimCode;
	    	}
	    	$(this).button('loading');
    		web.ajax(basePath+'web/user/saveMobile.ajax',{param:JSON.stringify(obj)},true,function(r){
    			$(this).button('reset');
    			if(r.state==0){
    				messageDialogShow('提示',r.msgInfo,1);
    				setTimeout(function(){
    					location.href=basePath+'web/admissionprocess.htm';
    				}, 2000);
    			}else{
    				messageDialogShow('提示',r.msgInfo,2);
    				return;
    			}
    		});
	    }else{
	    	return;
	    }
	});
	//跳过
	$('#btn_skip').on('click',function(){
		messageDialogShow('提示',"亲，您还没有绑定手机号码，确认离开吗？刷新页面依然会校验手机号码！",1);
		$(".html-modal").hide();
		removeWaittingMask();
		if(!"05"==state){
			$('.submenu').eq(1).delay(400).slideDown(700);
			$("#admissionprocess").delay(100).trigger("click");
		}else{
			$('.submenu').eq(3).delay(400).slideDown(700);
			$("#learning_process").delay(100).trigger("click");
		}
	});
	
	
	
	$('#bindMobileForm input').blur(function(){
	});
	$('#bindMobileForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			mobile: {
				validators: {
					notEmpty: {
						message: '请输入手机号码!'
					},
					/*regexp: {
			                regexp: /^1(3|4|5|7|8)\d{9}$/,
			                message: '手机号码输入不正确!'
			            },*/
					callback: {
						message: '该手机号码已经注册,请更换手机号码',
						callback: function(value, validator,$field) {
							var state;
							var flag = true;
							if(value.length<11){
								return {valid:false,message:'输入手机号码长度不正确！'};
							}
							if(value.search(/^1\d{10}$/)<0){
								return {valid:false,message:'手机号码输入不正确!'};
							}
							var netNum = $('#userId').val();
							web.ajax(basePath+'web/user/checkMobileIsExistedT.ajax',{value:value,netNum:netNum},false,function(r){
								state = r.state
								if(-1 == r.state){
									flag = false;
									//$field.val('');
								}
							});
							if(state=='-1'){
								flag = false;
								return {valid:false,message:'该手机号码已经注册,请更换手机号码'};;
							}
							return flag;
							
						}
					}
				}
			},
			mobileConfimCode: {
				validators: {
					callback: {
						message: '验证码输入不正确!',
						callback: function(value, validator,$field) {
							var phonenum = $('#mobile').val();
							var datajson = {"mobilePhoneNumber": phonenum};
							var flag = false;
							if(value.length<6){
								flag = false;
								return flag;
							}
							if(value.search(/^[\0-9]{6}$/)<0){
								flag = false;
								return flag;
							}
							/*$.ajax({
								type: "POST",
								url: "https://txp8thdp.api.lncld.net/1.1/verifySmsCode/"+value,
								contentType: 'application/json;charset=utf-8',
								async:false,
								headers: {
									"Content-Type": "application/json;charset=utf-8",
									'X-LC-Id':'txp8tHdp4wqwFBp27iR41vIv-gzGzoHsz',
									'X-LC-Key':'uF1SuCN4jyIbPcv8k547wDWN'
								},
								data: JSON.stringify(datajson),
								success: function (data) {
									flag = true;
									return flag;
								}
							});*/
							return true;
						}
					}
				}
			}
		}
	});
}

/**
 * 我要报名
 * @param id
 */
function loadwoyaobaoming(id){
	web.ajax(basePath + 'edu/jw/studentApply/isSignUpEd.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask()
		// 已经报名的;
		if (-1 != r.state) {
			loadStuInfo('', r.param.state);
		} else {// 没有报名的,显示我要报名的界面
			loadWybxInfo(id);
		}
	});
}

/**
 * 查看学生信息
 * 
 * @param r
 */
function checkStuInfo(stuId,obj) {
	var flag = $(obj).attr('data');
	var id = 'studentstatus';
	if('open' == flag){
		web.ajax(basePath + 'edu/student/findMyStuInfoByStuId.ajax', {userId : userId}, true, function(r) {
			if (r.flag == true) {
				$("#stuName").html(r.eduStuInfo[0].stuName);
				$("#stuId").html(r.eduStuInfo[0].stuId);
				$("#eduStuId").html(r.eduStuInfo[0].eduStuId);
				$("#idCard").html(r.eduStuInfo[0].idCard);
				$("#sex").html(r.eduStuInfo[0].sex);
				$("#birthday").html(r.eduStuInfo[0].birthday);
				$("#ethnic").html(r.eduStuInfo[0].ethnic);
				$("#enterDtm").html(r.eduStuInfo[0].enterDtm);
				$("#registerDate").html(r.eduStuInfo[0].registerDate);
				$("#examineeNum").html(r.eduStuInfo[0].examineeNum);
				$("#registerNum").html(r.eduStuInfo[0].registerNum);
				$("#centerName").html(r.eduStuInfo[0].centerName);
				$("#subjectProp").html(r.eduStuInfo[0].subjectProp);
				$("#levelName").html(r.eduStuInfo[0].levelName);
				$("#majorName").html(r.eduStuInfo[0].majorName);
				$("#schoolName").html(r.eduStuInfo[0].schoolName);
				$("#graduateDate").html(r.eduStuInfo[0].graduateDate);
				$("#speciality").html(r.eduStuInfo[0].speciality);
				$("#graduationNum").html(r.eduStuInfo[0].graduationNum);
				$("#studyForm").html(r.eduStuInfo[0].studyForm);
				$("#minYear").html(r.eduStuInfo[0].minYear);
				$("#tk").html(r.eduStuInfo[0].tk);
				$("#zp").html(r.eduStuInfo[0].zp);
				$("#bz").html(r.eduStuInfo[0].bz);
				$('#stuInfo').fadeIn('fast');
				$(obj).attr('data','close');
				$(obj).html('隐藏');
			} else {
				$('#stuInfo').fadeOut('fast');
				return;
			}
		});
	}else{
		$('#stuInfo').fadeOut('fast');
		$(obj).attr('data','open');
		$(obj).html('查看');
	}
}

/**
 * 加载我要报名页面信息
 * @param id
 */
function loadWybxInfo(id){
	web.ajax(basePath + 'edu/jw/studentApply/findConZsCenPlan.ajax', {userid : userId}, false, function(r) {
		if(r.flag){
			$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
			if(r.exist){
				if(r.existNow){
					//存在招生计划
					$('#disabledSelect').empty();
					var html= "<option value='' selected='selected'>请选择报考类型</option>";
					for(var i=0;i<r.data.length;i++){
						html += "<option value='"+r.data[i].studyForm+"'>"+r.data[i].studyFormName+"</option>";
					}
					$('#disabledSelect').append(html);
					$('#disabledSelect').on('change', function() {
						var val = $(this).val();
						if ('01' == val || '02' == val) {
							$('#bmxz').fadeIn('fast');
							$('#bmxz1').hide();
						} else {
							$('#bmxz1').fadeIn('fast');
							$('#bmxz').hide();
						}
					});
					//我要报名点击事件
					$('#bmbtn').on('click', function() {
						bmbtnClick(this);
					});
				}else{
					$('#bmbtn').attr("disabled","disabled");
					$('#exist').show();
					$('#unexist').hide();
				}
			}else{
				//不存在招生计划
				$('#bmbtn').attr("disabled","disabled");
				$('#exist').hide();
				$('#unexist').show();
			}
		}
	});
}

/**
 * 我的毕业实践
 * @param id
 */
//function loadwodebiyeshijian(id){
//	web.ajax(basePath+'edu/jw/eduGdPractice/findGdStuInfo.ajax',{userId:userId},true,function(r){
//		removeWaittingMask();
//		$('#main_content').empty();
//		$('#'+id+'-tmpl').tmpl(r).appendTo('#main_content');
//		if(r.grPractice){
//			$('#stuNo').val(r.data[0].stuNo);
//			$('#centerNo').val(r.data[0].centerNo);
//			$('#majorNo').val(r.data[0].majorNo);
//			$('#grItemsNo').val(r.data[0].grItemsNo);
//			loadwodebiyeshijian1(id);
//		}
//	});
//	
//}

/**
 * 加载实践课程
 */
function loadwodebiyeshijian(id){
	$('#main_content').empty();
	web.ajax(basePath+'/edu/jw/eduGrStuPractice/findGspInfo.ajax',{userId:userId},true,function(r){
		$('#'+id+'-tmpl').tmpl(r).appendTo('#main_content');
		removeWaittingMask();
		$('#'+id+'2-tmpl').tmpl(r).appendTo('#'+id+'1-tmpl');
	});
}

/**
 * 加载考查课
 */
function loadWodekaochake(id){
	$('#main_content').empty();
	web.ajax(basePath+'/edu/jw/eduGrStuPractice/findKcInfo.ajax',{userId:userId},true,function(r){
		$('#'+id+'-tmpl').tmpl(r).appendTo('#main_content');
		removeWaittingMask();
		$('#'+id+'2-tmpl').tmpl(r).appendTo('#'+id+'1-tmpl');
	});
}

/**
 * 加载实践选择
 * @param id
 */
function loadwodebiyeshijian1(id){
	var grItemsNo = $('#grItemsNo').val();
	$('#'+id+'1-tmpl').empty();
	web.ajax(basePath+'edu/jw/eduGdPractice/findGdPractice.ajax',{userId:userId,grItemsNo:grItemsNo},false,function(r){
		$('#'+id+'2-tmpl').tmpl(r).appendTo('#'+id+'1-tmpl');
		if(r.isSubmite){
			$('button').attr('disabled',true);
		}
	});
}

/**
 * 取消
 * @param spNo
 * @param obj
 */
function cancelPractice(spNo,obj){
	$(obj).button('loading');
	web.ajax(basePath+'edu/jw/eduGrStuPractice/delete.ajax',{pkValue:spNo},false,function(r){
		if(r.state == 0){
			loadwodebiyeshijian1('wodebiyeshijian');
		}else{
			$(obj).button('reset');
		}
	})
}
/**
 * 选择
 * @param practiceNo
 * @param obj
 */
function selectPractice(practiceNo,obj,type){
	$(obj).button('loading');
	var stuNo = $('#stuNo').val();
	var centerNo = $('#centerNo').val();
	var majorNo = $('#majorNo').val();
	var grItemsNo = $('#grItemsNo').val();
	var state ;
	if(1 == type){
		state = '-1';
	}else{
		state = '0';
	}
	web.ajax(basePath+'edu/jw/eduGrStuPractice/saveGrStuPra.ajax',{state:state,stuNo:stuNo,centerNo:centerNo,majorNo:majorNo,itemsNo:grItemsNo,practiceNo:practiceNo},false,function(r){
		if(r.state == 0){
			loadwodebiyeshijian1('wodebiyeshijian');
		}else{
			$(obj).button('reset');
		}
	})
}

function loadWodemiankaoshenq(id){
	$('#main_content').empty();
	web.ajax(basePath+'edu/eduRidTest/findMyMkListInfo.ajax',{userId:userId},true,function(r){
		$('#'+id+'-tmpl').tmpl().appendTo('#main_content');
//		loadWodemiankaoshenq1(id);
		removeWaittingMask();
		$('#'+id+'4-tmpl').tmpl(r.mkly).appendTo('#mkReason');
		$('#'+id+'2-tmpl').tmpl(r).appendTo('#'+id+'1-tmpl');
	});
}

/**
 * 加载我的免考申请列表
 */
function loadWodemiankaoshenq1(id,keyword){
	$('#'+id+'1-tmpl').empty();
	web.ajax(basePath + 'edu/eduRidTest/findMyMkListInfo.ajax',{userId:userId,keyword:keyword},true,function(r){
		removeWaittingMask();
		$('#'+id+'2-tmpl').tmpl(r).appendTo('#'+id+'1-tmpl');
	});
}

/**
 * 我的考试成绩-查询
 * 
 * @param id
 */
function examResults(id) {
	web.ajax(basePath + 'edu/eduResult/findExamConPlan.ajax',{userId:userId},true,function(r){
		removeWaittingMask();
		$('#'+id+'-tmpl').tmpl(r).appendTo('#main_content');
		setExamResultsWidth(r);
		examResults2(id,'');
	});
}

/**
 * 我的考试成绩-列表
 * 
 * @param id
 */
function examResults2(id,ecpNo) {
	$('#'+id+'1-tmpl').empty();
	web.ajax(basePath + 'edu/eduResult/findEduStuExamResults.ajax', {
		userId : userId
	}, false, function(r) {
		if (r.flag) {
			if(r.stuType){//新
				$("#stuTypeNew").show();
				$("#stuTypeOld").hide();
			}else{
				$("#stuTypeNew").hide();
				$("#stuTypeOld").show();
			}
			if(r.exist){
				if(r.stuType){//新
					$('#' + id + '4-tmpl').tmpl(r).appendTo('#' + id + '3-tmpl');
				}else{
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
				}
			}else{
				$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
				$('#' + id + '1-tmpl').html("<tr><td align='center'  colspan='12'>暂无考试成绩</td></tr>");
			}
		} else {
			return;
		}
	});
}

/**
 * 我的无纸化考试成绩-列表
 * 
 * @param id
 */
function examResults3(id,epepNo) {
	$('#'+id+'3-tmpl').empty();
	web.ajax(basePath + 'edu/eduResult/findEduExamNpResults.ajax', {
		userId : userId,epepNo:epepNo
	}, false, function(r) {
		if (r.flag) {
			if(r.exist){
				$('#' + id + '4-tmpl').tmpl(r).appendTo('#' + id + '3-tmpl');
			}else{
				$('#' + id + '4-tmpl').tmpl(r).appendTo('#' + id + '3-tmpl');
				$('#' + id + '3-tmpl').html("<tr><td align='center'  colspan='12'>暂无考试成绩</td></tr>");
			}
		} else {
			return;
		}
	});
}

/**
 * 
 */
function queryExamResults(){
	var ecpNo = $('#ecpNo').val()||"";
	if (ecpNo == "") {
		messageDialogShow('提示',"请选择考试计划","2");
	} else {
		examResults2('examResults',ecpNo);
	}
}



/**
 * 新建免考申请
 */
function createEduRidTest(){
	$('#saveRidTestBtn').show();
	$('#submitRidTestBtn').show();
	$('#sureRidTestBtn').hide();
	$("input[name='ridTestNo']").val('');
	$("select[name='stuCourseNo']").attr('disabled',false);
	$("select[name='stuCourseNo']").val('');
	$("textarea[name='reason']").val('');
	$("textarea[name='reason']").attr('disabled',false);
	$('#ridedutestModal').modal('show');
}

/**
 * 保存或者提交免考申请
 */
function saveOrupdateMk(type,pk){
	var flag = true;
	$('#ridedutestform').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
      	},
      	fields: {
      		stuCourseNo: {
      			validators: {
      				notEmpty: {
                    	message: '请选择免考课程'
              		}
          		}
      		},reason: {
      			validators: {
      				notEmpty: {
                    	message: '请填写申请原因'
              		}
          		}
      		}
      	}
	});
	
	$('#ridedutestform').bootstrapValidator('validate');
	var flag = $("#ridedutestform").data("bootstrapValidator").isValid();
	if(flag){
		var stuCourseNo = $('#stuCourseNo').val();
		if('-1' == stuCourseNo){
			messageDialogShow('提示', arg1, 2);
		}
		var state;
		var data = $('#ridedutestform').serializeJson();
		//console.log(JSON.stringify(data));
		if('save' == type){//保存
			state = '00';
		}else if('submit' == type){//提交
			state = '01';
		}else{
			$('#ridedutestModal').modal('hide');
			return;
		}
		data.state = state;
		web.ajax(basePath + 'edu/eduRidTest/saveOrupdateMk.ajax',{param:JSON.stringify(data),type:type,pk:pk},true,function(r){
			if(r.state == 0){
				//$('#ridedutestModal').modal('hide');
				$(".modal-backdrop").hide();
				loadWodemiankaoshenq("wodemiankaoshenq");
			}else{
				return;
			}
		});
	}
}

function shenqingMk(stuId,courseNo){
	var indextishi = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + 'edu/eduRidTest/checkMkScore.ajax',{stuId:stuId,courseNo:courseNo},true,function(r){
		layer.close(indextishi);
		if(r.state==0){
			layer.open({
				title: '申请理由',
				type: 1,
				area: 'auto',
				closeBtn: 0,
				btn: ['确定', '取消'],
				content:$("#mksqForm"),
				yes: function(index, layero){
				   var mkReason  = $("#mkReason").val();
				   if(mkReason==""){
						layer.alert('免考申请理由不能为空！'); 
						return;
				   }
				   var indexshenqing = layer.load(2,{shade: [0.8, '#393D49']});
					web.ajax(basePath + 'edu/eduRidTest/shenqingMk.ajax',{stuId:stuId,courseNo:courseNo,mkReason:mkReason},true,function(r){
						layer.close(indexshenqing);
						if(r.state==0){
							layer.close(index);
							messageDialogShow('提示',r.msgInfo);
							loadWodemiankaoshenq("wodemiankaoshenq");
						}else{
							layer.alert(r.msgInfo, {icon: 2}); 
							return;
						}
					});
				},
				btn2: function(index, layero){
					layer.close(index);
					loadWodemiankaoshenq("wodemiankaoshenq");
				}
			});
		}else{
			messageDialogShow("提示", r.msgInfo, 2);
			return;
		}
	});
}

function delMk(ridTextNo,stuId,type){
	var indextishi = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + 'edu/eduRidTest/delMk.ajax',{stuId:stuId,ridNo:ridTextNo,type:type},true,function(r){
		layer.close(indextishi);
		if(r.state==0){
			messageDialogShow('提示',r.msgInfo);
		}else{
			messageDialogShow('提示',r.msgInfo,'2');
		}
		loadWodemiankaoshenq("wodemiankaoshenq");
	});
}

/**
 * 
 */
function saveOrupdateMk1(type,pk,stuCourseNo,reason){
	if('edit' == type){//编辑
		$("input[name='ridTestNo']").val(pk);
		$('#saveRidTestBtn').show();
		$('#submitRidTestBtn').show();
		$('#sureRidTestBtn').hide();
		$("textarea[name='reason']").val(reason);
		$("select[name='stuCourseNo']").val(stuCourseNo);
		$('#ridedutestModal').modal('show');
	}else if('view' == type){//查看
		$('#saveRidTestBtn').hide();
		$('#submitRidTestBtn').hide();
		$('#sureRidTestBtn').show();
		$("textarea[name='reason']").val(reason);
		$("textarea[name='reason']").attr('disabled',true);
		$("select[name='stuCourseNo']").val(stuCourseNo);
		$("select[name='stuCourseNo']").attr('disabled',true);
		$('#ridedutestModal').modal('show');
	}else if('del' == type){//删除
		web.ajax(basePath + 'edu/eduRidTest/saveOrupdateMk.ajax',{type:type,pk:pk},false,function(r){
			//$('#ridedutestModal').modal('hide');
			$(".modal-backdrop").hide();
			loadWodemiankaoshenq("wodemiankaoshenq");
		});
	} else {//提交
		/*
		var nextNodeInfos = {
			"moduleId":"eduRidTest",
			"workflowId":"eduRidTest",
			"pkValue":pk,
			"oprNo":"0",
			"currentNodeId":"node_1",
			"nextNodes":[{
				"nextNodeId":"node_2",
				"handleUsers":user
			}],
			"opinion":"",
			"urgentFlag":"N"
		}*/
		web.ajax(basePath+'edu/eduRidTest/submitRidShenq.ajax',{stuCourseNo:stuCourseNo},false,function(r){
			if(r.state == 0){
				$(".modal-backdrop").hide();
				loadWodemiankaoshenq("wodemiankaoshenq");
			}else{
				messageDialogShow("提示", r.msgInfo, 2);
				return;
			}
		});
	}
}

/**
 * 
 */
function queryRidTest(){
	var keyword = $('#ridtestkeyword').val();
	loadWodemiankaoshenq1('wodemiankaoshenq',keyword);
}

/**
 * 我的培养计划 老
 */
function loadMyTrainPlan(id){
	var info = '';
	web.ajax(basePath + 'edu/eduTrainplan/findMyTrainPlan.ajax', {
		userId : userId
	}, true, function(r) {
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		if (r.flag) {
			
			$("#trainplanInfo").html(r.notes);
			$('.cultivation_plan_course').show();
			$('#course').on('click', function() {
				cultivation_course();
			});
			$('#plan').on('click', function() {
				cultivation_plan();
			});
			$('#showPlanNote').on('click',function(){
				showPlanNote(this);
			})
		} else {
			return;
		}
	});
}
/**
 * 我的培养计划 新
 */
function loadMyTrainPlanNew(id){
	var info = '';
	web.ajax(basePath + 'edu/eduTrainplan/findMyTrainPlanNew.ajax', {
		userId : userId
	}, true, function(r) {
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		if (r.flag) {
			
			$("#trainplanInfo").html(r.notes);
			$('.cultivation_plan_course').show();
			$('#course').on('click', function() {
				cultivation_course();
			});
			$('#plan').on('click', function() {
				cultivation_plan();
			});
			$('#showPlanNote').on('click',function(){
				showPlanNote(this);
			})
		} else {
			return;
		}
	});
}

/**
 * 
 */
function showPlanNote(obj){
	var flag = $(obj).attr('data');
	if('open' == flag){
		$('#trainplanInfo').fadeIn('fast');
		$(obj).attr('data','close');
		$(obj).html('<i class="fa fa-angle-up" id="up"></i>收起</span>');
	}else{
		$('#trainplanInfo').fadeOut('fast');
		$(obj).attr('data','open');
		$(obj).html('<i class="fa fa-angle-down" id="up"></i>展开</span>');
	}
}

/**
 * 加载教学过程评价
 */
function loadEvalInstance(id){
	$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
	if('evaluationTeaching' == id){
		var type = 'C';
		$('#' + id + '1-tmpl').empty();
		web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findEvaluationTeaching.ajax",{userid:userId,param:type},true,function(r){
			removeWaittingMask();
			$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
		});
	}else{
		removeWaittingMask();
	}
}

/**
 * 加载专题评价
 * @param id
 */
function loadZhuanTiEvaluation(id){
	web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findZhuanTiEvaluation.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		if(r.flag){
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		}else{
			return;
		}
	});
	
}
/**
 * 加载辅导员评价
 * @param id
 */
function loadFuDaoYuanEvaluation(id){
	web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findFuDaoYuanEvaluation.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		if(r.flag){
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		}else{
			return;
		}
	});
	
}

/**
 * 教学评价----评价记录
 * @param id
 */
function loadEvaluationRecord(id){
	$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
	web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findEvaluationRecord.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '1-tmpl').tmpl(r).appendTo('#tbodylh');
		$("#number").html(r.number);
	});
}

/**
 * 教学过程评价--开始评价
 */
function beginEvaluation(obj,paperNo){
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	var winObj =  window.open(basePath + "web/evaluationteachingquestion.htm?userid="+userId+"&evaluationProject="+encodeURI(encodeURI(evaluationProject))+"&paperNo="+paperNo, '_blank');
	var loop = setInterval(function(){
		if(winObj.closed){
			clearInterval(loop);
			$("#main_content").empty();
			loadEvalInstance('evaluationTeaching');
		}
	}, 1000);
}


/**
 * 教师评价---开始评价
 */
function startEval(obj,teaName,paperNo,teaNo,courName){
	var evaluationProject = teaName;
	var winObj = window.open(basePath + "web/teacherevaluationquestion.htm?evaluationProject=" + 
			encodeURI(encodeURI(evaluationProject))+
			"&paperNo="+paperNo+
			"&userid="+userId+
			"&teaNo="+teaNo+
			"&courName="+encodeURI(encodeURI(courName)), '_blank');
	var loop = setInterval(function(){
		if(winObj.closed){
			clearInterval(loop);
			$("#main_content").empty();
			teacherEvaluation('teacherEvaluation');
		}
	}, 1000);
}

/**
 * 专题评价----开始评价
 */
function beginzhuanTiEvaluation(obj,paperNo){
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	var winObj = window.open(basePath + "web/zhuantievaluationquestion.htm?evaluationProject=" + 
			encodeURI(encodeURI(evaluationProject))+
			"&paperNo="+paperNo+
			"&userid="+userId, '_blank');
	var loop = setInterval(function(){
		if(winObj.closed){
			clearInterval(loop);
			$("#main_content").empty();
			loadEvaluationRecord('zhuanTiEvaluation');
		}
	}, 1000);
}
/**
 * 辅导员评价----开始评价
 */
function beginfuDaoYuanEvaluation(obj,unionKey){
	web.ajax(basePath+"edu/jw/eduEvalPaperInstance/saveNavigation.ajax",{unionKey:unionKey},true,function(r){
		if(r.state==0){
				var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
				var winObj = window.open(basePath + "web/evaluationinstructorquestion.htm?evaluationProject=" + 
						encodeURI(encodeURI(evaluationProject))+
						"&unionKey="+unionKey+
						"&userid="+userId, '_blank');
				var loop = setInterval(function(){
					if(winObj.closed){
						clearInterval(loop);
						$("#main_content").empty();
						loadFuDaoYuanEvaluation("fuDaoYuanEvaluation");
					}
				}, 1000);
			}else if(r.state==1){
				aweto.Dialog.show('提示',r.msgInfo);
			}else if(r.state==2){
				aweto.Dialog.show('提示',r.msgInfo);
			}
	});
}

/**
 * 教学过程评价--查看评价结果
 */
function viewStudentEval(obj,unionKey,state){
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	var winObj = window.open(basePath + "web/evaluationinstructorquestion.htm?userid="+userId+"&state="+state+
			"&evaluationProject="+encodeURI(encodeURI(evaluationProject))+
			"&unionKey="+unionKey, '_blank');
	var loop = setInterval(function(){
		if(winObj.closed){
			clearInterval(loop);
			$("#main_content").empty();
			loadFuDaoYuanEvaluation("fuDaoYuanEvaluation");
		}
	}, 1000);
	
}
/**
 * 教学过程评价--查看评价结果
 */
function checkEvalTeaching(obj,paperNo){
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	window.open(basePath + "web/evaluationteachingquestioninfo.htm?userid="+userId+
			"&evaluationProject="+encodeURI(encodeURI(evaluationProject))+
			"&paperNo="+paperNo, '_blank');

}

/**
 * 教师评价--查看评价结果
 */
function checkEval(obj,paperNo,paperType,teaNo,courName){
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	window.open(basePath + "web/teacherevaluationquestioninfo.htm?userid="+userId+
			"&evaluationProject="+encodeURI(encodeURI(evaluationProject))+
			"&paperNo="+paperNo+
			"&paperType="+paperType+
			"&teaNo="+teaNo+
			"&courName="+encodeURI(encodeURI(courName)), '_blank');

}

/**
 * 专题评价--查看评价结果
 */
function checkZhanTiEval(obj,paperNo,paperType){
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	window.open(basePath + "web/zhuantievaluationquestioninfo.htm?userid="+userId+"&evaluationProject="+encodeURI(encodeURI(evaluationProject))+"&paperNo="+paperNo+"&paperType="+paperType, '_blank');

}

/**
 * 评价记录
 */
function beginEvalationRecord(obj){
	var paperType = $(obj).parent().parent().find('.paperType').text();
	var evaluationProject = $(obj).parent().parent().find('.evaluationProject').text();
	if(paperType == '教学过程评价'){
		var winObj = window.open(basePath + "web/evaluationteachingquestion.htm?evaluationProject="+encodeURI(encodeURI(evaluationProject)), '_blank');
		var loop = setInterval(function(){
			if(winObj.closed){
				clearInterval(loop);
				$("#main_content").empty();
				loadEvalInstance('evaluationTeaching');
			}
		}, 1000);
	}else if(paperType == '教师评价'){
		var winObj = window.open(basePath + "web/teacherevaluationquestion.htm?evaluationProject=" + encodeURI(encodeURI(evaluationProject)), '_blank');
		var loop = setInterval(function(){
			if(winObj.closed){
				clearInterval(loop);
				$("#main_content").empty();
				teacherEvaluation('teacherEvaluation');
			}
		}, 1000);
	}else{
		var winObj = window.open(basePath + "web/zhuantievaluationquestion.htm?evaluationProject="+encodeURI(encodeURI(evaluationProject)), '_blank');
		var loop = setInterval(function(){
			if(winObj.closed){
				clearInterval(loop);
				$("#main_content").empty();
				loadEvaluationRecord('zhuanTiEvaluation');
			}
		}, 1000);
	}
	
	
}

/**
 * 教学评价----评价记录----重置按钮
 */
function clearER(){
	$("#papertypeOfER option:first").prop("selected", 'selected');
	$('#s_startTime_min').val("");
	$('#s_startTime_max').val("");
}

/**
 * 教学评价----评价记录----查询按钮
 */
function findER(){
	var papertype = $("#papertypeOfER").val();
	if(papertype==''){
		papertype = 'null';
	}
	var startTimeMin = $('#s_startTime_min').val();
	var startTimeMax = $('#s_startTime_max').val();
	if(startTimeMin!='' && startTimeMax!=''){
		
	}else if(startTimeMin=='' && startTimeMax==''){
		startTimeMax = 'null';
		startTimeMin = 'null';
	}else{
		messageDialogShow("提示", "评价时间未填全，请重新填写！",2);
		return;
	}
	if(papertype=='null'&&(startTimeMin=='null' && startTimeMax=='null')){
		web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findEvaluationRecord.ajax",{userid:userId},false,function(r){
			if(r.flag){
				$('#main_content').empty();
				$('#evaluationRecord-tmpl').tmpl(r).appendTo('#main_content');
				$('#evaluationRecord1-tmpl').tmpl(r).appendTo('#tbodylh');
			}else{
				return;
			}
		});
	}else{
		web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findER.ajax",{userid:userId,papertype:papertype,startTimeMin:startTimeMin,startTimeMax:startTimeMax},false,function(r){
			if(r.flag){
				$('#main_content').empty();
				$('#evaluationRecord-tmpl').tmpl(r).appendTo('#main_content');
				$('#evaluationRecord1-tmpl').tmpl(r).appendTo('#tbodylh');
				$("#papertypeOfER").val(papertype);
				if(startTimeMax == 'null'&&startTimeMin == 'null'){
					$('#s_startTime_min').val('');
					$('#s_startTime_max').val('');
				}else{
					$('#s_startTime_min').val(startTimeMax);
					$('#s_startTime_max').val(startTimeMax);
				}
				
			}else{
				return;
			}
		});
	}
		
	
}

/**
 * 培养计划点击事件
 */
function cultivation_course() {
	$('.cultivation_plan_course').show();
	$('.cultivation_plan_plan').hide();
}

/**
 * 教学评价----评价记录----查询按钮
 */
function cultivation_plan() {
	$('.cultivation_plan_course').hide();
	$('.cultivation_plan_plan').show();
}

/**
 * 我要报名按钮事件
 */
function bmbtnClick(obj) {
	var bmcondition = document.getElementById('bmcondition').checked;
	var disabledSelect = $('#disabledSelect').val();
	if(isEmpty(disabledSelect)){
		messageDialogShow('提示', '请先选择报考类型！', 3);
		return;
	}
	if (true == bmcondition) {//同意招生条件后,页面跳转到报名表单填写
		loadStuInfo(disabledSelect, '');
	} else {
		messageDialogShow('提示', '请先同意报名须知！', 3);
		return;
	}
}

/**
 * 获取入学考试成绩
 */
function testSocres() {
	web.ajax(basePath + 'edu/jw/studentApply/findTestSocres.ajax', {
		userid : userId
	}, true, function(r) {
		$("#totalScore").html(r.testScores[0].totalScore + "分");
		$("#majorName").html(r.testScores[0].majorName);
	});

}

/**
 * 判断学生是否有资格考试
 */
function examScores() {
	web.ajax(basePath + 'exam/studentApply/findTestSocres.ajax', {
		userid : userId
	}, true, function(r) {

	});
}

/**
 * 获取学生报名状态
 */
function checkStudentState() {
	$('#main_content').empty();
	$('#admissionprocess-tmpl').tmpl().appendTo('#main_content');
	removeWaittingMask();
	document.getElementById('admissionprocesse').src = basePath+'web/ucenter/circle.jsp?userId='+userId;
}

/**
 * 
 */
function signupEnd() {
	web.ajax(basePath + 'edu/jw/studentApply/findTestSocres.ajax', {
		userid : userId
	}, true, function(r) {
		var majorName = r.testScores[0].majorName;
		$("#signupResult").html("恭喜您，通过我院的招生考试，录取专业为" + majorName + "专业");
		$(".letter-admission").css("color", "#3884D9");
		$(".letter-admission").css("border", "dotted");
	});
}

/**
 * 加载学生报名信息
 * @param val
 * @param sta
 * @return
 */
function loadStuInfo(val, sta) {
	var info = '';
	var state ='';
	var chushenDelState = "";
	web.ajax(basePath + 'edu/jw/studentApply/findSignUpInfo.ajax', {
		userid : userId
	}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		$('#main_content').hide();
		if (!isEmpty(val)) {
			r.stuCategory = val;
		} else {
			if (r.edustudentapply) {
				info = JSON.parse(r.edustudentapply);
				r.stuCategory = info.stuCategory;
				state=r.state;
				chushenDelState = r.chushenDelState;
			}
		}
		
		//加载表格  myinfo-tmp.jsp
		$('#bmform-tmpl').tmpl(r).appendTo('#main_content');
		//$('#proofAttachName').html(r.attachName);
		
		if(state=='03' || state=='04' ||state=='05'){
			$("#admissionCard").parent().parent().show();
		}
		
		//清空动态加载的下拉框内容,招生计划
		$('#cenPlanNo').empty();
		$('#cenPlanNo').append("<option value=''>请选择招生计划</option>");
		//批次
		$('#cpItemNo').empty();
		$('#cpItemNo').append("<option value=''>请选择批次</option>");
		//专业
		$('#majorNo').empty();
		$('#majorNo').append("<option value=''>请选择专业</option>");
		
		$('#stuCategory').val(r.stuCategory);
		$('#main_content').fadeIn('fast');
		
		//数据校验
		checkDataValid();
		
		// 保存事件注册
		$('#saveSignFormBtn').on('click', function() {
			saveSignFormBtn(this);
		});

		// 提交事件注册
		$('#submitSignFormBtn').on('click', function() {
			submitSignFormBtn(this);
		});
		
		//照片上传事件注册
		if($("#uploadify")){
			$("#uploadify").uploadify({
		        'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
		        'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
		        'auto': true,
		        'multi': false,
		        'queueID' : 'queue',
		        'queueSizeLimit':'1',
		        'fileSizeLimit':'30K',
		        "buttonText": "上传照片",
		        'fileTypeExts': '*.jpg',
		        'fileExt': '*.jpg',
		        'fileDesc': 'Image(*.jpg)',
		        "buttonClass": "btn btn-primary",
		        'overrideEvents': ['onDialogClose'],
		        'onUploadStart':function(file){
		        	/*if(file.size<30*1024){
		        		messageDialogShow("提示","文件 [" + file.name + "] 大小小于系统限制的30K"+ "大小！", 2);
		        		return;
		        	}*/
		        	if(file.size>30*1024){
		        		alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#uploadify').uploadify('settings', 'fileSizeLimit') + "大小！");
		        		return;
		        	}
		        },
		      //返回一个错误，选择文件的时候触发  
		        'onSelectError': function (file, errorCode, errorMsg) {  
		            switch (errorCode) {  
		                case -100:  
		                	messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#uploadify').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
		                    return;  
		                case -110:  
		                	messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#uploadify').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
		                    return;  
		                case -120:  
		                	messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
		                    return;  
		                case -130:  
		                	messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
		                    return;  
		            }
		            return false;
		        }, 
		        
		        'onUploadSuccess': function (file, data, response) {// 上传成功后执行
		        	data = JSON.parse(data);
		        	var path = data.value.replace('//','/').replace('/Liems/','');
		        	var imgWidth;
				    var imgHeight;
					var img = new Image();
					img.onload = function(){
			        	imgWidth = img.width;
				    	imgHeight = img.height;
				    	if(imgWidth==undefined || imgHeight == undefined){
				    		messageDialogShow("提示","图片上传失败！", 2);
							return;
					    }
						if(imgWidth != 240){
							messageDialogShow("提示","图片宽度规定：240px", 2);
							return;
						}
						if(imgHeight != 320){
							messageDialogShow("提示","图片高度规定：320p", 2);
							return;
						}
						$('#photo').val(path);
	                    $('#' + file.id).find('.data').html(' 上传完毕');
	                    document.getElementById('photoImgA').src = basePath+path;
	                    $("#photoEmptyImageButton").css("display","block");
			        };
				    img.src = path;
                 },
                 'onFallback': function () {
                     messageDialogShow("提示","未检测到兼容版本的Flash.", 2);
                 }
		    });
			$('#uploadify-button').css('line-height','normal');
		}
		
		//扫描件上传事件
		if($("#smphoto")){
			$("#smphoto").uploadify({
		        'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
		        'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
		        'auto': true,
		        'multi': false,
		        'queueID' : 'queue',
		        "buttonText": "上传证书",
		        'fileSizeLimit':'3MB',
		        'fileTypeExts': '*.jpg; *.png; *.gif;',
		        "buttonClass": "btn btn-primary",
		        'overrideEvents': ['onDialogClose'],
		      //返回一个错误，选择文件的时候触发  
		        'onSelectError': function (file, errorCode, errorMsg) {  
		            switch (errorCode) {  
		                case -100: 
		                	messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#smphoto').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
		                    return;  
		                case -110: 
		                	messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#smphoto').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
		                    return;  
		                case -120:  
		                	messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
		                    return;  
		                case -130:
		                	messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
		                    return;  
		            }  
		        },
		        'onUploadSuccess': function (file, data, response) {// 上传成功后执行
		        	data = JSON.parse(data);
		        	var path = data.value.replace('//','/').replace('/Liems/','');
		        	$('#photoFj').val(path);
                    $('#' + file.id).find('.data').html('上传完毕');
                    document.getElementById('photoImgB').src = basePath+path;
                    $("#photoFjEmptyImageButton").css("display","block");
                 },
                 'onFallback': function () {
                     //alert('未检测到兼容版本的Flash.');
                     messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
                 }
		    });
			$('#smphoto-button').css('line-height','normal');
		}
		
		//学历截图上传事件
		if($("#eduphoto")){
			$("#eduphoto").uploadify({
		        'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
		        'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
		        'auto': true,
		        'multi': false,
		        'queueID' : 'queue',
		        "buttonText": "上传学历截图",
		        'fileSizeLimit':'3MB',
		        'fileTypeExts': '*.jpg; *.png; *.gif;',
		        "buttonClass": "btn btn-primary",
		        'overrideEvents': ['onDialogClose'],
		      //返回一个错误，选择文件的时候触发  
		        'onSelectError': function (file, errorCode, errorMsg) {  
		            switch (errorCode) {  
		            case -100: 
	                	messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#eduphoto').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
	                    return;  
	                case -110: 
	                	messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#eduphoto').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
	                    return;  
	                case -120:  
	                	messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
	                    return;  
	                case -130:
	                	messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
	                    return;  
		            }  
		        },
		        'onUploadSuccess': function (file, data, response) {// 上传成功后执行
		        	data = JSON.parse(data);
		        	var path = data.value.replace('//','/').replace('/Liems/','');
		        	$('#educationalProof').val(path);
                    $('#' + file.id).find('.data').html('上传完毕');
                    document.getElementById('photoImgC').src = basePath+path;
                    $("#educationalProofEmptyImageButton").css("display","block");
                 },
                 'onFallback': function () {
                	//alert('未检测到兼容版本的Flash.');
                     messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
                 }
		    });
			$('#eduphoto-button').css('line-height','normal');
		}
		
		//学历截图上传事件
		if($("#plaphoto")){
			$("#plaphoto").uploadify({
		        'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
		        'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
		        'auto': true,
		        'multi': false,
		        'queueID' : 'queue',
		        "buttonText": "上传异地证明",
		        'fileSizeLimit':'3MB',
		        'fileTypeExts': '*.jpg; *.png;',
		        "buttonClass": "btn btn-primary",
		        'overrideEvents': [ 'onDialogClose'],
		      //返回一个错误，选择文件的时候触发  
		        'onSelectError': function (file, errorCode, errorMsg) {  
		            switch (errorCode) {  
		            case -100: 
	                	messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#plaphoto').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
	                    return;  
	                case -110: 
	                	messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#plaphoto').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
	                    return;  
	                case -120:  
	                	messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
	                    return;  
	                case -130:
	                	messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
	                    return; 
		            }  
		        },
		        'onUploadSuccess': function (file, data, response) {// 上传成功后执行
		        	data = JSON.parse(data);
		        	var path = data.value.replace('//','/').replace('/Liems/','');
		        	$('#placeProof').val(path);
                    $('#' + file.id).find('.data').html('上传完毕');
                    document.getElementById('photoImgD').src = basePath+path;
                    $("#placeProofEmptyImageButton").css("display","block");
                 },
                 'onFallback': function () {
                	//alert('未检测到兼容版本的Flash.');
                     messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
                 }
		    });
			$('#plaphoto-button').css('line-height','normal');
		}
		
		// 站点选择事件注册
		$('#centerNo').on('change', function() {
			centerOnchange(this);
		});
		
		// 招生计划选择事件注册
		$('#cenPlanNo').on('click', function() {
			cenPlanNoOnclick(this);
		});
		
		// 招生计划选择事件注册
		$('#cenPlanNo').on('change', function() {
			cenPlanOnchange(this);
		});
		
		// 招生批次选择事件注册
		$('#cpItemNo').on('click', function() {
			cpItemNoOnclick(this);
		});
		
		// 招生专业选择事件注册
		$('#majorNo').on('click', function() {
			majorNoOnclick(this);
		});
		
		// 招生专业改变时间校验人数是否报满
		$('#majorNo').on('change', function() {
			majorNoOnChange(this);
		});
		
		// 培养层次选择事件
		$('#levelNo').on('change', function() {
			levelNoOnchange(this);
		});
		//对于已经报名的,但是没有提交的,将数据赋值给表单
		if (r.edustudentapply) {
			var province = info.province;
			var city = info.city;
			if(province==""||province==undefined){
				province=info.idCard.substring(0,2);
				info.province=province;
			}
			$("#city").empty();
			$("#city").append("<option value=''>请选择城市</option>");
			for(var j = 1; j < cityArr[province].length; j++) {
				$("#city").append("<option value='" + cityArr[province][j] + "'>" + cityArr[province][j] + "</option>");
			}
			var photo = info.photo;
			if(!isEmpty(photo)){
				$('#photoImgA').attr('src',basePath+photo);
			}
			
			var photoFj = info.photoFj;
			if(!isEmpty(photoFj)){
				$('#photoImgB').attr('src',basePath+photoFj);
			}
			
			var placeProof = info.placeProof;
			if(!isEmpty(placeProof)){
				$('#photoImgD').attr('src',basePath+placeProof);
			}
			
			var educationalProof = info.educationalProof;
			if(!isEmpty(educationalProof)){
				$('#photoImgC').attr('src',basePath+educationalProof);
			}
			//根据数值判断是否显示清空按钮
			if(info.photo||"" !=""){
				$("#photoEmptyImageButton").css("display","block");
			}else{
				$("#photoEmptyImageButton").css("display","none");
			}
			if(info.photoFj||"" !=""){
				$("#photoFjEmptyImageButton").css("display","block");
			}else{
				$("#photoFjEmptyImageButton").css("display","none");
			}
			if(info.educationalProof||"" !=""){
				$("#educationalProofEmptyImageButton").css("display","block");
			}else{
				$("#educationalProofEmptyImageButton").css("display","none");
			}
			if(info.placeProof||"" !=""){
				$("#placeProofEmptyImageButton").css("display","block");
			}else{
				$("#placeProofEmptyImageButton").css("display","none");
			}
			//站点下拉框构建
			var stuCategory = info.stuCategory;
			var levelNo = info.levelNo;
			web.ajax(basePath+'edu/jw/zsCenPlan/findCenter.ajax',{stuCategory:stuCategory,levelNo:levelNo},false,function(r){
				$('#centerNo').empty();
				var html= "<option value='' selected='selected'>请选择站点</option>";
				if(r.flag == true){
					//有值,则代表该学习形式和培养层次下,存在可供站点选择;
					for(var i=0;i<r.data.length;i++){
						html += "<option value='"+r.data[i].centerNo+"'>"+r.data[i].centerName+"</option>";
					}
				}
				$('#centerNo','#signupForm').append(html);
			});
			
			//招生计划下拉框构建
			var centerNo = info.centerNo;
			if(!isEmpty(centerNo)){
				web.ajax(basePath + "edu/jw/zsCenPlan/findByCenterByNo.ajax", {centerNo:centerNo,stuCategory:stuCategory}, false, function(r) {
					$("#cenPlanNo").empty();
					$("#cenPlanNo").append("<option value=''>请选择招生计划</option>");
					for ( var i = 0; i < r.data.length; i++) {
						$("#cenPlanNo").append("<option value='" + r.data[i].cenPlanNo + "'>" + r.data[i].cenPlanName + "</option>");
					}
				});
			}
			
			//批次和专业下拉框构建
			var cenPlanNo = info.cenPlanNo;
			if(!isEmpty(cenPlanNo)){
				//批次
				web.ajax(basePath + "edu/jw/zsCenPlanItem/findByCenterPlan.ajax", {cenPlanNo : cenPlanNo}, false, function(r) {
					$("#cpItemNo").empty();
					$("#cpItemNo").append("<option value=''>请选择招生批次</option>");
					for ( var i = 0; i < r.length; i++) {
						$("#cpItemNo").append("<option value='" + r[i].cpItemNo + "'>" + r[i].cpItemName + "</option>");
					}
				});
				//专业
				web.ajax(basePath + "edu/jw/zsCenPlanMajor/findByCenterPlan.ajax", {cenPlanNo : cenPlanNo,levelNo:levelNo}, false, function(r) {
					$("#majorNo").empty();
					$("#majorNo").append("<option value=''>请选择专业</option>");
					for ( var i = 0; i < r.data.length; i++) {
						$("#majorNo").append("<option value='" + r.data[i].majorNo + "'>" + r.data[i].majorName+ "</option>");
					}
				});
			}
			$('#signupForm').setFormValue(info);
		}

		if (!isEmpty(sta) && -1 != sta) {
			$('input,select,textarea', $('#signupForm')).attr('disabled', "disabled");
			$('#saveSignFormBtn').hide();
			$('#submitSignFormBtn').hide();
			$('#uploadify').hide();
			$('#smphoto').hide();
			$('#proofButton').hide();
			$('#eduphoto').hide();
			$('#plaphoto').hide();
			$('#infoMsg2').show();
			$('#infoMsg1').hide();
		}else {
			$('input,select,textarea', $('#signupForm')).removeAttr('disabled');
			$('#saveSignFormBtn').show();
			$('#submitSignFormBtn').show();
			$('#uploadify').show();
			$('#smphoto').show();
			$('#eduphoto').show();
			$('#plaphoto').show();
			$('#infoMsg2').hide();
			$('#infoMsg1').show();
		}
		
		if(!isEmpty(sta) && "-1" == sta && chushenDelState != ""){
			$("#stuName").attr("disabled","disabled");
			$("#idcardtype").attr("disabled","disabled");
			$("#idCard").attr("disabled","disabled");
			$("#birthday").attr("disabled","disabled");
			$("#sex").attr("disabled","disabled");
			$("#ethnic").attr("disabled","disabled");
			//$("#province").attr("disabled","disabled");
			//$("#address").attr("disabled","disabled");
			//$("#city").attr("disabled","disabled");
			if($("#photo").val() !=""){
				$("#photoEmptyImageButton").hide();
			}
			if($("#mobile").val() !=""){
				$("#mobile").attr("disabled","disabled");
			}
			layer.alert("学生的基本信息（身份证信息）只有一次机会,不能再次修改！",{
				title:'提示',
				icon: 4,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
		}
		
		/*//处在‘00’状态可编辑 其他的状态不可编辑
		if(!isEmpty(sta) && "00" == sta){
			$('input,select,textarea', $('#signupForm')).attr('readonly', false);
			$('#submitSignFormBtn').show();
			$('#uploadify').show();
			$('#smphoto').show();
			$('#proofButton').show();
		}*/
		
		checkLevel();
		$("#birthday").attr("disabled","disabled");
		$("#sex").attr("disabled","disabled");
		$("#stuCategory").attr("disabled","disabled");
		$("#graduateSchoolCode").attr("disabled","disabled");
		$("#schoolName").attr("disabled","disabled");
		
		$('#province').on('change',function(){
			chooseCity();
		});
		
//		$('#graduationNum').on('change',function(){
//			chooseGraduationNum();
//		});
		
		//身份证填写
		$("#idCard").on('change',function(){
			var idCard = $("#idCard").val();
			var idcardtype = $("#idcardtype").val();
			if(idcardtype=="01"){
				var arr = IdentityCodeValid(idCard);
			}
		});
		
		$("#idcardtype").on('change',function(){
			var idcardtype = $("#idcardtype").val();
			if(idcardtype == '01'){
				$("#birthday").attr("disabled","disabled");
				$("#sex").attr("disabled","disabled");
				$("#province").attr("disabled","disabled");
				$("#idCard").val("");
				$("#birthday").val("");
				$("#sex").val("");
				$("#province").val("");
			}else{
				$("#birthday").removeAttr("disabled");
				$("#sex").removeAttr("disabled");
				$("#province").removeAttr("disabled");
				$("#idCard").val("");
				$("#birthday").val("");
				$("#sex").val("");
				$("#province").val("");
			}
		});
		
		lay('.laydate-item').each(function(){
			laydate.render({
				elem: this
			});
		}); 
	});
}
/**
 * 学生报名页面照片清空
 */
function deletePhoto(obj,type,id){
	var imagePath = $("#"+type).val()||"";
	if(imagePath!=""){
		layer.confirm('重要资料，是否确认清空?', 
				{
			btn: ['确定','取消'] //按钮
				}, 
				function(){
					layer.closeAll();
					$("#"+type).val("");
					$("#"+id).attr("src","");
				},
				function(){
					layer.closeAll();
				}
		);
		
	}
}


/**
 * 
 */
function trim(str) {  
    return str.replace(/^\s*|\s*$/g, "");  
}

/**
 * 
 */
function checkLevel(){
	var levelNo = $("#levelNo").val()||"";
	if(levelNo=="2"){
		$('#schoolNameLabel','#signupForm').empty();
		$('#schoolNameLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业学校");
		$('#specialityLabel','#signupForm').empty();
		$('#specialityLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业专业");
		$('#graduateDateLabel','#signupForm').empty();
		$('#graduateDateLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业时间");
		$('#graduationNumLabel','#signupForm').empty();
		$('#graduationNumLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业证书编号");
		$('#graduateSchoolCodeLabel','#signupForm').empty();
		$('#graduateSchoolCodeLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业学校代码");
	}else{
		$('#schoolNameLabel','#signupForm').empty();
		$('#schoolNameLabel','#signupForm').append("毕业学校");
		$('#specialityLabel','#signupForm').empty();
		$('#specialityLabel','#signupForm').append("毕业专业");
		$('#graduateDateLabel','#signupForm').empty();
		$('#graduateDateLabel','#signupForm').append("毕业时间");
		$('#graduationNumLabel','#signupForm').empty();
		$('#graduationNumLabel','#signupForm').append("毕业证书编号");
		$('#graduateSchoolCodeLabel','#signupForm').empty();
		$('#graduateSchoolCodeLabel','#signupForm').append("毕业学校代码");
	}
}

/**
 * 验证身份证
 */
function IdentityCodeValid(code) {
	$("#birthday").val("");
    $("#sex").val("");
    $("#province").val("");
    $("#city").val("");
    $("#address").val("");
	var province='',birthday='',sex='';
    code=trim(code);
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
    		21:"辽宁",22:"吉林",23:"黑龙江 ",
    		31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
    		41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",
    		50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",
    		61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
    		71:"台湾",81:"香港",82:"澳门"};
    if(!isEmpty(code)){
    	if(!city[code.substring(0,2)]){
        	messageDialogShow('提示',"地址编码错误",2);
            province='',birthday='',sex='';
            return false;
        }
    }
    
    //省份
    province = code.substring(0,2);   
    //生日
    birthday = code.substring(6,10)+'-'+code.substring(10,12)+'-'+code.substring(12,14);
    //性别
    sex = code.substring(14,17)%2==0 ? '2':'1';
    $("#birthday").val(birthday);
    $("#sex").val(sex);
    $("#province").val(province);
    $("#city").empty();
	$("#city").append("<option value=''>请选择城市</option>");
	for(var j = 1; j < cityArr[province].length; j++) {
		$("#city").append("<option value='" + cityArr[province][j] + "'>" + cityArr[province][j] + "</option>");
	}
	if(province == '11' || province == '12' || province == '31' || province == '50'){
		$("#city").val(area.getCountyByIdCard(code));
	}else{
		$("#city").val(area.getCityByIdCard(code));
	}
	//$("#address").val(area.getAddressByIdCard(code));
}

/**
 * 
 */
function  checkDataValid(){
	$("#signupForm").bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
      	},
      	fields: {
      		stuName: {
      			validators: {
      				notEmpty: {
                    	message: '请填写姓名!'
              		}
          		}
      		},
      		idcardtype: {
      			validators: {
      				notEmpty: {
                    	message: '请选择证件类型!'
              		}
          		}
      		},
      		occupationalStatus: {
      			validators: {
      				notEmpty: {
                    	message: '请选择职业状况!'
              		}
          		}
      		},
      		isDreamplan: {
      			validators: {
      				notEmpty: {
                    	message: '请选择相应类型!'
              		}
          		}
      		},
      		centerNo: {
      			validators: {
      				notEmpty: {
                    	message: '请选择站点!'
              		}
          		}
      		},
      		cenPlanNo: {
      			validators: {
      				notEmpty: {
                    	message: '请选择招生计划!'
              		}
          		}
      		},
      		majorNo: {
      			validators: {
      				notEmpty: {
                    	message: '请选择专业!'
              		}
          		}
      		},
      		cpItemNo: {
      			validators: {
      				notEmpty: {
                    	message: '请选择批次!'
              		}
          		}
      		},
      		idCard: {
      			validators: {
      				notEmpty: {
                    	message: '请填写证件号码!'
              		},
//              		regexp: {
//                        regexp: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/,
//                        message: '证件号码格式不正确!'
//                    },
                    callback: {
		                message: '该证件号码已经注册,请更换',
		                callback: function(value, validator,$field) {
		                	var state;
		                	var flag = true;
		                	var applyNo = $("#applyNo","#signupForm").val() || '';
		                	var idcardtype = $("#idcardtype","#signupForm").val()||"";
		                	if(idcardtype=='01'){
		                		if(value.length<18){
		                			return {valid:false,message:'证件号码长度不正确！'};
		                		}
		                		if(value.search(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/)<0){
		                			return {valid:false,message:'证件号码格式不正确!'};
		                		}
		                	}else if(idcardtype=='02'){
		                		
		                	}else if(idcardtype=='03'){
		                		if(value.search(/^([1|5|7][0-9]{6}\([0-9Aa]\))|([a-zA-Z][0-9]{9})|(((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0−9aA]\)|[0-9aA]))$/)<0){
		                			return {valid:false,message:'证件号码格式不正确!'};
		                		}
		                	}else if(idcardtype=='04'){
		                		
		                	}
//		                	web.ajax(basePath+'edu/jw/studentApply/checkIdIsExisted.ajax',{value:value,applyNo:applyNo},false,function(r){
//		                		state = r.value;
//		                	})
		                	state = '';
		                	if('' != state){
		                		flag = false;
		                		return {valid:false,message:'该证件号码已经注册,请更换'};
		                	}
		                	return flag;
		                }
		            }
          		}
      		},
      		sex: {
      			validators: {
      				notEmpty: {
                    	message: '请选择性别!'
              		}
          		}
      		},
      		birthday: {
      			validators: {
      				notEmpty: {
                    	message: '请填写出生日期!'
              		},
              		regexp: {
                        regexp: /^[1-2]{1}([0-9]{3})-([0-1]{1})([0-9]{1})-(([0-2]){1}([0-9]{1})|([3]{1}[0-1]{1}))$/,
                        message: '日期格式不正确!'
                    }
          		}
      		},
      		graduateDate: {
      			validators: {
              		regexp: {
                        regexp: /^[1-2]{1}([0-9]{3})-([0-1]{1})([0-9]{1})-(([0-2]){1}([0-9]{1})|([3]{1}[0-1]{1}))$/,
                        message: '毕业日期格式不正确!'
                    }
          		}
      		},
      		studyGrDate: {
      			validators: {
              		regexp: {
                        regexp: /^[1-2]{1}([0-9]{3})-([0-1]{1})([0-9]{1})-(([0-2]){1}([0-9]{1})|([3]{1}[0-1]{1}))$/,
                        message: '预计毕业时间格式不正确!'
                    }
          		}
      		},
      		ethnic: {
      			validators: {
      				notEmpty: {
                    	message: '请选择民族!'
              		}
          		}
      		},
      		political: {
      			validators: {
      				notEmpty: {
                    	message: '请选择政治面貌!'
              		}
          		}
      		},
      		educationLevel: {
      			validators: {
      				notEmpty: {
                    	message: '请选择文化程度!'
              		}
          		}
      		},
      		techTitle: {
      			validators: {
      				notEmpty: {
                    	message: '请填写职称!'
              		}
          		}
      		},
      		address: {
      			validators: {
      				notEmpty: {
                    	message: '请填写联系地址!'
              		}
          		}
      		},
      		zipCode: {
      			validators: {
      				notEmpty: {
                    	message: '请填写邮编!'
              		},
              		regexp: {
                        regexp: /^[0-9][0-9]{5}$/,
                        message: '邮编格式不正确!'
                    }
          		}
      		},
      		province: {
      			validators: {
      				notEmpty: {
                    	message: '请选择省份!'
              		}
          		}
      		},
      		city: {
      			validators: {
      				notEmpty: {
                    	message: '请填写户籍城市!'
              		}
          		}
      		},
      		mail: {
      			validators: {
      				notEmpty: {
                    	message: '请填写邮箱地址!'
              		},
		      		regexp: {
		                regexp: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
		                message: '邮箱格式不正确!'
		            }
          		}
      		},
      		mobile: {
      			validators: {
      				notEmpty: {
                    	message: '请填写手机号码!'
                    		
              		},
		      		regexp: {
		      			regexp: /^1\d{10}$/,
		                message: '号码格式不正确!'
		            }
          		}
      		},
      		urgencyMoblie: {
      			validators: {
		      		regexp: {
		      			regexp: /^1\d{10}$/,
		                message: '号码格式不正确!'
		            }
          		}
      		},
      		levelNo: {
      			validators: {
      				notEmpty: {
                    	message: '请选择培养层次!'
              		}
          		}
      		},
      		graduationNum:{
      			validators: {
		      		regexp: {
		      			regexp: /^$|^[0-9\u4e00-\u9fa5]{5,20}$/,
		                message: '毕业证书编号格式不正确!'
		            }
          		}
      		},
      		schoolName:{
      			validators: {
      				regexp: {
      					regexp: /^[\u4e00-\u9fa5]{0,}$/,
      					message: '毕业学校值允许填写中文字符!'
      				}
      			}
      		}
      	}
	});
}

/**
 * 
 */
function uploadImg(){
}

/**
 * 提交个人基础信息
 */
function saveStuInfo(obj){
	$(obj).button('loading');
	//学号
	var stuNo = $("#stuNo").val();
	//照片
	var photo = $("#photo").val();
	//手机号码   
	//var mobile = $("#mobile").val();
	//邮箱  
	var mail = $("#mail").val();
	//qq   
	var qq = $("#qq").val();
	//地址   
	var address = $("#address").val();
	//邮箱   
	var zipCode = $("#zipCode").val();
	//紧急联系人  
	var urgencyMoblie = $("#urgencyMoblie").val();
	//紧急联系人 地址 
	var urgencyAddress = $("#urgencyAddress").val();
	web.ajax(basePath + 'edu/student/saveStuInfo.ajax', {
		stuNo : stuNo,
		photo : photo,
//		mobile : mobile,
		mail : mail,
		qq : qq,
		address : address,
		zipCode : zipCode,
		urgencyMoblie : urgencyMoblie,
		urgencyAddress : urgencyAddress
	}, true, function(r) {
		$(obj).button('reset');
		if (0 == r.state) {
			messageDialogShow('提示', r.msgInfo);
		} else {
			messageDialogShow('提示', r.msgInfo, 2);
		}
	});
}

/**
 * 修改密码保存事件
 */
function saveRepassword(obj) {
	$('#repassword-form').bootstrapValidator('validate');
	var flag = $("#repassword-form").data("bootstrapValidator").isValid();
	if (flag) {
		$(obj).button('loading');
		var newpassword = $('#newpassword').val();
		var renewpassword = $('#renewpassword').val();
		var mobileCode = $('#mobileCode').val();
		var mobile = $('#mobile').val();
		newpassword = Base64.encode(newpassword);
		newpassword = web.replace(newpassword, "=", "_");
		web.ajax(basePath + 'web/user/changePwd.ajax', {
			newpassword : newpassword,
			userid : userId,
			type:"1",
			mobileCode:mobileCode,
			mobile:mobile
		}, true, function(r) {
			$(obj).button('reset');
			if (0 == r.state) {
				loadRepassword("repassword");
				messageDialogShow('提示', r.msgInfo);
			} else {
				messageDialogShow('提示', r.msgInfo, 2);
			}
		});
	} else {
		return;
	}
}

/**
 * 报名保存事件
 */
function saveSignFormBtn(obj) {
	//$('#stuCategory').removeAttr('disabled');
	$('#graduateSchoolCode').removeAttr('disabled');
	var data = $('#signupForm').serializeJson();
	$('#signupForm').bootstrapValidator('validate');
	var flag = $("#signupForm").data("bootstrapValidator").isValid();
	data.state = '-1';
	data.stuCategory = $('#stuCategory').val();
	var idcardtype = trim($("#idcardtype").val());
	var idCard = trim($("#idCard").val());
	if("01" == idcardtype){
		//省份
		var province = idCard.substring(0,2);   
		//生日
		var birthday = idCard.substring(6,10)+'-'+idCard.substring(10,12)+'-'+idCard.substring(12,14);
		//性别
		var sex = idCard.substring(14,17)%2==0 ? '2':'1';
		data.province = province;
		data.birthday = birthday;
		data.sex = sex;
	}
	data.idcardtype = idcardtype;
	data.idCard = idCard;
	data.mobile = $('#mobile').val();;
	data.stuName = $('#stuName').val();
	data.ethnic = $('#ethnic').val();
	data.address = $('#address').val();
	if(flag){
		$("#signupForm").data('bootstrapValidator').destroy();
		$('#signupForm').data('bootstrapValidator', null);
		checkDataValid();
		$(obj).button('loading');
		web.ajax(basePath + 'edu/jw/studentApply/addStudentSignUp.ajax', {
			param : JSON.stringify(data),userid:userId
		}, true, function(r) {
			$('#stuCategory').attr('disabled','disabled');
			$(obj).button('reset');
			//alert(JSON.stringify(r.value));
			$('#applyNo').val(r.value);
			messageDialogShow('提示', r.msgInfo);
		});
	}else{
		messageDialogShow('提示', "请输入必填字段的值",2);
	}
}

/**
 * 报名提交事件
 */
function submitSignFormBtn(obj) {
	//判断是否选择专升本   需要提交学信网证明材料
	var levelNo = $("#levelNo").val();
	var schoolName=$("#schoolName").val();
	var speciality=$("#speciality").val();
	var graduateDate=$("#graduateDate").val();
	var graduationNum=$("#graduationNum").val();
	var graduateSchoolCode=$("#graduateSchoolCode").val();
	var photoUrl = $("#photo").val();
	var stuCategory = $("#stuCategory").val();
	//验证报名照片
	/*if(isEmpty(photoUrl)){
		messageDialogShow("提示","个人证件照片不能为空！",2);
		return;
	}*/
	if("2" == levelNo && "01"==stuCategory){
		if(isEmpty(schoolName)){
			messageDialogShow("提示","毕业学校不能为空",2);
			return;
		}
		if(isEmpty(speciality)){
			messageDialogShow("提示","毕业专业不能为空",2);
			return;
		}
		if(isEmpty(graduateDate)){
			messageDialogShow("提示","毕业时间不能为空",2);
			return;
		}
		if(isEmpty(graduationNum)){
			messageDialogShow("提示","毕业证书编号不能为空",2);
			return;
		}
		if(isEmpty(graduateSchoolCode)){
			messageDialogShow("提示","毕业学校代码不能为空",2);
			return;
		}
		/*if(isEmpty($("#photoFj").val())){
			messageDialogShow("提示","报考专升本的学生请提交专科(本科)毕业证书扫描件!",2);
			return;
		}
		if(isEmpty($("#educationalProof").val())){
			messageDialogShow("提示","报考专升本的同学需提交学信网学历截图!",2);
			return;
		}*/
	}
	//获取招生计划
	var cenPlanNo = $("#cenPlanNo").find("option:selected").val();
	//判断是否是异地
	var idcardtype = trim($("#idcardtype").val());
	var centerNo = $("#centerNo").val();
	var centerPro;
	var provinceYS;
	if("01" == idcardtype){
		var idCard = trim($("#idCard").val());
		//省份
		provinceYS = idCard.substring(0,2);	
	}
	if(!isEmpty(centerNo)){
		web.ajax(basePath + 'edu/eduCenter/findCenterByNo.ajax', {
			centerNo:centerNo
		}, false, function(r) {
			/*if(provinceYS != r.centerPro&&isEmpty($("#placeProof").val())){
				messageDialogShow("提示","异地报考的同学需提交异地证明材料",2);
				return;
			}*/
			
			var data = $('#signupForm').serializeJson();
			$('#signupForm').bootstrapValidator('validate');
			var flag = $("#signupForm").data("bootstrapValidator").isValid();
			data.state = '00';
			data.stuCategory = $('#stuCategory').val();
			var idcardtype = trim($("#idcardtype").val());
			if("01" == idcardtype){
				var idCard = trim($("#idCard").val());
				//省份
				var province = idCard.substring(0,2);   
				//生日
				var birthday = idCard.substring(6,10)+'-'+idCard.substring(10,12)+'-'+idCard.substring(12,14);
				//校验最小年龄限制
				web.ajax(basePath+"/edu/jw/zsCenPlan/checkAgeLimit.ajax",{cenPlanNo:cenPlanNo,birthday:birthday},false,function(s){
		    		if(s.flag=="false"){
		    			if(s.minAgeLimit!=undefined&&s.minAgeLimit!=""){
		    				messageDialogShow("提示","您还未达到招生的最小年龄："+s.minAgeLimit+"岁！",2);
		    			}
		    			flag=false;
		    			return;
		    		}
		    	})
				//性别
				var sex = idCard.substring(14,17)%2==0 ? '2':'1';
				data.province = province;
				data.birthday = birthday;
				data.sex = sex;
			}else{
				var idCard = trim($("#idCard").val());
				//省份
				var province = idCard.substring(0,2);   
				//生日
				var birthday = $("#birthday").val();
				//校验最小年龄限制
				web.ajax(basePath+"/edu/jw/zsCenPlan/checkAgeLimit.ajax",{cenPlanNo:cenPlanNo,birthday:birthday},false,function(s){
		    		if(s.flag=="false"){
		    			if(s.minAgeLimit!=undefined&&s.minAgeLimit!=""){
		    				messageDialogShow("提示","您还未达到招生的最小年龄："+s.minAgeLimit+"岁！",2);
		    			}
		    			flag=false;
		    			return;
		    		}
		    	})
				//性别
				var sex = idCard.substring(14,17)%2==0 ? '2':'1';
				data.province = province;
				data.birthday = birthday;
				data.sex = sex;
			}
			data.stuCategory = $('#stuCategory').val();
			data.graduateSchoolCode=graduateSchoolCode;
			data.idcardtype = idcardtype;
			data.idCard = idCard;
			data.mobile = $('#mobile').val();
			data.stuName = $('#stuName').val();
			data.ethnic = $('#ethnic').val();
			data.address = $('#address').val();
			if(flag){
				$("#signupForm").data('bootstrapValidator').destroy();
				$('#signupForm').data('bootstrapValidator', null);
				checkDataValid();
				layer.confirm('请确认所有信息正确无误，一旦提交，将不能更改，是否确认提交?', 
			            {
			              btn: ['确定','取消'] //按钮
			            }, 
			            function(){
			            	layer.closeAll();
				            web.ajax(basePath + 'edu/jw/studentApply/addStudentSignUp.ajax', {
								param : JSON.stringify(data),userid:userId
							}, false, function(r) {
								$(obj).button('reset');
								messageDialogShow('提示', r.msgInfo);
								$('input,select,textarea', $('#signupForm')).attr('disabled', "disabled");
								$('#saveSignFormBtn').hide();
								$('#submitSignFormBtn').hide();
								$('#smphoto').hide();
								$('#uploadify').hide();
								$("#wybm").delay(100).trigger("click");
							});
				            
			            },
			            function(){
			            	layer.closeAll();
			            }
			        );
			}
		});
	}
	
}

/**
 * 报名站点选择事件
 */
function centerOnchange(obj) {
	var centerNo = $(obj).val();
	var stuCategory = $('#stuCategory','#signupForm').val() || '';
	var levelNo = $('#levelNo','#signupForm').val() || '';
	$("#cenPlanNo").empty();
	$("#cpItemNo").empty();
	$('#cpItemNo','#signupForm').append("<option value='' selected='selected'>请选择招生批次</option>");
	$("#majorNo").empty();
	$('#majorNo','#signupForm').append("<option value='' selected='selected'>请选择专业</option>");
	if (centerNo == "") {
		return;
	}
	if (stuCategory == "") {
		return;
	}
	if (levelNo == "") {
		return;
	}
	
	web.ajax(basePath + "edu/jw/zsCenPlan/findByCenterByNo.ajax", {centerNo : centerNo,stuCategory:stuCategory}, true, function(r) {
		$("#cenPlanNo").append("<option value=''>请选择招生计划</option>");
		for ( var i = 0; i < r.data.length; i++) {
			$("#cenPlanNo").append("<option value='" + r.data[i].cenPlanNo + "'>" + r.data[i].cenPlanName + "</option>");
		}
	});
}

/**
 * 
 */
function cenPlanNoOnclick(obj){
	var centerNo=$("#centerNo").val();
	if(isEmpty(centerNo)){
		messageDialogShow('提示','请先选择站点！', 2);
		return;
	}
}

/**
 * 
 */
function cpItemNoOnclick(obj){
	var cenPlanNo=$("#cenPlanNo").val();
	if(isEmpty(cenPlanNo)){
		messageDialogShow('提示','请先选择招生计划！', 2);
		return;
	}
}

/**
 * 
 */
function cpItemNoOnclick(obj){
	var cenPlanNo=$("#cenPlanNo").val();
	if(isEmpty(cenPlanNo)){
		messageDialogShow('提示','请先选择招生计划！', 2);
		return;
	}
}

/**
 * 报名页面专业点击事件
 */
function majorNoOnclick(obj){
	var cenPlanNo=$("#cenPlanNo").val();
	var levelNo = $(obj).val() || '';
	if(isEmpty(cenPlanNo)){
		messageDialogShow('提示','请先选择招生计划！', 2);
		return;
	}
	
}

/**
 * 校验人数是否已满
 */
function majorNoOnChange(obj){
	var majorNo = $(obj).val();
	var levelNo = $("#levelNo").val();
	var cenPlanNo = $("#cenPlanNo").val();
	if(majorNo==""){
		return;
	}
	//校验人数是否已满
	web.ajax(basePath + "edu/jw/zsCenPlan/checkNum.ajax", {majorNo:majorNo,levelNo:levelNo,cenPlanNo : cenPlanNo}, false, function(r) {
		flag = r.flag;
		if(r.flag==false){
			$(obj).val("");
			messageDialogShow("提示", r.message,2);
			return;
		}
	});
	if(!flag){
		return;
	}
	
}

/**
 * 招生计划改变事件
 */
function cenPlanOnchange(obj) {
	var cenPlanNo = $(obj).val();
	var levelNo = $('#levelNo','#signupForm').val() || '';
	$("#cpItemNo").empty();
	$('#cpItemNo','#signupForm').append("<option value='' selected='selected'>请选择招生批次</option>");
	$("#majorNo").empty();
	$('#majorNo','#signupForm').append("<option value='' selected='selected'>请选择专业</option>");
	if (cenPlanNo == "") {
		return;
	}
	if (levelNo == "") {
		return;
	}
	var flag = false;
	/*//校验人数是否已满
	web.ajax(basePath + "edu/jw/zsCenPlan/checkNum.ajax", {levelNo:levelNo,cenPlanNo : cenPlanNo}, false, function(r) {
		flag = r.flag;
		if(r.flag==false){
			messageDialogShow("提示", r.message,2);
			return;
		}
	});
	if(!flag){
		return;
	}*/
	
	//批次
	web.ajax(basePath + "edu/jw/zsCenPlanItem/findByCenterPlan.ajax", {
		cenPlanNo : cenPlanNo
	}, true, function(r) {
		for ( var i = 0; i < r.length; i++) {
			$("#cpItemNo").append("<option value='" + r[i].cpItemNo + "'>" + r[i].cpItemName + "</option>");
		}
	});
	
	//专业
	web.ajax(basePath + "edu/jw/zsCenPlanMajor/findByCenterPlan.ajax", {
		cenPlanNo : cenPlanNo,levelNo:levelNo
	}, true, function(r) {
		for ( var i = 0; i < r.data.length; i++) {
			$("#majorNo").append("<option value='" + r.data[i].majorNo + "'>" + r.data[i].majorName+ "</option>");
		}
	});
}

/**
 * 培养层次选择事件
 */
function levelNoOnchange(obj) {
	var stuCategory = $('#stuCategory','#signupForm').val() || '';
	var levelNo = $(obj).val() || '';
	//alert(stuCategory + '-' + levelNo);
	/*if('' == stuCategory){
		return;
	}
	if('' == levelNo){
		return;
	}*/
	
	$('#centerNo','#signupForm').empty();
	$('#centerNo','#signupForm').append("<option value='' selected='selected'>请选择站点</option>");
	
	$('#cenPlanNo','#signupForm').empty();
	$('#cenPlanNo','#signupForm').append("<option value='' selected='selected'>请选择招生计划</option>");
	
	$('#cpItemNo','#signupForm').empty();
	$('#cpItemNo','#signupForm').append("<option value='' selected='selected'>请选择招生批次</option>");
	
	$('#majorNo','#signupForm').empty();
	$('#majorNo','#signupForm').append("<option value='' selected='selected'>请选择专业</option>");
	if(levelNo=="2"){
		$('#schoolNameLabel','#signupForm').empty();
		$('#schoolNameLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业学校");
		$('#specialityLabel','#signupForm').empty();
		$('#specialityLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业专业");
		$('#graduateDateLabel','#signupForm').empty();
		$('#graduateDateLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业时间");
		$('#graduationNumLabel','#signupForm').empty();
		$('#graduationNumLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业证书编号");
		$('#graduateSchoolCodeLabel','#signupForm').empty();
		$('#graduateSchoolCodeLabel','#signupForm').append("<font color='#dc8707'> * </font>毕业学校代码");
	}else{
		$('#schoolNameLabel','#signupForm').empty();
		$('#schoolNameLabel','#signupForm').append("毕业学校");
		$('#specialityLabel','#signupForm').empty();
		$('#specialityLabel','#signupForm').append("毕业专业");
		$('#graduateDateLabel','#signupForm').empty();
		$('#graduateDateLabel','#signupForm').append("毕业时间");
		$('#graduationNumLabel','#signupForm').empty();
		$('#graduationNumLabel','#signupForm').append("毕业证书编号");
		$('#graduateSchoolCodeLabel','#signupForm').empty();
		$('#graduateSchoolCodeLabel','#signupForm').append("毕业学校代码");
	}
	
	web.ajax(basePath+'edu/jw/zsCenPlan/findCenter.ajax',{stuCategory:stuCategory,levelNo:levelNo},true,function(r){
		$('#centerNo').empty();
		var html= "<option value='' selected='selected'>请选择站点</option>";
		if(r.flag == true){
			//有值,则代表该学习形式和培养层次下,存在可供站点选择;
			for(var i=0;i<r.data.length;i++){
				html += "<option value='"+r.data[i].centerNo+"'>"+r.data[i].centerName+"</option>";
			}
		}
		$('#centerNo','#signupForm').append(html);
	});
}

/**
 * 加载我的学习管理--我的课程
 */
function loadStuCourse(id) {
	$('#main_content').empty();
	web.ajax(basePath + "edu/eduStuCourse/checkLimitStudyDate.ajax", {userid : userId}, true, function(r) {
		removeWaittingMask();
		if(r.flag){
			web.ajax(basePath + "edu/eduStuCourse/findEduStuCourse.ajax", {userid : userId}, true, function(r) {
				removeWaittingMask();
				if(r){
					$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				}
			});
		}else{
			//messageDialogShow("提示", r.msg, 1);
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		}
	});
}
/**
 * 加载我的学习管理--我的课程
 */
function loadGgStuCourse(id) {
	$('#main_content').empty();
	web.ajax(basePath + "edu/eduStuCourse/checkLimitStudyDate.ajax", {userid : userId}, true, function(r) {
		$('#main_content').empty();
		removeWaittingMask();
		if(r.flag){
			web.ajax(basePath + "edu/eduStuCourse/findEduStuCourseGg.ajax", {userid : userId}, true, function(r) {
				if(r){
					$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				}
			});
		}else{
			//messageDialogShow("提示", r.msg, 1);
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		}
	});
}

/**
 * 入学考试考前辅导
 * @param id
 */
function loadPreExaminationGuidance(id){
	web.ajax(basePath + "/edu/jw/eduExamTutor/findEduExamTutors.ajax", {userid : userId}, true, function(r) {
		$('#main_content').empty();
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		/*if(r.flag){
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		}else{
			messageDialogShow("提示", r.msg,1);
		}*/
	});
}
/**
 * 入学考试考前辅导 练习
 * @param etiNo 考前辅导练习科目
 * @param tutorNo 考前辅导
 */
function tutorExercise(etiNo,tutorNo,subjectNo) {
	var index = layer.alert("正在生成试卷，请等待...",{
		title:'提示',
		icon: 4,
		skin: 'layui-layer-rim',
		shadeClose : false,
		closeBtn :0
	});
	web.ajax(basePath+'/edu/jw/eduExamTutor/startMyExercise.ajax',{userid:userId,subjectno:subjectNo,etiNo:etiNo,tutorNo:tutorNo},true,function(r){
		layer.close(index);
		if(r.msg.state!=1){
			$("#exercise").removeAttr("disabled");
			messageDialogShow("提示", r.msg.msgInfo,'2');
			return;
		}else{
			var limitTime = 120;
			$("#exercise").text("正在做题");
			var winObj = window.open(basePath+'web/preExamExcerise.htm?userId='+userId+'&arrangeId='+tutorNo+'&subjectNo='+subjectNo+'&examNo='+r.msg.examNo, '_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					web.ajax(basePath+'/edu/jw/eduExamTutor/refreshInfo.ajax',{userid:userId,subjectNo:subjectNo,arrangeId:tutorNo,examNo:r.msg.examNo},false,function(r){
						//查询成功
						if(r.state==0){
							if(r.param.status=="0"){
								$("#exercise").text("继续练习");
								$("#exercise").removeAttr("disabled", "disabled");
							}else if(r.param.status=="1"){
								$("#exercise").text("重新练习");
								$("#exercise").attr("disabled", "disabled");
							}
						}else{
							messageDialogShow("提示", r.msgInfo);
						}
					});
				}
			}, 1000);
		}
	});
	$("#exercise").attr("disabled","disabled");
}

/**
 * 入学考试 练习记录
 */
function tutorExerciseHistory(subjectNo) {
	var url = basePath + "web/edu/modal/preExaminationGuidenceHistorySelector.jsp?subjectNo="+subjectNo+"&userId="+userId;
	layer.open({
		type : 2,
		title : '查看练习历史',
		shadeClose : true,
		shade : 0.8,
		area : [ '1000px', '350px' ],
		content : url,
	// iframe的url
	});
}


/**
 * 我的学习管理--我的课程--查询
 */ 
function searchStuCourse(id) {
	messageDialogShow("提示", "正在开发中！",2);
}

/**
 * 我的学习管理--我的课程--查询重置
 */ 
function resetStuCourse(id) {
	messageDialogShow("提示", "正在开发中！",2);
}

/**
 * 开始学习
 */
function learnCourse(id, courseState,goHtml,courseNo) {
	if(goHtml=='true'){
		var courseResPath;
		if(courseNo!=''){
			web.ajax(basePath+'edu/course/findCourseResPath.ajax',{courseNo:courseNo},false,function(r){
				courseResPath=r.courseResPath;
			});
		}
		if(courseResPath!=undefined&&courseResPath!=""){
			window.open(courseResPath+ "/index.htm", '_blank');
		}
	}else{
		if ('1' == courseState) {
			window.open(basePath + "web/ucenterdetail.htm?id=" + id, '_blank');
		} else if('3' == courseState){
			messageDialogShow("提示", "抱歉，课件制作中！预计2021年8月25日完成制作。");
		}else{
			messageDialogShow("提示", "抱歉，课件制作中！");
		}
	}
}

/**
 * 开始做题
 */
function exercise(id) {
	var url = basePath + "web/edu/modal/courseTasksSelector.jsp?courNo=" + id + "&userId=" + userId;
	web.ajax(basePath+"edu/eduStuCourse/checkCourseLearnTime.ajax",{userid:userId,courNo:id},false,function(r){
		if(r.state==0){
			layer.open({
				type : 2,
				title : '选择练习题',
				shadeClose : true,
				shade : 0.8,
				area : [ '620px', '350px' ],
				content : url
			// iframe的url
			});
		} else {
			messageDialogShow("提示", r.msgInfo);
			return;
		}
	});
	
}

/**
 * 做题历史
 */
function exerciseHistory(id) {
	var url = basePath + "web/edu/modal/courseTasksHistorySelector.jsp?courNo="+id+"&userId="+userId;
	layer.open({
		type : 2,
		title : '查看练习历史',
		shadeClose : true,
		shade : 0.8,
		area : [ '780px', '500px' ],
		content : url
	// iframe的url
	});
}

function chuliexercise(courNo){
	var exerciseindex = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + '/edu/eduStuCourse/checkStuCourse.ajax', {userid:userId, courNo:courNo},true,function(r){
		layer.close(exerciseindex);
		if(r.state == "0"){
			var homescore = r.value;
			tijiaoExercise(courNo,homescore);
		}else{
			layer.alert(r.msgInfo,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
			$("#curriculum_gonggong").delay(100).trigger("click");
			return;
		}
	});
}

function tijiaoExercise(courNo,homescore){
	var str = '<label>当前课程您的最终成绩为&nbsp;<span style="color:red">'+homescore+'</span>&nbsp;分，是否提交最终成绩，一旦确认将不能更改。</label>';
	layer.confirm(str, {icon: 3, title:'提示',shadeClose : false,closeBtn :0}, function(index){
		  layer.close(index);
		  var exerciseindex = layer.load(2,{shade: [0.8, '#393D49']});
		  web.ajax(basePath + '/edu/eduStuCourse/tijiaoStuCourseGg.ajax', {userid:userId, courNo:courNo},true,function(r){
				layer.close(exerciseindex);
				if(r.state == "0"){
					$("#curriculum_gonggong").delay(100).trigger("click");
				}else{
					layer.alert(r.msgInfo,{
						title:'提示',
						icon: 7,
						skin: 'layui-layer-rim',
						shadeClose : false,
						closeBtn :0
					});
					$("#curriculum_gonggong").delay(100).trigger("click");
					return;
				}
			});
	},function(index){
		$("#curriculum_gonggong").delay(100).trigger("click");
		layer.closeAll();
		
	});
}

/**
 * 我的考试管理 --考前辅导
 * @param paperNo
 */
function beforePractice(courNo,ecpNo){
	var beforePracticeindex = layer.load(2,{shade: [0.8, '#393D49']});
	var data = web.ajax(basePath + '/exam/paper/checkCourseExam.ajax', {userid:userId, courNo:courNo,ecpNo:ecpNo},false);
	if(data.state!=0){
		layer.close(beforePracticeindex);
		layer.alert(data.msgInfo,{
			title:'提示',
			icon: 7,
			skin: 'layui-layer-rim',
			shadeClose : false,
			closeBtn :0
		});
		return;
	}
	web.ajax(basePath + '/exam/paperInstance/startBeforePractice.ajax', {
		 userid:userId, courNo:courNo
	}, true, function(r) {
		layer.close(beforePracticeindex);
		if(r.state==-1){
			layer.alert(r.msgInfo,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
			return;
		}else{
			var limitTime = 120;
			if(r.param.limitTime){
				limitTime = r.param.limitTime;
			}
			var stuId = "";
			if(r.param.stuId){
				stuId = r.param.stuId;
			}
			$("#beforePractice_"+courNo).attr("disabled", "disabled");
			$("#beforePractice_"+courNo).text("正在做题");
			var winObj = window.open(basePath+'web/beforePractice.htm?stuId='+stuId+'&instNo='+r.value+'&limitTime='+limitTime, '_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#beforePractice_"+courNo).removeAttr("disabled", "disabled");
					web.ajax(basePath + '/exam/paperInstance/refreshBeforePracticeInfo.ajax', {
						instNo:r.value, userid:userId,courNo:courNo
					}, false, function(r) {
						if(r.state==-1){
							messageDialogShow("提示", r.msgInfo);
							return;
						}else{
							if(r.param.status=="0"){
								$("#beforePractice_"+courNo).text("重新练习");
							}else if(r.param.status=="1"){
								$("#beforePractice_"+courNo).text("继续练习");
							}else if(r.param.status=="-1"){
								$("#beforePractice_"+courNo).text("开始练习");
							}
						}
					});
				}
			}, 1000);
		}
	});
}


/*function beforePracticeWz(courNo,ecpNo){
	var beforePracticewzindex = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + '/exam/paper/findCourseIsExiste.ajax', {courNo:courNo
	}, true, function(r) {
		layer.close(beforePracticewzindex);
		if(r.state!=0){
			layer.alert(r.msgInfo,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
			return;
		}else{
			window.open(basePath+"web/viewexampaper.htm?paperNo="+r.value+"&type=wz",'_blank');
		}
	});
}*/

function beforePracticeWz(courNo,ecpNo){
	var beforePracticewzindex = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + '/exam/paper/findCourseIsExiste.ajax', {courNo:courNo, userId: userId
	}, true, function(r) {
		layer.close(beforePracticewzindex);
		if(r.state!=0){
			layer.alert(r.msgInfo,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
			return;
		}else{
			var limitTime = 120;
			if(r.param.limitTime){
				limitTime = r.param.limitTime;
			}
			var stuId = "";
			if(r.param.stuId){
				stuId = r.param.stuId;
			}
			$("#beforePracticeWz_"+courNo).attr("disabled", "disabled");
			$("#beforePracticeWz_"+courNo).text("正在做题");
			var winObj = window.open(basePath+'web/beforePractice.htm?stuId='+stuId+'&instNo='+r.value+'&limitTime='+limitTime, '_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#beforePracticeWz_"+courNo).removeAttr("disabled", "disabled");
					web.ajax(basePath + '/exam/paperInstance/refreshBeforePracticeInfo.ajax', {
						instNo:r.value, userid:userId,courNo:courNo
					}, false, function(r) {
						if(r.state==-1){
							messageDialogShow("提示", r.msgInfo);
							return;
						}else{
							if(r.param.status=="0"){
								$("#beforePracticeWz_"+courNo).text("重新练习");
							}else if(r.param.status=="1"){
								$("#beforePracticeWz_"+courNo).text("继续练习");
							}else if(r.param.status=="-1"){
								$("#beforePracticeWz_"+courNo).text("开始练习");
							}
						}
					});
				}
			}, 1000);
		}
	});
}

/**
 * 考前辅导-做题历史
 */
function beforePracticeHistory(courNo,ecpNo) {
	var url = basePath + "web/edu/modal/courseBeforePracticeHistorySelector.jsp?courNo="+courNo+"&userId="+userId;
	layer.open({
		type : 2,
		title : '查看练习历史',
		shadeClose : true,
		shade : 0.8,
		area : [ '780px', '500px' ],
		content : url
	// iframe的url
	});
}

/**
 * 我的学习管理--我的专业
 */
function loadMajor(id){
	web.ajax(basePath+"edu/student/findMajorForStudent.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		if(r.flag){
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			$("#findMajorDetail").on('click',function(){
				var majorNo = $(this).attr('name');
				toMajorDetail(majorNo,this);
			});
		} else {
			return;
		}
	});
}

/**
 * 我的学习管理--我的专业
 */
function toMajorDetail(majorNo,obj){
	var flag = $(obj).attr('data');
	if('open' == flag){
		if(null!=majorNo){
			web.ajax(basePath+"edu/eduMajor/findMajorInfo.ajax",{majorNo:majorNo},true,function(r){
				$('#majorInfo').html(r.majorInfo);
				$('#majorInfoShow').fadeIn('fast');
				$(obj).attr('data','close');
				$(obj).html('隐藏');
			});
	    }else {
	    	$('#majorInfoShow').fadeOut('fast');
	        return;
	    }
	}else{
		$('#majorInfoShow').fadeOut('fast');
		$(obj).attr('data','open');
		$(obj).html('查看');
	}
	
}

/**
 * 我的学习管理--我的教材
 */ 
function loadTeachingMeterial(id) {
	loadTeachingMeterial1(id, userId);
}

/**
 * 
 */
function loadTeachingMeterial1(id, userId) {
	web.ajax(basePath + "edu/eduStudentBook/findstuBook.ajax", {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
		$('#' + id + '1-tmpl').empty();
		$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
	});
}

/**
 * 我的学习管理--我的教材--订购
 */
function buyorCancelBook(obj,bookNo,courNo) {
	//$(obj).button('loading');
	var id = $(obj).attr('id');
	var o = $('#'+id);
	var type = $(o).attr('data');
	var id = "teaching_material";
	var url = '';
	if(o){
		$(o).attr('disabeld',true);
		$(o).val("处理中");
		if('-1' == type){
			url = basePath + "edu/eduStudentBook/buyBook.ajax";
		}else{
			url = basePath + "edu/eduStudentBook/cancelBook.ajax";
		}
		web.ajax(url, {userid : userId,bookNo : bookNo,courNo : courNo}, true, function(r) {
			$(o).attr('disabeld',false);
			//$(obj).button('reset');
			if (r.flag) {
				if('-1' == type){
					$(o).val('取消');
					$("#state_"+courNo).text('已订购');
					$(o).removeAttr('class').addClass('btn');
					$(o).attr('data','0');
				}else if('0' == type){
					$(o).val('订购');
					$("#state_"+courNo).text('未订购');
					$(o).removeAttr('class').addClass('btn btn-primary');
					$(o).attr('data','-1');
				}
				
			} else {
				return;
			}
		
		});
	}
	
}
	


/**
 * 我的学习管理--我的教材--订购
 */
function canBook(obj,bookNo, courNo) {
	$(obj).attr('disabeld',true);
	var url = basePath + "edu/eduStudentBook/cancelBook.ajax";
	var id = "teaching_material";
	web.ajax(url, {
		userid : userId,
		bookNo : bookNo,
		courNo : courNo
	}, false, function(r) {
		$(obj).attr('disabeld',false);
		if (r.flag) {
			
		} else {
			return;
		}
	});
}

/**
 * 我的学习管理 -- 我的学习进程
 */
function loadLearningProcess(id){
	web.ajax(basePath+"edu/eduTrainplan/findMyLearningProcess.ajax",{userid:userId},true,function(r){
		if(r.flag){
			removeWaittingMask();
			$('#main_content').empty();
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			//对 '正在修读课程'和'学习进度' 的数据显示进行加载
			var myChart3 = echarts.init(document.getElementById('main3'));;
			var myChart2 = echarts.init(document.getElementById('main2'));;
			initCharts3(myChart3,r);
			initCharts2(myChart2,r);
			//设置修读学分进度条
			setLearnProcessWidth(r);
		}else{
			return;
		}
	});
}

/**
 * 录取通知书
 */
function loadLuqutongzhishu(id){
	web.ajax(basePath+"/edu/student/findLQTZS.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$("#main_content").empty();
		if(r.flag){
			if(r.applyNo!=""){
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				// var wheresql="  param1 ='"+r.applyNo+"'";
				var raqName="html_admissionNoticeXS";
				// var param="raq=html/"+raqName+"&needPrint=no"+"&whereSql="+wheresql;
				var param="raq=html/"+raqName+"&needPrint=no"+"&param1="+r.applyNo;
				$("#lqtzsIframe").attr("src",reportPath()+"aweto/plugins/runqian/view/showReportXS.jsp?"+param);
				/*var obj = document.getElementById("lqtzsIframe").contentWindow;
				var ifmObj = obj.document.getElementById("titleTable");
				$(ifmObj).find('.runqian-span').hide();*/
				r.state=state;
			}
		}else{
			return;
		}
	});
}

/**
 * 考前辅导
 * 
 * @param id
 */
function loadBeforePractice(id) {
	web.ajax(basePath + '/edu/jw/eduExamConPlan/findEduStuCourse.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		if (r.flag) {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		} else {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			return;
		}
	});
}

/**
 * 我的缓考
 * 
 * @param id
 */
function loadWodehuankao(id,keyword) {
	web.ajax(basePath + '/jw/eduExamCourHk/findEduExamCourseHkInfos.ajax', {userid : userId,keyword:keyword}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '-tmp').tmpl(r).appendTo('#main_content');
		$('#wodehuankaoKeyword').val(keyword);
		if (r.flag) {
			$('#wodehuankao1-tmpl').empty();
			$('#wodehuankao2-tmpl').tmpl(r).appendTo('#wodehuankao1-tmpl');
		} else {
			$('#wodehuankao1-tmpl').empty();
			$('#wodehuankao2-tmpl').tmpl(r).appendTo('#wodehuankao1-tmpl');
			return;
		}
	});
}

/**
 * 我的考试
 * 
 * @param id
 */
function myTest(id) {
	if(ssproctor_api.sspm_getInProctor()==true){
		ssproctor_api.sspm_stopExam();
	}
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findExamConPlan.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		if (r.flag) {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if(r.isArrange && r.examFlag){
				var placeNo = r.placeNo;
				$('#mapIframe').attr('src','./ucenter/examPlaceMap.jsp?placeNo='+placeNo);
			}
		} else {
			messageDialogShow("提示", r.msg, "2");
			return;
		}
	});
}
/**
 * 考试通知单
 * 
 * @param id
 */
function loadkstzs(id) {
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findExamtongzhishu.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		if(r.flag){
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				var whereSql1="  stu_id = '"+r.stuId+"'";
				var whereSql2="  stu_id = '"+r.stuId+"' and ecp_No='"+r.ecpNo+"'";
				var raqName="html_kstzd";
				var param="raq=html/"+raqName+"&needPrint=no"+"&whereSql1="+whereSql1+"&whereSql2="+whereSql2;
				$("#kstzsIframe").attr("src",reportPath()+"aweto/plugins/runqian/view/showReport.jsp?"+param);	
				/*var obj = document.getElementById("lqtzsIframe").contentWindow;
				var ifmObj = obj.document.getElementById("titleTable");
				$(ifmObj).find('.runqian-span').hide();*/
		}else{
			return;
		}
	});
}

/**
 * 统考通知单
 * 
 * @param id
 */
function loadkstzsTK(id) {
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findExamtongzhishuTK.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		if(r.flag){
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				var whereSql1=" and b.stu_id = '"+r.stuId+"'";
				var whereSql2=" and a.stu_id = '"+r.stuId+"' and a.ep_no='"+r.epNo+"'";
				var raqName="html_kstzdTK";
				var param="raq=html/"+raqName+"&whereSql1="+encodeURI(encodeURI(web.replaceSympole(whereSql1)))+"&whereSql2="+encodeURI(encodeURI(web.replaceSympole(whereSql2)));
				$("#kstzsIframeTK").attr("src",reportPath()+"aweto/plugins/runqian/view/showReport.jsp?"+param);	
				/*var obj = document.getElementById("lqtzsIframe").contentWindow;
				var ifmObj = obj.document.getElementById("titleTable");
				$(ifmObj).find('.runqian-span').hide();*/
		}else{
			return;
		}
	});
}

/**
 * 统考约考
 * @param id
 */
function loadMytkyk(id){
	web.ajax(basePath + 'exam/eduTkArrangementExam/eduTkExamyk.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}

/**
 * 开始考试
 */
function startMyExam(courNo,ecpNo, isbk){
	if (isbk == "补考" || isbk == "学位补考") {
		startOnlineExamPoint(courNo,ecpNo);
	} else {
		layer.confirm('请确认考试之前作业都完成, 考试后该门课程将不能进行作业练习?', {icon: 3, title:'提示'}, function(index){
			  layer.close(index);
			  startOnlineExamPoint(courNo,ecpNo);
		});
	}
}

function startOnlineExamPoint(courNo,ecpNo) {
	 web.ajax(basePath + '/exam/paperInstance/faceDetectedVerify.ajax', {ecpNo:ecpNo}, false, function(r) {
		if (r.state == "0") {
			//需要人脸识别
			var state= ssproctor_api.sspm_getFaceAuditState();
			if (!state) {
				messageDialogShow("提示", "请打开人脸识别客户端进行人脸识别认证！", "2");
				return ;
			} else {
				ssproctor_api.sspm_startExamEx(courNo,function(startedStatus){
					 if(startedStatus){ 
						 startOnlineExam(courNo,ecpNo);
					 }
				});
			}
		} else {
			startOnlineExam(courNo,ecpNo);
		}
	});
}

function startOnlineExam(courNo,ecpNo) {
	$("#MyOnlineExam_"+courNo).attr("disabled","disabled");
//	var index = layer.alert("正在生成试卷，请等待...",{
//		title:'提示',
//		icon: 4,
//		skin: 'layui-layer-rim',
//		shadeClose : false,
//		closeBtn :0
//	});
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + '/exam/paperInstance/startCourseExam.ajax', {userid:userId,courNo:courNo,ecpNo:ecpNo}, false, function(r) {
		layer.close(index);
		if(r.state==-1){
			$("#MyOnlineExam_"+courNo).removeAttr("disabled");
			messageDialogShow("提示", r.msgInfo);
			return;
		}else {
			var limitTime = 120;
			if(r.param.limitTime){
				limitTime = r.param.limitTime;
			}
			var winObj = window.open(basePath+"web/exams.htm?userId="+userId+"&instNo="+r.value+"&limitTime="+limitTime+"&ecpNo="+ecpNo,'_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#myTest").delay(100).trigger("click");
				}
			}, 1000);
		}
	});
}

/**
 * 开始考试
 */
function startMyWzExam(courNo,epepNo, isbk){
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	if (isbk == "重考") {
		startWzExamPoint(courNo,epepNo);
	} else if(isbk == "补考"){
		web.ajax(basePath + '/jw/eduPaperlessExamStu/findBkNum.ajax', {epepNo:epepNo, userId:userId}, true, function(r){
			if (r.state == "0") {
				layer.confirm("<label>"+$("#examwuzhihuaName").val()+'只允许&nbsp;<span style="color:red">'+$("#maxBkcour").html()+'</span>&nbsp;门课程补考，请慎重选择补考课程，一旦确认将不能更改。</label>', {icon: 3, title:'提示',closeBtn :0}, function(index){
					  layer.close(index);
					  startWzExamPoint(courNo,epepNo);
				},function(index){
					layer.closeAll();
					$("#MyOnlineExam_"+courNo).removeAttr("disabled");
				});
			} else {
				 startWzExamPoint(courNo,epepNo);
			}
		});
	} else {
		layer.confirm('请确认考试之前作业都完成, 考试后该门课程将不能进行作业练习?', {icon: 3, title:'提示',cancel: function(){
			$("#MyOnlineExam_"+courNo).removeAttr("disabled");
			layer.closeAll();
		}}, function(index){
			  layer.close(index);
			  startWzExamPoint(courNo,epepNo);
		},function(index){
			layer.closeAll();
			$("#MyOnlineExam_"+courNo).removeAttr("disabled");
		});
	}
}

function startWzExamPoint(courNo,epepNo) {
	web.ajax(basePath + '/exam/examWuzhiRuleRandom/faceDetectedVerify.ajax', {epepNo:epepNo}, true, function(r) {
		if (r.state == "0") {
			//需要人脸识别
			var state= ssproctor_api.sspm_getFaceAuditState();
			if (!state) {
				layer.closeAll();
				$("#MyOnlineExam_"+courNo).removeAttr("disabled");
				messageDialogShow("提示", "请打开人脸识别客户端进行人脸识别认证！", "2");
				return ;
			} else {
				if(ssproctor_api.sspm_getInProctor()==true){
					startOnlineWzExam(courNo,epepNo,r.state);
				}else{
					ssproctor_api.sspm_startExamEx(courNo,function(startedStatus){
						if(startedStatus){ 
							startOnlineWzExam(courNo,epepNo,r.state);
						}
					});
				}
			}
		} else {
			startOnlineWzExam(courNo,epepNo,r.state);
		}
	});
}

function startOnlineWzExam(courNo,epepNo,faceState) {
//	var index = layer.alert("正在生成试卷，请等待...",{
//		title:'提示',
//		icon: 4,
//		skin: 'layui-layer-rim',
//		shadeClose : false,
//		closeBtn :0
//	});
	var ssid = "";
	if(faceState == "0"){
		ssid = ssproctor_api.sspm_getSsid();
	}
	web.ajax(basePath + '/exam/paperInstance/startCourseWzExam.ajax', {userid:userId,courNo:courNo,epepNo:epepNo,ssid:ssid}, true, function(r) {
		layer.closeAll();
		if(r.state==-1){
			$("#MyOnlineExam_"+courNo).removeAttr("disabled");
//			messageDialogShow("提示", r.msgInfo, "2");
			if(faceState == "0" && ssproctor_api.sspm_getInProctor()==true){
				ssproctor_api.sspm_stopExam();
			}
			layer.alert(r.msgInfo,{title:'提示', icon: 2, skin: 'layui-layer-rim', shadeClose : false, closeBtn :0},function(errorindex){
				layer.close(errorindex);
				$("#myTest").delay(100).trigger("click");
			});
			return;
		}else {
			var limitTime = 120;
			if(r.param.limitTime){
				limitTime = r.param.limitTime;
			}
			var winObj = window.open(basePath+"web/wzexams.htm?userId="+userId+"&instNo="+r.value+
					"&limitTime="+limitTime+"&epepNo="+epepNo+"&courNo="+courNo,'_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#myTest").delay(100).trigger("click");
				}
			}, 1000);
		}
	});
}


/**
 * 继续考试
 */
function continueMyExam(courNo,ecpNo){
	web.ajax(basePath + '/exam/paperInstance/faceDetectedVerify.ajax', {ecpNo:ecpNo}, false, function(r) {
		if (r.state == "0") {
			//需要人脸识别
			var state= ssproctor_api.sspm_getFaceAuditState();
			if (!state) {
				layer.closeAll();
				messageDialogShow("提示", "请打开人脸识别客户端进行人脸识别认证！", "2");
				return ;
			} else {
				if(ssproctor_api.sspm_getInProctor()==true){
					continueOnlineExam(courNo,ecpNo);
				}else{
					ssproctor_api.sspm_startExamEx(courNo,function(startedStatus){
						if(startedStatus){ 
							continueOnlineExam(courNo,ecpNo);
						 }
					});
				}
				
			}
		} else {
			continueOnlineExam(courNo,ecpNo);
		}
	});
}

function continueOnlineExam(courNo,ecpNo) {
	$("#MyOnlineExam_"+courNo).attr("disabled","disabled");
	web.ajax(basePath + '/exam/paperInstance/startCourseExam.ajax', {userid:userId,courNo:courNo,ecpNo:ecpNo}, true, function(r) {
		if(r.state==-1){
			$("#MyOnlineExam_"+courNo).removeAttr("disabled");
			messageDialogShow("提示", r.msgInfo);
			return;
		}else if (r.state==0){
			var limitTime = 120;
			if(r.param.limitTime){
				limitTime = r.param.limitTime;
			}
			var winObj = window.open(basePath+"web/exams.htm?userId="+userId+"&instNo="+r.value+"&limitTime="+limitTime+"&ecpNo="+ecpNo,'_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#myTest").delay(100).trigger("click");
				}
			}, 1000);
		}else{
			messageDialogShow("提示", r.msgInfo);
			return;
		}
	});
}

/**
 * 继续考试
 */
function continueMyWzExam(courNo,epepNo){
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	$("#MyOnlineExam_"+courNo).attr("disabled","disabled");
	web.ajax(basePath + '/exam/examWuzhiRuleRandom/faceDetectedVerify.ajax', {epepNo:epepNo}, true, function(r) {
		if (r.state == "0") {
			//需要人脸识别
			var state= ssproctor_api.sspm_getFaceAuditState();
			if (!state) {
				layer.closeAll();
				$("#MyOnlineExam_"+courNo).removeAttr("disabled");
				messageDialogShow("提示", "请打开人脸识别客户端进行人脸识别认证！", "2");
				return ;
			} else {
				ssproctor_api.sspm_startExamEx(courNo,function(startedStatus){
					if(startedStatus){ 
						continueOnlineWzExam(courNo,epepNo,r.state);
					 }
				});
			}
		} else {
			continueOnlineWzExam(courNo,epepNo,r.state);
		}
	});
}

function continueOnlineWzExam(courNo,epepNo,faceState) {
//	var index = layer.alert("正在查找试卷，请等待...",{
//		title:'提示',
//		icon: 4,
//		skin: 'layui-layer-rim',
//		shadeClose : false,
//		closeBtn :0
//	});
	var ssid = "";
	if(faceState == "0"){
		ssid = ssproctor_api.sspm_getSsid(courNo);
	}
	web.ajax(basePath + '/exam/paperInstance/startCourseWzExam.ajax', {userid:userId,courNo:courNo,epepNo:epepNo,ssid:ssid}, true, function(r) {
		layer.closeAll();
		if(r.state==-1){
			$("#MyOnlineExam_"+courNo).removeAttr("disabled");
			if(faceState == "0" && ssproctor_api.sspm_getInProctor()==true){
				ssproctor_api.sspm_stopExam();
			}
			layer.alert(r.msgInfo,{title:'提示', icon: 2, skin: 'layui-layer-rim', shadeClose : false, closeBtn :0},function(errorindex){
					layer.close(errorindex);
					$("#myTest").delay(100).trigger("click");
			});
//			messageDialogShow("提示", r.msgInfo,'2');
			return;
		}else if (r.state==0){
			var limitTime = 120;
			if(r.param.limitTime){
				limitTime = r.param.limitTime;
			}
			var winObj = window.open(basePath+"web/wzexams.htm?userId="+userId+"&instNo="+r.value+
					"&limitTime="+limitTime+"&epepNo="+epepNo+"&courNo="+courNo,'_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#myTest").delay(100).trigger("click");
				}
			}, 1000);
		}else{
			messageDialogShow("提示", r.msgInfo);
			return;
		}
	});
}


/**
 * 补考
 */
function loadExamAgainInfo(id){
	$('#' + id + '1-tmpl').empty();
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findStuExamAgainCourse.ajax', {userid : userId,type:"normal"}, true, function(r) {
		removeWaittingMask();
		if (r.flag) {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if (r.isExamDtm) {
				$('#checkIsCross').hide();
				$('#existExamPlan').show();
				$('#mainBody').show();
				$('#unExistExamPlan').hide();
				loadExamAgainCour();
			} else {
				$('#checkIsCross').hide();
				$('#existExamPlan').hide();
				$('#mainBody').hide();
				$('#unExistExamPlan').show();
			}
		} else {
			messageDialogShow("提示", r.msg,2);
			return;
		}
	});
}

/**
 * 可以约考的课程(补考)
 */
function loadExamAgainCour() {
	var id = "examAgain";
	$('#onloadDiv').show();
	web.ajax(basePath + 'edu/jw/eduStuExamAgain/findExamAgainCourse.ajax', {
		userid : userId
	}, true, function(r) {
		if (r.flag) {
			if(r.existCour){
				$('#unexistCour').hide();
				$('#onloadDiv').hide();
				$('#existCour').show();
				if(r.myExamCour){
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').show();
				}
			}else{
				$('#unexistCour').show();
				$('#onloadDiv').hide();
				$('#existCour').hide();
			}
		} else {
			messageDialogShow("提示", r.msg);
		}
	});
}

/**
 * 退选补考
 */
function cancelExamAgain(seaiNo,obj) {
	$(obj).button('loading');
	web.ajax(basePath + 'edu/jw/eduStuExamAgainItem/deleteForStu.ajax', {
		pkValue : seaiNo
	}, false, function(r) {
		if (r.state == SUCCESS) {
			loadExamAgainCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			$(obj).button('reset');
			return;
		}
	});
}

/**
 * 添加补考
 */
function selectExamAgain(courNo,obj) {
	$(obj).button('loading');
	// 具体考试计划
	var ecpNo = $("#ecpNo").val();
	// 考点
	var placeNo = $("#placeNo").val();
	if (isEmpty(placeNo)) {
		$(obj).button('reset');
		messageDialogShow("提示", "请选择考点", 2);
		removeWaittingMask();
	} else {
		web.ajax(basePath + 'edu/jw/eduStuExamAgain/addStuExamCour.ajax', {
			userId : userId,
			ecpNo : ecpNo,
			placeNo : placeNo,
			courNo : courNo
		}, false, function(r) {
			if (r.state == SUCCESS) {
				loadExamAgainCour();
			} else {
				$(obj).button('reset');
				messageDialogShow("提示", r.msgInfo, 2);
				return;
			}
		});
	}
}

/**
 * 学位考试申请
 */
function xueweikaoshishenq(id) {
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findStuDegreeCourse.ajax', {userid : userId,type:"normal"}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '1-tmpl').empty();
		if (r.flag) {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if (r.isExamDtm) {
				$('#checkIsCross').hide();
				$('#existExamPlan').show();
				$('#mainBody').show();
				$('#unExistExamPlan').hide();
				loadDegreeCour();
			} else {
				$('#checkIsCross').hide();
				$('#existExamPlan').hide();
				$('#mainBody').hide();
				$('#unExistExamPlan').show();
			}
		} else {
			messageDialogShow("提示", "获取信息失败",2);
			return;
		}
	});
}

/**
 * 无纸化学位补考申请
 */
function xueweikaoshishenqing(id) {
	web.ajax(basePath + '/jw/eduPaperlessExamStu/findStuDegreeCourse.ajax', {userid : userId}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '1-tmpl').empty();
		if (r.flag) {
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if (r.isExamDtm == "1") {
				$('#existExamPlan').show();
				$('#mainBody').show();
				$('#unExistExamPlan').hide();
				$('#notZsbStu').hide();
				//动态显示相关信息
				$("#examPlanName").html(r.examPlan[0].epepName);
				wuzhiLoadDegreeCour();
			} else if(r.isExamDtm == "2") {
				$('#existExamPlan').hide();
				$('#mainBody').hide();
				$('#unExistExamPlan').show();
				$('#notZsbStu').hide();
				$('#examXwsqBk').hide();
			} else if (r.isExamDtm == "3") {
				$('#existExamPlan').hide();
				$('#mainBody').hide();
				$('#unExistExamPlan').hide();
				$('#notZsbStu').show();
				$('#examXwsqBk').hide();
			}
		} else {
			messageDialogShow("提示", r.msg,2);
			return;
		}
	});
}

/**
 * 无纸化可以申请学位考试的课程
 */
function wuzhiLoadDegreeCour() {
	var id = "xueweikaoshishenqing";
	$('#onloadDiv').show();
	$('#onloadDiv1').show();
	web.ajax(basePath + '/jw/eduPaperlessExamStu/findStuDegreeCourseInfo.ajax', {
		userid : userId,epepNo:$("#epepNo").val()
	}, true, function(r) {
		if (r.flag) {
			if(r.existCour){
				$('#unexistCour').hide();
				$('#onloadDiv').hide();
				$('#existCour').show();
				if(r.myExamCour){
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').show();
				}else{
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').html("暂无约考课程");
				}
			}else{
				$('#unexistCour').show();
				$('#onloadDiv').hide();
				$('#existCour').hide();
			}
			if(r.existExamXwsqBk){
				$('#unexistExamXwsqBk').hide();
				$('#onloadDiv1').hide();
				$('#existExamXwsqBk').show();
				if(r.examXwsqBk){
					$('#' + id + '3-tmpl').empty();
					$('#' + id + '4-tmpl').tmpl(r).appendTo('#' + id + '3-tmpl');
					$('#' + id + '3-tmpl').show();
				}else{
					$('#' + id + '3-tmpl').empty();
					$('#' + id + '4-tmpl').tmpl(r).appendTo('#' + id + '3-tmpl');
					$('#' + id + '3-tmpl').html("暂无考试课程历史记录");
				}
			}else{
				$('#unexistExamXwsqBk').show();
				$('#onloadDiv1').hide();
				$('#existExamXwsqBk').hide();
			}
			
		} else {
			messageDialogShow("提示", r.msg);
		}
	});
}


/**
 * 正常约考
 */
function loadExamPlanInfo(id) {
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findStuExamCourse.ajax', {userid : userId,type:"normal"}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '1-tmpl').empty();
		if (r.flag) {
			if(r.isCollect){
				if (r.check) {
					$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
					$('#checkIsCross').show();
					$('#existExamPlan').hide();
					$('#mainBody').hide();
					$('#unExistExamPlan').hide();
					$('#alreadyCollect').hide();
				} else {
					$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
					if (r.isExamDtm) {
						$('#checkIsCross').hide();
						$('#existExamPlan').show();
						$('#mainBody').show();
						$('#unExistExamPlan').hide();
						$('#alreadyCollect').hide();
						loadStuExamCour();
					} else {
						$('#checkIsCross').hide();
						$('#existExamPlan').hide();
						$('#mainBody').hide();
						$('#unExistExamPlan').show();
						$('#alreadyCollect').hide();
					}
				}
			}else{
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				$('#checkIsCross').hide();
				$('#existExamPlan').hide();
				$('#mainBody').hide();
				$('#unExistExamPlan').hide();
				$('#alreadyCollect').show();
			}
		} else {
			messageDialogShow("提示", r.msg,2);
			return;
		}
	});
}

/**
 * 可以约考的课程
 */
function loadStuExamCour() {
	var id = "appointment";
	$('#onloadDiv').show();
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findStuExamPlanCourse.ajax', {
		userid : userId,type:'normal',ecpNo:$("#ecpNo").val()
	}, true, function(r) {
		if (r.flag) {
			if(r.existCour){
				$('#unexistCour').hide();
				$('#onloadDiv').hide();
				$('#existCour').show();
				if(r.myExamCour){
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').show();
				}else{
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').html("暂无约考课程");
				}
			}else{
				$('#unexistCour').show();
				$('#onloadDiv').hide();
				$('#existCour').hide();
			}
		} else {
			messageDialogShow("提示", r.msg);
		}
	});
}

/**
 * 可以申请学位考试的课程
 */
function loadDegreeCour() {
	var id = "xueweikaoshishenq";
	$('#onloadDiv').show();
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findStuDegreeCourseInfo.ajax', {
		userid : userId,type:'normal',ecpNo:$("#ecpNo").val()
	}, true, function(r) {
		if (r.flag) {
			if(r.existCour){
				$('#unexistCour').hide();
				$('#onloadDiv').hide();
				$('#existCour').show();
				if(r.myExamCour){
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').show();
				}else{
					$('#' + id + '1-tmpl').empty();
					$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
					$('#' + id + '1-tmpl').html("暂无约考课程");
				}
			}else{
				$('#unexistCour').show();
				$('#onloadDiv').hide();
				$('#existCour').hide();
			}
		} else {
			messageDialogShow("提示", r.msg);
		}
	});
}

/**
 * 添加正常考试约考
 */
function selectExam(courNo,obj) {
	$(obj).button('loading');
	// 具体考试计划
	var ecpNo = $("#ecpNo").val();
	// 考点
	var placeNo = $("#placeNo").val();
	if (isEmpty(placeNo)) {
		$(obj).button('reset');
		messageDialogShow("提示", "请选择考点", 2);
		removeWaittingMask();
	} else {
		web.ajax(basePath + 'edu/jw/eduStuExamPlan/addStuExamCour.ajax', {
			userId : userId,
			ecpNo : ecpNo,
			placeNo : placeNo,
			courNo : courNo
		}, true, function(r) {
			$('#dialogmodaltitle').html("提示");
			layer.open({
				area:['800px','320px'],
				title:'提示',
				content:"<span style='color:red'><h3>请在考试结束前后一周内完成规定的两次作业！</h3></span>"
			});
			$(obj).button('reset');
			if (r.state == SUCCESS) {
				loadStuExamCour();
			} else {
				messageDialogShow("提示", r.msgInfo, 2);
				return;
			}
		});
	}
}

/**
 * 添加学位申请考试
 */
function degreeAppli(courNo,obj) {
	$(obj).button('loading');
	// 具体考试计划
	var ecpNo = $("#ecpNo").val();
	// 考点
	var placeNo = $("#placeNo").val();
	if (isEmpty(placeNo)) {
		$(obj).button('reset');
		messageDialogShow("提示", "请选择考点", 2);
		removeWaittingMask();
	} else {
		web.ajax(basePath + '/jw/eduStuDegreeApp/addDegreeAppCour.ajax', {
			userId : userId,
			ecpNo : ecpNo,
			placeNo : placeNo,
			courNo : courNo
		}, true, function(r) {
			if (r.state == SUCCESS) {
				loadDegreeCour();
			} else {
				messageDialogShow("提示", r.msgInfo, 2);
				$(obj).button('reset');
				return;
			}
		});
	}
}

/**
 * 无纸化添加学位申请考试
 */
function wuzhiDegreeAppli(courNo,obj) {
	$(obj).button('loading');
	// 具体考试计划
	var epepNo = $("#epepNo").val();
	web.ajax(basePath + '/jw/eduPaperlessExamStu/addDegreeAppCour.ajax', {
		userId : userId,
		epepNo : epepNo,
		courNo : courNo
	}, true, function(r) {
		if (r.state == SUCCESS) {
			wuzhiLoadDegreeCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			$(obj).button('reset');
			return;
		}
	});
}

/**
 * 无纸化取消学位申请考试
 */
function wuzhiCancelDegreeAppli(courNo,obj) {
	$(obj).button('loading');
	// 具体考试计划
	var epepNo = $("#epepNo").val();
	web.ajax(basePath + '/jw/eduPaperlessExamStu/cancelDegreeAppCour.ajax', {
		userId : userId,
		epepNo : epepNo,
		courNo : courNo
	}, true, function(r) {
		if (r.state == SUCCESS) {
			wuzhiLoadDegreeCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			$(obj).button('reset');
			return;
		}
	});
}


/**
 * 删除学位申请考试
 */
function deleteDegreeAppli(esdaNo,obj) {
	$(obj).button('loading');
	web.ajax(basePath + '/jw/eduStuDegreeApp/deleteDegreeAppCour.ajax', {
		pkValue : esdaNo
	}, false, function(r) {
		if (r.state == SUCCESS) {
			loadDegreeCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			$(obj).button('reset');
			return;
		}
	});
}

/**
 * 删除学位申请考试
 */
function showReason(esdaNo,obj) {
	web.ajax(basePath + '/jw/eduStuDegreeApp/showReason.ajax', {
		pkValue : esdaNo
	}, false, function(r) {
		if (r.state == SUCCESS) {
			$('#dialogmodaltitle').html("提示");
			layer.open({
				area:['600px','320px'],
				title:'提示',
				content:"<span>" + r.msgInfo + "</span>"
			});
		} 
	});
}



/**
 * 提交学位申请考试
 */
function submitDegreeAppli(sdaiNo,obj) {
	$(obj).button('loading');
	web.ajax(basePath + '/jw/eduStuDegreeApp/submitDegreeAppCour.ajax', {
		pkValue : sdaiNo
	}, false, function(r) {
		if (r.state == SUCCESS) {
			loadDegreeCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			$(obj).button('reset');
			return;
		}
	});
}



/**
 * 退选
 */
function cancelExam(sepiNo,obj) {
	$(obj).button('loading');
	web.ajax(basePath + 'edu/jw/eduStuExamPlanItem/deleteForStu.ajax', {
		pkValue : sepiNo
	}, false, function(r) {
		if (r.state == SUCCESS) {
			loadStuExamCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			return;
		}
	});
}

/**
 * 跨站点约考
 */
function loadCrossCenExamPlanInfo(id) {
	$('#onloadDiv').hide();
	$('#' + id + '1-tmpl').empty();
	web.ajax(basePath + 'edu/jw/eduExamConPlan/findStuExamCourse.ajax', {userid : userId,type:"cross"}, true, function(r) {
		removeWaittingMask();
		if (r.flag) {
			if(r.isCollect){
				if (r.check) {
					$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
					$('#checkIsNormal').show();
					$('#existExamPlan').hide();
					$('#mainBody').hide();
					$('#unExistExamPlan').hide();
					$('#alreadyCollect').hide();
				} else {
					$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
					if (r.isExamDtm) {
						$('#checkIsNormal').hide();
						$('#existExamPlan').show();
						$('#mainBody').show();
						$('#unExistExamPlan').hide();
						$('#alreadyCollect').hide();
						loadCrossCenStuExamCour();
					} else {
						$('#checkIsNormal').hide();
						$('#existExamPlan').hide();
						$('#mainBody').hide();
						$('#unExistExamPlan').show();
						$('#alreadyCollect').hide();
					}
				}
			}else{
				$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
				$('#checkIsNormal').hide();
				$('#existExamPlan').hide();
				$('#mainBody').hide();
				$('#unExistExamPlan').hide();
				$('#alreadyCollect').show();
			}
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			return;
		}
	});
}

/**
 * 跨站点考试课程
 */
function loadCrossCenStuExamCour() {
	var id = "crossCenterAppointment";
	$('#onloadDiv').show();
	web.ajax(
			basePath + 'edu/jw/eduStuAcrossCenExam/findStuExamPlanCourse.ajax',
			{
				userid : userId,ecpNo:$("#ecpNo").val()
			}, true, function(r) {
				removeWaittingMask();
				if (r.flag) {
					if(r.existCour){
						$('#unexistCour').hide();
						$('#existCour').show();
						$('#onloadDiv').hide();
						$('#' + id + '1-tmpl').empty();
						$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
						$('#' + id + '1-tmpl').show();
					}else{
						$('#unexistCour').show();
						$('#existCour').hide();
						$('#onloadDiv').hide();
					}
				} else {
					return;
				}
			});
	/**
	 * 点击站点选择
	 */
	$('#examCenterNo').on('change', function() {
		centerOnchangeExam(this);
	});
}

/**
 * 
 */
function centerOnchangeExam(obj) {
	var centerNo = $(obj).val();
	$("#placeNo").empty();
	if (centerNo == "") {
		return;
	}
	web.ajax(basePath + "edu/jw/eduExamPlace/findByCenter.ajax", {
		centerNo : centerNo
	}, true, function(r) {
		$("#placeNo").append("<option value=''>请选择考点</option>");
		for ( var i = 0; i < r.length; i++) {
			$("#placeNo").append(
					"<option value='" + r[i].placeNo + "'>" + r[i].placeName
							+ "</option>");
		}
	});
}

/**
 * 添加跨站点考试约考
 */
function selectCrossExam(courNo,obj) {
	$(obj).button('loading');
	loadWaittingMask('main_content');
	// 具体考试计划
	var ecpNo = $("#ecpNo").val();
	// 考试站点
	var examCenterNo = $("#examCenterNo").val();
	// 考点
	var placeNo = $("#placeNo").val();
	if (isEmpty(placeNo)) {
		$(obj).button('reset');
		messageDialogShow("提示", "请选择考点", 2);
		removeWaittingMask();
		return;
	}
	if (isEmpty(examCenterNo)) {
		$(obj).button('reset');
		messageDialogShow("提示", "请选择考试站点", 2);
		removeWaittingMask();
		return;
	}
	web.ajax(basePath + 'edu/jw/eduStuAcrossCenExam/addStuExamCour.ajax', {
		userId : userId,
		examCenterNo : examCenterNo,
		ecpNo : ecpNo,
		placeNo : placeNo,
		courNo : courNo
	}, false, function(r) {
		removeWaittingMask();
		if (r.state == SUCCESS) {
			loadCrossCenStuExamCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			return;
		}
	});
}

/**
 * 退选跨站点
 */
function cancelCrossExam(saciNo,obj) {
	$(obj).button('loading');
	loadWaittingMask('main_content');
	web.ajax(basePath + 'edu/jw/eduStuAcrossCenExamItem/deleteForStu.ajax', {
		pkValue : saciNo
	}, false, function(r) {
		removeWaittingMask();
		if (r.state == SUCCESS) {
			loadCrossCenStuExamCour();
		} else {
			messageDialogShow("提示", r.msgInfo, 2);
			return;
		}
	});
}

/**
 * 我的选课
 * @param id
 */
function selectCourMain(id) {
	$("#main_content").empty();
	web.ajax(basePath + 'edu/eduStuCourse/findCourseForStuSelected.ajax', {
		userId : userId
	}, true, function(r) {
		removeWaittingMask();
		if (r.flag) {
			$('#selectCourTable').remove();
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		} else {
			messageDialogShow("提示", r.msg, 2);
			return;
		}
	});
}
/**
 * 我的选课（新方案）
 * @param id
 */
function selectCourMainNew(id) {
	$("#main_content").empty();
	web.ajax(basePath + 'edu/eduStuCourse/findCourseForStuSelectedNew.ajax', {
		userId : userId
	}, true, function(r) {
		removeWaittingMask();
		if (r.flag) {
			$('#selectCourTable').remove();
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		} else {
			messageDialogShow("提示", r.msg, 2);
			return;
		}
	});
}
function selectCourMainlp(id) {
	$("#curricula_variable").delay(100).trigger("click");
}

/**
 * 选课
 */
function selectCour(tpCourseNo,obj) {
	var courType = $(obj).parent().prev().prev().text();
	if(courType == "选修课程"){
		layer.confirm("当前选修课学分不计入总学分，您是否还继续选择当前这门课程，选择点击确认，无需点击取消。",{
			title:'提示',
			icon: 3,
			skin: 'layui-layer-rim',
			btn:['确定','取消'],
			shadeClose : false,
			closeBtn :0
		},function(index){
			selectCourX(tpCourseNo,obj);
		},function(index){
			layer.closeAll();
			$(obj).button('reset');
		});
	}else{
		selectCourX(tpCourseNo,obj);
	}
}

function selectCourX(tpCourseNo,obj){
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	$(obj).button('loading');
	var id = "curricula_variable";
	var selectcourseNo = $("#selectcourseNo").val();
	var selectcourseName = $("#selectcourseName").val();
	web.ajax(basePath + "edu/eduStuCourse/addStuSelectorCourse.ajax", {
		userId : userId,
		tpCourseNo : tpCourseNo,
		scpNo : selectcourseNo,
		scpName : selectcourseName
	}, true, function(r) {
		layer.closeAll();
		if (r.state == SUCCESS) {
			loadWaittingMask('gerenzhongxin');
			if(trainplanTempType=="02"){
				selectCourMainNew("curricula_variable_new");
			}else{
				selectCourMain(id);
			}
		} else {
			$(obj).button('reset');
			messageDialogShow("提示", r.msgInfo, 1);
			return;
		}
	});
}
/**
 * 选课
 */
function selectCourXx(tpCourseNo,obj) {
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	$(obj).button('loading');
	var id = "curricula_variable_new";
	var selectcourseNo = $("#selectcourseNo").val();
	var selectcourseName = $("#selectcourseName").val();
	web.ajax(basePath + "edu/eduStuCourse/checkCourseXx.ajax", {
		userId : userId,
		tpCourseNo : tpCourseNo,
		scpNo : selectcourseNo
	}, true, function(r) {
		layer.close(index);
		if (r.state == SUCCESS) {
			if(r.value != ""){
				layer.confirm("按照培养方案您已经选择够了符合规定的课程，您是否还继续选择当前这门课程，选择点击确认，无需点击取消。",{
					title:'提示',
					icon: 3,
					skin: 'layui-layer-rim',
					btn:['确定','取消'],
					shadeClose : false,
					closeBtn :0
				},function(index){
					index = layer.load(2,{shade: [0.8, '#393D49']});
					web.ajax(basePath + "edu/eduStuCourse/addStuSelectorCourse.ajax", {
						userId : userId,
						tpCourseNo : tpCourseNo,
						scpNo : selectcourseNo,
						scpName : selectcourseName
					}, true, function(r) {
						layer.closeAll();
						if (r.state == SUCCESS) {
							loadWaittingMask('gerenzhongxin');
							selectCourMainNew("curricula_variable_new");
						} else {
							$(obj).button('reset');
							messageDialogShow("提示", r.msgInfo, 1);
							return;
						}
					});
				},function(index){
					layer.closeAll();
					$(obj).button('reset');
				});
			}else{
				index = layer.load(2,{shade: [0.8, '#393D49']});
				web.ajax(basePath + "edu/eduStuCourse/addStuSelectorCourse.ajax", {
					userId : userId,
					tpCourseNo : tpCourseNo,
					scpNo : selectcourseNo,
					scpName : selectcourseName
				}, true, function(r) {
					layer.close(index);
					if (r.state == SUCCESS) {
						loadWaittingMask('gerenzhongxin');
						selectCourMainNew("curricula_variable_new");
					} else {
						$(obj).button('reset');
						messageDialogShow("提示", r.msgInfo, 1);
						return;
					}
				});
			}
		} else {
			$(obj).button('reset');
			messageDialogShow("提示", r.msgInfo, 1);
			return;
		}
	});
}

/**
 * 退课
 * 
 * @param stuCourseNo
 */
function cancelCour(stuCourseNo) {
	$('#cancelCourBtnCommit').bind("click",function(){
		cancelCourSubmit(stuCourseNo);
	});
	$('#wodexuankemodal').modal({backdrop: 'static', keyboard: false});
	$('#wodexuankemodal').modal('show');
}

/**
 * 
 */
function cancelCourSubmit(stuCourseNo){
	var id = "curricula_variable";
	$('#wodexuankemodal').modal('hide');
	$(".modal-backdrop").remove();
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + "edu/eduStuCourse/deleteSelectCour.ajax", {
		userId : userId,
		stuCourseNo : stuCourseNo
	}, true, function(r) {
		layer.close(index);
		if (r.state == SUCCESS) {
			if(trainplanTempType=="02"){
				selectCourMainNew("curricula_variable_new");
			}else{
				selectCourMain(id);
			}
		} else {
			messageDialogShow("提示", r.msgInfo, 1);
			return;
		}
	});
}
/**
 * 
 */
function chongxiuSelectCour(stuCourseNo,obj){
	var id = "curricula_variable";
	$(obj).button('loading');
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + "edu/eduStuCourse/chongxiuSelectCour.ajax", {
		userId : userId,
		stuCourseNo : stuCourseNo
	}, true, function(r) {
		layer.close(index);
		if (r.state == SUCCESS) {
			if(trainplanTempType=="02"){
				selectCourMainNew("curricula_variable_new");
			}else{
				selectCourMain(id);
			}
		} else {
			$(obj).button('reset');
			messageDialogShow("提示", r.msgInfo, 1);
			return;
		}
	});
}

/**
 * 全部已选课程
 */
function loadStuSelectedTable() {
	var id = "curricula_variable";
	web.ajax(basePath + 'edu/eduStuCourse/findStuSelectedCour.ajax', {
		userid : userId
	}, true, function(r) {
		if (r.flag) {
			$('#' + id + '3-tmpl').empty();
			$('#' + id + '4-tmpl').tmpl(r).appendTo('#' + id + '3-tmpl');
			$('#' + id + '3-tmpl').show();
		} else {
			return;
		}
	});
}

/**
 * 待退选
 */
function loadStuSelectedTableForCancel() {
	$('#' + id + '5-tmpl').empty();
	var condition = $("#condition").val();
	$("#condition").val(condition);
	var id = "curricula_variable";
	var type = "cancel";
	web.ajax(basePath + 'edu/eduStuCourse/findCourseForStuSelected.ajax', {
		userId : userId,condition:condition,type:type
	}, true, function(r) {
		if (r.flag) {
			$('#' + id + '6-tmpl').tmpl(r).appendTo('#' + id + '5-tmpl');
			$('#' + id + '5-tmpl').show();
		} else {
			messageDialogShow("提示", r.msg, 2);
			return;
		}
	});
	messageDialogShow("学期待退选课程", $('#cancelCour').html(), 3, '800px');
}

/**
 * 
 */
function courseSearch(){
	loadStuSelectTable();
}

/**
 * 
 */
function selectAll(selectStatus){//传入参数（全选框的选中状态）
    //根据name属性获取到单选框的input，使用each方法循环设置所有单选框的选中状态
    $("#unselectedTable input[name='check']").each(function(i,n){
        n.checked = status;
    });
}

/**
 * 全部课程 待选
 */
function loadStuSelectTable() {
	$('tfoot').hide();
	$('#' + id + '2-tmpl').empty();
	var condition = $("#condition").val();
	$("#condition").val(condition);
	var id = "curricula_variable";
	var type = "select";
	web.ajax(basePath + 'edu/eduStuCourse/findCourseForStuSelected.ajax', {
		userId : userId,condition:condition,type:type
	}, true, function(r) {
		if (r.flag) {
			$('#' + id + '1-tmpl').empty();
			$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
			$('#' + id + '1-tmpl').show();
		} else {
			messageDialogShow("提示", r.msg, 2);
			return;
		}
	});
	messageDialogShow("学期待选课程", $('#unselectCour').html(), 3, '800px');
}

/**
 * 学籍异动申请
 */
function loadSchoolChange(id,queryCondition){
	if($('.modal-backdrop')){
		$('.modal-backdrop').remove();
	}
	loadSchoolChange1(id,userId,queryCondition);
}

/**
 * 优秀(毕业)学生申请
 */
function loadYxbys(id){
	web.ajax(basePath + "/jw/eduStuApprais/findStuApprais.ajax", {
		userid : userId
	}, true, function(r) {
		removeWaittingMask();
		$('#main_content').empty();
		if (r.flag) {
			$('#main_content').empty();
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');		
        }else {
            return;
        }
	});
}

/**
 * 
 */
function loadSchoolChange1(id,userId,queryCondition){
	if(!isEmpty(queryCondition)){
		var condition = queryCondition;
	}
	$('#main_content').empty();
	web.ajax(basePath + "edu/eduStuinfoChangeApp/findStuinfoChangeApp.ajax", {
		userid : userId,condition:condition
	}, true, function(r) {
		removeWaittingMask();
		if (r.flag) {
			$('#main_content').empty();
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			$("#xjydxjxxbd").hide();
			$("#xjydxjxxbdtx").hide();
			$("#stuNameE").html(r.stuName);
			$("#stuIdE").html(r.stuId);
			$("#stuName").val(r.stuName);
			$("#stuNameE").val(r.stuName);
			$("#stuId").val(r.stuId);
			$("#idCardE").val(r.idCard);
			$("#idCardY").val(r.idCard);
			$("#sex").val(r.sex);
			$("#sexE").val(r.sex);
			$("#ethnic").val(r.ethnic);
			$("#ethnicE").val(r.ethnic);
			$("#province").val(r.province);
			$("#provinceE").val(r.province);
			//处理城市
			var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
		    		21:"辽宁",22:"吉林",23:"黑龙江 ",
		    		31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
		    		41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",
		    		50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",
		    		61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
		    		71:"台湾",81:"香港",82:"澳门"};
			$("#city").append("<option value=''>请选择城市</option>");
			for(var j = 1; j < cityArr[r.province].length; j++) {
				if(r.city==cityArr[r.province][j] ){
					$("#city").append("<option value='" + cityArr[r.province][j] + "' selected>" + cityArr[r.province][j] + "</option>");
					$("#cityE").append("<option value='" + cityArr[r.province][j] + "' selected>" + cityArr[r.province][j] + "</option>");
				}else{
					$("#city").append("<option value='" + cityArr[r.province][j] + "'>" + cityArr[r.province][j] + "</option>");
					$("#cityE").append("<option value='" + cityArr[r.province][j] + "'>" + cityArr[r.province][j] + "</option>");
				}
			}
			$("#city").val(r.city);
			$("#cityE").val(r.city);
			$("#political").val(r.political);
			$("#politicalE").val(r.political);
			$("#oldCenter").val(r.oldCenter);
			$("#oldClass").val(r.oldClass);
			$("#oldMajor").val(r.oldMajor);
			$("#queryCondition").val(r.condition);
        }else {
        	messageDialogShow('错误',r.msg||'查询错误！',2);
            return;
        }
	});
}

/**
 * 
 */
function queryStuChangeInfo(){
	var id="school_change";
	var queryCondition = $("#queryCondition").val();
	loadSchoolChange(id,queryCondition);
}

/**
 * 学籍异动申请
 */
function appStuInfoChange(){
	$(".msg_change").css("height",$(window).height()-180);
	var id="school_change";
	$('#submitBtn5').hide();
	$('#saveInfoChangeBtn1').show();
	$('#subInfoChangeBtn1').show();
	web.ajax(basePath + "edu/eduStuinfoChangeApp/toStuInfoChange.ajax", {
		userId : userId
	}, false, function(r) {
		if(r.stuInfoChange.oldCenter){
			$("#stuId").val(r.stuInfoChange.stuId);
			$("#stuName").val(r.stuInfoChange.stuName);
			$("#oldCenter").val(r.stuInfoChange.oldCenter);
			$("#oldMajor").val(r.stuInfoChange.oldMajor);
			$("#oldClass").val(r.stuInfoChange.oldClass);
		}
		
		$("#nowCenter").attr("disabled",true);
		$("#nowClass").attr("disabled",true);
		$("#nowMajor").attr("disabled",true);
		$("#xyydTime").attr("readonly","readonly");
		$("#xyydTime").parent().parent().css("display","none");
		
		
		$("#nowCenter").val("");
		$("#nowClass").val("");
		$("#nowMajor").val("");  
		$("#chgTypeNo").val("");
		$("#chgReason").val(""); 
		$("#scaNo").val("");
		$("#state").val("");

		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();

		//当前时间
		$('#chgDtm').val(nowDate());
		if($('#chgDtm')){
			lay('#chgDtm').each(function(){
				laydate.render({
					elem: this
				});
			});
		}
		
		$('#chgTypeNo').on('change',function(){
			chgTypeNoOnchange();
		});
		$('#edustuchangemodal').modal('show');
	});
}

/**
 * 优秀(毕业)学生申请
 */
function applyStuApprais(eapNo){
	$(".msg_change").css("height",$(window).height()-180);
	$('#submitBtn5').hide();
	$('#saveInfoChangeBtn1').show();
	$('#subInfoChangeBtn1').show();
	web.ajax(basePath + "/jw/eduStuApprais/findEduAppraisPlan.ajax", {
		userId : userId, eapNo:eapNo
	}, false, function(r) {
		if (r.state == "0") {
			$("#eapName").val(r.param.eapName);
			$("#eapNo").val(r.param.eapNo);
			$("#stuId").val(r.param.stuId);
			$("#stuName").val(r.param.stuName);
			$("#studyFormName").val(r.param.studyFormName);
			$("#studyForm").val(r.param.studyForm);
			$("#majorName").val(r.param.majorName);
			$("#majorNo").val(r.param.majorNo);
			$("#levelName").val(r.param.levelName);
			$("#levelNo").val(r.param.levelNo);
			$("#centerNo").val(r.param.centerNo);
			$("#centerName").val(r.param.centerName);
			$("#enterDtm").val(r.param.enterDtm);
			$("#graduateDtm").val(r.param.graduateDtm);
			$('#edustuappraismodal').modal('show');
		} else {
			messageDialogShow('错误',r.msgInfo,2);
		}
	});
}

/**
 * 优秀(毕业)学生申请---编辑
 */
function toStuAppraisChange(esaNo){
	$(".msg_change").css("height",$(window).height()-180);
	$('#saveInfoChangeBtn1').show();
	$('#subInfoChangeBtn1').show();
	web.ajax(basePath + "/jw/eduStuApprais/findAppraisStuInfo.ajax", {
		 esaNo:esaNo
	}, false, function(r) {
		if (r.state == "0") {
			$("#eapName").val(r.param.eapName);
			$("#eapNo").val(r.param.eapNo);
			$("#stuId").val(r.param.stuId);
			$("#stuName").val(r.param.stuName);
			$("#studyFormName").val(r.param.studyFormName);
			$("#studyForm").val(r.param.studyForm);
			$("#majorName").val(r.param.majorName);
			$("#majorNo").val(r.param.majorNo);
			$("#levelName").val(r.param.levelName);
			$("#levelNo").val(r.param.levelNo);
			$("#centerNo").val(r.param.centerNo);
			$("#centerName").val(r.param.centerName);
			$("#enterDtm").val(r.param.enterDtm);
			$("#graduateDtm").val(r.param.graduateDtm);
			$("#fineDeed").val(r.param.fineDeed);
			$("#esaNo").val(esaNo);
			$("#esaId").val(r.param.esaId);
			var arr = r.param.mainAchi.split("|");
			$.each($('input:checkbox'),function(){
				for (var i=0; i<arr.length; i++) {
					if ($(this).val() == arr[i]) {
						$(this).attr("checked", true);
						break ;
					}
				}
		    });
			$('#edustuappraismodal').modal('show');
		} else {
			messageDialogShow('错误',r.msgInfo,2);
		}
	});
}

/**
 * 优秀(毕业)学生申请---删除
 */
function deleteAppraisStu(esaNo){
	web.ajax(basePath + "/jw/eduStuApprais/deleteAppraisStu.ajax", {
		 esaNo:esaNo
	}, false, function(r) {
		if (r.state == "0") {
			loadYxbys("yxbys");
		}
	});
}

/**
 * 优秀(毕业)学生申请---提交
 */
function subStuAppraisBtn(esaNo){
	var indextishi = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath + "/jw/eduStuApprais/subAppraisStu.ajax", {
		 esaNo:esaNo
	}, true, function(r) {
		layer.closeAll();
		if (r.state == "0") {
			loadYxbys("yxbys");
		}else{
			messageDialogShow('错误',r.msgInfo,2);
		}
	});
}

/**
 * 优秀(毕业)学生申请---查看
 */
function findAppraisStu(esaNo){
	$(".msg_change").css("height",$(window).height()-180);
	$('#saveInfoChangeBtn1').hide();
	$('#subInfoChangeBtn1').show();
	web.ajax(basePath + "/jw/eduStuApprais/findAppraisStuInfo.ajax", {
		 esaNo:esaNo
	}, false, function(r) {
		if (r.state == "0") {
			$("#eapName").val(r.param.eapName);
			$("#eapNo").val(r.param.eapNo);
			$("#stuId").val(r.param.stuId);
			$("#stuName").val(r.param.stuName);
			$("#studyFormName").val(r.param.studyFormName);
			$("#studyForm").val(r.param.studyForm);
			$("#majorName").val(r.param.majorName);
			$("#majorNo").val(r.param.majorNo);
			$("#levelName").val(r.param.levelName);
			$("#levelNo").val(r.param.levelNo);
			$("#centerNo").val(r.param.centerNo);
			$("#centerName").val(r.param.centerName);
			$("#enterDtm").val(r.param.enterDtm);
			$("#graduateDtm").val(r.param.graduateDtm);
			$("#fineDeed").val(r.param.fineDeed);
			$("#esaId").val(r.param.esaId);
			$("#esaNo").val(esaNo);
			$("#fineDeed").attr("readonly", "readonly");
			$("input:checkbox").attr("disabled", "disabled");
			var arr = r.param.mainAchi.split("|");
			$.each($('input:checkbox'),function(){
				for (var i=0; i<arr.length; i++) {
					if ($(this).val() == arr[i]) {
						$(this).attr("checked", true);
						break ;
					}
				}
		    });
			$('#edustuappraismodal').modal('show');
		} else {
			messageDialogShow('错误',r.msgInfo,2);
		}
	});
}

/**
 * 学籍异动类型的change事件
 */
function chgTypeNoOnchange(){
	var chgTypeName = $('#chgTypeNo').find("option:selected").text();
	$("#nowCenter").val('');
	$("#nowClass").val('');
	$("#nowMajor").val('');
	//设置只读信息
	if('转专业' == chgTypeName){
		setStuInfoChgReadonly();
		$("#nowMajor").attr("disabled",false);
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
	}else if('转站点' == chgTypeName||'转学习中心' == chgTypeName){
		setStuInfoChgReadonly();
		$("#nowCenter").attr("disabled",false);
		$("#nowMajor").attr("disabled",true);
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
	}else if('退学' == chgTypeName){
		setStuInfoChgReadonly();
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
	}else if('休学' == chgTypeName){
		setStuInfoChgxyReadonly();
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
	}else if('复学' == chgTypeName){
		setStuInfoChgReadonly();
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
	}else if('延迟毕业' == chgTypeName){
		setStuInfoChgReadonly();
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
	}else if('学籍信息变动' == chgTypeName){
		$("#nowCenter").attr("disabled",true);
		$("#nowMajor").attr("disabled",true);
		$("#stuName").removeAttr("readonly");
		$("#idCardE").removeAttr("readonly");
		$("#sex").removeAttr("disabled");
		$("#ethnic").removeAttr("disabled");
		$("#political").removeAttr("disabled");
		$("#province").removeAttr("disabled");
		$("#city").removeAttr("disabled");
		$("#xyydTime").attr("readonly","readonly");
		$("#xyydTime").parent().parent().css("display","none");
		$("#xjydxjxxbd").show();
		$("#xjydxjxxbdtx").show();
	}
	//设置值的填充
	if('学籍信息变动' != chgTypeName){
		$("#xjydxjxxbd").hide();
		$("#xjydxjxxbdtx").hide();
		web.ajax(basePath + "edu/student/findStudentInfo.ajax", {
			userId : userId
		}, false, function(s) {
			//console.log(JSON.stringify(r));
			if (s) {
				$("#stuName").val(s.param.student.stuName);
				//$("#stuNameE").val(s.param.student.stuName);
				$("#stuId").val(s.param.student.stuId);
				$("#idCardE").val(s.param.student.idCard);
				//$("#idCardY").val(s.param.student.idCard);
				$("#sex").val(s.param.student.sex);
				//$("#sexE").val(s.param.student.sex);
				$("#ethnic").val(s.param.student.ethnic);
				//$("#ethnicE").val(s.param.student.ethnic);
				var province=s.param.student.province;
				$("#province").val(province);
				//$("#provinceE").val(province);
				//处理城市
				var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
			    		21:"辽宁",22:"吉林",23:"黑龙江 ",
			    		31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
			    		41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",
			    		50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",
			    		61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
			    		71:"台湾",81:"香港",82:"澳门"};
				$("#city").append("<option value=''>请选择城市</option>");
				//$("#cityE").append("<option value=''>请选择城市</option>");
				for(var j = 1; j < cityArr[province].length; j++) {
					if(s.param.student.city==cityArr[province][j]){
						$("#city").append("<option value='" + cityArr[province][j] + "' selected>" + cityArr[province][j] + "</option>");
						//$("#cityE").append("<option value='" + cityArr[province][j] + "' selected>" + cityArr[province][j] + "</option>");
					}else{
						$("#city").append("<option value='" + cityArr[province][j] + "'>" + cityArr[province][j] + "</option>");
						//$("#cityE").append("<option value='" + cityArr[province][j] + "'>" + cityArr[province][j] + "</option>");
					}
				}
				$("#political").val(s.param.student.political);
				//$("#politicalE").val(s.param.student.political);
	        }else {
	            return;
	        }
		});
	}else{
		xjydxjxxbdqstuInfo();
	}
	if('转专业' == chgTypeName){
		web.ajax(basePath + "edu/student/findStudentInfo.ajax", {
			userId : userId
		}, false, function(s) {
			findMajorsForChange(s.param.student.centerNo);
		});
	}
};

/**
 * 设置学籍异动的基本信息只读
 */
function setStuInfoChgReadonly(state){
	$("#nowCenter").attr("disabled",true);
	$("#nowClass").attr("disabled",true);
	$("#nowMajor").attr("disabled",true);
	$("#stuName").attr("readonly","readonly");
	$("#idCardE").attr("readonly","readonly");
	$("#sex").attr("disabled",true);
	$("#ethnic").attr("disabled",true);
	$("#political").attr("disabled",true);
	$("#province").attr("disabled",true);
	$("#city").attr("disabled",true);
	$("#xyydTime").attr("readonly","readonly");
	$("#xyydTime").parent().parent().css("display","none");
	if(state && state == '99'){
		$('#chgDtm').attr("readonly","readonly");
		$('#chgTypeNo').attr("readonly","readonly");
		$('#chgReason').attr("readonly","readonly");
	}
}
/**
 * 设置学籍异动的基本信息只读
 */
function setStuInfoChgxyReadonly(state){
	$("#nowCenter").attr("disabled",true);
	$("#nowClass").attr("disabled",true);
	$("#nowMajor").attr("disabled",true);
	$("#stuName").attr("readonly","readonly");
	$("#idCardE").attr("readonly","readonly");
	$("#sex").attr("disabled",true);
	$("#ethnic").attr("disabled",true);
	$("#political").attr("disabled",true);
	$("#province").attr("disabled",true);
	$("#city").attr("disabled",true);
	$("#xyydTime").removeAttr("readonly");
	$("#xyydTime").parent().parent().css("display","block");
	if(state && state == '99'){
		$('#chgDtm').attr("readonly","readonly");
		$('#chgTypeNo').attr("readonly","readonly");
		$('#chgReason').attr("readonly","readonly");
		$("#xyydTime").attr("readonly","readonly");
	}
}

/**
 * 我的学籍管理--学籍异动--查看(编辑)
 */
function toStuInfoChange(scaNo){
	$(this).button('loading');
	var id="school_change";
	$('#chgTypeNo').on('change',function(){
		chgTypeNoOnchange();
	});
	web.ajax(basePath+"edu/eduStuinfoChangeApp/toStuInfoChange.ajax",{scaNo:scaNo},false,function(r){
		$("#saveInfoChangeBtn1").button("reset");
		if(r.stuInfoChange){
			document.getElementById("appStuInfoChangeForm").reset();
			setStuInfoChgReadonly(r.stuInfoChange.state);
			if(r.stuInfoChange.chgTypeName=="转专业"){
				var oldCenterNo =r.stuInfoChange.oldCenterNo||"";
				var stuId=r.stuInfoChange.stuId||"";
				$("#nowMajor").empty();
				$("#nowMajor").append("<option value=''>请选择专业</option>");
				if(oldCenterNo!=""){
					web.ajax(basePath+"edu/eduStuinfoChangeApp/findMajorsForStuInfoChange.ajax",{centerNo:oldCenterNo,stuId:stuId},false,function(r){
						if(r.flag==true){
							var majors=JSON.stringify(r.eduMajor)
							for(var j = 0; j < r.eduMajor.length; j++) {
								$("#nowMajor").append(
										"<option value='" + r.eduMajor[j].key + "'>" + r.eduMajor[j].value
										+ "</option>");
							}
						}
					});
				}
			}else if(r.stuInfoChange.chgTypeName=="转站点"||'转学习中心' == r.stuInfoChange.chgTypeName){
				var nowCenter=r.stuInfoChange.nowCenter||"";
				var stuId=r.stuInfoChange.stuId||"";
				$("#nowMajor").empty();
				$("#nowMajor").append("<option value=''>请选择专业</option>");
				if(nowCenter!=""){
					web.ajax(basePath+"edu/eduStuinfoChangeApp/findMajorsForStuInfoChange.ajax",{centerNo:nowCenter,stuId:stuId},false,function(r){
						if(r.flag==true){
							var majors=JSON.stringify(r.eduMajor)
							for(var j = 0; j < r.eduMajor.length; j++) {
								$("#nowMajor").append(
										"<option value='" + r.eduMajor[j].key + "'>" + r.eduMajor[j].value
										+ "</option>");
							}
						}
					});
				}
			}
//			chgTypeNoOnchange();
			 var province=r.stuInfoChange.province;
			 if(province!=""&&province!=undefined){
				 $("#city").empty();
				 //处理城市
				 var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
						 21:"辽宁",22:"吉林",23:"黑龙江 ",
						 31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
						 41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",
						 50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",
						 61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
						 71:"台湾",81:"香港",82:"澳门"};
				 $("#city").append("<option value=''>请选择城市</option>");
				 for(var j = 1; j < cityArr[province].length; j++) {
					 if(r.stuInfoChange.city==cityArr[province][j]){
						 $("#city").append("<option value='" + cityArr[province][j] + "' selected>" + cityArr[province][j] + "</option>");
					 }else{
						 $("#city").append("<option value='" + cityArr[province][j] + "'>" + cityArr[province][j] + "</option>");
					 }
				 }
			 }
			 $("#appStuInfoChangeForm").setFormValue(r.stuInfoChange);
			$('#edustuchangemodal').modal('show');
			if(r.stuInfoChange.state != '00'){
				$('input,select,textarea',$('#stuInfoChangeApp')).attr('readonly',true);
				$('#saveInfoChangeBtn1').hide();
				$('#subInfoChangeBtn1').hide();
				$('#submitBtn5').show();
				// $("#chgDtm").attr("readonly",true);
				// $("#chgTypeNo").attr("readonly",true);
				// $("#chgReason").attr("readonly",true);
			}else{
				$('input,select,textarea',$('#stuInfoChangeApp')).attr('readonly',false);
				$('#saveInfoChangeBtn1').show();
				$('#subInfoChangeBtn1').show();
				//确定按钮隐藏
				$('#submitBtn5').hide();
				var chgTypeName = $('#chgTypeNo').find("option:selected").text();
				//设置只读信息
				if('转专业' == chgTypeName){
					setStuInfoChgReadonly();
					$("#nowMajor").attr("disabled",false);
					$("#xjydxjxxbd").hide();
					$("#xjydxjxxbdtx").hide();
				}else if('转站点' == chgTypeName||'转学习中心' == chgTypeName){
					setStuInfoChgReadonly();
					$("#nowCenter").attr("disabled",false);
					$("#nowMajor").attr("disabled",true);
					$("#xjydxjxxbd").hide();
					$("#xjydxjxxbdtx").hide();
				}else if('退学' == chgTypeName){
					setStuInfoChgReadonly();
					$("#xjydxjxxbd").hide();
					$("#xjydxjxxbdtx").hide();
				}else if('休学' == chgTypeName){
					setStuInfoChgxyReadonly();
					$("#xjydxjxxbd").hide();
					$("#xjydxjxxbdtx").hide();
				}else if('复学' == chgTypeName){
					setStuInfoChgReadonly();
					$("#xjydxjxxbd").hide();
					$("#xjydxjxxbdtx").hide();
				}else if('学籍信息变动' == chgTypeName){
					$("#nowCenter").attr("disabled",true);
					$("#nowMajor").attr("disabled",true);
					$("#stuName").removeAttr("readonly");
					$("#idCardE").removeAttr("readonly");
					$("#sex").removeAttr("disabled");
					$("#ethnic").removeAttr("disabled");
					$("#political").removeAttr("disabled");
					$("#province").removeAttr("disabled");
					$("#city").removeAttr("disabled");
				}
			}
			if('学籍信息变动' == chgTypeName){
				$("#xyydTime").attr("readonly","readonly");
				$("#xyydTime").parent().parent().css("display","none");
				xjydxjxxbdqstuInfo();
			}else if('休学' == chgTypeName){
				$("#xjydxjxxbd").hide();
				$("#xjydxjxxbdtx").hide();
				$("#xyydTime").removeAttr("readonly","readonly");
				$("#xyydTime").parent().parent().css("display","block");
			}else{
				$("#xjydxjxxbd").hide();
				$("#xjydxjxxbdtx").hide();
			}
		}else{
			return;
		}
	});
	$(".msg_change").css("height",$(window).height()-180);
}

function xjydxjxxbdqstuInfo(){
	web.ajax(basePath + "edu/student/findStudentInfo.ajax", {
		userId : userId
	}, true, function(r) {
		$("#stuIdE").html(r.param.student.stuId);
		$("#stuNameE").val(r.param.student.stuName);
		$("#idCardY").val(r.param.student.idCard);
		$("#sexE").val(r.param.student.sex);
		$("#ethnicE").val(r.param.student.ethnic);
		$("#provinceE").val(r.param.student.province);
		//处理城市
		var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
			21:"辽宁",22:"吉林",23:"黑龙江 ",
			31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
			41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",
			50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",
			61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
			71:"台湾",81:"香港",82:"澳门"};
		$("#cityE").append("<option value=''>请选择城市</option>");
		for(var j = 1; j < cityArr[r.param.student.province].length; j++) {
			if(r.city==cityArr[r.param.student.province][j] ){
				$("#cityE").append("<option value='" + cityArr[r.param.student.province][j] + "' selected>" + cityArr[r.param.student.province][j] + "</option>");
			}else{
				$("#cityE").append("<option value='" + cityArr[r.param.student.province][j] + "'>" + cityArr[r.param.student.province][j] + "</option>");
			}
		}
		$("#cityE").val(r.param.student.city);
		$("#politicalE").val(r.param.student.political);
	});
	$("#xjydxjxxbd").show();
	$("#xjydxjxxbdtx").show();
}

/**
 * 
 */
function nowCenterOnchange(){
	$("#nowMajor").empty();
	var nowCenter=$("#nowCenter").val();
	var stuId=$("#stuId").val();
	$("#nowMajor").append("<option value=''>请选择专业</option>");
	if(nowCenter!=""){
		web.ajax(basePath+"edu/eduStuinfoChangeApp/findMajorsForStuInfoChange.ajax",{centerNo:nowCenter,stuId:stuId},false,function(r){
			if(r.flag==true){
				var majors=JSON.stringify(r.eduMajor)
				for(var j = 0; j < r.eduMajor.length; j++) {
					$("#nowMajor").append(
							"<option value='" + r.eduMajor[j].key + "'>" + r.eduMajor[j].value
							+ "</option>");
				}
			}
		});
	}
}

/**
 * 
 */
function findMajorsForChange(centerNo){
	$("#nowMajor").empty();
	var stuId=$("#stuId").val();
	$("#nowMajor").append("<option value=''>请选择专业</option>");
	var oldCenter = $("#oldCenter").val();
	if(oldCenter!=""){
		web.ajax(basePath+"edu/eduStuinfoChangeApp/findMajorsForStuInfoChange.ajax",{centerNo:centerNo,stuId:stuId},false,function(r){
			if(r.flag==true){
				var majors=JSON.stringify(r.eduMajor)
				for(var j = 0; j < r.eduMajor.length; j++) {
					$("#nowMajor").append(
							"<option value='" + r.eduMajor[j].key + "'>" + r.eduMajor[j].value
							+ "</option>");
				}
			}
		});
	}
}

/**
 * 获取form下所有的input、select、等值
 */
function serializeForm(form) {    
    var o = {};    
  //获取input
  	var inputs=$("#"+form+" input");
  	$.each(inputs, function() {    
        if (o[this.name]) {    
            if (!o[this.name].push) {    
                o[this.name] = [ o[this.name] ];    
            }    
            o[this.name].push(this.value || '');    
        } else {    
            o[this.name] = this.value || '';    
        }    
    }); 
  	//获取select
  	var selects=$("#"+form+" select");
  	$.each(selects, function() {    
        if (o[this.name]) {    
            if (!o[this.name].push) {    
                o[this.name] = [ o[this.name] ];    
            }    
            o[this.name].push(this.value || '');    
        } else {    
            o[this.name] = this.value || '';    
        }    
    });
  	//获取textarea
  	var textareas=$("#"+form+" textarea");
  	$.each(textareas, function() {    
        if (o[this.name]) {    
            if (!o[this.name].push) {    
                o[this.name] = [ o[this.name] ];    
            }    
            o[this.name].push(this.value || '');    
        } else {    
            o[this.name] = this.value || '';    
        }    
    });  
    //获取checkbox
  	var checkboxs=$("#"+form+" checkbox");
  	$.each(checkboxs, function() {    
        if (o[this.name]) {    
            if (!o[this.name].push) {    
                o[this.name] = [ o[this.name] ];    
            }    
            o[this.name].push(this.value || '');    
        } else {    
            o[this.name] = this.value || '';    
        }    
    });  
    //获取radio
  	var radios=$("#"+form+" checkbox");
  	$.each(radios, function() {    
        if (o[this.name]) {    
            if (!o[this.name].push) {    
                o[this.name] = [ o[this.name] ];    
            }    
            o[this.name].push(this.value || '');    
        } else {    
            o[this.name] = this.value || '';    
        }    
    });  
    return o;    
}    

/**
 * 学籍异动保存事件  
 */
function saveInfoChangeBtn(obj){
	var flag = checkChangeInfo();
	if(flag){
		$('#edustuchangemodal').modal('hide');
		$(obj).button('loading');
		var id = 'school_change';
		var data = serializeForm("appStuInfoChangeForm");
		data.state = '00';
		web.ajax(basePath+'edu/eduStuinfoChangeApp/addStuInfoChange.ajax',{param:JSON.stringify(data)},true,function(r){
			if(r.state==0){
				$(obj).button('reset');
				loadSchoolChange(id);
				messageDialogShow('提示',r.msgInfo);
			}else{
				$(obj).button('reset');
				messageDialogShow("提示", r.msgInfo, 2);
				return;
			}
		});
	}
}

/**
 * 优秀(毕业)学生申请保存事件 
 */
function saveAppraisStuBtn(obj){
	//主要业绩和主要事迹不能为空
	var fineDeed = $("#fineDeed").val();
	var mainAchi = "";
	$.each($('input:checkbox:checked'),function(){
		mainAchi += $(this).val() +"|"
    });
	if (fineDeed == "" && mainAchi == "") {
		layer.alert("主要业绩和优秀事迹不能为空！",{
			title:'提示',
			icon: 7,
			skin: 'layui-layer-rim',
			shadeClose : false,
			closeBtn :0
		});
		// messageDialogShow("提示", "主要业绩和优秀事迹不能为空！", "2");
		return ;
	}
	var indextishi = layer.load(2,{shade: [0.8, '#393D49']});
	mainAchi = mainAchi.substr(0, mainAchi.length-1);
	// $('#edustuappraismodal').modal('hide');
	var id = 'school_change';
	var data = serializeForm("appStuAppraisForm");
	data.mainAchi = mainAchi;

	web.ajax(basePath+'/jw/eduStuApprais/addEduStuApprais.ajax',{param:JSON.stringify(data)},true,function(r){
		layer.closeAll();
		if(r.state==0){
			$('#edustuappraismodal').modal('hide');
			layer.confirm(r.msgInfo,{
				title:'提示',
				icon: 1,
				skin: 'layui-layer-rim',
				btn:['确定'],
				shadeClose : false,
				closeBtn :0
			},function(index){layer.closeAll();loadYxbys("yxbys");});
			$(obj).button('reset');
		}else{
			messageDialogShow("提示", r.msgInfo, "2");
			$(obj).button('reset');
			return;
		}
	});
}

/**
 * 学籍异动提交审批
 */
function subInfoChangeBtn(obj,scaNo){
	//var flag = checkChangeInfo();
//	if(flag){
	var chgTypeName = $('#chgTypeNo').find("option:selected").text();
		$('#edustuchangemodal').modal('hide');
		$(obj).button('loading');
		var id = 'school_change';
		var state = "02";
		web.ajax(basePath+'edu/eduStuinfoChangeApp/subInfoChange.ajax',{scaNo:scaNo,state:state},false,function(r){
			if(r.state==0){
				$(obj).button('reset');
				loadSchoolChange(id);
				messageDialogShow('提示',r.msgInfo);
			}else{
				$(obj).button('reset');
				messageDialogShow("提示", r.msgInfo, 2);
			}
		});
//	}
}

/**
 * 校验学籍异动信息
 * @returns {Boolean}
 */
function checkChangeInfo(){
	var chgTypeNo = $('#chgTypeNo').val();
	var chgTypeName = $('#chgTypeNo').find("option:selected").text();
	var nowMajor = $('#nowMajor').val();
	var nowCenter = $('#nowCenter').val();
	var nowClass = $('#nowClass').val();
	var chgReason = $('#chgReason').val();
	var xyydTime = $('#xyydTime').val();
	var flag = false;
	if(isEmpty(chgTypeNo)){
		$('#chgTypeNo').css('border-color','#d60a0a');
		setTimeout(function(){
			$('#chgTypeNo').css('border-color','#ccc');
		},'2000');
	}else if('转专业' == chgTypeName && isEmpty(nowMajor)){
		$('#nowMajor').css('border-color','#d60a0a');
		setTimeout(function(){
			$('#nowMajor').css('border-color','#ccc');
		},'2000');
	}else if(('转站点' == chgTypeName||'转学习中心' == chgTypeName) && isEmpty(nowCenter)){
		$('#nowCenter').css('border-color','#d60a0a');
		setTimeout(function(){
			$('#nowCenter').css('border-color','#ccc');
		},'2000');
	}/*else if(('转站点' == chgTypeName ||'转学习中心' == chgTypeName) && isEmpty(nowMajor)){
		$('#nowMajor').css('border-color','#d60a0a');
		setTimeout(function(){
			$('#nowMajor').css('border-color','#ccc');
		},'2000');
	}*/else if('转班级' == chgTypeName && isEmpty(nowClass)){
		$('#nowClass').css('border-color','#d60a0a');
		setTimeout(function(){
			$('#nowClass').css('border-color','#ccc');
		},'2000');
	}else if('休学' == chgTypeName ){
		if(isEmpty(xyydTime)){
			$('#xyydTime').css('border-color','#d60a0a');
			setTimeout(function(){
				$('#xyydTime').css('border-color','#ccc');
			},'2000');
		}else{
			var regex = /^[1-9]\d*$/;
			if(!regex.test(xyydTime)){
				layer.alert("休学年限请输入正整数。",{
					title:'提示',
					icon: 7,
					skin: 'layui-layer-rim',
					shadeClose : false,
					closeBtn :0
				});
			}else{
				flag = true;
			}
		}
	}
	//原因非必填修改时间：2018-6-1 kaile
	/*else if(isEmpty(chgReason)){
		$('#chgReason').css('border-color','#d60a0a');
		setTimeout(function(){
			$('#chgReason').css('border-color','#ccc');
		},'2000');
	}*/
	else{
		flag = true;
	}
	return flag;
}

/**
 * 
 * 获取当前时间
 */
function p(s) {
    return s < 10 ? '0' + s: s;
}

/**
 * 
 */
function nowDate(){
	var myDate = new Date();
//获取当前年
	var year=myDate.getFullYear();
//获取当前月
	var month=myDate.getMonth()+1;
//获取当前日
	var date=myDate.getDate(); 
	var now=year+'-'+p(month)+"-"+p(date);
	return now;
}

/**
 * 我的学籍管理--学籍管理--撤销
 */
function cancelSchoolChange(obj,scaNo){
	var id="school_change";
	web.ajax(basePath+"edu/eduStuinfoChangeApp/cancelSchoolChange.ajax",{scaNo:scaNo},false,function(r){
		$(obj).parent().parent().remove();
		return;
	});
}

/**
 * 加载学位英语批次
 * @param id
 */
function degreeEnglish(id){
	web.ajax(basePath + "edu/eduEnglishBatch/findEnglishBatch.ajax", {userid : userId}, true, function(r) {
		removeWaittingMask();
		if(!r.isExist){
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			$('#unenglishExamArrange').show();
			$('#englishExamArrange').hide();
			$('#stuInfo').hide();
			$('#englishBatch').hide();
		}else{
			if(r.flag){
				if(!r.isSignUp){
					$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
					$('#englishExamArrange').hide();
					$('#stuInfo').show();
					$('#englishBatch').show();
					$('#unenglishExamArrange').hide();
					$('#signBtn').on('click',function(){
						signEnglishExam();
					});
				}else{  
					$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
					if(r.isPassChecked){
						$(".checkState").html("审核已通过,请根据考试安排参加考试");
					}else{
						$(".checkState").html("审核未通过,请等待审核");
					}
					$('#englishExamArrange').show();
					$('#stuInfo').hide();
					$('#unenglishExamArrange').hide();
					$('#englishBatch').hide();
				}
			}else{
				messageDialogShow('提示',r.msgInfo,2);
				return;
			}
		}
	});
}

/**
 * 学位英语报名
 */
function signEnglishExam(){
	var siteId = $('#siteId').val();
	var englishBatchNo = $('#englishBatchNo').val();
	var englishBatchName = $('#englishBatchName').val();
	if(isEmpty(siteId)){
		messageDialogShow("提示", "请选择考试考点", 2);
		return;
	}
	web.ajax(basePath + "edu/eduEnglishApply/addEnglishApply.ajax", {
		userId : userId,
		siteId:siteId,
		englishBatchNo:englishBatchNo,
		englishBatchName:englishBatchName
	}, true, function(r) {
		if(r.state == SUCCESS){
			messageDialogShow("提示", "报名成功,请等待审核");
			$('#signBtn').hide();
			$('#englishExamArrange').show();
		}else{
			return;
		}
	});
}

/**
 * 加载毕设选题
 */
function loadGraduationProject(id){
	loadGraduationProject1(id,userId);
}

/**
 * 
 */
function loadGraduationProject1(id,userId){
	web.ajax(basePath+"edu/jw/eduGdPlan/findStuGdPlan.ajax",{userid:userId},true,function(r){
		if (r.lx == "1") {
			messageDialogShow('提示',"您选择的所有志愿都已经落选, 请重新选择！！",2);
		}
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		//$("#selplane .selplane-a1").css("background-color"," #E08801");
		$("#selplane .selplane-a1").addClass("selplane-selected");
		loadGraduationProject2(id,userId);
	});
}

/**
 * 论文查重
 * @param id
 * @param userId
 */
function loadLunwenchachong(id){
	$('#main_content').empty();
	web.ajax(basePath+"jw/eduGdCheckPaper/findStuCheckPaper.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}


/**
 * 考察实践查重记录
 * @param id
 * @param userId
 */
function loadBaogaochachong(id){
	$('#main_content').empty();
	web.ajax(basePath+"/edu/jw/eduGrStuPractice/kcsjReport.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}


/**
 * 毕业档案邮寄申请
 * @param id
 * @param userId
 */
function loadBydayjsq(id){
	$('#main_content').empty();
	web.ajax(basePath+"/edu/student/findBydayjsq.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}



/**
 * 创建档案邮寄
 */
function createArchiveSend(){
	$("#phone").val("");
	$("#address").val("");
	$('#archiveSend').bootstrapValidator('validate');
	$("#archiveSend").data('bootstrapValidator').destroy();
	$('#archiveSendModa').modal('show');
	$('#archiveSend').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
      	},
      	fields: {
      		phone: {
      			validators: {
      				 notEmpty: {
                    	message: '请填写手机号！'
              		 }, 
      				 regexp: {
                         regexp: /^1\d{10}$/,
                         message: '手机号格式错误！'
                     }
          		}
      		},address: {
      			validators: {
      				notEmpty: {
                    	message: '请填写地址！'
              		}, 
          		}
      		},telPhone:{
      			validators: {
      				notEmpty: {
                    	message: '请填写电话！'
              		}, 
              		regexp: {
                        regexp: /^\d{7,8}$/,
                        message: '电话格式错误！'
                    }
          		}
      		},telQh:{
      			validators: {
      				notEmpty: {
                    	message: '请填写区号！'
              		}, 
              		regexp: {
                        regexp: /^0\d{2,3}$/,
                        message: '区号格式错误！'
                    }
          		}
      		}
      		
      	}
	});
	
	 $("#addrType").change(function(){
	   var addrType = $(this).val();
	   if (addrType == "01") {
		   $("#addrTypeName").html("工作单位人事档案管理部门地址");
	   } else if (addrType == "02") {
		   $("#addrTypeName").html("人才市场档案管理部门地址");
	   }
	 });
}

function applyArchiveSend() {
	$('#archiveSend').bootstrapValidator('validate');
	if ($("#archiveSend").data("bootstrapValidator").isValid()) {
		layer.confirm('请确认手机号，邮寄地址是否正确，点击确认后将不能修改?', function(index){
			layer.close(index);
			var lay = layer.load(1);
			web.ajax(basePath+"/edu/student/saveArchiveSend.ajax",{stuId:$("#stuId").val(), phone:$("#phone").val(),
				addrType:$("#addrType").val(), address:$("#address").val(), telPhone:$("#telQh").val()+"-"+$("#telPhone").val()},true,function(r){
				layer.close(lay);
				if (r.state == "0") {
					$('#archiveSendModa').modal('hide');
					var timer1=window.setTimeout(function (){
						loadBydayjsq("bydayjsq");
						window.clearTimeout(timer1);
		            },500);
					//$('#modalClose').click();
					
				} else {
					messageDialogShow('提示',r.msgInfo, 2);
				}
			});
		});
	}
}



function createCheckPaper() {
	web.ajax(basePath+"jw/eduGdCheckPaper/createCheckPaper.ajax",{userid:userId},true,function(r){
		if (r.state == "0") {
			loadLunwenchachong("lunwenchachong");
		} else {
			messageDialogShow('提示',r.msgInfo,2);
		}
	});
}

function startCheckPaper(egcpNo) {
	layer.confirm('确认是否开始检测?', function(index){
		layer.close(index);
		var lay = layer.load(1);
		$("#startCheckPaper").attr("disabled", "disabled");
		$("#deleteCheckPaper").attr("disabled", "disabled");
		web.ajax(basePath+"jw/eduGdCheckPaper/startCheckPaper.ajax",{egcpNo:egcpNo},true,function(r){
				$("#startCheckPaper").removeAttr("disabled");
				$("#deleteCheckPaper").removeAttr("disabled");
				layer.close(lay);
				if (r.state == "0") {
					loadLunwenchachong("lunwenchachong");
				} else if(r.state == "1"){
					window.open(basePath + "/web/personalCheckPaper.jsp?egcpNo="+egcpNo);
				} else {
					messageDialogShow('提示',r.msgInfo,2);
				}
		});
	}); 

	/*var url=basePath+'aweto/pages/base/checkPaperAttach.jsp?egcpNo='+ egcpNo +'&signkey='+signkey;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  content:url,  //iframe的url
		  end: function(res){
			  loadLunwenchachong("lunwenchachong");
		  }
	});*/
}

function deleteCheckPaper(egcpNo) {
	layer.confirm('确认是否删除?', function(index){
		layer.close(index);
		$("#deleteCheckPaper").attr("disabled", "disabled");
		web.ajax(basePath+"jw/eduGdCheckPaper/deleteCheckPaper.ajax",{egcpNo:egcpNo},true,function(r){
			$("#deleteCheckPaper").removeAttr("disabled");
			if (r.state == "0") {
				loadLunwenchachong("lunwenchachong");
			}
		});
	});
}

function lookCheckPaper(lookUrl) {
	window.open(lookUrl);
}

function downloadCheckPaper(downloadUrl) {
	window.open(downloadUrl);
}

function stuDownloadCheckPaper(downloadUrl) {
	var a = document.createElement("a");
    a.download = '报告查重纪录';
    (document.body || document.documentElement).appendChild(a);
    a.href = downloadUrl;
    a.target = '_parent';
    a.click();
    a.remove();
}

function reloadCheckPaper(egcpNo) {
	var lay = layer.load(1);
	$("#reloadCheckPaper").attr("disabled", "disabled");
	web.ajax(basePath+"jw/eduGdCheckPaper/reloadCheckPaper.ajax",{egcpNo:egcpNo},true,function(r){
		$("#reloadCheckPaper").removeAttr("disabled");
		layer.close(lay);
		if (r.state == "0") {
			loadLunwenchachong("lunwenchachong");
		} else {
			messageDialogShow('提示',r.msgInfo,2);
		}
	});
}



/**
 * 
 */
function loadGraduationProject2(id,userId){
	$('#' + id + '1-tmpl').empty();
	$('#graduationProject-teaSelect').empty();
	$("#gdTileName").val("");
	$("#graduationProjectSearch input").val("");
	web.ajax(basePath+"edu/jw/eduGdTitle/findStuGdTitle.ajax",{userid:userId},true,function(r){
		$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
		$('#graduationProject-teaSelect-tmpl').tmpl(r).appendTo('#graduationProject-teaSelect');
		$('#' + id + '1-tmpl').show();
		$('#graduationProject-teaSelect').comboSelect({
			"comboClass":"combo-select",
			"inputClass":"form-control"
		});
		if(r.state != "99"){
			$("#graduationProjectSearch").css("display","block");
		}
	});
}

/**
 * 查看毕设题目介绍
 */
function toTitleDetail(titleNo){
	if(null!=titleNo){
		web.ajax(basePath+"edu/jw/eduGdTitle/findStuGdTitleContent.ajax",{titleNo:titleNo},true,function(r){
			if(r.flag == true){
				$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>毕设题目介绍</h4>");
				$('#majorInfo').html("<div id='titleInfo'>"+r.content+"</div>");
				$('#specimodal').modal('show');
			}else{
				return;
			}
			
		});
    }else {
        return;
    }
}

//查看任务书详细
function showTaskDesc(deNo){
	web.ajax(basePath+'edu/jw/eduGdDesign/findTaskDesc.ajax',{deNo:deNo},false,function(r){
		if(r.flag){
			$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>任务书详细</h4>");
			$('#majorInfo').html("<div id='taskDesc'>"+r.taskDesc+"</div>");
			$('#specimodal').modal('show');
		}else{
			return;
		}
	});
}

//查看开题报告详情
function showReportPaper(planNo) {
	web.ajax(basePath+'edu/jw/eduGdPlan/findReportOrThesisPaper.ajax',{planNo:planNo},false,function(r){
		if(r.state == "0"){
			$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>开题报告格式</h4>");
			$('#majorInfo').html("<div id='reportPaper'>"+r.param.reportPaper+"</div>");
			$('#specimodal').modal('show');
		}else{
			return;
		}
	});
}

function showBisherProcess(deNo) {
	var raqName="html_gdReviewOprInfo";
	// var param="raq=html/"+raqName+"&needPrint=no&whereSql=opr_pk="+deNo;
	var param="raq=html/"+raqName+"&needPrint=no&arg1="+deNo;
	var src = reportPath()+"aweto/plugins/runqian/view/showReport.jsp?"+param;
	layer.open({
		area:['900px','550px'],
		title:'操作记录',
		content:'<iframe  id="kstzsIframe" src="'+ src +'" frameborder="0" style="width:100%; height:400px; margin:0 auto;padding:0;"></iframe>'
	});
	
}

//退回原因
function showBackReason(deNo, typ) {
	web.ajax(basePath+'edu/jw/eduGdDesign/findBackReason.ajax',{deNo:deNo},true,function(r){
		if(r.state == "0"){
			var titleName = "开题报告退回原因";
			var reason = r.param.reportRefReason;
			if (typ == "paper") {
				titleName = "论文退回原因";
				reason = r.param.paperRefReason;
			} else if (typ == "pingyu") {
				titleName = "论文评语";
				reason = r.param.paperComment;
			} else if(typ == "chugao"){
				titleName = "初稿指导意见";
				reason = r.param.chugaoComment;
			} else if(typ == "zhonggao"){
				titleName = "二稿指导意见";
				reason = r.param.zhonggaoComment;
			}
			$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>"+ titleName +"</h4>");
			$('#majorInfo').html("<div id='reportPaper'>"+reason+"</div>");
			$('#specimodal').modal('show');
		}else{
			return;
		}
	});
}

//查看论文说明
function showThesisPaper(planNo) {
	web.ajax(basePath+'edu/jw/eduGdPlan/findReportOrThesisPaper.ajax',{planNo:planNo},false,function(r){
		if(r.state == "0"){
			$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>论文格式</h4>");
			$('#majorInfo').html("<div id='thesisPaper'>"+r.param.thesisPaper+"</div>");
			$('#specimodal').modal('show');
		}else{
			return;
		}
	});
}

//查看答辩说明
function showDefencePaper(planNo) {
	web.ajax(basePath+'edu/jw/eduGdPlan/findReportOrThesisPaper.ajax',{planNo:planNo},false,function(r){
		if(r.state == "0"){
			$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>答辩格式</h4>");
			$('#majorInfo').html("<div id='thesisPaper'>"+r.param.defenseDesc+"</div>");
			$('#specimodal').modal('show');
		}else{
			return;
		}
	});
}

//选题
function selectTitle(obj,type,titleNo,titleName){
	if(isEmpty(titleNo)){
		return;
    }
	web.ajax(basePath+'edu/eduStudentLearnInfo/selectVolunt.ajax',{titleNo:titleNo,userId:userId,type:type},false,function(r){
		//alert(JSON.stringify(r))
		if(r.flag){
			loadGraduationProject2('graduationProject',userId);
		}else{
			messageDialogShow('提示',r.msgInfo,2);
			return;
		}
	});
}

//取消选题
function canceGdlTitle(obj,type,titleNo){
	var indextishi = layer.load(2,{shade: [0.8, '#393D49']});
	web.ajax(basePath+'edu/eduStudentLearnInfo/cancelGdlTitleVolunt.ajax',{titleNo:titleNo,userId:userId,type:type},true,function(r){
		layer.close(indextishi);
		if(r.flag){
			loadGraduationProject2('graduationProject',userId);
		}else{
			messageDialogShow('提示',r.msgInfo,2);
			return;
		}
	});
}

//选题选志愿提交
function submitVolunt(titleNo,titleName){
	var volunt=$("input[name='volunt']:checked").val();
	if(volunt!=null&&titleNo!=null){
		$('#volunt'+volunt).html("<td id='volunt"+volunt+"' width='180'><input type='hidden' id='volunt"+volunt+"_1' value='"+titleNo+"' />"+titleName+"</td>");
	}else{
		return;
	}
}

//提交选题志愿表
function submitVoluntForm(){
	var volunt1=$('#volunt1_1').val();
	if(undefined==volunt1){
		messageDialogShow('提示','请选择第一志愿！',2);
		return;
	}
	var volunt2=$('#volunt2_1').val();
	if(undefined==volunt2){
		messageDialogShow('提示','请选择第二志愿！',2);
		return;
	}
	var volunt3=$('#volunt3_1').val();
	if(undefined==volunt3){
		messageDialogShow('提示','请选择第二志愿！',2);
		return;
	}
	if(volunt1!=volunt2&&volunt1!=volunt3&&volunt2!=volunt3){
		if(confirm("志愿一旦提交，将不能更改，是否确认提交?")){
			web.ajax(basePath+"edu/eduStudentLearnInfo/addVolunt.ajax",{userid:userId,volunt1:volunt1,volunt2:volunt2,volunt3:volunt3},true,function(r){
				messageDialogShow('提示',r.msgInfo);
			});
		}
	}else{
		messageDialogShow('提示','三个志愿不能相同，请重新选择！');
		return;
	}

}

//重置选题志愿表
function resetVoluntForm(){
	$('#volunt1').html("<td id='volunt1' width='180'></td>");
	$('#volunt2').html("<td id='volunt2' width='180'></td>");
	$('#volunt3').html("<td id='volunt3' width='180'></td>");
}

//加载我的毕业信息登记
function loadWdbyxxdj(id){
	var checkedState = "";
	web.ajax(basePath+"edu/student/findGrInfo.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#main_content').empty();
		if(r.flag){
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if(r.myGrInfo){
				$('#wdbyxxdjForm').setFormValue(r.myGrInfo);
				$("#photoImgE").attr("src",basePath+$("#graPhoto").val());
				checkedState = r.myGrInfo.checkedState;
				if(r.myGrInfo.checkedState=='01'||r.myGrInfo.checkedState=='02'){
					$('#saveGrInfoFormBtn').hide();
					$('#graPhotoDemo').hide();
					$('#graPhotoFile').css("display","none");
					$('#progress2').hide();
					$('#progress3').hide();
					$('#stuName').attr("readonly",true);
					$('#sex').attr("disabled",true);
					$('#birthday').attr("disabled",true);
					$('#ethnic').attr("disabled",true);
					$('#idCard').attr("readonly",true);
				}else{
					$('#saveGrInfoFormBtn').show();
					$('#graPhotoDemo').show();
					$('#graPhotoFile').css("display","block");
					$('#progress2').show();
					$('#progress3').show();
					$('#stuName').attr("readonly",false);
					$('#sex').attr("disabled",false);
					$('#birthday').attr("disabled",false);
					$('#ethnic').attr("disabled",false);
					$('#idCard').attr("readonly",false);
				}
			}
			if(stuState == "01" || stuState == "03"){
				// 保存事件注册
				$('#saveGrInfoFormBtn').on('click',function(){
					saveGrInfoFormBtn(this);
				});
				lay('.laydate-item').each(function(){
					laydate.render({
						elem: this
					});
				});
			}

			//毕业证件照上传事件
			if($("#graPhotoFile") && (stuState == "01" || stuState == "03")){
				layui.use('upload', function(){
					var upload = layui.upload;

					//执行实例
					var uploadInst = upload.render({
						elem: '#graPhotoFile' //绑定元素
						,url: basePath+"/FileUploadServlet?savePath=studentImg" //上传接口
						,accept:"images"
						,acceptMime: 'image/jpg, image/jpeg, image/png'
						,exts:'jpg|png|jpeg'
						,size:3*1024
						,multiple:false
						,done: function(res){
							//上传完毕回调
							var data = res;
							var path = data.value.replace('//','/').replace('/Liems/','');
							$('#graPhoto').val(path);
							document.getElementById('photoImgE').src = basePath+path;
							$("#graPhotoEmptyImageButton").css("display","block");
						}
						,error: function(){
							//请求异常回调
							layer.msg('请求异常', {icon:3, time: 2000});
						}
					});
				});
				$('#graPhotoFile-button').css('line-height','15px');
				return;
				/*$("#graPhotoFile").uploadify({
			        'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
			        'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
			        'auto': true,
			        'multi': false,
			        'queueID' : 'graPhotoQueue',
			        "buttonText": "上传毕业证件照",
			        'fileSizeLimit':'3MB',
			        'fileTypeExts': '*.jpg; *.jpeg; *.png;',
			        "buttonClass": "btn btn-primary",
			        'overrideEvents': ['onDialogClose'],
			      //返回一个错误，选择文件的时候触发  
			        'onSelectError': function (file, errorCode, errorMsg) {  
			            switch (errorCode) {  
			            case -100: 
		                	messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#graPhotoFile').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
		                    return;  
		                case -110: 
		                	messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#graPhotoFile').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
		                    return;  
		                case -120:  
		                	messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
		                    return;  
		                case -130:
		                	messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
		                    return;  
			            }  
			        },
			        'onUploadSuccess': function (file, data, response) {// 上传成功后执行
			        	data = JSON.parse(data);
			        	var path = data.value.replace('//','/').replace('/Liems/','');
			        	$('#graPhoto').val(path);
		                $('#' + file.id).find('.data').html('上传完毕');
		                document.getElementById('photoImgE').src = basePath+path;
		                $("#graPhotoEmptyImageButton").css("display","block");
		             },
		             'onFallback': function () {
		            	//alert('未检测到兼容版本的Flash.');
		                 messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
		             }
			    });*/
				$('#graPhotoFile-button').css('line-height','15px');
			}
			if(checkedState=='01'||checkedState=='02'){
				$('#graPhotoFile').css("display","none");
			}else{
				$('#graPhotoFile').css("display","block");
			}
			if(stuState != "01" && stuState != "03"){
				$('#saveGrInfoFormBtn').css("display","none");
				$('#graPhotoFile').css("display","none");
				$('input').attr("disabled","disabled");
				$('select').attr("disabled","disabled");
			}
        }else {
            return;
        }
		
	});
}

//毕业信息登记的保存按钮
function saveGrInfoFormBtn(obj){
	//校验照片是否上传
	var graPhoto = $("#graPhoto").val() || "";
	if(graPhoto == ""){
		messageDialogShow('提示',"请按要求上传毕业照片！",2);
		return;
	}
	$(obj).button('loading');
	$('#applyByxxdjBtn').bind("click",function(){
		applyByxxdj();
	});
	$('#cancelByxxdjBtn').bind("click",function(){
		cancelByxxdj();
	});
	$('#wdbyxxdjmodal').modal({backdrop: 'static', keyboard: false});
	$('#wdbyxxdjmodal').modal('show');
}

function applyByxxdj(){
	var id="wdbyxxdj";
	$('#wdbyxxdjmodal').modal('hide');
	var data = $('#wdbyxxdjForm').serializeJson();
	web.ajax(basePath+"edu/student/changeGrInfo.ajax",{param:JSON.stringify(data)},true,function(r){
		if(0 == r.state){
			$("#saveGrInfoFormBtn").hide();
			messageDialogShow('提示',r.msgInfo);
			loadWdbyxxdj(id);
		}else{
			$("#saveGrInfoFormBtn").button('reset');
			messageDialogShow('提示',r.msgInfo,2);
		}
	});
}

function cancelByxxdj(){
	$("#saveGrInfoFormBtn").button('reset');
}

function loadWdbyjdb(id){
	web.ajax(basePath+"edu/student/findByjdb.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		if(r.flag){
			var ms=new Array();
			ms.length=6;
			r.ms = ms;
			$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
			if(r.index==0){
				//$("#saveEduInfoFormBtn").show();
				//$("#submitEduInfoFormBtn").show();
			}else{
				//$('select,textarea', $('#signupForm')).attr('readonly', true);
				$('#eduInfoUpForm').find('input,textarea,select').not('button').attr('readonly',true);
				$("#saveEduInfoFormBtn").hide();
				$("#submitEduInfoFormBtn").hide();
			}
			
			if(r.zbackReasonFlag == "1") {
				 layer.alert("您的鉴定表被站点退回，原因是："+ r.zbackReason,{
					    /*area:['300px','200px'],*/
						title:'提示',
						skin: 'layui-layer-rim',
						shadeClose : false,
						closeBtn :0
				 });
			}

			if(r.wbackReasonFlag == "1") {
				layer.alert("您的鉴定表被网院退回，原因是："+ r.wbackReason,{
					/*area:['300px','200px'],*/
					title:'提示',
					skin: 'layui-layer-rim',
					shadeClose : false,
					closeBtn :0
				});
			}
			
			// 保存事件注册
			$('#saveEduInfoFormBtn').on('click', function() {
				saveEduInfoFormBtn(this);
			});

			// 提交事件注册
			$('#submitEduInfoFormBtn').on('click', function() {
				submitEduInfoFormBtn(this);
			});
			
			laydate.render({
				elem: '#beginWork',
				trigger: 'click'
			});
		}else {
			messageDialogShow("提示", "当前未到毕业学期，不能填写毕业鉴定表！");
			return;
		}
	});
	
}

/**
 * 教师评价
 * @param id
 */
function teacherEvaluation(id){
	$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
	$('#' + id + '1-tmpl').empty();
	web.ajax(basePath+"edu/jw/eduEvalPaperInstance/findTeaEvalInstance.ajax",{userId:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
	});
}

//加载我的毕业证书信息
function loadWdbyzs(id){
	web.ajax(basePath+"edu/eduCerts/findCertsInfo.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#main_content').empty();
		if(r.flag){
			$('#' + id + '-tmpl').tmpl(r.myGrCertInfo).appendTo('#main_content');
        }else {
        	messageDialogShow('错误',"未查询到毕业证书","1");
            return;
        }
	});
}
//加载我的统考成绩
function loadWdtkcj(id){
	web.ajax(basePath+"jw/eduGraduateStudent/findPreGraStuTkcjNew.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}

//加载我的学位外语成绩
function loadWdxwwycj(id){
	web.ajax(basePath+"edu/eduDegreeDefense/findEngDegreeDefense.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}

//收取我的毕业证书信息
function receptCert(certsNo,grPosition,centerName,grCertState,grExpressId){
	var id="wdbyzs";
	if(isEmpty(certsNo)){
		messageDialogShow('错误',"未查询到毕业证书");
	}
	if((grCertState=='站点已发放')){
		web.ajax(basePath+"edu/eduCerts/receptCert.ajax",{certsNo:certsNo},true,function(r){
			if(r.state=='0'){
				messageDialogShow('提示',"毕业证书收取成功！");
				$('#receptCertBtn').hide();
				loadWdbyzs(id);
			}else {
				messageDialogShow('错误',"毕业证书收取失败",2);
				return;
			}
		});
	}else{
		messageDialogShow('提示',"您的证书尚未到达，请耐心等候！");
	}
}

//加载我的学位证书信息
function loadWdxwzs(id){
	web.ajax(basePath+"edu/eduCerts/findDegreeInfo.ajax",{userid:userId},false,function(r){
		removeWaittingMask();
		if(r.flag){
			$('#' + id + '-tmpl').tmpl(r.myDegreeInfo).appendTo('#main_content');
        }else {
        	messageDialogShow('错误',"未查询到学位证书");
            return;
        }
	});
}

//收取我的学位证书信息
function receptDegree(certsNo,degreeCertsPosition,centerName,degreeCertsState){
	var id="wdxwzs";
	if(isEmpty(certsNo)){
		messageDialogShow('错误',"未查询到学位证书");
	}
	if(degreeCertsPosition==centerName&&degreeCertsState=='已发放'){
		web.ajax(basePath+"edu/eduCerts/receptCert.ajax",{certsNo:certsNo},true,function(r){
			if(r.state=='0'){
				$('#main_content').empty();
				messageDialogShow('提示',"学位证书收取成功！");
				loadWdbyzs(id);
			}else {
				messageDialogShow('错误',"学位证书收取失败",2);
				return;
			}
		});
	}else{
		messageDialogShow('提示',"您的证书尚未到达，请耐心等候！");
	}
}

function modalStyle(id,height){
	var topHeight = Math.max(0, ($(window).height() - $('#'+id).find('.modal-dialog').height()) / 2)-height;
//	$('#'+id).modal({backdrop: 'static', keyboard: false});
	$('#'+id).css('display', 'block');
	$('#'+id).css({'margin-top': topHeight});
	$('#'+id).removeData("bs.modal");
	$('#'+id).modal('show');
}

function loadExamscores(id){
	web.ajax(basePath+'/exam/examStuEntrance/checkQualificationNew.ajax',{userid:userId},true,function(r){
		removeWaittingMask();
		$("#main_content").empty();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		if(r.subject && r.subject.length > 0){
			if(r.subject[0].examType=='reTest1'){
				if(r.examTime != 0){
					for(var i = 0; i < r.subject.length; i++){
						$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
						$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
						$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
					}
					$('#reDoAll').removeAttr('style', 'display:none;');
				}
			}else{
				for(var i = 0; i < r.subject.length; i++){
					if(r.subject[i].disabled == 'new'){
						$('#'+r.subject[i].subjectNo).text("开始考试");
						$('#'+r.subject[i].subjectNo).attr('disabled', false);
						$('#'+r.subject[i].subjectNo).removeAttr('style', 'display:none;');
						$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
						$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
					}
					if(r.subject[i].disabled == 'disabled'){
						$('#'+r.subject[i].subjectNo).text("重考本门");
						$('#'+r.subject[i].subjectNo).attr('disabled', false);
						$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
						$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
					}
					if(r.subject[i].disabled == 'continue'){
						$('#'+r.subject[i].subjectNo).attr('style', 'display:none;');
						$('#'+r.subject[i].subjectNo+'continue').removeAttr('style', 'display:none;');
//						$('#'+r.subject[i].subjectNo+'retest').removeAttr('style', 'display:none;');
					}
					if(r.subject[i].disabled == 'fail'){
						$('#'+r.subject[i].subjectNo).text("已考完");
						$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
						$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
						$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
					}
				}
			}
		}
	});
	
}



/**
 * 开始入学考试
 */
function examInfo(pk, arrangeId, isCheck){
	subNo = pk;
	arrId = arrangeId;
	isCheckCode = isCheck;
	var flag  = false;
	web.ajax(basePath+'/exam/examStuEntrance/checkAllowExamTime.ajax',{arrangeId:arrId},false,function(r){
		if(r.state==-1){
			messageDialogShow("提示", r.msgInfo);
			flag = true;
			return;
		}
	});
	if(flag){
		return false;
	}
	//校验验证码
	if(isCheck=='0'){
		examInfoSE();
	}else{
		modalStyle('myModalSE',180);
	}
	return false;
}

/**
 * 
 */
function examInfoSE(){
	var code = "";
	if(isCheckCode!="0"){
		var checkRes = "-1";
		var type = "0";
		code = $("#validatecode").val();
		web.ajax(basePath+'/exam/examStuEntrance/checkCode.ajax',
				{userId:userId,subjectNo:subNo,arrangeId:arrId,type:type,code:code},
				false,function(r){
					if(r.state==-1){
						messageDialogShow("提示", r.msgInfo);
					}else{
						checkRes = "1";
					}
				});
//		var data = $('#myModalSE').data();
		$("#myModalSE").on("hide.bs.modal",function(){$(this).removeData("bs.modal");});
		$('#myModalSE').modal('hide');
		$(".modal-backdrop").hide();
		//$("#btn-cancel").trigger("click");
		if(checkRes=="-1"){
			return false;
		}
	}
		web.ajax(basePath+'/exam/examStuEntrance/startExamNew.ajax',{userid:userId,subjectno:subNo,arrangeId:arrId,code:code},true,function(r){
			if(r.msg.state == -1){
				messageDialogShow("提示", r.msg.msgInfo);
				return false;
			}
			if(r.msg.state == 0){
				messageDialogShow("提示", r.msg.msgInfo);
				$('#'+subNo).attr('disabled', "disabled");
				return false;
			}
			if(r.msg.state == -2){
				messageDialogShow("提示", r.msg.msgInfo);
				/*$('#'+pk).attr('disabled', "disabled");*/
				$('#examscores-tmpl').find('button').attr('disabled', "disabled");
				return false;
			}
			/*if(r.subject){
				for(var i = 0; i < r.subject.length; i++){
					$('#'+r.subject[i]).attr('disabled', 'disabled');
					$('#'+r.subject[i]+'continue').attr('disabled', 'disabled');
					$('#'+r.subject[i]+'retest').attr('disabled', 'disabled');
				}
			}*/
			var winObj = window.open(basePath+"web/exam.htm?userId="+userId+"&subjectno="+subNo+"&arrangeId="+arrId,'_blank');
			var loop = setInterval(function(){
				if(winObj.closed){
					clearInterval(loop);
					$("#main_content").empty();
					web.ajax(basePath+'/exam/examStuEntrance/checkQualificationNew.ajax',{userid:userId},false,function(r){
						$('#examscores-tmpl').tmpl(r).appendTo('#main_content');
						if(r.subject){
							if(r.subject[0].examType=='reTest1'){
								if(r.examTime != 0){
									for(var i = 0; i < r.subject.length; i++){
										$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
										$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
										$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
									}
									$('#reDoAll').removeAttr('style', 'display:none;');
								}
							}else{
								$('#reDoAll').attr('style', 'display:none;');
								for(var i = 0; i < r.subject.length; i++){
									if(r.subject[i].disabled == 'new'){
										$('#'+r.subject[i].subjectNo).text("开始考试");
										$('#'+r.subject[i].subjectNo).attr('disabled', false);
										$('#'+r.subject[i].subjectNo).removeAttr('style', 'display:none;');
										$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
										$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									}
									if(r.subject[i].disabled == 'disabled'){
										$('#'+r.subject[i].subjectNo).text("重考本门");
										$('#'+r.subject[i].subjectNo).attr('disabled', false);
										$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
										$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
									}
									if(r.subject[i].disabled == 'continue'){
										$('#'+r.subject[i].subjectNo).attr('style', 'display:none;');
										$('#'+r.subject[i].subjectNo+'continue').removeAttr('style', 'display:none;');
//										$('#'+r.subject[i].subjectNo+'retest').removeAttr('style', 'display:none;');
									}
									if(r.subject[i].disabled == 'fail'){
										$('#'+r.subject[i].subjectNo).text("已考完");
										$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
										$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
										$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
									}
								}
							}
							
						}
					});
				}
			}, 1000);
		});
		loadExamscores("examscores");
}

/**
 * 
 */
function checkCord(res){
	checkRes = res;
}

/**
 * 
 */
function myExamInfo(pk){
	web.ajax(basePath+'/exam/examStuEntrance/startExamWithoutChecking.ajax',{userid:userId,subjectno:pk},false,function(r){
		if(r.msg.state == -1){
			messageDialogShow("提示", r.msg.msgInfo);
			return;
		}
		if(r.msg.state == 0){
			messageDialogShow("提示", r.msg.msgInfo);
			$('#'+pk).attr('disabled', 'disabled');
			return;
		}
		if(r.subject){
			for(var i = 0; i < r.subject.length; i++){
				$('#'+r.subject[i]).attr('disabled', 'disabled');
				$('#'+r.subject[i]+'continue').attr('disabled', 'disabled');
				$('#'+r.subject[i]+'retest').attr('disabled', 'disabled');
			}
		}
		var winObj = window.open(basePath+"web/exam.htm?userId="+userId+"&subjectno="+pk,'_blank');
	});
}

/**
 * 继续进行考试
 */
function continueExam(pk, arrangeId, isCheck){
	subNoc = pk;
	arrIdc = arrangeId;
	isCheckCode = isCheck;
	var flag  = false;
	web.ajax(basePath+'/exam/examStuEntrance/checkAllowExamTime.ajax',{arrangeId:arrIdc},false,function(r){
		if(r.state==-1){
			messageDialogShow("提示", r.msgInfo);
			flag = true;
			return;
		}
	});
	if(flag){
		return false;
	}
	//校验验证码
	if(isCheck=="0"){
		examInfoCE();
	}else{
		modalStyle('myModalCE',180);
	}
}

/**
 * 
 */
function examInfoCE(){
	var code = "";
	if(isCheckCode!="0"){
		var checkRes = "-1";
		var type = "1";
		code = $("#cvalidatecode").val();
		web.ajax(basePath+'/exam/examStuEntrance/checkCode.ajax',
				{userId:userId,subjectNo:subNoc,arrangeId:arrIdc,type:type,code:code},
				false,function(r){
					if(r.state==-1){
						messageDialogShow("提示", r.msgInfo);
					}else{
						checkRes = "1";
					}
				});
//	var data = $('#myModalSE').data();
		$("#myModalCE").on("hide.bs.modal",function(){$(this).removeData("bs.modal");});
		$('#myModalCE').modal('hide');
		$(".modal-backdrop").hide();
		//$("#btn-cancel").trigger("click");
		if(checkRes=="-1"){
			return false;
		}
	}
	web.ajax(basePath+'/exam/examStuEntrance/continueExam.ajax',{userid:userId,subjectno:subNoc,arrangeId:arrIdc},false,function(r){
		if(r.msg.state == -1){
			messageDialogShow("提示", r.msg.msgInfo);
			return;
		}
		if(r.msg.state == 0){
			messageDialogShow("提示", r.msg.msgInfo);
			$('#'+subNoc).attr('disabled', 'disabled');
			return;
		}
		if(r.msg.state == -2){
			messageDialogShow("提示", r.msg.msgInfo);
			/*$('#'+pk).attr('disabled', "disabled");*/
			$('#examscores-tmpl').find('button').attr('disabled', 'disabled');
			return;
		}
		/*if(r.subject){
			for(var i = 0; i < r.subject.length; i++){
				$('#'+r.subject[i]).attr('disabled', 'disabled');
				$('#'+r.subject[i]+'continue').attr('disabled', 'disabled');
				$('#'+r.subject[i]+'retest').attr('disabled', 'disabled');
			}
		}*/
		var winObj = window.open(basePath+"web/continueexam.htm?userId="+userId+"&subjectno="+subNoc+"&arrangeId="+arrIdc,'_blank');
		var loop = setInterval(function(){
			if(winObj.closed){
				clearInterval(loop);
				$("#main_content").empty();
				web.ajax(basePath+'/exam/examStuEntrance/checkQualificationNew.ajax',{userid:userId},true,function(r){
					$('#examscores-tmpl').tmpl(r).appendTo('#main_content');
					if(r.subject){
						if(r.subject[0].examType=='reTest1'){
							if(r.examTime != 0){
								for(var i = 0; i < r.subject.length; i++){
									$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
								}
								$('#reDoAll').removeAttr('style', 'display:none;');
							}
						}else{
							$('#reDoAll').attr('style', 'display:none;');
							
							for(var i = 0; i < r.subject.length; i++){
								if(r.subject[i].disabled == 'new'){
									$('#'+r.subject[i].subjectNo).text("开始考试");
									$('#'+r.subject[i].subjectNo).attr('disabled', false);
									$('#'+r.subject[i].subjectNo).removeAttr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
								}
								if(r.subject[i].disabled == 'disabled'){
									$('#'+r.subject[i].subjectNo).text("重考本门");
									$('#'+r.subject[i].subjectNo).attr('disabled', false);
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
								}
								if(r.subject[i].disabled == 'continue'){
									$('#'+r.subject[i].subjectNo).attr('style', 'display:none;');
//									$('#'+r.subject[i].subjectNo+'retest').removeAttr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').removeAttr('style', 'display:none;');
								}
								if(r.subject[i].disabled == 'fail'){
									$('#'+r.subject[i].subjectNo).text("已考完");
									$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
								}
							}
						}
						
					}
				});
			}
		}, 1000);
	});
	loadExamscores("examscores");
}

/**
 * 重新进行考试
 */
function reExam(pk,arrangeId, isCheck){
	subNor = pk;
	arrIdr = arrangeId;
	var flag  = false;
	web.ajax(basePath+'/exam/examStuEntrance/checkAllowExamTime.ajax',{arrangeId:arrIdr},false,function(r){
		if(r.state==-1){
			messageDialogShow("提示", r.msgInfo);
			flag = true;
			return;
		}
	});
	if(flag){
		return false;
	}
	//校验验证码
	if(isCheck=="0"){
		examInfoRE();
	}else{
		modalStyle('myModalRE',180);
	}
}

/**
 * 
 */
function examInfoRE(){
	var code = "";
	if(isCheckCode!="0"){
		var checkRes = "-1";
		var type = "0";
		code = $("#rvalidatecode").val();
		web.ajax(basePath+'/exam/examStuEntrance/checkCode.ajax',
				{userId:userId,subjectNo:subNor,arrangeId:arrIdr,type:type,code:code},
				false,function(r){
					if(r.state==-1){
						messageDialogShow("提示", r.msgInfo);
					}else{
						checkRes = "1";
					}
				});
//	var data = $('#myModalSE').data();
		$("#myModalRE").on("hide.bs.modal",function(){$(this).removeData("bs.modal");});
		$('#myModalRE').modal('hide');
		$(".modal-backdrop").hide();
		//$("#btn-cancel").trigger("click");
		if(checkRes=="-1"){
			return false;
		}
	}
	web.ajax(basePath+'/exam/examStuEntrance/reExam.ajax',{userid:userId,subjectno:subNor,arrangeId:arrIdr,code:code},false,function(r){
		if(r.msg.state == -1){
			messageDialogShow("提示", r.msg.msgInfo);
			return;
		}
		if(r.msg.state == 0){
			messageDialogShow("提示", r.msg.msgInfo);
			$('#'+subNor).attr('disabled', 'disabled');
			return;
		}
		loadExamscores("examscores");
		/*if(r.msg.state == -2){
			messageDialogShow("提示", r.msg.msgInfo);
			$('#'+pk).attr('disabled', "disabled");
			$('#examscores-tmpl').find('button').attr('disabled', 'disabled');
			return;
		}*/
		if(r.subject){
			for(var i = 0; i < r.subject.length; i++){
				$('#'+r.subject[i]).attr('disabled', 'disabled');
				$('#'+r.subject[i]+'continue').attr('disabled', 'disabled');
				$('#'+r.subject[i]+'retest').attr('disabled', 'disabled');
			}
		}
		var winObj = window.open(basePath+"web/exam.htm?userId="+userId+"&subjectno="+subNor+"&arrangeId="+arrIdr,'_blank');
		var loop = setInterval(function(){
			if(winObj.closed){
				clearInterval(loop);
				$("#main_content").empty();
				web.ajax(basePath+'/exam/examStuEntrance/checkQualificationNew.ajax',{userid:userId},true,function(r){
					$('#examscores-tmpl').tmpl(r).appendTo('#main_content');
					if(r.subject){
						if(r.subject[0].examType=='reTest1'){
							if(r.examTime != 0){
								for(var i = 0; i < r.subject.length; i++){
									$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
								}
								$('#reDoAll').removeAttr('style', 'display:none;');
							}
						}else{
							$('#reDoAll').attr('style', 'display:none;');
							for(var i = 0; i < r.subject.length; i++){
								if(r.subject[i].disabled == 'new'){
									$('#'+r.subject[i].subjectNo).text("开始考试");
									$('#'+r.subject[i].subjectNo).attr('disabled', false);
									$('#'+r.subject[i].subjectNo).removeAttr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
								}
								if(r.subject[i].disabled == 'disabled'){
									$('#'+r.subject[i].subjectNo).text("重考本门");
									$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
								}
								if(r.subject[i].disabled == 'continue'){
									$('#'+r.subject[i].subjectNo).attr('style', 'display:none;');
//									$('#'+r.subject[i].subjectNo+'retest').removeAttr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').removeAttr('style', 'display:none;');
								}
								if(r.subject[i].disabled == 'fail'){
									$('#'+r.subject[i].subjectNo).text("已考完");
									$('#'+r.subject[i].subjectNo).attr('disabled', 'disabled');
									$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
									$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
								}
							}
						}
						
					}
				});
			}
		}, 1000);
	});
	loadExamscores("examscores");
}

/**
 * 重考本轮考试
 */
function reDoAll(){
	$("#main_content").empty();
	web.ajax(basePath+'/exam/examStuEntrance/checkQualification.ajax',{userid:userId},true,function(r){
		$('#examscores-tmpl').tmpl(r).appendTo('#main_content');
		$('#reDoAll').attr('style', 'display:none;');
		if(r.subject){
			for(var i = 0; i < r.subject.length; i++){
				$('#'+r.subject[i].subjectNo).removeAttr('disabled', 'disabled');
				$('#'+r.subject[i].subjectNo+'retest').attr('style', 'display:none;');
				$('#'+r.subject[i].subjectNo+'continue').attr('style', 'display:none;');
			}
		}
	});
}

/**
 * 计算入学考试成绩
 */
function calcPoints(){
	web.ajax(basePath+'/exam/examStuEntrance/calcPoints.ajax',{userid:userId},false,function(r){
		
	});
}

/**
 * 加载我的学位申请信息
 */
function loadWdxwsq(id){
	$('#main_content').empty();
	$('#courTable').hide();
	web.ajax(basePath+"edu/eduResult/findStudentDegreeScoreInfo.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id +'-tmpl').tmpl(r).appendTo('#main_content');
		if(r.stuInfo){
			$('#wdxwsqForm').setFormValue(r.stuInfo);
			$('#shortName').append(r.stuInfo.shortName);
			$('#fjPkVal').val(r.stuInfo.daNo);
			if(r.avgScore){
				$('#avgScore').val(r.avgScore);
			}
			if(r.stuIsDegreeApply == '1') {
				if(r.scoreQu=='1'){
					$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>恭喜，您符合学位申请条件，可进行"+r.major+"学位申请。</h4>");
				}else{
					$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>您暂时不能申请学位，您的成绩没有每门都大于或者等于75分。</h4>");
				}
			} else if(r.stuIsDegreeApply == '2' ) {
				$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>还没有到学位申请的学期，请耐心等待。</h4>");
			} else if(r.stuIsDegreeApply == '3') {
				$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>您暂时不能申请学位，您的学位英语没有达标。</h4>");
			} else if(r.stuIsDegreeApply == '4') {
				$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>您暂时不能申请学位，未发现有效学位申请计划，请耐心等待。</h4>");
			} else if(r.stuIsDegreeApply == '5') {
				$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>您当前已无法申请学位！</h4>");
			} else if(r.stuIsDegreeApply == '6') {
				$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>您暂时不能申请学位，您的统考没有通过！</h4>");
			} else {
				$('#ableDegree').html("<h4 id='ableDegree' style='text-align:center;'>学位申请相关资格查询有误！</h4>");
			}
			// 提交事件注册
			if(r.stuInfo.isApped){
				$('#ableDegree').hide();
				if(r.stuInfo.state == '0'){
					$('#checking').show();
				}else if(r.stuInfo.state == '2'){
					$('#checked').show();
				}else if(r.stuInfo.state == '3'){
					$('#check3').show();
				}else if(r.stuInfo.state == '4'){
					$('#check4').show();
				}else if(r.stuInfo.state=='1'){
					$('#check1').show();
				}
			}else{
				if(r.stuIsDegreeApply == '1' && r.scoreQu=='1' && r.isProgramme && r.ableDegree && r.xyapply && r.bmState == "1"){
				//if(r.isProgramme && r.ableDegree && r.xyapply){
					$('#newCreate').show();
					$('#submitWdxwsqBtn').on('click',function(){
						submitWdxwsqBtn(this);
					});
				}
			}
		}
	});
}

/**
 * 查看平均成绩
 */
function showCourTable(){
	var courTable=$('#courTable').html();
	$("#wdxwsqmmodalBody").html(courTable);
	$('#wdxwsqmmodal').modal('show');
	$('#wdxwsqmmodal').css('overflow','scroll');
	
//	messageDialogShow('课程成绩',courTable, 3, '800px');
}

/**
 * 提交学位申请
 */
function submitWdxwsqBtn(obj){
	$('#txStuModal').modal('show');
	$("#checkboxState1").prop("checked",false);
	$("#subDegreeApply").prop("disabled",true);
}

/**
 * 学位申请勾选框
 */
function checkboxStateChange(){
	if($("#checkboxState1").prop("checked")){
		$("#subDegreeApply").prop("disabled",false);
	}else{
		$("#subDegreeApply").prop("disabled",true);
	}
}

/**
 * 确定提交学位申请
 */
function subDegreeApply(obj){
	var index = layer.load(2,{shade: [0.8, '#393D49']});
	var id="wdxwsq";
	// var data = $('#wdxwsqForm').serializeJson();
	var $this = $(obj);
	var ddNo = $this.data("ddno");
	web.ajax(basePath+'edu/eduGrDegreeApply/addGrDegreeApply.ajax',{userid:userId,ddNo:ddNo},true,function(r){
		layer.close(index);
		if(r.state=='0'){
			$('#txStuModal').modal('hide');
			// messageDialogShow('提示',r.msgInfo);
			layer.alert(r.msgInfo,{title:'提示', icon: 1, skin: 'layui-layer-rim', shadeClose : false, closeBtn :0},function(errorindex){
				layer.close(errorindex);
				loadWdxwsq(id);
			});
		} else{
			messageDialogShow('提示',r.msgInfo);
		}
	});
}

/**
 * 加载毕设论文信息
 */
function loadGraduationInformation(id){
	web.ajax(basePath+"edu/jw/eduGdDesign/findMyGdDesign.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#main_content').empty();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		
		web.ajax(basePath+"edu/jw/eduGdPlan/findStuGdPlan.ajax",{userid:userId},true,function(r){
			$('#' + id + '1-tmpl').tmpl(r).appendTo('#stuGdPlanInfo');
			$('#showGdPlanDate').on('click',function(){
					var flag = $(this).attr('data');
					if('open' == flag){
						$('#stuGdPlanInfo').fadeIn('fast');
						$(this).attr('data','close');
						$(this).html('<i class="fa fa-angle-up" id="up"></i>收起</span>');
					}else{
						$('#stuGdPlanInfo').fadeOut('fast');
						$(this).attr('data','open');
						$(this).html('<i class="fa fa-angle-down" id="up"></i>展开</span>');
					}
			});
		});
		
		if(r.flag){
			if(r.myGdDesign.reportPassState=="已通过" || r.gdPlanFlag == "0"){
				$("#proofButton").hide();
			}else{
				$("#proofButton").show();
			}
			if(r.myGdDesign.chugaoCommitStateKey == "1"){
				$("#chugaoButton").hide();
			}else{
				$("#chugaoButton").show();
			}
			
			if(r.myGdDesign.chugaoPassStateKey == "1"){
				$("#zhonggaoButton").show();
			}else{
				$("#zhonggaoButton").hide();
			}
			
			if(r.myGdDesign.paperPassState=="通过" || r.gdPlanFlag == "0"){
				$("#paperButton").hide();
				$("#checkButton").hide();
			}else{
				$("#paperButton").show();
				$("#checkButton").show();
			}
			if(r.myGdDesign.gdResult=="已通过" || r.gdPlanFlag == "0" || r.myGdDesign.paperPassState=="通过"){
				$("#paperKeyWord").attr("disabled",true);
				$("#paperAbstract").attr("disabled",true);
			}else{
				$("#paperKeyWord").attr("disabled",false);
				$("#paperAbstract").attr("disabled",false);
			}
			if(r.myGdDesign.paperKeyWord){
				$('#paperKeyWord').val(r.myGdDesign.paperKeyWord);
			}
			if(r.myGdDesign.paperAbstract){
				$('#paperAbstract').val(r.myGdDesign.paperAbstract);
			}
			//处理过程
			if(r.gdPlanFlag == "0"){
				$("#proofButton").hide();
				$("#chugaoButton").hide();
				$("#zhonggaoButton").hide();
				$("#paperButton").hide();
				$("#checkButton").hide();
				$("#paperKeyWord").attr("disabled",true);
				$("#paperAbstract").attr("disabled",true);
			}else{
				if (r.myGdDesign.reportPassState=="已通过"){
					$("#proofButton").hide();
					if(r.myGdDesign.chugaoCommitStateKey == "1"){
						$("#chugaoButton").hide();
						if(r.myGdDesign.chugaoPassStateKey == "1"){
							if(r.myGdDesign.zhonggaoCommitStateKey == "1"){
								$("#zhonggaoButton").hide();
								if(r.myGdDesign.paperPassState=="通过"){
									$("#paperButton").hide();
									$("#checkButton").hide();
									$("#zhonggaoButton").hide();
									$("#paperKeyWord").attr("disabled",true);
									$("#paperAbstract").attr("disabled",true);
								}else if(r.myGdDesign.chachongState == "1"){
									$("#paperButton").show();
									$("#checkButton").hide();
									$("#paperKeyWord").attr("disabled",false);
									$("#paperAbstract").attr("disabled",false);
								}else{
									$("#paperButton").hide();
									$("#checkButton").hide();
									$("#paperKeyWord").attr("disabled",true);
									$("#paperAbstract").attr("disabled",true);
								}
							}else{
								$("#zhonggaoButton").show();
								$("#paperButton").hide();
								$("#checkButton").hide();
								$("#paperKeyWord").attr("disabled",true);
								$("#paperAbstract").attr("disabled",true);
							}
						}else{
							$("#zhonggaoButton").hide();
							$("#paperButton").hide();
							$("#checkButton").hide();
							$("#paperKeyWord").attr("disabled",true);
							$("#paperAbstract").attr("disabled",true);
						}
					}else{
						$("#chugaoButton").show();
						$("#zhonggaoButton").hide();
						$("#paperButton").hide();
						$("#checkButton").hide();
						$("#paperKeyWord").attr("disabled",true);
						$("#paperAbstract").attr("disabled",true);
					}
				}else{
					$("#proofButton").show();
					$("#chugaoButton").hide();
					$("#zhonggaoButton").hide();
					$("#paperButton").hide();
					$("#checkButton").hide();
					$("#paperKeyWord").attr("disabled",true);
					$("#paperAbstract").attr("disabled",true);
				}
				
				if(r.myGdDesign.reportCommitState=="已提交"){
					$("#proofButton").hide();
				}
				
			}
			if(r.myGdDesign.xzCheckNum >= 4 ){
				$("#proofButton").remove();
				$("#chugaoButton").remove();
				$("#zhonggaoButton").remove();
				$("#paperButton").remove();
				$("#checkButton").remove();
				$("#paperKeyWord").attr("disabled",true);
				$("#paperAbstract").attr("disabled",true);
				if(r.myGdDesign.zhonggaoPassStateKey != "1"){
					messageDialogShow('提示',"您已连续四次未通过查重，根据网院规定，您本次毕设结束！请等待下次毕设。");
				}
				return;
			}
			
        }else {
            return;
        }
	});
}


function lookCheckNotPass(lookUrl) {
	window.open(lookUrl);
}

/**
 * 更新关键词
 */
function updateKeyword(deNo){
	var keyWord=$("#paperKeyWord").val()||"";
	if(""!=keyWord){
		web.ajax(basePath+"edu/jw/eduGdDesign/updateKeywordOrAbstract.ajax",{deNo:deNo,keyWord:keyWord},true,function(r){
			if(r.state=='0'){
				messageDialogShow('提示',"关键词更新成功！");
				reloadGraduationInformation();
			}else{
				messageDialogShow('错误',"更新关键词失败！",2);
			}
		});
	}
}

/**
 * 
 */
function reloadGraduationInformation(){
	web.ajax(basePath+"edu/jw/eduGdDesign/findMyGdDesign.ajax",{userid:userId},true,function(r){
		if(r.myGdDesign){
			if(r.myGdDesign.paperKeyWord){
				$('#paperKeyWord').val(r.myGdDesign.paperKeyWord);
			}
			if(r.myGdDesign.paperKeyWord){
				$('#paperAbstract').val(r.myGdDesign.paperAbstract);
			}
        }
	});
}

/**
 * 更新摘要
 */
function updateAbstract(deNo){
	var paperAbstract=$("#paperAbstract").val()||"";
	if(""!=paperAbstract){
		web.ajax(basePath+"edu/jw/eduGdDesign/updateKeywordOrAbstract.ajax",{deNo:deNo,paperAbstract:paperAbstract},false,function(r){
			if(r.state=='0'){
				messageDialogShow('提示',"摘要更新成功！");
				reloadGraduationInformation();
			}else{
				messageDialogShow('错误',"更新摘要失败！",2);
			}
		});
	}
}

/**
 * 
 */
function showUploadTest(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.EduRidTest&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  scrollbar: false,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  content:url,  //iframe的url
		  end: function(res){
			  loadWodemiankaoshenq1('wodemiankaoshenq','');
		  }
	});
}

/**
 * 
 */
function showUploadGdTitleZZ(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.EduGdStuTitleZz&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  scrollbar: false,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  content:url,  //iframe的url
		  end: function(res){
			  loadgraduationProject3();
		  }
	});
}

/**
 * 我的课程实践-上传
 */
function showUploadPra(attachId,pkValue,fieldName){
	var showUploadPraindex = layer.load(2,{shade: [0.8, '#393D49']});
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.jw.EduGrStuPractice&fieldName="+fieldName;
	web.ajax(basePath + '/edu/jw/eduGrStuPractice/findSjkcRwsInfo.ajax', {
		spNo : pkValue,
		userId:userId
	}, true, function(r) {
		layer.close(showUploadPraindex);
		if(r.state == 0){
			if(r.value=="0"){
				messageDialogShow('提示',"没有阅读任务书，不能上传相关附件！","2");
				return;
			}else if(r.param.flag == false){
				var msgInfo = "请按辅导教师要求完成实践性教学环节,"+ r.param.jutiday+" 之后上传考查实践报告。";
				if(r.param.value == "-1"){
					msgInfo = "非常抱歉：由于您的任务书阅读日期为"+r.param.day+"，按照实践性教学环节规定，"+r.param.jutiday+" 之后方可上传考查实践报告，" +
						"但是超过本次计划截止时间（"+r.param.jzday+"）。";
				}
				messageDialogShow('提示',msgInfo,"2");
				return;
			}
			layer.open({
				  type: 2,
				  title: '选择附件',
				  shadeClose: true,
				  scrollbar: false,
				  shade: 0.4,
				  area: ['750px', '350px'],
				  content:url,  //iframe的url
				  end: function(res){
					  loadwodebiyeshijian('wodebiyeshijian');
				  }
			});
		}else{
			messageDialogShow('提示',r.msgInfo,"2");
		}
	});
	
}
/**
 * 我的考查课-上传
 */
function showUploadKc(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.jw.EduGrStuPractice&fieldName="+fieldName;
	web.ajax(basePath + '/edu/jw/eduGrStuPractice/findSjkcRwsInfo.ajax', {
		spNo : pkValue,
		userId : userId
	}, true, function(r) {
		if(r.state == 0){
			if(r.value=="0"){
				messageDialogShow('提示',"没有阅读任务书，不能上传相关附件！","2");
				return;
			}else if(r.param.flag == false){
				messageDialogShow('提示',"请按辅导教师要求完成实践性教学环节,"+ r.param.jutiday+" 之后上传考查实践报告","2");
				return;
			}
			layer.open({
				type: 2,
				title: '选择附件',
				shadeClose: true,
				scrollbar: false,
				shade: 0.4,
				area: ['750px', '350px'],
				content:url,  //iframe的url
				end: function(res){
					loadWodekaochake('wodekaochake');
				}
			});
		}else{
			messageDialogShow('提示',r.msgInfo,"2");
		}
	});
}

/**
 * 我的考查课-上传
 */
function showUploadKcsj(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWebKcsj.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.jw.EduGrStuPractice&fieldName="+fieldName;
	web.ajax(basePath + '/edu/jw/eduGrStuPractice/findSjkcRwsInfo.ajax', {
		spNo : pkValue,
		userId : userId
	}, true, function(r) {
		if(r.state == 0){
			if(r.value=="0"){
				messageDialogShow('提示',"没有阅读任务书，不能上传相关附件！","2");
				return;
			}else if(r.param.flag == false){
				messageDialogShow('提示',"请按辅导教师要求完成实践性教学环节,"+ r.param.jutiday+" 之后上传考查实践报告","2");
				return;
			}
			layer.open({
				type: 2,
				title: '选择附件',
				shadeClose: true,
				scrollbar: false,
				shade: 0.4,
				area: ['750px', '350px'],
				content:url,  //iframe的url
				end: function(res){
					loadWodekaochake('wodekaochake');
				}
			});
		}else{
			messageDialogShow('提示',r.msgInfo,"2");
		}
	});
}

/**
 * 我的学籍异动申请-上传附件
 */
function showUploadSca(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.EduRidTest&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  scrollbar: false,
		  content:url,  //iframe的url
		  end: function(res){
			  // loadSchoolChange1('school_change',userId,'');
			  loadSchoolChange('school_change');
		  }
	});
}

/**
 * 论文查重上传附件
 */
function showCheckPaperUploadAtt(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.EduRidTest&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  content:url,  //iframe的url
		  end: function(res){
			  loadLunwenchachong('lunwenchachong');
		  }
	});
}

/**
 *  优秀学生和优秀毕业生- 上传附件
 */
function showAppraisUploadAtt(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.EduRidTest&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  content:url,
		  end: function(res){
			  loadYxbys("yxbys");
		  }
	});
}

/**
 * 我的学位申请-上传附件
 */
function uploadeduGrDegreeApplyFile(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+$('#fjPkVal').val();
	layer.open({
		type: 2,
		title: '选择附件',
		shadeClose: true,
		shade: 0.4,
		area: ['750px', '350px'],
		content:url,  //iframe的url
		end: function(res){
			$('#main_content').empty();
			loadWaittingMask('gerenzhongxin');
			loadWdxwsq('wdxwsq');
		}
	});
}

function uploadeduGrDegreeApplyFiles(attachId,pkValue,attachNum){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue;
	layer.open({
		type: 2,
		title: '选择附件',
		shadeClose: true,
		shade: 0.4,
		area: ['750px', '350px'],
		content:url,  //iframe的url
		end: function(res){
			$('#main_content').empty();
			loadWaittingMask('gerenzhongxin');
			loadWdxwsq('wdxwsq');
		}
	});
}

/**
 * 学籍异动,附件查看
 */
function loadChangeImgForLook(scaNo,obj){
	var attachId="eduStuinfoChangeApp";
	var state  = $(obj).parent().next().text();
	var url=basePath+'web/edu/modal/uploadAttachView.jsp?attachId='+attachId+"&pkValue="+scaNo+"&state="+encodeURI(encodeURI(state));
	layer.open({
		type: 2,
		title: '附件查看',
		shadeClose: true,
		shade: 0.6,
		area: ['800px', '580px'],
		content:url
	});
}

/**
 * 附件上传
 */
function showUpload(attachId,pkValue,fieldName){
	var url=basePath+'web/edu/modal/uploadAttach.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.jw.EduGdDesign&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  shade: 0.8,
		  area: ['750px', '350px'],
		  content:url,  //iframe的url
		  done: function(res){
		        //上传完毕回调
			  loadGraduationInformation('graduationInformation');
		  },error: function(){
		        //请求异常回调
			  loadGraduationInformation('graduationInformation');
		  }
		});
}

/**
 * 毕设附件上传
 */
function showUploadGd(attachId,pkValue,fieldName, typ, isCheck){
	var flag = true;
	//附加终止校验：开启限定，学生必须在系统上存在自主查重且查重通过的记录
	if (isCheck != undefined && isCheck == "CK") {
		web.ajax(basePath+'jw/eduGdCheckPaper/checkPaperNum.ajax',{pkValue:pkValue},false,function(r){
			if (r.flag == "1") {
				messageInfoShow("提示", r.msg);
				flag = false;
			}
		});
		if(!flag){
			return;
		}
	}
	
	var result = web.ajax(basePath+'edu/jw/eduGdDesign/checkGdPaperDate.ajax',{pkValue:pkValue},false);
	if(result.state != 0){
		messageInfoShow("提示", result.msg);
		flag = false;
	}
	if(!flag){
		return;
	}
	
	if (flag) {
		var url=basePath+'web/edu/modal/uploadAttachGd.jsp?attachId='+attachId+"&typ="+ typ +"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.jw.EduGdDesign&fieldName="+fieldName;
		layer.open({
			type: 2,
			title: '选择附件',
			shadeClose: true,
			shade: 0.8,
			scrollbar: false,
			area: ['750px', '350px'],
			content:url,  //iframe的url
			done: function(res){
				//上传完毕回调
				loadGraduationInformation('graduationInformation');
			},error: function(){
				//请求异常回调
				loadGraduationInformation('graduationInformation');
			}
		});
	}
}

/**
 * 毕设初稿附件上传
 */
function showUploadGdCg(attachId,pkValue,fieldName, typ, isCheck){
	var flag = true;
	//附加终止校验：开启限定，学生必须在系统上存在自主查重且查重通过的记录
	if (isCheck != undefined && isCheck == "CK") {
		web.ajax(basePath+'jw/eduGdCheckPaper/checkPaperNum.ajax',{pkValue:pkValue},false,function(r){
			if (r.flag == "1") {
				messageInfoShow("提示", r.msg);
				flag = false;
			}
		});
		if(!flag){
			return;
		}
	}
	//学生端日期校验
	var result = web.ajax(basePath+'edu/jw/eduGdDesign/checkGdPaperDate.ajax',{pkValue:pkValue},false);
	if(result.state != 0){
		messageInfoShow("提示", result.msg);
		flag = false;
	}
	if(!flag){
		return;
	}
	
	//是否开启了互动校验
	web.ajax(basePath+'edu/jw/eduGdDesign/interactCheck.ajax',{pkValue:pkValue},false,function(r){
		if (r.flag == "1") {
			messageInfoShow("提示", r.msg);
			flag = false;
		}
	});
	if(!flag){
		return;
	}
	
	if (flag) {
		var url=basePath+'web/edu/modal/uploadAttachGd.jsp?attachId='+attachId+"&typ="+ typ +"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.jw.EduGdDesign&fieldName="+fieldName;
		layer.open({
			type: 2,
			title: '选择附件',
			shadeClose: true,
			scrollbar: false,
			shade: 0.8,
			area: ['750px', '350px'],
			content:url,  //iframe的url
			done: function(res){
				//上传完毕回调
				loadGraduationInformation('graduationInformation');
			},error: function(){
				//请求异常回调
				loadGraduationInformation('graduationInformation');
			}
		});
	}
}


/**
 * 附件下载
 */
function downloadFile(id,infoNo,type){
	var attachId = 'eduGdDesign';
	if("1" == type){
		attachId = 'eduStudentApply';
	}else if("2" == type){
		attachId = 'eduRidTest';
	}else if("3" == type){
		attachId = 'eduStuinfoChangeApp';
	}else if("4" == type){
		attachId = 'eduGrStuPractice';
	}
	web.ajax(basePath+'attach/attachInfo/attachList.ajax',{pkValue:id,attachId:attachId},true,function(data){
		for(var i=0;i<data.length;i++){
			if(infoNo==data[i].id){
				web.downloadAttachment([data[i]]);
			}
		}
	});
}

//论文附件下载
function downloadFileLunwen(id,infoNo,type){
	var attachId = 'eduGdDesign';
	web.ajax(basePath+'attach/attachInfo/attachListNew.ajax',{pkValue:infoNo,attachId:attachId},true,function(data){
		if (data.length > 0) {
			web.downloadAttachment([data[0]]);
		}
	});
}

/**
 * 
 */
function uploadCallback(attachInfoNo,entityName,fieldName,pkValue,fileName){
	if("PROOF_ATTACH" == fieldName){
		var id = 'wodemiankaoshenq';
		web.ajax(basePath+'edu/eduRidTest/addAttach.ajax',{attachInfoNo:attachInfoNo,pkValue:pkValue,fieldName:fieldName},true,function(r){
			if(r.state==SUCCESS){
				layer.closeAll();
				messageDialogShow('提示',r.msgInfo);
				loadWodemiankaoshenq1('wodemiankaoshenq','');
			}else{
				loadWodemiankaoshenq1('wodemiankaoshenq','');
				messageDialogShow('提示',r.msgInfo,2);
			}
		});
	}else if("GR_PRACTICE_ATTACH" == fieldName ){
		var id = 'school_change';
		web.ajax(basePath+'edu/jw/eduGrStuPractice/addAttach.ajax',{attachInfoNo:attachInfoNo,pkValue:pkValue,fieldName:fieldName},true,function(r){
			if(r.state==SUCCESS){
				layer.closeAll();
				messageDialogShow('提示',r.msgInfo);
				loadwodebiyeshijian1(id);
			}else{
				loadwodebiyeshijian1(id);
				messageDialogShow('提示',r.msgInfo,2);
			}
		});
	}else if("STUINFO_CHANGE_ATTACH" == fieldName ){
		var id = 'school_change';
		web.ajax(basePath+'edu/eduStuinfoChangeApp/addAttach.ajax',{attachInfoNo:attachInfoNo,pkValue:pkValue,fieldName:fieldName},true,function(r){
			if(r.state==SUCCESS){
				layer.closeAll();
				messageDialogShow('提示',r.msgInfo);
				loadSchoolChange(id);
			}else{
				loadSchoolChange(id);
				messageDialogShow('提示',r.msgInfo,2);
			}
		});
	}else{
		var id = 'graduationInformation';
		web.ajax(basePath+'edu/jw/eduGdDesign/addAttach.ajax',{attachInfoNo:attachInfoNo,pkValue:pkValue,fieldName:fieldName},true,function(r){
			if(r.state==SUCCESS){
				layer.closeAll();
				messageDialogShow('提示',r.msgInfo);
				loadGraduationInformation(id);
			}else{
				loadGraduationInformation(id);
				messageDialogShow('提示',r.msgInfo,2);
			}
		});
	}
	
}

/**
 * 加载我的消息
 */
function loadMyMessage(id){
	$('#' + id + '-tmpl').tmpl().appendTo('#main_content');
	loadUnReadMessage();
}

/**
 * 加载我的未读消息
 */
function loadUnReadMessage(){
	messageTab=1;
	var id="myMessage";
	web.ajax(basePath+'edu/eduStuMessage/findUnReadMessage.ajax',{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '1-tmpl').empty();
		if(r.flag){
			$("#allBtn").removeClass().addClass("btn btn-primary btn-search-hover");
			$("#readedBtn").removeClass().addClass("btn btn-primary btn-search-hover");
			$("#unReadedBtn").removeClass().addClass("btn");
			$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
			msg_site();
		}else{
			return;
		}
	});
	web.ajax(basePath+'edu/eduStuMessage/CheckMessageCount.ajax',{userid:userId},true,function(r){
		if(r.flag==true){
			$("#messageUnreadCount").html(r.count);
		}else{
			return;
		}
	});
}

/**
 * 加载我的已读消息
 */
function loadReadedMessage(){
	messageTab=2;
	var id="myMessage";
	web.ajax(basePath+'edu/eduStuMessage/findReadMessage.ajax',{userid:userId},true,function(r){
		$('#' + id + '1-tmpl').empty();
		if(r.flag){
			$("#allBtn").removeClass().addClass("btn btn-primary btn-search-hover");
			$("#unReadedBtn").removeClass().addClass("btn btn-primary btn-search-hover");
			$("#readedBtn").removeClass().addClass("btn");
			$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
			msg_site();
		}else{
			return;
		}
	});
}

/**
 * 加载我的全部消息
 */
function loadAllMessage(){
	messageTab=0;
	var id="myMessage";
	web.ajax(basePath+'edu/eduStuMessage/findMessage.ajax',{userid:userId},true,function(r){
		$('#' + id + '1-tmpl').empty();
		if(r.flag){
			$("#readedBtn").removeClass().addClass("btn btn-primary btn-search-hover");
			$("#unReadedBtn").removeClass().addClass("btn btn-primary btn-search-hover");
			$("#allBtn").removeClass().addClass("btn");
			$('#' + id + '2-tmpl').tmpl(r).appendTo('#' + id + '1-tmpl');
			msg_site();
		}else{
			return;
		}
	});
}

/**
 * 设置已读
 */
function readMessage(smNo,modal){
	web.ajax(basePath+'edu/eduStuMessage/readMessage.ajax',{smNo:smNo},true,function(r){
		if(r.state=='0'){
			if(messageTab==0){
				loadAllMessage();
			}else if(messageTab==1){
				loadUnReadMessage();
			}
		}else{
			messageDialogShow('错误',r.msgInfo,2);
			return;
		}
	});
	web.ajax(basePath+'edu/eduStuMessage/CheckMessageCount.ajax',{userid:userId},true,function(r){
		if(r.flag==true){
			$("#messageUnreadCount").html(r.count);
		}else{
			return;
		}
	});
}

function readMsg(smNo){
	web.ajax(basePath+'edu/eduStuMessage/readMsg.ajax',{smNo:smNo},true,function(r){
		if(r.state=='0'){
			$('#dialogmodaltitle1').html("<h4 class='modal-title' id='dialogmodaltitle1'>消息</h4>");
			$('#majorInfo').html("<textarea rows='20' cols='50' readonly='readonly' id='titleInfo'>"+r.msgInfo+"</textarea>");
			$('#specimodal').modal('show');
			if(messageTab==0){
				loadAllMessage();
			}else if(messageTab==1){
				loadUnReadMessage();
			}
			web.ajax(basePath+'edu/eduStuMessage/CheckMessageCount.ajax',{userid:userId},true,function(r){
				if(r.flag==true){
					$("#messageUnreadCount").html(r.count);
				}else{
					return;
				}
			});
		}else{
			messageDialogShow('错误',r.msgInfo,2);
			return;
		}
	});
}

/**
 * 全部设置已读
 */
function readAllMessage(){
	web.ajax(basePath+'edu/eduStuMessage/readAllMessage.ajax',{userId:userId},true,function(r){
		if(r.state=='0'){
			if(messageTab==0){
				loadAllMessage();
			}else if(messageTab==1){
				loadUnReadMessage();
			}else{
				loadReadedMessage();
			}
			web.ajax(basePath+'edu/eduStuMessage/CheckMessageCount.ajax',{userid:userId},true,function(r){
				if(r.flag==true){
					$("#messageUnreadCount").html(r.count);
				}else{
					return;
				}
			});
		}else{
			messageDialogShow('错误',r.msgInfo,2);
			return;
		}
	});
}

/**
 * 查看模块（我的消息）
 */
function goToModal(url){
	if (url) {
		window.open(basePath + url);
	} else {
		messageDialogShow("提示", "跳转页面失败！",2);
	}
}

/**
 * 网络学习
 */
function loadWLXX(id){
	$('#' + id +'-tmpl').tmpl().appendTo('#main_content');
	removeWaittingMask();
}

/**
 * 加载我的咨询主页面
 */
function loadWdzx(id){
	$('#main_content').empty();
	var s = web.ajax(basePath+"/edu/myConsult/findConsultType.ajax",{userid:userId},false);
	$('#' + id +'-tmpl').tmpl(s).appendTo('#main_content');
	loadWdzx1(id);
}

/**
 * 新建我的咨询
 */
function createMyzixun(){
	$('#consultType').val('');
	$('#content').val('');
	$('#content').html('');
	$('#content').text('');
	$('#myModal').modal('show');
}

/**
 * 我的咨询列表;
 */
function loadWdzx1(id){
	$('#' + id +'1-tmpl').empty();
	var zxleibie = $('#zxleibie').val() || '';
	var zxkeyword = $('#zxkeyword').val() || '';
	var r = web.ajax(basePath+"/edu/myConsult/myConsult.ajax",{userid:userId,zxkeyword:zxkeyword,zxleibie:zxleibie},false);
	removeWaittingMask();
	$('#' + id +'2-tmpl').tmpl(r).appendTo('#' + id +'1-tmpl');
	msg_site();
}

/**
 * 查询我的咨询
 */
function queryMyZixun(){
	loadWdzx1("wdzx");
}

/**
 * 提交我的咨询
 */
function submitConsult(){
	var data = $('#submitConsult').serializeJson();
	if(data.consultType == "" || data.content == ""){
		messageDialogShow('提示', "未填咨询内容,");
		return;
	}
	data.netNum=userId;
	data.state='00';
	web.ajax(basePath + 'edu/myConsult/saveConsult.ajax', {param : JSON.stringify(data)}, true, function(r) {
		$('#myModal').modal('hide');
		messageDialogShow('提示', r.flag);
		loadWdzx1("wdzx");
	});
}

/**
 * 复选框  全选 or 取消全选
 */
function checkboxToSelecAllOrCanlSelectAll(){
	if($("#checkboxToAllToDelete").prop("checked") == true){
        $("input[name='checkbox']:checkbox").prop("checked",true);
        showOrHiddenButton();
    }else{
        $("input[name='checkbox']:checkbox").prop("checked",false);
        showOrHiddenButton();
    }
}

/**
 * 我的选课中 单击复选框事件
 */
function showOrHiddenButton(){
	if($("input[name='checkbox']:checked").length > 0){
		$('tfoot').show();
	}else{
		$('tfoot').hide();
	}
}

/**
 *我的学习管理 ----我的选课----退选     批量退选选中课程 
 */
function cancelCourToCanlAll(){
	var cancelSelectButtons = $("input[name='checkbox']:checked");
	if(cancelSelectButtons.length > 0){
		for ( var i = 0; i < cancelSelectButtons.length; i++) {
			cancelSelectButtons.eq(i).parent().parent().parent().find('button').click();
		}
		$('tfoot').hide();
	}
}
/**
 * 我的学习管理 ----我的选课----选课    批量选课选中课程
 */
function selectCourToSelectAll(){
	var selectButtons = $("input[name='checkbox']:checked");
	if(selectButtons.length > 0){
		for ( var i = 0; i < selectButtons.length; i++) {
			selectButtons.eq(i).parent().parent().parent().find('button').click();
		}
		$('tfoot').hide();
		//$('#curricula_variable1-tmpl').empty();
		//loadStuSelectTable();
	}
}

/**
 * 
 */
function woyaojiaofei(){
	alert('待开发,请耐心等待!');
}

/**
 * 
 */
function getLiveInfo(id){
	loadCourZhibo(id);
}

/**
 * 
 */
function loadCourZhibo(pageNo){
	var pageSize=6;
	var fls = flashChecker();
	var s = "";
	$('#main_content').empty();
	if(!fls.f) {
		$("#flashCheck").show();
	}else{
		$("#flashCheck").hide();
	}
	web.ajax(basePath+"/web/live/findByPageNo.ajax",{pageNo:pageNo,pageSize:pageSize},true,function(message){
		removeWaittingMask();
		$('#courzhibo-tmpl').tmpl(message).appendTo('#main_content');
		var total = message.total;
		if(message.flag && total > 0){
			livePage.pageNo = pageNo;
			livePage.totalSize = total;
			livePage.totalPage =  Math.ceil(total / pageSize); 
			$("#livePage").paging(livePage);
		}
	})
}

/**
 * 
 */
function goWatchPage(div){
	var url=div.getAttribute("value");
	window.open(basePath+'web/courseroom.htm'+url);
}

/**
 * 
 */
function showOldClassName(){
	var oldClass=$("#oldClass").val();
	$("#oldClass").attr('title',oldClass);
}

/**
 * 选择城市
 * @param code
 * @returns {Boolean}
 */
function chooseCity(){
	$("#city").empty();
	var province = $("#province").val();
	$("#city").append("<option value=''>请选择城市</option>");
	for(var j = 1; j < cityArr[province].length; j++) {
		$("#city").append(
				"<option value='" + cityArr[province][j] + "'>" + cityArr[province][j]
						+ "</option>");
	}
}

/**
 * 截取毕业学校代码
 * 
 */
function chooseGraduationNum(){
	$("#graduateSchoolCode").empty();
	var graduationNum = $("#graduationNum").val()||"";
	var graduateSchoolCode="";
	var regex = /^[0-9]{5,}$/;
	if(graduationNum!=""&&regex.test(graduationNum)>0){
		graduateSchoolCode = graduationNum.substring(0,5);
	}
	$("#graduateSchoolCode").val(graduateSchoolCode);
}

/**
 * 缴费按钮
 */
function payForFee(stuId){
//	window.open(basePath+'web/xfdd.htm?stuId='+stuId);
	window.open(basePath+'web/xxhd.htm?stuId='+stuId);
}

/**
 * 
 */
function flashChecker() {
	var hasFlash = 0; //是否安装了flash
	var flashVersion = 0; //flash版本
	if (document.all) {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if (swf) {
			hasFlash = 1;
			VSwf = swf.GetVariable("$version");
			flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
		}
	} else {
		if (navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if (swf) {
				hasFlash = 1;
				var words = swf.description.split(" ");
				for (var i = 0; i < words.length; ++i) {
					if (isNaN(parseInt(words[i]))) continue;
					flashVersion = parseInt(words[i]);
				}
			}
		}
	}
	return {
		f : hasFlash,
		v : flashVersion
	};
}

function setButton(obj) {
	if (MAX_SECOND == 0) {
		obj.removeAttr("disabled");
		obj.html("获取验证码");
		MAX_SECOND = 120;
		clearInterval(interval);
	} else {
		obj.attr("disabled", true);
		obj.html("重新发送(" + MAX_SECOND + ")");
		MAX_SECOND--;
	}
}

/**
 * 
 */
function sendMessage() {
	curCount = count;
	var dealType;
	var uid = $("#uid").val();
	if ($("#phone").attr("checked") == true) {
		dealType = "phone";
	} else {
		dealType = "email";
	}

	for (var i = 0; i < codeLength; i++) {
		code += parseInt(Math.random() * 9).toString();
	}
	//设置button效果，开始计时
	$("#btnSendCode").attr("disabled", "true");
	$("#btnSendCode").val(+curCount + "秒后再次获取");
	InterValObj = window.setInterval(SetRemainTime, 1000);
	//向后台发送处理数据
	$.ajax({
		type : "POST",
		dataType : "text",
		url : 'Login.ashx',
		data : "dealType=" + dealType + "&uid=" + uid + "&code=" + code,
		error : function(XMLHttpRequest, textStatus, errorThrown) {},
		success : function(msg) {}
	});
}

/**
 * timer处理函数
 */
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);
		$("#btnSendCode").removeAttr("disabled");
		$("#btnSendCode").val("重新发送验证码");
		$("#btn_save").button('reset');
		code = "";  
	}
	else {
		curCount--;
		$("#btnSendCode").val( + curCount + "秒后再次获取");
	}
}

/**
 * 报名页面的身份证读取
 */
function readCardOnclick() {
    var CVR_IDCard = document.getElementById("CVR_IDCard");
    try{
        var strReadResult = CVR_IDCard.ReadCard();
		if(strReadResult == "0")
		{
			$("#stuName").val(CVR_IDCard.Name);
			$("#sex").find("option").each(function(){
				  if($(this).text()==CVR_IDCard.Sex){
					 $("#sex").val($(this).val());
				  }
			  });
			
			$("#idcardtype").val("01");
			$("#ethnic").find("option").each(function(){
				  if($(this).text()==CVR_IDCard.Nation+"族"){
					  $("#ethnic").val($(this).val());
				  }
			  });
			$("#idCard").val(CVR_IDCard.CardNo);
			  calBirthdayFromIDCard(CVR_IDCard.CardNo);
			  $("#photoImgA").attr("src",'data:image/jpeg;base64,'+CVR_IDCard.Picture);
			  $("#photo").val(CVR_IDCard.Picture);
			  //photoFormBase64(CVR_IDCard.Picture,CVR_IDCard.CardNo);
			var code=trim(CVR_IDCard.CardNo);
			IdentityCodeValid(code);
			$("#address").val(CVR_IDCard.Address);
          }
          else
          {
        	messageDialogShow('提示', strReadResult+"请通过上传身份证复印件进行校验。");
          }
    }catch(e){
    	messageDialogShow('提示', "无法读取身份证信息，请确认设备是否正常工作！");
    }			
}

/**
 * 
 */
function calBirthdayFromIDCard(idCardNo) {
    var str="";
    var y;
    if (idCardNo.length == 15) {
        var y = idCardNo.substring(6, 8);
        if (y >= "40"){
            y = "19" + y;
        }else{
            y = "20" + y;
        }
        str = y + "-" + idCardNo.substring(8, 10) + "-" + idCardNo.substring(10, 12);
    } else if (idCardNo.length == 18){
        str = idCardNo.substring(6, 10) + "-" + idCardNo.substring(10, 12) + "-" + idCardNo.substring(12, 14);
    }else{
    	return;
    }
    if (str!=""){
        $("#birthday").val(str);
        return false;
    } 
    $("#birthday").val("");
}

/**
 * 附件列表查看
 * @param pkValue
 * @param attachId
 * @param attachNum
 */
function showattachmenglist(pkValue,attachId,attachNum){
	if(attachNum != 0){
		var url=basePath+'aweto/pages/base/attachListWeb.jsp?attachId='+attachId+"&pkValue="+pkValue;
		layer.open({
			  type: 2,
			  title: '附件列表',
			  shadeClose: true,
			  shade: 0.4,
			  area: ['750px', '350px'],
			  content:url,
			  end: function(res){
				  if('eduStuinfoChangeApp' == attachId){
					  loadSchoolChange1('school_change',userId,'');
				  }else if (attachId.indexOf("eduRidTest")!=-1){
					  loadWodemiankaoshenq1('wodemiankaoshenq','');
				  }else if ('eduGrDegreeApply' == attachId || "eduStuDegreeDefense" == attachId || "eduStuDegreeDefenseFlw" == attachId){
					  $('#main_content').empty();
					  loadWaittingMask('gerenzhongxin');
					  loadWdxwsq('wdxwsq');
				  }else if('eduStuApprais' == attachId){
					  loadYxbys("yxbys");
				  }else if('eduGdStuTitleZz' == attachId){
					  loadgraduationProject3();
				  }else if('eduGrStuPractice' == attachId){
					  loadwodebiyeshijian('wodebiyeshijian');
				  }
			  }
		});
	}else{
		messageDialogShow('提示', "暂无附件!");
	}
}
/**
 * 附件列表查看
 * @param pkValue
 * @param attachId
 * @param attachNum
 */
function showattachmenglistKc(pkValue,attachId,attachNum){
	if(attachNum != 0){
		var url=basePath+'aweto/pages/base/attachListWeb.jsp?attachId='+attachId+"&pkValue="+pkValue;
		layer.open({
			type: 2,
			title: '附件列表',
			shadeClose: true,
			shade: 0.4,
			area: ['750px', '350px'],
			content:url,
			end: function(res){
				if('eduGrStuPractice' == attachId){
					loadWodekaochake('wodekaochake');
				}
			}
		});
	}else{
		messageDialogShow('提示', "暂无附件!");
	}
}

/**
 * 附件列表查看
 * @param pkValue
 * @param attachId
 * @param attachNum
 */
function showattachmenglistND(pkValue,attachId,attachNum){
	if(attachNum != 0){
		var url=basePath+'aweto/pages/base/attachListWebND.jsp?attachId='+attachId+"&pkValue="+pkValue;
		layer.open({
			  type: 2,
			  title: '附件列表',
			  shadeClose: true,
			  shade: 0.4,
			  area: ['750px', '350px'],
			  content:url,
			  end: function(res){
				  if('eduStuinfoChangeApp' == attachId){
					  loadSchoolChange1('school_change',userId,'');
				  }else if (attachId.indexOf("eduRidTest")!=-1){
					  loadWodemiankaoshenq1('wodemiankaoshenq','');
				  }else if ('eduGrDegreeApply' == attachId){
					  $('#main_content').empty();
					  loadWaittingMask('gerenzhongxin');
					  loadWdxwsq('wdxwsq');
				  }else if('eduStuApprais' == attachId){
					  loadYxbys("yxbys");
				  }else if('eduGdStuTitleZz' == attachId){
					  loadgraduationProject3();
				  }else if('eduGrStuPractice' == attachId){
					  loadwodebiyeshijian('wodebiyeshijian');
				  }
			  }
		});
	}else{
		messageDialogShow('提示', "暂无附件!");
	}
}
/**
 * 附件列表查看
 * @param pkValue
 * @param attachId
 * @param attachNum
 */
function showattachmenglistKcND(pkValue,attachId,attachNum){
	if(attachNum != 0){
		var url=basePath+'aweto/pages/base/attachListWebND.jsp?attachId='+attachId+"&pkValue="+pkValue;
		layer.open({
			type: 2,
			title: '附件列表',
			shadeClose: true,
			shade: 0.4,
			area: ['750px', '350px'],
			content:url,
			end: function(res){
				if('eduGrStuPractice' == attachId){
					loadWodekaochake('wodekaochake');
				}
			}
		});
	}else{
		messageDialogShow('提示', "暂无附件!");
	}
}

/**
 * 论文查重查看
 * @param pkValue
 * @param attachId
 * @param attachNum
 */
function showCheckPaperlist(pkValue,attachId,attachNum, state){
	if(attachNum != 0){
		var url=basePath+'aweto/pages/base/attachListWebCheckPaper.jsp?attachId='+attachId+"&pkValue="+pkValue+"&state="+state;
		layer.open({
			  type: 2,
			  title: '附件列表',
			  shadeClose: true,
			  shade: 0.4,
			  area: ['750px', '350px'],
			  content:url,
			  end: function(res){
				  if('eduGdCheckPaper' == attachId){
					  loadLunwenchachong('lunwenchachong');
				  }
			  }
		});
	}else{
		messageDialogShow('提示', "暂无附件!");
	}
}


/**
 * 网络统考免考记录
 * @param id
 * @param userId
 */
function loadgeneralexamexemp(id){
	$('#main_content').empty();
	web.ajax(basePath+"jw/generalExamExemp/findStuGeneralExamExemp.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}

/**
 * 学位外语免考记录
 * @param id
 * @param userId
 */
function loaddegreeforeignexemp(id){
    $('#main_content').empty();
	web.ajax(basePath+"jw/generalExamExemp/findStuDegreeForeignExemp.ajax",{userid:userId},true,function(r){
        $('#main_content').empty();
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
	});
}

/**
 * 网络统考免考申请
 */
function applyGeneralExamExemp(){
	$(".msg_change").css("height",$(window).height()-280);
	web.ajax(basePath + "jw/generalExamExemp/findStuGeneralExamExempInfo.ajax", {
		userId : userId
	}, false, function(r) {
		if (r.flag == "0") {
			$("#stuId").val(r.stuId);
			$("#stuName").val(r.stuName);
			$("#geeNo").val("");
			$("#courType").val("");
			$("#applyReason").val("");
			$("#courType").removeAttr("disabled");
			$("#applyReason").removeAttr("disabled");
			$("#saveGeneralExamExempBtn").show();
			$('#generalExamExempModal').modal('show');
		} else {
			layer.alert(r.msg,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
		}
	});
}

function lookGeneralExamExemp(geeNo){
	$(".msg_change").css("height",$(window).height()-280);
	web.ajax(basePath + "jw/generalExamExemp/findStuGeneralExamExempInfo.ajax", {
		userId : userId, geeNo : geeNo
	}, false, function(r) {
		if (r.flag == "0") {
			$("#stuId").val(r.stuId);
			$("#stuName").val(r.stuName);
			$("#geeNo").val(r.geeNo);
			$("#courType").val(r.courType);
			$("#applyReason").val(r.applyReason);
			$("#courType").attr("disabled", "true");
			$("#applyReason").attr("disabled", "true");
			if (r.state == "00" || r.state == "02") {
				$("#saveGeneralExamExempBtn").show();
			} else {
				$("#saveGeneralExamExempBtn").hide();
			}
			$('#generalExamExempModal').modal('show');
		} else {
			layer.alert(r.msg,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
		}
	});
}

function updateGeneralExamExemp(geeNo) {
	$(".msg_change").css("height",$(window).height()-280);
	web.ajax(basePath + "jw/generalExamExemp/findStuGeneralExamExempInfo.ajax", {
		userId : userId, geeNo : geeNo
	}, false, function(r) {
		if (r.flag == "0") {
			$("#stuId").val(r.stuId);
			$("#stuName").val(r.stuName);
			$("#geeNo").val(r.geeNo);
			$("#courType").val(r.courType);
			$("#applyReason").val(r.applyReason);
			$("#courType").removeAttr("disabled");
			$("#applyReason").removeAttr("disabled");
			if (r.state == "00" || r.state == "02") {
				$("#saveGeneralExamExempBtn").show();
			} else {
				$("#saveGeneralExamExempBtn").hide();
			}
			$('#generalExamExempModal').modal('show');
		} else {
			layer.alert(r.msg,{
				title:'提示',
				icon: 7,
				skin: 'layui-layer-rim',
				shadeClose : false,
				closeBtn :0
			});
		}
	});
}

function saveGeneralExamExempBtn(){
	layer.confirm('确认是否保存?', function(index){
		layer.close(index);
		web.ajax(basePath+"jw/generalExamExemp/addOrUpdateGeneralExamExemp.ajax",{
			geeNo:$("#geeNo").val(), userId:userId, stuId:$("#stuId").val(), courType:$("#courType").val(),
			applyReason:$("#applyReason").val()
			},true,function(r){
			if (r.state == "0") {
				$('#generalExamExempModal').modal('hide');
				var timer1=window.setTimeout(function (){
					loadgeneralexamexemp('generalexamexemp');
					window.clearTimeout(timer1);
	            },500);
			} else {
				layer.alert(r.msgInfo,{
					title:'提示',
					icon: 7,
					skin: 'layui-layer-rim',
					shadeClose : false,
					closeBtn :0
				});
			}
		});
	});
}


function deleteGeneralExamExemp(geeNo) {
	layer.confirm('确认是否删除?', function(index){
		layer.close(index);
		web.ajax(basePath+"jw/generalExamExemp/deleteGeneralExamExemp.ajax",{geeNo:geeNo},true,function(r){
			if (r.state == "0") {
				loadgeneralexamexemp('generalexamexemp');
			} else {
				layer.alert(r.msgInfo,{
					title:'提示',
					icon: 7,
					skin: 'layui-layer-rim',
					shadeClose : false,
					closeBtn :0
				});
			}
		});
	});
}

function submitGeneralExamExemp(geeNo) {
	layer.confirm('确认是否提交申请?', function(index){
		layer.close(index);
		web.ajax(basePath+"jw/generalExamExemp/submitGeneralExamExemp.ajax",{geeNo:geeNo},true,function(r){
			if (r.state == "0") {
				loadgeneralexamexemp('generalexamexemp');
			} else {
				layer.alert(r.msgInfo,{
					title:'提示',
					icon: 7,
					skin: 'layui-layer-rim',
					shadeClose : false,
					closeBtn :0
				});
			}
		});
	});
}

/**
 * 网络统考免修查看
 * @param pkValue
 * @param attachId
 * @param attachNum
 */
function showGeneralExamExemplist(pkValue,attachId,attachNum, state){
	if(attachNum != 0){
		var url=basePath+'aweto/pages/base/attachListWebCheckPaper.jsp?attachId='+attachId+"&pkValue="+pkValue+"&state="+state;
		layer.open({
			  type: 2,
			  title: '附件列表',
			  shadeClose: true,
			  shade: 0.4,
			  area: ['750px', '350px'],
			  content:url,
			  end: function(res){
				  if('generalexamexemp' == attachId){
					  loadgeneralexamexemp('generalexamexemp');
				  }
			  }
		});
	}else{
		layer.alert("暂无附件",{
			title:'提示',
			icon: 7,
			skin: 'layui-layer-rim',
			shadeClose : false,
			closeBtn :0
		});
	}
}

/**
 * 网络统考免修上传附件
 */
function showGeneralExamexempUploadAtt(attachId,pkValue,fieldName){
	var url=basePath+'aweto/pages/base/uploadWeb.jsp?attachId='+attachId+"&pkValue="+pkValue+"&entityName=org.aweto.edu.entity.EduRidTest&fieldName="+fieldName;
	layer.open({
		  type: 2,
		  title: '选择附件',
		  shadeClose: true,
		  scrollbar: false,
		  shade: 0.4,
		  area: ['750px', '350px'],
		  content:url,  //iframe的url
		  end: function(res){
			  loadgeneralexamexemp('generalexamexemp');
		  }
	});
}


function showGeneralExamProcess(geeNo) {
	var raqName="html_ReportOprInfo";
	var param="raq=html/"+raqName+"&needPrint=no&pam=pro_id='generalExamExemp' and a.opr_recode_no="+geeNo;
	var src = reportPath()+"aweto/plugins/runqian/view/showReport.jsp?"+param.replace(/ and /g,"@a@");	
	layer.open({
		area:['900px','550px'],
		title:'操作记录',
		content:'<iframe  id="kstzsIframe" src="'+ src +'" frameborder="0" style="width:100%; height:400px; margin:0 auto;padding:0;"></iframe>'
	});
	
}

/**
 * 学分银行转网络
 * @param id
 * @param userId
 */
function loadxfyhzwl(id){
	$('#main_content').empty();
	web.ajax(basePath+"edu/jw/studentApply/xfyhTowl.ajax",{userid:userId},true,function(r){
		removeWaittingMask();
		$('#' + id + '-tmpl').tmpl(r).appendTo('#main_content');
		if (r.state == '1') {
			
			if (r.eduStudent) {
				$("#sex").val(r.eduStudent.SEX);
				$("#idcardtype").val(r.eduStudent.IDCARDTYPE);
				$("#ethnic").val(r.eduStudent.ETHNIC);
				$("#political").val(r.eduStudent.POLITICAL);
				$("#educationLevel").val(r.eduStudent.EDUCATION_LEVEL);
				$("#occupationalStatus").val(r.eduStudent.OCCUPATIONAL_STATUS);
				$("#province").val(r.eduStudent.PROVINCE);
				$("#oneCardType").val(r.eduStudent.ONE_CARD_TYPE);
				$("#twoCardType").val(r.eduStudent.TWO_CARD_TYPE);
				//照片
				if(!isEmpty(r.eduStudent.PHOTO)){
					$('#photoImgA').attr('src',"http://wljy.whut.edu.cn/"+r.eduStudent.PHOTO);
				}
			}
			
			//当已经提交过
			if (r.bs == "1") {
				$('input,select,textarea', $('#signupForm')).attr('disabled', "disabled");
				$('#smphoto').hide();
				$('#uploadify').hide();
				$('#eduphoto').hide();
				$('#plaphoto').hide();
				if (r.eduStudent) {
					$("#pcNo").val(r.eduStudent.PC_NO);
					$("#ecNo").val(r.eduStudent.EC_NO);
					$("#state").val(r.eduStudent.STATE);
					$("#graduationNum").val(r.eduStudent.GRADUATION_NUM);
					if(!isEmpty(r.eduStudent.PHOTO_FJ)){
						$('#photoImgB').attr('src',"http://wljy.whut.edu.cn/"+r.eduStudent.PHOTO_FJ);
					}
					
					if(!isEmpty(r.eduStudent.EDUCATIONAL_PROOF)){
						$('#photoImgC').attr('src',"http://wljy.whut.edu.cn/"+r.eduStudent.EDUCATIONAL_PROOF);
					}
					
					if(!isEmpty(r.eduStudent.PLACE_PROOF)){
						$('#photoImgD').attr('src',"http://wljy.whut.edu.cn/"+r.eduStudent.PLACE_PROOF);
					}
				}
			}
			
			checkDataValid();
			
			if (r.bs == "0") {
				//学历截图上传事件
				if($("#eduphoto")){
					$("#eduphoto").uploadify({
						'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
						'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
						'auto': true,
						'multi': false,
						'queueID' : 'queue',
						"buttonText": "上传学历截图",
						'fileSizeLimit':'3MB',
						'fileTypeExts': '*.jpg; *.png; *.gif;',
						"buttonClass": "btn btn-primary",
						'overrideEvents': ['onDialogClose'],
						//返回一个错误，选择文件的时候触发  
						'onSelectError': function (file, errorCode, errorMsg) {  
							switch (errorCode) {  
							case -100: 
								messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#eduphoto').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
								return;  
							case -110: 
								messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#eduphoto').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
								return;  
							case -120:  
								messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
								return;  
							case -130:
								messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
								return;  
							}  
						},
						'onUploadSuccess': function (file, data, response) {// 上传成功后执行
							data = JSON.parse(data);
							var path = data.value.replace('//','/').replace('/Liems/','');
							$('#educationalProof').val(path);
							$('#' + file.id).find('.data').html('上传完毕');
							document.getElementById('photoImgC').src = basePath+path;
							$("#educationalProofEmptyImageButton").css("display","block");
						},
						'onFallback': function () {
							//alert('未检测到兼容版本的Flash.');
							messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
						}
					});
					$('#eduphoto-button').css('line-height','normal');
				}
				
				//异地证明材料
				if($("#plaphoto")){
					$("#plaphoto").uploadify({
						'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
						'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
						'auto': true,
						'multi': false,
						'queueID' : 'queue',
						"buttonText": "上传异地证明",
						'fileSizeLimit':'3MB',
						'fileTypeExts': '*.jpg; *.png;',
						"buttonClass": "btn btn-primary",
						'overrideEvents': [ 'onDialogClose'],
						//返回一个错误，选择文件的时候触发  
						'onSelectError': function (file, errorCode, errorMsg) {  
							switch (errorCode) {  
							case -100: 
								messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#plaphoto').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
								return;  
							case -110: 
								messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#plaphoto').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
								return;  
							case -120:  
								messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
								return;  
							case -130:
								messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
								return; 
							}  
						},
						'onUploadSuccess': function (file, data, response) {// 上传成功后执行
							data = JSON.parse(data);
							var path = data.value.replace('//','/').replace('/Liems/','');
							$('#placeProof').val(path);
							$('#' + file.id).find('.data').html('上传完毕');
							document.getElementById('photoImgD').src = basePath+path;
							$("#placeProofEmptyImageButton").css("display","block");
						},
						'onFallback': function () {
							//alert('未检测到兼容版本的Flash.');
							messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
						}
					});
					$('#plaphoto-button').css('line-height','normal');
				}
				
				//毕业证书
				if($("#smphoto")){
					$("#smphoto").uploadify({
						'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
						'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
						'auto': true,
						'multi': false,
						'queueID' : 'queue',
						"buttonText": "上传证书",
						'fileSizeLimit':'3MB',
						'fileTypeExts': '*.jpg; *.png; *.gif;',
						"buttonClass": "btn btn-primary",
						'overrideEvents': ['onDialogClose'],
						//返回一个错误，选择文件的时候触发  
						'onSelectError': function (file, errorCode, errorMsg) {  
							switch (errorCode) {  
							case -100: 
								messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#smphoto').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
								return;  
							case -110: 
								messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#smphoto').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
								return;  
							case -120:  
								messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
								return;  
							case -130:
								messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
								return;  
							}  
						},
						'onUploadSuccess': function (file, data, response) {// 上传成功后执行
							data = JSON.parse(data);
							var path = data.value.replace('//','/').replace('/Liems/','');
							$('#photoFj').val(path);
							$('#' + file.id).find('.data').html('上传完毕');
							document.getElementById('photoImgB').src = basePath+path;
							$("#photoFjEmptyImageButton").css("display","block");
						},
						'onFallback': function () {
							//alert('未检测到兼容版本的Flash.');
							messageDialogShow('提示','未检测到兼容版本的Flash！', 2);
						}
					});
					$('#smphoto-button').css('line-height','normal');
				}
				
				//照片上传事件注册
				if($("#uploadify")){
					$("#uploadify").uploadify({
						'swf': basePath+'web/ui/plugins/uploadify/uploadify.swf',
						'uploader': basePath+"/FileUploadServlet?savePath=studentImg",
						'auto': true,
						'multi': false,
						'queueID' : 'queue',
						'queueSizeLimit':'60',
						'fileSizeLimit':'60K',
						"buttonText": "上传照片",
						'fileTypeExts': '*.jpg; *.png; *.gif;',
						"buttonClass": "btn btn-primary",
						'overrideEvents': ['onDialogClose'],
						'onUploadStart':function(file){
							if(file.size<30*1024){
								messageDialogShow("提示","文件 [" + file.name + "] 大小小于系统限制的30K"+ "大小！", 2);
								return;
							}
							if(file.size>60*1024){
								alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#uploadify').uploadify('settings', 'fileSizeLimit') + "大小！");
								return;
							}
						},
						//返回一个错误，选择文件的时候触发  
						'onSelectError': function (file, errorCode, errorMsg) {  
							switch (errorCode) {  
							case -100:  
								messageDialogShow("提示","上传的文件数量已经超出系统限制的" + $('#uploadify').uploadify('settings', 'queueSizeLimit') + "个文件！", 2);
								return;  
							case -110:  
								messageDialogShow("提示","文件 [" + file.name + "] 大小超出系统限制的" + $('#uploadify').uploadify('settings', 'fileSizeLimit') + "大小！", 2);
								return;  
							case -120:  
								messageDialogShow("提示","文件 [" + file.name + "] 大小异常！", 2);
								return;  
							case -130:  
								messageDialogShow("提示","文件 [" + file.name + "] 类型不正确！", 2);
								return;  
							}
							return false;
						}, 
						
						'onUploadSuccess': function (file, data, response) {// 上传成功后执行
							data = JSON.parse(data);
							var path = data.value.replace('//','/').replace('/Liems/','');
							$('#photo').val(path);
							$('#' + file.id).find('.data').html(' 上传完毕');
							document.getElementById('photoImgA').src = basePath+path;
							$("#photoEmptyImageButton").css("display","block");
						},
						'onFallback': function () {
							messageDialogShow("提示","未检测到兼容版本的Flash.", 2);
						}
					});
					$('#uploadify-button').css('line-height','normal');
				}
			}
			
			// 提交事件注册
			$('#submitSignFormBtn').on('click', function() {
				xfyhTurnWlSubmitFormBtn(this);
			});
		}
	});
}


/**
 * 学分银行转网络提交事件
 */
function xfyhTurnWlSubmitFormBtn(obj) {
	//判断是否选择专升本   需要提交学信网证明材料
	var levelNo = $("#levelNo").val();
	var schoolName=$("#schoolName").val();
	var speciality=$("#speciality").val();
	var graduateDate=$("#graduateDate").val();
	var graduationNum=$("#graduationNum").val();
	var graduateSchoolCode=$("#graduateSchoolCode").val();
	var photoUrl = $("#photo").val();
	var stuCategory = $("#stuCategory").val();
	if("2" == levelNo && "01"==stuCategory){
		if(isEmpty(schoolName)){
			messageInfoShow("提示","毕业学校不能为空");
			return;
		}
		if(isEmpty(speciality)){
			messageInfoShow("提示","毕业专业不能为空");
			return;
		}
		if(isEmpty(graduateDate)){
			messageInfoShow("提示","毕业时间不能为空");
			return;
		}
		if(isEmpty(graduationNum)){
			messageInfoShow("提示","毕业证书编号不能为空");
			return;
		}
		if(isEmpty(graduateSchoolCode)){
			messageInfoShow("提示","毕业学校代码不能为空");
			return;
		}
	}
	//获取招生计划
	var cenPlanNo = $("#cenPlanNo").find("option:selected").val();
	//判断是否是异地
	var idcardtype = trim($("#idcardtype").val());
	var centerNo = $("#centerNo").val();
	var centerPro;
	var provinceYS;
	if("01" == idcardtype){
		var idCard = trim($("#idCard").val());
		//省份
		provinceYS = idCard.substring(0,2);	
	}
	if(!isEmpty(centerNo)){
		web.ajax(basePath + 'edu/eduCenter/findCenterByNo.ajax', {
			centerNo:centerNo
		}, false, function(r) {
			if(provinceYS != r.centerPro&&isEmpty($("#placeProof").val())){
				messageInfoShow("提示","异地报考的同学需提交异地证明材料");
				return;
			}
			var data = $('#signupForm').serializeJson();
			$('#signupForm').bootstrapValidator('validate');
			var flag = $("#signupForm").data("bootstrapValidator").isValid();
			if(flag){
				data.stuName = $("#stuName").val();
				data.idCard = $("#idCard").val();
				data.idcardtype = $("#idcardtype").val();
				data.sex = $("#sex").val();
				data.ethnic = $("#ethnic").val();
				data.political = $("#political").val();
				data.educationLevel = $("#educationLevel").val();
				data.occupationalStatus = $("#occupationalStatus").val();
				data.province = $("#province").val();
				data.oneCardType = $("#oneCardType").val();
				data.twoCardType = $("#twoCardType").val();
				data.stuCategory = $("#stuCategory").val();
				data.levelNo = $("#levelNo").val();
				data.centerNo = $("#centerNo").val();
				data.cenPlanNo = $("#cenPlanNo").val();
				data.cpItemNo = $("#cpItemNo").val();
				data.majorNo = $("#majorNo").val();
				data.pcNo = $("#pcNo").val();
				data.ecNo = $("#ecNo").val();
				$("#signupForm").data('bootstrapValidator').destroy();
				$('#signupForm').data('bootstrapValidator', null);
				checkDataValid();
				layer.confirm('请确认所有信息正确无误，一旦提交，将不能更改，是否确认提交?', 
			            {
			              btn: ['确定','取消'] //按钮
			            }, 
			            function(){
			            	layer.closeAll();
				            web.ajax(basePath + 'edu/jw/studentApply/addStudentXfyhTurnWl.ajax', {
								param : JSON.stringify(data),userid:userId
							}, false, function(r) {
								if (r.state == "0") {
									loadxfyhzwl("xfyhzwl");
								}
								/*$(obj).button('reset');
								messageDialogShow('提示', r.msgInfo);
								$('input,select,textarea', $('#signupForm')).attr('disabled', "disabled");
								$('#saveSignFormBtn').hide();
								$('#submitSignFormBtn').hide();
								$('#smphoto').hide();
								$('#uploadify').hide();
								$("#wybm").delay(100).trigger("click");*/
							});
				            
			            },
			            function(){
			            	layer.closeAll();
			            }
			        );
			} else {
				messageInfoShow("提示", "请检查关键信息填写是否正确！");
			}
		});
	}
}

// 错误弹出提示框
function messageInfoShow(title, content) {
	layer.alert(content,{
		title:title,
		icon: 7,
		skin: 'layui-layer-rim',
		shadeClose : false,
		closeBtn :0
	});
}


// 定义回调函数
function txcallback(res) {
	// 第一个参数传入回调结果，结果如下：
	// ret         Int       验证结果，0：验证成功。2：用户主动关闭验证码。
	// ticket      String    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
	// CaptchaAppId       String    验证码应用ID。
	// bizState    Any       自定义透传参数。
	// randstr     String    本次验证的随机串，后续票据校验时需传递该参数。
	// console.log('callback:', res);


	// res（用户主动关闭验证码）= {ret: 2, ticket: null}
	// res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
	// res（请求验证码发生错误，验证码自动返回terror_前缀的容灾票据） = {ret: 0, ticket: "String", randstr: "String",  errorCode: Number, errorMessage: "String"}
	// 此处代码仅为验证结果的展示示例，真实业务接入，建议基于ticket和errorCode情况做不同的业务处理
	if (res.ret === 0) {
		// 复制结果至剪切板
		// var str = '【randstr】->【' + res.randstr + '】      【ticket】->【' + res.ticket + '】';
		// var ipt = document.createElement('input');
		// ipt.value = str;
		// document.body.appendChild(ipt);
		// ipt.select();
		// document.execCommand("Copy");
		// document.body.removeChild(ipt);
		// alert('1. 返回结果（randstr、ticket）已复制到剪切板，ctrl+v 查看。 2. 打开浏览器控制台，查看完整返回结果。');
		// if(typeof(res.errorCode) == "undefined"){
		if(res.ticket){
			var phonenum = $('#mobile').val();
			web.ajax(basePath + 'jw/eduGdCheckPaper/mobileSendSmstx.ajax',{mobile:phonenum,ticket:res.ticket,randstr:res.randstr},true,function(r) {
				if (r.state != "0") {
					$('#getYzm').removeAttr("disabled");
					messageDialogShow('提示', r.msgInfo);
				} else {
					interval = setInterval(function() {
						setButton($('#getYzm'));
					}, 1000);
				}
			},function(data){
				if(typeof(data.responseJSON)=="undefined"){
					setTimeout(function(){
						messageDialogShow('提示',"网络异常,获取验证码失败！");
						$("#getYzm").removeAttr("disabled");
					},5000);
				}else{
					messageDialogShow('提示',data.responseJSON.error);
					$("#getYzm").removeAttr("disabled");
				}
			});
		}else{
			$('#getYzm').removeAttr("disabled");
			messageDialogShow('提示', res.errorCode+":"+res.errorMessage);
		}
	}else if(res.ret === 2){
		$('#getYzm').removeAttr("disabled");
	}else{
		messageDialogShow('提示', "图形验证码加载失败！");
	}
}

// 定义验证码js加载错误处理函数
function loadErrorCallback() {
	var appid = '194687288';
	$('#getYzm').removeAttr("disabled");
	messageDialogShow('提示', "图形验证加载失败！");
	// 生成容灾票据或自行做其它处理
	var ticket = 'terror_1001_' + appid + Math.floor(new Date().getTime() / 1000);
	txcallback({
		ret: 0,
		randstr: '@'+ Math.random().toString(36).substr(2),
		ticket: ticket,
		errorCode: 1001,
		errorMessage: 'jsload_error'
	});
}

// 定义验证码触发事件
function txyz(){
	try {
		// 生成一个验证码对象
		// CaptchaAppId：登录验证码控制台，从【验证管理】页面进行查看。如果未创建过验证，请先新建验证。注意：不可使用客户端类型为小程序的CaptchaAppId，会导致数据统计错误。
		//callback：定义的回调函数
		var captcha = new TencentCaptcha('194687288', txcallback, {"needFeedBack":false,"loading":true});
		// 调用方法，显示验证码
		captcha.show();
	} catch (error) {
		// 加载异常，调用验证码js加载错误处理函数
		loadErrorCallback();
	}
}

/**
 * 更新学位成绩
 */
function showXwCourGrade(){
	web.ajax(basePath+"/edu/student/xwCourGradeUpdate.ajax", {
		userId:userId
	}, true, function(r) {
		if (r.state == SUCCESS) {
			messageDialogShow('提示',r.msgInfo,"3");
		} else {
			messageDialogShow('提示',r.msgInfo,"2");
		}
	});
}