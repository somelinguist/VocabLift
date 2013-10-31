'use strict';

/* Controllers */

//var windowcloser = new WindowCloses();

function VocabLiftCtrl($scope, $filter, localize, ProjectServices, LiftServices, WritingSystemServices, DeckServices, PracticeServices, HashKeyCopier) {
    $scope.projectInitialized = false;
    var configWin = null;
    var sessionsWin = null;

    $scope.chooseFile = function (name, act) {
        var chooser = $(name);
        chooser.change(act);
        chooser.trigger('click');
    };

    $scope.OpenProject = function () {
        if ($scope.project.dirty && global.CheckSave != 2) {
            if ($scope.project.config.autoSave) {
                scope.SaveProject();
            }
            else {
                global.project = angular.copy($scope.project);
                var saveWin = gui.Window.open("savePrompt.html", {
                    title: "",
                    position: 'center',
                    width: 300,
                    height: 200,
                    resizable: true,
                    toolbar: false,
                    show: true
                });
                var cancelOpen = false;
                var waiting = true;
                saveWin.on("closed", function () {
                    /*if (global.CheckSave = 0) {
                     cancelOpen = true;
                     return false;
                     }
                     */
                    if (global.CheckSave == 1) {
                        $scope.SaveProject();
                        global.CheckSave = 0;
                    }
                    if (global.CheckSave == 2) {
                        $scope.OpenProject();
                    }
                    global.project = null;
                    this.close()
                });
                return false;
            }

        }
        global.checkSave = null;
        $scope.chooseFile("#projectFileDialog", function (evt) {
            var file = $("#projectFileDialog").val();
            if (file !== "") {
                try {
                    var history;
                    if (localStorage.history) {
                        history = localStorage.history;
                    }
                    else {
                        history = "[]";
                    }
                    if (history && history !== "[]") {
                        history = angular.fromJson(history);
                        var index = history.indexOf(file);
                        if (index > -1) {
                            history.splice(index, 1);
                        }
                        history.unshift(file);
                        history = angular.toJson(history);
                        localStorage.history = history;
                    }
                    else {
                        history = new Array();
                        history.push(file);
                        history = angular.toJson(history);
                        localStorage.history = history;
                    }

                    if (file) {
                        try {
                            $scope.project = ProjectServices.openProject(file);
                            if ($scope.project) {
                                $scope.initializeProject();
                                return true;
                            }
                        }
                        catch (e) {

                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }

            }
        });


        return false;
    };

    $scope.SaveProject = function (afterSave) {
        function afterSessionsSave() {
            ProjectServices.saveProject(null, afterSave);
            $scope.project.dirty = false;
            if (!$scope.$$phase && !$scope.$root.$$phase) {
                $scope.$apply();
            }
        }

        /*if ($scope.project && $scope.project.dirty) {
         if ($scope.sessionsLoaded) {
         PracticeServices.saveSessionsToFile(null, afterSessionsSave);
         }
         else {*/
        afterSessionsSave();
        /*   }
         }*/
    };

    $scope.setActiveWritingSystem = function (lang) {
        try {
            if (lang) {
                var ws = $filter('filter')($scope.project.config.writingSystems, {language: lang})[0];
                $scope.activeWritingSystem = ws;
                if (ws.keyboard) {
                    WritingSystemServices.localeService.setCurrentLanguage(ws.keyboard);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    win.on('close', function () {
        var appWindow = this;

        function FinishAppClose() {
            appWindow.hide();
            if (configWin) {
                configWin.close();
            }
            if (sessionsWin) {
                sessionsWin.close();
            }
            if ($scope.modal.showPractice) {
                $scope.closePracticeWindow();
            }
            var history = localStorage.history;
            if (history && history !== "[]") {
                history = angular.fromJson(history);
                var index = history.indexOf($scope.project.liftObject.fileName);
                if (index > -1) {
                    history.splice(index, 1);
                }
                history.unshift($scope.project.liftObject.fileName);
                history = angular.toJson(history);
                localStorage.history = history;
            }
            // After closing the new window, close the main window.
            appWindow.close(true);
        }

        // Hide the window to give use the feeling of closing immediately
        if ($scope.project.dirty) {
            if ($scope.project.config.autoSave) {
                $scope.SaveProject(FinishAppClose);
            }
            else {
                global.project = angular.copy($scope.project);
                var saveWin = gui.Window.open("savePrompt.html", {
                    title: "",
                    position: 'center',
                    width: 300,
                    height: 200,
                    resizable: true,
                    toolbar: false,
                    show: true
                });
                var cancelOpen = false;
                var waiting = true;
                saveWin.on("closed", function () {
                    if (global.CheckSave == 0) {
                        appWindow.close(false);
                        return;
                    }
                    global.project = null;
                    if (global.CheckSave == 1) {
                        $scope.SaveProject(FinishAppClose);
                    }
                    if (global.checkSave == 2) {
                        FinishAppClose();
                    }
                });
            }
        }
        else {
            FinishAppClose();
        }
    });


    $scope.getEntry = function (guid) {
        return $filter('filter')($scope.lift.entry, {guid: guid})[0];
    };
    $scope.getEntryFromRef = function (ref) {
        return $filter('filter')($scope.lift.entry, {id: ref})[0];
    };
    $scope.getSense = function (entry, senseId) {
        return $filter('filter')(entry.sense, {id: senseId})[0];
    };
    $scope.getHeadword = function (entry) {
        if (entry.citation) {
            return $filter('filter')(entry.citation.form, {lang: $scope.project.config.vernacularLang[0]})[0].text.content[0];
        }
        else if (entry.lexicalUnit) {
            return $filter('filter')(entry.lexicalUnit.form, {lang: $scope.project.config.vernacularLang[0]})[0].text.content[0];
        }
        return "";
    };

    /*$scope.getAudioSrc = function (entry) {
     if ($scope.project.config.audioInfo.field === "lexicalUnit") {
     if (entry) {
     var forms = $filter('filter')(entry.lexicalUnit.form, {lang: $scope.project.config.audioInfo.lang});
     if (forms.length) {
     return $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + forms[0].text.content[0];
     }
     }
     }
     else {
     if (entry) {
     if (entry.pronunciation && entry.pronunciation.length && entry.pronunciation[0].media && entry.pronunciation[0].media.length) {
     return $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + entry.pronunciation[0].media[0].href;
     }
     }
     }
     return $scope.project.liftObject.directory + $scope.project.config.audioInfo.path;
     };*/

    $scope.getAudioSourcesForSelection = function (entry) {
        var sounds = new Array();
        if ($scope.project.config.audioInfo.field === "lexicalUnit") {
            if (entry) {
                var forms = $filter('filter')(entry.lexicalUnit.form, {lang: $scope.project.config.audioInfo.lang});
                if (forms.length) {
                    for (var i = 0; i < forms.length; i++) {
                        var sound = {
                            path: forms[i].text.content[0],
                            display: forms[i].text.content[0]
                        }
                        sounds.push(sound);
                    }

                    //return $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + forms[0].text.content[0];
                }
            }
        }
        else {
            if (entry) {
                if (entry.pronunciation && entry.pronunciation.length) {
                    for (var i = 0; i < entry.pronunciation.length; i++) {
                        if (entry.pronunciation[i].media && entry.pronunciation[i].media.length) {
                            for (var j = 0; j < entry.pronunciation[i].media.length; j++) {

                                var sound = {
                                    path: entry.pronunciation[i].media[j].href,
                                    display: entry.pronunciation[i].media[j].href
                                }
                                sounds.push(sound);
                            }
                        }
                    }

                    //return $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + entry.pronunciation[0].media[0].href;
                }
            }
        }
        return sounds;
    };


    $scope.setUpGridColumns = function () {
        var gCols = new Array();
        $scope.gridFilters.length = 0;
        for (var i = 0; i < $scope.listColumns.length; i++) {
            var template = "";
            //var template = "cellTemplates\\List" + $scope.listColumns[i].className + $scope.listColumns[i].dataType + ".html";
            var fName = "__columnMap__." + $scope.listColumns[i].fieldName;
            $scope.gridFilters.push({field: fName, value: ""});
            var columnHeader;
            if ($scope.listColumns[i].dataType !== "Audio") {
                columnHeader = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName | i18n}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div><div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div><div class="ngSortPriority">{{col.sortPriority}}</div><div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div><div class="headerFilter"><input ng-model="gridFilters[' + i + '].value" lang="' + $scope.listColumns[i].writingSystemId + '"/></div>';
            }
            else {
                columnHeader = '<div ng-click="col.sort($event)" class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><div class="ngHeaderText colt{{$index}}">{{col.displayName | i18n}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div><div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
            }

            switch (($scope.listColumns[i].className + $scope.listColumns[i].dataType)) {
                case "LexEntryMultiText":
                    template = '<div lang="' + $scope.listColumns[i].writingSystemId + '">{{row.getProperty(col.field)}}</div>'
                    break;
                case "LexEntryOption":
                    template = '<div lang="' + $scope.listColumns[i].writingSystemId + '">{{row.getProperty(col.field).text}}</div>';
                    break;
                case "LexPronunciationAudio":
                    template = '<span><audio id="{{row.rowIndex}}audio" ng-src="{{row.getProperty(col.field)}}"></audio><button ng-hide="row.getProperty(col.field)==undefined" ng-click="playAudioWord(row.rowIndex+\'audio\', $event)">▶</button></span>';
                    break;
                case "LexSenseMultiText":
                    template = '<div lang="' + $scope.listColumns[i].writingSystemId + '">{{row.getProperty(col.field)}}</div>';
                    break;
                case "LexSenseOption":
                    template = '<span lang="' + $scope.listColumns[i].writingSystemId + '">{{row.getProperty(col.field)}}</span>';
                    break;
                case "LexSenseOptionCollection":
                    template = '<span lang="' + $scope.listColumns[i].writingSystemId + '">{{row.getProperty(col.field)}}</span>';
                    break;
            }

            var col = {field: fName, displayName: $scope.listColumns[i].displayName, headerCellTemplate: columnHeader, cellTemplate: template, sortable: true};
            if ($scope.listColumns[i].sort) {
                $scope.colSortInfo.fields.push(fName);
                $scope.colSortInfo.directions.push($scope.listColumns[i].sort);
            }
            gCols.push(col);
            var wName = "gridFilters[" + i + "].value";
            $scope.$watch(wName, function () {
                var filterText = {};
                //$scope.selectedEntries.length = 0;
                //$scope.Entries = $scope.lift.entry;
                var doFilter = false;
                for (var i = 0; i < $scope.gridFilters.length; i++) {
                    if ($scope.gridFilters[i].value) {

                        filterText[$scope.gridFilters[i].field] = $scope.gridFilters[i].value;
                        doFilter = true;
                    }
                }
                if (doFilter) {
                    //$scope.Entries = $filter('filter')($scope.lift.entry, filterText);
                    var result = $scope.gridOptions.ngGrid.rowCache;
                    $scope.dictionaryFiltered = true;
                    for (var field in filterText) {
                        var fName = field.substr(14);
                        result = $filter('filter')(result, function (item) {
                            if (item.entity.__columnMap__[fName]) {
                                var combining = /[\u0300-\u036F]/g;
                                if (UNorm.nfkd(item.entity.__columnMap__[fName]).toLowerCase().replace(combining, '').indexOf(UNorm.nfkd(filterText[field].toLowerCase().replace(combining, ''))) > -1) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    }
                    $scope.gridOptions.ngGrid.filteredRows = result;
                    for (var i = 0; i < $scope.gridOptions.ngGrid.filteredRows.length; i++) {
                        $scope.gridOptions.ngGrid.filteredRows[i].rowIndex = i;

                    }
                    $scope.gridOptions.ngGrid.rowFactory.filteredRowsChanged();
                    //$scope.Entries = result;
                }
                else {
                    if ($scope.gridOptions && $scope.gridOptions.ngGrid) {
                        $scope.gridOptions.ngGrid.filteredRows = $scope.gridOptions.ngGrid.rowCache;
                        $scope.gridOptions.ngGrid.rowFactory.filteredRowsChanged();
                    }
                    //$scope.Entries = $scope.lift.entry;
                    $scope.dictionaryFiltered = false;
                }
            })
        }
        $scope.gridColumns = gCols;
    };

    $scope.ClearDictionaryFilter = function () {
        for (var i = 0; i < $scope.gridFilters.length; i++) {
            $scope.gridFilters[i].value = "";
        }
    };

    $scope.saveGridColumns = function (args) {
        for (var i = 1; i < args.length; i++) {
            for (var j = 0; j < $scope.listColumns.length; j++) {
                if ($scope.listColumns[j].displayName === args[i].displayName) {
                    $scope.listColumns.move(j, i - 1);
                }
            }
        }
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    };





    $scope.cardFromEntry = function (deck, entry) {
        var cards = $scope.possibleCards(entry);
        if (cards) {
            try {
                var card = {guid: GUID(), entry: entry.guid, properties: cards[0]};
                deck.cards.push(card);
                return card;
            }
            catch (e) {
                alert(e);
            }
        }
    };

    $scope.possibleCards = function (entry, card) {
        var cards = new Array();
        var word = $scope.getHeadword(entry);

        if (entry.relation && entry.relation.length) {
            try {
                var variant = $filter('filter')(entry.relation, function (relation) {
                    if (relation.trait && relation.trait.length) {
                        var trait = $filter('filter')(relation.trait, {name: "variant-type"});
                        if (trait.length > 0) {
                            return true;
                        }
                    }
                    return false;
                });
                if (variant.length > 0) {
                    for (var i = 0; i < variant.length; i++) {
                        var ventry = $scope.getEntryFromRef(variant[i].ref);
                        if (ventry) {
                            var vcards = $scope.possibleCards(ventry, card);
                            if (vcards.length > 0) {
                                for (var j = 0; j < vcards.length; j++) {
                                    vcards[j].variant = variant[i].ref;
                                    vcards[j].side1 = word;
                                }
                                cards = cards.concat(vcards);
                            }
                        }
                    }
                }
                if (cards.length) {

                    return cards;
                }
            }
            catch (e) {
                alert(e);
            }
        }

        var allSensesInfo = [];
        var sense;
        var picture = "";
        var audio = $scope.project.getAudioSrc(entry);
        var combining = /[\u0300-\u036F]/g;
        try {
            if (entry.sense) {
                for (var i = 0; i < entry.sense.length; i++) {
                    sense = entry.sense[i];
                    var allSenseInfoArray = [];
                    if (sense.illustration) {
                        //picture = $scope.project.liftObject.directory + $scope.project.config.picturePath + sense.illustration[0].href;
                        picture = sense.illustration[0].href;
                    }
                    if (sense.gloss) {
                        var gloss = $filter('filter')(sense.gloss, {lang: $scope.project.config.analysisLang[0]})[0].text.content[0];
                        var glossCard = {
                            sense: sense.id,
                            type: "gloss",
                            exampleId: null,
                            side1: word,
                            side2: gloss,
                            audio: audio,
                            picture: picture
                        };
                        if ($scope.project.config.autoAddMedia) {
                            if (glossCard.picture == "") {
                                if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd(glossCard.side2).toLowerCase().replace(combining, "") + ".jpg")) {
                                    glossCard.picture = UNorm.nfkd(glossCard.side2).toLowerCase().replace(combining, "") + ".jpg";
                                }
                                else if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd(glossCard.side2).toLowerCase().replace(combining, "") + ".png")) {
                                    glossCard.picture = UNorm.nfkd(glossCard.side2).toLowerCase().replace(combining, "") + ".png";
                                }
                            }
                            if (glossCard.audio == "") {
                                if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.audioInfo.path + UNorm.nfkd(glossCard.side2).toLowerCase().replace(combining, "") + ".wav")) {
                                    glossCard.audio = UNorm.nfkd(glossCard.side2).toLowerCase().replace(combining, "") + ".wav";
                                }
                            }
                        }
                        cards.push(glossCard);
                        allSenseInfoArray.push(gloss);
                    }
                    if (sense.definition) {
                        var def = $filter('filter')(sense.definition.form, {lang: $scope.project.config.analysisLang[0]})[0].text.content[0]
                        cards.push({
                            sense: sense.id,
                            type: "definition",
                            exampleId: null,
                            side1: word,
                            side2: def,
                            audio: audio,
                            picture: picture
                        });
                        //allSenseInfoArray.push(def);
                    }
                    if (sense.example) {
                        for (var j = 0; j < sense.example.length; j++) {
                            if (sense.example[j].form) {
                                cards.push({
                                    sense: sense.id,
                                    type: "example",
                                    exampleId: j,
                                    side1: $filter('filter')(sense.example[j].form, {lang: $scope.project.config.vernacularLang[0]})[0].text.content[0],
                                    side2: $filter('filter')(sense.example[j].translation[0].form, {lang: $scope.project.config.analysisLang[0]})[0].text.content[0],
                                    audio: audio,
                                    picture: picture
                                });
                            }
                        }
                    }
                    if (def || gloss) {
                        allSensesInfo.push((i + 1) + ": " + allSenseInfoArray.join(", "));
                    }
                }
                if (allSensesInfo.length) {
                    var cardAllInfo = {
                        sense: "",
                        type: "all",
                        exampleId: "",
                        side1: word,
                        side2: allSensesInfo.join(". "),
                        audio: "",
                        picture: ""
                    };
                    cards.push(cardAllInfo);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        if (card && card.properties) {

            var check = $filter('filter')(cards, function (item) {
                for (var prop in card.properties) {
                    if (card.properties[prop] != item[prop]) {
                        return false;
                    }
                }
                return true;
            });
            if (check.length < 1) {
                cards.unshift(card.properties);
            }
        }
        if (!cards.length && word) {
            cards.push({
                sense: "",
                type: "user-defined",
                exampleId: "",
                side1: word,
                side2: "",
                audio: "",
                picture: ""
            });
        }
        return cards;
    };

    $scope.getCard = function (guid) {
        var c = null;

        /*function findCardInDeck (guid, deck) {
         for (var i = 0; i < deck.cards.length; i++) {
         if (deck.cards[i].guid == guid) {
         return deck.cards[i];
         }
         }
         for (var j = 0; j < deck.subdecks.length; j++) {
         var cc = findCardInDeck(guid, deck.subdecks[j]);
         if (cc) return cc;
         }
         return false;
         };

         for (var i = 0; i < $scope.project.decks.length; i++) {
         c = findCardInDeck(guid, $scope.project.decks[i]);
         if (c) return c;
         }

         return false;*/


        $filter('filter')($scope.project.decks, function (d) {
            function findCardInDeck(guid, deck) {
                var ccc = $filter('filter')(deck.cards, {guid: guid});
                if (ccc.length) {
                    return ccc[0];
                }
                for (var i = 0; i < deck.subdecks.length; i++) {
                    var cccc = findCardInDeck(guid, deck.subdecks[i])
                    if (cccc) {
                        return cccc;
                    }
                }
                return false;
            }

            var cc = findCardInDeck(guid, d)
            if (cc) {
                c = cc;
                return true;
            }
            return false;
        });
        if (c) {
            return c;
        }
        return false;
    };

    $scope.setActiveDeck = function (deck) {
        deck.active = !deck.active;
        if ($scope.activeDeck && $scope.activeDeck != deck) {
            $scope.activeDeck.active = false;
        }
        if (deck.active) {
            $scope.activeDeck = deck;
        }
        else {
            $scope.activeDeck = null;
        }
        return false;
    };

    $scope.addDeck = function () {
        if ($scope.activeDeck) {
            $scope.activeDeck.subdecks.push({guid: GUID(), name: "New Deck", subdecks: new Array(), cards: new Array(), expanded: true});
        }
        else {
            $scope.project.decks.push({guid: GUID(), name: "New Deck", subdecks: new Array(), cards: new Array(), expanded: true});
        }
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    };


    var getSelectedDecks = function (decks) {

        for (var i = 0; i < decks.length; i++) {
            if (decks[i].selected === true) {
                $scope.selectedDecks.push(decks[i]);
            }
            if (decks[i].subdecks && decks[i].subdecks.length > 0) {
                getSelectedDecks(decks[i].subdecks);
            }
        }
        return  $scope.selectedDecks;
    };


    $scope.toggleDeck = function (deck) {
        $scope.selectedDecks = [];
        getSelectedDecks($scope.project.decks);
        /* var d = $filter('filter')($scope.selectedDecks, function (deck) {
         ife
         })[0];
         if (d) {
         var i = $scope.selectedDecks.indexOf(d);
            if (i !== -1) {
                $scope.selectedDecks.splice(i, 1);
            }
        }
        else {
            $scope.selectedDecks.push(deck);
            for (var i = 0; i < deck.subdecks.length; i++) {
                $scope.toggleDeck(deck.subdecks[i]);
                deck.subdecks[i].selected = true;
            }
         }*/

    };

    /*$scope.removeDecks = function () {
     if ($scope.selectedDecks) {
     for (var i = 0; i < $scope.selectedDecks.length; i++) {
     if ($scope.selectedDecks[i].parent) {
     $scope.selectedDecks[i].parent.subdecks.splice($scope.selectedDecks[i].parent.subdecks.indexOf($scope.selectedDecks[i]), 1);
     }
     else {
     $scope.project.decks.splice($scope.project.decks.indexOf($scope.selectedDecks[i]), 1);
     }
     }
     $scope.selectedDecks.length = 0;
     $scope.selectedDecks = null;
     $scope.project.dirty = true;
     if ($scope.project.config.autoSave) {
     $scope.SaveProject();
     }
     }
     };*/

    $scope.findDeckParent = function (deck, decks) {
        var match = null;
        for (var i = 0; i < decks.length; i++) {
            if ($scope.project.decks[i].subdecks.length) {
                match = $filter('filter')(decks[i].subdecks, {guid: deck.guid})[0];
                if (match) {
                    return decks[i];
                }
                for (var j = 0; j < decks[i].subdecks.length; j++) {
                    match = $scope.findDeckParent(deck, decks[i].subdecks[j].subdecks);
                    if (match) {
                        return decks[i].subdecks[j];
                    }
                }
            }
        }
        return false;
    };
    var deckToDelete = null;
    $scope.removeDeck = function () {
        var deck = deckToDelete;
        if ($scope.activeDeck === deck) {
            $scope.activeDeck = null;
        }
        var parent = $scope.findDeckParent(deck, $scope.project.decks);
        if (parent) {
            parent.subdecks.splice(parent.subdecks.indexOf(deck), 1);
        }
        else {
            $scope.project.decks.splice($scope.project.decks.indexOf(deck), 1);
        }
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
        $scope.modal.showModal = false;
        $scope.modal.showDeleteDeckAlert = false;
    }

    $scope.removeDeckConfirm = function (deck) {
        deckToDelete = deck;
        $scope.modal.showModal = true;
        $scope.modal.showDeleteDeckAlert = true;
    };

    $scope.removeDeckCancel = function () {
        deckToDelete = null;
        $scope.modal.showModal = false;
        $scope.modal.showDeleteDeckAlert = false;
    };

    $scope.removeCard = function (deck, index) {
        if (deck) {
            deck.cards.splice(index, 1);
            if (deck.cards.length) {
                $scope.setCurrentCard(deck.cards[0]);
            }
            else {
                $scope.currentCard = null;
                $scope.project.config.currentCard = "";
            }
            $scope.project.dirty = true;
        }
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    };

    $scope.dropToDeck = function (deck, model) {
        if (model.type == "entry") {
            var card = null;
            if (!$scope.selectedEntries.length) {
                card = $scope.cardFromEntry(deck, model.value);
                $scope.setCurrentCard(card);
            }
            else {
                for (var i = 0; i < $scope.selectedEntries.length; i++) {
                    card = $scope.cardFromEntry(deck, $scope.selectedEntries[i]);
                }
                $scope.setCurrentCard(card);
            }
            //$scope.project.dirty = true;
        }
        else if (model.type == "card") {
            var card = {
                guid: GUID(),
                entry: model.value.entry,
                properties: model.value.properties
            }
            if (!$filter('filter')(deck.cards, card).length) {
                deck.cards.push(card);
                $scope.setCurrentCard(card);
                //$scope.project.dirty = true;
            }
        }

        /*if ($scope.project.dirty && $scope.project.config.autoSave) {
         $scope.SaveProject();
         }*/
        //$scope.$apply();
    };

    $scope.addEntries = function () {
        if ($scope.activeDeck) {
            if ($scope.selectedEntries.length > 0) {
                var card = null;
                for (var i = 0; i < $scope.selectedEntries.length; i++) {
                    $scope.cardFromEntry($scope.activeDeck, $scope.selectedEntries[i]);
                }
                if (card && card.guid) {
                    $scope.setCurrentCard(card);
                }
                /*$scope.project.dirty = true;
                 if ($scope.project.config.autoSave) {
                 $scope.SaveProject();
                 }*/
            }
        }
    };


    $scope.preparePracticeCards = function () {
        $scope.practiceCards.length = 0;

        $scope.addPracticeCards($scope.selectedDecks);
    };



    $scope.Practice = function () {
        if (!$scope.practice.mode) {
            $scope.practice.mode = $scope.project.config.practiceMode;
        }
        $scope.preparePracticeCards();
        $scope.modal.showModal = true;
        $scope.modal.showPractice = true;
        $scope.modal.quickPractice = false;
    };

    $scope.addPracticeCards = function (decks) {
        for (var i = 0; i < decks.length; i++) {

            for (var j = 0; j < decks[i].cards.length; j++) {
                //var entry = $scope.getEntry(decks[i].cards[j].guid);
                /*if (entry) {
                 $scope.practiceCards.push(entry);
                 }*/
                if (decks[i].selected === true) {
                    $scope.practiceCards.push(decks[i].cards[j]);
                }

            }
            $scope.addPracticeCards(decks[i].subdecks);
        }
    };

    $scope.quickPractice = function () {
        $scope.practiceCards.length = 0;
        if (!$scope.practice.mode) {
            $scope.practice.mode = $scope.project.config.practiceMode;
        }
        for (var i = 0; i < $scope.selectedEntries.length; i++) {
            var entry = $scope.selectedEntries[i];
            try {
                var cards = $scope.possibleCards(entry);
                if (cards && cards.length) {
                    $scope.practiceCards.push({guid: GUID(), entry: entry.guid, properties: cards[0]});
                }
            }
            catch (e) {
                alert(e);
            }
        }
        $scope.modal.showModal = true;
        $scope.modal.showPractice = true;
        $scope.modal.quickPractice = true;
    };

    $scope.switchPracticeMode = function (mode) {
        if (global.currentSession) {
            if (global.oldSession == true) {
                PracticeServices.saveSession(global.currentSession);
                if (global.currentSession.sessionCompleted == true) {
                    var s = $filter('filter')(global.unfinishedSessions, {sessionId: global.currentSession.sessionId});
                    if (s.length) {
                        global.unfinishedSessions.splice(global.unfinishedSessions.indexOf(s[0]), 1)
                    }
                }
            }
            else {
                PracticeServices.addSession(global.currentSession);
            }
            global.currentSession = null;
            PracticeServices.saveSessionsToFile();
        }
        $scope.project.config.practiceMode = mode;
        $scope.practice.mode = mode;
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    }

    $scope.closePracticeWindow = function () {
        $scope.modal.showPractice = false;
        $scope.modal.showModal = false;
        $scope.practice.started = false;
        $scope.project.dirty = true;
        if (global.currentSession) {
            if (global.oldSession == true) {
                PracticeServices.saveSession(global.currentSession);
                if (global.currentSession.sessionCompleted == true) {
                    var s = $filter('filter')(global.unfinishedSessions, {sessionId: global.currentSession.sessionId});
                    if (s.length) {
                        global.unfinishedSessions.splice(global.unfinishedSessions.indexOf(s[0]), 1)
                    }
                }
            }
            else {
                PracticeServices.addSession(global.currentSession);
            }
            global.currentSession = null;
            PracticeServices.saveSessionsToFile();
        }
        $scope.project.config.practiceMode = $scope.practice.mode;
        $scope.practice.mode = null;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    }

    $scope.CompletePracticeSession = function () {
        $scope.practice.finish = true;
        if ($project.config.autoSave) {
            $scope.SaveProject();
        }
    };


    $scope.EditConfiguration = function () {
        //$scope.modal.showModal = true;
        //$scope.modal.showConfigWindow = true;
        global.project = angular.copy($scope.project);
        global.listColumns = angular.copy($scope.listColumns);

        var configWin = gui.Window.open("configure.html", {
            title: "Configuration Options",
            position: 'center',
            width: 700,
            height: 600,
            resizable: true,
            toolbar: false,
            show: true,
            "icon": "V3.png"
        });

        configWin.on("closed", function () {
            if (global.configChanged) {
                $scope.project.config = angular.copy(global.project.config);
                $scope.listColumns = angular.copy(global.listColumns);
                $scope.project.config.listViewTemplate.columns = $scope.listColumns;
                $scope.project.setColumns($scope.listColumns)
                if ($scope.project.config.interfaceLang) {
                    localize.setLanguage($scope.project.config.interfaceLang);
                    /*if ($scope.project.config.interfaceLang == "en-US") {
                     $scope.gridColumns.i18n = "en";
                     }
                     else {
                     $scope.gridColumns.i18n = $scope.project.config.interfaceLang;
                     }*/
                }
                $scope.setUpGridColumns();
                $scope.$apply();
                $scope.project.dirty = true;
                if ($scope.project.config.autoSave) {
                    $scope.SaveProject();
                }
                global.project = null;
                global.listColumns = null;
                configWin = null;
            }
        });
    };

    $scope.openSessionsManager = function () {
        global.decks = angular.copy($scope.project.decks);
        global.projectConfig = angular.copy($scope.project.config);
        sessionsWin = gui.Window.open("sessions.html", {
            title: "Session Manager",
            position: 'center',
            width: 900,
            height: 700,
            resizable: true,
            toolbar: false,
            show: true,
            "icon": "V3.png"
        });

        sessionsWin.on("DeleteAllSessions", function () {
            PracticeServices.deleteAllSessions();
            PracticeServices.saveSessionsToFile();
            sessionsWin.close();
        });

        sessionsWin.on("DeleteSingleSession", function (s) {
            PracticeServices.deleteSession(s.sessionId);
            PracticeServices.saveSessionsToFile();
            this.emit("SingleSessionDeleted");
        });

        sessionsWin.on("closed", function () {
            global.decks = null;
            global.project = null;
            sessionsWin = null;
        });
    };

    $scope.showCardStatisticsWindow = function () {
        $scope.modal.showModal = true;
        $scope.modal.showCardStatistics = true;
    };

    $scope.closeCardStatisticsWindow = function () {
        $scope.modal.showModal = false;
        $scope.modal.showCardStatistics = false;
    };

    $scope.saveAllDecks = function () {
        DeckServices.saveDeck($scope.liftObject.liftPathNoExt + "deck", $scope.project.decks);
    };

    $scope.exportDecks = function () {
        if ($scope.selectedDecks.length > 0) {
            $scope.chooseFile("#deckFileSaveDialog", function (evt) {
                var path = $(this).val();
                if (path.substring(path.length - 5) !== ".deck") {
                    path = path + ".deck";
                }
                DeckServices.saveDeck(path, $scope.selectedDecks);
            });
        }
    };

    $scope.importDecks = function () {
        $scope.chooseFile("#deckFileOpenDialog", function (evt) {
            var path = $(this).val();
            if (path) {
                var decks = DeckServices.openDecks(path);
                if (decks.length) {
                    if ($scope.activeDeck) {
                        for (var i = 0; i < decks.length; i++) {
                            $scope.activeDeck.subdecks.push(decks[i]);
                        }
                    }
                    else {
                        for (var i = 0; i < decks.length; i++) {
                            $scope.project.decks.push(decks[i]);
                        }
                    }
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }
                }
            }
        });
    };

    $scope.MoveItemUp = function (list, index) {
        if (list && Array.isArray(list)) {
            var j;
            var first = list.indexOf(index[0]);
            if (first > 0) {
                for (var i = 0; i < index.length; i++) {
                    j = list.indexOf(index[i]);

                    if (j > 0) {
                        list.move(j, j - 1);

                    }
                }
            }
        }
    };

    $scope.MoveItemDown = function (list, index) {
        if (list && Array.isArray(list)) {
            var j;
            var last = list.indexOf(index[index.length - 1]);
            if (last < list.length - 1) {
                for (var i = index.length - 1; i > -1; i--) {
                    j = list.indexOf(index[i]);

                    if (j < list.length - 1) {
                        list.move(j, j + 1);

                    }
                }
            }
        }
    };

    $scope.playAudioWord = function (id, $event) {
        var audio = document.getElementById(id);
        if (audio) {
            if ($event) {
                $event.stopPropagation();
            }
            audio.play();
        }
    };

    var cardToChange = null;

    function changeToCard() {
        if (cardToChange && cardToChange.guid) {
            $scope.currentCard = cardToChange;
            $scope.project.config.currentCard = $scope.currentCard.guid;
            $scope.project.dirty = true;
            if ($scope.project.config.autoSave) {
                $scope.SaveProject();
            }
        }
    }

    $scope.setCurrentCard = function (card) {
        cardToChange = card;
        if ($scope.project.config.cardChangedWarning && $scope.cardChanged) {
            $scope.modal.showModal = true;
            $scope.modal.showSaveCardAlert = true;
        }
        else {
            changeToCard();
        }
    }

    $scope.closeAndSaveCard = function () {
        $scope.modal.showModal = false;
        $scope.modal.showSaveCardAlert = false;

        $scope.saveCard();
        changeToCard();
    };

    $scope.closeSaveCardAlert = function () {
        $scope.modal.showModal = false;
        $scope.modal.showSaveCardAlert = false;
        changeToCard();
    };

    $scope.newCard = {side1: "", side2: ""};
    $scope.newCardEntryMatches = [];
    $scope.newCardEntryMatch = [];

    $scope.showNewCardWindow = function () {
        $scope.newCard = {side1: "", side2: ""};
        $scope.newCardEntryMatches = [];
        $scope.newCardEntryMatch = [];
        $scope.modal.showModal = true;
        $scope.modal.showNewCardW = true;
    };

    $scope.closeNewCardWindow = function () {
        $scope.modal.showModal = false;
        $scope.modal.showNewCardW = false;
        $scope.newCard = {side1: "", side2: ""};
        $scope.newCardEntryMatches = [];
        $scope.newCardEntryMatch = [];
    };

    $scope.$watch("newCard.side1 + newCard.side2", function () {
        $scope.newCardEntryMatches = [];
        $scope.newCardEntryMatch.selection = [];
        var matches = [];
        var combining = /[\u0300-\u036F]/g;
        if ($scope.newCard.side1 || $scope.newCard.side2) {
            matches = $filter('filter')($scope.lift.entry, function (entry) {
                if ($scope.newCard.side1) {
                    var side1Poss = $filter('filter')(entry.lexicalUnit.form, {lang: $scope.project.config.vernacularLang[0]});
                    if (side1Poss.length) {
                        if (UNorm.nfkd(side1Poss[0].text.content[0]).toLowerCase().replace(combining, "").indexOf(UNorm.nfkd($scope.newCard.side1.toLowerCase().replace(combining, ""))) > -1) {
                            return true;
                        }
                    }
                }
                if ($scope.newCard.side2) {
                    if (entry.sense) {
                        var sense;
                        var side2Poss;
                        for (var i = 0; i < entry.sense.length; i++) {
                            sense = entry.sense[i];
                            if (sense.definition) {
                                side2Poss = $filter('filter')(sense.definition.form, {lang: $scope.project.config.analysisLang[0]});
                                if (side2Poss.length) {
                                    if (UNorm.nfkd(side2Poss[0].text.content[0]).toLowerCase().replace(combining, "").indexOf(UNorm.nfkd($scope.newCard.side2.toLowerCase().replace(combining, ""))) > -1) {
                                        return true;
                                    }
                                }
                            }
                            if (sense.gloss) {
                                side2Poss = $filter('filter')(sense.gloss, {lang: $scope.project.config.analysisLang[0]});
                                if (side2Poss.length) {
                                    if (UNorm.nfkd(side2Poss[0].text.content[0]).toLowerCase().replace(combining, "").indexOf(UNorm.nfkd($scope.newCard.side2.toLowerCase().replace(combining, ""))) > -1) {
                                        return true;
                                    }
                                }
                            }
                            if (sense.example) {
                                for (var j = 0; j < sense.example.length; j++) {
                                    if (sense.example[j].form) {
                                        side2Poss = $filter('filter')(sense.example[j].translation[0].form, {lang: $scope.project.config.analysisLang[0]});
                                        if (side2Poss.length) {
                                            if (UNorm.nfkd(side2Poss[0].text.content[0]).toLowerCase().replace(combining, "").indexOf(UNorm.nfkd($scope.newCard.side2.toLowerCase().replace(combining, ""))) > -1) {
                                                return true;
                                            }
                                        }
                                        //side1: $filter('filter')(sense.example[j].form, {lang: $scope.project.config.vernacularLang[0]})[0].text.content[0],
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            });
            if (matches.length) {
                for (var i = 0; i < matches.length; i++) {
                    var headWord = $scope.getHeadword(matches[i]);
                    $scope.newCardEntryMatches.push({entry: matches[i], headWord: headWord});
                }
            }
        }
    });

    $scope.createNewCardSubmit = function () {
        if ($scope.newCard.side1) {
            var card = {
                guid: GUID(),
                entry: null,
                properties: {
                    sense: null,
                    type: "gloss",
                    exampleId: null,
                    side1: $scope.newCard.side1,
                    side2: $scope.newCard.side2,
                    audio: "",
                    picture: ""
                }
            };
            $scope.activeDeck.cards.push(card);
            $scope.setCurrentCard($scope.getCard(card.guid));
        }
        $scope.closeNewCardWindow();
    };

    $scope.newCardFromEntryMatch = function () {
        if ($scope.newCardEntryMatch.selection.length) {
            var card = $scope.cardFromEntry($scope.activeDeck, $scope.newCardEntryMatch.selection[0]);
            $scope.setCurrentCard(card);
        }
        $scope.closeNewCardWindow();
    };

    $scope.$watch('newCardEntryMatch.selection', function () {
        if ($scope.newCardEntryMatch.selection && $scope.newCardEntryMatch.selection.length > 1) {
            $scope.newCardEntryMatch.selection.shift();
        }
    });

    $scope.getVernacularString = function (text) {
        if (text) {
            return "<span lang='" + $scope.project.config.vernacularLang[0] + "'>" + text + "</span>";
        }
        return "";
    };

    $scope.getSenseString = function (entry) {
        if (entry && entry.sense) {
            var definitions = [];
            var glosses = [];
            for (var i = 0; i < entry.sense.length; i++) {
                var sense = entry.sense[i];
                if (sense.definition && sense.definition.form) {
                    var def = $filter('filter')(sense.definition.form, {lang: $scope.project.config.analysisLang[0]});
                    if (def.length && def[0].text) {
                        definitions.push(def[0].text.content[0]);
                    }
                }
                else if (sense.gloss) {
                    var gloss = $filter('filter')(sense.gloss, {lang: $scope.project.config.analysisLang[0]});
                    if (gloss.length && gloss[0].text) {
                        glosses.push(gloss[0].text.content[0]);
                    }
                }
            }
            if (definitions.length) {
                return definitions.join(", ");
            }
            else if (glosses.length) {
                return glosses.join(", ");
            }
        }
        return "";
    };

    $scope.$watch("currentCard", function (newValue, oldValue) {
        var entry;
        if ($scope.currentCard) {
            if ($scope.currentCard.entry) {
                $scope.possibilities = $scope.possibleCards($scope.getEntry($scope.currentCard.entry), $scope.currentCard);
                var check = $filter('filter')($scope.possibilities, function (item) {
                    if (item.sense == $scope.currentCard.properties.sense && item.side2 == $scope.currentCard.properties.side2) {
                        return true;
                    }
                });
                $scope.currentCard.properties = check[0];
                if ($scope.currentCard.properties.variant) {
                    $scope.entry = $scope.getEntryFromRef($scope.currentCard.properties.variant);
                }
                else {
                    $scope.entry = $scope.getEntry($scope.currentCard.entry);
                }
            }
            if ($scope.currentCard.properties) {
                $scope.audioEdit = $scope.currentCard.properties.audio;
                $scope.cardChanged = false;
                $scope.side1Edit = $scope.currentCard.properties.side1;
                $scope.side2Edit = $scope.currentCard.properties.side2;
                $scope.pictureEdit = $scope.currentCard.properties.picture;
            }
            else {
                $scope.audioEdit = "";
                $scope.cardChanged = false;
                $scope.side1Edit = "";
                $scope.side2Edit = "";
                $scope.pictureEdit = "";
            }
            $scope.pictureList = new Array();
            $scope.audioList = new Array();

            if ($scope.entry) {
                var sense = $scope.getSense($scope.entry, $scope.currentCard.properties.sense);
                if (sense && sense.illustration) {
                    for (var i = 0; i < sense.illustration.length; i++) {
                        var pic = {
                            path: sense.illustration[i].href,
                            display: sense.illustration[i].href
                        };
                        $scope.pictureList.push(pic);
                    }
                }
                if ($scope.currentCard.properties.picture) {
                    var check = $filter('filter')($scope.pictureList, {path: $scope.currentCard.properties.picture});
                    if (check < 1) {
                        var shortName = $scope.currentCard.properties.picture.substr($scope.currentCard.properties.picture.lastIndexOf("\\") + 1);
                        $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: shortName});
                    }
                }

                $scope.audioList = $scope.getAudioSourcesForSelection(entry);
                if ($scope.currentCard.properties.audio) {
                    var check = $filter('filter')($scope.audioList, {path: $scope.currentCard.properties.audio});
                    if (check < 1) {
                        var shortName = $scope.currentCard.properties.audio.substr($scope.currentCard.properties.audio.lastIndexOf("\\") + 1);
                        $scope.audioList.push({path: $scope.currentCard.properties.audio, display: shortName});
                    }
                }
            }
            else {
                if ($scope.currentCard.properties.picture) {
                    $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: $scope.currentCard.properties.picture});
                }
                if ($scope.currentCard.properties.audio) {
                    $scope.audioList.push({path: $scope.currentCard.properties.audio, display: $scope.currentCard.properties.audio});
                }
            }
            /*if ($scope.project.config.autoAddMedia) {
             var combining = /[\u0300-\u036F]/g;
             if ($scope.currentCard.properties && $scope.currentCard.properties.picture == "") {
             if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".jpg")) {
             $scope.currentCard.properties.picture = $scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".jpg";
             $scope.pictureEdit = $scope.currentCard.properties.picture;
             $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".jpg"});
             }
             else if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".png")) {
             $scope.currentCard.properties.picture = $scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".png";
             $scope.pictureEdit = $scope.currentCard.properties.picture;
             $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".png"});
             }
             }
             if ($scope.currentCard.properties && $scope.currentCard.properties.audio == "") {
             if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.audioInfo.path + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".wav")) {
             $scope.currentCard.properties.audio = $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".wav";
             $scope.audioEdit = $scope.currentCard.properties.audio;
             $scope.audioList.push({path: $scope.currentCard.properties.audio, display: UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".wav"});
             }
             }
             }*/
        }
        else {
            $scope.audioEdit = "";
            $scope.cardChanged = false;
            $scope.side1Edit = "";
            $scope.side2Edit = "";
            $scope.pictureEdit = "";
            $scope.pictureList = new Array();
            $scope.audioList = new Array();
        }
    });

    $scope.changeCard = function () {
        $scope.side1Edit = $scope.currentCard.properties.side1;
        $scope.side2Edit = $scope.currentCard.properties.side2;
        $scope.pictureEdit = $scope.currentCard.properties.picture;
        $scope.audioEdit = $scope.currentCard.properties.audio;
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
        $(document).click();
    };

    $scope.saveCard = function () {
        try {
            if ($scope.currentCard.properties.side1 != $scope.side1Edit || $scope.currentCard.properties.side2 != $scope.side2Edit) {
                var oldCard = angular.copy($scope.currentCard.properties);
                if ($scope.possibilities) {
                    $scope.possibilities.push(oldCard);
                    $scope.currentCard.properties.type = "user-defined";
                }
                $scope.currentCard.properties.side1 = $scope.side1Edit;
                $scope.currentCard.properties.side2 = $scope.side2Edit;
            }
            $scope.currentCard.properties.picture = $scope.pictureEdit;
            $scope.currentCard.properties.audio = $scope.audioEdit;
            /*if ($scope.project.config.autoAddMedia) {
             var combining = /[\u0300-\u036F]/g;
             if ($scope.currentCard.properties && $scope.currentCard.properties.picture == "") {
             if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".jpg")) {
             $scope.currentCard.properties.picture = $scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".jpg";
             $scope.pictureEdit = $scope.currentCard.properties.picture;
             $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".jpg"});
             }
             else if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".png")) {
             $scope.currentCard.properties.picture = $scope.project.liftObject.directory + $scope.project.config.picturePath + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".png";
             $scope.pictureEdit = $scope.currentCard.properties.picture;
             $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".png"});
             }
             }
             if ($scope.currentCard.properties && $scope.currentCard.properties.audio == "") {
             if (fs.existsSync($scope.project.liftObject.directory + $scope.project.config.audioInfo.path + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".wav")) {
             $scope.currentCard.properties.audio = $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".wav";
             $scope.audioEdit = $scope.currentCard.properties.audio;
             $scope.audioList.push({path: $scope.currentCard.properties.audio, display: UNorm.nfkd($scope.currentCard.properties.side2).toLowerCase().replace(combining, "") + ".wav"});
             }
             }
             }*/
            $scope.cardChanged = false;
            $scope.project.dirty = true;
            if ($scope.project.config.autoSave) {
                $scope.SaveProject();
            }
        }
        catch (e) {
            alert(e);
        }
    };

    $scope.BrowsePicture = function () {
        $scope.chooseFile("#pictureFileDialog", function (evt) {
            var path = $(this).val();
            if (path) {
                try {
                    var fileName = path.substr(path.lastIndexOf("\\") + 1);
                    if (path.substr(0, path.lastIndexOf("\\") + 1) != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath) {
                        fs.copy(path, stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath + fileName, function (err) {
                            if (err) console.log(err);
                            $scope.pictureList.push({path: fileName, display: fileName});
                            $scope.pictureEdit = fileName;
                            $scope.cardChanged = true;
                            $scope.$apply();
                        });
                    }
                    else {
                        $scope.pictureList.push({path: fileName, display: fileName});
                        $scope.pictureEdit = fileName;
                        $scope.cardChanged = true;
                        $scope.$apply();
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            $("#pictureFileDialog").val("");
        });
    };

    $scope.removePicture = function (event) {
        event.stopPropagation();
        $scope.pictureEdit = "";
        $scope.cardChanged = true;
        //$scope.currentCard.properties.picture = "";
    };

    $scope.BrowseAudio = function () {
        $scope.chooseFile("#audioFileDialog", function (evt) {
            var path = $(this).val();
            if (path) {
                try {
                    var fileName = path.substr(path.lastIndexOf("\\") + 1);
                    if (path.substr(0, path.lastIndexOf("\\") + 1) != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo.path) {
                        fs.copy(path, stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo.path + fileName, function (err) {
                            if (err) console.log(err);
                            $scope.audioList.push({path: fileName, display: fileName});
                            $scope.audioEdit = fileName;
                            $scope.cardChanged = true;
                            $scope.$apply();
                        });
                    }
                    else {
                        $scope.audioList.push({path: fileName, display: fileName});
                        $scope.audioEdit = fileName;
                        $scope.cardChanged = true;
                        $scope.$apply();
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            $("#audioFileDialog").val("");
        });
    };

    $scope.removeAudio = function () {
        $scope.audioEdit = "";
        //$scope.currentCard.properties.audio = "";
        $scope.cardChanged = true;
    };

    $scope.initializeProject = function () {
        $scope.projectInitialized = false;
        $scope.sessionsLoaded = false
        $scope.activeWritingSystem = {
            language: "",
            languageName: "",
            fontFamily: "",
            keyboard: null
        };

        window.document.title = "VocabLift - " + $scope.project.liftObject.fileName;

        localize.setLanguage($scope.project.config.interfaceLang);

        $scope.modal = {};
        $scope.modal.showModal = false;
        $scope.modal.showPractice = false;
        $scope.modal.showCardStatistics = false;
        $scope.modal.showSaveCardAlert = false;
        $scope.lift = $scope.project.liftObject.lift.value;
        $scope.listColumns = $scope.project.config.listViewTemplate.columns;

        $scope.picturePath = $scope.project.config.picturePath;


        $scope.gridColumns = new Array();
        $scope.gridFilters = new Array();
        $scope.dictionaryFiltered = false;
        $scope.colSortInfo = {fields: [], columns: [], directions: [] };

        $scope.selectedEntries = new Array();

        $scope.Entries = $scope.lift.entry;
        $scope.gridOptions = {
            //gridId: "dictionaryGrid",
            data: 'Entries',
            headerRowHeight: 56,
            columnDefs: 'gridColumns',
            selectedItems: $scope.selectedEntries,
            rowTemplate: 'partials/gridRowTemplate.html',
            selectWithCheckboxOnly: true,
            showSelectionCheckbox: true,
            //enablePinning: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            //filterOptions: $scope.filterOptions,
            multiSelect: true,
            sortInfo: $scope.colSortInfo,
            showColumnMenu: false,
            showFilter: false,
            showFooter: false
        };

        $scope.setUpGridColumns();

        $scope.$on("ngGridEventColumns", function (event, args) {
            if (!event.targetScope.isColumnResizing && !global.resizeSplitter && $scope.gridOptions.gridId && event.targetScope.gridId == $scope.gridOptions.gridId) {
                if ($scope.projectInitialized) {
                    $scope.saveGridColumns(args);
                }
                $scope.projectInitialized = true;
            }
        });
        $scope.$on('ngGridEventSorted', function (event, sortInfo) {
            if ($scope.gridOptions.gridId && event.targetScope.gridId == $scope.gridOptions.gridId) {
                for (var i = 0; i < $scope.listColumns.length; i++) {
                    delete $scope.listColumns[i].sort;
                }
                for (var i = 0; i < sortInfo.columns.length; i++) {
                    $scope.listColumns[sortInfo.columns[i].index - 1].sort = sortInfo.directions[i];
                }
                if ($scope.projectInitialized) {
                    $scope.project.dirty = true;
                    if ($scope.project.config.autoSave) {
                        $scope.SaveProject();
                    }
                }
            }
        });

        var actD = $filter('filter')($scope.project.decks, {active: true})[0];
        if (actD) {
            $scope.activeDeck = $scope.project.decks[$scope.project.decks.indexOf(actD)];
        }
        else {
            $scope.activeDeck = null;
        }

        $scope.selectedDecks = new Array();
        getSelectedDecks($scope.project.decks);

        PracticeServices.initialize($scope.project.liftObject.liftPathNoExt + "sessions");

        $scope.$on("sessionsUpdated", function () {
            global.allSessions = PracticeServices.getAllSessions();
            $scope.sessionsLoaded = true;
        });

        global.currentSession = null;

        $scope.practiceCards = new Array();

        if ($scope.project.config.practiceMode === undefined || $scope.project.config.practiceMode == null) {
            $scope.project.config.practiceMode = "Comprehension";
        }
        if ($scope.project.config.currentCard) {
            $scope.currentCard = $scope.getCard($scope.project.config.currentCard);
        }
        else {
            $scope.currentCard = $scope.project.decks[0].cards[0];
        }
        $scope.cardChanged = false;

        $scope.newCardEntryMatch.selection = [];
        $scope.project.dirty = false;
        $scope.comprehensionSetSize = 4;
        $scope.practice = {
            mode: null,
            started: false,
            finished: false
        };
    }

    var file = "";

    /*if (file) {
     try {
     $scope.project = ProjectServices.openProject("file:///" + file);
     }
     catch (e) {
     console.log(e);
     }
     }*/
    if (!$scope.project) {

        var history = localStorage.history;
        if (history && history !== "[]") {
            history = angular.fromJson(history);

            file = history.shift();
            if (file) {
                try {
                    $scope.project = ProjectServices.openProject(file);
                    if ($scope.project) {
                        $scope.initializeProject();
                    }
                }
                catch (e) {
                    history = angular.toJson(history);
                    localStorage.history = history;
                }
            }
        }
        if (!$scope.project) {
            $scope.project = {dirty: false};
            $scope.OpenProject();
        }
    }
}

VocabLiftCtrl.$inject = ['$scope', '$filter', 'localize', 'ProjectServices', 'LiftServices', 'WritingSystemServices', 'DeckServices', 'PracticeServices'];

function GridFilterCtrl($scope, $filter) {

    $scope.$watch('gridFilters[$index].value', function (newval, oldval, scope, index) {
        //$scope.filterOptions.filterText = "Word:" + $scope.WordFilter + ";PartOfSpeech:" + $scope.POSFilter + ";Gloss:"+$scope.GlossFilter;
        var filterText = {};
        var doFilter = false;
        for (var i = 0; i < $scope.gridFilters.length; i++) {
            if ($scope.gridFilters[i].value) {
                filterText[$scope.gridFilters[i].field] = Unorm.nfkd($scope.gridFilters[i].value);
                doFilter = true;
            }
        }
        if (doFilter) {
            var result = $scope.Entries;

            for (var field in filterText) {

                result = $filter('filter')(result, function (item) {
                    if (item[field]) {
                        if (filterText[field] == Unorm.nfkd(item[field])) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            $scope.Entries = result;

        }
        else {
            $scope.Entries = $scope.lift.entry;
        }

    });
}

GridFilterCtrl.$inject = ['$scope', '$filter'];


function CardView($scope, $filter) {
    //$scope.currentCard = $scope.$parent.currentCard;
    //$scope.possibilities = $scope.possibleCards($scope.getEntry($scope.currentCard.entry), $scope.currentCard);
    //ugly hack
    //$scope.currentCard.properties = $filter('filter')($scope.possibilities, {sense: $scope.currentCard.properties.sense, side1: $scope.currentCard.properties.side1})[0];

    $scope.$watch("currentCard", function (newValue, oldValue) {
        var entry;
        if ($scope.currentCard) {
            if ($scope.currentCard.entry) {
                $scope.possibilities = $scope.possibleCards($scope.getEntry($scope.currentCard.entry), $scope.currentCard);
                var check = $filter('filter')($scope.possibilities, function (item) {
                    if (item.sense == $scope.currentCard.properties.sense && item.side2 == $scope.currentCard.properties.side2) {
                        return true;
                    }
                });
                $scope.currentCard.properties = check[0];
                if ($scope.currentCard.properties.variant) {
                    $scope.entry = $scope.getEntryFromRef($scope.currentCard.properties.variant);
                }
                else {
                    $scope.entry = $scope.getEntry($scope.currentCard.entry);
                }
            }
            if ($scope.currentCard.properties) {
                $scope.audioEdit = $scope.currentCard.properties.audio;
                $scope.cardChanged = false;
                $scope.side1Edit = $scope.currentCard.properties.side1;
                $scope.side2Edit = $scope.currentCard.properties.side2;
                $scope.pictureEdit = $scope.currentCard.properties.picture;
            }
            else {
                $scope.audioEdit = "";
                $scope.cardChanged = false;
                $scope.side1Edit = "";
                $scope.side2Edit = "";
                $scope.pictureEdit = "";
            }
            $scope.pictureList = new Array();
            $scope.audioList = new Array();

            if ($scope.entry) {
                var sense = $scope.getSense($scope.entry, $scope.currentCard.properties.sense);
                if (sense && sense.illustration) {
                    for (var i = 0; i < sense.illustration.length; i++) {
                        var pic = {
                            path: $scope.project.liftObject.directory + $scope.project.config.picturePath + sense.illustration[i].href,
                            display: sense.illustration[i].href
                        };
                        $scope.pictureList.push(pic);
                    }
                }
                if ($scope.currentCard.properties.picture) {
                    var check = $filter('filter')($scope.pictureList, {path: $scope.currentCard.properties.picture});
                    if (check < 1) {
                        //var shortName = $scope.currentCard.properties.picture.substr($scope.currentCard.properties.picture.lastIndexOf("/") + 1);
                        $scope.pictureList.push({path: $scope.currentCard.properties.picture, display: $scope.currentCard.properties.picture});
                    }
                }

                $scope.audioList = $scope.getAudioSourcesForSelection(entry);
                if ($scope.currentCard.properties.audio) {
                    var check = $filter('filter')($scope.audioList, {path: $scope.currentCard.properties.audio});
                    if (check < 1) {
                        //var shortName = $scope.currentCard.properties.audio.substr($scope.currentCard.properties.audio.lastIndexOf("/") + 1);
                        $scope.audioList.push({path: $scope.currentCard.properties.audio, display: $scope.currentCard.properties.audio});
                    }
                }
            }
        }
        else {
            $scope.audioEdit = "";
            $scope.cardChanged = false;
            $scope.side1Edit = "";
            $scope.side2Edit = "";
            $scope.pictureEdit = "";
            $scope.pictureList = new Array();
            $scope.audioList = new Array();
        }
    });

    $scope.changeCard = function () {
        $scope.side1Edit = $scope.currentCard.properties.side1;
        $scope.side2Edit = $scope.currentCard.properties.side2;
        $scope.pictureEdit = $scope.currentCard.properties.picture;
        $scope.audioEdit = $scope.currentCard.properties.audio;
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
        $(document).click();
    };

    $scope.saveCard = function () {
        try {
            if ($scope.currentCard.properties.side1 != $scope.side1Edit || $scope.currentCard.properties.side2 != $scope.side2Edit) {
                var oldCard = angular.copy($scope.currentCard.properties);
                $scope.possibilities.push(oldCard);
                $scope.currentCard.properties.type = "user-defined";
                $scope.currentCard.properties.side1 = $scope.side1Edit;
                $scope.currentCard.properties.side2 = $scope.side2Edit;
            }
            $scope.currentCard.properties.picture = $scope.pictureEdit;
            $scope.currentCard.properties.audio = $scope.audioEdit;
            $scope.cardChanged = false;
            $scope.project.dirty = true;
            if ($scope.project.config.autoSave) {
                $scope.SaveProject();
            }
        }
        catch (e) {
            alert(e);
        }
    };

    /*$scope.BrowsePicture = function () {
     $scope.chooseFile("#pictureFileDialog", function (evt) {
     var path = $(this).val();
     if (path) {
     try {
     var fileName = path.substr(path.lastIndexOf("\\") + 1);
     if (path.substr(0, path.lastIndexOf("\\")+1) != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath) {
     fs.copy(path, stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath + fileName, function(err){
     if (err) console.log(err);
     $scope.pictureList.push({path: fileName, display: fileName});
     $scope.pictureEdit =  fileName;
     $scope.cardChanged = true;
     $scope.$apply();
     });
     }
     else {
     $scope.pictureList.push({path:  fileName, display: fileName});
     $scope.pictureEdit = fileName;
     $scope.cardChanged = true;
     $scope.$apply();
     }
     }
     catch (e) {
     console.log(e);
     }
     }
     });
     };*/

    $scope.removePicture = function (event) {
        event.stopPropagation();
        $scope.pictureEdit = "";
        $scope.cardChanged = true;
        //$scope.currentCard.properties.picture = "";
    };

    /*$scope.BrowseAudio = function () {
     $scope.chooseFile("#audioFileDialog", function (evt) {
     var path = $(this).val();
     if (path) {
     try {
     var fileName = path.substr(path.lastIndexOf("\\" + 1));
     if (path.substr(0, path.lastIndexOf("\\") + 1) != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo.path) {
     fs.copy(path, fileName, function(err){
     if (err) console.log(err);
     $scope.audioList.push({path: fileName, display: fileName});
     $scope.audioEdit = fileName;
     $scope.cardChanged = true;
     $scope.$apply();
     });
     }

     $scope.audioList.push({path: fileName, display: fileName});
     $scope.audioEdit = fileName;
     $scope.cardChanged = true;
     $scope.$apply();
     }
     catch (e) {
     console.log(e);
     }
     }
     });
     };*/

    $scope.removeAudio = function () {
        $scope.audioEdit = "";
        //$scope.currentCard.properties.audio = "";
        $scope.cardChanged = true;
    };


}
CardView.$inject = ['$scope', '$filter'];


function CardListView($scope, $filter) {
    //$scope.possibilities = $scope.possibleCards($scope.getEntry($scope.card.entry), $scope.card);
    //ugly hack
    //$scope.card.properties = $filter('filter')($scope.possibilities, {sense: $scope.card.properties.sense, side1: $scope.card.properties.side1})[0];

    /*$scope.cardChanged = false;
     $scope.side1Edit = $scope.card.properties.side1;
     $scope.side2Edit = $scope.card.properties.side2;
    $scope.pictureEdit = $scope.card.properties.picture;
    $scope.audioEdit = $scope.card.properties.audio;
    $scope.pictureList = new Array();
    $scope.audioList = new Array();
    var entry;
    if ($scope.card.properties.variant) {
        entry = $scope.getEntryFromRef($scope.card.properties.variant);
    }
    else {
        entry = $scope.getEntry($scope.card.entry);
    }

    if (entry) {
        var sense = $scope.getSense(entry, $scope.card.properties.sense);
        if (sense && sense.illustration) {
            for (var i = 0; i < sense.illustration.length; i++) {
                var pic = {
                    path: $scope.project.liftObject.directory + $scope.project.config.picturePath + sense.illustration[i].href,
                    display: sense.illustration[i].href
                };
                $scope.pictureList.push(pic);
            }
        }
        if ($scope.card.properties.picture) {
            var check = $filter('filter')($scope.pictureList, {path: $scope.card.properties.picture});
            if (check < 1) {
                var shortName = $scope.card.properties.picture.substr($scope.card.properties.picture.lastIndexOf("/") + 1);
                $scope.pictureList.push({path: $scope.card.properties.picture, display: shortName});
            }
        }

        $scope.audioList = $scope.getAudioSourcesForSelection(entry);
        if ($scope.card.properties.audio) {
            var check = $filter('filter')($scope.audioList, {path: $scope.card.properties.audio});
            if (check < 1) {
                var shortName = $scope.card.properties.audio.substr($scope.card.properties.audio.lastIndexOf("/") + 1);
                $scope.audioList.push({path: $scope.card.properties.audio, display: shortName});
            }
        }
    }

    $scope.changeCard = function () {
        $scope.side1Edit = $scope.card.properties.side1;
        $scope.side2Edit = $scope.card.properties.side2;
        $scope.pictureEdit = $scope.card.properties.picture;
        $scope.audioEdit = $scope.card.properties.audio;
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    };

    $scope.saveCard = function () {
        try {
            if ($scope.card.properties.side1 != $scope.side1Edit || $scope.card.properties.side2 != $scope.side2Edit) {
                var oldCard = angular.copy($scope.card.properties);
                $scope.possibilities.push(oldCard);
                $scope.card.properties.type = "user-defined";
                $scope.card.properties.side1 = $scope.side1Edit;
                $scope.card.properties.side2 = $scope.side2Edit;
            }
            $scope.card.properties.picture = $scope.pictureEdit;
            $scope.card.properties.audio = $scope.audioEdit;
            $scope.cardChanged = false;
            $scope.project.dirty = true;
            if ($scope.project.config.autoSave) {
                $scope.SaveProject();
            }
        }
        catch (e) {
            alert(e);
        }
    };

    $scope.BrowsePicture = function () {
     $scope.chooseFile("#pictureFileDialog", function (evt) {
     var path = $(this).val();
     if (path) {
     try {
     var fileName = path.substr(path.lastIndexOf("/"));
     if (path.substr(0, path.lastIndexOf("/")) != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath) {
     copyFile(path, stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath + fileName);
     }

     $scope.pictureList.push({path: $scope.project.liftObject.directory + $scope.project.config.picturePath  + fileName, display: fileName});
     $scope.pictureEdit = $scope.project.liftObject.directory + $scope.project.config.picturePath + fileName;
     $scope.cardChanged = true;
     }
     catch (e) {
     alert(e);
     console.log(e);
     }
     }
     });
     };

     $scope.BrowseAudio = function () {
     $scope.chooseFile("#audioFileDialog", function (evt) {
     var path = $(this).val();
     if (path) {
     try {
     var fileName = path.substr(path.lastIndexOf("/"));
     if (path.substr(0, path.lastIndexOf("/")) != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo) {
     copyFile(path, stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo + fileName);
     }

     $scope.audioList.push({path: $scope.project.liftObject.directory + $scope.project.config.audioInfo  + fileName, display: fileName});
     $scope.audioEdit = $scope.project.liftObject.directory + $scope.project.config.audioInfo + fileName;
     $scope.cardChanged = true;
     }
                catch (e) {
                    alert(e);
                    console.log(e);
                }
            }
     });
     };*/


}
CardListView.$inject = ['$scope', '$filter'];

function PracticeSessionFinishedCtrl($scope, $filter) {
    $scope.currentSession = global.currentSession;
}

function AssociationPractice($scope, $filter) {
    $scope.currentItemIndex = 0;
    $scope.currentSet;
    $scope.practice.started = false;
    $scope.practiceSet;

    $scope.showGloss = true;

    $scope.setupAssociation = function () {
        $scope.currentItemIndex = 0;
        $scope.project.dirty = true;
        if ($scope.practiceCards.length) {
            $scope.practiceSet = angular.copy($scope.practiceCards);
            $scope.practiceSet.shuffle();
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            $scope.practice.started = true;
            setTimeout($scope.playAudioWord, 700, "associationAudio");
        }
    };

    $scope.nextSet = function () {
        if ($scope.currentItemIndex < $scope.practiceSet.length - 1) {
            //this isn't nice
            var audio = document.getElementById("associationAudio");
            audio.src = "";
            //
            $scope.currentItemIndex = $scope.currentItemIndex + 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "associationAudio");
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentItemIndex > 0) {
            var audio = document.getElementById("associationAudio");
            audio.src = "";
            $scope.currentItemIndex = $scope.currentItemIndex - 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "associationAudio");
        }
    };
}
AssociationPractice.$inject = ['$scope', '$filter'];

function FlashCardPractice($scope, $filter, localize) {
    $scope.currentItemIndex = 0;
    $scope.currentSet;
    $scope.practice.started = false;
    $scope.practiceSet;
    $scope.FlashCardTotal;
    $scope.showSide2First = false;


    $scope.showGloss = true;
    $scope.showPicture = true;

    $scope.setupFlashCard = function () {
        $scope.currentItemIndex = 0;
        $scope.project.dirty = true;
        if ($scope.practiceCards.length) {
            $scope.FlashCardTotal = $scope.practiceCards.length;
            $scope.practiceSet = angular.copy($scope.practiceCards);
            $scope.practiceSet.shuffle();
            if ($scope.showSide2First) {
                for (var i = 0; i < $scope.practiceSet.length; i++) {
                    var side1 = $scope.practiceSet[i].properties.side1;
                    $scope.practiceSet[i].properties.side1 = $scope.practiceSet[i].properties.side2;
                    $scope.practiceSet[i].properties.side2 = side1;
                }
            }
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            $scope.currentSet.currentSide = 1;
            $scope.practice.started = true;
            setTimeout($scope.playAudioWord, 700, "flashCardAudio");
        }
    };

    $scope.nextSet = function () {
        if ($scope.currentItemIndex < $scope.practiceSet.length - 1) {
            //this isn't nice
            var audio = document.getElementById("flashCardAudio");
            audio.src = "";

            $scope.currentItemIndex = $scope.currentItemIndex + 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            $scope.currentSet.currentSide = 1;

            setTimeout($scope.playAudioWord, 700, "flashCardAudio");
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentItemIndex > 0) {
            var audio = document.getElementById("flashCardAudio");
            audio.src = "";
            $scope.currentItemIndex = $scope.currentItemIndex - 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            $scope.currentSet.currentSide = 1;
            setTimeout($scope.playAudioWord, 700, "flashCardAudio");
        }
    };
}
FlashCardPractice.$inject = ['$scope', '$filter', 'localize'];

function ComprehensionPractice($scope, $filter, PracticeServices) {
    function getRandom(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }


    //$scope.practiceCopy = $scope.practiceCards.slice();
    $scope.useSession = null;

    global.unfinishedSessions = $filter('filter')(global.allSessions, {type: "Comprehension", sessionCompleted: false});

    $scope.unfinishedSessions = global.unfinishedSessions;

    $scope.practice.started = false;

    $scope.showGloss = true;

    $scope.setupComprehension = function (sessionGUID) {
        if (sessionGUID) {
            global.currentSession = PracticeServices.getSession(sessionGUID);
            global.oldSession = true;
            $scope.currentSession = global.currentSession;
        }

        if (!sessionGUID || !$scope.currentSession) {
            global.currentSession = PracticeServices.createSession($scope.project.config.guid, "Comprehension", $scope.modal.quickPractice, $scope.selectedDecks);

            $scope.currentSession = global.currentSession;
            $scope.project.dirty = true;
            if ($scope.practiceCards.length) {

                for (var i = 0; i < $scope.practiceCards.length; i++) {
                    var set = {item: null, group: new Array()};
                    var practiceCopy = $scope.practiceCards.slice();
                    set.group.push($scope.practiceCards[i]);
                    set.item = practiceCopy.splice(i, 1)[0];

                    for (var j = 0; j < $scope.project.config.comprehensionOptions.setSize - 1; j++) {
                        var found = false;
                        var r;
                        while (!found) {
                            r = getRandom(0, practiceCopy.length - 1);
                            var t = practiceCopy.slice(r)[0];
                            if (set.item.properties.side1 !== t.properties.side1 || practiceCopy.length < 2) {
                                found = true;
                            }

                        }

                        set.group.push(practiceCopy.splice(r, 1)[0]);
                    }
                    set.group.shuffle();
                    $scope.currentSession.sessionData.push({
                        sessionId: $scope.currentSession.sessionId,
                        set: set,
                        attempts: new Array(),
                        correct: false,
                        dateCreated: $scope.currentSession.dateCreated,
                        dateModified: $scope.currentSession.dateModiefied
                    });
                }
                $scope.currentSession.sessionData.shuffle();
            }

        }

        $scope.currentSet = $scope.currentSession.sessionData[$scope.currentSession.currentItemIndex];


        $scope.practice.started = true;

        setTimeout($scope.playAudioWord, 700, "wordAudio");
    }

    $scope.nextSet = function () {
        if ($scope.currentSession.currentItemIndex < $scope.currentSession.sessionData.length - 1) {
            //this isn't nice
            var audio = document.getElementById("wordAudio");
            audio.src = "";
            //
            $scope.currentSession.currentItemIndex = $scope.currentSession.currentItemIndex + 1;
            $scope.currentSet = $scope.currentSession.sessionData[$scope.currentSession.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "wordAudio");
        }
        else if ($scope.currentSession.sessionCompleted) {
            $scope.practice.finished = true;
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentSession.currentItemIndex > 0) {
            var audio = document.getElementById("wordAudio");
            audio.src = "";
            $scope.currentSession.currentItemIndex = $scope.currentSession.currentItemIndex - 1;
            $scope.currentSet = $scope.currentSession.currentItemIndex[$scope.currentSession.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "wordAudio");
        }
    };

    $scope.attempt = function (guid) {
        if (!$scope.currentSet.correct && $scope.currentSet.attempts.length < $scope.project.config.comprehensionOptions.maxAttempts) {
            var now = new Date();
            $scope.currentSet.attempts.push(guid);
            if ($scope.currentSet.set.item.guid === guid) {
                $scope.currentSet.correct = true;
                $scope.currentSession.correct = $scope.currentSession.correct + 1;
                $scope.currentSession.completed = $scope.currentSession.completed + 1;
            }
            if ($scope.currentSet.attempts.length == $scope.project.config.comprehensionOptions.maxAttempts && !$scope.currentSet.correct) {
                $scope.currentSession.incorrect = $scope.currentSession.incorrect + 1;
                $scope.currentSession.completed = $scope.currentSession.completed + 1;
            }
            $scope.currentSet.dateModified = now.toISOString();
            $scope.currentSession.dateModified = now.toISOString();
            if ($scope.currentSession.completed == $scope.currentSession.sessionData.length) {
                $scope.currentSession.sessionCompleted = true;
            }
        }
        else {
            $scope.nextSet();
        }
    };

    $scope.isCorrect = function (guid) {
        if ($scope.currentSet.set.item.guid === guid) {
            return true;
        }
        return false;
    };
    $scope.wasAttempted = function (guid) {
        if ($scope.currentSet.attempts.length) {
            var attempt = $filter('filter')($scope.currentSet.attempts, guid);
            if (attempt.length) {
                return true;
            }
        }
        return false;
    };

    $scope.deleteOldSession = function (session) {
        PracticeServices.deleteSession(session[0].sessionId);
        var s = $filter('filter')($scope.unfinishedSessions, {sessionId: session[0].sessionId});
        if (s.length) {
            $scope.unfinishedSessions.splice($scope.unfinishedSessions.indexOf(s[0]), 1)
        }
        $scope.useSession = null;
        PracticeServices.saveSessionsToFile();
        /*$scope.project.dirty = true;
         if ($scope.project.config.autoSave) {
         $scope.SaveProject();
         }*/
    };
}
ComprehensionPractice.$inject = ['$scope', '$filter', 'PracticeServices'];

function SpellingPractice($scope, $filter, PracticeServices) {
    $scope.useSession = null;

    global.unfinishedSessions = $filter('filter')(global.allSessions, {type: "Spelling", sessionCompleted: false});

    $scope.unfinishedSessions = global.unfinishedSessions;

    $scope.answer = "";
    $scope.practice.started = false;
    $scope.practiceSet;


    $scope.showGloss = true;
    $scope.spellingLang = $scope.project.config.vernacularLang[0];

    $scope.setupSpelling = function (sessionGUID) {
        if (sessionGUID) {
            global.currentSession = PracticeServices.getSession(sessionGUID);
            global.oldSession = true;
            $scope.currentSession = global.currentSession;
        }

        if (!sessionGUID || !$scope.currentSession) {
            global.currentSession = PracticeServices.createSession($scope.project.config.guid, "Spelling", $scope.modal.quickPractice, $scope.selectedDecks);

            $scope.currentSession = global.currentSession;
            $scope.project.dirty = true;

            $scope.project.dirty = true;
            $scope.currentItemIndex = 0;
            if ($scope.practiceCards.length) {
                for (var i = 0; i < $scope.practiceCards.length; i++) {
                    $scope.currentSession.sessionData.push({
                        sessionId: $scope.currentSession.sessionId,
                        set: {item: $scope.practiceCards[i]},
                        attempts: new Array(),
                        correct: false,
                        dateCreated: $scope.currentSession.dateCreated,
                        dateModified: $scope.currentSession.dateModiefied
                    });
                }

                //$scope.currentSession.sessionData = angular.copy($scope.practiceCards);
                $scope.currentSession.sessionData.shuffle();
            }
        }
        $scope.currentSet = $scope.currentSession.sessionData[$scope.currentSession.currentItemIndex];
        $scope.practice.started = true;
        setTimeout($scope.playAudioWord, 700, "spellingAudio");
    };

    $scope.nextSet = function () {
        if ($scope.currentSession.currentItemIndex < $scope.currentSession.sessionData.length - 1) {
            //this isn't nice
            var audio = document.getElementById("spellingAudio");
            audio.src = "";
            $scope.answer = "";

            $scope.currentSession.currentItemIndex = $scope.currentSession.currentItemIndex + 1;
            $scope.currentSet = $scope.currentSession.sessionData[$scope.currentSession.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "spellingAudio");
        }
        else if ($scope.currentSession.sessionCompleted) {
            $scope.practice.finished = true;
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentSession.currentItemIndex > 0) {
            var audio = document.getElementById("spellingAudio");
            audio.src = "";
            $scope.currentSession.currentItemIndex = $scope.currentSession.currentItemIndex - 1;
            $scope.currentSet = $scope.currentSession.currentItemIndex[$scope.currentSession.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "spellingAudio");
        }
    };

    $scope.attempt = function () {
        if (!$scope.currentSet.correct && $scope.currentSet.attempts.length < $scope.project.config.spellingOptions.maxAttempts) {
            var now = new Date();
            $scope.currentSet.attempts.push($scope.answer);

            if ($scope.project.config.spellingOptions.checkDiacritics) {
                if (UNorm.nfkd($scope.answer).toLowerCase() === UNorm.nfkd($scope.currentSet.set.item.properties.side1).toLowerCase()) {
                    $scope.currentSet.correct = true;
                    $scope.currentSession.correct = $scope.currentSession.correct + 1;
                    $scope.currentSession.completed = $scope.currentSession.completed + 1;
                }
            }
            else {
                var combining = /[\u0300-\u036F]/g;
                if (UNorm.nfkd($scope.answer).toLowerCase().replace(combining, '') === UNorm.nfkd($scope.currentSet.set.item.properties.side1).toLowerCase().replace(combining, '')) {
                    $scope.currentSet.correct = true;
                    $scope.currentSession.correct = $scope.currentSession.correct + 1;
                    $scope.currentSession.completed = $scope.currentSession.completed + 1;
                }
            }

            if ($scope.currentSet.attempts.length == $scope.project.config.spellingOptions.maxAttempts && !$scope.currentSet.correct) {
                $scope.currentSession.incorrect = $scope.currentSession.incorrect + 1;
                $scope.currentSession.completed = $scope.currentSession.completed + 1;
            }
            $scope.currentSet.dateModified = now.toISOString();
            $scope.currentSession.dateModified = now.toISOString();
            if ($scope.currentSession.completed == $scope.currentSession.sessionData.length) {
                $scope.currentSession.sessionCompleted = true;
            }
        }
        else {
            $scope.nextSet();
        }
    }

    $scope.deleteOldSession = function (session) {
        PracticeServices.deleteSession(session[0].sessionId);
        var s = $filter('filter')($scope.unfinishedSessions, {sessionId: session[0].sessionId});
        if (s.length) {
            $scope.unfinishedSessions.splice($scope.unfinishedSessions.indexOf(s[0]), 1)
        }
        $scope.useSession = null;
        PracticeServices.saveSessionsToFile();
        /*$scope.project.dirty = true;
         if ($scope.project.config.autoSave) {
         $scope.SaveProject();
         }*/
    };
}
SpellingPractice.$inject = ['$scope', '$filter', 'PracticeServices'];


function PronunciationPractice($scope, $filter) {
    $scope.currentItemIndex = 0;
    $scope.currentSet;
    $scope.practice.started = false;
    $scope.practiceSet;
    $scope.audioStatus = "stopped";

    $scope.showGloss = true;

    $scope.setupPronunciation = function () {
        $scope.currentItemIndex = 0;
        if ($scope.practiceCards.length) {
            $scope.practiceSet = angular.copy($scope.practiceCards);
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            $scope.currentSet.saved_stream = null;
            $scope.practice.started = true;
        }
    };

    $scope.nextSet = function () {
        if ($scope.currentItemIndex < $scope.practiceSet.length - 1) {
            //this isn't nice
            var pronWordAudio = document.getElementById("pronWordAudio");
            pronWordAudio.mozSrcObject = "";
            var pronSayAudio = document.getElementById("pronSayAudio");
            pronSayAudio.mozSrcObject = "";
            //

            $scope.currentItemIndex = $scope.currentItemIndex + 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            if ($scope.currentSet.audioSrc) {
                pronSayAudio.mozSrcObject = $scope.currentSet.audioSrc;
            }
            setTimeout($scope.playAudioWord, 700, "pronWordAudio");
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentItemIndex > 0) {
            var pronWordAudio = document.getElementById("pronWordAudio");
            pronWordAudio.mozSrcObject = "";
            var pronSayAudio = document.getElementById("pronSayAudio");
            pronSayAudio.mozSrcObject = "";

            $scope.currentItemIndex = $scope.currentItemIndex - 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            if ($scope.currentSet.audioSrc) {
                pronSayAudio.mozSrcObject = $scope.currentSet.audioSrc;
            }
            setTimeout($scope.playAudioWord, 700, "pronWordAudio");
        }
    };
    $scope.audioBuffer = null;
    $scope.recordAudio = function () {
        try {
            $scope.audioStatus = "recording";
            window.navigator.mozGetUserMedia({audio: true}, function (stream) {
                var pronSayAudio = document.getElementById("pronSayAudio");
                $scope.audioBuffer = stream;
                pronSayAudio.src = window.URL.createObjectURL(stream);

            }, function (err) {
                dump("mozGetUserMedia error: " + err);
            });
        }
        catch (e) {
            console.log(e);
            $scope.audioStatus = "stopped";
        }

    };

    $scope.stopRecordAudio = function () {
        //var pronSayAudio = document.getElementById("pronSayAudio");
        if ($scope.audioBuffer) {
            $scope.audioBuffer.stop();
            //$scope.currentSet.audioSrc = $scope.audioBuffer;
            $scope.audioBuffer = null;
            //pronSayAudio.mozSrcObject = null;

            $scope.audioStatus = "stopped";
        }
    };
}
PronunciationPractice.$inject = ['$scope', '$filter'];