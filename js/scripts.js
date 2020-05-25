// 	1. init():
//
// 	Description:		Initializes the site.	
//
//	Operation:			fills in the appropriate langauge text, inits the map,
//						shows the basemap, plots the data on the map, and sets 
//						The spinning counters. 
//
//	Dependencies:		None.		
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				None.
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen 

//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-
function init() {
	if(detectMobile()) {adjustDisplayForMobile()} 
								// check for mobile and adjust text size appropriately
	showOverlay();
	fillText();					// Fill in the text in the appropriate language
	initMap(); 					// Initialize the map 
	applyBaseMap(); 			// Display the map with the appropriate base tiles
	loadData(); 				// Load the data for the default contaminant 
								// 	then plot the base markers on the map.	 	
}								
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-


// 	2. fillText():
//
// 	Description:		Fills in text from the appropriate language file	
//
//	Operation:			Grabs the global variables (ALL IN CAPS) from the 
//						loaded language file and displays them. This allows for
//						easy addoption of multi-lingual sites.
//
//	Dependencies:		elements with the following:
//							id = "legend_title"		
//							name = "project_type"		
//							class = "stats_left"		
//							id = "overlay_title"		
//							id = "overlay_msg"		
//							class = "overlay"		
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	LEGEND_TITLE, LEGEND_TEXT, SUMMARY_HEADERS, DISPLAY_TITLE,
//						DISPLAY_MSG
//
//	Input:				None.
//	Output:				Displays all text on map. 
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen 						  	////

//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-
function showOverlay() {
	document.getElementById("overlay_title").innerHTML = DISPLAY_TITLE;
	document.getElementById("overlay_msg").innerHTML = DISPLAY_MSG;
	$("#overlay").corner("keep 16px cc:#8607c1");	// adjust inner border corners
	$("#overlay").css("display", "inline-block");	// display overlay once stuff loads!
}

function fillText() {
	document.title = TITLE;
}
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-

// 	4. initMap():
//
// 	Description:		Initializes the global map object.	
//
//	Operation:			Initializes the map object using leaflet's L.map function
//
//	Dependencies:		Leaflet.js		
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	map		--- the global map object
//
//	Input:				None.
//	Output:				None.
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen

//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-
function initMap() {
	map = new L.map('fruitMap', { //First, initialize the map
		center: MAP_CENTER,
		zoom: MAP_INIT_ZOOM,
		minZoom: MAP_MIN_ZOOM,
		maxZoom: MAP_MAX_ZOOM,
		attributionControl: true,
		fullscreenControl: true
	});	
	map.attributionControl.setPrefix(ATTRIBUTION);
}
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-

// 	5. applyBaseMap():
//
// 	Description:		Applies the basemap tiles	
//
//	Operation:			grabs a set of Stamen or Mapzen base tiles and 		
//	 					applies them to the map
//
//	Dependencies:		Leaflet.js	
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	STAMEN_MAP_TYPE ---	A string specified on maps.stamen.com
//
//	Input:				None.
//	Output:				None.
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen

//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-
function applyBaseMap(id) {
	map.addLayer(new L.StamenTileLayer(STAMEN_MAP_TYPE), {});
}
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-

// 	7. LoadData():
//
// 	Description:		Loads the appropriate dataset calls the plotting function.	
//
//	Operation:			Grabs the data from the gloabl dataset PROJECT_MAP_DATA.
//						Stores it in a local variable data and a global AllData.
//						(yes, i know this is wildly redundant, its to deal with 
//						other methods of data entry). Then it calls specific functions
//						to plot the data.
//
//						MAKE SURE ALL DATA IS SORTED BY NAME, THEN START-YEAR, 
//						THEN START-MONTH, OTHERWISE YOU'LL LOSE A LOT OF POINTS!!!	
//
//	Dependencies:		leaflet.js
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	base, PROJECT_MAP_DATA, SELECTED_URL, LARGE_ICON_SIZE, DATA_NAMES,
//						ICON_URLS, SMALL_ICON_SIZE, BASE_Z_OFFSET, VARIOUS
//						You can find descriptions for these variables in the global
//						variable definition file. 
//
//	Input:				None.
//	Output:				Data points appear on map. 
//
//	Error handling:		If a data entry doesn't have a name, lat, or lng, or is a
//						duplicate, it isn't show. Duplicate indicies are noted in 
//						a separate array 
//
// 	Algorithms:			None. 
//	Data structures:	Data is treated as a json 
//
//	Known bugs:			None.
// 	Limitations:		DATA MUST BE SORTED BY NAME (ALPHABETICAL) THEN START-YEAR
//						THEN START-MONTH.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen

