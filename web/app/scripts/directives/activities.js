 'use strict';

angular.module('pmtoolApp')

  .directive('activities', function (Activity, $rootScope, $location, $routeParams) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      scope: {
        activities1: '=list'
      },
       link : function (scope, element, attrs) {
        scope.user = $rootScope.user;
        scope.path = $location.path();
        
        if($routeParams.id){
          var condition = {};
          if(attrs.type == 'project')
            condition.projectId = $routeParams.id;
          else if(attrs.type == 'workspace')
            condition.workspaceId = $routeParams.id;
          else if(attrs.type == 'task')
            condition.taskId = $routeParams.id;
          Activity.fetch(condition)
          .then(function(response){
            scope.activities1 = response;
            // console.log("withparams",scope.activities1)
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }else{
          Activity.fetch()
          .then(function(response){
            scope.activities1 = response;
            // console.log("withoutparams",scope.activities1)
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }

        // if(scope.user.role == "admin"){
        //     $('#activities').css({'height': '871px' });
        //     $('#acts').css({'height': '821px'});
        //   }else{
        //     $('#activities').css({'height': '463px' });
        //     $('#acts').css({'height': '409px'});
        //   }
       
        $(document).ready(function(){
          $("html").niceScroll({cursorwidth: '10px', autohidemode: false, zindex: 999 });
          $("#acts").niceScroll({cursorwidth: '10px', autohidemode: false, zindex: 999 });
        });
        
        
          
        

       


         // scope.$on("triggerActivity",function(){
         //  console.log("Im active now in activity")
         //    Activity.fetch()
         //    .then(function(response){
         //      scope.activities1 = response;
         //      console.log(scope.activities1);
         //    })
         //    .catch(function(err){
         //      scope.error = err.message;
         //    });
         // });

        scope.likeActivity = function (activity) {
         
          var data = {"activity":activity.id}
          
          Activity.addlikesActivity(data)
            .then(function(response){

              if(activity.likes.indexOf(scope.user.id) == -1){
               activity.likes.push(scope.user.id);

              }else{
                if (activity.likes.indexOf(scope.user.id) >-1){
                 var i = activity.likes.indexOf(scope.user.id);
                 activity.likes.splice(i,1);
                 }
              }
            
            })
            .catch(function(err){
              scope.error = err.message;
            });

        }


        scope.likeComment = function (activity,id,comment) {
         console.log(activity,id,comment);
         var data = {"commentId":id}
        
         
         Activity.addlikesComment(data)
            .then(function(response){

             if(comment.likes.indexOf(scope.user.id) == -1){
                comment.likes.push(scope.user.id);
              }
              else{

                if (comment.likes.indexOf(scope.user.id)>-1){
                    var i = comment.likes.indexOf(scope.user.id);
                    comment.likes.splice(i,1);
                  }
              }
            
            })
            .catch(function(err){
              scope.error = err.message;
            });

        }

        scope.ActivityDelete = function (activity,id) {
          console.log(id);
          var actDelete = confirm("Are you Sure ?");
          if(actDelete==true){
            var data = {"activityId":id}
            Activity.deleteActivity(data)
              .then(function(response){
                Activity.fetch($routeParams.id)
                .then(function(response){
                  scope.activities1 = response;
                })
                .catch(function(err){
                  scope.error = err.message;
                });
              })
          }else{}
        }

       
       scope.deleteComment = function(commentId){
        var a=confirm("are you sure ?");
        if(a==true){
          var data = {"activityId":commentId}
          Activity.deleteActivity(data)
            .then(function(response){
                Activity.fetch($routeParams.id)
                .then(function(response){
                  scope.activities1 = response;
                })
                .catch(function(err){
                  scope.error = err.message;

                });
          
            })
            .catch(function(err){
              scope.error = err.message;
            });
        }else{}
        
       }

        scope.editActivity = function(activity) {
          console.log(activity);
          $("#edit-activity-modal").modal();
          scope.currentActivity = activity;
        }  

        scope.editActivityModal = function(currentActivity){

          var data = {
            "description" : currentActivity.description,
          };
          console.log(data);
          Activity.edit(data, currentActivity.id)
          .then(function(response){
            $("#edit-activity-modal").modal('hide');
            console.log(response);
          })
          .catch(function(err){
            scope.error = err.message;
          });
          
        }

        scope.editComment = function(comment){
          $("#edit-comment-modal").modal();
          scope.currentComment = comment;
        }

        scope.editCommentModal = function(currentComment){

          var data = {
            "comment" : currentComment.comment,
          };
          console.log(data);
          Activity.edit(data, currentComment.id)
          .then(function(response){
            $("#edit-comment-modal").modal('hide');
            console.log(response);
          })
          .catch(function(err){
            scope.error = err.message;
          });
          
        }

        
        scope.addComment = function (activity) {

          var data = {"activity":activity.id,"comment":activity.comment}
          Activity.addComment(data)
            .then(function(response){
              console.log("comments",response)
              activity.comments.push(response);
               
               $('.commentbox').val('');
            })
            .catch(function(err){
              scope.error = err.message;
            });
          }

       }
    };
  });
