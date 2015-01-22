'use strict'

describe 'Controller: MainCtrl', ->

  # load the controller's module
  beforeEach module 'studioBpmApp'
  beforeEach module 'socketMock'

  MainCtrl = undefined
  scope = undefined
  mockAuth = undefined
  loginStatus = undefined
  currentUser = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope, Auth) ->
    mockAuth = Auth
    spyOn(mockAuth,'isLoggedIn').andCallFake ->
      loginStatus
    spyOn(mockAuth,'getCurrentUser').andCallFake ->
      currentUser
    scope = $rootScope.$new()
    MainCtrl = $controller 'MainCtrl',
      $scope: scope
      Auth:   mockAuth


  it 'should have access to a property to know if user is logged in or not', ->
    loginStatus = 'MyReturnedValue'
    loggedIn = scope.isLoggedIn()
    expect(loggedIn).toBe loginStatus
    expect(mockAuth.isLoggedIn).toHaveBeenCalled()

  it 'should have access to a property to know which user is logged in', ->
    loginStatus = 'My User Object'
    returnedUser = scope.getCurrentUser()
    expect(returnedUser).toBe currentUser
    expect(mockAuth.getCurrentUser).toHaveBeenCalled()
