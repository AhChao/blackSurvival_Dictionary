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
	languageSwitch("tw");
}
init();

function popUpModal()
{
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
}

function selectType(typeText)
{	
	stepSwitch(1);
	d3.select("#typeText").text(d3.select("#"+typeText+"Btn").text());
	itemPage = 0;
	maxPage = Math.ceil((itemNumber[typeText][1]-itemNumber[typeText][0]+1)/10)-1;
	showOnField(typeText,itemPage,"showItemFieldSVG");
	nowType = typeText;
}

function showOnField(typeText,page,field)
{	
	d3.select("#"+field).selectAll("image").remove();
	var startX = 80;
	var startY = 40;
	var spacing = 25;//圖片上下左右間隔
	var picSizeX = 285*0.9;
	var picSizeY = 170*0.9;
	var showNumbers=0;
	var maxShow=0;
	var startIndex = (itemNumber[typeText][0]+page*10);
	if(field=="showItemFieldSVG")
	{
		startX = 80;
		startY = 40;
		maxShow=10;
	}
	else if(field=="selectedItemSVG")
	{
		startX = 80;
		startY = 25;
		maxShow=5;
	}
	d3.select("#pageText").text((itemPage+1)+"/"+(maxPage+1));
	if(maxPage==0) d3.select("#pageText").text("");
	for(var i= (itemNumber[typeText][0]+page*10);i<=itemNumber[typeText][1]&&showNumbers<maxShow;i++)
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
		showNumbers++;
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
		"onclick":"seeTheRecipe(this.id)",
		"ondblclick":"delectSelected(this.id)",
	});
}

function seeTheRecipe(item)
{
	stepSwitch(2);
	d3.select("#itemRecipeSVG").selectAll("image").remove();
	d3.select("#itemRecipeSVG").selectAll("text").remove();
	var picSizeX = 285*0.9;
	var picSizeY = 170*0.9;
	var itemId = item.replace("selecteditem","");
	if(typeof recipe[itemId]=="undefined") return;
	if(recipe[itemId].length==1) itemId = recipe[itemId][0];//重複時換成前面排序的道具ID
	d3.select("#itemRecipeSVG").append("image").attr(
	{

		"x":"5%",
		"y":"10%",
		"width":picSizeX,
		"height":picSizeY,
		"href":"./thingsImg/"+itemId+".jpg",
		"id":"recipe"+itemId,
		"onclick":"checkOnMap(this.id)",		
	});
	console.log(recipe[itemId]);
	if(recipe[itemId].length!=0)
	{
		d3.select("#itemRecipeSVG").append("text").text("=").attr(
		{
			"x":"25%",
			"y":"55%",
			"style":"font-size:40px;",
		});		
		var id1 = recipe[itemId][0];
		if(recipe[recipe[itemId][0]].length==1) id1 = recipe[recipe[itemId][0]];;
		d3.select("#itemRecipeSVG").append("image").attr(
		{

			"x":"30%",
			"y":"10%",
			"width":picSizeX,
			"height":picSizeY,
			"href":"./thingsImg/"+id1+".jpg",
			"id":"recipe"+id1,
			"onclick":"checkOnMap(this.id)",
			"ondblclick":"seeTheRecipe(this.id.replace('recipe','selecteditem'))",
		});
		d3.select("#itemRecipeSVG").append("text").text("+").attr(
		{
			"x":"50%",
			"y":"55%",
			"style":"font-size:40px;",
		});
		var id2 = recipe[itemId][1];
		if(recipe[recipe[itemId][1]].length==1) id2 = recipe[recipe[itemId][1]];;
		d3.select("#itemRecipeSVG").append("image").attr(
		{

			"x":"55%",
			"y":"10%",
			"width":picSizeX,
			"height":picSizeY,
			"href":"./thingsImg/"+id2+".jpg",
			"id":"recipe"+id2,
			"onclick":"checkOnMap(this.id)",
			"ondblclick":"seeTheRecipe(this.id.replace('recipe','selecteditem'))",
		});
	}
}

