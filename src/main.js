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

function whichType(itemNo)
{
	if(itemNo<=55) return "Normal";
	if(itemNo<=157) return "Food";
	if(itemNo<=203) return "Clothes";
	if(itemNo<=231) return "Head";
	if(itemNo<=255) return "Arm";
	if(itemNo<=274) return "Leg";
	if(itemNo<=303) return "Accessory";
	if(itemNo<=665) return "Weapon";
	//例外
	if(itemNo<=670) return "Normal";
	if(itemNo==671) return "Food";
}

var itemPage = 0;
var selectedPage = 0;
var nowType;
var maxPage = 0;
var maxSelectedPage = 0;
var nowLanguage = "ct";
var nowSelectingMap;
var wishList = [];
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

var itemTypeCate = 
{
	"health":[],
	"stamina":[],
	"enhance":[],
	"special":[],
	"ingredients":[],
	"head":[],
	"clothes":[],
	"arm":[],
	"leg":[],
	"accessory":[],
	"blade":[],
	"stab":[],
	"blunt":[],
	"thrown":[],
	"gun":[],
	"bow":[],
	"hand":[],
	"trap":[],
};
function setItemTypeCate()
{
	for(var i in itemNumber)
	{
		for(var j=itemNumber[i][0]; j<=itemNumber[i][1];j++)
		{
			itemTypeCate[i].push(j);
		}
	}
	
	for(var i =666 ;i<=670;i++)
	{
		itemTypeCate["ingredients"].push(i);
	}
	
	//新增
	itemTypeCate["stamina"].push(671);
	itemTypeCate["accessory"].push(460);
	itemTypeCate["accessory"].push(474);

	//類別中移除
	var index;
	index = itemTypeCate["clothes"].indexOf(192);
	itemTypeCate["clothes"].splice(index, 1);//5.4
	index = itemTypeCate["clothes"].indexOf(230);
	itemTypeCate["clothes"].splice(index, 1);//5.5
	index = itemTypeCate["clothes"].indexOf(218);
	itemTypeCate["clothes"].splice(index, 1);//5.5
	index = itemTypeCate["blunt"].indexOf(460);
	itemTypeCate["blunt"].splice(index, 1);
	index = itemTypeCate["blunt"].indexOf(474);
	itemTypeCate["blunt"].splice(index, 1);
	index = itemTypeCate["gun"].indexOf(548);
	itemTypeCate["gun"].splice(index, 1);
}

function init()
{
	setItemTypeCate();
	stepSwitch(1);
	urlLoading();
}
init();

function urlLoading()
{
	var urlData = location.href;
	urlData = urlData.split("?language=");
	urlData = urlData[1];

	if( urlData == "ct") languageSwitch("ct");
	else if( urlData == "jp") languageSwitch("jp");
	else if( urlData == "us")languageSwitch("us");
}

function popUpModal(modalName,mapSelected)
{
	var modal = document.getElementById("popupModal");
	d3.select("#popupModalContent").selectAll("image").remove();
	d3.select("#popupModalContent").selectAll("canvas").remove();
	d3.select("#modalSVG").attr("style","display:none");
	d3.select("#explainText").attr("style","display:none");
	if(modalName=="informModal")
	{
		d3.select("#explainText").attr("style",null);
	}
	else if(modalName=="charModal")
	{
		d3.select("#modalSVG").attr("style",null);
		d3.select("#modalSVG").attr("height",Math.ceil(38/10)*130);
		d3.select("#modalSVG").attr("width",10*120+100);
		for(var i=0;i<38;i++)//i = character amount 角色數量
		{
			//ct=200*233
			d3.select("#modalSVG").append("image").attr(
			{
				"x":i%10*120+20,
				"y":Math.floor(i/10)*126.5,
				"width":100,
				"href":"./charImg/ct"+(i*1+1)+".jpg",
				"id":"charT"+(i*1+1),
				"onclick":"selectChar(this.id)",
			})
		}		
	}
	else if(modalName=="mapSelect")
	{
		d3.select("#modalSVG").attr("style",null);
		var picWidth = 285*0.5;
		var picHeight = 168*0.5;
		var oneRowHowMany = 9;
		mapSelected = mapSelected.replace("rl","");
		nowSelectingMap = mapSelected;
		d3.select("#modalSVG").attr("height",Math.ceil(lumiaIsland[mapSelected].length/oneRowHowMany)*picHeight+50);
		d3.select("#modalSVG").attr("width",oneRowHowMany*picWidth+200);

		for(var i=0;i<lumiaIsland[mapSelected].length;i++)
		{
			d3.select("#modalSVG").append("image").attr(
			{
				"x":(i%oneRowHowMany)*(picWidth+20)+20,
				"y":Math.floor(i/oneRowHowMany)*(picHeight+20),
				"width":picWidth,
				"href":"./thingsImg/"+lumiaIsland[mapSelected][i]+".jpg",
				"id":"popUpItem"+lumiaIsland[mapSelected][i],
				"onclick":"selectPopUpItem(this.id)",
			});
		}
	}
	else if(modalName=="savePicModal")
	{
		//do nothing
	}
	modal.style.display = "block";
}

