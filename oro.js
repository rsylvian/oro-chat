if (Meteor.isClient) {

  var orovideo = new OroVideoPeer();
  orovideo.run();

  Template.callzone.events({
    'click .callaction' : function(e, t) {
      e.preventDefault();
      var key = t.find('.callkey').value;
      orovideo.callAKey(key);
      return false;
    }
  });

  Template.hangup.events({
    'click .hangupaction' : function(e, t) {
      e.preventDefault();
      orovideo.hangup();
      return false;
    }
  });

}

if (Meteor.isServer)
{
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
