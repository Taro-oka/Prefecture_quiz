// Original data here
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

function create_array(obj) {
    // Make a new array ---- add Qestions, Answers, Answers slected, and Correct or not
    const new_data = [];

    // column1 -- city(Question), column2 -- prefecture name(Answer), column3 -- prefecture name(Answer you pick), column4 -- true/false(Correct or not)
    obj.forEach(val => {
        for (let i = 0; i < val.cities.length; i++) {
            new_data.push([val.cities[i],val.pref,"",false]);
        }
    });

    // Shuffle all 
    for(let i = (new_data.length - 1); 0 < i; i--){
        // get a randome num number between 0〜(i+1)
        let r = Math.floor(Math.random() * (i + 1));
        // Exchange elements in the for loop
        let tmp = new_data[i];
        new_data[i] = new_data[r];
        new_data[r] = tmp;
    }    
     
    // Array done
    return new_data;
}
