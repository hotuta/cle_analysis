/*version0.0.9alpha*/

/*global variable*/
    var clea_docele = document.documentElement , clea_bodyele = document.body ;
    var clea_dlgcalled = false;//ダイアログを一度でも読んだらtrue

function analysiscle(){
    var clea_mainprocessing = function(){//メインの処理

        clea_closeDlg();
        var clea_lectstarttime = new Array();
        var clea_lectendtime = new Array();
        var clea_campus_radiobtn = new Array();
        var clea_selected_campusnum = 0;
        var clea_campus_adresscheckbox = document.getElementById("dlg_adrscheckbox");
        var clea_trueis_adrsinclude = false;
        if(clea_campus_adresscheckbox.checked){//住所を含むか否か
            clea_trueis_adrsinclude = true;
        }
        for(var ci=0;ci<7;ci++){
            clea_campus_radiobtn[ci] = document.getElementById("dlg_radiobtn"+ci);
            if(clea_campus_radiobtn[ci].checked == true){
                clea_selected_campusnum = ci;
                break;
            }
        }

        //現在、伊勢原キャンパスには非対応(時間割構成が複雑であるため)
        var clea_starttimedef = new Array();
        var clea_endtimedef = new Array();

        /*
        各キャンパスの住所は2015.11.10時点のもの
        http://www.u-tokai.ac.jp/info/traffic_map/
        (阿蘇キャンパスのみ詳細を得ることができなかったため、Google Mapより住所を得た)
        */
        var clea_campus_address =""; 
        if(clea_selected_campusnum>=0&&clea_selected_campusnum<=2){//湘南、代々木、高輪
            //1時限目
            clea_starttimedef[0]="9:20";
            clea_endtimedef[0]="10:50";
            //2時限目
            clea_starttimedef[1]="11:05";
            clea_endtimedef[1]="12:35";
            //3時限目
            clea_starttimedef[2]="13:25";
            clea_endtimedef[2]="14:55";
            //4時限目
            clea_starttimedef[3]="15:10";
            clea_endtimedef[3]="16:40";
            //5時限目
            clea_starttimedef[4]="16:50";
            clea_endtimedef[4]="18:20";
            //6時限目
            clea_starttimedef[5]="18:30";
            clea_endtimedef[5]="20:00";

            if(clea_trueis_adrsinclude){
                if(clea_selected_campusnum==0){
                    clea_campus_address="神奈川県平塚市北金目４-１-１";
                }else if(clea_selected_campusnum==1){
                    clea_campus_address="東京都渋谷区富ヶ谷２-２８-４";
                }else{
                    clea_campus_address="東京都港区高輪２-３-２３";
                }
            }
        }else if(clea_selected_campusnum==3){//清水
            //1時限目
            clea_starttimedef[0]="9:00";
            clea_endtimedef[0]="10:30";
            //2時限目
            clea_starttimedef[1]="10:40";
            clea_endtimedef[1]="12:10";
            //3時限目
            clea_starttimedef[2]="13:00";
            clea_endtimedef[2]="14:30";
            //4時限目
            clea_starttimedef[3]="14:40";
            clea_endtimedef[3]="16:10";
            //5時限目
            clea_starttimedef[4]="16:20";
            clea_endtimedef[4]="17:50";
            //6時限目
            clea_starttimedef[5]="18:00";//ダミー(本来6時限目は該当キャンパスには存在しない)
            clea_endtimedef[5]="19:30";

            if(clea_trueis_adrsinclude){
                clea_campus_address="静岡県静岡市清水区折戸３-２０-１";
            }

        }else if(clea_selected_campusnum>=4&&clea_selected_campusnum<=5){//熊本、阿蘇
            //1時限目
            clea_starttimedef[0]="9:10";
            clea_endtimedef[0]="10:40";
            //2時限目
            clea_starttimedef[1]="10:50";
            clea_endtimedef[1]="12:20";
            //3時限目
            clea_starttimedef[2]="13:10";
            clea_endtimedef[2]="14:40";
            //4時限目
            clea_starttimedef[3]="14:50";
            clea_endtimedef[3]="16:20";
            //5時限目
            clea_starttimedef[4]="16:30";
            clea_endtimedef[4]="18:00";
            //6時限目
            clea_starttimedef[5]="18:10";//ダミー(本来6時限目は該当キャンパスには存在しない)
            clea_endtimedef[5]="19:40";

            if(clea_trueis_adrsinclude){
                if(clea_selected_campusnum==4){
                    clea_campus_address="熊本県熊本市東区渡鹿９-１-１";
                }else{
                    clea_campus_address="熊本県阿蘇郡南阿蘇村河陽５４３５";
                }
            }
        }else{//札幌
            //1時限目
            clea_starttimedef[0]="9:10";
            clea_endtimedef[0]="10:40";
            //2時限目
            clea_starttimedef[1]="10:55";
            clea_endtimedef[1]="12:25";
            //3時限目
            clea_starttimedef[2]="13:15";
            clea_endtimedef[2]="14:45";
            //4時限目
            clea_starttimedef[3]="15:00";
            clea_endtimedef[3]="16:30";
            //5時限目
            clea_starttimedef[4]="16:40";
            clea_endtimedef[4]="18:10";
            //6時限目
            clea_starttimedef[5]="18:25";//ダミー(本来6時限目は該当キャンパスには存在しない)
            clea_endtimedef[5]="19:55";

            if(clea_trueis_adrsinclude){
                clea_campus_address="北海道札幌市南区南沢５条１丁目１−１";
            }

        }
        var clea_resultstr="";
        var clea_excuteIsTrue=true;

        var dlgstartyearSelect = document.getElementById('clea_yearselect0');
        var dlgstartmonthSelect = document.getElementById('clea_monthselect0');
        var dlgstartdaySelect = document.getElementById('clea_dayselect0');
        var dlgendyearSelect = document.getElementById('clea_yearselect1');
        var dlgendmonthSelect = document.getElementById('clea_monthselect1');
        var dlgenddaySelect = document.getElementById('clea_dayselect1');

        
        var dlgstartyearopt = document.getElementById("dlg0cleaYopt"+dlgstartyearSelect.selectedIndex);
        var clea_StartYear = parseInt(dlgstartyearopt.value);
        var clea_StartMonth = parseInt(dlgstartmonthSelect.selectedIndex+1);
        var clea_StartDay = parseInt(dlgstartdaySelect.selectedIndex+1);

        var dlgendyearopt = document.getElementById("dlg1cleaYopt"+dlgendyearSelect.selectedIndex);
        var clea_EndYear = parseInt(dlgendyearopt.value);
        var clea_EndMonth = parseInt(dlgendmonthSelect.selectedIndex+1);
        var clea_EndDay = parseInt(dlgenddaySelect.selectedIndex+1);

        if(!(1<=clea_EndMonth&&clea_EndMonth<=12&&1<=clea_EndDay&&clea_EndDay<=31)||!(1<=clea_StartMonth&&clea_StartMonth<=12&&1<=clea_StartDay&&clea_StartDay<=31)){
            alert("月もしくは日が不適切な値です。");
            return -1;
        }

        var clea_EndYMDnum=clea_EndYear*10000+clea_EndMonth*100+clea_EndDay;
        var clea_sDay = new Date(clea_StartYear,clea_StartMonth-1,clea_StartDay);
        var clea_eDay= new Date(clea_EndYear,clea_EndMonth-1,clea_EndDay);

        var clea_requestUrl=wbassdwrRrequestURL;
        var clea_WeekstartDay=clea_StartYear.toString()+"/"+PositiveIntToStringTens(clea_StartMonth)+"/"+PositiveIntToStringTens(clea_StartDay);
        var cle_param = {
            'value(startday)'   : clea_WeekstartDay,
            'buttonName'        : "selectDayStateChange"
        };

    var prgstartnum = (clea_eDay.getTime()-clea_sDay.getTime())/(86400000);//初期値
    var prgdotnum = 100/prgstartnum;//プログレスバーの最大値を100に合わせるための数値(掛ける数)
    var clea_prgbarElement = document.createElement('progress');//プログレスバーを作成
    clea_prgbarElement.max =100;//プログレスバーの最大値
    clea_prgbarElement.style.backgroundColor = 'white';
    var clea_prgnumElement = document.createElement('div'); //進捗パーセント表示用divを作成
    clea_prgnumElement.style.backgroundColor = 'white';
    var clea_elementobj = document.getElementsByTagName("body").item(0); 
    //要素をbodyタグに追加
    clea_elementobj.appendChild(clea_prgbarElement);
    clea_elementobj.appendChild(clea_prgnumElement);


    var clea_weeklyhtml=clea_get_schoollesson_info(clea_requestUrl,cle_param,null,null);
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
                clea_dayspstr=get_content_str(clea_daysubstr.replace(/[\r\n]/g,"").replace(/\s+/g, ""),"=\"details\">","</div></div>",clea_Index_num_day);
                var clea_period=get_content_str(clea_dayspstr,"=\"period\">","</div>",0).replace(/時限/g,"");
                var clea_s_dayspstr=get_content_str(clea_dayspstr,"=\"text\">","</span>",0);
                var clea_content=get_content_str(clea_dayspstr,";\">","</a>",0);
                    
                var clea_startTime="";
                var clea_endTime="";
                var clea_allDay="False";
                var clea_campusAdrs="";
                if(clea_period=="１"){
                    clea_startTime=clea_starttimedef[0];
                    clea_endTime=clea_endtimedef[0];
                    clea_campusAdrs = clea_campus_address;
                }else if(clea_period=="２"){
                    clea_startTime=clea_starttimedef[1];
                    clea_endTime=clea_endtimedef[1];
                    clea_campusAdrs = clea_campus_address;
                }else if(clea_period=="３"){
                    clea_startTime=clea_starttimedef[2];
                    clea_endTime=clea_endtimedef[2];
                    clea_campusAdrs = clea_campus_address;
                }else if(clea_period=="４"){
                    clea_startTime=clea_starttimedef[3];
                    clea_endTime=clea_endtimedef[3];
                    clea_campusAdrs = clea_campus_address;
                }else if(clea_period=="５"){
                    clea_startTime=clea_starttimedef[4];
                    clea_endTime=clea_endtimedef[4];
                    clea_campusAdrs = clea_campus_address;
                }else if(clea_period=="６"){
                    clea_startTime=clea_starttimedef[5];
                    clea_endTime=clea_endtimedef[5];
                    clea_campusAdrs = clea_campus_address;
                }else{
                    if(clea_period.replace(/\s+/g, "")!=""){
                        var clea_SandEstr=clea_period.replace(/\s+/g, "").split("～");
                        clea_startTime=clea_SandEstr[0];
                        clea_endTime=clea_SandEstr[1];
                    }else{
                        clea_allDay="True";
                    }
                    clea_campusAdrs="";
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

                        clea_details_and_places=clea_get_schoollesson_info(clea_s_requestUrl,clea_s_param,"clea_analysis_schoollesson_info",clea_campusAdrs);
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

                        clea_details_and_places=clea_get_schoollesson_info(clea_s_requestUrl,clea_s_param,"clea_analysis_schoollesson_info",clea_campusAdrs);
                    }else{
                        clea_details_and_places="";
                    }
                }
                clea_resultstr+="Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\r\n"+clea_content+","+clea_year+"/"+clea_month+"/"+clea_day+","+clea_startTime+","+clea_year+"/"+clea_month+"/"+clea_day+","+clea_endTime+","+clea_allDay+","+clea_details_and_places+",True\r\n\r\n";
            }
            var clea_nowDay= new Date(parseInt(clea_year,10),parseInt(clea_month,10)-1,parseInt(clea_day,10));
            var clea_now_daydiff = (clea_eDay.getTime()-clea_nowDay.getTime())/(86400000);

            clea_prgbarElement.value = (prgstartnum-clea_now_daydiff)*prgdotnum;//プログレスバーの内容を更新
            clea_prgnumElement.innerText = parseInt(clea_prgbarElement.value,10)+"%";//パーセンテージを更新
            clea_prgnumElement.textContent = parseInt(clea_prgbarElement.value,10)+"%";//firefox対策
            
            if((parseInt(clea_year,10)*10000+parseInt(clea_month,10)*100+parseInt(clea_day,10))>=clea_EndYMDnum){
                alert("終了しました");
                if(window.navigator.msSaveBlob){
                    var blob = new Blob([clea_resultstr], {type: "text/plain"});
                    window.navigator.msSaveBlob(blob,"cle_schedule.csv");
                }else{
                    var ua = window.navigator.userAgent.toLowerCase();
                    if(URL.createObjectURL && (ua.indexOf('firefox') == -1)){
                        var element_a = document.createElement("a");
                        var blob = new Blob([clea_resultstr], {type: "text/plain"});
                        element_a.href = URL.createObjectURL(blob);
                        element_a.target = '_blank';
                        element_a.download = 'cle_schedule.csv';
                        //element_a.click();
                        //イベントオブジェクトを使用する
                        
                        var mouse_event = document.createEvent("MouseEvent");
                        mouse_event.initEvent("click",false,true);
                        element_a.dispatchEvent(mouse_event);
                        URL.revokeObjectURL(element_a.href);
                    }else{
                        var result_href = "data:application/octet-stream," + encodeURIComponent(clea_resultstr);
                        location.href=result_href;
                    }


                }
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
        clea_weeklyhtml=clea_get_schoollesson_info(clea_requestUrl,cle_param,null,null);

        if(clea_excuteIsTrue==true){
            setTimeout(clea_innerloopfunc, 500);
        }
    }
    clea_innerloopfunc();

	}//メインの処理ここまで
    
    //メインより先に呼び出される
	clea_dlgfunc(clea_mainprocessing);//入力用ダイアログ呼び出し
}

