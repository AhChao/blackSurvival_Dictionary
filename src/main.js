/*
材料(1~) 特殊(40~) 強化(51~) 裝填(54~)
(https://goo.gl/sRX1bc)
食物 體力(56~) 耐力(124~) 
(https://goo.gl/HRssVC)
防具(158~)
衣服(158~) 頭(204~) 手臂(232~) 腳(256~) 裝飾品(275~)
(https://goo.gl/pgKUmu)

武器(304~)
斬擊(304~) 穿刺(357~) 鈍器(408~) 投擲(475~) 槍(537~) 弓(574~) 拳法(603~) 陷阱(640~)
(https://goo.gl/LCrcYf)
*/

var itemPage = 0;
var nowType;
var maxPage = 0;
var itemNumber = 
{
	"health":[56,123],
	"stamina":[124,157],
	"enhance":[51,53],
	"special":[40,50],
	"ingredients":[1,39],
	"head":[205,231],
	"clothes":[158,203],
	"arm":[232,255],
	"leg":[256,274],
	"accessory":[275,303],
	"blade":[304,356],
	"stab":[357,407],
	"blunt":[408,474],
	"thrown":[475,536],
	"gun":[537,573],
	"bow":[574,602],
	"hand":[603,639],
	"trap":[640,665],
};

function init()
{
	stepSwitch(1);
}
init();
function selectType(typeText)
{	
	stepSwitch(1);
	d3.select("#typeText").text(d3.select("#"+typeText+"Btn").text());
	itemPage = 0;
	maxPage = Math.ceil((itemNumber[typeText][1]-itemNumber[typeText][0]+1)/10)-1;
	console.log(maxPage,itemNumber[typeText][1],itemNumber[typeText][0]);
	showOnField(typeText,itemPage);
	nowType = typeText;
}

function showOnField(typeText,page)
{	
	d3.select("#showItemFieldSVG").selectAll("image").remove();
	var startX = 80;
	var startY = 40;
	var spacing = 25;//圖片上下左右間隔
	var picSizeX = 285*0.9;
	var picSizeY = 170*0.9;
	var j=0;
	var startIndex = (itemNumber[typeText][0]+page*10);
	d3.select("#pageText").text((itemPage+1)+"/"+(maxPage+1));
	if(maxPage==0) d3.select("#pageText").text("");
	for(var i= (itemNumber[typeText][0]+page*10);i<=itemNumber[typeText][1];i++)
	{		
		var locX = startX + ((i-startIndex)%5)*(picSizeX+spacing);
		var locY = startY + Math.floor((i-startIndex)/5)*(picSizeY+spacing);
		d3.select("#showItemFieldSVG").append("image").attr(
		{
			"x":locX,
			"y":locY,
			"width":picSizeX,
			"height":picSizeY,
			"href":"./thingsImg/"+i+".jpg",
			"id":"item"+i,
			"ondblclick":"selectItem(this.id)",
		});
		j++;
		if(j>9) break;
	}
}

function selectItem(item)//選擇道具加入列表
{
	var startX = 80;
	var startY = 25;
	var spacing = 25;//圖片上下左右間隔
	var picSizeX = 285*0.9;
	var picSizeY = 170*0.9;
	var selectedNumber = d3.select("#selectedItemSVG").node().childNodes.length-7;
	var locX = startX + selectedNumber*(picSizeX+spacing);
	var locY = startY //+ selectedNumber*(picSizeY+spacing);
	var itemId = item.replace("item","");
	d3.select("#selectedItemSVG").append("image").attr(
	{
		"x":locX,
		"y":locY,
		"width":picSizeX,
		"height":picSizeY,
		"href":"./thingsImg/"+itemId+".jpg",
		"id":"selected"+item,
		"ondblclick":"delectSelected(this.id)",
	});
}

function delectSelected(item)
{
	console.log(item);
	d3.select("#"+item).remove();
	rearrangePics();
}

function rearrangePics()
{
	var imgs = d3.select("#selectedItemSVG").selectAll("image")[0];
	var startX = 80;
	var startY = 25;
	var spacing = 25;//圖片上下左右間隔
	var picSizeX = 285*0.9;
	var picSizeY = 170*0.9;
	for(var i in imgs)
	{		
		var idOfImg = imgs[i].id;
		d3.select("#"+idOfImg).attr(
		{
			"x":startX+(i%5)*(picSizeX+spacing),
			"y":startY,
		});
		if(idOfImg=="selectedItemSVG") continue;
	}
}

function pageSwitch(value)
{
	if(value==-1)
	{
		if(itemPage>0)
		{
			itemPage-=1;
			showOnField(nowType,itemPage);
		}  
	}
	else if(value==1)
	{
		if(itemPage<maxPage)
		{
			itemPage+=1;
			showOnField(nowType,itemPage);
		} 
	}	
}

function stepSwitch(step)
{
	step=step-1;
	var stepView=[["selectedItemDiv","itemListDiv"],
				  ["selectedItemDiv","itemRecipeDiv","mapDiv"],
				  ["selectedItemDiv","totalNeedDiv","mapDiv","reverseListDiv"]];
	for(var i in stepView)
	{
		for(var j in stepView[i])
		{
			d3.select("#"+stepView[i][j]).attr("style","display: none;");
		}
	}
	for(var i in stepView[step])
	{
		d3.select("#"+stepView[step][i]).attr("style",null);
	}
}