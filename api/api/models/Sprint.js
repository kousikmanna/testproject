/**
* Sprint.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName : 'sprint',
	attributes: {

		name :{
			type :'string'
		},

		backlogs : {
			collection : 'BacklogItem',
			via : 'sprint'
		},

		project :{
			model : 'Project'
		},

		startDate : {
			type : 'date'
		},

		endDate : {
			type : 'date'
		}

	},

	index : function(user, ProjectId, callback){
		Sprint.find({project:ProjectId},{sort : 'createdAt DESC'}).populateAll().exec(function(err,sprints){
			if(!err){
				callback(null, sprints);
			} else {
				callback(err);
			}
		});		
	},

	add :function(data,callback){
		Sprint.create(data, function(err,sprint){
			if(!err){
				callback(null, sprint);
			} else {
				callback(err);
			}
		});
	},

	edit : function(sprintId, data, callback){
		Sprint.update(data, function (err,sprint){
			if(!err){
				callback(null, sprint);
			} else {
				callback(err);
			}
		});
	},

	delete: function (sprintId, callback) {
		Sprint.destroy({id : sprintId}).exec( function (err, data) {
			if (!err) {
				if (data.length == 0) {
					return callback({status: 402, message: "sprint not found"});
				} else {
					return callback(null, data.id);
				}
			} else {
				return callback(err);
			}
		});
    },

    getSprintDetails : function (sprintId, req, callback){
    	Sprint.findOne({id:sprintId}).populateAll().exec(function(err,sprint){
    		if(!err){
    			callback(null, sprint);
    		} else {
    			callback(err);
    		}
    	})
    }

};