function clea_get_schoollesson_info(url, param, callback,cmpsadrs) {
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
            clea_resultdata = clea_analysis_schoollesson_info(data,cmpsadrs);
        }else{
            clea_resultdata = data;
        }
    }).fail(function(data){
        alert("error");
    });

  return clea_resultdata;
}

function clea_analysis_schoollesson_info(clea_htmldata,cmpsadrs_s){
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
        clea_places = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g,"");
      }      
      if(clea_firsthtmldata.indexOf("詳細</td>")!=-1){
        clea_details = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g," ");
      }
      if(clea_firsthtmldata.indexOf("場所</td>")!=-1){
        clea_places = get_content_str(clea_firsthtmldata,"<td class=\"item\">","</td",0).replace(/\s+/g, "").replace(/\"/g,"").replace(/<br>/g," ");
      }
   }
}
    if(cmpsadrs_s!=""&&cmpsadrs_s!=null){
        return clea_details.toString()+","+"("+clea_places.toString()+")"+cmpsadrs_s;
    }else{
        return clea_details.toString()+","+clea_places.toString();
    }
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


function PositiveIntToStringTens(inputnum){
    var outputstr="";
    if(inputnum>=0&&inputnum<10){
        outputstr="0"+inputnum.toString();
    }else{
        outputstr=inputnum.toString();
    }
    return outputstr; 
}

