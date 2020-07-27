//再送要求を処理するポートを開く
chrome.extension.onConnect.addListener(function(port){
    port.onMessage.addListener(async function(msg,port) {
        if (msg.reget == "true") {
            //コンテンツを送信
            await port.postMessage({
                //仕事No
                Job_No: getTextBoxText('shigoto_no'),
                //ステータス
                StatusText: getSelectedText('job_status_id'),
                StatusColor: getSelectedColor('job_status_id'),
                //職種
                Work_Description: getSelectedText('work_description') + ' ' + getSelectedText('client_id'),
                //雇用形態
                Contract: getSelectedText('contract_id'),
                //勤務期間
                Tour_of_Duty: getSelectedText('tour_of_duty'),
                //契約期間
                Contractperiod: getTextBoxText('form_name_103'),
                //枠
                Open_Position: getTextBoxText('form_name_150'),
                //通勤手段
                Commute_method: document.getElementsByName('form_name_25')[0].parentElement.parentElement.outerHTML,
                //交通費
                Carfare: getTextBoxText('form_name_60'),
                //駐車場・
                Parking: getRadioText('form_name_97'),
                //通勤手段・通勤方法 備考
                Commute_detail: getTextBoxText('form_name_98'),
                //仕事内容
                Job_Outline: getTextBoxText('job_outline').trim(),
                //備考
                Job_Bikou: getTextBoxText('bikou').trim(),
                //職場環境
                Environment:getTextBoxText('form_name_38').trim(),

                //取扱商品
                Product: getTextBoxText('form_name_39'),
                //配送先
                Delivery_Destination: getTextBoxText('form_name_40'),
                //配送距離
                Delivery_Distance: getTextBoxText('form_name_41'),
                //便
                Round: getTextBoxText('form_name_42'),
                //件数
                Round_Count: getTextBoxText('form_name_43'),
                //商品運搬方法
                Transportation_Method: document.getElementsByName('form_name_44')[0].parentElement.parentElement.outerHTML,

                //車種特記
                Cartype_Detail : getTextBoxText('form_name_7'),
                //必須資格
                Required_Qualification: getTextBoxText('form_name_29'),
                //推奨資格・免許
                Recommended_Qualification: getTextBoxText('form_name_30'),
                //トラック乗車経験
                Ride_Experience: document.getElementsByName('form_name_189')[0].parentElement.parentElement.outerHTML,
                Ride_Experience_Detail: getTextBoxText('form_name_32'),
                //配送経験
                Delivery_Experience: document.getElementsByName('form_name_190')[0].parentElement.parentElement.outerHTML,
                Delivery_Experience_Detail: getTextBoxText('form_name_100'),
                //フォーク経験
                Fork_Experience: document.getElementsByName('form_name_193')[0].parentElement.parentElement.outerHTML,
                Fork_Experience_Detail: getTextBoxText('form_name_116'),
                //その他経験
                Other_Experience: document.getElementsByName('form_name_191')[0].parentElement.parentElement.outerHTML,
                Other_Experience_Detail: getTextBoxText('form_name_101'),

                //性別
                Sex_Limit: document.getElementsByName('form_name_154')[0].parentElement.parentElement.outerHTML,
                //年齢制限
                Age_Limit:  (function(){
                                buff1 = getSelectedText('form_name_26') + " ～ " + getSelectedText('form_name_27');
                                if (document.getElementById('form_name_28_1').checked) {
                                    buff1 += ' ※上限厳守';
                                }
                                return buff1;
                            }()),
                //外国人
                Foreigner: document.getElementsByName('form_name_31')[0].parentElement.parentElement.outerHTML,
                //面接注意事項
                Interview_Considerations: getTextBoxText('form_name_36'),

                //企業名
                Company: getCompanyName(),
                //勤務先住所
                Work_Address:   (function(){
                                    buff1  = '〒' + getTextBoxText('form_name_8_1') + '-' + getTextBoxText('form_name_8_2') + ' ';  //郵便番号
                                    buff1 += getSelectedText('form_name_10_1') + getSelectedText('form_name_10_2') + ' ';           //都道府県+市区町村
                                    buff1 += (getTextBoxText('form_name_11') + getTextBoxText('form_name_171') + getTextBoxText('form_name_12')).trim(); //町名丁目+番地-号+建物名
                                    return buff1;
                                }()),
                //最寄り駅
                Closest_Station: (getSelectedText('form_name_20') + ' ' + getTextBoxText('form_name_21')).trim(),
                //営業担当
                Account: getTextBoxText('form_name_23_1') + ' ' + getTextBoxText('form_name_23_2'),

                //制服
                Uniform: getRadioText('form_name_52'),
                //福利厚生
                Welfare_Benefits: getTextBoxText('form_name_53'),

                //給与
                Salary: getSelectedText('salary_type') + ' ' + getTextBoxText('salary_value'),
                //日額下限
                Daily_Under: getTextBoxText('form_name_58'),
                //月収モデル
                Salary_Month: getTextBoxText('form_name_59'),
                //研修時給
                Trainy_Hourly: getTextBoxText('form_name_57'),
                //研修終了
                Training_End: getTextBoxText('form_name_56'),
                //日給保障
                Daily_Guarantee: getSelectedText('form_name_55'),
                //給与特記
                Salaly_Detail:  (function(){
                                    buff1 = getTextBoxText('salary_memo');
                                    buff2 = getTextBoxText('form_name_112')
                                    if (buff2) { buff1 += '\n' + buff2; }
                                    if (buff1 == "") {buff1 = " "};
                                    return buff1;
                                }()),
                //研修特記
                Trainy_Detail: getTextBoxText('form_name_64'),

                //曜日
                Weekday:    (function(){
                                buff1 = getTextBoxText('form_name_96');
                                buff2 = getTextBoxText('form_name_70');
                                if (buff2) { buff1 += "\n（" + buff2 + "）"; }
                                if (buff1 == "") {buff1 = " "};
                                return buff1;
                            }()),
                //休日
                Holiday: getTextBoxText('form_name_50'),
                //勤務日数
                Workday_of_Week :   (function(){
                                        buff1 = getTextBoxText('form_name_51');
                                        if (buff1) { buff1 += '日';}
                                        if (buff1 == "") {buff1 = " "};
                                        if (buff1 == "") {buff1 = " "};
                                        return buff1;
                                    }()),

                //時間1
                Work_Time1:  getTime('worktime_from_1','worktime_to_1'),
                //時間2
                Work_Time2:  getTime('worktime_from_2','worktime_to_2'),
                //時間3
                Work_Time3:  getTime('worktime_from_3','worktime_to_3'),
                //休憩 / 時間帯
                Rest_Time:   (function(){
                                buff1 = getTextBoxText('form_name_46');
                                buff2 = getTextBoxText('form_name_45');
                                if (buff1 && buff2) {
                                    buff1 += " / "
                                }
                                if (buff2) {
                                     buff1 += buff2;
                                }
                                if (buff1 == "") {buff1 = " "};
                                return buff1;
                            }()),
                //深夜時間
                Midnight_Time: getTextBoxText('form_name_102'),
                //拘束時間
                Bound_Time: getTextBoxText('form_name_47'),
                //残業時間(内)
                Overtime_In: getTextBoxText('form_name_49'),
                //残業時間(外)
                Overtime_Out: getTextBoxText('form_name_95'),
                //勤務時間備考
                Worktime_Detail: getTextBoxText('form_name_69'),

                regetComp: "true"
            });
            return true;
        }
    });
});

