function saveRoute()
{
	var routeName = prompt("Please enter this route's name", "Black Survival Route");
	console.log($('#useSingleColorCheck').is(":checked"));
	if($('#useSingleColorCheck').is(":checked")==true)
	{
		console.log($('#useSingleColorBG').val());
		d3.select("#plannerDiv").attr({
			"style":"min-width:1400px;display: inline-block;background:"+$('#useSingleColorBG').val()+";background-size:100%;",
		});
	}
	else
	{
		d3.select("#plannerDiv").attr({
			"style":"min-width:1400px;display: inline-block;background-image:url('./img/startBG.png');background-size:100%;",//background-repeat:no-repeat;",
		});
	}
	html2canvas(document.querySelector("#plannerDiv")).then(canvas => {
    var canvas = document.getElementById("popupModalContent").appendChild(canvas);
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";    
    ctx.textAlign = "center";	    
    ctx.lineWidth = 5;//half will be the stroke width
	ctx.strokeText(routeName,canvas.width/2, canvas.height/9);
	ctx.fillStyle = "white";
	ctx.fillText(routeName, canvas.width/2, canvas.height/9);
    d3.select("#plannerDiv").attr("style",null);
	d3.select("#saveTitle").text("");});  
	popUpModal("savePicModal");
}

function goalTRCheck(value)
{
	if(value) goalTRFill();
	else d3.select("#goalTR").selectAll("td").remove();
}

function goalTRFill()
{
	d3.select("#goalTR").selectAll("td").remove();
	if(wishList.length==0)
	{
		d3.select("#goalTR").attr("style","display:none;");
		return;
	} 
	else d3.select("#goalTR").attr("style","border: 5px solid #880000;");
	for(var i=0;i<wishList.length;i++)
	{
		d3.select("#goalTR").append("td").attr(
							{
								"style":"width:100px;",
							})
							.append("img").attr(
							{
								"style":"width:100%;",
								"src":"./thingsImg/"+wishList[i]+".jpg",												
							});
	}	
}

function showCharModal()
{
	popUpModal("charModal");
}
function selectChar(charNo)
{
	d3.select("#tableCharLoc").selectAll("img").remove();
	document.getElementById('popupModal').style.display = "none";
	charNo = charNo.replace("charT","");
	d3.select("#tableCharLoc").append("img").attr(
	{
		"src":"./charImg/cf"+charNo+".png",
		"style":"height:700px;",
	});
}
var selectedMap=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
function selectPopUpItem(itemId,doubleClick)
{
	//"popUpItem"+lumiaIsland[mapSelected][i],
	itemId = itemId.replace("popUpItem","");
	if(!selectedMap[nowSelectingMap])
	{
		selectedMap[nowSelectingMap]=true;
		d3.select("#contentTable").append("tr").attr("id","mapInTable"+nowSelectingMap)
								  .append("td").attr("style","width:150px;")
								  .append("img").attr(
								  {
								  		"style":"max-width:100%; max-height:100%;",
										"src":"./mapImg/l"+nowSelectingMap+".png",
										"mapNo":nowSelectingMap,
										"ondblclick":"removeWholePlace($(this).attr('mapNo'))"
								  });
	}
	d3.select("#mapInTable"+nowSelectingMap).append("td").attr(
											{
												"id":"single"+itemId,
												"mapNo":nowSelectingMap,
												"ondblclick":"removeSingleItem(this.id,$(this).attr('mapNo'))",
												"style":"width:150px;",
											})
											.append("img").attr(
											{
												"style":"max-width:100%; max-height:100%;",
												"src":"./thingsImg/"+itemId+".jpg",												
											});		
}

function removeWholePlace(mapNO)
{
	d3.select("#mapInTable"+mapNO).remove();
	selectedMap[mapNO]=false;
}

function removeSingleItem(itemId,mapNO)
{
	if(d3.select("#"+itemId).node().parentNode.childNodes.length==2)
	{
		d3.select("#mapInTable"+mapNO).remove();
		selectedMap[mapNO]=false;
	}
	else
		d3.select("#"+itemId).remove();
}