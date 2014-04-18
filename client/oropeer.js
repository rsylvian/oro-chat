OroPeer = function(){
	this.peer = new Peer({key: 'hhfk756t8o2prpb9'});
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};

OroPeer.prototype.getUserVideo = function() {
	navigator.getUserMedia({audio: true, video: true}, function(stream){
		$('#myvideo').prop('src', URL.createObjectURL(stream));
		window.localStream = stream;
	}, function(){
		alert("Error! Make sure to click allow when asked for permission by the browser");
	});
};

OroPeer.prototype.setPartnerVideo = function(call) {
	call.on('stream', function(stream){
      $('#partnervideo').prop('src', URL.createObjectURL(stream));
    });
};

OroPeer.prototype.callAKey = function(key) {
	var call = this.peer.call(key, window.localStream);
    if (window.existingCall) {
      window.existingCall.close();
    }
    this.setPartnerVideo(call);
};

OroPeer.prototype.bindOnOpen = function() {
	var getUserVideo = this.getUserVideo();
	this.peer.on('open', function(id) {
		$(".key").html(id);
		getUserVideo();
	});
};

OroPeer.prototype.bindOnCall = function() {
	var that = this;
	this.peer.on('call', function(call) {
		call.answer(window.localStream);
		that.setPartnerVideo(call);
    });
};

OroPeer.prototype.bindOnError = function() {
	this.peer.on('error', function(err){
		alert(err.message);
	});
};

OroPeer.prototype.run = function() {
	this.bindOnOpen();
	this.bindOnCall();
	this.bindOnError();
};

