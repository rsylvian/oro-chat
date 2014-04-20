Ui = function() {

};

Ui.prototype.enterCall = function() {
	$("#hangupzone").show();
	$("#chat").show();
	$("#callzone").hide();
};

Ui.prototype.leaveCall = function() {
	$("#hangupzone").hide();
	$("#chat").hide();
	$("#callzone").show();
	$('#partnervideo').prop("src", "#");
};

