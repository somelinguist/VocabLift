angular.module('VocabLiftSessionsManager', ['localization', 'ngGrid']);

function SessionsManagerController($scope, $filter, localize) {
    $scope.sessions = angular.copy(global.allSessions);
    $scope.projectDecks = global.decks;
    $scope.projectConfig = global.projectConfig;
    $scope.selectedDecks = [];
    $scope.selectedSessions = [];
    $scope.currentSession = null;
    $scope.currentSessionDecks = [];
    $scope.selectedCards = [];
    $scope.currentCard = null;
    $scope.currentCardAttempts = [];
    $scope.selectedAttempts = [];

    localize.setLanguage('en-US');

    function findDeck(guid, deck) {
        var ddd = $filter('filter')(deck.subdecks, {guid: guid});
        if (ddd.length) {
            return ddd[0];
        }
        for (var i = 0; i < deck.subdecks.length; i++) {
            var dddd = findDeck(guid, deck.subdecks[i])
            if (dddd) {
                return dddd;
            }
        }
        return false;
    }

    function getDeck(guid) {
        var deck = null;
        deck = $filter('filter')($scope.projectDecks, function (d) {
            var dd = findDeck(guid, d);
            if (dd) {
                return true;
            }
            return false;
        });
        if (deck.length) {
            return deck[0];
        }
        return false;
    };

    /*function findCardInDeck (guid, deck) {
     var d = angular.copy(deck);
     var ccc = $filter('filter')(d.cards, function(item) {
     if (item.guid == guid)
     return true;
     return false;
     });
     if (ccc.length) {
     return ccc[0];
     }
     for (var i = 0; i < d.subdecks.length; i++) {
     var cccc = findCardInDeck(guid, d.subdecks[i]);
     if (cccc) {
     return cccc;
     }
     }
     return false;
     }*/

    function getCard(guid) {
        var c = null;
        var group = angular.copy($scope.currentCard.set.group);
        var card = $filter('filter')(group, function (item) {
            if (item.guid == guid)
                return true;
            return false;
        });
        if (card.length)
            return card[0];

        /*$filter('filter')($scope.currentSessionDecks, function(d) {
         var cc = findCardInDeck(guid, d);
         if (cc) {
         c = cc;
         return true;
         }
         return false;
         });
         if (c) {
         return c;
         }*/
        return false;
    };

    $scope.$watch('selectedSessions', function () {
        if ($scope.selectedSessions.length) {
            $scope.currentSession = $scope.selectedSessions[0];
            $scope.currentSessionDecks = [];
            try {
                for (var i = 0; i < $scope.currentSession.decks.length; i++) {
                    var deck = getDeck($scope.currentSession.decks[i]);
                    if (deck) {
                        $scope.currentSessionDecks.push(deck);
                    }
                }
                $scope.selectedCards.push($scope.currentSession.sessionData[0]);
            }
            catch (e) {
                console.log(e);
            }
        }
    }, true);

    $scope.$watch('selectedCards', function () {
        if ($scope.sessions && $scope.sessions.length) {
            if ($scope.selectedCards.length > 1) {
                $scope.selectedCards.shift();
            }
            $scope.currentCard = $scope.selectedCards[0];
            $scope.currentCardAttempts = [];

            for (var i = 0; i < $scope.currentCard.attempts.length; i++) {
                if ($scope.currentSession.type == "Comprehension") {
                    var card = getCard($scope.currentCard.attempts[i]);
                    if (card) {
                        $scope.currentCardAttempts.push(card.properties.side1);
                    }
                }
                else {
                    $scope.currentCardAttempts.push($scope.currentCard.attempts[i]);
                }
                $scope.currentCardAttempts;
            }
        }
    }, true);

    if ($scope.sessions && $scope.sessions.length) {
        $scope.selectedSessions.push($scope.sessions[0]);
    }

    $scope.sessionGridOptions = {
        data: 'sessions',
        columnDefs: [
            {field: 'dateCreated', displayName: "Session Start Date"},
            {field: 'sessionType', displayName: "Session type"},
            {field: 'correct', displayName: "Correct"},
            {field: 'incorrect', displayName: "Incorrect"},
            {field: 'currentItemIndex', displayName: "Progress"},
            {field: 'completed', displayName: "Session Completed"},
            {field: 'quickPractice', displayName: "Quick Practice"}
        ],
        selectedItems: $scope.selectedSessions,
        multiSelect: false
    };


    function getAllCardAttempts(guid) {
        var allSessionData = [];
        if ($scope.sessions.length) {
            for (var i = 0; i < $scope.sessions.length; i++) {
                if ($scope.sessions[i].sessionData.length) {
                    for (var j = 0; j < $scope.sessions[i].sessionData.length; j++) {
                        if ($scope.sessions[i].sessionData[j].guid == guid) {
                            allSessionData.push($scope.sessions[i].sessionData[j]);
                        }
                    }
                }
            }
        }
    }

    $scope.deleteAllSessions = function () {
        win.emit('DeleteAllSessions');
    };

    $scope.deleteSession = function (s) {
        win.emit('DeleteSingleSession', s);
    }

    win.on("SingleSessionDeleted", function () {
        $scope.sessions = angular.copy(global.allSessions);
    });
}
SessionsManagerController.$inject = ['$scope', '$filter', 'localize'];