function checkOnMap(item)
{
	var itemId = item.replace("recipe","");
	var lighten = false;
	var itemNo;
	d3.select("#mapSVG").selectAll("text").remove();
	for(var i=1; i<=lumiaIsland.length; i++)
	{
		lighten = false;
		d3.select("#l"+i).attr("style","display:None;");
		for(var j in lumiaIsland[i])
		{
			if(lumiaIsland[i][j]==itemId)
			{
				lighten = true;
				itemNo = j;
			} 
		}
		if(lighten)
		{
			var refX = Number(d3.select("#l"+i).attr("x").split("%")[0]);
			var refY = Number(d3.select("#l"+i).attr("y").split("%")[0]);
			d3.select("#l"+i).attr("style","display:true;");
			d3.select("#mapSVG").append("text").text("x"+lumiaIslandNumber[i-1][itemNo]).attr(
			{
				"x":(refX+4.5)+"%",
				"y":(refY+10)+"%",
				"style":"font-size:24px;paint-order: stroke;stroke: #FFFFFF;stroke-width: 5px;stroke-linejoin: miter;font-weight: 800;",
				"fill":"black",			    
			});
		}
	}
}

function delectSelected(item)
{
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
			showOnField(nowType,itemPage,"showItemFieldSVG");
		}  
	}
	else if(value==1)
	{
		if(itemPage<maxPage)
		{
			itemPage+=1;
			showOnField(nowType,itemPage,"showItemFieldSVG");
		} 
	}	
}

function selectedPageSwitch(value)
{
	if(value==-1)
	{
		if(selectedPage>0)
		{
			selectedPage-=1;
			showOnField(nowType,itemPage,"selectedItemSVG");
		}  
	}
	else if(value==1)
	{
		if(selectedPage<maxSelectedPage)
		{
			itemPage+=1;
			showOnField(nowType,itemPage,"selectedItemSVG");
		} 
	}	
}
function stepSwitch(step)
{
	for(var i=1;i<=4;i++)
	{
		d3.select("#nav"+i).attr("style",null);
	}	
	d3.select("#nav"+step).attr("style","color:#AA0000;font-weight:800;");
	step=step-1;
	var stepView=[["selectedItemDiv","itemListDiv"],
				  ["selectedItemDiv","itemRecipeDiv","mapDiv"],
				  ["selectedItemDiv","totalNeedDiv","mapDiv"],
				  ["selectedItemDiv","mapRequestDiv","reverseListDiv"]];
	if(step==2) calculation();
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

function calculation()//計算結果
{
	var images = d3.select("#selectedItemSVG").selectAll("image")[0];
	var totalItems = [];
	var itemNumberList = [];
	for(var i in images)
	{
		if(images[i].id.indexOf("selecteditem")!=-1)
		{
			totalItems.push(images[i].id.replace("selecteditem",""));
		}
	}
	var alreadyIn = false;
	for(var i=0; i<totalItems.length;i++)
	{
		if(recipe[totalItems[i]].length==0)
		{
			alreadyIn = false;
			for(var j in itemNumberList)
			{
				if (itemNumberList[j][0]==totalItems[i])
				{
					itemNumberList[j][1]+=1;
					alreadyIn = true;
				}
			}
			if(!alreadyIn) itemNumberList.push([Number(totalItems[i]),1]);
		}
		else
		{
			totalItems.push(recipe[totalItems[i]][0]);
			totalItems.push(recipe[totalItems[i]][1]);
		}
	}

	var startX = 80;
	var startY = 25;
	var spacing = 50;//圖片上下左右間隔
	var picSizeX = 285*0.9;
	var picSizeY = 170*0.9;
	var locX;
	var locY;
	
	for(var i in itemNumberList)
	{
		locX = startX + i*(picSizeX+spacing);
		locY = startY;
		d3.select("#totalNeedSVG").append("image").attr(
		{
			"x":locX,
			"y":locY,
			"width":picSizeX,
			"height":picSizeY,
			"href":"./thingsImg/"+itemNumberList[i][0]+".jpg",
			"id":"recipe"+itemNumberList[i][0],//注意 撞ID
			"onclick":"checkOnMap(this.id)",
		});
		d3.select("#totalNeedSVG").append("text").text("x"+itemNumberList[i][1]).attr(
		{
			"x":locX+picSizeX+10,
			"y":locY+picSizeY,
			"style":"font-size:24px;paint-order: stroke;stroke: black;stroke-width: 5px;stroke-linejoin: miter;font-weight: 800;",
			"fill":"white",
		});
	}	
}