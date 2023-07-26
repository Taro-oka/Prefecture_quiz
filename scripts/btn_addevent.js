class btn_addEvents {
    constructor(arr, class_inview) {
        this.DOM = {};
        this.DOM.btn1 = document.querySelector(".refresh");
        this.DOM.btn2 = document.querySelector(".go");
        this.DOM.btn3 = document.querySelector(".close-btn");
        this.DOM.ops = document.getElementsByName("op"); 
        this.DOM.labels = document.querySelectorAll("label");
        this.DOM.gc = document.querySelector(".global-container");
        this.DOM.quiz = document.querySelector(".quiz");
        this.DOM.result = document.querySelector(".result");
        this.DOM.score_p = document.querySelector(".score");
        this.DOM.comment = document.querySelector(".comment");
        this.DOM.result_tbl = document.querySelector(".result__table tbody");
        
        this.NonDOM = {};
        this.NonDOM.arr = arr;
        this.NonDOM.cnt = 0;
        this.NonDOM.next = true;
        this.NonDOM.ans_pre = "";
        this.NonDOM.ans_city = "";
        this.NonDOM.balance_sheet = {
            "osaka": "大阪",
            "hyogo": "兵庫",
            "kyoto": "京都",
            true : "〇",
            false: "✕",
        }
        this.NonDOM.inview = class_inview;

        this.func = {};
        this.func.btn1 = this._innit_btn1;
        this.func.btn2 = this._innit_btn2;
        this.func.test = this._innit_test;
    }

    addEvents_btn1() {
        const _this_ = this;
        this.DOM.btn1.addEventListener("click", function(event) {
            return _this_._innit_btn1(event);
        })
    }

    addEvents_btn2() {
        const _this_ = this;
        this.DOM.btn2.addEventListener("click", function(event) {
            return _this_._innit_btn2(event);
        })
    }

    addEvents_btn3() {
        const _this_ = this;
        this.DOM.btn3.addEventListener("click", function(event) {
            return _this_._innit_btn3(event);
        })
    }

    _innit_btn1() {
        const getReadyforNext = ()=> {
            // まずは初期設定を解除する
        this.DOM.btn1.textContent = "次へ";
        this.DOM.btn2.disabled = false;

        // 次へ行くpermissionがない時（確定が押されていない）時のalert
        if (this.NonDOM.next === false) {
            alert("確定を押してください");
            return "Can't be excecuted";
        }else{
            // 何もせず下へ
        }

        // 一回、選択されているラジオボタンを選択解除
        // ボタンのチェックを確認するために、カウントしていく変数
        let cnt = 0;
        for (const element of this.DOM.ops) {
            element.disabled = false;
                if(element.checked === true) {
                element.checked = false;
                cnt++;
                } 
        }

        // ラベルのdisabled用のクラスを削除する
        this.DOM.labels.forEach(ele => {
          ele.classList.remove("disabled");
        });
        
        // 全く選択されてなかったら一時中断する
         if(cnt === 0 && this.NonDOM.cnt != 0) {
            alert("選択して下さい");
            return "Not excecuted";
         }

        }
        const show_result = ()=> {
            // 結果を出す
            let score = 0;
            this.NonDOM.arr.forEach(ele => {
                if (ele[3] === true) {
                    score ++;
                }
            })

            // 結果を表示するためにクラスを付与
            this.DOM.gc.classList.add("inview");
            this.DOM.result.classList.add("inview");

            this.DOM.score_p.textContent = `${this.NonDOM.arr.length}点中${score}点です`;

            // 結果の表示
            // 表の作成
            for(let i = 1; i <= this.NonDOM.arr.length; i++) {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);

                this.DOM.result_tbl.appendChild(tr);
            }

            for(let i = 0; i < this.NonDOM.arr.length; i++) {
                const current_cell = this.DOM.result_tbl.children[i + 1];
                current_cell.children[0].textContent = this.NonDOM.arr[i][0];
                current_cell.children[1].textContent = this.NonDOM.balance_sheet[this.NonDOM.arr[i][1]];
                current_cell.children[2].textContent = this.NonDOM.balance_sheet[this.NonDOM.arr[i][2]];
                current_cell.children[3].textContent = this.NonDOM.balance_sheet[this.NonDOM.arr[i][3]];
                // 正解した問題と間違った問題によって〇と×を表示する
                if(this.NonDOM.arr[i][3] === false) {
                    current_cell.children[3].style = "color: red; font-weight: 700;";
                }else{
                    current_cell.children[3].style = "color: blue; font-weight: 600;";
                }
            }

            // メッセージを点数別に表示する（ちょっと遅らせて）
                const write_comment = function() {
                    let content;
                    if (score <= 3) {
                        content = "全然だめです( ﾉД`)"
                    }else if(score <= 6) {
                        content = "まあまあです((´∀｀))"
                    }else{
                        content = "よくできました！！！！"
                    }
                
                    this.DOM.comment.textContent = content;
                };

                setTimeout(write_comment.bind(this),2000);
        }
        const GoTo_nextQ = ()=> {
            // シャッフルされた配列の今の問題(cntの値)を表示する
            this.NonDOM.ans_pre = this.NonDOM.arr[this.NonDOM.cnt][1];
            this.NonDOM.ans_city = this.NonDOM.arr[this.NonDOM.cnt][0];

            // 問題を表示
            this.DOM.quiz.textContent = this.NonDOM.ans_city;
            
            // 一問終了するごとに、ここでcntを+1していく
            this.NonDOM.cnt ++;
            // 次にこれがtrueになるまでは、次の問題へ行くのを防ぐ（誤って2回クリックした場合など）
            this.DOM.next = false;
        }

        getReadyforNext();
         // 最後まで来たら、
         if(this.NonDOM.cnt >= this.NonDOM.arr.length) {
             // 全問題が修了した場合
            show_result();
        }else{
            // まだ問題が途中の場合
            GoTo_nextQ();
        }

    }

    _innit_btn2() {
        // console.log("ボタン2のメソッドです");

        let cnt = 0;
        for (let i = 0; i < this.DOM.ops.length; i++) {
        if (this.DOM.ops.item(i).checked) {
            cnt ++;
            this.NonDOM.arr[this.NonDOM.cnt - 1][2] = this.DOM.ops.item(i).value;
                // ↓正解ならnew dataの配列にtrue値を代入する
                if(this.DOM.ops.item(i).value === this.NonDOM.ans_pre) {
                    this.NonDOM.arr[this.NonDOM.cnt - 1][3] = true;
                // ↓不正解ならfalseを
                }else{
                    this.NonDOM.arr[this.NonDOM.cnt - 1][3] = false;
                }
                break;
                }
        }

        // ↓カウントがゼロ、つまり選択がされていない時は、alertを出す
        if(cnt === 0) {
            alert("選択されていないよ");
        }else{
        // それ意外の場合は、選択肢ボタンのdisabledをtrueにし、クリックできないようにする
        const set_disable = new disable_buttons(".go", "op", "label");
        // set_disable.disable_btn1();
        set_disable.disable_btn2();
        set_disable.disable_btn3();
        }

    }

    _innit_btn3() {
        this.DOM.result.classList.remove(this.NonDOM.inview);
        this.DOM.gc.classList.remove(this.NonDOM.inview);
        window.location.reload();
    }

    _innit_test() {
        console.log("test");
    }

}