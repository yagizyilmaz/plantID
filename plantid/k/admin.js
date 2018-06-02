$("body").on("click", ".photo img", function() {
	//console.log("photo clicked");
	var id = $(this).attr("src").substring($(this).attr("src").lastIndexOf("/")+1,$(this).attr("src").lastIndexOf("."));
	$("#edit").html("<img src='/images/bigpics/" + id + ".jpg'></img>");
	$("#attr-edit").fadeIn();
});

$("#close").click(function() {
	$("#attr-edit").css("display", "none");
});

$("#admin-select .btn").each(function(){
	$(this).click(function() {
		//console.log($(this).find(".admin-attr").html());
		$("#edit-select-att").fadeIn(500);
		$("#edit-select-att #e" + String($(this).children().val())).fadeIn(550);
		$("#selected-attr").html($(this).find(".admin-attr").html());
		if (other_key.is_pressed) {
		var str = "#edit-select-att #e" + String(other_key.num);
		$(str).fadeOut(250);
	}
	});
});

var first_photo = 0;
var other_key = {is_pressed: false, num: -1};
var edit_query = {att_type: "", att: ""};
var checked_imgs = [];


$(".edit-q").each(function(){
	$(this).children().on("click", function(){
		edit_query.att = $(this).children().val();
	});
});

/* Find all the checked images' IDs and push them in an array */

$("input[type='checkbox']:checked").parent().each(function(){
	$(this).find("img").each(function(){
	var mid = $(this).attr("src").substring($(this).attr("src").lastIndexOf("/")+1,$(this).attr("src").lastIndexOf("."));
	console_log($(this).parent().find("img").attr("src"));
	checked_imgs.push(mid);
});

/*$("input[type='checkbox']:checked").parent().find("img").attr("src").each(function(){
	
})

});*/

$("body").keypress(function(event){
	
	if(event.which === 49){
		$("input[type='radio']")[0].click();
		other_key.num = 1;
		edit_query.att_type = "shape";

	} else if(event.which === 50) {
		$("input[type='radio']")[1].click();
		other_key.num = 2;
		edit_query.att_type = "pinnated";

	} else if(event.which === 51) {
		$("input[type='radio']")[2].click();
		other_key.num = 3;
		edit_query.att_type = "leaf_bilateral";

	} else if(event.which === 52) {
		$("input[type='radio']")[3].click();
		other_key.num = 4;
		edit_query.att_type = "leaf_top";

	} else if(event.which === 53) {
		$("input[type='radio']")[4].click();
		other_key.num = 5;
		edit_query.att_type = "slanted";

	} else if(event.which === 54) {
		$("input[type='radio']")[5].click();
		other_key.num = 6;
		edit_query.att_type = "serrated";

	} else if(event.which === 55) {
		$("input[type='radio']")[6].click();
		other_key.num = 7;
		edit_query.att_type = "veins";

	} else if(event.which === 56) {
		$("input[type='radio']")[7].click();
		other_key.num = 8;
		edit_query.att_type = "veins_bilateral";

	} else if(event.which === 57) {
		$("input[type='radio']")[8].click();
		other_key.num = 9;
		edit_query.att_type = "shiny";
	}
	other_key.is_pressed = true;
});

$("#nxtbtn").on("click", function(){
	// "nxtbtn" -> Next Button IDsi
	first_photo++;
	$("img")[first_photo].click();	
});

$("#prvbtn").on("click", function() {
	// "prvbtn" -> Previous Button IDsi
	first_photo--;
	$("img")[first_photo].click();
});