//テキストボックスからの値の取得
function getTextBoxText(txtName) {
    var obj = document.getElementsByName(txtName)[0];
  return obj.value.trim();
};

//セレクトからの値の取得
function getSelectedText(selName) {
    var obj =document.getElementsByName(selName)[0];
  return obj.options[obj.selectedIndex].text.trim();
};
//セレクト選択肢の背景色の取得
function getSelectedColor(selName) {
    var obj = document.getElementsByName(selName)[0];
  return obj.options[obj.selectedIndex].style.backgroundColor;
};

//ラジオからの値の取得
function getRadioText(rdoName) {
    var obj = document.getElementsByName(rdoName);
    var retValue ='';
    for (i in obj) {
        if (obj[i].checked) {
            retValue = obj[i].parentElement.textContent.trim();
        }
    }
    return retValue;
}

//会社名を取得
function getCompanyName() {
     var camType = getSelectedText('form_name_14');
     var camName = getTextBoxText('form_name_16');
     if (document.getElementById('form_name_15_1').checked){
         camName = camType + " " + camName;
     } else if(document.getElementById('form_name_15_2').checked){
         camName = camName + " " + camType;
     }
     camName += " " + getTextBoxText('form_name_18') + " " + getTextBoxText('form_name_19');
     return camName.trim();
};
//時間を取得
function getTime(str1,str2) {
    buff1 = getSelectedText(str1 + '_h') + '時' + getSelectedText(str1 + '_m') + '分';
    buff2 = getSelectedText(str2 + '_h') + '時' + getSelectedText(str2 + '_m') + '分';
    if (buff1 != '---時---分'){
        if (buff2 != '---時---分'){
            return buff1 + " ～ " + buff2;
        }else{
            return buff1;
        }
    }
}
