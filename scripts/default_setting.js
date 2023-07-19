class disable_buttons {
    constructor(btn1, btn2, btn3) {
        this.DOM = {};
        this.DOM.btn1 = document.querySelector(btn1);
        this.DOM.btn2 = document.getElementsByName(btn2);
        this.DOM.btn3 = document.querySelectorAll(btn3);
    }

    disable_btn1() {
        this.DOM.btn1.disabled = true;
    }

    disable_btn2() {
        for (const element of this.DOM.btn2){
            element.disabled = true;
        } 
    }

    disable_btn3() {
        this.DOM.btn3.forEach(ele => {
            ele.classList.add("disabled");
        });
    }
}   