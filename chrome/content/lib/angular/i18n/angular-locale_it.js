angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {"DATETIME_FORMATS": {"MONTH": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"], "SHORTMONTH": ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"], "DAY": ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"], "SHORTDAY": ["dom", "lun", "mar", "mer", "gio", "ven", "sab"], "AMPMS": ["m.", "p."], "medium": "dd/MMM/y HH:mm:ss", "short": "dd/MM/yy HH:mm", "fullDate": "EEEE d MMMM y", "longDate": "dd MMMM y", "mediumDate": "dd/MMM/y", "shortDate": "dd/MM/yy", "mediumTime": "HH:mm:ss", "shortTime": "HH:mm"}, "NUMBER_FORMATS": {"DECIMAL_SEP": ",", "GROUP_SEP": ".", "PATTERNS": [
        {"minInt": 1, "minFrac": 0, "macFrac": 0, "posPre": "", "posSuf": "", "negPre": "-", "negSuf": "", "gSize": 3, "lgSize": 3, "maxFrac": 3},
        {"minInt": 1, "minFrac": 2, "macFrac": 0, "posPre": "\u00A4 ", "posSuf": "", "negPre": "\u00A4 -", "negSuf": "", "gSize": 3, "lgSize": 3, "maxFrac": 2}
    ], "CURRENCY_SYM": "€"}, "pluralCat": function (n) {
        if (n == 1) {
            return PLURAL_CATEGORY.ONE;
        }
        return PLURAL_CATEGORY.OTHER;
    }, "id": "it"});
}]);