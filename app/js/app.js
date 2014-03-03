'use strict';

// Declare app level module which depends on filters, and services
angular.module('VocabLift', ['ngRoute', 'ngAnimate', 'localization', 'VocabLift.filters', 'VocabLift.services', 'VocabLift.directives', 'ngGrid', 'hashKeyCopier']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            templateUrl: 'main.html',
            controller: 'VocabLiftCtrl'
        });
    }]).config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

/*angular.module('VocabLift', ['VocabLift.filters', 'VocabLift.services', 'VocabLift.directives', 'ui', 'ngGrid']).
 config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: VocabLiftCtrl});
 $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
 $routeProvider.otherwise({redirectTo: '/view1'});
 }]);*/
