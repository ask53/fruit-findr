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
		
		// determine bin of each plotable point set d[i].bin=the correct bin. 
		for(var i=0; i<d.length; i++) {
			d[i].bin = getBin(d, i);	
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

function getBin(data, i) {
	/// placeholder function for now. 
	// fill this with a function that figures out which
	//	icon should be used to plot each point.
	
	return true; 
}
	
function plotData(data) {
	console.log(data)
	base.Markers = [];
	for (i=0; i<data.length; i++) {
		if(data[i].toPlot) {
			var icon = L.icon({ 							// 	to be used when displaying the base markers
				iconUrl: "img/orange_icon.png",
				iconSize: [36,36]
			})
			var latLng = L.latLng([data[i][DATA_NAMES.lat], data[i][DATA_NAMES.lng]]); // Grab the latLng of the point			
			base.Markers.push( 								// Save the appropriate marker
				L.marker(latLng, {
					icon: icon,
					riseOnHover: true,
					zIndexOffset: 10
				})
			)
			base.Markers[base.Markers.length-1].addTo(map); 		// And finally, actually add the markers to the map!
				
			
			
		}
		
	}
	//base.Markers = [];
	//base.Popups = [];
	//var duplicateCounter = 0;
	//
	//AllData = data; 				// store data as global for later access.
    //
	//if (!AllData | AllData.length == 0) { // if no data is found...
	//	alert("\nWe're having some trouble finding fruit for you, please check back again soon!\n\nIf you still see this message in a few hours, please let us know.\n\n\n")
	//} else {
	//	for (var i=0; i<data.length; i++) {
	//		if (!toPlot(data, i)) {
	//			duplicateCounter++;
	//		} else {
	//			if(i>0) {
	//				AllData[i-1].data 
	//			}
	//			
	//		}
	//		
	//		
	//		
	//		
	//		
	//	}
	//	
	//	
	//}
	//
	//
	//
	//
	//for (var i=0; i<data.length; i++) { // Loop through all the rows of the data
	//	var bin = getBin(data, i);
	//	if (isEmpty(i, "name") | isEmpty(i, "lat") | isEmpty(i, "lng") | bin == -1) { 		// if the row is missing a name, latitutde, or longitude, or doesn't fit a bin,
	//	} else {																			//	ignore it. Otherwise:
	//		if (i==0 || data[i][DATA_NAMES.name] != data[i-1][DATA_NAMES.name]) {			// if not a duplicate point (special case for 0th point, cause 0-1 does not exist)
	//			duplicateCounter = 0;
	//			AllData[i].duplicates = [i]; 		// create a new array in AllData called duplicates to hold indices of duplicates of this point
	//			AllData[i].bin = bin;
	//			if (isEmpty(i, "photo")) { // if there's no photo, do nothing
	//			} else { 							// if there's a photo, get it from the link and store it in the browser
	//				photos[i] = new Image();
	//				photos[i].src = data[i][DATA_NAMES.photo];
	//			}
	//			
	//			
	//			
	//			
	//			var icon = L.icon({ 							// 	to be used when displaying the base markers
	//				iconUrl: ICON_URLS[bin],
	//				iconSize: SMALL_ICON_SIZE
	//			})
	//			var latLng = L.latLng([data[i][DATA_NAMES.lat], data[i][DATA_NAMES.lng]]); // Grab the latLng of the point			
	//			used_indices.push(i);
	//			base.Markers.push( 								// Save the appropriate marker
	//				L.marker(latLng, {
	//					icon: icon,
	//					riseOnHover: true,
	//					zIndexOffset: BASE_Z_OFFSET
	//				})
	//				.on('click', function(event) {
	//					
	//					click_lat = event.latlng.lat; 			// Grab the latLng of the cliked point 
	//															// 	(returns value of marker's center, regardless of where is clicked...)
	//					var j = base.Markers.map(function(a) {return a._latlng.lat}).indexOf(click_lat);
	//															// this confusing line gets the index in base.Markers
	//															//	of the point with the same latitude as the clicked point
	//															// 	we'll use that index to access the marker, label, and data.
	//					var z = used_indices[j];				// Then get the index of the point in AllData.
	//					
	//					if (AllData[z].duplicates.length > 1) { // if the current point HAS duplicates:
	//						if(!info_panel_open && !lobby_active) {		// and the info panel and lobby are both closed
	//							info_being_displayed = z;		// set the info to display as this point
	//							showLobby(z);					// show the lobby for this point, since it has multiple projects
	//					
	//							openPanel('lobby');				// open the info panel
	//						} else if ((info_panel_open || lobby_active) && info_being_displayed != z ) {	// if the info panel or lobby are open and not displaying this point
	//							info_being_displayed = z;		// change the info being displayed to this point
	//							closePanel('info_panel');
	//							showLobby(z);					// show the lobby since this point has multiple projects
	//							openPanel('lobby');
	//						}	 
	//					} else {								// If the selected point DOESN'T have duplicates
	//						if (!info_panel_open) {				// and the info panel is closed
	//							info_being_displayed = z;		// set the info being displayed to this point
	//															// push the info for this community/project to the info panel
	//							if (lobby_active) {
	//								closePanel('lobby');			// close the lobby in case it's open
	//							}
	//							showInfo(z);
	//							openPanel('info_panel');				// open the info panel
	//						} else if (info_panel_open && info_being_displayed != z) {	// if the info panel is open, but showing a different point
	//							info_being_displayed = z;		// change the info being displayed to this point
	//							showInfo(z);					// push the current info to the info panel. 
	//						}
	//					}
	//					
	//				})
	//			);
	//			base.Markers[base.Markers.length-1].bindLabel(getLabel(data, i), {
	//				noHide: false,										// attach labels to all the base points 
	//				className: "ourLabel"								//	that activate during mouseover
	//			});
	//			base.Markers[base.Markers.length-1].addTo(map); 		// And finally, actually add the markers to the map!
	//	
	//	
	//		} else {													// if i is a duplicate
	//			duplicateCounter = duplicateCounter + 1;				// increment the duplicate counter
	//			AllData[i-duplicateCounter].duplicates.push(i);
	//			AllData[i].isDuplicate = true;
	//			AllData[i-1].isDuplicate = true;
	//			bin = getBin(data, i);
	//			AllData[i].bin = bin;
	//			if (AllData[i-1].bin == VARIOUS) {
	//				bin = VARIOUS;
	//			} else if (bin != AllData[i-1].bin) {
	//				bin = VARIOUS;
	//				AllData[i-1].bin = VARIOUS;
	//				
	//				map.removeLayer(base.Markers[base.Markers.length-1]);
	//				base.Markers[base.Markers.length-1].options.icon.options.iconUrl = ICON_URLS[VARIOUS];
	//				base.Markers[base.Markers.length-1].addTo(map);
	//			}
	//			AllData[i].bin = bin;	
	//			if (isEmpty(i, "photo")) { // if there's no photo, do nothing
	//			} else { 							// if there's a photo, get it from the link and store it in the browser
	//				photos[i] = new Image();
	//				photos[i].src = data[i][DATA_NAMES.photo];
	//			}	
	//		}	
	//	};
	//};


	
}
//-!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!--!-


// 	14. removePoint():
//
// 	Description:		removes point from map	
//
//	Operation:			removes the point at index i from map with leaflet commands
//
//	Dependencies:		leaflet.js
// 	Arguments:			i 	---	the index of the point to remove in base.Markers array
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				Makes formerly visible point on map invisible. 
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

function removePoint(i) {
	map.removeLayer(base.Markers[i]); 
}

// 	15. fadeIn(el) / fadeOut(el, threshhold):
//
// 	Description:		fades in/out a passed html element	
//
//	Operation:			Fades in or out the passed element by adjusting the 
//						the div element's opacity in steps. Many thanks to:		
//						http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/ 	
//						for this simple and lovely bit of js. Cheers! 							
//						If the div is visible, fadeIn does nothing. If it's not, 
//						fade out does nothing.
//
//	Dependencies:		None.
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				None.
//	Output:				The passed html element appears or disappears slowly
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


function fadeOut(el, threshhold){ 
	
	(function fade() {
		if ((el.style.opacity -= threshhold) < 0) {
			el.style.opacity = 0;
		} else {
			requestAnimationFrame(fade);
		}
	})();
	
	el.style.display = 'none';
}

function fadeIn(el){

	el.style.opacity = 0;
	el.style.display = 'block'; 
	
	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val += .075) > 1)) {
		el.style.opacity = val;
		requestAnimationFrame(fade);
		}
	})();
	
}

