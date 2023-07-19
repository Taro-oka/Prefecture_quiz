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

function create_array(obj) {
    // 問題を格納し、シャッフルするための配列をここで作る
    const new_data = [];

    obj.forEach(val => {
        for (let i = 0; i < val.cities.length; i++) {
            new_data.push([val.cities[i],val.pref,"",false]);
        }
    });

    // ここで全データをシャッフルする
    for(let i = (new_data.length - 1); 0 < i; i--){
        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));
        // 要素の並び替えを実行
        let tmp = new_data[i];
        new_data[i] = new_data[r];
        new_data[r] = tmp;
    }    

    return new_data;
}
