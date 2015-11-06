angular.module('app', ['ngMaterial'])
	.controller('ToDoCtrl', function ($scope, $mdDialog, $mdToast) {
		$scope.todos = [
			{ 'name': 'Tarea 1', 'desc': 'Tarea por hacer 1', 'done': 0 },
			{ 'name': 'Tarea 2', 'desc': 'Tarea por hacer 2', 'done': 20 },
			{ 'name': 'Tarea 3', 'desc': 'Tarea por hacer 3', 'done': 30 },
		];

		$scope.addToDo = function () {
			$scope.todos.push({
				'name': $scope.ToDoName,
				'desc': $scope.ToDoDesc,
				'done': 0
			});
			$scope.ToDoName = $scope.ToDoDesc = '';
		};

		$scope.remove = function (index) {
			var confirm = $mdDialog.confirm()
				.title('Are you sure?')
				.content('The ToDo has removes. Can\'t undo')
				.ariaLabel('remove ToDo')
				.ok('Yes')
				.cancel('No');
			$mdDialog.show(confirm).then(function () {
				$scope.todos.splice(index, 1);
				$scope.showToast('ToDo removed!');
			})
		};

		$scope.showToast = function (msg) {
			$mdToast.show(
				$mdToast.simple()
					.content(msg)
					.position($scope.getToastPosition())
					.hideDelay(3000)
				);
		};

		var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
		
		function sanitizePosition() {
			var current = $scope.toastPosition;
			if (current.bottom && last.top) current.top = false;
			if (current.top && last.bottom) current.bottom = false;
			if (current.right && last.left) current.left = false;
			if (current.left && last.right) current.right = false;
			last = angular.extend({}, current);
		}
		
		$scope.toastPosition = angular.extend({}, last);
		$scope.getToastPosition = function () {
			sanitizePosition();
			return Object.keys($scope.toastPosition)
				.filter(function (pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};
		
	})
	.filter('percentage', function () {
		return function (data) {
			return data + '%';
		}
	});