// 	16. onKeypress / goBack(key):
//
// 	Description:		onKeypress triggers when any keys are pressed. If the key
//						is 'esc,' calls the goBack(key) fn. 		
//
//	Operation:			If the key is 'x' close everything (info panel and lobby)
//						Otherwise, the key pressed is 'esc' so go back one step.
//						If the user is in an info panel w/o a lobby, close it.
//						If an info panel with a lobby, go back to the lobby.
//						If a lobby, close it.
//
//	Dependencies:		None.
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	None.
//
//	Input:				Takes in keystroke from user.
//	Output:				Closes info panel or lobby.
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

$(document).bind('keypress', function (event) {
	if(String(event.originalEvent.key) == "Escape") {
		goBack('esc');		
	}
})

function goBack(key) {
	if (key == 'x') {
		closePanel('lobby');
		closePanel('info_panel');
		hideSelectedMarker();
	} else if (lobby_active) {
		closePanel('lobby');
		hideSelectedMarker();
	} else if (info_panel_open && AllData[info_being_displayed].duplicates.length == 1) {
		closePanel('info_panel');
		hideSelectedMarker();
	} else if (info_panel_open) {
		showLobby(info_being_displayed);
		openPanel('lobby')
		closePanel('info_panel');
	}			
}

// 	17. showSelectedMarker() / hideSelectedMarker():
//
// 	Description:		Shows/hides the marker on the map that indicates for which
//						point the data is being displayed.
//
//	Operation:			Finds the lat-lng of the active point by using the index
//						stored in the global info_being_displayed. Places (or 
//						or removes) the active-marker at that location.
//
//	Dependencies:		None.
// 	Arguments:			None.
//	Return values: 		None.
//
//	Global variables:	info_being_displayed 	---	the index of the global var AllData
//													dataset for the active point.
//						AllData	---	Global dataset
//						active_marker_on	--- Boolena, true if active marker is on
//
//	Input:				None.
//	Output:				Active marker is shown or hidden
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

