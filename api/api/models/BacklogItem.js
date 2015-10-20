/**
* BacklogItem.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
 	tableName : "BacklogItem",
  	attributes: {

  		name : {
  			type : "string",
  			required : true
  		},

  		description : {
  			type : "string",
  		},

  		project: {
			model: 'Project',
			required: true
		},

		sprint : {
			model : 'Sprint'
		},

		task : {
	  		collection : 'Task',
	  		via : 'backlog'
	  	}

  	},

	index : function(user, input, callback){
		var conditions = {};
		if(input.project)
			conditions['project'] = input.project;
		if(input.sprint)
			conditions['sprint'] = input.sprint;
		BacklogItem.find({where:conditions, sort: 'createdAt DESC'}).populateAll().exec(function(err,backlogs){
			if(!err){
				callback(null,backlogs)
			} else {
				callback(err)
			}
		})
	},

	add: function (data, callback) {
		BacklogItem.create(data, function (err, backlog) {
			if(!err) {
				callback(null, backlog);
			} else {
				callback(err);
			}
		});
	},

	edit : function(backlogId, req, callback){
		BacklogItem.update({id:backlogId}, req, function (err, backlog){
			if(!err){
				callback(null,backlog)
			} else {
				callback(err)
			}
		})
	},

	delete: function (backlogId, callback) {
		BacklogItem.destroy({id : backlogId}).exec( function (err, data) {
			if (!err) {
				if (data.length == 0) {
					return callback({status: 402, message: "backlog item not found"});
				} else {
					Task.destroy({task : backlogId}).exec(function (errors, response){
						if(!errors){
							console.log('Tasks associated with the backlogId'+backlogId+' are deleted');
						}
					});
					return callback(null, data.id);
				}
			} else {
				return callback(err);
			}
		});
    },

    getBacklogDetails : function(backlogId, callback){
    	BacklogItem.findOne({id:backlogId}).populateAll().exec(function (err, backlog){
    		if(!err){
    			if (backlog.project.usersRole.length == 0){
    				callback (null,backlog)
    			} else {
	    			async.map(backlog.project.usersRole,function(user,cb){
						User.findOne({id:user.user}).exec(function(error,userData){
							if(!err){
								user.name = userData.name;
								return cb (null,user);
							} else {
								return cb(err);
							}
						});
					},function(err,users){
						if(!err){
							backlog.project.usersRole = users;
							return callback (null,backlog);
						} else {
							return callback(err);
						}
					});
	    		}
    		} else {
    			callback(err)
    		} 
    	});
    }
};

