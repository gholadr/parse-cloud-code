Parse.Cloud.job("channelDataScrub", function(request, status) {
    // Set up to modify user data
    Parse.Cloud.useMasterKey();
    var counter = 0;
    // Query for all users
    var query = new Parse.Query(Parse.User);
    var counter = 0
    query.each(function(user) {
        // Update to plan value passed in
        var channels = user.get("channels");
        if(typeof channels == 'undefined')
        // need to update user data
        {
            user.set("channels", ['parse_' + user.get("installationId")]);
            counter++;
            return user.save();
        }
    }).then(function() {
            // Set the job's success status
            status.success("user channel  updated completed successfully " +  counter + " times");
        }, function(error) {
            // Set the job's error status
            status.error("Uh oh, something went wrong.");
        });
});

