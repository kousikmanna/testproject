 /**
* Activity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var base_url = "https://s3-ap-southeast-1.amazonaws.com/mantra-dash/avatar/";
// base_url_attachments = "https://s3-ap-southeast-1.amazonaws.com/mantra-dash/attachments/";

module.exports = {
	tableName: "activity",

	attributes: {

		description: {
			type: "string"
			// required : true
		},

		project: {
			// required : true,
			model: 'Project'
		},

		workspace: {
			// required : true,
			model: 'Workspace'
		},

		task: {
			model: 'Task',
		},

		user: {
			// required : true,
			model: 'User',
		},

		likes: {
			type: 'json'
		},

		comments: {
			type: 'json'
		},

		attachment: {
			// model:'Attachment',
			type: 'string'
		},

		parentId: {
			type: 'string',
			defaultsTo:null
		},
	},
	
	index: function (user, input, callback) {
		User.findOne({id: user.id}).populate('projects').exec(function (err, user) {
			if(err){
				return callback(err);
			}
			var fetchActivities = function (projects) {
				if(projects.length == 0)
					return callback(null, []);
				
				async.map(projects, function(project, cb){
					Activity.findActivities({project: project.id}, function(err, activitiesForProject){
						if(err){
							sails.log.error(err);
							return cb(err);
						}else{
							project.activities = activitiesForProject;
							return cb(null, project);
						}
					});
				}, function(err, projects){
					if(!err){
						var activities = [];
						_.each(projects, function(project){
							activities = _.union(project.activities, activities);
						});
						activities.sort(function(act1, act2){
							return act1.createdAt < act2.createdAt;
						});
						return callback(null, activities);
					}else{
						sails.log.error(err);
						return callback(err);
					}
					
				});
			}

			var conditions = {};
			if(input.projectId)
				conditions['project'] = input.projectId;
			if(input.workspaceId)
				conditions['workspace'] = input.workspaceId;
			if(input.taskId)
				conditions['task'] = input.taskId;

			if(conditions.project || conditions.task){
				Activity.findActivities(conditions, function(err, response){
					if(!err){
						return callback(null, response);
					} else {
						return callback(err);
					}
				});
			} else if (conditions.workspace){
				Workspace.findOne({id:input.workspaceId}).populate('projects').exec(function(err, workspace){
					if(!err){
						// console.log('projects',workspace.projects);
						var projects = [];
						user.projects = _.map(user.projects, function(project){
							return project.id;
						});
						var projectsOfWorkspace = workspace.projects;
						_.each(projectsOfWorkspace,function(projectOfWorkspace){
							if(_.contains(user.projects, projectOfWorkspace.id)){
								projects.push(projectOfWorkspace);
							}
						})
						fetchActivities(projects);
					}
				})
			} else {
				var projects = user.projects;
				fetchActivities(projects);	
			}

			
		});
	},

	findActivities: function(data, callback){
		Activity.find({where:data, sort: 'createdAt DESC'}).populateAll().exec(function (err, activities) {
			if (!err) {
				async.map(activities, function(activity, cb){
					Activity.find({where: {parentId: activity.id, sort: 'createdAt ASC'}}).exec(function(error, comments){
						if(!error){
							activity.comments = comments;
							cb(null, activity);
						}
					});
				}, callback);
			} else {
				callback(err);
			}
		});
	},

	add: function (data, callback) {
		Activity.create(data).exec(function (err, activity) {
			if(!err) {
				var response = {};
				response = activity;
				Project.findOne(activity.project, function(err, project){
					if(!err){
						response.project = project;
						User.findOne(activity.user, function(err, user){
							if(!err){
								var info = JSON.parse(JSON.stringify(user));
								delete info.hashKey;
								delete info.email_verified;
								delete info.password;
								response.user = info;
							
								callback(null, response);
							} else {
								callback({status: 400, message: "User not found"});	
							}
						});
					} else {
						callback({status: 400, message: "Project not found"});
					}
				});
			} else {
				callback(err);
			}
		});
	},

	addComment: function (data, callback) {
		data.likes = [];
		if(data.userId){
			User.findOne({id: data.userId}, function(err, user){
				if(!err){
					delete data.userId;
					var userInfo = {};
					userInfo.email = user.email;
					userInfo.name = user.name;
					userInfo.id = user.id;
					userInfo.avatar = base_url + user.avatar;
					data.userInfo = userInfo;
					Activity.create(data).exec(function (err, activity) {
						if(!err) {
							callback(null, activity);
						} else {
							callback(err);
						}
					});
				} else {
					callback({status: 400, message: "User not found"});	
				}
			});
		}
	},

	findComments: function(data, callback){
		Activity.find({where: data, sort: 'createdAt ASC'}, function(err, comments){
			if(!err){
				if(comments.length == 0){
					callback(null, []);
				} else {
					callback(null, comments);
				}
			}else{
				callback(err);
			}
		});
	},

	edit: function (activityId, req, callback) {
		Activity.update({id : activityId}, req, function (err, data) {
			sails.log.debug(data);
			if (!err) {
				if (data.length == 0) {
					callback({status: 400, message: "activity not found"});
				} else {
					callback(null,data);
				}
			} else {
				callback(err);
			}
		});
	},

	delete: function (activityId, callback) {
		Activity.destroy({id : activityId}).exec( function (err, data) {
			if (!err) {
				if (data.length == 0) {
					return callback({status: 400, message: "activity not found"});
				} else {
					Activity.find({parentId : activityId}).exec( function (error, comments) {
						if(!error){
							if(comments.length > 0){
								Activity.destroy({parentId : activityId}).exec( function (errors, response) {
									if(!errors){
										return callback(null,{status: 200, message: "deleted successfully"});
									}
								});
							} else {
								return callback(null,{status: 200, message: "deleted successfully"} );
							}
						}
					});
				}
			} else {
				return callback(err);
			}
		});
    },

    upload : function (data, callback) {
		var buffer = new Buffer(data.data, 'base64');
		data.data = buffer;
		data.subfolder = 'attachments';
		data.name = Math.floor(Math.random() * 100000000000 + 1);
		AWSService.upload(data, function(err, response){
			if(!err){
				delete data['subfolder'];
				delete data['data'];
				delete data['ext'];
				Attachment.create(data, function(err, imageData){
					if(err) {
						// sails.log.debug(err)
						callback(err);
					} else {
						callback(null, imageData);
					}
				});
			}else{
				sails.log.error(err);
			}
		})
  	},
  	
  	like : function(data, callback){
  		Activity.findOne({id : data.activityId}).exec(function (err, activity) {
			if (!err) {
				var doc = JSON.parse(JSON.stringify(activity));
  				var existedLikes = [];
 
				if(_.contains(doc.likes, data.userId)){
					_.each(doc.likes, function(uid, idx){
						// sails.log.debug("uid",uid);
						// sails.log.debug("idx",idx);
						if(uid != data.userId){
							existedLikes.push(uid);
						}
						if(idx == (doc.likes.length - 1)){
							doc.likes = existedLikes;
							Activity.updateLikes(doc, function(error, updatedActivity){
								if(!error){
									callback(null, updatedActivity);
								}else{
									callback(error);
								}
							});
						}
					});
				} else {
					doc.likes.push(data.userId);
					Activity.updateLikes(doc, function(error, updatedActivity){
						if(!error){
							callback(null, updatedActivity);
						}else{
							callback(error);
						}
					});
				}
			}else {
				callback(err);
			}
		});
  	},

  	updateLikes : function(doc, callback){
  		Activity.update({id: doc.id}, doc, function(err, updatedActivity){
  			if(!err){
  				callback(null, updatedActivity[0]);
  			} else {
  				callback(err);
  			}
  		});
  	}
};