function selectType(typeText)
{	
	stepSwitch(1);
	d3.select("#typeText").text(d3.select("#"+typeText+"Btn").text());
	itemPage = 0;
	maxPage = Math.ceil(itemTypeCate[typeText].length/10)-1;
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
	var locX;
	var locY;
	var startIndex;
	if(field=="showItemFieldSVG")//依選擇類別顯示在右邊
	{
		startX = 80;
		startY = 40;
		maxShow=10;
		startIndex = page*10;
		d3.select("#pageText").text((itemPage+1)+"/"+(maxPage+1));
		if(maxPage==0) d3.select("#pageText").text("");
		for(var i= page*10;i<itemTypeCate[typeText].length&&showNumbers<maxShow;i++)
		{		
			locX = startX + ((i-startIndex)%5)*(picSizeX+spacing);
			locY = startY + Math.floor((i-startIndex)/5)*(picSizeY+spacing);
			d3.select("#showItemFieldSVG").append("image").attr(
			{
				"x":locX,
				"y":locY,
				"width":picSizeX,
				"height":picSizeY,
				"href":"./thingsImg/"+itemTypeCate[typeText][i]+".jpg",
				"id":"item"+itemTypeCate[typeText][i],
				"ondblclick":"selectItem(this.id)",
			});
			showNumbers++;
		}
	}
	else if(field=="selectedItemSVG")//選擇道具顯示在願望清單
	{
		startX = 80;
		startY = 25;
		maxShow=5;

		for(var i=page*5; i<wishList.length&&showNumbers<maxShow;i++)
		{
			locX = startX + (i%5)*(picSizeX+spacing);
			locY = startY;
			d3.select("#selectedItemSVG").append("image").attr(
			{
				"x":locX,
				"y":locY,
				"width":picSizeX,
				"height":picSizeY,
				"href":"./thingsImg/"+wishList[i]+".jpg",
				"id":"selecteditem"+wishList[i],
				"onclick":"seeTheRecipe(this.id)",
				"ondblclick":"deleteSelected(this.id)",
			});
			showNumbers++;
		}		
	}	
}

function selectItem(item)//選擇道具加入列表
{
	var itemId = item.replace("item","");
	wishList.push(itemId);
	maxSelectedPage = Math.floor((wishList.length-1)/5);
	selectedPage = maxSelectedPage;
	showOnField(-1,selectedPage,"selectedItemSVG");
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
	var lightOneTime = false;
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
				if(!lightOneTime) lightOneTime = true;
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
	if(!lightOneTime)
	{
		if(recipe[itemId].length==1) itemId = recipe[itemId];
		if(recipe[itemId].length==0) 
		{
			var textRandomAppear =
			{
				"ct":"出現在隨機區域",
				"jp":"ランダム地域で出ます",
				"us":"Appears at Random Area",
			}
			d3.select("#mapSVG").append("text").text(textRandomAppear[nowLanguage]).attr(
			{
				"x":"14%",
				"y":"45%",
				"style":"font-size:24px;paint-order: stroke;stroke: #FFFFFF;stroke-width: 5px;stroke-linejoin: miter;font-weight: 800;",
				"fill":"purple",			    
			});
		}
		else if(recipe[itemId].length==2)
		{
			var textNeedToMake =
			{
				"ct":"可以被合成",
				"jp":"製造で作れます",
				"us":"Can be crafted",
			}
			d3.select("#mapSVG").append("text").text(textNeedToMake[nowLanguage]).attr(
			{
				"x":"14%",
				"y":"45%",
				"style":"font-size:24px;paint-order: stroke;stroke: #FFFFFF;stroke-width: 5px;stroke-linejoin: miter;font-weight: 800;",
				"fill":"purple",			    
			});
		}
	}
}

