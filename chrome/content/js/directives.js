'use strict';

/* Directives */

var VocabManagerDirectives = angular.module('VocabManager.directives', []);
VocabManagerDirectives.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);

VocabManagerDirectives.directive('draggable', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.bind("dragstart", function (event) {
                event.originalEvent.dataTransfer.mozSetDataAt("modelData", ngModel, 0);
                return true;
            });
        }
    };
});

VocabManagerDirectives.directive('droppable', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.bind("drop", function (event) {
                var data = event.originalEvent.dataTransfer.mozGetDataAt("modelData", 0);
                scope.$apply(scope[attrs.dropaction](ngModel.$modelValue, data));
                event.stopPropagation();
                return true;
            });
            element.bind('dragover', function (event) {
                if (event.preventDefault) event.preventDefault();
                return false;
            });
        }
    };
});

VocabManagerDirectives.directive('dropdownToggle', function ($document, $location, $window) {
    var openElement = null, close;
    var openDetail = null;
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            scope.$watch(function dropdownTogglePathWatch() {
                return $location.path();
            }, function dropdownTogglePathWatchAction() {
                close && close();
            });

            element.parent().bind('click', function (event) {
                close && close(event);
            });

            element.bind('click', function (event) {
                if (event.originalEvent.explicitOriginalTarget.localName === "input") {
                    return;
                }


                event.preventDefault();
                event.stopPropagation();

                var iWasOpen = false;

                if (openElement) {
                    iWasOpen = openElement === element;
                    close();
                }

                if (!iWasOpen) {
                    element.parent().addClass('open');
                    openElement = element;

                    close = function (event) {
                        if (event && $(event.target).parents(".dropdown-detail").length > 0) {
                            return false;
                        }
                        event && event.preventDefault();
                        event && event.stopPropagation();
                        $document.unbind('click', close);
                        element.parent().removeClass('open');
                        close = null;
                        openElement = null;

                    }

                    $document.bind('click', close);
                }
            });
        }
    };
});

VocabManagerDirectives.directive('contenteditable', function () {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

// Specify how UI should be updated
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };

// Listen for change events to enable binding
            element.bind('blur keyup change', function () {
                scope.$apply(read);
            });

            if (element.html() !== "")
                read(); // initialize

// Write data to the model
            function read() {
                ngModel.$setViewValue(element.html());
            }
        }
    };
});

VocabManagerDirectives.directive('tabs', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function ($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function (pane) {
                angular.forEach(panes, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function (pane) {
                if (panes.length == 0) $scope.select(pane);
                panes.push(pane);
            }
        },
        template: '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
        replace: true
    };
});

VocabManagerDirectives.directive('pane', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function (scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
        replace: true
    };
});