//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-
function loadData() {
	var url = DATA_URL;
	var options = {sendMethod: 'auto'};
	var query = new google.visualization.Query(url, options);
	query.setQuery('select *');				
	query.send(onQueryResponse);
							
}

function onQueryResponse(response) {
	if(response.isError()) {
		throw new Error("data could not be retieved from Google sheets")
	} else {
		var data = googleDataTable2JSON(response.getDataTable());	// convert data to json
		organizeData(data);												// feed into plotting function
		
	}
}

function googleDataTable2JSON(dataTable) {

	numCols = dataTable.getNumberOfColumns();
	numRows = dataTable.getNumberOfRows();

	var data = [];										// initialze data array to hold json
	
	for(var i=0; i<numRows; i++) {						// loop through rows
		data.push({});									// on each row creating a new dictionary
		for(var j=0; j<numCols; j++) {					// and loop through each column of that row
			
			var lbl = dataTable.getColumnLabel(j);		// get the name of the column
			var value = dataTable.getValue(i,j);		// get cell's value
			if (!value) {								// if a value exists in the cell
				value = "";
			} 
			data[i][lbl] = value;						// store the "key: value" pair
		}
	}
	RawData = data;
	return data											// after all looping is done, return the finalized json
}

function organizeData(d) {
	
	if (!d | d.length == 0) { // if no data is found...
		alert("\nWe're having some trouble finding fruit for you, please check back again soon!\n\nIf you still see this message in a few hours, please let us know.\n\n\n")
		return;
	} else {
		
		// remove all incomplete data
		var toRemove = []
		for (var i=0; i<d.length; i++) {
			d[i].dup = [];
			if(!hasData(d,i)) {
				toRemove.push(i);
			}
		}
		d = removeData(d, toRemove)
		
		// sort data by timestamp of data entry, most recent first.
		d.sort(function(a,b) {
			return b[DATA_NAMES.time_stamp]-a[DATA_NAMES.time_stamp];
		});
		
		// classify all points as toPlot=TRUE
		// classify all duplicates as toPlot=FALSE
		// fill array of d[i].dups = [index dup1, index dup2, ... , index dup_n] on the first (plotable) point. 
		for(var i=0; i<d.length; i++) {
			d[i].toPlot = true;
			for (var j=0; j<i; j++) {
				if (isDuplicate(d, i, j)) {
					d[j].dup.push(i);
					d[i].toPlot = false;
					break;
				}
			}
		}
		
	}
	AllData = d; 
	plotData(d);
}


// IDENTIFIES WHETHER A ROW OF DATA HAS (a) A VALID LATITUDE, (b) A VALID LONGITUDE, (c) SOME FRUIT LISTED, AND (d) A VALID TIMESTAMP 
function hasData(d, i) {
	// first check to make sure there is non-zero data
	if (d[i][DATA_NAMES.lat] > LIMIT_UPPER_LAT | d[i][DATA_NAMES.lat] < LIMIT_LOWER_LAT) {
		return false;
	}
	if (d[i][DATA_NAMES.lng] > LIMIT_UPPER_LNG | d[i][DATA_NAMES.lng] < LIMIT_LOWER_LNG) {
		return false;
	}
	if (d[i][DATA_NAMES.oranges] == NONE & d[i][DATA_NAMES.grapefruit] == NONE & d[i][DATA_NAMES.lemon] == NONE & d[i][DATA_NAMES.lime] == NONE & d[i][DATA_NAMES.other_citrus] == NONE & d[i][DATA_NAMES.prickly_pear] == NONE & d[i][DATA_NAMES.other] == NONE) {
		return false;
	}
	if (!d[i][DATA_NAMES.time_stamp] | typeof d[i][DATA_NAMES.time_stamp] != "object"){
		return false;
	}
	return true;	
}

