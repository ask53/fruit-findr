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

var DATA_NAMES = {						
	lat: "Location of the trees -- latitude",
	lng: "Location of the trees -- longitude",
	oranges: "How many of each type of trees do you have? [Sweet oranges]",
	grapefruit: "How many of each type of trees do you have? [Grapefruit]",
	lemon: "How many of each type of trees do you have? [Lemon]",
	lime: "How many of each type of trees do you have? [Lime]",
	other_citrus: "How many of each type of trees do you have? [Other citrus]",
	prickly_pear: "How many of each type of trees do you have? [Prickly pear]",
	other: "How many of each type of trees do you have? [Other]",
	start: "This location typically begins to have fruit",
	end: "This location typically ceases to have fruit",
	time_stamp: "Timestamp"
};

var NO = 0;
var YES = 1;
var PENDING = "PENDING";

var LAT_TOLERANCE = 0.0008;
var LNG_TOLERANCE = 0.0001;
var LIMIT_UPPER_LAT = 90;
var LIMIT_LOWER_LAT = -90;
var LIMIT_LOWER_LNG = -180;
var LIMIT_UPPER_LNG = 180;

var NONE = "None";


var DATA_URL = "https://docs.google.com/spreadsheets/d/1BrO_uKvGsMov9uQxG9omNZFXMSDu3jLHZX1kSSQ0V2I/edit?usp=sharing";

