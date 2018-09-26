var textOrder=
[
	"textGameName",
	"textSelectType",
	"weaponBtn",
	"bladeBtn",
	"stabBtn",
	"bluntBtn",
	"thrownBtn",
	"gunBtn",
	"bowBtn",
	"handBtn",
	"trapBtn",
	"armorBtn",
	"headBtn",
	"clothesBtn",
	"armBtn",
	"legBtn",
	"accessoryBtn",
	"foodBtn",
	"healthBtn",
	"staminaBtn",
	"normalBtn",
	"enhanceBtn",
	"specialBtn",
	"ingredientsBtn",
	"howToUseBtn",
	"nav1",
	"nav2",
	"nav3",
	"nav4",
	"wishList",
	"typeText",
	"textRecipeLine",
	"textTotalMat",
	"textMapShow",
	"textMap",
	"textEachLoc",
	"charBtn",
	"saveBtn",
	"useSingleColorCheck",
	"nav5",
];
var ctStr=
[
	"黑色倖存",
	"選擇類別",
	"武器",
	"斬擊",
	"穿刺",
	"鈍器",
	"投擲",
	"槍",
	"弓",
	"拳法",
	"陷阱",
	"護甲",
	"頭部",
	"衣服",
	"手臂",
	"腿部",
	"飾品",
	"食物",
	"生命值",
	"耐力",
	"正常",
	"強化",
	"特殊",
	"材料",
	"使用說明",
	"裝備規劃",
	"合成顯示",
	"材料統計",
	"地圖索引",
	"裝備規劃",
	"類別",
	"合成列",
	"總共所需材料如下",
	"掉落地點",
	"請點選地圖",
	"各地點應撿材料",
	"選擇角色",
	"保存圖片",
	"使用此色填充背景",
	"套路規劃",
];
var jpStr=
[
	"ブラサバ",
	"種類別",
	"武器",
	"斬り",
	"突き",
	"鈍器",
	"投げ",
	"銃",
	"弓",
	"拳法",
	"トラップ",
	"防具",
	"服",
	"頭",
	"腕",
	"脚",
	"装具",
	"飲食",
	"体力",
	"スタミナ",
	"一般",
	"強化",
	"特殊",
	"材料",
	"使い方",
	"お気に入り",
	"製造方法",
	"材料統計",
	"マップチェック",
	"お気に入り",
	"種類",
	"製造方法",
	"材料統計",
	"どこが見つかるか",
	"地域選択",
	"ドロップ",
	"実験体を選ぶ",
	"画像を保存する",
	"背景色を使用する",
	"プランナー",
];
var usStr=
[
	"黑色倖存",
	"Select Type",
	"Weapon",
	"Blade",
	"Stab",
	"Blunt",
	"Thrown",
	"Gun",
	"Bow",
	"Hand",
	"Trap",
	"Armor",
	"Head",
	"Clothes",
	"Arm",
	"Leg",
	"Accessory",
	"Food",
	"Health",
	"Stamina",
	"Normal",
	"Enhance",
	"Special",
	"Ingredients",
	"How to use",
	"Wish List",
	"Recipe",
	"Total required",
	"Map Search",
	"Wish List",
	"Type",
	"Recipe",
	"Total required",
	"Appears at",
	"Chose the Area",
	"What you need in...",
	"Chose the character",
	"Save the picture",
	"Use thi Color for Background",
	"Planner",
];
function languageSwitch(language)
{
	$("#languageSwitchSelect").val(language);
	nowLanguage = language;
	for(var i=0;i<textOrder.length;i++)
	{
		if(language=="jp") d3.select("#"+textOrder[i]).text(jpStr[i]);
		else if(language=="ct") d3.select("#"+textOrder[i]).text(ctStr[i]);
		else if(language=="us") d3.select("#"+textOrder[i]).text(usStr[i]);
	}
	document.getElementById("explainText").innerHTML=explainText[language];
}

var explainText=
{
	"ct":"<h2>黑色倖存套路規劃器</h2><h4>\
            【1】功能位於右上角切換，依序為裝備規劃、合成顯示、材料統計、地圖索引<br>\
            【2】在左邊側頁選擇裝備類別，雙擊欲加入規劃的裝備<br>\
            【3】裝備規劃列單擊為切到合成顯示頁，雙擊為移除<br>\
            【4】合成顯示頁單擊合成列可以觀看合成配方與出現地點、數量，雙擊為觀看該物品配方<br>\
            【5】材料統計頁會列出目前所有位於裝備規劃列所需的材料與數量<br>\
            【6】地圖索引頁點選單一地點，可以看到目前規劃中裝備應於該地點撿取的物品與數量<br>\
          </h4>",
	"jp":"<h2>ブラサバ ルートプランナー</h2><h4>\
            【1】画面右上の機能を選択できます<br>\
            【2】クリックやダブルクリックでほとんどの操作を行うことができます<br>\
            【3】私の日本語はうまくないです。詳細な説明を英語版お読みください<br>\
          </h4>",
	"us":"<h2>Black Survival Route Planner</h2><h4>\
            【1】You can select function on right upper corner.<br>\
            【2】You can select category on side page, and double click on the item you want.<br>\
            【3】Click on wishlist to know how to get the item, double click to remove.<br>\
            【4】Click on items in recipe line let you know where the item appears and its amount, double click to know its recipe.<br>\
            【5】\"Total required\" page will list all items you need to finish your wishlist.<br>\
            【6】\"Map Search\" page may let you know what you need in each location.<br>\
          </h4>",
}