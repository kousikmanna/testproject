/**
 * ProjectuserController
 *
 * @description :: Server-side logic for managing projectusers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	getRoleInProject: function (req, res) {
		var userId = req.session.user.id;
		var projectId = req.param('id');
		// var projectId = req.body.projectId;
		Projectuser.getRoleInProject(userId, projectId, function (err, RoleinProject) {
			if (!err) {
				res.json(RoleinProject);
			} else {
				res.negotiate(err);
			}
		});
	}
	
};

