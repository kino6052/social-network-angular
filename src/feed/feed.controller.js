'use strict';

angular.module('patientory')
  .controller('FeedCtrl', function ($rootScope, $scope, $stateParams, FeedModel, UserModel, CommentModel) {
    var ctrl = this;
    ctrl.stateParams = $stateParams;
    ctrl.tag=ctrl.stateParams.tag;
    ctrl.loading = false;
    var uo = UserModel.userObject;
    var userId   = UserModel.getCurrentUser();
    $scope.$on("userData", function(){
      ctrl.newMessage.user = UserModel.userData;
    });
    ctrl.userStuff = UserModel.getUserData(userId);
    ctrl.newMessage = {
      userId: userId,
      user: {},
      userEmail: UserModel.getEmail(),
      text: UserModel.getEmail(UserModel.userObject),
      isPublic: false
    };
    
    $scope.$on('updateFeed', function() {
      ctrl.getFeed();
      //console.log("COMMENT POSTED EVENT");
    });
    
    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newBoard = {
        email: UserModel.getEmail(),
        uid: UserModel.getCurrentUser(),
        text: ''
      };
    };

    ctrl.getFeed = function () {
      FeedModel.equalTo(ctrl.tag)
        .then(function (result) {
          ctrl.feed = (result !== 'null') ? result : {};
        }, function () {
          ctrl.resetForm();
        });
    };

    ctrl.postMessage = function (message, isValid) {
      if (isValid) {
        ctrl.loading = true;

        FeedModel.create(message)
          .then(function (result) {
            ctrl.getFeed();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.resetForm();
          });
      }
    };
    
    ctrl.getFeed();
  });
