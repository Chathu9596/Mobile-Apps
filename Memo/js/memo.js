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
                let clickSound = new Audio('sounds/sound1.wav');
                clickSound.play();
                Swal.fire({
                    backgroundimage:"img/abk.jpg"
                    ,title: "Memo app" //タイトルをここに設定
                    , html: "Key, Memoはいずれも必須です。"//メッセージ内容をここに設定
                    ,imageUrl:"img/o2.webp"
                    /*, type: "error" //ダイアログにアイコンを表示したい場合に設定する引数　warning,wrror,success,info,question*/
                    , allowOutsideClick: false  //w枠外クリックは許可しない
                });
                return;
            } else {
                let clickSound = new Audio('sounds/sound2.wav');
                clickSound.play();
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\n保存 (save) しますか?";
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg//メッセージ内容をここに設定
                    ,imageUrl:"img/q1.avif"
                    , showCancelButton: true //キャンセルボタン表示
                }).then(function (result) {
                    //確認ダイアログ[OK]を押されたとき、ほぞんする
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage(); //localStorageからのデ－タ取得とテ－ブルへ表示
                        let clickSound = new Audio('sounds/sound3.wav');
                        clickSound.play();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存 (save) しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg//メッセージ内容をここに設定
                            ,imageUrl:"img/ok1.jpg"
                            /*, type: "success" //ダイアログにアイコンを表示したい場合に設定する引数　warning,wrror,success,info,question*/
                            , allowOutsideClick: false  //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
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
                let clickSound = new Audio('sounds/sound2.wav');
                clickSound.play();
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか？";  // version-up3 chg
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg//メッセージ内容をここに設定
                    ,imageUrl:"img/q1.avif"
                    , showCancelButton: true //キャンセルボタン表示
                }).then(function (result) {

                    //確認ダイアログ[OK]を押されたとき、削除する　　version-up1  add
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {  //version-up3 add
                            if (chkbox1[i].checked) {  //version-up3  add
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data); // version- up3 chg
                            }  //version-up3 add
                        }  //version-up3  add

                        viewStorage();//localstorageからデータの取得とテ－ブルへ表示
                        let clickSound = new Audio('sounds/sound3.wav');
                        clickSound.play();
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除 (delete) しました。"; //version-up3 chg
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg//メッセージ内容をここに設定
                            ,imageUrl:"img/ok4.webp"
                            /*, type: "success" //ダイアログにアイコンを表示したい場合に設定する引数　warning,wrror,success,info,question*/
                            , allowOutsideClick: false  //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }

                });
            }

        }, false
    );

    //version-up5vadd-str
    // table1 ///////////////////////////////////////////////////////////////////////////////////
    function del2_row() {
        const table2 = document.getElementById("table2");
        table2.addEventListener("click", (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
            if(e.target.classList.contains("trash") === true){
                let tr = e.target.parentNode.parentNode;
                tr.parentNode.deleteRow(tr.sectionRowIndex); // trのインデックスを取得して行を削除する
            }
        });
      }   
       const table1 = document.getElementById("table1");
       table1.addEventListener("click", (e) => {
       if(e.target.classList.contains("trash") === true){
        let index = e.target.parentNode.parentNode.rowIndex
        const key = table1.rows[index].cells[1].firstChild.data;
        const value = table1.rows[index].cells[2].firstChild.data;
        let clickSound = new Audio('sound/sound2.wav');
        clickSound.play();
        let w_delete = `LocalStorageから\n 「${key} ${value}」\nを削除しますか?`;
        Swal.fire({
            title : "Memo app",
            html : w_delete,
            imageUrl:"img/q1.avif",
            showCancelButton : true
        }).then(result => {
            if(result.value === true){
                localStorage.removeItem(key);
                viewStorage();
                let clickSound = new Audio('sounds/sound3.wav');
                clickSound.play();
                let w_msg = `LocalStorageから\n 「${key} ${value}」を削除しました！`;
                Swal.fire({
                    title : "Memo app",
                    html : w_msg,
                    imageUrl:"img/ok4.jpg",
                    allowOutsideClick : false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";

            }
        })
       } 
    } )
};

////4.localStorageから全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let clickSound = new Audio('sounds/sound2.wav');
            clickSound.play();
            let w_msg = "LocalStorageのデータをすべて削除 (delete) します。\nよろしいですか"; //確認ダイアログで[OK]を押さわれた時、全て削除する
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: w_msg//メッセージ内容をここに設定
                ,imageUrl:"img/q1.avif"
                , showCancelButton: true //キャンセルボタン表示  
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();//localstorageからデータの取得とテ－ブルへ表示
                    let clickSound = new Audio('sounds/sound3.wav');
                    clickSound.play();
                    let w_msg = "LocalStorageからデータを全て削除 (delete) しました。";
                    Swal.fire({
                        title: "Memo app" //タイトルをここに設定
                        , html: w_msg//メッセージ内容をここに設定
                        , imageUrl:"img/ok2.jpg"
                        , allowOutsideClick: false  //枠外クリックは許可しない
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";

                }
            });
        }, false
    );
};


//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault;
            selectCheckBox("select");//テ－ブルからデ－タ選択  //version-up3 chg   引数：なし==>"select"
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
        }
        else {// version-up2 add
            //window.alert("1つ選択 (select)  してください。");// version-up2 add
            let clickSound = new Audio('sounds/sound1.wav');
            clickSound.play();
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ選択 (select)  してください。"//メッセージ内容をここに設定
                ,imageUrl:"img/o3.jpg"
                /*, type: "error" //ダイアログにアイコンを表示したい場合に設定する引数　warning,wrror,success,info,question*/
                , allowOutsideClick: false  //w枠外クリックは許可しない
            });
        }
    }


    //削除ボタンをおされたときのチェックロジック
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            //window.alert("1つ以上選択 (select)  してください。");// version-up2 add
            let clickSound = new Audio('sounds/sound1.wav');
            clickSound.play();
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ以上選択 (select)  してください。"//メッセージ内容をここに設定
                ,imageUrl:"img/o4.jpg"
                , allowOutsideClick: false  //w枠外クリックは許可しない
            });
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
        let td4 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";

    }

    //jQueryのplugin tablesorterを使ってテ－ブルのノート
    //sortList: 引数1...最初からノートしておく例を提出、引数2...0...昇順,1...降順
    $("#table1").tablesorter({  //tablesort add
        sortList: [[1, 0]]       //tablesort add  
    });

    $("#table1").trigger("update"); //tablesort add
}