function deleteSelected(item)
{
	d3.select("#"+item).remove();
	var index = wishList.indexOf(item.replace("selecteditem",""));
	if (index > -1) 
	  wishList.splice(index, 1);
	maxSelectedPage = Math.floor((wishList.length-1)/5);
	if(selectedPage>maxSelectedPage) selectedPage = maxSelectedPage;
	if(wishList.length!=0) showOnField(-1,selectedPage,"selectedItemSVG");
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
			showOnField(-1,selectedPage,"selectedItemSVG");
		}  
	}
	else if(value==1)
	{
		if(selectedPage<maxSelectedPage)
		{
			selectedPage+=1;
			showOnField(-1,selectedPage,"selectedItemSVG");
		} 
	}	
}
function stepSwitch(step)
{
	for(var i=1;i<=5;i++)
	{
		d3.select("#nav"+i).attr("style",null);
	}	
	d3.select("#nav"+step).attr("style","color:#AA0000;font-weight:800;");
	step=step-1;
	var stepView=[["selectedItemDiv","itemListDiv"],
				  ["selectedItemDiv","itemRecipeDiv","mapDiv"],
				  ["selectedItemDiv","totalNeedDiv","mapDiv"],
				  ["selectedItemDiv","mapDiv","reverseListDiv"],
				  ["mapRequestDiv","plannerDiv"]];
	if(step==2) calculation();
	if(step==3)
	{
		reverseList(calculation());
	} 
	if(step==4) putOnEquipments();
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
	for(var i in wishList)
	{
		totalItems.push(wishList[i]);
	}
	var alreadyIn = false;
	for(var i=0; i<totalItems.length;i++)
	{
		if(typeof recipe[totalItems[i]] == "undefined") console.log(i,wishList,totalItems,totalItems[i],recipe[totalItems[i]]);
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
			if(typeof recipe[totalItems[i]][0] != "undefined") totalItems.push(recipe[totalItems[i]][0]);
			if(typeof recipe[totalItems[i]][1] != "undefined") totalItems.push(recipe[totalItems[i]][1]);
		}
	}

	var startX = 40;
	var startY = 25;
	var spacing = 50;//圖片上下左右間隔
	var picSizeX = 285*0.5;
	var picSizeY = 170*0.5;
	var locX;
	var locY = startY;
	var lineRec = 0;
	
	for(var i in itemNumberList)
	{
		locX = startX + (i%8)*(picSizeX+spacing);
		if(Math.floor(i/8)>lineRec)
		{
			lineRec++;
			d3.select("#totalNeedSVG").attr("height",(lineRec*1+1)*135);	
			d3.select("#totalNeedSVGBG").attr("height",(lineRec*1+1)*135);
			locY = lineRec*135;
		}
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
	return itemNumberList;	
}

function reverseList(rlist)
{
	var lighten;
	var maxWidth = 5;
	var nowWidth = 0;
	var lineRec = 0;
	d3.select("#reverseListSVG").selectAll("image").remove();
	d3.select("#reverseListSVG").selectAll("text").remove();
	var startX = 40;
	var startY = 25;
	var spacing = 50;//圖片上下左右間隔
	var picSizeX = 285*0.4;
	var picSizeY = 170*0.4;
	var locX;
	var locY;
	var heightOfMap=
	[0,130,146,170,151,194,185,191,234,152,162,208,257,158,206,260,237,132,233,179,90,177,263,450];
	var scaleAmount = 0.6;
	for(var i=1;i<lumiaIsland.length;i++)
	{
		lighten = false;
		nowWidth = 0;
		d3.select("#l"+i).attr("style","display:None;");
		d3.select("#reverseListSVG").attr("height",lineRec*200);
		for(var j=0;j<rlist.length;j++)
		{
			var index = lumiaIsland[i].indexOf(rlist[j][0]);
			if (index > -1) 
			{				
				nowWidth++;
				if(nowWidth>=maxWidth)
				{
					d3.select("#reverseListSVG").attr("width",nowWidth*300+50);
				}
				if(!lighten)
				{
					d3.select("#l"+i).attr("style",null);
					d3.select("#reverseListSVG").append("image").attr(
					{
						"x":startX,
						"y":startY*1+lineRec*1,
						"width":200*scaleAmount, 
						"href":"./mapImg/l"+i+".png",
						"id":"tempMap"+i,
					});
					d3.select("#reverseListSVG").append("text").text(":").attr(
					{
						"x":startX+200*scaleAmount+10,
						"y":startY*1+lineRec*1+heightOfMap[i]*0.4,
						"style":"font-size:24px;paint-order: stroke;stroke: black;stroke-width: 5px;stroke-linejoin: miter;font-weight: 800;",
						"fill":"white",
					});
					lighten = true;
				}						
				d3.select("#reverseListSVG").append("image").attr(
				{
					"x":startX+50+(picSizeX+50)*nowWidth,
					"y":startY*1+lineRec*1+heightOfMap[i]*0.15,
					"width":picSizeX,
					"height":picSizeY,
					"href":"./thingsImg/"+rlist[j][0]+".jpg",
				});
				d3.select("#reverseListSVG").append("text").text("x"+rlist[j][1]).attr(
				{
					"x":startX+50+(picSizeX+50)*nowWidth+picSizeX+10,
					"y":startY*1+lineRec*1+heightOfMap[i]*0.4,
					"style":"font-size:24px;paint-order: stroke;stroke: black;stroke-width: 5px;stroke-linejoin: miter;font-weight: 800;",
					"fill":"white",
				});
			}
		}
		if(lighten) lineRec=lineRec*1+heightOfMap[i]*scaleAmount+20;
	}
}