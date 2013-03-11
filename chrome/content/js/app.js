'use strict';
if (navigator.userAgent.toLowerCase().indexOf('vocabularymanager') != -1) {
    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
}

// Declare app level module which depends on filters, and services
angular.module('VocabManager', ['VocabManager.filters', 'VocabManager.services', 'VocabManager.directives', 'ngGrid']);

/*angular.module('VocabManager', ['VocabManager.filters', 'VocabManager.services', 'VocabManager.directives', 'ui', 'ngGrid']).
 config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: VocabManagerCtrl});
 $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
 $routeProvider.otherwise({redirectTo: '/view1'});
 }]);*/
