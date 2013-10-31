function CardStatisticsController($scope, $filter, PracticeServices) {


    /*function findDeck (guid, deck) {
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

     function getDeck (guid) {
     var deck = null;
     deck = $filter('filter')($scope.projectDecks, function(d) {
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

     */
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
    /*

     function getCard (guid) {
     var c = null;
     var group = angular.copy($scope.currentCard.set.group);
     var card = $filter('filter')(group, function(item) {
     if (item.guid == guid)
     return true;
     return false;
     });
     if (card.length)
     return card[0];

     */
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
    /*
     return false;
     };

     $scope.$watch('selectedSessions', function() {
     if ($scope.selectedSessions.length){
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

     $scope.$watch('selectedCards', function() {
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
     }, true);

     $scope.selectedSessions.push($scope.sessions[0]);

     $scope.sessionGridOptions = {
     data: 'sessions',
     selectedItems: $scope.selectedSessions,
     multiSelect: false
     };*/


    function getAllCardAttempts(guid) {
        var allSessionData = [];
        if ($scope.sessions.length) {
            for (var i = 0; i < $scope.sessions.length; i++) {
                if ($scope.sessions[i].sessionData.length) {
                    for (var j = 0; j < $scope.sessions[i].sessionData.length; j++) {
                        if ($scope.sessions[i].sessionData[j].set.item.guid == guid && $scope.sessions[i].sessionData[j].attempts.length) {
                            if ($scope.sessions[i].type == "Comprehension") {
                                var group = angular.copy($scope.sessions[i].sessionData[j].set.group);
                            }
                            for (var k = 0; k < $scope.sessions[i].sessionData[j].attempts.length; k++) {
                                var sessionData = {
                                    sessionId: $scope.sessions[i].sessionData[j].sessionId,
                                    sessionType: $scope.sessions[i].type,
                                    dateCreated: $scope.sessions[i].sessionData[j].dateCreated,
                                    dateModified: $scope.sessions[i].sessionData[j].dateCreated,
                                    correct: $scope.sessions[i].sessionData[j].correct,
                                    numberOfAttempts: $scope.sessions[i].sessionData[j].attempts.length
                                };

                                if ($scope.sessions[i].type == "Comprehension") {
                                    var attempt = $filter('filter')(group, function (item) {
                                        if (item.guid == guid)
                                            return true;
                                        return false;
                                    });
                                    if (attempt.length) {
                                        allSessionData.push({
                                            sessionData: sessionData,
                                            attemptNumber: k + 1,
                                            side1: attempt[0].properties.side1,
                                            side2: attempt[0].properties.side2
                                        });
                                    }
                                }
                                else {
                                    allSessionData.push({
                                        sessionData: sessionData,
                                        attemptNumber: k + 1,
                                        side1: $scope.sessions[i].sessionData[j].attempts[k],
                                        side2: ""
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        return allSessionData;
    }

    $scope.$watch('currentCard', function () {
        if ($scope.sessions && $scope.currentCard) {
            $scope.allCardAttempts = getAllCardAttempts($scope.currentCard.guid);
            $scope.selectedAttempts = [];
            $scope.selectedAttempts.push($scope.allCardAttempts[0]);
        }
    });

    //$scope.allCardAttempts = getAllCardAttempts($scope.currentCard.guid);
    $scope.$on("sessionsUpdated", function () {
        $scope.sessions = PracticeServices.getAllSessions();
        $scope.allCardAttempts = getAllCardAttempts($scope.currentCard.guid);
        /* $scope.selectedAttempts = [];
         $scope.selectedAttempts.push($scope.allCardAttempts[0]);*/
    });

    $scope.cardStatisticsGridOptions = {
        data: 'allCardAttempts',
        //selectedItems: $scope.selectedAttempts,
        columnDefs: [
            //{field: 'sessionData.sessionId', displayName: "Session #", visible:false},
            {field: 'sessionData.dateCreated', displayName: "Session Start Date"},
            {field: 'sessionData.sessionType', displayName: "Session type"},
            {field: 'sessionData.correct', displayName: "Correct"},
            {field: 'sessionData.numberOfAttempts', displayName: "Number of Attempts"},
            {field: 'attemptNumber', displayName: "Attempt Number"},
            {field: 'side1', displayName: "Card Side 1/Attempt Value"},
            {field: 'side2', displayName: "Card Side 2"},
            {field: 'sessionData.dateModified', displayName: "Attempt Date"}
        ],
        plugins: [new ngGridLayoutPlugin()]
        //groups: ['sessionData.dateCreated'],
        //multiSelect: false
    };

}
CardStatisticsController.$inject = ['$scope', '$filter', 'PracticeServices'];