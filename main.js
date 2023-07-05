/*
    THIS FILE IS PART OF AutoBKLS PROJECT
    THIS PROGRAM IS FREE SOFTWARE, binklings/AutoBKLS, IS LICENSED UNDER the GNU General Public License v3.0
    YOU SHOULD HAVE RECEIVED A COPY OF GNU General Public License, IF NOT, PLEACE TAKE A LOOK< https://www.gnu.org/licenses/ >
    Copyright (c) 2023 binklings.com
    The BINKLINGS or BINKLINGS GAMES in the relevant agreement documents of this project are equivalent to<binklings.com>, the author of this program
*/

"ui";
importClass(android.webkit.DownloadListener);
ui.layout(
<viewpager id="viewpager">
    <vertical>
        <webview w="*" h="*" id="web"/>
    </vertical>
    <vertical bg="#000000" gravity="center_vertical">
        <text textColor="#FFFFFF" gravity="center" textSize="16sp">欢迎加入内测</text>
        <progressbar layout_gravity="center" indeterminate="true" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" w="160sp"/>
    </vertical>
</viewpager>
)

importClass(android.view.KeyEvent);
importClass(android.webkit.WebView);
importClass(android.webkit.WebChromeClient);
importClass(android.webkit.WebResourceResponse);
importClass(android.webkit.WebViewClient);
importClass(android.webkit.WebStorage)
importClass("com.stardust.autojs.core.web.InjectableWebClient");
let sScriptEngine = engines.myEngine();
let scriptableContext = sScriptEngine.context;
let scriptableScriptable = sScriptEngine.scriptable;
let injectableWebClient = new InjectableWebClient(scriptableContext, scriptableScriptable);
let client = android.webkit.WebViewClient;
ui.web.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36");


ui.web.loadUrl("https://www.surveymonkey.com/r/DXRYQBG")
storage = storages.create("survey");

t = new JavaAdapter(WebChromeClient, {
    onProgressChanged: function (content, progress) {
        if(progress==100){
            toast("加载完成")
        }
    },
    onConsoleMessage: function (content) {
        
    }
})

ui.web.setWebChromeClient(t)
ui.web.setWebViewClient(injectableWebClient)

//storage.put("finished", false);

if(storage.get("finished")){
    if(storage.get("finished")==true){
        next()
    }
}else{
    storage.put("finished", false);
}

threads.start(function(){
    while(true){
        ui.post(()=>{
            if(storage.get("finished")==false){
                if(ui.web.getUrl().includes("surveymonkey.com/survey-thanks")){
                    ui.web.loadUrl("https://www.surveymonkey.com/r/DXRYQBG")
                    ui.viewpager.currentItem = 1
                    next()
                }
            }else{
                ui.viewpager.currentItem = 1
            }
        })
        sleep(100)
    }
})

function next(){
    storage.put("finished", true);
    setTimeout(function(){
        engines.execScriptFile("./Alpha.js")
    },1000)
}