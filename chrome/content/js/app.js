'use strict';
if (navigator.userAgent.toLowerCase().indexOf('vocablift') != -1) {
    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
}

// Declare app level module which depends on filters, and services
angular.module('VocabLift', ['VocabLift.filters', 'VocabLift.services', 'VocabLift.directives', 'ngGrid']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            templateUrl: 'main.html',
            controller: 'VocabLiftCtrl'
        });
    }]);
;

/*angular.module('VocabLift', ['VocabLift.filters', 'VocabLift.services', 'VocabLift.directives', 'ui', 'ngGrid']).
 config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: VocabLiftCtrl});
 $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
 $routeProvider.otherwise({redirectTo: '/view1'});
 }]);*/
