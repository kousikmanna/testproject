/**
* Projectuser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: "projectuser",

  attributes: {
  	role :{
  		type : 'string',
  		enum: ['member', 'manager']
  	},
  	user : {
  		model : 'User'
  	},
    project: {
      model: 'Project'
    }
  },
    delete : function (removedUsers, projectId, cb){
        console.log('hftjh',removedUsers);
        _.each(removedUsers, function(removedUserId) {
            console.log('removedUserId',removedUserId);
            Projectuser.destroy({project:projectId, user:removedUserId}).exec(function(err,projectuser){
                if(!err){
                    cb(null,{msg:'member deleted', status:200});
                } else {
                    cb(err);
                }
            });
        });
    },

    add: function(data, cb){
        console.log('data',data);
        var projectId = data.project;
        var flag = false;
        
        Projectuser.find({project:projectId}).exec(function(err,response){
            if(!err){
                if(response && response.length > 0){
                    _.each(response,function(projectuser, idx) {
                        if(projectuser.user == data.user){
                            flag = true;
                            Projectuser.update({user: data.user}, data, function(err, result){
                                if(!err){
                                    cb(null, result)
                                } else {
                                    cb(err);
                                }
                            })
                        }
                        if(idx == (response.length - 1)){
                            if(flag == false){
                                Projectuser.create(data, function(err, result){
                                    if(!err){
                                        cb(null, result);
                                    }else{
                                        cb(err);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    console.log('no project user');
                    console.log(data);
                    Projectuser.create(data, function(err, result){
                        if(!err){
                            console.log('Projectuser created',result);
                            cb(null, result);
                        }else{
                            cb(err);
                            console.log('inside err',err);
                        }
                    });
                }
            } else {
                cb(err);
            }
        });
    },
    
    getRoleInProject : function(userId, projectId, cb){
        Projectuser.findOne({project:projectId, user:userId}).exec(function(err,response){
            if(!err){
                cb(null,response);
            }
            else{
                cb(err);
            }
        })
    }
  
};

