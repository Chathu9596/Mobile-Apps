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
                let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\n保存しますか？");
                //確認ダイアログ[OK]を押されたとき、ほぞんする
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage(); //localStorageからのデ－タ取得とテ－ブルへ表示
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};


//3.localStorageから選択されている行を削除　　　　//version-up3  chg  1件削除　==> 選択されている行を削除
function deleteLocalStorage() {
    const del = document.getElementById("delete");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");//version-up3 add
            const table1 = document.getElementById("table1");     //version-up3 add
            let w_cnt = "0"; //選択されているチェックボックスの返却される　　//version-up3  add
            w_cnt = selectCheckBox("del");//テ－ブルからデータ選択 version-up3 chg: 戻り値：w_sel ==> w_cnt 引く数：なし==>"del"


            if (w_cnt >= 1) {     //verson-up3  chg  w_sel === "1" ==> w_cnt >= 1
                //const key = document.getElementById("textKey").value;
                //const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか？");  // version-up3 chg
                //確認ダイアログ[OK]を押されたとき、削除する　　version-up1  add

                if (w_confirm === true) {
                    for(let i = 0; i < chkbox1.length; i++) {  //version-up3 add
                        if (chkbox1[i].checked) {  //version-up3  add
                            localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data); // version- up3 chg
                        }  //version-up3 add
                    }  //version-up3  add

                    viewStorage();//localstorageからデータの取得とテ－ブルへ表示
                    let w_msg = "LocalStorageから" + w_cnt + "件を削除 (delete) しました。"; //version-up3 chg
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
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
            let w_confirm = window.confirm("LocalStorageのデータをすべて削除 (delete) します。\nよろしいですか"); //確認ダイアログで[OK]を押さわれた時、全て削除する
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();//localstorageからデータの取得とテ－ブルへ表示
                let w_msg = "LocalStorageからデータを全て削除 (delete) しました。";
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
            selectCheckBox(select);//テ－ブルからデ－タ選択  //version-up3 chg   引数：なし==>"select"
        }, false
    );
};


//テ－ブルからデ－タ選択
function selectCheckBox(mode) {  //version-up3  引数：なし==> mode
    //let w_sel = "0"; //選択されていれば, "1"にする  //version-up3 del
    let w_cnt = 0; //選択されているチェックボックスの数　　//verson-up2 add
    const chkbox1 = document.getElementsByName("chkbox1"); //version-up2 chg: radio1 ==> chkbox1
    const table1 = document.getElementById("table1");
    let w_textKey = ""; //work version-up2 add
    let w_textMemo = ""; //work version-up2 add


    for (let i = 0; i < chkbox1.length; i++) { // version-up2 chg: radio1 ==> chkbox1
        if (chkbox1[i].checked) { // version-up2 chg: radio1 ==> chkbox1
            if (w_cnt === 0) { // 最初にチェックされえいる行をワ－クに退避　version-up2add
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                // return w_sel = "1"; version -up2 del

            }// version-up2 add
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;// version-up2 add
    document.getElementById("textMemo").value = w_textMemo;// version-up2 add

    //選択ボタンをおされたときのチェックロジック
    if (mode === "select") {
        if (w_cnt === 1) {// version-up2 add
            return w_cnt;// version-up2 add
        } else {// version-up2 add
            window.alert("1つ選択 (select)  してください。");// version-up2 add
        }
    }


    //削除ボタンをおされたときのチェックロジック
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            window.alert("1つ以上選択 (select)  してください。");// version-up2 add
        }
    }
};



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

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    //jQueryのplugin tablesorterを使ってテ－ブルのノート
    //sortList: 引数1...最初からノートしておく例を提出、引数2...0...昇順,1...降順
    $("#table1").tablesorter({  //tablesort add
        sortList: [[1, 0]]       //tablesort add  
    });

    $("#table1").trigger("update"); //tablesort add
}