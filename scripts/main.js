// 元データをここで宣言
const main_data = [
    {
        id: 1,
        pref: "osaka",
        cities: ["枚方","吹田","東大阪"],
    },
    {
        id: 2,
        pref: "kyoto",
        cities: ["京都","亀岡","福知山"],
    },
    {
        id: 3,
        pref: "hyogo",
        cities: ["神戸","西宮","尼崎"],
    },
];

// 問題を格納し、シャッフルするための配列をここで作る
const new_data = [];
main_data.forEach(val => {
    for (let i = 0; i < val.cities.length; i++) {
        new_data.push([val.cities[i],val.pref,"",false]);
    }
});
// ここでシャッフルする
for(let i = (new_data.length - 1); 0 < i; i--){
    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));
    // 要素の並び替えを実行
    let tmp = new_data[i];
    new_data[i] = new_data[r];
    new_data[r] = tmp;
  }

// 答えとなる値を格納するための変数をグローバルで
let cnt = 0;
let ans_pre;
let ans_city;
let next = true;

// 初期状態ではdisabledに
const go = document.querySelector(".go");
go.disabled = true;
for (const element of document.getElementsByName('op')){
    element.disabled = true;
}
const label = document.querySelectorAll("label");
label.forEach(ele => {
    ele.classList.add("disabled");
});


// 結果を送信するボタンにイベント追加
go.addEventListener("click",function() {
    const ops = document.getElementsByName("op");
    const len = ops.length;
    let ans_times = 0;
    // opのボタンを全部回って正解かチェックする
    for (let i = 0; i < len; i++) {
        if (ops.item(i).checked) {
            ans_times ++;
            new_data[cnt - 1][2] = ops.item(i).value;
            if(ops.item(i).value === ans_pre) {
                new_data[cnt - 1][3] = true;
                // alert("正解！");
            }else{
                new_data[cnt - 1][3] = false;
                // alert("NOOO");
            }
            break;
        }
    }
    if(ans_times === 0) {
        alert("選択されていないよ");
    }else{
        for (const element of document.getElementsByName('op')){
            element.disabled = true;
            next = true;
        }
        label.forEach(ele => {
            ele.classList.add("disabled");
        });
    }
});

// 次へボタンにイベントを追加
const refresh_btn = document.querySelector(".refresh");
refresh_btn.addEventListener("click", function() {

    // 文字列を「次へ」に変更する
    refresh_btn.textContent = "次へ";
    go.disabled = false;

    if (next === false) {
        alert("確定を押してください");
        return "Can't be excecuted";
    }else{
        // 何もせず下へ
    }

    // 一回、選択されているラジオボタンを選択解除
    let checked_cnt = 0;
    for (const element of document.getElementsByName('op')) {
        element.disabled = false;
        if(element.checked === true) {
            element.checked = false;
            checked_cnt++;
        } 
    }
    label.forEach(ele => {
        ele.classList.remove("disabled");
    });

    // 全く選択されてなかったら一時中断する
    if(checked_cnt === 0 && cnt != 0) {
        alert("選択して下さい");
        return "Not excecuted";
    }

    if(cnt >= new_data.length) {
        // 結果を出す
        let score = 0;
        new_data.forEach(ele => {
            if (ele[3] === true) {
                score ++;
            }
        })
        const gc = document.querySelector(".global-container");
        const result = document.querySelector(".result");
        const score_p = document.querySelector(".score")
        const comment = document.querySelector(".comment");
        
        gc.classList.add("inview");
        result.classList.add("inview");

        score_p.textContent = `${new_data.length}点中${score}点です`;

        // 結果の表示
        // 表の作成
        const result_tbl = document.querySelector(".result__table tbody");
        
        for(let i = 1; i <= new_data.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            result_tbl.appendChild(tr);
        }

        // データの書き入れ
        // 対照表を宣言する
        const balance_sheet = {
            "osaka": "大阪",
            "hyogo": "兵庫",
            "kyoto": "京都",
            true : "〇",
            false: "✕",
        }

        for(let i = 0; i < new_data.length; i++) {
            const current_cell = result_tbl.children[i + 1];
            current_cell.children[0].textContent = new_data[i][0];
            current_cell.children[1].textContent = balance_sheet[new_data[i][1]];
            current_cell.children[2].textContent = balance_sheet[new_data[i][2]];
            current_cell.children[3].textContent = balance_sheet[new_data[i][3]];

            if(new_data[i][3] === false) {
                current_cell.children[3].style = "color: red; font-weight: 700;";
            }else{
                current_cell.children[3].style = "color: blue; font-weight: 600;";
            }
        }

        setTimeout(function(){
            let content;
            if (score <= 3) {
                content = "全然だめです( ﾉД`)"
            }else if(score <= 6) {
                content = "まあまあです((´∀｀))"
            }else{
                content = "よくできました！！！！"
            }
            comment.textContent = content;
        },2000);

    }else{
        // シャッフルされた配列を0から順に
        ans_pre = new_data[cnt][1];
        ans_city = new_data[cnt][0];
    
        const quiz = document.querySelector(".quiz");
        quiz.textContent = ans_city;
    
        cnt++;
        next = false;
    }
});

// resultの閉じるボタンにイベントを追加する
const close_btn = document.querySelector(".close-btn");
close_btn.addEventListener("click", function() {
    
    // 余計なクラスを除去する
    const result = document.querySelector(".result");
    const gc = document.querySelector(".global-container");
    
    result.classList.remove("inview");
    gc.classList.remove("inview");
    
    // ページをリロード
    window.location.reload();
});