function clea_dlgfunc(callback){
    if(clea_dlgcalled==true){//すでにダイアログの要素を生成済みであったら表示して関数から抜ける
        var dlgcontextele = document.getElementById('clea_dlg_contxt'); //ダイアログ背景用
        var dlgfrontele = document.getElementById('clea_dlg_front'); //ダイアログ本体用
        dlgcontextele.style.display = 'inline';
        dlgfrontele.style.display = 'inline';
        return 0;
    }

	/*ダイアログのベース*/
		/*var dlg_flatlink = document.createElement('link');//動的にCSSを読み込む
		dlg_flatlink.href = 'file:///C:/Users/HayatoKimura/Desktop/test/dlgradiobtnstyle.css';//デフォルトではGoogleDriveである。適宜変更すべし
		dlg_flatlink.type = 'text/css';
		dlg_flatlink.rel = 'stylesheet';
		var dlg_head = document.getElementsByTagName('head').item(0);
		dlg_head.appendChild(dlg_flatlink);*/
        var clea_contentsize = new Array();
        getContentSize(clea_contentsize);

		var dlgcontextele = document.createElement('div'); //ダイアログ背景用
		dlgcontextele.id = 'clea_dlg_contxt';
        dlgcontextele.onclick = clea_closeDlg;
    	var contextelestyle=dlgcontextele.style;
    	contextelestyle.backgroundColor = 'black';
    	contextelestyle.position = 'absolute';
    	contextelestyle.width = clea_contentsize[0]+"px";
    	contextelestyle.height = clea_contentsize[1]+"px";
    	contextelestyle.left = '0px';
    	contextelestyle.top = '0px';
    	contextelestyle.opacity = 0.5;
    	contextelestyle.MozOpacity = 0.5;
    	contextelestyle.filter = 'alpha(opacity = 50)';
        contextelestyle.zIndex = 1000;

    	var dlgfrontele = document.createElement('div'); //ダイアログ本体用
    	var frontelestyle = dlgfrontele.style;
    	dlgfrontele.id ='clea_dlg_front';
    	frontelestyle.backgroundColor = 'white';
    	frontelestyle.color = 'black';
    	frontelestyle.position = 'absolute';
    	frontelestyle.minWidth = '180px';
    	frontelestyle.minHeight = '360px';
    	frontelestyle.maxWidth = '300px';
    	frontelestyle.maxHeight = '600px';
    	frontelestyle.width = window.innerWidth*0.35+'px';
    	frontelestyle.height = window.innerWidth*0.7+'px';
        frontelestyle.zIndex =1001;
    	var frontwidth,frontheight;
    	if(frontelestyle.width>frontelestyle.maxWidth){
    		frontwidth = frontelestyle.maxWidth;
    	}else if(frontelestyle.width>frontelestyle.minWidth){
    		frontwidth = frontelestyle.width;
    	}else{
    		frontwidth = frontelestyle.minWidth;
    	}
    	if(frontelestyle.height>frontelestyle.maxHeight){
    		frontheight = frontelestyle.maxHeight;
    	}else if(frontelestyle.height>frontelestyle.minHeight){
    		frontheight = frontelestyle.height;
    	}else{
    		frontheight = frontelestyle.minHeight;
    	}

    	frontelestyle.left = (window.innerWidth - parseInt(frontwidth))/2+'px';
   		frontelestyle.top = (window.innerHeight - parseInt(frontheight))/2+'px';

    
    	var dlg_okbtnele = document.createElement('input');//okbutton
    	dlg_okbtnele.type = 'button';
    	dlg_okbtnele.value = 'OK';
    	dlg_okbtnele.onclick = callback;
    	var okbtnelestyle = dlg_okbtnele.style;
    	okbtnelestyle.position = 'absolute';
    	okbtnelestyle.bottom = '20px';
    	okbtnelestyle.left = '20px';

        var dlg_cancelbtnele = document.createElement('input');//cancelbutton
        dlg_cancelbtnele.type = 'button';
        dlg_cancelbtnele.value = 'CANCEL';
        dlg_cancelbtnele.onclick = clea_closeDlg;
        var cancelbtnelestyle = dlg_cancelbtnele.style;
        cancelbtnelestyle.position = 'absolute';
        cancelbtnelestyle.bottom = '20px';
        cancelbtnelestyle.right = '20px';

    	var elementobj = document.getElementsByTagName("body").item(0); 

   		 //要素をbodyタグに追加
    	elementobj.appendChild(dlgcontextele);
    	//bodyにダイアログ本体を追加
    	elementobj.appendChild(dlgfrontele);
    	//ダイアログ本体に要素を追加
    	dlgfrontele.appendChild(dlg_okbtnele);//OKボタン
        dlgfrontele.appendChild(dlg_cancelbtnele);//cancelボタン

    /*ダイアログのベースはここまで*/

    /*スクリプト情報*/
        var dlg_caption_scriptinfo = document.createElement('div');
        var dlg_br0 = document.createElement('br');
        var dlg_caption_scriptinfotxt = document.createTextNode("CLE_Analysis ver0.0.9"); 
        var dlg_caption_hr0 = document.createElement('hr');
        dlg_caption_hr0.style.width = '90%';
        dlgfrontele.appendChild(dlg_caption_scriptinfo);
        dlgfrontele.appendChild(dlg_caption_hr0);
        dlg_caption_scriptinfo.appendChild(dlg_caption_scriptinfotxt);
        dlgfrontele.appendChild(dlg_br0);
    /*スクリプト情報はここまで*/

    /*キャンパス選択の題*/
    	var dlg_caption_campus = document.createElement('div');
    	var dlg_caption_campustxt = document.createTextNode("在籍及び受講キャンパスを選択してください"); 
    	var dlg_caption_hr = document.createElement('hr');
    	dlg_caption_hr.style.width = '90%';
    	dlgfrontele.appendChild(dlg_caption_campus);
    	dlgfrontele.appendChild(dlg_caption_hr);
    	dlg_caption_campus.appendChild(dlg_caption_campustxt);
    /*キャンパス選択の題はここまで*/

    /*キャンパス選択用ラジオボタン*/
    	var dlg_radiobtn = new Array();
    	for(var ci=0;ci<7;ci++){

    		var dlg_br = document.createElement('br');
    		var dlg_radiotxt = document.createTextNode(getCampusNameFromNum(ci));//キャンパス名表示

    		var dlg_radiolabel = document.createElement('label');
    		//dlg_radiolabel.className = 'flatctrlmain';
    		dlg_radiobtn[ci] = document.createElement('input');//radiobutton
    		dlg_radiobtn[ci].type = 'radio';
    		dlg_radiobtn[ci].name = 'campusnamebtn'
    		dlg_radiobtn[ci].value = ci;
            dlg_radiobtn[ci].id = "dlg_radiobtn"+ci;
    		//dlg_radiobtn[ci].className = 'flatctrlmain flatradio';

    		dlgfrontele.appendChild(dlg_radiolabel);
    		dlg_radiolabel.appendChild(dlg_radiobtn[ci]);
    		dlg_radiolabel.insertBefore(dlg_radiotxt, dlg_radiobtn[ci].nextSibling);
			dlgfrontele.appendChild(dlg_br);
		}
		dlg_radiobtn[2].checked = true;
	/*キャンパス選択用ラジオボタンはここまで*/

	/*期間指定の題*/
		var dlg_br1 = document.createElement('br');
    	var dlg_caption_sted = document.createElement('div');
    	var dlg_caption_stedtxt = document.createTextNode("開始日と終了日の入力"); 
    	var dlg_caption_hr1 = document.createElement('hr');
    	dlg_caption_sted.style.textAlign = 'center';
    	dlg_caption_hr1.style.width = '90%';
    	dlgfrontele.appendChild(dlg_br1);
    	dlgfrontele.appendChild(dlg_caption_sted);
    	dlgfrontele.appendChild(dlg_caption_hr1);
    	dlg_caption_sted.appendChild(dlg_caption_stedtxt);
    /*期間指定の題はここまで*/

    /*開始/終了日の入力欄*/

        var dlg_date = new Date();
    	var dlg_Yselectbox = new Array();
    	var dlg_Mselectbox = new Array();
    	var dlg_Dselectbox = new Array();
    	for(var cj=0;cj<2;cj++){
    		var dlg_divday = document.createElement('div');
			var dlg_br2 = document.createElement('br');
    		dlg_divday.style.textAlign = 'center';
    		dlgfrontele.appendChild(dlg_divday);
    		var dlgdivcaption;
    		if(cj==0){
    			dlgdivcaption ="開始日を選択してください";
    		}else{
    			dlgdivcaption ="終了日を選択してください";
    		}
    		var dlg_divday_text = document.createTextNode(dlgdivcaption);
    		dlg_divday.appendChild(dlg_br2);
    		/*年*/
    		var dlg_nowYear = dlg_date.getFullYear();


    		dlg_Yselectbox[cj] = document.createElement('select');
            dlg_Yselectbox[cj].id ="clea_yearselect"+cj.toString();
    		dlg_divday.appendChild(dlg_Yselectbox[cj]);
            var dlg_yloopcount = 0;
    		for(var ci=dlg_nowYear-1;ci<=dlg_nowYear+1;ci++){
    			var dlg_selectoption = document.createElement('option');
    			dlg_selectoption.value = ci.toString();
                dlg_selectoption.id = "dlg"+cj+"cleaYopt"+dlg_yloopcount;
    			var dlg_selectoption_text = document.createTextNode(ci.toString());
    			dlg_Yselectbox[cj].appendChild(dlg_selectoption);
    			dlg_selectoption.appendChild(dlg_selectoption_text);
                dlg_yloopcount++;
    		}
    		dlg_divday.insertBefore(dlg_divday_text,dlg_br2);


    		var dlg_nowMonth = dlg_date.getMonth()+1;//終了日提案のために先に現在の月を取得

    		if(cj==0){
    			dlg_Yselectbox[cj].selectedIndex = 1;
    		}else{
    			if(dlg_nowMonth<9&&3<dlg_nowMonth){
    			dlg_Yselectbox[cj].selectedIndex = 1;//現在の年
    			}else{
    				if(dlg_nowMonth<=3&&1<=dlg_nowMonth){
    					dlg_Yselectbox[cj].selectedIndex = 1;//現在の年
    				}else{
						dlg_Yselectbox[cj].selectedIndex = 2;//次の年
					}
    			}
    		}

    		/*月*/
    		dlg_Mselectbox[cj] = document.createElement('select');
            dlg_Mselectbox[cj].id ="clea_monthselect"+cj.toString();
    		dlg_divday.appendChild(dlg_Mselectbox[cj]);
    		for(var ci=1;ci<=12;ci++){
    			var dlg_selectoption = document.createElement('option');
    			dlg_selectoption.value = ci.toString();
    			var dlg_selectoption_text = document.createTextNode(ci.toString());
    			dlg_Mselectbox[cj].appendChild(dlg_selectoption);
    			dlg_selectoption.appendChild(dlg_selectoption_text);
    		}
    		if(cj==0){
    			dlg_Mselectbox[cj].selectedIndex = dlg_nowMonth-1;
    		}else{
    			if(dlg_nowMonth<9&&3<dlg_nowMonth){
    				dlg_Mselectbox[cj].selectedIndex = 8;//9月
    			}else{
    				dlg_Mselectbox[cj].selectedIndex = 3;//4月
    			}
    		}

    		/*日*/
    		var dlg_nowDate = dlg_date.getDate();
    		dlg_Dselectbox[cj] = document.createElement('select');
            dlg_Dselectbox[cj].id ="clea_dayselect"+cj.toString();
    		dlg_divday.appendChild(dlg_Dselectbox[cj]);
    		for(var ci=1;ci<=31;ci++){
    			var dlg_selectoption = document.createElement('option');
    			dlg_selectoption.value = ci.toString();
    			var dlg_selectoption_text = document.createTextNode(ci.toString());
    			dlg_Dselectbox[cj].appendChild(dlg_selectoption);
    			dlg_selectoption.appendChild(dlg_selectoption_text);
    		}
    		if(cj==0){
    			dlg_Dselectbox[cj].selectedIndex = dlg_nowDate-1;
    		}else{
    			dlg_Dselectbox[cj].selectedIndex = 30;//31日
    		}

			var dlg_br3 = document.createElement('br');
    		dlgfrontele.appendChild(dlg_br3);
    	}
    /*開始/終了日の入力欄はここまで*/

    /*オプションの題*/
        var dlg_br4 = document.createElement('br');
        var dlg_caption_option = document.createElement('div');
        var dlg_caption_optiontxt = document.createTextNode("オプション"); 
        var dlg_caption_hr2 = document.createElement('hr');
        dlg_caption_option.style.textAlign = 'center';
        dlg_caption_hr2.style.width = '90%';
        dlgfrontele.appendChild(dlg_br4);
        dlgfrontele.appendChild(dlg_caption_option);
        dlgfrontele.appendChild(dlg_caption_hr2);
        dlg_caption_option.appendChild(dlg_caption_optiontxt);
    /*オプションの題はここまで*/

    /*キャンパス住所の有無のチェックボックス*/
            var dlg_br5 = document.createElement('br');
            var dlg_adrstxt = document.createTextNode("講義情報にキャンパスの住所を含む");
            var dlg_adrslabel = document.createElement('label');
            dlg_adrscheckbox = document.createElement('input');//checkbox
            dlg_adrscheckbox.type = 'checkbox';
            dlg_adrscheckbox.name = 'campusadrscheckbox'
            dlg_adrscheckbox.id = "dlg_adrscheckbox";
            dlg_adrscheckbox.checked=true;

            dlgfrontele.appendChild(dlg_adrslabel);
            dlg_adrslabel.appendChild(dlg_adrscheckbox);
            dlg_adrslabel.appendChild(dlg_adrstxt, dlg_adrscheckbox.nextSibling);
            dlgfrontele.appendChild(dlg_br5);
    /*キャンパス住所の有無のチェックボックスはここまで*/

    clea_dlgcalled=true;
    return 0;

}

