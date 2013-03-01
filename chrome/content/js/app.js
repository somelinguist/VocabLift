'use strict';
if (navigator.userAgent.toLowerCase().indexOf('vocabularymanager') != -1) {
    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
}

function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

function stripFilePath(path) {
    if (path.lastIndexOf("file:///") > -1) {
        path = path.substring(path.lastIndexOf("file:///") + 8);
    }
    return path;
}

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
    }

    return this;
}

Array.prototype.move = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 &&
        0 <= pos1 && pos1 <= this.length &&
        0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}

// Declare app level module which depends on filters, and services
angular.module('VocabManager', ['VocabManager.filters', 'VocabManager.services', 'VocabManager.directives', 'ngGrid']);

/*angular.module('VocabManager', ['VocabManager.filters', 'VocabManager.services', 'VocabManager.directives', 'ui', 'ngGrid']).
 config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: VocabManagerCtrl});
 $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
 $routeProvider.otherwise({redirectTo: '/view1'});
 }]);*/
