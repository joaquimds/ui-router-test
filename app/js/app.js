var myApp = angular.module('ui-sref-test', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	
 $locationProvider.html5Mode(true);
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/state2");
  //
  // Now set up the states
  $stateProvider
    .state('state2', {
      url: '/state2',
	  templateUrl: 'partials/default.html'	
    })
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    });
});

myApp.run(function ($rootScope, $state) {

		$rootScope.$on('$stateChangeStart', function(event, toState) {
			console.log('attempting to go to state',toState.name);
			if (toState.name!=='state1') {
				console.log('redirecting to state1');
                event.preventDefault();
				$state.go('state1');
			}
		});
	});