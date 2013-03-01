'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var VocabManagerServices = angular.module('VocabManager.services', []);
VocabManagerServices.value('version', '0.1');

VocabManagerServices.factory('LiftServices', function ($http, $filter) {
    //vars defined here
    var liftObject = {
        filePath: null,
        fileName: null,
        liftPathNoExt: null,
        directory: null,
        liftXMLDoc: null,
        lift: null,
        liftRangesXMLDoc: null,
        liftRanges: null,
        langs: null,
        picturePath: "",
        weSayAudioLang: ""
    };

    // service methods here
    return {
        loadLift: function (path) {

            var xmlDoc = new XMLHttpRequest();
            try {
                xmlDoc.open('GET', path, false);
                xmlDoc.send();

                // Create Jsonix context
                var liftContext = new Jsonix.Context([LIFT13.Mappings]);
                liftObject.lift = liftContext.createUnmarshaller().unmarshalString(xmlDoc.responseText);

                liftObject.filePath = path;
                liftObject.fileName = stripFilePath(path);
                if (path.indexOf("\\") > 0) { // windows
                    liftObject.directory = path.substring(0, path.lastIndexOf('\\') + 1);
                }
                else { // unix
                    liftObject.directory = path.substring(0, path.lastIndexOf('/') + 1);
                }
                liftObject.liftPathNoExt = path.substring(0, path.length - 4);
                liftObject.liftXMLDoc = xmlDoc;
            }
            catch (e) {
                alert("Error opening LIFT file. Error: " + e);
            }
            if (liftObject.lift.value.producer.search(/sil\.flex/i) !== -1) {
                var liftRangesDoc = new XMLHttpRequest();
                try {
                    liftRangesDoc.open('GET', liftObject.liftPathNoExt + "lift-ranges", false);
                    liftRangesDoc.send();
                    var liftRangesContext = new Jsonix.Context([LIFT15.Mappings]);
                    liftObject.liftRanges = liftRangesContext.createUnmarshaller().unmarshalString(liftRangesDoc.responseText).value;
                    liftObject.liftRangesXMLDoc = liftRangesDoc;
                }
                catch (e) {

                }

                liftObject.picturePath = "pictures/";
            }
            else if (liftObject.lift.value.producer.search(/palaso\.dictionaryservices\.liftwriter/i) !== -1) {
                var weSayConfig = new XMLHttpRequest();
                try {
                    weSayConfig.open('GET', liftObject.liftPathNoExt + "WeSayConfig", false);
                    weSayConfig.send();
                    var weSayConfigContext = new Jsonix.Context([WeSayConfig.Mappings]);
                    liftObject.weSayConfig = weSayConfigContext.createUnmarshaller().unmarshalString(weSayConfig.responseText).value;
                    //liftObject.weSayConfigXMLDoc = weSayConfig;

                    var lexEntry = $filter('filter')(liftObject.weSayConfig.components.viewTemplate.fields.field, {fieldName: "EntryLexicalForm"})[0];
                    liftObject.weSayAudioLang = $filter('filter')(lexEntry.writingSystems.id, "Zxxx-x-audio")[0];
                }
                catch (e) {

                }
            }

            //liftObject.langs = $(liftObject.liftXMLDoc.responseXML.documentElement).xpath("distinct-values(//@lang)");

            return liftObject;
        }

    };
});

VocabManagerServices.factory('DeckServices', function ($http, $filter) {
    return {
        openDecks: function (path) {
            var decks = [];
            var DeckDoc = new XMLHttpRequest();
            DeckDoc.open('GET', path, false);
            try {
                DeckDoc.send();
                decks = JSON.parse(DeckDoc.responseText);
            }
            catch (e) {
                console.log(e);
            }
            return decks;
        },
        saveDeck: function (path, deck) {
            var data = angular.toJson(deck, true);
            path = stripFilePath(path);
            try {
                var f = FileIO.open(path);
                FileIO.create(f);
                FileIO.write(f, data, "", "utf-8");
            }
            catch (e) {
                alert(e);
                console.log(e);
            }
        }
    };
});

