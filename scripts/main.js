// Declare global variables if necessary

// Make a new array( !! "main/data" is in the data file)
const new_data = create_array(main_data);

// When loaded, 
document.addEventListener("DOMContentLoaded", function() {
    
    // get the screen ready (disable buttons)
    const set_default = new disable_buttons(".go", "op", "label");
    set_default.disable_btn1();
    set_default.disable_btn2();
    set_default.disable_btn3();

    // Create instance of class -- to add evnets to the three buttons(start/next btn, comfirm btn, close btn on the result sheet)
    const addEvents = new btn_addEvents(new_data, "inview");
    addEvents.addEvents_btn1();
    addEvents.addEvents_btn2();
    addEvents.addEvents_btn3();

});