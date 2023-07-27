// Original data here（もとデータ）
const main_data = [
    {
        id: 1,
        pref: "osaka",
        cities: ["大阪市","堺市","堺市","能勢町","豊能町","池田市","箕面市","豊中市","茨木市","高槻市","島本町","吹田市","摂津市","枚方市","交野市","寝屋川市","守口市","門真市","四條畷市","大東市","東大阪市","八尾市","柏原市","和泉市","高石市","泉大津市","忠岡町","岸和田市","貝塚市","熊取町","泉佐野市","田尻町","泉南市","阪南市","岬町","松原市","羽曳野市","藤井寺市","太子町","河南町","千早赤阪村","富田林市","大阪狭山市","河内長野市"],
    },
    {
        id: 2,
        pref: "kyoto",
        cities: ["京都市","宇治市","亀岡市","長岡京市","舞鶴市","木津川市","福知山市","城陽市","京田辺市","八幡市","向日市","京丹後市","精華町","綾部市","南丹市","与謝野町","宮津市","大山崎町","久御山町","京丹波町","宇治田原町","井手町","和束町","南山城村","伊根町","笠置町"],
    },
    {
        id: 3,
        pref: "hyogo",
        cities: ["神戸市","姫路市","尼崎市","明石市","西宮市","洲本市","芦屋市","伊丹市","相生市","豊岡市","加古川市","赤穂市","西脇市","宝塚市","三木市","高砂市","川西市","小野市","三田市","加西市","丹波篠山市","養父市","丹波市","南あわじ市","朝来市","淡路市","宍粟市","加東市","たつの市","猪名川町","多可町","稲美町","播磨町","市川町","福崎町","神河町","太子町","上郡町","佐用町","香美町","新温泉町"],
    },
    {
        id: 4,
        pref: "shiga",
        cities: ["大津市","彦根市","長浜市","近江八幡市","草津市","守山市","栗東市","甲賀市","野洲市","湖南市","高島市","東近江市","米原市","日野町","竜王町","愛荘町","豊郷町","甲良町","多賀町"],
    },
    {
        id: 5,
        pref: "wakayama",
        cities: ["和歌山市","海南市","橋本市","有田市","御坊市","田辺市","新宮市","紀の川市","岩出市","紀美野町","かつらぎ町","九度山町","高野町","湯浅町","広川町","有田川町","美浜町","日高町","由良町","印南町","みなべ町","日高川町","白浜町","上富田町","すさみ町","那智勝浦町","太地町","古座川町","北山村","串本町"],
    },
    {
        id: 4,
        pref: "nara",
        cities: ["奈良市","大和高田市","大和郡山市","天理市","橿原市","桜井市","五條市","御所市","生駒市","香芝市","葛城市","宇陀市","山添村","平群町","三郷町","斑鳩町","安堵町","川西町","三宅町","田原本町","曽爾村","御杖村","高取町","明日香村","上牧町","王寺町","広陵町","河合町","吉野町","大淀町","下市町","黒滝村","天川村","野迫川村","十津川村","下北山村","上北山村","川上村","東吉野村"],
    }
];

function create_array(obj) {
    // Make a new array ---- add Qestions, Answers, Answers slected, and Correct or not
    // 配列を作る ---- 質問、答え、選ばれた答え、合否、を格納する
    const new_data = [];

    // column1 -- city(Question), column2 -- prefecture name(Answer), column3 -- prefecture name(Answer you pick), column4 -- true/false(Correct or not)
    // １列目は問題を、２列目は県名（答え）、３列目は選ばれた答え、４列目はその合否（）
    obj.forEach(val => {
        const len = rand_generator(val.cities.length - 1,3)
        new_data.push([val.cities[len[0]],val.pref,"",false]);
        new_data.push([val.cities[len[1]],val.pref,"",false]);
        new_data.push([val.cities[len[2]],val.pref,"",false]);

    });

    // Shuffle all （シャッフルする）
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

// randomize between 0 and max, then return "cnt" numbers
//0～maxまでの値で、cnt個の乱数を重ならないように生成する
function rand_generator (max, cnt){
    const temp = [];
    const return_arr = [];
    // make array (配列を作成)
    for(let i = 0; i <= max; i++) {
        temp.push(i);
    }
    //shuffle (シャッフルする)
    for(let i = (temp.length - 1); 0 < i; i--){
        // get a randome num number between 0〜(i+1)
        // 0～i+1まででランダムにナンバーを取得
        let r = Math.floor(Math.random() * (i + 1));
        // Exchange elements in the for loop
        // ランダムなところと"交換"していく（つまり、シャッフルされる）
        let tmp = temp[i];
        temp[i] = temp[r];
        temp[r] = tmp;
    }
    // その中のほしい数だけ抽出し、返す
    // return the numbers (as many as i want it to give me)
    for(let i = 0; i < cnt; i++) {
        return_arr.push(temp[i])
    }
    return return_arr;
}
