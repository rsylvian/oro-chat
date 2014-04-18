Ui = function() {

};

Ui.prototype.enterCall = function() {
	$("#hangupzone").show();
	$("#callzone").hide();
};

Ui.prototype.leaveCall = function() {
	$("#hangupzone").hide();
	$("#callzone").show();
	$('#partnervideo').prop("src", "#");
};

