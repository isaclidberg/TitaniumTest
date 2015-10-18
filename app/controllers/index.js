function doClick(e) {
    alert($.label.text);
}

$.index.open();
loadData();


//selected id						  
var selectedId = -1;

//selected tab
var bReads = true;

//Click Event Listener for Main Table View
$.list.addEventListener('click', function(e)
{
	if(e.rowData.id == selectedId){
		selectedId = -1;
		loadData();
	}else if(e.rowData.id >= 0){
		selectedId = e.rowData.id;
		loadData();
	}
	
});

//event for touching TopReads
$.topReads.addEventListener('click', function(e)
{
	bReads = true;
	selectedId = -1;
	loadData();
});

//event for touching TopRated
$.topRated.addEventListener('click', function(e)
{
	bReads = false;
	selectedId = -1;
	loadData();
});

//preparing Data for display
function loadData(){
	//defining sample data
	var strTableData='[{"id":0, "title":"Winnie-the-Pooh", "minutes":600, "rating":3, "reviews":90, "author":"Author A", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}, \
					{"id":1, "title":"Where the wild things are", "minutes":540, "rating":4, "reviews":40, "author":"Author B", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}, \
					{"id":2, "title":"The snowy day", "minutes":480, "rating":5, "reviews":80, "author":"Author C", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}, \
					{"id":3, "title":"Goodnight moon", "minutes":420, "rating":3, "reviews":120, "author":"Author D", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}, \
					{"id":4, "title":"Blueberries for Sal", "minutes":420, "rating":4, "reviews":271, "author":"Robert McCloskey", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}, \
					{"id":5, "title":"Owl Moon", "minutes":380, "rating":4, "reviews":120, "author":"Author E", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}, \
					{"id":6, "title":"Little bear", "minutes":570, "rating":2, "reviews":40, "author":"Author F", \
						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", \
						"image":""}]';

	var sampleJSON = JSON.parse(strTableData);
	
	//topRated
	if(bReads == false){
		var length = Object.keys(sampleJSON).length;
		for(var i=0; i<length; i++){
			for( var j=i; j<length; j++){
				var iRating = sampleJSON[i].rating;
				                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           var jRating = sampleJSON[j].rating;
				
				if(iRating < jRating){
					var temp = sampleJSON[i];
					sampleJSON[i] = sampleJSON[j];
					sampleJSON[j] = temp;
				}
			}
		}
	}
	loadTableView(sampleJSON);
}

