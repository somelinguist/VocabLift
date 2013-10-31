'use strict';

/* Directives */

var VocabLiftDirectives = angular.module('VocabLift.directives', []);
VocabLiftDirectives.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);

VocabLiftDirectives.directive('draggable', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.bind("dragstart", function (event) {
                var data = {type: "", value: ""};
                if (ngModel.$modelValue.entity) {
                    data.type = "entry";
                    data.value = ngModel.$modelValue.entity;
                }
                else if (ngModel.$modelValue.properties) {
                    data.type = "card";
                    data.value = ngModel.$modelValue;
                }
                data = angular.toJson(data);
                $(".deck").addClass("dropZone");
                event.originalEvent.dataTransfer.setData("text/json", data);
                return true;
            });
            element.bind("dragend", function () {
                $(".deck").removeClass("dropZone");
            })
        }
    };
});

VocabLiftDirectives.directive('droppable', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            element.bind("drop", function (event) {
                var data = event.originalEvent.dataTransfer.getData("text/json");
                data = angular.fromJson(data);
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

VocabLiftDirectives.directive('dropdownToggle', function ($document, $location, $window) {
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
                if (event.target.tagName === "INPUT") {
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
                        if (event && event.target.className === "cardFileDialog") {
                            return;
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

VocabLiftDirectives.directive('contenteditable', function () {
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


VocabLiftDirectives.directive('lang', function ($filter) {


    //alert(ls.GetCurrentLanguage());

    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            if (element.is("input:text") && element.attr("lang")) {
                element.bind("focus", function (event) {
                    scope.setActiveWritingSystem(element.attr("lang"));
                });
            }
            if (scope.project) {
                scope.$watch('project.config.vernacularLang + project.config.analysisLang', function () {
                    var lang = element.attr("lang");
                    var ws = $filter('filter')(scope.project.config.writingSystems, {language: lang});
                    if (ws.length && ws[0].fontFamily) {
                        element.css("font-family", ws[0].fontFamily);
                    }
                });

            }

        }
    };
});

