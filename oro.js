if (Meteor.isClient) {

  var oro = new OroPeer();
  oro.run();

  Template.call.events({
    'click .callaction' : function(e, t) {
      e.preventDefault();
      var key = t.find('.callkey').value;
      oro.callAKey(key);
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
