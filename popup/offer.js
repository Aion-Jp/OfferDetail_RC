//バックグラウンドオブジェクト
const mainPageID = chrome.extension.getBackgroundPage().mainPageID
//コンテンツ読み込み
pageReload();

//***** 以下　関数 *****//
//コンテンツ読み込み
async function pageReload(){
    //現在のページをクリア
    clearContents();

    //メインページとのポートを開く
    let port = chrome.tabs.connect(mainPageID, {name: "getContents"});

    //content_scripts側で処理が終わったらMessageを送ってくるので受け側を作成
    port.onMessage.addListener(function(msg,port) {
        if (msg.regetComp == "true") {
            //画面に反映
            setContents(msg);
        }
    });
    //メインページにコンテンツを要求
    await port.postMessage( { reget: "true" });
}

//コンテンツをセット
function setContents(msg) {
    //仕事No
    document.getElementById('job_no').innerHTML = msg.Job_No;
    //ステータス
    setSelectBox('job_status_id', msg.StatusText, msg.StatusColor);
    //職種
    document.getElementById('work_description').textContent = msg.Work_Description;
    //雇用形態
    document.getElementById('contract').textContent = msg.Contract;
    //勤務期間
    document.getElementById('tour_of_duty').textContent = msg.Tour_of_Duty;
    //契約期間
    document.getElementById('contractperiod').textContent = msg.Contractperiod;
    //枠
    document.getElementById('open_position').textContent = msg.Open_Position;

    //通勤手段
    setCheckElements('commute_method', msg.Commute_method);
    //交通費
    document.getElementById('carfare').textContent = msg.Carfare;
    //駐車場・
    document.getElementById('parking').textContent = msg.Parking;
    //通勤手段・通勤方法 備考
    document.getElementById('commute_detail').value = msg.Commute_detail;

    //仕事内容
    document.getElementById('job_outline').value = msg.Job_Outline;
    //備考
    document.getElementById('job_bikou').value = msg.Job_Bikou;
    //職場環境
    document.getElementById('environment').value = msg.Environment;

    //取扱商品
    document.getElementById('product').textContent = msg.Product;
    //配送先
    document.getElementById('delivery_destination').textContent = msg.Delivery_Destination;
    //配送距離
    document.getElementById('delivery_distance').textContent = msg.Delivery_Distance;
    //便
    document.getElementById('round').textContent = msg.Round;
    //件数
    document.getElementById('round_count').textContent = msg.Round_Count;
    //商品運搬方法
    setCheckElements('transportation_method',msg.Transportation_Method);

    //車種特記
    document.getElementById('cartype_detail').textContent = msg.Cartype_Detail;

    //必須資格
    document.getElementById('required_qualification').value = msg.Required_Qualification;
    //推奨資格・免許
    document.getElementById('recommended_qualification').value = msg.Recommended_Qualification;
    //トラック乗車経験
    setCheckElements('ride_experience',msg.Ride_Experience);
    document.getElementById('ride_experience_detail').textContent = msg.Ride_Experience_Detail;
    //配送経験
    setCheckElements('delivery_experience',msg.Delivery_Experience);
    document.getElementById('delivery_experience_detail').textContent = msg.Delivery_Experience_Detail;
    //フォーク経験
    setCheckElements('fork_experience',msg.Fork_Experience);
    document.getElementById('fork_experience_detail').textContent = msg.Fork_Experience_Detail;
    //その他経験
    setCheckElements('other_experience',msg.Other_Experience);
    document.getElementById('other_experience_detail').textContent = msg.Other_Experience_Detail;

    //性別
    setCheckElements('sex_limit', msg.Sex_Limit);
    //年齢制限
    document.getElementById('age_limit').textContent = msg.Age_Limit;
    //外国人
    setCheckElements('foreigner', msg.Foreigner);
    //面接注意事項
    document.getElementById('interview_considerations').value = msg.Interview_Considerations;

    //企業名
    document.getElementById('company').textContent = msg.Company;
    //勤務先住所
    document.getElementById('work_address').textContent = msg.Work_Address;
    //最寄り駅
    document.getElementById('closest_station').textContent = msg.Closest_Station;
    //営業担当
    document.getElementById('account').textContent = msg.Account;

    //制服
    document.getElementById('uniform').textContent = msg.Uniform;
    //福利厚生
    document.getElementById('welfare_benefits').value = msg.Welfare_Benefits;

    //給与
    document.getElementById('salary').textContent = msg.Salary + '円';
    //日額下限
    document.getElementById('daily_under').textContent = msg.Daily_Under + '円';
    //月収モデル
    document.getElementById('salary_month').textContent = msg.Salary_Month + '円';
    //研修時給
    document.getElementById('trainy_hourly').textContent = msg.Trainy_Hourly + '円';
    //研修終了
    document.getElementById('training_end').textContent = msg.Training_End;
    //日給保障
    document.getElementById('daily_guarantee').textContent = msg.Daily_Guarantee;
    //給与特記
    document.getElementById('salaly_detail').value = msg.Salaly_Detail;
    //研修特記
    document.getElementById('trainy_detail').value = msg.Trainy_Detail;

    //曜日
    document.getElementById('weekday').innerHTML = msg.Weekday;
    //休日
    document.getElementById('holiday').textContent = msg.Holiday;
    //勤務日数
    document.getElementById('workdayofweek').textContent = msg.Workday_of_Week;

    //時間1
    document.getElementById('worktime1').textContent = msg.Work_Time1;
    //時間2
    document.getElementById('worktime2').textContent = msg.Work_Time2;
    //時間3
    document.getElementById('worktime3').textContent = msg.Work_Time3;
    //勤務時間備考
    document.getElementById('worktimedetail').value = msg.Worktime_Detail;
    //休憩 / 時間帯
    document.getElementById('resttime').textContent = msg.Rest_Time;
    //深夜時間
    document.getElementById('midnighttime').textContent = msg.Midnight_Time;
    //残業時間(内)
    document.getElementById('overtime_in').textContent = msg.Overtime_In;
    //残業時間(外)
    document.getElementById('overtime_out').textContent = msg.Overtime_Out;
    //拘束時間
    document.getElementById('bound_time').textContent = msg.Bound_Time;
}