//loading data in tableview
function loadTableView(sampleJSON){
	
	//defining FontSizes which are used in the view
	var defaultFontSize = Ti.Platform.name === 'android' ? 19 : 17;
	var defaultMediumFontSize = Ti.Platform.name === 'android' ? 15 : 13;
	var defaultSmallFontSize = Ti.Platform.name === 'android' ? 13 : 11;
	
	var tableData = [];
	var length = Object.keys(sampleJSON).length;

	for(var i=0; i<length; i++){
		var id = sampleJSON[i].id;
		var title = sampleJSON[i].title;
		var minutes = sampleJSON[i].minutes;
		var reviews = sampleJSON[i].reviews;
		var rating = sampleJSON[i].rating;
		var author = sampleJSON[i].author;
		var description = sampleJSON[i].description;
		var image = sampleJSON[i].image;
		
		var row = Ti.UI.createTableViewRow({
			  	 id:id, name:title, top:0, height:"50", width:"100%"
			  });
			  
		var imageCircle = Ti.UI.createImageView({
			    image:"/images/redcircle.png",
			    left:"5%", top: "35%",
			    width:"5%", height: "30%"
			  });
		row.add(imageCircle);
				  
		var imageNext = Ti.UI.createImageView({
			    image:"/images/blacknext.png",
			    left:"90%", top: "35%",
			    width:"5%", height: "30%"
			  });
		row.add(imageNext);
		
		var labelTitle = Ti.UI.createLabel({
			    color:'#000000',
			    font:{fontFamily:'Arial', fontSize:defaultFontSize},
			    text:title,
			    left:"15%", top:"5%", 
			    width:"40%", height:"40%"
			  });
		row.add(labelTitle);
		
		if(bReads == true){
			//if top reads is selected, showing hours for info
			var strTime = parseInt(minutes, 10);
			strTime = strTime / 60;
			strTime = parseInt(strTime, 10);
			strTime = strTime.toString();
			strTime = strTime + " hours remaining";
			
			var labelInfo = Ti.UI.createLabel({
				    color:'#777777',
				    font:{fontFamily:'Arial', fontSize:defaultMediumFontSize},
				    text:strTime,
				    left:"15%", top:"50%",
				    width:"40%", height:"40%"
				  });
			row.add(labelInfo);
			
		}else {
			//if top rated is selected, showing review counts for info
			var strReviews = reviews + " perants reviews";
			
			var labelInfo = Ti.UI.createLabel({
				    color:'#777777',
				    font:{fontFamily:'Arial', fontSize:defaultMediumFontSize},
				    text:strReviews,
				    left:"15%", top:"50%",
				    width:"40%", height:"40%"
				  });
			row.add(labelInfo);
			
		}
		
		if(bReads == false){
			// showing rate stars
			for(var index =0; index < rating; index++){
				
			 	var leftPos = 65 + 4*index;
			 	leftPos = leftPos + "%";
			 	
				var imageStar = Ti.UI.createImageView({
					    image:"/images/yellowstar_full.png",
					    left:leftPos, top: "35%",
					    width:"5%", height: "30%"
					  });
				row.add(imageStar);
			}
			
			for(var index =rating; index < 5; index++){
				
			 	var leftPos = 65 + 4*index;
			 	leftPos = leftPos + "%";
			 	
				var imageStar = Ti.UI.createImageView({
					    image:"/images/yellowstar_empty.png",
					    left:leftPos, top: "35%",
					    width:"5%", height: "30%"
					  });
				row.add(imageStar);
			}
			
		}
		
		tableData.push(row);
		
		//If the row is seleted
		if(selectedId == id){
			var rowContent = Ti.UI.createTableViewRow({
			  	 name:title, top:0, height:"200", width:"100%"
			  });
			
			var strReviews = reviews + " customer reviews";
			var labelReviews = Ti.UI.createLabel({
			    color:'#0000ff',
			    font:{fontFamily:'Arial', fontSize:defaultSmallFontSize},
			    text:strReviews,
			    left:"5%", top:"5%",
			    width:"25%", height:"5%"
			  });  
			rowContent.add(labelReviews);
			
			var strAuthor = "by " + author;
			var labelAuthor = Ti.UI.createLabel({
			    color:'#0000ff',
			    font:{fontFamily:'Arial', fontSize:defaultSmallFontSize},
			    text:strAuthor,
			    left:"5%", top:"13%",
			    width:"25%", height:"5%"
			  });  
			rowContent.add(labelAuthor);
			
			var labelDescription = Ti.UI.createLabel({
			    color:'#000000',
			    font:{fontFamily:'Arial', fontSize:defaultMediumFontSize},
			    text:description,
			    left:"5%", top:"20%",
			    width:"55%", height:"40%"
			  });  
			rowContent.add(labelDescription);
			
			var imageThumbnail = Ti.UI.createImageView({
			    image:"/images/bluesal.jpg",
			    left:"63%", top:"3%",
			    width:"35%", height:"60%"
			  });
			rowContent.add(imageThumbnail);
			
			var btnStop = Ti.UI.createButton({
				left:"10%", top:"65%",
				width:"60", height:"60",
				backgroundImage:"/images/stop.png"
			});
			rowContent.add(btnStop);
			
			var btnPlay = Ti.UI.createButton({
				left:"25%", top:"65%",
				width:"60", height:"60",
				backgroundImage:"/images/play.png"
			});
			rowContent.add(btnPlay);
			tableData.push(rowContent);
			
		}
	}
	
	$.list.setData(tableData);
}

function showIntro(){
	

}
