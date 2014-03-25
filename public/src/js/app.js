var usercrud = angular.module('userApp', [
	'ui.router',
	'userControllers',
	'userServices'
]);

usercrud.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('index', {
				url: '/',
				templateUrl: 'views/index.html',
				controller: 'UserIndexCtrl'
			})
			.state('edit', {
				url: '/edit/{id}',
				templateUrl: 'views/edit.html',
				controller: 'UserEditCtrl'
			});
}]);

var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('Users', ['$resource',
	function($resource) {
		return $resource('/api/users/:id', { id: "@id" }, {
			'save': {
				method: 'POST',
				isArray: true
			},
			'update': {
				method: 'PUT',
				isArray: true
			},
			'delete': {
				method: 'DELETE',
				isArray: true
			}
		});
    }]);

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserIndexCtrl', ['$scope', 'Users',
	function($scope, Users) {
		$scope.users = Users.query();

		$scope.createUser = function() {
			Users.save($scope.userData, function(users) {
				$scope.users = users;
			});
		};

		$scope.deleteUser = function(id) {
			Users.delete({}, {'id': id}, function(users) {
				$scope.users = users;
			});
		};
	}]);


userControllers.controller('UserEditCtrl', ['$scope', '$location', '$stateParams', 'Users',
	function($scope, $location, $stateParams, Users) {
		$scope.user = Users.get({id: $stateParams.id}, function(user) {
			$scope.userData = {
				_id: user._id,
				username: user.username,
				firstName: user.name.first,
				lastName: user.name.last
			};
		});

		$scope.updateUser = function() {
			Users.update($scope.userData, function(users) {
				$location.path('/');
			});
		};
	}]);
