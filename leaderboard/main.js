
Parse.Cloud.afterSave("Score", function(request) {
  function log_debug(message){
    if(debug){
      console.log(message);
    }
  }
  var query = new Parse.Query("Leaderboard");
 // var mode = request.object.get("mode");
  var user_uuid = request.object.get("user_uuid");
  var score = request.object.get("score");
  var username = request.object.get("username");
  var avatar = request.object.get("avatar");
  var level = request.object.get("level");
  var debug = false;
  log_debug(request.object.toJSON());
  query.equalTo("user_uuid", user_uuid);
  query.find({
    success: function(results) {
      if(results[0]==undefined){
         var LeaderboardClass = Parse.Object.extend("Leaderboard");
         var leaderboard = new LeaderboardClass();
         leaderboard.set("best_score",score);
         leaderboard.set("user_uuid",user_uuid);
         leaderboard.set("username",username);
         leaderboard.set("best_level", level);
         leaderboard.set("avatar", avatar);
         log_debug(leaderboard.toJSON());
         leaderboard.save();
      }
      else{
         query.get(results[0].id, {
           success: function(leaderboard) {
              var hasChanged = false;
              log_debug("BEFORE best level:" + leaderboard.get("best_level") + "/ new level:" + level);
              if(leaderboard.get("best_score") > score){
               leaderboard.set("best_score",score);
               hasChanged=true;
              }
              if(leaderboard.get("best_level") < level){
               leaderboard.set("best_level", level);
               hasChanged=true;
              }
              log_debug("AFTER best level:" + leaderboard.get("best_level") + "/ new level:" + level);
              if(hasChanged){
               leaderboard.save();
              }
           },
           error: function(object, error) {
            console.error(error);
           }
         });
      } 
    },
    error: function() {
      console.error("leaderboard lookup failed");
    }
  });
});

Parse.Cloud.define("bestScores", function(request, response) {
  var query = new Parse.Query("Leaderboard");
  query.ascending("best_score");
  query.find({
   success: function(results) {
     response.success(results);
   },

   error: function(error) {
     response.error("best score retrieval failed"); 
     console.error("ooops cant retrieve best scores");
   }
  });
});

Parse.Cloud.define("bestLevels", function(request, response) {
  var query = new Parse.Query("Leaderboard");
  query.descending("best_levels");
  query.find({
   success: function(results) {
     response.success(results);
   },

   error: function(error) {
     response.error("best level retrieval failed"); 
     console.error("ooops cant retrieve best levels");
   }
  });
});

Parse.Cloud.define("powerList", function(request, response) {
  var query = new Parse.Query("Leaderboard");
  var attribute = request.params.sortby;
  var limit = request.params.limit;
  query.limit(limit);
  var ascending = request.params.ascending;
  if(ascending){
    query.ascending(attribute);
  }
  else{
    query.descending(attribute);
  }

  query.find({
   success: function(results) {
     response.success(results);
   },

   error: function(error) {
     response.error("score retrieval retrieval failed"); 
     console.error("ooops cant retrieve best scores");
   }
  });
});