function setSelectBox(targetName, caption, backcolor) {
    let obj = document.getElementById(targetName);
    obj.textContent = caption;
    obj.style.backgroundColor = backcolor;
    obj.parentElement.style.backgroundColor = backcolor;
}

//チェックボックスの要素を全てぶっこ抜いて引数のinnerHTMLにセット
//その後、checkBoxを全てreadOnly化
function setCheckElements(descName,src) {
    document.getElementById(descName).innerHTML += src;
    let parObj = document.getElementsByName(descName);
    for (let i in parObj) {
        var childObj = parObj[i];
        if (childObj!=null && childObj.nodeName=='INPUT'){
            childObj.setAttribute('disabled','true');
        }
    }
}
function offCheckBox(descName){
    let parObj = document.getElementsByName(descName);
    for (let i in parObj) {
        childObj = parObj[i];
        child.removeAttribute('checked');
    }
}

function clearContents(){
    document.getElementById('job_no').innerHTML = "";
    document.getElementById('job_status_id').innerHTML = "";
    document.getElementById('work_description').textContent = "";
    document.getElementById('contract').textContent = "";
    document.getElementById('tour_of_duty').textContent = "";
    document.getElementById('contractperiod').textContent = "";
    document.getElementById('open_position').textContent = "";
    document.getElementById('commute_method').innerHTML;
    document.getElementById('carfare').textContent = "";
    document.getElementById('parking').textContent = "";
    document.getElementById('commute_detail').value = "";
    document.getElementById('job_outline').value = "";
    document.getElementById('job_bikou').value = "";
    document.getElementById('environment').value = "";
    document.getElementById('product').textContent = "";
    document.getElementById('delivery_destination').textContent = "";
    document.getElementById('delivery_distance').textContent = "";
    document.getElementById('round').textContent = "";
    document.getElementById('round_count').textContent = "";
    document.getElementById('transportation_method');
    document.getElementById('cartype_detail').textContent = "";
    document.getElementById('required_qualification').value = "";
    document.getElementById('recommended_qualification').value = "";
    document.getElementById('ride_experience').textContent = "";
    document.getElementById('delivery_experience').textContent = "";
    document.getElementById('other_experience').textContent = "";
    document.getElementById('sex_limit').innerHTML = "";
    document.getElementById('age_limit').textContent = "";
    document.getElementById('foreigner').innerHTML = "";
    document.getElementById('interview_considerations').value = "";
    document.getElementById('company').textContent = "";
    document.getElementById('work_address').textContent = "";
    document.getElementById('closest_station').textContent = "";
    document.getElementById('account').textContent = "";
    document.getElementById('uniform').textContent = "";
    document.getElementById('welfare_benefits').value = "";
    document.getElementById('salary').textContent = "";
    document.getElementById('daily_under').textContent = "";
    document.getElementById('salary_month').textContent = "";
    document.getElementById('trainy_hourly').textContent = "";
    document.getElementById('training_end').textContent = "";
    document.getElementById('daily_guarantee').textContent = "";
    document.getElementById('salaly_detail').value = "";
    document.getElementById('trainy_detail').value = "";
    document.getElementById('weekday').innerHTML = "";
    document.getElementById('holiday').textContent = "";
    document.getElementById('workdayofweek').textContent = "";
    document.getElementById('worktime1').textContent = "";
    document.getElementById('worktime2').textContent = "";
    document.getElementById('worktime3').textContent = "";
    document.getElementById('worktimedetail').value = "";
    document.getElementById('resttime').textContent = "";
    document.getElementById('midnighttime').textContent = "";
    document.getElementById('overtime_in').textContent = "";
    document.getElementById('overtime_out').textContent = "";
    document.getElementById('bound_time').textContent = "";
}
