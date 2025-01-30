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
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

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
const msgtxt1 = '<p class = "image animate__animated animate__zoomIn"><img src = "img/wd.jpg" width=70px height=70px></p><p class="text animate__animated animate__zoomIn">Pink Die Attack!(your turn)</p>';
const msgtxt2 = '<p class = "image animate__animated animate__zoomIn"><img src = "img/bd.jpg" width=70px height=70px></p><p class="text animate__animated animate__zoomIn">Blue Die Attack!(computer turn)</p>';
const msgtxt3 = '<p class = "image animate__animated animate__fadeInBottomLeft"><img src = "img/wd.jpg" width=70px height=70px></p><p class="text animate__animated animate__fadeInBottomLeft">Pink Die Win!!</p>';
const msgtxt4 = '<p class = "image animate__animated animate__fadeInBottomRight"><img src = "img/bd.jpg" width=70px height=70px></p><p class="text animate__animated animate__fadeInBottomRight">Blue Die Win!!</p>';
const msgtxt5 = '<p class = "image animateanimated animate__bounceIn"><img src = "img/wd.jpg" width=70px height=70px><img src ="img/bd.jpg" width=70px height=70px</p><p class="text animateanimated animate__bounceIn">Draw!!</p>';


//sounnd
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/wd-win_sound.mp3", "sound/bd-win_sound.mp3", "sound/Draw_sound.mp3"];
//********************************************* 
//ページ本体が読み込まれたタイミングで実行するコ－ド
//**********************************************
window.addEventListener("DOMContentLoaded",
    function () {
        //メッセージ　（最初はwhite dieのタ－ンから）
        setMessage("wd-turn");

        //squareがウリック可能か判断するクラスをつうか
        squaresArray.forEach(function (square) {
            square.classList.add("js-clickable");
        });
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
squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {
        let gameOverFlag = isSelect(square);

        //gameoverでわない場合、クマノタ－ン(auto）
        if (gameOverFlag === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function () {
                    bdTurn();
                },
                "2000"

            );
        }
    });
});

// a_1.addEventListener("click",
//     function () {
//         isSelect(a_1);
//     }, false
// );
// //上記のコ－ディングと下記のコーヂ－ディングは同じ意味
// a_2.addEventListener("click", () => {
//     isSelect(a_2);
// });

// a_3.addEventListener("click", () => {
//     isSelect(a_3);
// });

// b_1.addEventListener("click", () => {
//     isSelect(b_1);
// });

// b_2.addEventListener("click", () => {
//     isSelect(b_2);
// });

// b_3.addEventListener("click", () => {
//     isSelect(b_3);
// });
// c_1.addEventListener("click", () => {
//     isSelect(c_1);
// });
// c_2.addEventListener("click", () => {
//     isSelect(c_2);
// });
// c_3.addEventListener("click", () => {
//     isSelect(c_3);
// });

// ***************************************************
// クリックしたsquareにはwhite die か black die を　表示
// .表示したところはくりっくできないようにする。
//  .win or lose判定の呼び出し
// ***************************************************
function isSelect(selectSquare) {
    let gameOverFlag = "0";
    if (flag === "wd-flag") {
        //click sound
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-wd-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        //white die win
        if (isWinner("White Die")) {
            setMessage("wd-win"); //display win message
            gameOver("wd-win");
            return gameOverFlag = "1";
        }
        setMessage("bd-turn");
        flag = "bd-flag";

    } else {
        //click sound
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-bd-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");


        //black die-win
        if (isWinner("Black Die")) {
            setMessage("bd-win");
            gameOver("bd-win");
            return gameOverFlag = "1";
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
        return gameOverFlag = "1";
    }
    return gameOverFlag = "0";
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
    //GameOver Sound
    let w_sound
    switch (status) {
        case "wd-win":
            w_sound = gameSound[2];
            break;
        case "bd-win":
            w_sound = gameSound[3];
            break;
        case "Draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    //all square unclickable
    // squaresArray.forEach(function (square) {
    // square.classList.add("js-unclickable");
    //});
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");

    newgamebtn_display.classList.remove("js-hidden");

    //winEffect
    if (status === "wd-win") {
        //winner-line white die high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-wd_highLight");
            });
        }
        //white die win!! ==>snow color is pink
        $(document).snowfall({
            flakeColor: "rgba(244, 85, 212, 0.9)",//snow color
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true//snow shape with round shape
        });

    } else if (status === "bd-win") {
        //winner-line Black  die high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bd_highLight");
            });
        }

        //black die win!! ==>snow color is blue
        $(document).snowfall({
            flakeColor: "rgb(175,238,238)",//snow color
            maxSpeed: 4,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true//snow shape with round shape
        });
    }
}




// **********************************************************
// NewGameボタン クリックとき、ゲ－ム初期化
// *********************************************************
//classListの使い方まとめ：https://gitta.com/tomokichi ruby/items/2460c5902d19b81cace5
newgamebtn.addEventListener("click", function () {
    //wdのタ－ン
    flag = "wd-flag";
    //タ－ン数カウンター
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
        square.classList.remove("js-wd-checked");
        square.classList.remove("js-bd-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-wd_highLight");
        square.classList.remove("js-bd_highLight");
        square.classList.add("js-clickable");
    });
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");

    setMessage("wd-turn");
    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop

    $(document).snowfall("clear");
});

//*************************************************** */
//black die タ－ン
// *****************************************************
function bdTurn() {
    let bdTurnEnd = "0";
    let gameOverFlag = "0";

    while(bdTurnEnd ==="0"){
        //blackdieリ－チ行検索（attack)
        bdTurnEnd = isReach("bd");
        if (bdTurnEnd === "1") {
            gameOverFlag = "1";
            break;
        }

        //white die リ－チ行検索（attack)
        bdTurnEnd = isReach("wd");
        if (bdTurnEnd === "1") {
            break;
       
        }
    

    // またまうす目を選んでない場合、クリックできるマス目をランダムに選ぶ
        const blackSquare = squaresArray.filter(function (square) {
        return square.classList.contains("js-clickable");
    });

    let n = Math.floor(Math.random() * blackSquare.length);
    gameOverFlag = isSelect(blackSquare[n]);
    break;//while を終了
}

    //GameOverではない場合,
    if (gameOverFlag === "0") {
        const squaresBox = document.getElementById("squaresBox");
        squaresBox.classList.remove("js-unclickable");//squares-boxをくりっくできないようにする
    }
}

// *************************************************************************
// リ－チ行を探す
// *************************************************************************

function isReach(status) {
    let bdTurnEnd = "0";

    lineArray.some(function (line) {
        let wdCheckCnt = 0;
        let bdCheckCnt = 0;

        line.forEach(function(square){
          if(square.classList.contains("js-wd-checked")){
            bdCheckCnt++; //bdがチェックされている数
          }  
          if(square.classList.contains("js-bd-checked")){
            wdCheckCnt++; //bdがチェックされている数
          }  
      });

      //bdのリ－チ行検索ときに、ｗｄリ－チ行あり
      if (status === "wd" && bdCheckCnt === 2 && wdCheckCnt === 0) {
        bdTurnEnd = "1";//bdのリ－チ行あり
      }

      //bdがwdのリ－チ行ありの場合、空いているbdめをえらんでする
      if(bdTurnEnd === "1"){
        line.some(function (square) {
            if(square.classList.contains("js-clickable")){
                isSelect(square);
                return true; //line 414のline.someのぉloopをぬげる
            }
        })
        return true;
      }
    });
    return bdTurnEnd;
}