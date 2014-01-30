'use strict';

/* Filters */
var VocabLiftFilters = angular.module('VocabLift.filters', []);
VocabLiftFilters.filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);

VocabLiftFilters.filter('cardListFilter', function($filter) {
    return function (items, search) {
        if (!search || (search.findAll === "" && search.side1 === "" && search.side2 === "")) {
            return items;
        }
        
        return $filter('filter')(items, function (card) {
            var combining = /[\u0300-\u036F]/g;
            var sA = search.findAll.toLowerCase().replace(combining, '').replace(/[ꞌꞋ]/g, "'");
            if (search.findAll && (UNorm.nfkd(card.properties.side1.toLowerCase().replace(/ñ/g, "ñ").replace(combining, '').replace(/[ꞌꞋ]/g, "'")).indexOf(sA) != -1 || UNorm.nfkd(card.properties.side2.toLowerCase().replace(/ñ/g, "ñ").replace(combining, '').replace(/[ꞌꞋ]/g, "'")).indexOf(sA) != -1)) {
                return true;
            }
            if (search.side1 && UNorm.nfkd(card.properties.side1.toLowerCase().replace(/ñ/g, "ñ").replace(combining, '').replace(/[ꞌꞋ]/g, "'")).indexOf(search.side1.toLowerCase().replace(combining, '').replace(/[ꞌꞋ]/g, "'")) != -1) {
                return true;
            }
            if (search.side2 && UNorm.nfkd(card.properties.side2.toLowerCase().replace(/ñ/g, "ñ").replace(combining, '').replace(/[ꞌꞋ]/g, "'")).indexOf(search.side2.toLowerCase().replace(combining, '').replace(/[ꞌꞋ]/g, "'")) != -1) {
                return true;
            }
            return false;
        });
    
    };
});