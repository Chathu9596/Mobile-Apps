"use strict";
//ぺ－ジ本体が読み込まれたタイミングで実行するコ－ド
window.addEventListener(
    "DOMContentLoaded",
    function () {

        //1.localstorageが使えるか確認
        if (typeof localstorage === "unfined") {
            this.window.alert("このブラウザはLocal Storage機能が実装さえていません");
            return;
        } else {
            viewStorage(); //localStorageからのデ－タ取得とテ－ブルへ表示
            saveLocalStorage(); //2.localStorageへの保存
        }
    }, false
);

//2.localstorage保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;


            //値の入力チェック
            if (key == "" || value == "") {
                window.alert("Key, Memoはいずれも必須です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage(); //localStorageからのデ－タ取得とテ－ブルへ表示
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";

            }
        },false
    );
};

//localStorageからのデ－タ取得とテ－ブルへ表示
function viewStorage()  {
    const list = document.getElementById("list");
    //htmlのテ－ブル初期化
    while(list.rows[0]) list.deleteRow(0);

    //localStorageすべての情報の取得
    for (let i=0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);

        //localStorageのキ－と値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
}