// Removes the rows of data from array 'd' at the indices listed in array 'indices'. 
function removeData(d, indices) {
	indices.sort(function (a,b) {
		return a-b;
	}) 	
	for (var i=indices.length-1; i>=0; i--) {
		d.splice(indices[i], 1)
	}
	return d
}

function isDuplicate(data, a, b) {
	if(Math.abs(data[a][DATA_NAMES.lat] - data[b][DATA_NAMES.lat]) < LAT_TOLERANCE 
	& Math.abs(data[a][DATA_NAMES.lng] - data[b][DATA_NAMES.lng]) < LNG_TOLERANCE ) {
		return true;
	} else {
		return false;
	}
}

// returns bin as an array of length 2 where the 0th element is the color:
// 		0 = color
//		1 = grey
// and the 1st element is the icon:
//		0 = grapefruit
//		1 = orange
//		2 = lemon
//		3 = lime
// 		4 = prickly pear
//	 	5 = various fruits	
//	 	6 = unknown
function getBin(row) {
	var bin = [0,0];
	
	// get bin[0] based on whether fruit is currently in season
	var cur = new Date();
	var year = cur.getFullYear();
	var start = row[DATA_NAMES.start];
	var end = row[DATA_NAMES.end];
	var startMonth = start.split("/")[MONTH_INDEX];
	var startDay = start.split("/")[DAY_INDEX];
	var	endMonth = end.split("/")[MONTH_INDEX];
	var	endDay = end.split("/")[DAY_INDEX];
			
	start = new Date(year, startMonth-1, startDay);
	end = new Date(year, endMonth-1, endDay);
	
	if (start<end) {
		if (cur >= start & cur < end) {
			bin[0] = IN_SEASON;
		} else {
			bin[0] = OUT_OF_SEASON;
		}
	} else {
		if (cur >= start | cur < end) {
			bin[0] = IN_SEASON;
		} else {
			bin[0] = OUT_OF_SEASON;
		}
	}
	
	// get bin[1] based on which icon should be displayed
	if (row[DATA_NAMES.grapefruit] != NONE & row[DATA_NAMES.oranges] == NONE & row[DATA_NAMES.lemon] == NONE & row[DATA_NAMES.lime] == NONE & row[DATA_NAMES.prickly_pear] == NONE & row[DATA_NAMES.other_citrus] == NONE & row[DATA_NAMES.other] == NONE) {
		bin[1] = GRAPEFRUIT;
	} else if (row[DATA_NAMES.grapefruit] == NONE & row[DATA_NAMES.oranges] != NONE & row[DATA_NAMES.lemon] == NONE & row[DATA_NAMES.lime] == NONE & row[DATA_NAMES.prickly_pear] == NONE & row[DATA_NAMES.other_citrus] == NONE & row[DATA_NAMES.other] == NONE) {
		bin[1] = ORANGE;                                                                                               
	} else if (row[DATA_NAMES.grapefruit] == NONE & row[DATA_NAMES.oranges] == NONE & row[DATA_NAMES.lemon] != NONE & row[DATA_NAMES.lime] == NONE & row[DATA_NAMES.prickly_pear] == NONE & row[DATA_NAMES.other_citrus] == NONE & row[DATA_NAMES.other] == NONE) {
		bin[1] = LEMON;                                                                                                
	} else if (row[DATA_NAMES.grapefruit] == NONE & row[DATA_NAMES.oranges] == NONE & row[DATA_NAMES.lemon] == NONE & row[DATA_NAMES.lime] != NONE & row[DATA_NAMES.prickly_pear] == NONE & row[DATA_NAMES.other_citrus] == NONE & row[DATA_NAMES.other] == NONE) {
		bin[1] = LIME;                                                                                                 
	} else if (row[DATA_NAMES.grapefruit] == NONE & row[DATA_NAMES.oranges] == NONE & row[DATA_NAMES.lemon] == NONE & row[DATA_NAMES.lime] == NONE & row[DATA_NAMES.prickly_pear] != NONE & row[DATA_NAMES.other_citrus] == NONE & row[DATA_NAMES.other] == NONE) {
		bin[1] = TUNA;                                                                                                  
	} else if (row[DATA_NAMES.grapefruit] == NONE & row[DATA_NAMES.oranges] == NONE & row[DATA_NAMES.lemon] == NONE & row[DATA_NAMES.lime] == NONE & row[DATA_NAMES.prickly_pear] == NONE & (row[DATA_NAMES.other_citrus] != NONE | row[DATA_NAMES.other] != NONE)) {
		bin[1] = UNKNOWN;
	} else {
		bin[1] = VARIOUS;
	}
	
	return bin; 
}

