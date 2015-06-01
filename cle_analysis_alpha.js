今日
木
自分1 個のアイテムを編集しました
19:13
JavaScript
cle_analysisalpha.js
木
自分1 個のアイテムの名前を変更しました
19:11
JavaScript
cle_analysisalpha.js
cle_analysis0_02alpha.js
木
自分1 個のアイテムをアップロードしました
9:56
JavaScript
cle_analysis0_02alpha.js
11 KB を使用中（0%）
追加容量を購入できます
cle_analysisalpha.js開く
/*varsion0.03alpha*/
function analysiscle(){
var resultstr="";

var year=new Array(7);
var month=new Array(7);
var day=new Array(7);

var period=new Array(7);
var plusinfo=new Array(7);
var content=new Array(7);

var user = window.prompt("cle_analysis ver 0.03alpha\ncsv化する期間を半角文字で入力してください。\n開始日と終了日を半角ハイフンで結んでください。\n例:2015/04/01-2015/08/10", "");
var SandEstr = user.split("-");
var EndYMD = SandEstr[1].split("/");
var EndYear = parseInt(EndYMD[0],10);
var EndMonth = parseInt(EndYMD[1],10);
var EndDay = parseInt(EndYMD[2],10);
var excuteIsTrue=true;
if(!(1<=EndMonth&&EndMonth<=12&&1<=EndDay&&EndDay<=31)){
	alert("月もしくは日が不適切な値です。");
	//return -1;
}
var EndYMDnum=EndYear*10000+EndMonth*100+EndDay;

showWeeklyCalender("selectDayStateChange", SandEstr[0]);


var interval_id=setInterval(function() {

	for(var h=0;h<4;h++){
		var ymd_c=0;
		var plusnum=0;
		var clsname;
		var s_clsname;
		if(h==0){
		clsname="corner_1";
		s_clsname="inner";
		}else if(h==1){
		clsname="corner_2";
		s_clsname="inner";
		plusnum=4;
		}else if(h==2){
		clsname="corner_1";
		s_clsname="inner_sat sat";
		plusnum=5;
		}else{
		clsname="corner_1";
		s_clsname="inner_sun sun";
		plusnum=6;
		}
		var element= document.getElementsByClassName(clsname);
		for (var i=0;i<element.length;i++) {
	  		var child_element = element[i].getElementsByClassName(s_clsname);
	  		for(var j=0;j<child_element.length;j++){
		 		if(child_element[j].innerHTML!=undefined){
					var s_child_element=child_element[j].childNodes;
					for(var k=0;k<s_child_element.length;k++){
						if(s_child_element[k].tagName==="A"||s_child_element[k].tagName==="a"){
							var hrefstr=s_child_element[k].getAttribute("href");
							var spstr = hrefstr.split("&");
							for(var l=0;l<spstr.length;l++){
							var s_spstr=spstr[l].split("=");
								if(s_spstr[0]==="selectYear"){
									year[ymd_c+plusnum]=s_spstr[1];
								}else if(s_spstr[0]==="selectMonth"){
									month[ymd_c+plusnum]=s_spstr[1];
								}else if(s_spstr[0]==="selectDay"){
									day[ymd_c+plusnum]=s_spstr[1];
									ymd_c++;
								}
							}
						}
					}
				}
			}
		}
	}


	for(var h=0;h<3;h++){
		var ymd_c=0;
		var plusnum=0;
		var clsname="";
		if(h==0){
		clsname="in_line_y";
		}else if(h==1){
		clsname="in_line_y sat";
		plusnum=5;
		}else if(h==2){
		clsname="in_line_y sun";
		plusnum=6;
		}
		var element = document.getElementsByClassName(clsname);
		var element_sat=document.getElementsByClassName("in_line_y sat");
		var element_sun=document.getElementsByClassName("in_line_y sun");
		iforloop: for (var i=0;i<element.length;i++) {
			if(clsname=="in_line_y"){
				for(var j=0;j<element_sat.length;j++){
					if(element[i]===element_sat[j]){
						continue iforloop;
					}
				}
				for(var j=0;j<element_sun.length;j++){
					if(element[i]===element_sun[j]){
						continue iforloop;
					}
				}
			}
  			var child_element = element[i].getElementsByClassName("details");
  			for(var j=0;j<child_element.length;j++){
			  var s_child_element = child_element[j].getElementsByClassName("period");
  				for(var k=0;k<s_child_element.length;k++){
				  if(s_child_element[k].innerHTML!=undefined){
  					period[j+plusnum]=s_child_element[k].innerHTML.replace(/\s+/g, "").replace(/時限/g, "");
				  }
	  			}
		  	var s_child_element = child_element[j].getElementsByClassName("icons_1");
	  			for(var k=0;k<s_child_element.length;k++){
				  if(s_child_element[k].innerHTML!=undefined){
				  	plusinfo[j+plusnum]=s_child_element[k].innerHTML.replace(/\s+/g, "");
				  }
				}
			  var s_child_element = child_element[j].getElementsByClassName("text");
  				for(var k=0;k<s_child_element.length;k++){
		  			if(s_child_element[k].innerHTML!=undefined){
		  				s_s_child_element = s_child_element[k].childNodes;
						  for(var l=0;l<s_s_child_element.length;l++){
						  	if(s_s_child_element[l].innerHTML!=undefined){
							  	content[j+plusnum]=s_s_child_element[l].innerHTML.replace(/\s+/g, "");
							  }
						  }
		  			}
				} 
				var startTime="";
				var endTime="";
				var allDay="False";
				if(period[j+plusnum]=="１"){
					startTime="9:20";
					endTime="10:50";
				}else if(period[j+plusnum]=="２"){
					startTime="11:05";
					endTime="12:35";
				}else if(period[j+plusnum]=="３"){
					startTime="13:25";
					endTime="14:55";
				}else if(period[j+plusnum]=="４"){
					startTime="15:10";
					endTime="16:40";
				}else if(period[j+plusnum]=="５"){
					startTime="16:50";
					endTime="18:20";
				}else if(period[j+plusnum]=="６"){
					startTime="18:30";
					endTime="20:00";
				}else{
					if(period[j+plusnum].replace(/\s+/g, "")!=""){
						var SandEstr_2=period[j+plusnum].replace(/\s+/g, "").split("～");
						startTime=SandEstr_2[0];
						endTime=SandEstr_2[1];
					}else{
					allDay="True";
					}
				}
				resultstr+="Subject,Start Date,Start Time,End Date,End Time,All Day Event,Private\n"+content[j+plusnum]+","+year[ymd_c+plusnum]+"/"+month[ymd_c+plusnum]+"/"+day[ymd_c+plusnum]+","+startTime+","+year[ymd_c+plusnum]+"/"+month[ymd_c+plusnum]+"/"+day[ymd_c+plusnum]+","+endTime+","+allDay+",True\n\n";
 			 }
			 ymd_c++;
		}
	}
	
	showNextWeek();
	for(var i=4;i<7;i++){
		if((parseInt(year[i],10)*10000+parseInt(month[i],10)*100+parseInt(day[i],10))>=EndYMDnum){
			alert("終了しました");
			clearInterval(interval_id);
			var result_href = "data:application/octet-stream," + encodeURIComponent(resultstr);
			location.href=result_href;
			showThisWeek();
			break;
		}
	}
}, 500);
}


