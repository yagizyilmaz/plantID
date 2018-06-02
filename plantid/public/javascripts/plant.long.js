var totalResultCount = 0, //# of species in database
	filteredResultCount = 0, //# of filtered species
	queryArray = {}, //js object, that holds attributes & filters
	data = ""; //js object transformed to JSON string for AJAX request

function isExpandible(obj) {
	//determines if a question brings up more questions
	return !!obj.closest(".expandible-question");
}

function isTrigger(obj) {
	//determines if a choice brings up more questions
	return obj.children().hasClass("expand-trigger");
}

function isSecondary(obj) {
	//determines if a question brought up by another one
	return !!obj.closest(".secondary-question");
}

function tidy(option) {
	$('#results-photo').imagesLoaded(function (){
		if(option != "init") {
			$('#results-photo').masonry('reloadItems');
		}
		$('#results-photo').masonry({ columnWidth: 80, itemSelector: '.photo', gutter: 10, fitWidth: true});
	});
	$('#results-photo a').popover({ trigger: "hover", placement: "bottom", container: "body"});
};

function updateStats(result, total) {
	$("#number-of-results").html(result);
	$("#number-of-total").html(total);
	$("#progress input").val(Math.round(result/total*100));
	$(".dial").trigger("change");
	$("input#progresscircle.dial").val($("input#progresscircle.dial").val() + "%");
}

function init() {
	$.getJSON('/results/resultlist', function(data) {
		$.each(data, function() {
			$("#results-photo").append("<div class='photo'><a data-toggle='popover' data-content=" 
				+ JSON.stringify(this.Species) 
				+ "><img src='/images/pics/" 
				+ this.MediaId + ".jpg'></a></div>");
			tidy("init");
			totalResultCount ++;
		});
		updateStats(totalResultCount, totalResultCount);
	});
};

$('.question .btn-group').each(function(){
	var subGroupToggled = false;
	$(this).children().click(function(event){
		if(isExpandible(this) && !isSecondary(this)) {
			if(isTrigger($(this)) && !subGroupToggled) {
				$(".secondary-question").fadeIn(500);
				subGroupToggled = true;
			} else if (subGroupToggled && !isTrigger($(this))) {
				$(".secondary-question").fadeOut(250);
				$(this).parentsUntil(".expandible-question").siblings(".secondary-question")
					.find("input[type='radio']:checked").each(function() {
					$(this).prop("checked", false);
					$(".secondary-question .btn").removeClass("active");
					delete queryArray[$(this).attr("name")];
				});
				subGroupToggled = false;
			}
		}
		queryArray[$(this).children().attr("name")] = ($(this).children().attr("value"));
		if(this.innerText === "Not Sure") {
			delete queryArray[$(this).children().attr("name")];
		}
		data = jQuery.param(queryArray);
		$.getJSON( '/results/filterresultlist', data, function(result) {
			$('#results-photo').html(" ");
			filteredResultCount = 0;
			$.each(result, function(){
    			$("#results-photo").append("<div class='photo'><a data-toggle='popover' data-content=" 
    				+ JSON.stringify(this.Species) 
    				+ "><img src='/images/pics/" 
    				+ this.MediaId + ".jpg'></a></div>");
				tidy("update");
    			filteredResultCount++;
    		});
			updateStats(filteredResultCount, totalResultCount);
		});

	});
});

$("#reset").click(function(event) {
	$('#results-photo').html(" ");
	$('#results-photo').masonry('destroy');
	totalResultCount = 0;
	filteredResultCount = 0;
	queryArray = {};
	data = "";

	$(".btn").each(function() {
		$(this).removeClass("active");
	});
	init();
});

$(function() {
	$(".dial").knob({
		//draws "jQuery Knob"
		"width" : 100,
		"height" : 100,
		"thickness" : 0.15,
		"fgColor": "#079e5d",
		"bgColor": "#d1d1d1",
		"inputColor": "black"
	});
	init();
});