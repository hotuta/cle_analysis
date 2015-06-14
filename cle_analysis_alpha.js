/*varsion0.04alpha*/
function analysiscle(){
var clea_resultstr="";
var clea_excuteIsTrue=true;

var clea_user = window.prompt("csv化する期間を半角文字で入力してください。\n開始日と終了日を半角ハイフンで結んでください。\n例:2015/04/01-2015/08/10", "");
var clea_SandEstr = clea_user.split("-");
var clea_EndYMD = clea_SandEstr[1].split("/");
var clea_EndYear = parseInt(clea_EndYMD[0],10);
var clea_EndMonth = parseInt(clea_EndYMD[1],10);
var clea_EndDay = parseInt(clea_EndYMD[2],10);

var clea_StartYMD = clea_SandEstr[0].split("/");
var clea_StartYear = parseInt(clea_StartYMD[0],10);
var clea_StartMonth = parseInt(clea_StartYMD[1],10);
var clea_StartDay = parseInt(clea_StartYMD[2],10);
if(!(1<=clea_EndMonth&&clea_EndMonth<=12&&1<=clea_EndDay&&clea_EndDay<=31)||!(1<=clea_StartMonth&&clea_StartMonth<=12&&1<=clea_StartDay&&clea_StartDay<=31)){
	alert("月もしくは日が不適切な値です。");
	return -1;
}

var clea_EndYMDnum=clea_EndYear*10000+clea_EndMonth*100+clea_EndDay;
var clea_sDay = new Date(clea_StartYear,clea_StartMonth-1,clea_StartDay);
var clea_eDay= new Date(clea_EndYear,clea_EndMonth-1,clea_EndDay);

var clea_requestUrl=wbassdwrRrequestURL;
var clea_WeekstartDay=clea_SandEstr[0];
var cle_param = {
	'value(startday)'   : clea_WeekstartDay,
   	'buttonName'        : "selectDayStateChange"
};

    var clea_addelement = document.createElement('div'); 
    clea_addelement.id = "id"; 
    clea_addelement.style.backgroundColor = 'white'; 
    var clea_elementobj = document.getElementsByTagName("body").item(0); 
    clea_elementobj.appendChild(clea_addelement); 


var clea_weeklyhtml=clea_get_schoollesson_info(clea_requestUrl,cle_param,null);
var lectCodeToP_and_D = new Object();//履修年+セメスタ数+講義コードに対応させて場所と詳細情報を格納するオブジェクト

	var clea_innerloopfunc=function (){

		clea_WeekstartDay = get_content_str(clea_weeklyhtml,"weekStartDay = \'","\';",0);
	
		var clea_Index_num_date=new Array();
		var clea_Index_num_week=new Array();
		clea_Index_num_date[0]=0;
		clea_Index_num_week[0]=0;
		for(var clea_i=0;clea_i<clea_weeklyhtml.split("class=\"corner_").length-1;clea_i++){
			var clea_year="";
			var clea_month="";
			var clea_day="";
			var clea_Index_num_day=new Array();
			clea_Index_num_day[0]=0;

			var clea_clsnameweek="";
			var clea_clsnameday="";
			if(clea_i>=0&&clea_i<5){
				clea_clsnameweek="inner";
				clea_clsnameday="in_line_y"
			}else if(clea_i==5){
				clea_clsnameweek="inner_sat sat";
				clea_clsnameday="in_line_y sat";
				clea_Index_num_date[0]=0;
				clea_Index_num_week[0]=0;
			}else if(clea_i==6){
				clea_clsnameweek ="inner_sun sun";
				clea_clsnameday="in_line_y sun";
				clea_Index_num_date[0]=0;
				clea_Index_num_week[0]=0;

			}
			var clea_daysubstr=get_content_str(clea_weeklyhtml,"=\""+clea_clsnameweek+"\"","</div>",clea_Index_num_date);
			var clea_dayhrefstr=get_content_str(clea_daysubstr,"href=\"","\">",0);
			var clea_dayspstr = clea_dayhrefstr.split("&");
			for(var clea_j=0;clea_j<clea_dayspstr.length;clea_j++){
				var clea_s_dayspstr=clea_dayspstr[clea_j].split("=");
				if(clea_s_dayspstr[0]==="selectYear"){
						clea_year=clea_s_dayspstr[1];
				}else if(clea_s_dayspstr[0]==="selectMonth"){
						clea_month=clea_s_dayspstr[1];
				}else if(clea_s_dayspstr[0]==="selectDay"){
						clea_day=clea_s_dayspstr[1];
				}
			}
		
			clea_daysubstr=get_content_str(clea_weeklyhtml,"=\""+clea_clsnameday+"\"","</td>",clea_Index_num_week);
			for(var clea_j=0;clea_j<clea_daysubstr.split("=\"details\"").length-1;clea_j++){
				clea_dayspstr=get_content_str(clea_daysubstr.replace(/[\n\r]/g,"").replace(/\s+/g, ""),"=\"details\">","</div></div>",clea_Index_num_day);
				var clea_period=get_content_str(clea_dayspstr,"=\"period\">","</div>",0).replace(/時限/g,"");
				var clea_s_dayspstr=get_content_str(clea_dayspstr,"=\"text\">","</span>",0);
				var clea_content=get_content_str(clea_dayspstr,";\">","</a>",0);
					
				var clea_startTime="";
				var clea_endTime="";
				var clea_allDay="False";
				if(clea_period=="１"){
					clea_startTime="9:20";
					clea_endTime="10:50";
				}else if(clea_period=="２"){
					clea_startTime="11:05";
					clea_endTime="12:35";
				}else if(clea_period=="３"){
					clea_startTime="13:25";
					clea_endTime="14:55";
				}else if(clea_period=="４"){
					clea_startTime="15:10";
					clea_endTime="16:40";
				}else if(clea_period=="５"){
					clea_startTime="16:50";
					clea_endTime="18:20";
				}else if(clea_period=="６"){
					clea_startTime="18:30";
					clea_endTime="20:00";
				}else{
					if(clea_period.replace(/\s+/g, "")!=""){
						var clea_SandEstr_2=clea_period.replace(/\s+/g, "").split("～");
						clea_startTime=clea_SandEstr_2[0];
						clea_endTime=clea_SandEstr_2[1];
					}else{
						clea_allDay="True";
					}
				}
		  	
				var clea_originparamstr="";
				var clea_details_and_places="";
				clea_originparamstr=get_content_str(clea_s_dayspstr.replace(/\'/g,""),"openJikanFloat(",");",0);
				if(-1!=clea_originparamstr){
					var clea_s_requestUrl = wbassdwrRrequestURL;
				 	var clea_paramArray=new Array();
					clea_paramArray = clea_originparamstr.replace(/\s+/g, "").split(",");
					var lectCode = clea_paramArray[0].toString()+clea_paramArray[1].toString()+clea_paramArray[2].toString();
					if(lectCode in lectCodeToP_and_D!=true){//情報を取得済みであるならpostしない
						var clea_s_param = {
							'value(risyunen)'   : parseInt(clea_paramArray[0],10),
							'value(semekikn)'   : clea_paramArray[1].toString(),
							'value(kougicd)'   : clea_paramArray[2].toString(),
							'value(jikanNo)'   : parseInt(clea_paramArray[3],10),
							'value(msgsyukn)'   : clea_paramArray[4].toString(),
							'value(messgId)'   : clea_paramArray[5].toString(),
							'value(indexNo)'   : clea_paramArray[6].toString(),
							'value(redispday)'   : clea_paramArray[7].toString(),
							'buttonName': 'selectJikan'
						};

						clea_details_and_places=clea_get_schoollesson_info(clea_s_requestUrl,clea_s_param,"clea_analysis_schoollesson_info");
						lectCodeToP_and_D[lectCode]=clea_details_and_places;
					}else{
						clea_details_and_places=lectCodeToP_and_D[lectCode];
					}
				}else{

					clea_originparamstr=get_content_str(clea_s_dayspstr.replace(/\'/g,""),"openSdwrScheduleFloat(",");",0);
					if(-1!=clea_originparamstr){
						var clea_s_requestUrl = wbassdwrRrequestURL;
						var clea_paramArray=new Array();
						clea_paramArray = clea_originparamstr.replace(/\s+/g, "").split(",");
						var clea_s_param = {
							'value(sdsyoId)'   : clea_paramArray[0],
							'value(indexNo)'   : clea_paramArray[1],
							'value(redispday)'   : clea_paramArray[2],
							'buttonName': 'selectSchedule'
						};

						clea_details_and_places=clea_get_schoollesson_info(clea_s_requestUrl,clea_s_param,"clea_analysis_schoollesson_info");
					}else{
						clea_details_and_places="";
					}
				}
				clea_resultstr+="Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n"+clea_content+","+clea_year+"/"+clea_month+"/"+clea_day+","+clea_startTime+","+clea_year+"/"+clea_month+"/"+clea_day+","+clea_endTime+","+clea_allDay+","+clea_details_and_places+",True\n\n";
			}
			var clea_nowDay= new Date(parseInt(clea_year,10),parseInt(clea_month,10)-1,parseInt(clea_day,10));
			var clea_now_daydiff = (clea_eDay.getTime()-clea_nowDay.getTime())/(86400000);
			clea_addelement.innerHTML=clea_now_daydiff;
			if((parseInt(clea_year,10)*10000+parseInt(clea_month,10)*100+parseInt(clea_day,10))>=clea_EndYMDnum){
				alert("終了しました");
				var result_href = "data:application/octet-stream," + encodeURIComponent(clea_resultstr);
				location.href=result_href;
				clea_excuteIsTrue = false;
				delete(weekStartDay);
				break;
			}
		}

		clea_requestUrl=wbassdwrRrequestURL;
		cle_param = {
    		'value(startday)'   : clea_WeekstartDay,
    		'buttonName'        : "selectNextWeekChange"
  		};
		clea_weeklyhtml=clea_get_schoollesson_info(clea_requestUrl,cle_param,null);

		if(clea_excuteIsTrue==true){
			setTimeout(clea_innerloopfunc, 500);
		}
	}
	clea_innerloopfunc();
}


function clea_get_schoollesson_info(url, param, callback) {
    var clea_resultdata="";
  jq$.ajax({  
    url: url,
    data: param,
    type: 'post', 
    async: false,
    dataType: 'text',  
    cache: false
	}).done(function(data){
		if(callback!=null){
			clea_resultdata = clea_analysis_schoollesson_info(data);
		}else{
			clea_resultdata = data;
		}
	}).fail(function(data){
		alert("error");
	});

  return clea_resultdata;
}

function clea_analysis_schoollesson_info(clea_htmldata){
var clea_details="";
var clea_places = "";

var clea_tr_num = clea_htmldata.split("<tr").length - 1;

var clea_start_tr_num = new Array();
var clea_start_tr_num=0;
var clea_end_tr_num=0;
for(var i = 0;i<clea_tr_num;i++){
   clea_start_tr_num = clea_htmldata.indexOf("<tr",clea_end_tr_num);
   clea_end_tr_num = clea_htmldata.indexOf("</tr",clea_start_tr_num);
   var clea_firsthtmldata = clea_htmldata.substring(clea_start_tr_num,clea_end_tr_num);
   var clea_td_num = clea_firsthtmldata.split("<td").length - 1;
   for(var j = 0;j<clea_td_num;j++){
      if(clea_firsthtmldata.indexOf("担当教員</td>")!=-1){
        clea_details = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g," ");
      }
      if(clea_firsthtmldata.indexOf("教室</td>")!=-1){
        clea_places = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g," ");
      }      
      if(clea_firsthtmldata.indexOf("詳細</td>")!=-1){
        clea_details = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g," ");
      }
      if(clea_firsthtmldata.indexOf("場所</td>")!=-1){
        clea_places = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g," ");
      }
   }
}
    return clea_details.toString()+","+clea_places.toString();
}

function get_content_str(gcs_originstr,gcs_startstr,gcs_endstr,fromIndex_n){
	var startfromIndex_n = 0;
	if(typeof fromIndex_n ==='object'){
		startfromIndex_n = fromIndex_n[0];
	}
    var gcs_startnum = gcs_originstr.indexOf(gcs_startstr,startfromIndex_n);
    var gcs_endnum = gcs_originstr.indexOf(gcs_endstr,gcs_startnum);
    if(gcs_startnum==-1||gcs_endnum==-1){
      return -1;
    }
    if(typeof fromIndex_n ==='object'){//開始位置非指定時はfromIndex_nは0である
    	fromIndex_n[0] = gcs_endnum;//参照渡しで値反映
	}
  return gcs_originstr.substring(gcs_startnum+gcs_startstr.length,gcs_endnum);
}