function getPopup(row) {
	var lbl = "";
	var startMonth = MONTHS_LONG[row[DATA_NAMES.start].split("/")[0]-1];
	var startDay = row[DATA_NAMES.start].split("/")[1];
	var endMonth = MONTHS_LONG[row[DATA_NAMES.end].split("/")[0]-1];
	var endDay = row[DATA_NAMES.end].split("/")[1];
	if(row.bin[0] == OUT_OF_SEASON) {
		lbl = OUT_OF_SEASON_MSG+START_BOLD+startMonth+" "+startDay+END_BOLD+".";
	} else {
		if (row[DATA_NAMES.grapefruit] != NONE) {
			lbl = lbl + START_BOLD + GRAPEFRUIT_LBL + END_BOLD + NEWLINE + String(row[DATA_NAMES.grapefruit]) + SPACE + TREE_MSG + NEWLINE + NEWLINE;
		}
		if (row[DATA_NAMES.oranges] != NONE) {
			lbl = lbl + START_BOLD + ORANGE_LBL + END_BOLD + NEWLINE + String(row[DATA_NAMES.oranges]) + SPACE + TREE_MSG + NEWLINE + NEWLINE;
		} 
		if (row[DATA_NAMES.lemon] != NONE) {
			lbl = lbl + START_BOLD + LEMON_LBL + END_BOLD + NEWLINE + String(row[DATA_NAMES.lemon]) + SPACE + TREE_MSG + NEWLINE + NEWLINE;
		}
		if (row[DATA_NAMES.lime] != NONE) {
			lbl = lbl + START_BOLD + LIME_LBL + END_BOLD + NEWLINE + String(row[DATA_NAMES.lime]) + SPACE + TREE_MSG + NEWLINE + NEWLINE;
		}
		if (row[DATA_NAMES.prickly_pear] != NONE) {
			lbl = lbl + START_BOLD + TUNA_LBL + END_BOLD + NEWLINE + String(row[DATA_NAMES.prickly_pear]) + SPACE + CACTUS_MSG + NEWLINE + NEWLINE;
		} 
		lbl = lbl + IN_SEASON_UNTIL_MSG + START_BOLD + endMonth + SPACE + endDay + END_BOLD + "." + NEWLINE + NEWLINE;		
		lbl = lbl + GOOGLE_MAPS_MSG + "<a target='blank' href='https://www.google.com/maps/place/"+row[DATA_NAMES.lat]+","+row[DATA_NAMES.lng]+"'>"+GOOGLE_MAPS_LBL+"</a>";
	}	
	return lbl;
}
	
function plotData(data) {
	markers = [];
	for (i=0; i<data.length; i++) {
		if(data[i].toPlot) {		
			data[i].bin = getBin(data[i]);					// determine bin of each plotable point as [x,y] array. 						
			var icon = L.icon({ 							// 	to be used when displaying the base markers
				iconUrl: ICON_URLS[data[i].bin[0]][data[i].bin[1]], 
				iconSize: ICON_SIZES[data[i].bin[1]]
			})
			var latLng = L.latLng([data[i][DATA_NAMES.lat], data[i][DATA_NAMES.lng]]); // Grab the latLng of the point			
			markers.push( 								// Save the appropriate marker
				L.marker(latLng, {
					icon: icon,
					riseOnHover: true,
					zIndexOffset: 10
				})
			);
			markers[markers.length-1].bindLabel(SPACE+LABEL[data[i].bin[0]][data[i].bin[1]], {
				noHide: false,										// attach labels to all the base points 
				className: "ourLabel"								//	that activate during mouseover
			});
			markers[markers.length-1].bindPopup(getPopup(data[i]));
	
			markers[markers.length-1].addTo(map); 		// And finally, actually add the markers to the map!	
		}	
	}
}
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-

