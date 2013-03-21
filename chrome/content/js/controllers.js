'use strict';

/* Controllers */
var prefs;

//var windowcloser = new WindowCloses();

function VocabLiftCtrl($scope, $filter, ProjectServices, LiftServices, WritingSystemServices, DeckServices) {
    $scope.projectInitialized = false;
    $scope.OpenProject = function (newWindow = true) {
        var nsIFilePicker = Components.interfaces.nsIFilePicker;
        var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
        fp.init(window, "Select a File", nsIFilePicker.modeOpen);
        fp.appendFilter("Lift files", "*.lift");
        var res = fp.show();
        if (res != nsIFilePicker.returnCancel) {
            if (newWindow) {
                // create an nsILocalFile for the executable
                var file = Components.classes["@mozilla.org/file/local;1"]
                    .createInstance(Components.interfaces.nsILocalFile);
                if (navigator.appVersion.indexOf("Win") != -1) {
                    var currDir = Components.classes["@mozilla.org/file/directory_service;1"]
                        .getService(Components.interfaces.nsIDirectoryServiceProvider)
                        .getFile("CurWorkD", {})
                    file.initWithPath(currDir.path + "\\VocabLift.exe");
                }
                // create an nsIProcess
                var process = Components.classes["@mozilla.org/process/util;1"]
                    .createInstance(Components.interfaces.nsIProcess);
                process.init(file);

                // Run the process.
                // If first param is true, calling thread will be blocked until
                // called process terminates.
                // Second and third params are used to pass command-line arguments
                // to the process.

                var args = ["-file", fp.file.path];
                process.run(false, args, args.length);


            }
            var history = prefs.getCharPref("history");
            if (history && history !== "[]") {
                history = angular.fromJson(history);
                var index = history.indexOf(fp.file.path);
                if (index > -1) {
                    history.splice(index, 1);
                }
                history.unshift(fp.file.path);
                history = angular.toJson(history);
                prefs.setCharPref("history", history);
            }
            else {
                history = new Array();
                history.push(fp.file.path);
                history = angular.toJson(history);
                prefs.setCharPref("history", history);
            }
            return fp.file.path;
        }
        return false;
    };

    $scope.SaveProject = function () {
        if (navigator.userAgent.toLowerCase().indexOf('vocablift') != -1 && $scope.project.dirty) {
            $scope.project.config.practiceMode = $scope.practice.mode;
            ProjectServices.saveProject(null);
            $scope.project.dirty = false;
        }
    };

    $scope.appInfo = appInfo;

    if (navigator.userAgent.toLowerCase().indexOf('vocablift') != -1) {

        prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("vocablift.");

        prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);

        prefs.addObserver("", this, false);

        var cmdLine = window.arguments[0];
        cmdLine = cmdLine.QueryInterface(Components.interfaces.nsICommandLine);
        if (cmdLine.length) file = cmdLine.getArgument(0);
        var file = cmdLine.handleFlagWithParam("file", false);

        var WindowObserver =
        {
            observe: function (aSubject, aTopic, aData) {
                if (aTopic === "domwindowclosed" && prefs) {
                    var history = prefs.getCharPref("history");
                    if (history && history !== "[]") {
                        history = angular.fromJson(history);
                        var index = history.indexOf($scope.project.liftObject.fileName);
                        if (index > -1) {
                            history.splice(index, 1);
                        }
                        history.unshift($scope.project.liftObject.fileName);
                        history = angular.toJson(history);
                        prefs.setCharPref("history", history);
                    }
                }
            }
        };

        // Add our observer
        var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
        observerService.addObserver(WindowObserver, "domwindowclosed", false);

        // Remove observer when current window closes
        window.addEventListener("unload", function () {
            observerService.removeObserver(WindowObserver, "domwindowclosed");
        }, false);

        if (file) {
            try {
                $scope.project = ProjectServices.openProject("file:///" + file);
            }
            catch (e) {
                console.log(e);
            }
        }
        if (!$scope.project) {

            var history = prefs.getCharPref("history");
            //alert("History" + history);
            if (history && history !== "[]") {
                history = angular.fromJson(history);

                file = history.shift();
                if (file) {
                    try {
                        $scope.project = ProjectServices.openProject("file:///" + file);
                    }
                    catch (e) {
                        history = angular.toJson(history);
                        prefs.setCharPref("history", history);
                    }
                }
            }
            if (!$scope.project) {
                file = $scope.OpenProject(false);
                if (file) {
                    try {
                        $scope.project = ProjectServices.openProject("file:///" + file);
                    }
                    catch (e) {

                    }
                }
                else {
                    window.close();
                }
            }
        }
    }

    window.document.title = window.document.title + " - " + $scope.project.liftObject.fileName;

    $scope.activeWritingSystem = {
        language: "",
        languageName: "",
        fontFamily: "",
        keyboard: null
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

    $scope.modal = {};
    $scope.modal.showModal = false;
    $scope.modal.showPractice = false;
    $scope.lift = $scope.project.liftObject.lift.value;
    $scope.listColumns = $scope.project.config.listViewTemplate.columns;


    $scope.getEntry = function (guid) {
        return $filter('filter')($scope.lift.entry, {guid: guid})[0];
    };
    $scope.getEntryFromRef = function (ref) {
        //alert(angular.toJson(ref));
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
                            path: $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + forms[i].text.content[0],
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
                                    path: $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + entry.pronunciation[i].media[j].href,
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

    $scope.picturePath = $scope.project.config.picturePath;


    $scope.gridColumns = new Array();
    $scope.gridFilters = new Array();

    $scope.colSortInfo = {fields: [], columns: [], directions: [] };
    $scope.setUpGridColumns = function () {
        var gCols = new Array();
        $scope.gridFilters.length = 0;
        for (var i = 0; i < $scope.listColumns.length; i++) {
            var template = "cellTemplates\\List" + $scope.listColumns[i].className + $scope.listColumns[i].dataType + ".html";
            var fName = "__columnMap__." + $scope.listColumns[i].fieldName;
            $scope.gridFilters.push({field: fName, value: ""});
            var columnHeader;
            if ($scope.listColumns[i].dataType !== "Audio") {
                columnHeader = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div><div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div><div class="ngSortPriority">{{col.sortPriority}}</div><div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div><div class="headerFilter"><input ng-model="gridFilters[' + i + '].value" lang="' + $scope.listColumns[i].writingSystemId + '"/></div>';
            }
            else {
                columnHeader = '<div ng-click="col.sort($event)" class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><div class="ngHeaderText colt{{$index}}">{{col.displayName}}</div><div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div><div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
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
                var doFilter = false;
                for (var i = 0; i < $scope.gridFilters.length; i++) {
                    if ($scope.gridFilters[i].value) {

                        filterText[$scope.gridFilters[i].field] = $scope.gridFilters[i].value;
                        doFilter = true;
                    }
                }
                if (doFilter) {
                    //$scope.Entries = $filter('filter')($scope.lift.entry, filterText);
                    var result = $scope.Entries;

                    for (var field in filterText) {
                        var fName = field.substr(14);
                        result = $filter('filter')(result, function (item) {
                            if (item.__columnMap__[fName]) {
                                if (UNorm.nfkd(item.__columnMap__[fName]).toLowerCase().indexOf(UNorm.nfkd(filterText[field].toLowerCase())) > -1) {
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
            })
        }
        $scope.gridColumns = gCols;
    };

    $scope.setUpGridColumns();

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

    $scope.$on("ngGridEventColumns", function (event, args) {
        if ($scope.projectInitialized) {
            $scope.saveGridColumns(args);
        }
        $scope.projectInitialized = true;
    });
    $scope.$on('ngGridEventSorted', function (event, sortInfo) {
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
    });


    $scope.selectedEntries = new Array();

    $scope.Entries = $scope.lift.entry;
    $scope.gridOptions = {
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
        filterOptions: $scope.filterOptions,
        multiSelect: true,
        sortInfo: $scope.colSortInfo,
        showColumnMenu: false,
        showFilter: false,
        showFooter: true
    };

    $scope.cardFromEntry = function (deck, entry) {
        var cards = $scope.possibleCards(entry);
        if (cards) {
            try {
                deck.cards.push({guid: GUID(), entry: entry.guid, properties: cards[0]});
            }
            catch (e) {
                alert(e);
            }
        }
    };

    $scope.possibleCards = function (entry, card = null) {
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
                            //alert(angular.toJson(ventry));
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

        var sense;
        var picture = "";
        var audio = $scope.project.getAudioSrc(entry);
        try {
            if (entry.sense) {
                for (var i = 0; i < entry.sense.length; i++) {
                    sense = entry.sense[i];
                    if (sense.illustration)
                        picture = $scope.project.liftObject.directory + $scope.project.config.picturePath + sense.illustration[0].href;

                    if (sense.definition) {
                        cards.push({
                            sense: sense.id,
                            type: "definition",
                            exampleId: null,
                            side1: word,
                            side2: $filter('filter')(sense.definition.form, {lang: $scope.project.config.analysisLang[0]})[0].text.content[0],
                            audio: audio,
                            picture: picture
                        });
                    }
                    if (sense.gloss) {
                        cards.push({
                            sense: sense.id,
                            type: "gloss",
                            exampleId: null,
                            side1: word,
                            side2: $filter('filter')(sense.gloss, {lang: $scope.project.config.analysisLang[0]})[0].text.content[0],
                            audio: audio,
                            picture: picture
                        });
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
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        if (card && card.properties) {

            var check = $filter('filter')(cards, function (item) {
                for (var prop in card.properties) {
                    //alert(card[prop] + ":" + item[prop])
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
        return cards;
    };

    //$scope.project.decks = new Array({guid: GUID(), name: "Default", subdecks: new Array(), cards: new Array(), expanded:true, selected:false});


    var actD = $filter('filter')($scope.project.decks, {active: true})[0];
    if (actD) {
        $scope.activeDeck = $scope.project.decks[$scope.project.decks.indexOf(actD)];
    }
    else {
        $scope.activeDeck = null;
    }
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
        var selDecks = [];
        for (var i = 0; i < decks.length; i++) {
            if (decks[i].selected === true) {
                selDecks.push(decks[i]);
            }
            if (decks[i].subdecks && decks[i].subdecks.length > 0) {
                getSelectedDecks(decks[i].subdecks);
            }
        }
        return  selDecks;
    };

    $scope.selectedDecks = getSelectedDecks($scope.project.decks);
    $scope.toggleDeck = function (deck) {
        var d = $filter('filter')($scope.selectedDecks, {guid: deck.guid})[0];
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
        }

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

    $scope.removeDeck = function (deck) {
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
    }

    $scope.removeCard = function (deck, index) {
        if (deck) {
            deck.cards.splice(index, 1);
            $scope.project.dirty = true;
        }
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    };

    $scope.dropToDeck = function (deck, model) {
        if (model.$modelValue.entity) {
            $scope.cardFromEntry(deck, model.$modelValue.entity);
            $scope.project.dirty = true;
        }
        else if (model.$modelValue.properties) {
            var card = {
                guid: GUID(),
                entry: model.$modelValue.entry,
                properties: model.$modelValue.properties
            }
            if (!$filter('filter')(deck.cards, card).length) {
                deck.cards.push(card);
                $scope.project.dirty = true;
            }
        }
        else if (model.$modelValue.name) {

        }
        if ($scope.project.dirty && $scope.project.config.autoSave) {
            $scope.SaveProject();
        }
        //$scope.$apply();
    };

    $scope.addEntries = function () {
        if ($scope.activeDeck) {
            if ($scope.selectedEntries.length > 0) {
                for (var i = 0; i < $scope.selectedEntries.length; i++) {
                    $scope.cardFromEntry($scope.activeDeck, $scope.selectedEntries[i]);
                }
                $scope.project.dirty = true;
                if ($scope.project.config.autoSave) {
                    $scope.SaveProject();
                }
            }
        }
    };

    $scope.practiceCards = new Array();

    $scope.preparePracticeCards = function () {
        $scope.practiceCards.length = 0;
        $scope.addPracticeCards($scope.selectedDecks);
    };

    if ($scope.project.config.practiceMode === undefined) {
        $scope.project.config.practiceMode = "Comprehension";
    }

    $scope.comprehensionSetSize = 4;
    $scope.practice = {
        mode: $scope.project.config.practiceMode,
        started: false
    };

    $scope.Practice = function () {
        $scope.preparePracticeCards();
        $scope.modal.showModal = true;
        $scope.modal.showPractice = true;
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
    };


    $scope.EditConfiguration = function () {
        //$scope.modal.showModal = true;
        //$scope.modal.showConfigWindow = true;

        window.openDialog(
            "partials/configure.html",
            "Configuration Options", "chrome,centerscreen,resizable=yes,dialog=yes,width=700px,height=500px",
            $scope.project,
            $scope.listColumns,
            $scope.updateConfig
        );
    };

    $scope.updateConfig = function (config, columns) {
        $scope.project.config = angular.copy(config);
        $scope.listColumns = angular.copy(columns);
        $scope.project.config.listViewTemplate.columns = $scope.listColumns;
        $scope.project.setColumns($scope.listColumns)
        $scope.setUpGridColumns();
        $scope.$apply();
        $scope.project.dirty = true;
        if ($scope.project.config.autoSave) {
            $scope.SaveProject();
        }
    };

    $scope.saveAllDecks = function () {
        DeckServices.saveDeck($scope.liftObject.liftPathNoExt + "deck", $scope.project.decks);
    };

    $scope.exportDecks = function () {
        if ($scope.selectedDecks.length > 0) {
            var nsIFilePicker = Components.interfaces.nsIFilePicker;
            var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
            fp.init(window, "Export Decks", nsIFilePicker.modeSave);
            fp.appendFilter("Deck files", "*.deck");
            var res = fp.show();
            if (res != nsIFilePicker.returnCancel) {
                var path = fp.file.path;
                if (path.substring(path.length - 5) !== ".deck") {
                    path = path + ".deck";
                }
                DeckServices.saveDeck(path, $scope.selectedDecks);
            }
        }
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
}

VocabLiftCtrl.$inject = ['$scope', '$filter', 'ProjectServices', 'LiftServices', 'WritingSystemServices', 'DeckServices'];

function GridFilterCtrl($scope, $filter) {
    alert("filter!");
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

function CardListView($scope, $filter) {
    $scope.possibilities = $scope.possibleCards($scope.getEntry($scope.card.entry), $scope.card);
    //ugly hack
    $scope.card.properties = $filter('filter')($scope.possibilities, {sense: $scope.card.properties.sense, side1: $scope.card.properties.side1})[0];

    $scope.cardChanged = false;
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
        if (navigator.userAgent.toLowerCase().indexOf('vocablift') != -1) {
            var nsIFilePicker = Components.interfaces.nsIFilePicker;
            var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
            fp.init(window, "Select a File", nsIFilePicker.modeOpen);
            fp.appendFilter("Picture files", "*.jpg;*.jpeg;*.png;*tif");
            var res = fp.show();
            if (res != nsIFilePicker.returnCancel) {
                try {
                    var file = FileIO.open(fp.file.path);
                    var dir = FileIO.open(stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath.substr(0, $scope.project.config.picturePath.lastIndexOf("/")));
                    if (dir.path != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.picturePath.substr(0, $scope.project.config.picturePath.lastIndexOf("/"))) {
                        file.copyTo(dir, "");
                    }

                    $scope.pictureList.push({path: $scope.project.liftObject.directory + $scope.project.config.picturePath + file.leafName, display: file.leafName});
                    $scope.pictureEdit = $scope.project.liftObject.directory + $scope.project.config.picturePath + file.leafName;
                    $scope.cardChanged = true;
                }
                catch (e) {
                    alert(e);
                    console.log(e);
                }
            }
        }
    };

    $scope.BrowseAudio = function () {
        if (navigator.userAgent.toLowerCase().indexOf('vocablift') != -1) {
            var nsIFilePicker = Components.interfaces.nsIFilePicker;
            var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
            fp.init(window, "Select a File", nsIFilePicker.modeOpen);
            fp.appendFilter("Sound files", "*.wav");
            var res = fp.show();
            if (res != nsIFilePicker.returnCancel) {
                try {
                    var file = FileIO.open(fp.file.path);
                    var dir = FileIO.open(stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo.path.substr(0, $scope.project.config.audioInfo.path.lastIndexOf("/")));
                    if (dir.path != stripFilePath($scope.project.liftObject.directory) + $scope.project.config.audioInfo.path.substr(0, $scope.project.config.audioInfo.path.lastIndexOf("/"))) {
                        file.copyTo(dir, "");
                    }

                    $scope.audioList.push({path: $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + file.leafName, display: file.leafName});
                    $scope.audioEdit = $scope.project.liftObject.directory + $scope.project.config.audioInfo.path + file.leafName;
                    $scope.cardChanged = true;
                }
                catch (e) {
                    alert(e);
                    console.log(e);
                }
            }
        }
    };


}
CardListView.$inject = ['$scope', '$filter'];

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

function ComprehensionPractice($scope, $filter) {
    function getRandom(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    //$scope.practiceCopy = $scope.practiceCards.slice();
    $scope.practiceSets = new Array();
    $scope.currentItemIndex = 0;
    $scope.currentSet = $scope.practiceSets[0];

    $scope.completed = 0;
    $scope.correct = 0;
    $scope.incorrect = 0;

    $scope.practice.started = false;

    $scope.showGloss = true;

    $scope.setupComprehension = function () {
        $scope.practiceSets.length = 0;
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
                $scope.practiceSets.push({set: set, attempted: false, correct: false, chosen: null});
            }
            $scope.practiceSets.shuffle();
        }

        $scope.currentItemIndex = 0;
        $scope.currentSet = $scope.practiceSets[0];

        $scope.completed = 0;
        $scope.correct = 0;
        $scope.incorrect = 0;

        $scope.practice.started = true;

        setTimeout($scope.playAudioWord, 700, "wordAudio");
    }

    $scope.nextSet = function () {
        if ($scope.currentItemIndex < $scope.practiceCards.length - 1) {
            //this isn't nice
            var audio = document.getElementById("wordAudio");
            audio.src = "";
            //
            $scope.currentItemIndex = $scope.currentItemIndex + 1;
            $scope.currentSet = $scope.practiceSets[$scope.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "wordAudio");
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentItemIndex > 0) {
            var audio = document.getElementById("wordAudio");
            audio.src = "";
            $scope.currentItemIndex = $scope.currentItemIndex - 1;
            $scope.currentSet = $scope.practiceSets[$scope.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "wordAudio");
        }
    };

    $scope.attempt = function (guid) {
        if (!$scope.currentSet.attempted) {
            $scope.currentSet.attempted = true;
            $scope.completed = $scope.completed + 1;
            if ($scope.currentSet.set.item.guid === guid) {
                $scope.correct = $scope.correct + 1;
            }
            else {
                $scope.incorrect = $scope.incorrect + 1;
            }
        }
    };

    $scope.isCorrect = function (guid) {
        if ($scope.currentSet.set.item.guid === guid) {
            return true;
        }
        return false;
    };
}
ComprehensionPractice.$inject = ['$scope', '$filter'];

function SpellingPractice($scope, $filter) {
    $scope.currentItemIndex = 0;
    $scope.currentSet;
    $scope.answer = "";
    $scope.practice.started = false;
    $scope.practiceSet;

    $scope.completed = 0;
    $scope.correct = 0;
    $scope.incorrect = 0;

    $scope.showGloss = true;
    $scope.spellingLang = $scope.project.config.vernacularLang[0];

    $scope.setupSpelling = function () {
        $scope.project.dirty = true;
        $scope.currentItemIndex = 0;
        if ($scope.practiceCards.length) {
            $scope.practiceSet = angular.copy($scope.practiceCards);
            $scope.practiceSet.shuffle();
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            $scope.practice.started = true;
            setTimeout($scope.playAudioWord, 700, "spellingAudio");
        }
    };

    $scope.nextSet = function () {
        if ($scope.currentItemIndex < $scope.practiceSet.length - 1) {
            //this isn't nice
            var audio = document.getElementById("spellingAudio");
            audio.src = "";
            //
            $scope.answer = "";
            $scope.currentItemIndex = $scope.currentItemIndex + 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "spellingAudio");
        }
    };

    $scope.prevSet = function () {
        if ($scope.currentItemIndex > 0) {
            var audio = document.getElementById("spellingAudio");
            audio.src = "";

            $scope.answer = "";
            $scope.currentItemIndex = $scope.currentItemIndex - 1;
            $scope.currentSet = $scope.practiceSet[$scope.currentItemIndex];
            setTimeout($scope.playAudioWord, 700, "spellingAudio");
        }
    };

    $scope.check = function () {
        if (UNorm.nfkd($scope.answer).toLowerCase() === UNorm.nfkd($scope.currentSet.properties.side1).toLowerCase()) {
            $scope.currentSet.response = "correct";
            $scope.correct = $scope.correct + 1;
        }
        else {
            $scope.currentSet.response = "incorrect";
            $scope.incorrect = $scope.incorrect + 1;
        }
        if ($scope.currentSet.attempts) {
            $scope.currentSet.attempts = $scope.currentSet.attempts + 1;
        }
        else {
            $scope.currentSet.attempts = 1;
            $scope.completed = $scope.completed + 1;
        }


    }
}
SpellingPractice.$inject = ['$scope', '$filter'];


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