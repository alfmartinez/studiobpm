'use strict'

describe 'Controller: MainCtrl', ->

  # load the controller's module
  beforeEach module 'studioBpmApp'
  beforeEach module 'socketMock'

  MainCtrl = undefined
  scope = undefined
  $httpBackend = undefined

  # Initialize the controller and a mock scope
  beforeEach inject (_$httpBackend_, $controller, $rootScope) ->
    $httpBackend = _$httpBackend_
    $httpBackend.expectGET('/api/models').respond [
      {
        'id' : 'f00',
        'name' : 'Model Foo'
      },
      {
        'id' : 'ba5',
        'name' : 'Model Bar'
      }
    ]
    scope = $rootScope.$new()
    MainCtrl = $controller 'MainCtrl',
      $scope: scope

  it 'should attach a list of things to the scope', ->
    $httpBackend.flush()
    expect(scope.models.length).toBe 2
