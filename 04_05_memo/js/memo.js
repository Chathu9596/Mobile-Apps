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
            deleteLocalStorage();//3.localStorageから1削除
            allClearLocalStorage();//4.localStorageから全て削除
            selectTable(); //5.データ選択
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
        }, false
    );
};


//3.localStorageから1削除
function deleteLocalStorage() {
    const del = document.getElementById("delete");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0"; //選択されていれば、”1”が返却される
            w_sel = selectRadioBtn();//テ－ブルからデータ選択

            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                localStorage.removeItem(key);
                viewStorage();//localstorageからデータの取得とテ－ブルへ表示
                let w_msg = "LocalStorageから" + key + " " + value + "を削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";

            }
        }, false
    );
};

////4.localStorageから全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageのデータをすべて削除します。\nよろしいですか"); //確認ダイアログで[OK]を押さわれた時、全て削除する
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();//localstorageからデータの取得とテ－ブルへ表示
                let w_msg = "LocalStorageからデータを全て削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";

            }
        }, false
    );
};


//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault;
            selectRadioBtn();//テ－ブルからデ－タ選択
        }, false
    );
};


//テ－ブルからデ－タ選択
function selectRadioBtn() {
    let w_sel = "0"; //選択されていれば, "1"にする
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");


    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i + 1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
            return w_sel = "1";

        }
    }
    window.alert("1つ選択(select) してください。");
}


//localStorageからのデ－タ取得とテ－ブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのテ－ブル初期化
    while (list.rows[0]) list.deleteRow(0);

    //localStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
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

    //jQueryのplugin tablesorterを使ってテ－ブルのノート
    //sorlist: 引数1...最初からノートしておく例を提出、引数2...0...昇順,1...降順
    $("#table1").tablesorter({  //tablesort add
        sortList: [[1, 0]]       //tablesort add  
    });

    $("#table1").trigger("update"); //tablesort add
}