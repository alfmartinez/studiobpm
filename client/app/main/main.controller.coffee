'use strict'

angular.module 'studioBpmApp'
.controller 'MainCtrl', ($scope, $http, socket, Auth) ->
  $scope.models = []
  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.getCurrentUser = Auth.getCurrentUser

  $http.get('/api/models').success (models) ->
    $scope.models = models
    socket.syncUpdates 'models', $scope.models

  $scope.addThing = ->
    return if $scope.newThing is ''
    $http.post '/api/models',
      name: $scope.newModel

    $scope.newModel = ''

  $scope.deleteThing = (model) ->
    $http.delete '/api/models/' + model._id

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'model'
