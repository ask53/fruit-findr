////////////////////////////////////////////////////////////////////////////////
////				Stuff to be Translated 									////
////	The stuff in the next section is all of the text that appears at 	////
////	any point on the map. It's stored in simple strings for ease of 	////
////	translation. Enjoy =)												////
////////////////////////////////////////////////////////////////////////////////


var MONTHS_LONG = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September", 
					"October", "November", "December"];
					
var MONTH_CODES = ["Jan", "Feb", "Mar",
					"Apr", "May", "Jun",
					"Jul", "Aug", "Sep",
					"Oct", "Nov", "Dec"];

var DATE = "Date";


var SEE_MORE = "More info";

var LEGEND_TITLE = "Project types"
var LEGEND0 = "\xa0\xa0\xa0Rainwater\xa0harvesting\xa0systems";
var LEGEND1 = "\xa0\xa0\xa0Ceramic\xa0water\xa0filters";
var LEGEND2 = "\xa0\xa0\xa0Biochar\xa0water\xa0treatment";
var LEGEND3 = "\xa0\xa0\xa0Other\xa0projects"
var LEGEND4 = "\xa0\xa0\xa0Multiple\xa0projects";
var LEGEND_TEXT = [LEGEND0, LEGEND1, LEGEND2, LEGEND3, LEGEND4];

var BACK_BUTTON_TXT = ["Back to all "," projects"];
var LOBBY_MESSAGE = ["<b>Click on a project below for more information<br></b>"]
var SUMMARY_TITLE = "<b>Community profile</b>";

var NO_PROJECTS_HDR = "Projects";										// Headers for lobby summary chart
var PPL_SERVED_HDR = "People impacted";
var CERAMIC_HDR = "Ceramic filters distributed";
var RWH_HDR = "Liters of rainwater capacity installed";
var SUMMARY_HEADERS = [NO_PROJECTS_HDR, PPL_SERVED_HDR, RWH_HDR, CERAMIC_HDR];

//// The labels for the info windows. 
//// Make sure the handles match the ids for 
////	their divs in index.html!!!! <<--- Super important!!!
var LBL = {
	proj_name: "",
	photo: "",
	video: "",
	photo_folder: "View more photos",
	name: "Community",
	muni: "Municipality",
	proj_type: "Project type",
	site: "Site",
	dates: "Date(s)",
	people: "Number of people served",
	workshops: "Workshops",
	big_train: "Weeklong capacity trainings",
	small_train: "Small-scale capacity trainings",
	no_ceramic_systems: "Ceramic filtration systems",
	no_ceramic_filters: "Ceramic filter cartridges",
	no_biochar: "Biochar systems built",
	no_ferro: "Ferrocement cisterns built",
	no_roto_small: "Small plastic cisterns (2,500L) installed",
	no_roto_medium: "Medium plastic cisterns (5,000L) installed",
	no_roto_big: "Large plastic cisterns (10,000L) installed",
	no_geomembrane: "Large geomembranes installed",
	no_underground: "Underground cisterns installed",
	no_rainjar: "Rainjars (2,000L) installed",
	partner: "Partner(s)",
	primary_contact: "Primary contact(s)",
	contact_info: "Contact info",
	docs: "More information",
	notes: "Notes"
};

var BETWEEN_DATES = " --- ";

var END_OF_HEADER = ":<br>\xa0\xa0\xa0";

//////////////////////////////////////////////////////
var TITLE = "FruitFindr";
var DISPLAY_TITLE = "<b>fruit findr</b>";
var DISPLAY_MSG = "FIND FREE FRUIT";
var ATTRIBUTION = 'Data hosting on <a href="http://drive.google.com">Google Drive</a>';

var LABEL = [["Grapefruit", "Orange", "Lemon", "Lime", "Prickly Pear", "Various", "Mystery fruit..."],
["Grapefruit (out of season)", "Orange (out of season)", "Lemon (out of season)", "Lime (out of season)", "Prickly Pear (out of season)", "Various (out of season)", "Mystery fruit  (out of season)"]];

var OUT_OF_SEASON_MSG = "Sorry! This fruit's season ususally starts around ";
var IN_SEASON_UNTIL_MSG = "This location typically has fruit until around ";

var MONTHS_LONG = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September", 
					"October", "November", "December"];
					
var POPUP_TITLE = "FRUIT";
var TREE_MSG = "tree(s)";
var CACTUS_MSG = "plant(s)";
var GRAPEFRUIT_LBL = "Grapefruit";
var ORANGE_LBL = "Orange";
var LEMON_LBL = "Lemon";
var LIME_LBL = "Lime";
var TUNA_LBL = "Prickly pear";