function getCampusNameFromNum(index_num){
	    switch(index_num){
    	case 0:
    	return "湘南";
    	break;
    	case 1:
    	return "代々木";
    	break;
    	case 2:
    	return "高輪";
    	break;
    	case 3:
    	return "清水";
    	break;
    	case 4:
    	return "熊本";
    	break;
    	case 5:
    	return "阿蘇";
    	break;
    	case 6:
    	return "札幌";
    	break;
    	default:
    	return "";
    	break;
    }
    return "";
}

window.onresize = function(){
    var dlgcontextele = document.getElementById('clea_dlg_contxt'); //ダイアログ背景用
	var dlgfrontele = document.getElementById('clea_dlg_front'); //ダイアログ本体用
    var frontelestyle = dlgfrontele.style;

    var clea_contentsize = new Array();
    getContentSize(clea_contentsize);
    dlgcontextele.width = clea_contentsize[0]+"px";
    dlgcontextele.height = clea_contentsize[1]+"px";

	frontelestyle.width = window.innerWidth*0.35+'px';
    frontelestyle.height = window.innerWidth*0.7+'px';
    var frontwidth,frontheight;
    if(frontelestyle.width>frontelestyle.maxWidth){
    	frontwidth = frontelestyle.maxWidth;
    }else if(frontelestyle.width>frontelestyle.minWidth){
    	frontwidth = frontelestyle.width;
    }else{
    	frontwidth = frontelestyle.minWidth;
    }
    if(frontelestyle.height>frontelestyle.maxHeight){
    	frontheight = frontelestyle.maxHeight;
    }else if(frontelestyle.height>frontelestyle.minHeight){
    	frontheight = frontelestyle.height;
    }else{
    	frontheight = frontelestyle.minHeight;
    }

    frontelestyle.left = (window.innerWidth - parseInt(frontwidth))/2+'px';
    frontelestyle.top = (window.innerHeight - parseInt(frontheight))/2+'px';
}

function getContentSize(clea_contentsize_s){//ページコンテンツ全体のサイズを取得する関数
    var clea_pageW = clea_docele.scrollWidth || clea_bodyele.scrollWidth;// ページの幅
    var clea_pageH = clea_docele.scrollHeight || clea_bodyele.scrollHeight;// ページの高さ
    var clea_clientW = clea_docele.scrollWidth || clea_bodyele.scrollWidth;// クライアント領域の幅
    var clea_clientH = clea_docele.clientHeight || clea_bodyele.clientHeight;// クライアント領域の高さ
    if(clea_pageW>clea_clientW){
        clea_contentsize_s[0] = clea_pageW;
    }else{
        clea_contentsize_s[0] = clea_clientW;
    }
    if(clea_pageH>clea_clientH){
        clea_contentsize_s[1] = clea_pageH;
    }else{
        clea_contentsize_s[1] = clea_clientH;
    }
    return 0;
}

function clea_closeDlg(){
 var dlgcontextele = document.getElementById('clea_dlg_contxt');
 var dlgfrontele = document.getElementById('clea_dlg_front');
 dlgcontextele.style.display = 'none';
 dlgfrontele.style.display = 'none';
}
