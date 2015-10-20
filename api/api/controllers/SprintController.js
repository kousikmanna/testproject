/**
 * SprintController
 *
 * @description :: Server-side logic for managing sprints
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index : function(req,res){
		var user = req.session.user;
		if(!req.body || !req.body.project){
            res.status(400).json( {status: 400 , message: "ProjectId is missing" });
        }else{
			Sprint.index(user, req.body.project, function (err, sprints){
				if(!err){
					res.json(sprints);
				} else {
					res.negotiate(err);
				}
			});
		}
	},

	add : function(req,res){
		var user = req.session.user;
		if(!req.body || !req.body.project){
            res.status(400).json( {status: 400 , message: "some field(s) are missing" });
        } else {
			Sprint.add(req.body, function (err,sprint){
				if(!err){
					res.json(sprint);
				} else {
					res.negotiate(err);
				}
			});
		}
	},

	edit : function(req, res){
		var sprintId = req.param('id');
		Sprint.update(sprintId, req.body, function (err, sprint){
			if(!err){
				res.json(sprint);
			} else {
				res.negotiate(err);
			}
		})
	},

	delete: function (req, res) {
        var sprintId = req.param('id');
        Sprint.delete(sprintId, function (err, sprint) {
            if (!err) {
                res.json("Deleted Successfully");
            } else { 
                res.negotiate(err);
            }
        })
    },


    getSprintDetails : function (req, res){
    	var sprintId = req.param('id');
    	Sprint.getSprintDetails(sprintId,req.body,function (err,sprint){
    		if(!err){
    			res.json(sprint)
    		} else {
    			res.negotiate(err);
    		}
    	})
    }
	
};

