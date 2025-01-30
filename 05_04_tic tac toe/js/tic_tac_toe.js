"use strict";

//flagが"wd-flag"のときwhitedieのターン、"bd-flag"のときblackdieのターン
let flag = "wd-flag";

//タ－ン数カウンター
let counter = 9;

//class="square" を取得
const squares = document.getElementsByClassName("square");

//Array に変換
// https://devloper.mozilla.org/ja/docs/web/JavaScript/Reference/Global_Objects/Array/from
const squaresArray = Array.from(squares);
//squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGameボタン取得

//Win or Lose Judgement Line
const line1 = JudgeLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgeLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgeLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgeLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgeLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgeLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgeLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgeLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

//Message
const msgtxt1 = '<p class = "image"><img src = "img/wd.jpg" width=61px height=61px></p><p class="text">Jerry Attack!</p>';
const msgtxt2 = '<p class = "image"><img src = "img/bd.webp" width=61px height=61px></p><p class="text ">Tom Attack!</p>';
const msgtxt3 = '<p class = "image"><img src = "img/wd.jpg" width=61px height=61px></p><p class="text animate__animated animate__fadeInBottomLeft">Jerry Win!!</p>';
const msgtxt4 = '<p class = "image"><img src = "img/bd.webp" width=61px height=61px></p><p class="text animate__animated animate__fadeInBottomRight">Tom Win!!</p>';
const msgtxt5 = '<p class = "image"><img src = "img/wd.jpg" width=61px height=61px><img src ="img/bd.webp" width=61px height=61px</p><p class="text animate__bounceIn">Draw!!</p>';

//********************************************* 
//ページ本体が読み込まれたタイミングで実行するコ－ド
//**********************************************
window.addEventListener("DOMContentLoaded",
    function () {
        //メッセージ　（最初はwhite dieのタ－ンから）
        setMessage("wd-turn");
    }, false
);

//************************************************ 
//Win or Lose Judgement Lineを配列化

//************************************************* 

//JavaScriptでfilterを使う方法: https://techacademy.jp/magazine/15575
function JudgeLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

//***************************************************** 
//squareをクリックしたときにイベント発火（はっか）
//*************************************************** 
//クリックしたsquareに, white dieかblack dieを表示。両像を表示したsquareはクリックできないようにする、win or lose Judgementの呼び出し


a_1.addEventListener("click",
    function () {
        isSelect(a_1);
    }, false
);
//上記のコ－ディングと下記のコーヂ－ディングは同じ意味
a_2.addEventListener("click", () => {
    isSelect(a_2);
});

a_3.addEventListener("click", () => {
    isSelect(a_3);
});

b_1.addEventListener("click", () => {
    isSelect(b_1);
});

b_2.addEventListener("click", () => {
    isSelect(b_2);
});

b_3.addEventListener("click", () => {
    isSelect(b_3);
});
c_1.addEventListener("click", () => {
    isSelect(c_1);
});
c_2.addEventListener("click", () => {
    isSelect(c_2);
});
c_3.addEventListener("click", () => {
    isSelect(c_3);
});

// ***************************************************
// クリックしたsquareにはwhite die か black die を　表示
// .表示したところはくりっくできないようにする。
//  .win or lose判定の呼び出し
// ***************************************************
function isSelect(selectSquare) {

    if (flag === "wd-flag") {
        selectSquare.classList.add("js-wd-checked");
        selectSquare.classList.add("js-unclickable");

        //white die win
        if (isWinner("White Die")) {
            setMessage("wd-win"); //display win message
            gameOver("White Die");
            return;
        }
        setMessage("bd-turn");
        flag = "bd-flag";

    } else {
        selectSquare.classList.add("js-bd-checked");
        selectSquare.classList.add("js-unclickable");

        //black die-win
        if (isWinner("Black Die")) {
            setMessage("bd-win");
            gameOver("Black Die");
            return;
        }
        setMessage("wd-turn");
        flag = "wd-flag";
    }

    //タ－ン数カウンター1する
    counter--;

    //タ－ン数＝0になったらDRAW
    if (counter === 0) {
        setMessage("Draw");
        gameOver("Draw");
    }
}

// **************************************************
// 勝敗判定（しょうはいはんてい）
// **************************************************
//classListの使い方まとめ：https://giita.com/tomokichi rubby/items/2460c5902d19b81cace5
function isWinner(symbol) {
    //some: 1つでも条件を満たしていればTrueを返す
    const result = lineArray.some(function (line) {
        //every: 全て条件を満たしていればTrueを返す
        const subResult = line.every(function (square) {
            if (symbol === "White Die") {
                return square.classList.contains("js-wd-checked");
            }
            if (symbol === "Black Die") {
                return square.classList.contains("js-bd-checked");
            }
        });
        //trueを返したlineをwinnerLineに代入
        if (subResult) { winningLine = line }

        return subResult;
    });
    return result;
}
// **************************************************
// メッセージ切り替え関数
// *************************************************

function setMessage(id) {
    switch (id) {
        case "wd-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "bd-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "wd-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "bd-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        case "Draw":
            document.getElementById("msgtext").innerHTML = msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}
// ***************************************************************
// ゲ－ム終了
// *************************************************************

function gameOver(status) {
    //all square unclickable
    squaresArray.forEach(function (square) {
       square.classList.add("js-unclickable"); 
    });


    //winEffect
    if(status==="White Die") {
        //winner-line white die high-light
        if (winningLine) {
          winningLine.forEach(function (square) {
            square.classList.add("js-wd_highLight");
          }); 
        }
          //white die win!! ==>snow color is pink
          $(document).snowfall({
            flakeColor :"rgb(237, 12, 192)",//snow color
            maxSpeed :3,
            minSpeed :1,
            maxSize : 20,
            minSize : 10,
            round : true//snow shape with round shape
          });
          
        } else if(status==="Black Die") {
        //winner-line Black  die high-light
         if(winningLine) {
            winningLine.forEach(function (square) {
              square.classList.add("js-bd_highLight");
            }); 
        }
        
            //black die win!! ==>snow color is pink
            $(document).snowfall({
              flakeColor :"rgb(175,238,238)",//snow color
              maxSpeed :3,
              minSpeed :1,
              maxSize : 20,
              minSize : 10,
              round : true//snow shape with round shape
            });
        }
    }


          
    
// **********************************************************
// NewGameボタン クリックとき、ゲ－ム初期化
// *********************************************************
//classListの使い方まとめ：https://gitta.com/tomokichi ruby/items/2460c5902d19b81cace5
