var data = "";

$('#result-box-1').masonry({
	itemSelector: '.photo',
	columnWidth: 80
});

$('#result-box-2').masonry({
	itemSelector: '.photo',
	columnWidth: 80
});

$('#result-box-3').masonry({
	itemSelector: '.photo',
	columnWidth: 80
});

function tidy_admin(option, div) {
	$(div).imagesLoaded(function (){
		$(div).masonry('reloadItems');
		$(div).masonry({ columnWidth: 80, itemSelector: '.photo', gutter: 10});
	});
}

var detail_arr = {};

var shapeValues = ["S", "M", "L"],
pinnatedValues = ["Y", "N"],
leaflet_bilateralValues = ["Y", "N"],
leaflet_topValues = ["Y", "N"],
slantedValues = ["Y", "N"],
serratedValues = ["Y", "N"],
veinsValues = ["L", "M", "H"],
veins_bilateralValues = ["Y", "N"],
shinyValues = ["L", "M", "H"];

var resultArray1 = [],
resultArray2 = [],
resultArray3 = [];

$('#coll > ul > li').each(function(){
	$(this).children().click(function(event){
		resultArray1 = [],
		resultArray2 = [],
		resultArray3 = [];
		$("#attributes").slideToggle();
		$("#result-box-1").html("");
		$("#result-box-2").html("");
		$("#result-box-3").html("");
		$("#result-box-1-buttons").html("");
		$("#result-box-2-buttons").html("");
		$("#result-box-3-buttons").html("");
		detail_arr = {};

		//console.log($(this).html());

		$("#results-header").html("\"" + $(this).html() + "\" selected.");
		data = $(this).html();

		if(data === "shape") {
			$("#result-box-1-label").removeClass("fifty-percent col-sm-6");
			$("#result-box-2-label").removeClass("fifty-percent col-sm-6");
			$("#result-box-1-label").addClass("one-third col-sm-4");
			$("#result-box-2-label").addClass("one-third col-sm-4");
			$("#result-box-3-label").addClass("one-third col-sm-4");
			$("#result-box-3-label").removeClass("hide");
			$("#result-box-1-label").html("<h2>SIMPLE</h2>");
			$("#result-box-2-label").html("<h2>MAPLE LIKE</h2>");
			$("#result-box-3-label").html("<h2>LEAFLET</h2>");
		} else if(data === "shape" || data == "pinnated" || data == "leaflet_bilateral" || data == "leaflet_top" 
			|| data == "pinnated" || data == "slanted" || data == "serrated" || data == "veins_bilateral") {
			$("#result-box-1-label").addClass("fifty-percent col-sm-6");
			$("#result-box-2-label").addClass("fifty-percent col-sm-6");
			$("#result-box-1-label").removeClass("one-third col-sm-4");
			$("#result-box-2-label").removeClass("one-third col-sm-4");
			$("#result-box-3-label").removeClass("one-third col-sm-4");
			$("#result-box-3-label").addClass("hide");
			$("#result-box-1-label").html("<h2>YES</h2>");
			$("#result-box-2-label").html("<h2>NO</h2>");
		} else if(data === "veins" || data === "shiny") {
			$("#result-box-1-label").removeClass("fifty-percent col-sm-6");
			$("#result-box-2-label").removeClass("fifty-percent col-sm-6");
			$("#result-box-1-label").addClass("one-third col-sm-4");
			$("#result-box-2-label").addClass("one-third col-sm-4");
			$("#result-box-3-label").addClass("one-third col-sm-4");
			$("#result-box-3-label").removeClass("hide");
			$("#result-box-1-label").html("<h2>LOW</h2>");
			$("#result-box-2-label").html("<h2>MEDIUM</h2>");
			$("#result-box-3-label").html("<h2>HIGH</h2>");
		}

		$.getJSON('/results_admin/resultlist', data, function(result) {
			detail_arr = result;
			if(window[data + "Values"].length === 2) {
				$("#result-box-1").addClass("fifty-percent col-sm-6");
				$("#result-box-2").addClass("fifty-percent col-sm-6");
				$("#result-box-1").removeClass("one-third col-sm-4");
				$("#result-box-2").removeClass("one-third col-sm-4");
				$("#result-box-3").removeClass("one-third col-sm-4");
				$("#result-box-3").addClass("hide");
				$("#result-box-1-buttons").addClass("fifty-percent col-sm-6");
				$("#result-box-2-buttons").addClass("fifty-percent col-sm-6");
				$("#result-box-1-buttons").removeClass("one-third col-sm-4");
				$("#result-box-2-buttons").removeClass("one-third col-sm-4");
				$("#result-box-3-buttons").removeClass("one-third col-sm-4");
				$("#result-box-1-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"N\"</button>");
				$("#result-box-2-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"Y\"</button>");
			} else if(window[data + "Values"].length === 3 && data !== "shape") {
				$("#result-box-1").removeClass("fifty-percent col-sm-6");
				$("#result-box-2").removeClass("fifty-percent col-sm-6");
				$("#result-box-1").addClass("one-third col-sm-4");
				$("#result-box-2").addClass("one-third col-sm-4");
				$("#result-box-3").addClass("one-third col-sm-4");
				$("#result-box-3").removeClass("hide");
				$("#result-box-1-buttons").removeClass("fifty-percent col-sm-6");
				$("#result-box-2-buttons").removeClass("fifty-percent col-sm-6");
				$("#result-box-1-buttons").addClass("one-third col-sm-4");
				$("#result-box-2-buttons").addClass("one-third col-sm-4");
				$("#result-box-3-buttons").addClass("one-third col-sm-4");
				$("#result-box-1-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"M\"</button>");
				$("#result-box-1-buttons").append("<button type='button' class='btn btn-danger btn'>Move selected to \"H\"</button>");
				$("#result-box-2-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"L\"</button>");
				$("#result-box-2-buttons").append("<button type='button' class='btn btn-danger btn'>Move selected to \"H\"</button>");
				$("#result-box-3-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"L\"</button>");
				$("#result-box-3-buttons").append("<button type='button' class='btn btn-danger btn'>Move selected to \"M\"</button>");
			} else if(window[data + "Values"].length === 3 && data === "shape") {
				$("#result-box-1").removeClass("fifty-percent col-sm-6");
				$("#result-box-2").removeClass("fifty-percent col-sm-6");
				$("#result-box-1").addClass("one-third col-sm-4");
				$("#result-box-2").addClass("one-third col-sm-4");
				$("#result-box-3").addClass("one-third col-sm-4");
				$("#result-box-3").removeClass("hide");
				$("#result-box-1-buttons").removeClass("fifty-percent col-sm-6");
				$("#result-box-2-buttons").removeClass("fifty-percent col-sm-6");
				$("#result-box-1-buttons").addClass("one-third col-sm-4");
				$("#result-box-2-buttons").addClass("one-third col-sm-4");
				$("#result-box-3-buttons").addClass("one-third col-sm-4");
				$("#result-box-1-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"M\"</button>");
				$("#result-box-1-buttons").append("<button type='button' class='btn btn-danger btn'>Move selected to \"L\"</button>");
				$("#result-box-2-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"S\"</button>");
				$("#result-box-2-buttons").append("<button type='button' class='btn btn-danger btn'>Move selected to \"L\"</button>");
				$("#result-box-3-buttons").append("<button type='button' class='btn btn-danger btn firstButton'>Move selected to \"S\"</button>");
				$("#result-box-3-buttons").append("<button type='button' class='btn btn-danger btn'>Move selected to \"M\"</button>");
			}
			for(var i = 0; i < Object.keys(detail_arr).length; i++){
				if(window[data + "Values"].length === 2 && Object.values(detail_arr[i])[2] === "Y") {
					$("#result-box-1").append("<div class='photo'><a data-toggle='popover' data-content=" 
						+ Object.values(detail_arr[i])[1]
						+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
						+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
					tidy_admin("update", "#result-box-1");
				} else if (window[data + "Values"].length === 2 && Object.values(detail_arr[i])[2] === "N") {
					$("#result-box-2").append("<div class='photo'><a data-toggle='popover' data-content=" 
						+ Object.values(detail_arr[i])[1]
						+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
						+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
					tidy_admin("update", "#result-box-2");
				} else if(data === "veins" || data === "shiny") {
					if(Object.values(detail_arr[i])[2] === "L") {
						$("#result-box-1").append("<div class='photo'><a data-toggle='popover' data-content=" 
							+ Object.values(detail_arr[i])[1]
							+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
							+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
						tidy_admin("update", "#result-box-1");
					} else if(Object.values(detail_arr[i])[2] === "M") {
						$("#result-box-2").append("<div class='photo'><a data-toggle='popover' data-content=" 
							+ Object.values(detail_arr[i])[1]
							+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
							+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
						tidy_admin("update", "#result-box-2");
					} else if(Object.values(detail_arr[i])[2] === "H") {
						$("#result-box-3").append("<div class='photo'><a data-toggle='popover' data-content=" 
							+ Object.values(detail_arr[i])[1]
							+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
							+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
						tidy_admin("update", "#result-box-3");
					}
				} else {
					if(Object.values(detail_arr[i])[2] === "S") {
						$("#result-box-1").append("<div class='photo'><a data-toggle='popover' data-content=" 
							+ Object.values(detail_arr[i])[1]
							+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
							+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
						tidy_admin("update", "#result-box-1");
					} else if(Object.values(detail_arr[i])[2] === "M") {
						$("#result-box-2").append("<div class='photo'><a data-toggle='popover' data-content=" 
							+ Object.values(detail_arr[i])[1]
							+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
							+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
						tidy_admin("update", "#result-box-2");
					} else if(Object.values(detail_arr[i])[2] === "L") {
						$("#result-box-3").append("<div class='photo'><a data-toggle='popover' data-content=" 
							+ Object.values(detail_arr[i])[1]
							+ "><i class='' aria-hidden='true' ></i></i><img src='/images/pics/" 
							+ Object.values(detail_arr[i])[0] + ".jpg'></a></div>");
						tidy_admin("update", "#result-box-3");
					}
				}
			}
		});
});
});

$("#attrButton").on("click", function () {
	$("#attributes").slideToggle();
});

function removeA(arr) {
	var what, a = arguments, L = a.length, ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax= arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
}

$("body").on("click", ".photo img", function() {
	var id = $(this).attr("src").substring($(this).attr("src").lastIndexOf("/")+1,$(this).attr("src").lastIndexOf("."));
	$(this).closest(".photo").toggleClass("selected-img");
	if ($(this).closest(".photo").hasClass("selected-img")) {
		window["resultArray" + $(this).closest("div").parent().attr("id").substr(-1)].push(id);
	} else {
		removeA(window["resultArray" + $(this).closest("div").parent().attr("id").substr(-1)], id);
	}})


$("#admin-select .btn").each(function() {
	$(this).click(function() {
		$("#selected-attr").html($(this).find(".admin-attr").html());
	});
});

$("body").on("click", "#result-box-1-buttons > button", function() { 
	var data_to_send = [];
	var attr_name = $("#results-header").text().split(' ')[0].slice(1,-1);
	data_to_send[0] = attr_name;
	data_to_send[1] = $(this).html().substr(-2, 1);
	data_to_send[2] = resultArray1;
	//console.log(data_to_send);

	$.ajax({
		type: 'POST',
		url: '/results_admin/update',
		data: JSON.stringify(data_to_send),
		contentType: "application/json; charset=utf-8",
		dataType: 'json'
	});
	var attrJ = "#" + attr_name;
	//console.log(attrJ);
	$(attrJ).trigger("click");
	$("#attributes").slideUp(0);
})

$("body").on("click", "#result-box-2-buttons > button", function() {
	var data_to_send = [];
	var attr_name = $("#results-header").text().split(' ')[0].slice(1,-1);
	data_to_send[0] = attr_name;
	data_to_send[1] = $(this).html().substr(-2, 1);
	data_to_send[2] = resultArray2;
	//console.log(data_to_send);

	$.ajax({
		type: 'POST',
		url: '/results_admin/update',
		data: JSON.stringify(data_to_send),
		contentType: "application/json; charset=utf-8",
		dataType: 'json'
	});
	var attrJ = "#" + attr_name;
	//console.log(attrJ);
	$(attrJ).trigger("click");
	$("#attributes").slideUp(0);
})

$("body").on("click", "#result-box-3-buttons > button", function() {
	var data_to_send = [];
	var attr_name = $("#results-header").text().split(' ')[0].slice(1,-1);
	data_to_send[0] = attr_name;
	data_to_send[1] = $(this).html().substr(-2, 1);
	data_to_send[2] = resultArray3;
	//console.log(data_to_send);

	$.ajax({
		type: 'POST',
		url: '/results_admin/update',
		data: JSON.stringify(data_to_send),
		contentType: "application/json; charset=utf-8",
		dataType: 'json'
	});
	var attrJ = "#" + attr_name;
	//console.log(attrJ);
	$(attrJ).trigger("click");
	$("#attributes").slideUp(0);
})