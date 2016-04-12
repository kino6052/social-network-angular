'use strict';

angular.module('patientory')
  .controller('PostCtrl', function ($rootScope, $scope, $state, $stateParams, FeedModel, UserModel, CommentModel, ENDPOINT_URI) {
    var post = this;
    post.stateParams = $stateParams;
    post.tag=post.stateParams.tag;
    post.messagePopup = FeedModel.messagePopup;
    post.loading = false;
    
    var userId   = UserModel.getCurrentUser();
    
    function getValue(object){
      for (var key in object){
        return object[key];
      }
    }
    
    
    post.userStuff = UserModel.getUserData(userId);
    
    post.newMessage = {
      userId: userId,
      user: {},
      userEmail: UserModel.getEmail(),
      text: '',
      isPublic: false
    };
    
    post.searchMessagesWithTag = function (query){
      FeedModel.searchMessagesWithTag(query);
    };


    post.postMessage = function (message, isValid) {
      if (isValid) {
        post.loading = true;

        FeedModel.create(message)
          .then(function (result) {
              $state.go("feed");
          })
          .catch(function (reason) {
            console.log(reason);
          })
          .finally(function () {
            post.resetForm();
          });
      }
    };
  });