function showSelectedMarker() {
	if (!active_marker_on) {
		var latLng = L.latLng([AllData[info_being_displayed][DATA_NAMES.lat], AllData[info_being_displayed][DATA_NAMES.lng]]); // Grab the latLng of the point
		activeMarker = L.marker(latLng, {
							icon: selectedIcon,
							riseOnHover: true,
							zIndexOffset: BASE_Z_OFFSET
						})
		activeMarker.addTo(map);
		active_marker_on = true;
	}
}

function hideSelectedMarker() {
	if (active_marker_on) {
		if (info_being_displayed != -1) {
			map.removeLayer(activeMarker);
		}
		active_marker_on = false;
	}
}

// 	18. numberWithCommas(x) / numberWithoutCommas(x):
//
// 	Description:		Takes a number and adds/removes the formatting commas	
//
//	Operation:			The "With" fn: adds commas between every 3rd digit for the 
//						standard US/Mexico numerical display format. Returns the 
//						number as a string.				
//							
//						The "Without" fn: does the reverse (takes in a 		
//						string that could have commas, removes them, and returns
//						a numerical value, either a float or an int).		
//
//	Dependencies:		None.
// 	Arguments:			x	--- "With": int to add commas to
//								"Without": string to remove commas from
//	Return values: 		"with": returns a string with commas
//						"without": returns an int without commas
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

							
function numberWithCommas(x) {
	return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 	//The parseInt() removes any leading zeros that the value may have. 
}

function numberWithoutCommas(x) {
	return Number(x.replace(/,/g, ''));
}

// 	23. isEmpty(i, name):
//
// 	Description:		checks to see if a certain field in the global dataset is
//						empty or not. 
//
//	Operation:			If the field has an empty or null value, returns true. 
//
//	Dependencies:		None.
// 	Arguments:			i 	---	the index of the global dataset to check
//						name---	the name of the field to check
//	Return values: 		Boolean -- true if field is empty or null, false if not.
//
//	Global variables:	AllData 	--- the global dataset
//						DATA_NAMES
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

function isEmpty(i, name) {
	empty = false;
	if (AllData[i][DATA_NAMES[name]] == "" | AllData[i][DATA_NAMES[name]] == null) {
		empty = true;
	}
	return empty;
}

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