// 	24. beginUserExperience():
//
// 	Description:		Makes the map available to the user.		
//
//	Operation:			fades out the overlay and restarts the counter. 
//
//	Dependencies:		an element with class = "overlay".
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				The overlay fades out and the counters start to spinner
//						again from 0
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen

function beginUserExperience() {
	$("#overlay").fadeOut(800, function() {});	// fade out the overlay
}


// 	26. disableMapControls() / enableMapControls():
//
// 	Description:		disables and enables zooming, panning scrolling, etc. on
//						the map. 
//
//	Operation:			uses Leaflet commands to disable and enable specific
//						map controls. 
//
//	Dependencies:		leaflet.js
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				Map becomes non/re-interactive for the user
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		4/APR/2018	aaron krupp		functional specification writen

function disableMapControls() {
	if(map) {
		map.dragging.disable();
		map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.scrollWheelZoom.disable();
		map.boxZoom.disable();
		map.keyboard.disable();
		if (map.tap) map.tap.disable();
		document.getElementById('fruitMap').style.cursor='default';
	}
}

function enableMapControls() {
	if (map) {
		map.dragging.enable();
		map.touchZoom.enable();
		map.doubleClickZoom.enable();
		map.scrollWheelZoom.enable();
		map.boxZoom.enable();
		map.keyboard.enable();
		if (map.tap) map.tap.enable();
		document.getElementById('fruitMap').style.cursor='grab';
	}
}

// 	28. formatDate(d):
//
// 	Description:		formats the date in the appropriate language 
//
//	Operation:			Accepts strings "", "today", or Date objects
//						If given an empty string, returns an empty string.
//						Otherwise, returns the date as a string formatted
//						as dd/MMM/yyyy (if "today" is passed as the arg,
//						returns today's date, formatted as described above. Duh.).
//						If the passed value is invalid, throws an error.
//
//	Dependencies:		None.
// 	Arguments:			d	---	"", "today", or object type Date
//	Return values: 		string of the date with format dd/MMM/yyyy with MMM in the appropriate language
//						or "" if arg is "".
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				None.
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None.
//
// 	Update history:		20/MAY/2018	aaron krupp		functional specification & fn writen
//						12/OCT/2018	aaron krupp		function and functional spec modified to accomodate Date objects and ""

function formatDate(d) {
	if (d instanceof Date | d == "today") {
		if (d == "today") {
			d = new Date();
		}
		var dd = d.getDate();
		var MMM = MONTH_CODES[d.getMonth()];
		var yyyy = d.getFullYear();
		return dd+"/"+MMM+"/"+yyyy;
	} else if (d == "") {
		return ""
	} else {
		throw new Error("An invalid date was used as an argument in the formatDate() function.")
	}
}


// 	30. detectMobile():
//
// 	Description:		Checks to see if the user is on a mobile browser.
//
//	Operation:			Thanks to Michael Zaporozhets for this function:
//						http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser 
//						Basically just checks all known mobile/table browsers. 
//
//	Dependencies:		None.
// 	Arguments:			None.
//	Return values: 		Binary 	---	True for mobile/tablet, false otherwise.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				None.
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		Relies on known browsers/platforms as of writing, needs to be 
//						regularly updated. Ugh. 
//
// 	Update history:		07/MAR/2019	aaron krupp		functional specification & fn added

function detectMobile() {
		
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

// 	31. adjustDisplayForMobile():
//
// 	Description:		Adjusts font and element sizing for nice mobile/table experience
//
//	Operation:			Adjusts relevant elements by getId.style 
//
//	Dependencies:		None.
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				Font and element sizes change for viewer.
//
//	Error handling:		None.
//
// 	Algorithms:			None. 
//	Data structures:	None.
//
//	Known bugs:			None.
// 	Limitations:		None. 
//
// 	Update history:		07/MAR/2019	aaron krupp		functional specification & fn added

//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-
function adjustDisplayForMobile() {
	document.getElementById("overlay_title").style.fontSize = "36px";
	document.getElementById("overlay_msg").style.fontSize = "22px";
}
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-