VocabManagerServices.factory('ProjectServices', function ($http, $filter, LiftServices, DeckServices) {
    var EntryListRow = function (columns, data) {
        var self = this;
        self.guid = data.guid;
        var len = columns.length;
        for (var i = 0; i < len; i++) {
            var fName = columns[i].fieldName;
            if (columns[i].className === "LexEntry") {
                switch (columns[i].dataType) {
                    case "MultiText":
                        var t = $filter('filter')(data[fName].form, {lang: columns[i].writingSystemId});
                        self[fName] = t[0].text.content[0]
                        break;
                    case "Option":
                        self[fName] = data[fName].value;
                        break;
                    default:

                }
            }
            if (columns[i].className === "LexSense" && data.sense) {

                var ls = data.sense.length;

                self[fName] = "";
                for (var j = 0; j < ls; j++) {

                    switch (columns[i].dataType) {
                        case "MultiText":
                            var t = null;
                            if (fName === "gloss") {
                                if (data.sense[j].gloss) {
                                    t = $filter('filter')(data.sense[j].gloss, {lang: columns[i].writingSystemId});
                                }

                            }
                            else {
                                if (data.sense[j][fName]) {
                                    t = $filter('filter')(data.sense[j][fName].form, {lang: columns[i].writingSystemId});
                                }
                            }
                            if (t && t[0]) {
                                if (j > 0) self[fName] = self[fName] + ", ";
                                self[fName] = self[fName] + t[0].text.content[0];
                            }
                            break;
                        case "Option":
                            if (data.sense[j][fName]) {
                                if (j > 0) self[fName] = self[fName] + ", ";
                                self[fName] = self[fName] + data.sense[j][fName].value;
                            }
                            break;
                        case "OptionCollection":
                            if (data.sense[j].trait) {
                                var domains = $filter('filter')(data.sense[j].trait, {name: "semantic-domain-ddp4"});
                                if (domains) {
                                    for (var k = 0; k < domains.length; k++) {
                                        if (self[fName]) {
                                            self[fName] = self[fName] + ", ";
                                        }
                                        self[fName] = self[fName] + domains[k].value;
                                    }
                                }
                            }
                            break;
                        default:

                    }
                }
            }
            if (columns[i].className === "LexPronunciation") {
                switch (columns[i].dataType) {
                    case "Audio":
                        if (project.getAudioSrc(data)) {
                            self.media = project.getAudioSrc(data);
                        }
                        break;
                    default:
                }
            }
        }
    }

    var project = {
        liftObject: null,
        config: null,
        decks: [],
        defaultColumns: [],
        getAudioSrc: function (entry) {
            if (this.config.audioInfo.field === "lexicalUnit") {
                if (entry) {
                    var forms = $filter('filter')(entry.lexicalUnit.form, {lang: this.config.audioInfo.lang});
                    if (forms.length) {
                        return this.liftObject.directory + this.config.audioInfo.path + forms[0].text.content[0];
                    }
                }
            }
            else {
                if (entry) {
                    if (entry.pronunciation) {
                        return this.liftObject.directory + this.config.audioInfo.path + entry.pronunciation[0].media[0].href;
                    }
                }
            }
            return "";
        },
        setColumns: function (columns) {
            //liftObject.entryRows = new Array();
            var len = this.liftObject.lift.value.entry.length;
            for (var i = 0; i < len; i++) {
                this.liftObject.lift.value.entry[i].__columnMap__ = new EntryListRow(columns, this.liftObject.lift.value.entry[i]);
            }
        }
    };

    return {
        loadConfig: function () {
            var liftConfigDoc = new XMLHttpRequest();
            liftConfigDoc.open('GET', project.liftObject.liftPathNoExt + 'config', false);
            try {
                liftConfigDoc.send();
                project.config = JSON.parse(liftConfigDoc.responseText);
            }
            catch (e) {
                liftConfigDoc.open('GET', 'DefaultTemplate.config', false);
                liftConfigDoc.send();

                project.config = JSON.parse(liftConfigDoc.responseText);

                project.config.appVersion = appInfo.version;

                project.config.vernacularLang = $(project.liftObject.liftXMLDoc.responseXML.documentElement).xpath("distinct-values(//lexical-unit/form/@lang)").toArray();
                var lexicalUnit = $filter('filter')(project.defaultColumns, {fieldName: "lexicalUnit"})[0];
                lexicalUnit.writingSystemId = project.config.vernacularLang[0];
                project.config.listViewTemplate.columns.push(lexicalUnit);

                project.config.analysisLang = $(project.liftObject.liftXMLDoc.responseXML.documentElement).xpath("distinct-values(//gloss/@lang)").toArray();
                if (project.config.analysisLang.length === 0) {
                    project.config.analysisLang = $(project.liftObject.liftXMLDoc.responseXML.documentElement).xpath("distinct-values(//definition/form/@lang)").toArray();
                    if (project.config.analysisLang.length > 0) {
                        var definition = $filter('filter')(project.defaultColumns, {fieldName: "definition"})[0];
                        definition.writingSystemId = project.config.analysisLang[0];
                        project.config.listViewTemplate.columns.push(definition);
                    }
                }
                else {
                    var gloss = $filter('filter')(project.defaultColumns, {fieldName: "gloss"})[0];
                    gloss.writingSystemId = project.config.analysisLang[0];
                    project.config.listViewTemplate.columns.push(gloss);
                }
            }
            // since 0.1.4
            if (navigator.userAgent.toLowerCase().indexOf('vocabularymanager') != -1) {
                if (!project.config.appVersion || Components.classes["@mozilla.org/xpcom/version-comparator;1"].getService(Components.interfaces.nsIVersionComparator).compare(project.config.appVersion, appInfo.version)) {
                    project.config.appVersion = appInfo.version;
                    project.dirty = true;
                }
            }
            if (project.config.autoSave === undefined) {
                project.config.autoSave = true;
                project.dirty = true;
            }
        },
        saveConfig: function () {
            var data = angular.toJson(project.config, true);
            var path = stripFilePath(project.liftObject.liftPathNoExt) + "config";
            try {
                var f = FileIO.open(path);
                FileIO.create(f);
                FileIO.write(f, data, "", "utf-8");
            }
            catch (e) {
                alert(e);
                console.log(e);
            }
        },
        openProject: function (path) {
            project.liftObject = LiftServices.loadLift(path);

            var defaultColumnsFile = new XMLHttpRequest();

            try {
                defaultColumnsFile.open('GET', 'defaultColumns.json', false);
                defaultColumnsFile.send();

                project.defaultColumns = JSON.parse(defaultColumnsFile.responseText).columns;

                this.loadConfig();
                project.setColumns(project.config.listViewTemplate.columns);
            }
            catch (e) {
                alert(e);
                console.log(e);
            }

            project.decks = DeckServices.openDecks(project.liftObject.liftPathNoExt + "deck");
            if (project.decks.length === 0) {
                project.decks.push({guid: GUID(), name: "Default", parent: null, subdecks: new Array(), cards: new Array(), expanded: true});
            }

            return project;
        },
        saveProject: function (path) {
            this.saveConfig();
            DeckServices.saveDeck(project.liftObject.liftPathNoExt + "deck", project.decks);
        }

    };
});
