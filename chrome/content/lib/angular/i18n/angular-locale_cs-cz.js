angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {"NUMBER_FORMATS": {"DECIMAL_SEP": ",", "GROUP_SEP": " ", "PATTERNS": [
        {"minInt": 1, "minFrac": 0, "macFrac": 0, "posPre": "", "posSuf": "", "negPre": "-", "negSuf": "", "gSize": 3, "lgSize": 3, "maxFrac": 3},
        {"minInt": 1, "minFrac": 2, "macFrac": 0, "posPre": "", "posSuf": " \u00A4", "negPre": "-", "negSuf": " \u00A4", "gSize": 3, "lgSize": 3, "maxFrac": 2}
    ], "CURRENCY_SYM": "Kč"}, "pluralCat": function (n) {
        if (n == 1) {
            return PLURAL_CATEGORY.ONE;
        }
        if (n == 2 || n == 3 || n == 4) {
            return PLURAL_CATEGORY.FEW;
        }
        return PLURAL_CATEGORY.OTHER;
    }, "DATETIME_FORMATS": {"MONTH": ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"], "SHORTMONTH": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], "DAY": ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"], "SHORTDAY": ["ne", "po", "út", "st", "čt", "pá", "so"], "AMPMS": ["dop.", "odp."], "medium": "d.M.yyyy H:mm:ss", "short": "d.M.yy H:mm", "fullDate": "EEEE, d. MMMM y", "longDate": "d. MMMM y", "mediumDate": "d.M.yyyy", "shortDate": "d.M.yy", "mediumTime": "H:mm:ss", "shortTime": "H:mm"}, "id": "cs-cz"});
}]);