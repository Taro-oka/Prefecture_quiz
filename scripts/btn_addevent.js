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
        // console.log("This is btn1");

        if(getReadyforNext.bind(this)()[0] === false) {
            return [false, "can't be excetuted"]
        }

        // if no retured value, it means successfully done!
        if(this.NonDOM.cnt >= this.NonDOM.arr.length) {
            // after all the questions
            show_result.bind(this)();
        }else{
            // still in the middle
            GoTo_nextQ.bind(this)();
        }
        
        function getReadyforNext() {

            // change btn1 textcontent to "次へ"
            fix_btn1_setting.bind(this)();

            // Prevent moving to next (in case clicked mistakenly)
            if(disable_radios.bind(this)() === false) {
                return [false, "None selected"]
            }else if(check_gotoNext.bind(this)() === false){
                return [false, "Not confirmed yet"]
            }else{
                // if true retured...
                // activate disabled options, and...  
                classList_remove_disabled.bind(this)();
                // ban the next move UNTIL btn2 is clicked 
                this.NonDOM.next = false;
                return [true, "Go"]
            }
            
        
            // ↓ BELOW ↓ getReadyforNextのfunction ---------------------------
            function fix_btn1_setting(){
            // Activate the buttons
                this.DOM.btn1.textContent = "次へ";
                this.DOM.btn2.disabled = false;
            }
            
            function check_gotoNext() {
                // if "確定" is not clicked this will show up
                if (this.NonDOM.next === false) {
                    alert("確定を押してください");
                    return false;
                }else{
                    return true;
                }
            }
            
            function disable_radios() {
                // disable all the radio buttons
                // cnt : counter variable
                let cnt = 0;
                for (const element of this.DOM.ops) {
                    element.disabled = false;
                        if(element.checked === true) {
                        element.checked = false;
                        cnt++;
                        } 
                }
                // if none of the radio btns are selected
                 if(cnt === 0 && this.NonDOM.cnt != 0) {
                    alert("選択して下さい");
                    return false;
                }else{
                    return true;
                }
            }
            
            function classList_remove_disabled(){
                // remove the disabled class
                this.DOM.labels.forEach(ele => {
                  ele.classList.remove("disabled");
                });
            }
        
        }

        function show_result() {
            let score = 0;
            calc_score.bind(this)();
            classlist_add_inview.bind(this)();
            create_table.bind(this)();
            display_result.bind(this)();
            message.bind(this)();

            function calc_score() {
                // 結果を出す
                this.NonDOM.arr.forEach(ele => {
                    if (ele[3] === true) {
                        score ++;
                    }
                })
            }
            
            function classlist_add_inview(){
                // 結果を表示するためにクラスを付与
                this.DOM.gc.classList.add("inview");
                this.DOM.result.classList.add("inview");
        
                this.DOM.score_p.textContent = `${this.NonDOM.arr.length}点中${score}点です`;
            }
    
            function create_table() {
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
            }
            
            function display_result(){
                 // 結果の表示
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
            }
           
            function message() {
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
        
        }

        function GoTo_nextQ() {
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
    }

    _innit_btn2() {
        // console.log("This is btn2");

        const t = Pass_to_array_and_Count.bind(this)(0);        
        if(get_ready_to_next.bind(this)(t)) {    
            // 最後にネクストを許可する
            this.NonDOM.next = true;
        }else{
            this.NonDOM.next = false;
        }

        function Pass_to_array_and_Count(cnt) {
            // put Anser you picked and True/Flase(Correct or not)
            for (let i = 0; i < this.DOM.ops.length; i++) {
                // if the btn is checked
                if (this.DOM.ops.item(i).checked) {
                cnt ++;
                
                // Put what you selected in the array (maybe correct, maybe not)
                this.NonDOM.arr[this.NonDOM.cnt - 1][2] = this.DOM.ops.item(i).value;

                    // ↓正解ならnew dataの配列にtrue値を代入する
                    if(this.DOM.ops.item(i).value === this.NonDOM.ans_pre) {
                        this.NonDOM.arr[this.NonDOM.cnt - 1][3] = true;
                    // ↓不正解ならfalseを
                    }
                    else{
                        this.NonDOM.arr[this.NonDOM.cnt - 1][3] = false;
                    }
                    
                    // One checked btn is found, then break
                    break;
                    console.log("this should not be seen, just to check");
                
                }else{
                    // do nothing and go to next i
                }
            }
            // return the value at last
            return cnt;
        }
        
        function get_ready_to_next(cnt) {
            // ↓カウントがゼロ、つまり選択がされていない時は、alertを出す
            if(cnt === 0) {
                alert("選択されていないよ");
                return false;
            }else{
                // それ意外の場合は、選択肢ボタンのdisabledをtrueにし、クリックできないようにする
                const set_disable = new disable_buttons(".go", "op", "label");
                // set_disable.disable_btn1();
                set_disable.disable_btn2();
                set_disable.disable_btn3();
                return true;
            }
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