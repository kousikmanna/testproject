/**
 * BacklogItemController
 *
 * @description :: Server-side logic for managing backlogitems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index : function(req,res){
		var user = req.session.user;
		if(!req.body || (!req.body.project && !req.body.sprint)){
            res.status(400).json( {status: 400 , message: "ProjectId is missing" });
        }else{
			BacklogItem.index(user, req.body, function (err, backlogs){
				if(!err){
					res.json(backlogs);
				} else {
					res.negotiate(err);
				}
			});
		}
	},

	add : function(req,res){
		// var user = req.session.user;
		if(!req.body || !req.body.project || !req.body.name ){
            res.status(400).json( {status: 400 , message: "some field(s) are missing" });
        }else{
			BacklogItem.add(req.body, function (err,backlog){
				if(!err){
					res.json(backlog);
				} else {
					res.negotiate(err);
				}
			});
		}
	},

	edit : function(req, res){
		if(!req.body){
            res.status(400).json( {status: 400 , message: "some field(s) are missing" });
        }else{
        	var backlogId = req.param('id');
			BacklogItem.update(backlogId, req.body, function (err, backlog){
				if(!err){
					res.json(backlog);
				} else {
					res.negotiate(err);
				}
			})
		}
	},

	delete: function (req, res) {
        var backlogId = req.param('id');
        BacklogItem.delete(backlogId, function (err, backlog) {
            if (!err) {
                res.json("Deleted Successfully");
            } else { 
                res.negotiate(err);
            }
        })
    },

    getBacklogDetails : function(req,res) {
    	var backlogId = req.param('id');
    	BacklogItem.getBacklogDetails(backlogId, function (err, backlog){
    		if(!err) {
				res.json(backlog);
    		} else {
    			res.negotiate(err);
    		}
    	})
    }
	
};

