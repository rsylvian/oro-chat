OroPeer = function(){
	this.peer = new Peer({key: 'hhfk756t8o2prpb9'});
	this.ui = new Ui();
	this.currentCall = null;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};

OroPeer.prototype.getUserVideo = function() {
	navigator.getUserMedia({audio: true, video: true}, function(stream){
		$('#myvideo').prop("src", URL.createObjectURL(stream));
		window.localStream = stream;
	}, function(){
		alert("Error! Make sure to click allow when asked for permission by the browser");
	});
};

OroPeer.prototype.setPartnerVideo = function(call) {
	call.on('stream', function(stream){
      $('#partnervideo').prop("src", URL.createObjectURL(stream));
    });

    this.ui.enterCall();
    this.currentCall = call;
};

OroPeer.prototype.callAKey = function(key) {
	var call = this.peer.call(key, window.localStream);
    // if (window.existingCall) {
    //   window.existingCall.close();
    // }
    this.setPartnerVideo(call);
};

OroPeer.prototype.hangup = function() {

	console.log("hangup");

	if (this.currentCall) {
        this.currentCall.close();
        this.ui.leaveCall();
    }
};

OroPeer.prototype.bindOnOpen = function() {
	var that = this;
	this.peer.on('open', function(id) {
		$(".key").html(id);
		that.getUserVideo();
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

// never fired ??
OroPeer.prototype.bindOnClose = function() {
	this.peer.on('error', function(err){
		this.ui.leaveCall();
	});
};

OroPeer.prototype.run = function() {
	this.bindOnOpen();
	this.bindOnCall();
	this.bindOnError();
	this.bindOnClose();
};

