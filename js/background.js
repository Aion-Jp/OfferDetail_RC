var mainPageURL = '';
var mainPageID = '';

//現時点でのRuleをクリア(removeRules)して
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //新たなRuleを追加する
    chrome.declarativeContent.onPageChanged.addRules([{
        //アクションを実行する条件
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlContains: 'https://www36.rpm-sys.jp/RPMv4-artista/index.cfm?fuseaction=Job.Update&selected_tab=tab_JobDetail' ,
                         },
            })
        ],
        //実行するアクション
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});
// アイコンをクリックした時のイベント処理
chrome.pageAction.onClicked.addListener(function(tab) {
        //現在のページのURLとIDを取得
        mainPageURL = tab.url;
        mainPageID = tab.id;
        //別タブを開く
        chrome.tabs.create({
            "url" : "popup/OfferDetail.html"
    });
});
