var map;								// initialize the variable to hold the map
										
var EPS = 0.0001; 						// This epsilon is the acceptable difference in lat or lng 										
										//	between 2 points to classify them as occupying the same location.	

var base = {Markers: [], Popups: []};	 							// Store all info relevant to base points		

var AllData;							// Global var to hold all data.

var MAP_CENTER = [32.231893,-110.896990];		// Set all map starting parameters
var MAP_MIN_ZOOM = 2;
var MAP_MAX_ZOOM = 18;
var MAP_INIT_ZOOM = 11;

var STAMEN_MAP_TYPE = "terrain";		// Set which type of stamen map we want as a base layer.
										// 	options include: "terrain", "watercolor", and "toner"	
										
var ENGLISH_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];		

var DATA_URL = "https://docs.google.com/spreadsheets/d/1P6Obxu21IhjQFcIBh2N4Cv6fJaMmAyfELEs2tfFWLGI/edit?usp=sharin";
