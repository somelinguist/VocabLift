'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var VocabLiftServices = angular.module('VocabLift.services', []);
VocabLiftServices.value('version', '0.1');

VocabLiftServices.factory('LiftServices', function ($http, $filter) {
    //vars defined here
    var liftObject = {
        filePath: null,
        fileName: null,
        liftPathNoExt: null,
        directory: null,
        liftXMLDoc: null,
        lift: null,
        //liftRangesXMLDoc: null,
        //liftRanges: null,
        langs: null,
        picturePath: "",
        weSayAudioLang: "",
        userFields: []
    };

    // service methods here
    return {
        loadLift: function (path) {

            //var xmlDoc = new XMLHttpRequest();
            var xmlDoc;
            try {
                xmlDoc = fs.readFileSync(path, {encoding: "utf8"});

                // Create Jsonix context
                var liftContext = new Jsonix.Context([LIFT13.Mappings]);
                liftObject.lift = liftContext.createUnmarshaller().unmarshalString(xmlDoc);

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
                /*var liftRangesDoc;
                 try {
                 liftRangesDoc = fs.readFileSync(liftObject.liftPathNoExt + "lift-ranges", {encoding: "utf8"});

                 var liftRangesContext = new Jsonix.Context([LIFT15.Mappings]);
                 liftObject.liftRanges = liftRangesContext.createUnmarshaller().unmarshalString(liftRangesDoc).value;
                 liftObject.liftRangesXMLDoc = liftRangesDoc;
                }
                catch (e) {
                    console.log(e);
                 }*/

                liftObject.picturePath = "pictures\\";
            }
            else if (liftObject.lift.value.producer.search(/palaso\.dictionaryservices\.liftwriter/i) !== -1) {
                var weSayConfig;
                try {
                    weSayConfig = fs.readFileSync(liftObject.liftPathNoExt + "WeSayConfig", {encoding: "utf8"});

                    var weSayConfigContext = new Jsonix.Context([WeSayConfig.Mappings]);
                    liftObject.weSayConfig = weSayConfigContext.createUnmarshaller().unmarshalString(weSayConfig).value;
                    //liftObject.weSayConfigXMLDoc = weSayConfig;

                    var lexEntry = $filter('filter')(liftObject.weSayConfig.components.viewTemplate.fields.field, {fieldName: "EntryLexicalForm"})[0];
                    liftObject.weSayAudioLang = $filter('filter')(lexEntry.writingSystems.id, "Zxxx-x-audio")[0];
                }
                catch (e) {
                    console.log(e);
                }
            }

            return liftObject;
        }

    };
});

VocabLiftServices.factory('DeckServices', function ($http, $filter) {
    return {
        openDecks: function (path) {
            var decks = [];
            var DeckDoc;
            try {
                DeckDoc = fs.readFileSync(path, {encoding: "utf8"});
                decks = JSON.parse(DeckDoc);
            }
            catch (e) {
                console.log(e);
            }
            return decks;
        },
        saveDeck: function (path, deck, afterSave) {
            try {
                var data = angular.toJson(deck, true);
                path = stripFilePath(path);

                fs.writeFile(path, data, function (err, errData) {
                    if (err) {
                        alert(err + ": " + errData);
                        //throw err;
                    }
                    if (afterSave) {
                        afterSave();
                    }
                });
            }
            catch (e) {
                alert(e);
                console.log(e);
            }
        }
    };
});

//if (navigator.userAgent.toLowerCase().indexOf('vocablift') != -1) {
VocabLiftServices.factory('WritingSystemServices', function ($http, $filter) {

    var LocaleService = function () {
            if (navigator.appVersion.indexOf("Win") != -1) {

                this.getCurrentLanguage = function () {
                    var localeTools = spawn('LocaleTools.exe', ['GetKeyboardLayout', process.pid]);
                    var kb = null;
                    var finished = false;
                    localeTools.stdout.on('data', function (data) {
                        kb = data;
                        finished = true;
                        //console.log('stdout: ' + data);
                    });
                    while (!finished) {

                    }
                    return kb;
                };
                this.setCurrentLanguage = function (lang) {
                    var localeTools = spawn('LocaleTools.exe', ['SetCurrentLanguage', lang]);
                };
                /*this.getLanguageName = function (lang) {
                 var id = ctypes.UInt64.lo(ctypes.UInt64(lang)) & 0xFFFF;
                 var len = GetLocaleInfoW(id, 0x00000002, ctypes.jschar.ptr(0), 0);
                    if (len !== 0) {
                        var buf = ctypes.jschar.array(len)();
                        if (GetLocaleInfoW(id, 0x00000002, ctypes.cast(buf.address(), ctypes.jschar.ptr), len) !== 0) {
                            return buf.readString();
                        }
                    }
                };
                this.getLanguageList = function () {
                    var len = GetKeyboardLayoutList(0, HKL.ptr(0));
                    if (len !== 0) {
                        var cList = HKL.array(len)();
                        if (GetKeyboardLayoutList(list, ctypes.cast(cList.address(), HKL.ptr)) !== 0) {
                            var list = [];
                            for (var i = 0; i < len; ++i) {
                                list[i] = cList[i];
                            }
                            return list;
                        }
                    }
                 }*/
                this.localeNameToLCID = function (localeName, getLCID) {
                    var lcid;
                    var localeTools = spawn('LocaleTools.exe', ['LocaleNameToLCID', localeName]);

                    localeTools.stdout.on('data', function (data) {
                        var buff = new Buffer(data);
                        lcid = buff.toString('utf8');
                        if (getLCID) {
                            getLCID(lcid);
                        }
                        //console.log('stdout: ' + data);
                    });
                };
            }
        };
        var service = {
            localeService: new LocaleService(),
            importWritingSystems: function (path) {
                //var writingSystems = [];
                path = stripFilePath(path);
                var writingSystems = [];
                try {
                    var writingSystemContext = new Jsonix.Context([LDML.Mappings]);

                    var files = fs.readdirSync(path)
                    for (var i in files) {
                        var currentFile = path + "/" + files[i];
                        if (currentFile.substring(currentFile.length - 4) === "ldml") {
                            var data = fs.readFileSync(currentFile, {encoding: "utf8"});
                            var ldmlDoc = new XMLHttpRequest();
                            ldmlDoc.open('GET', currentFile, false);
                            try {
                                ldmlDoc.send();

                            }
                            catch (e) {
                                alert(e);
                            }


                            if (ldmlDoc) {
                                try {
                                    var iWs = writingSystemContext.createUnmarshaller().unmarshalString(ldmlDoc.responseText).value;
                                }
                                catch (e) {
                                    alert(e);
                                }
                                var keyboard = null;
                                var language = files[i].substring(0, files[i].length - 5);
                                /*var language = iWs.identity.language.type;
                                 if (iWs.identity.variant) {
                                 language = language + "-" + iWs.identity.variant.type;
                                 }*/
                                var palaso = $filter('filter')(iWs.special, {palasoVersion: "2"});
                                var fw = $filter('filter')(iWs.special, function (f) {
                                    if (f.fwWindowsLCID) {
                                        return true;
                                    }
                                });
                                if ($.isArray(fw) && fw.length) {
                                    keyboard = fw[0].fwWindowsLCID.value;
                                    var ws = {
                                        language: language,
                                        languageName: palaso[0].palasoLanguageName.value,
                                        fontFamily: palaso[0].palasoDefaultFontFamily.value,
                                        keyboard: keyboard
                                    };
                                    writingSystems.push(ws);
                                }
                                else {
                                    var pkb;
                                    if (palaso.length > 1) {
                                        if (palaso[1].palasoKnownKeyboards && palaso[1].palasoKnownKeyboards.keyboard) {
                                            pkb = palaso[1].palasoKnownKeyboards.keyboard[0].locale;
                                        }
                                    }
                                    else if (palaso[0].palasoDefaultKeyboard) {
                                        pkb = palaso[0].palasoDefaultKeyboard.value.split("-", 1)[1];
                                        
                                    }
                                    keyboard = this.localeService.localeNameToLCID(pkb, function (keyboard) {
                                        var ws = {
                                            language: language,
                                            languageName: palaso[0].palasoLanguageName.value,
                                            fontFamily: palaso[0].palasoDefaultFontFamily.value,
                                            keyboard: keyboard
                                        };
                                        writingSystems.push(ws);
                                    });
                                }

                                
                            }

                        }

                    }

                }
                catch (e) {
                    console.log(e);
                }
                return writingSystems;
            }
        };
        return service;

    });
//}

VocabLiftServices.factory('ProjectServices', function ($http, $filter, LiftServices, WritingSystemServices, DeckServices) {
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
                        return forms[0].text.content[0];
                    }
                }
            }
            else {
                if (entry) {
                    if (entry.pronunciation && entry.pronunciation.length && entry.pronunciation[0].media && entry.pronunciation[0].media.length) {
                        return entry.pronunciation[0].media[0].href;
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

                project.config.appVersion = gui.App.manifest.version;

                //project.config.vernacularLang = $(project.liftObject.liftXMLDoc).xpath("distinct-values(//lexical-unit/form/@lang)").toArray();
                var lexicalUnit = $filter('filter')(project.defaultColumns, {fieldName: "lexicalUnit"})[0];
                
                
                project.config.vernacularLang = [];
                project.config.analysisLang = [];
                
                var glosses = false;
                var defintions = false;
                
                angular.forEach(project.liftObject.lift.value.entry, function (entry) {
                    if (entry.lexicalUnit) {
                        angular.forEach(entry.lexicalUnit.form, function (lex) {
                            if (project.config.vernacularLang.indexOf(lex.lang) == -1) {
                                project.config.vernacularLang.push(lex.lang);
                            } 
                        });  
                    }
                    if (entry.sense) {
                        if (entry.sense[0].gloss) {
                            angular.forEach(entry.sense[0].gloss, function (gloss) {
                                if (project.config.analysisLang.indexOf(gloss.lang) == -1) {
                                    project.config.analysisLang.push(gloss.lang);
                                    glosses = true;
                                }
                            });
                        }
                        if (entry.sense[0].definition) {
                            angular.forEach(entry.sense[0].definition.form, function (def) {
                                if (project.config.analysisLang.indexOf(def.lang) == -1) {
                                    project.config.analysisLang.push(def.lang);
                                    defintions = true;
                                }
                            });
                        } 
                    }
                });
                
                lexicalUnit.writingSystemId = project.config.vernacularLang[0];
                project.config.listViewTemplate.columns.push(lexicalUnit);
                
                if (glosses) {
                    var gloss = $filter('filter')(project.defaultColumns, {fieldName: "gloss"})[0];
                    gloss.writingSystemId = project.config.analysisLang[0];
                    project.config.listViewTemplate.columns.push(gloss);
                }
                else if (defintions) {
                    var definition = $filter('filter')(project.defaultColumns, {fieldName: "definition"})[0];
                    definition.writingSystemId = project.config.analysisLang[0];
                    project.config.listViewTemplate.columns.push(definition);
                }
                
                /*project.config.analysisLang = $(project.liftObject.liftXMLDoc).xpath("distinct-values(//gloss/@lang)").toArray();
                if (project.config.analysisLang.length === 0) {
                    project.config.analysisLang = $(project.liftObject.liftXMLDoc).xpath("distinct-values(//definition/form/@lang)").toArray();
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
                }*/
            }

            var semver = require('semver');
            // since 0.3.0

            if (!project.config.guid) {
                project.config.guid = GUID();
            }
            if (!project.config.comprehensionOptions.maxAttempts) {
                project.config.comprehensionOptions.maxAttempts = 3;
            }
            if (!project.config.memoryOptions) {
                project.config.memoryOptions = {
                    maxPairsPerRound: 8
                };
            }
            if (!project.config.spellingOptions) {
                project.config.spellingOptions = {maxAttempts: 3, checkDiacritics: true};
            }
            if (!project.config.appVersion || semver.lt(project.config.appVersion, "0.3.0")) {
                // i18n column display names for dictionary grid
                if (project.config.listViewTemplate.columns && project.config.listViewTemplate.columns.length) {
                    for (var i = 0; i < project.config.listViewTemplate.columns.length; i++) {
                        if (project.config.listViewTemplate.columns[i].displayName.charAt(0) != "_") {
                            project.config.listViewTemplate.columns[i].displayName = "_" + project.config.listViewTemplate.columns[i].displayName + "_";
                        }
                    }
                }
            }
            if (!project.config.interfaceLang) {
                if (["es"].indexOf(navigator.language) == 0) {
                    project.config.interfaceLang = "es";
                }
                else {
                    project.config.interfaceLang = "en-US";
                }
            }
            if (!project.config.practiceMode) {
                project.config.practiceMode = "Comprehension";
            }

            // since 0.1.4
            if (!project.config.appVersion) {
                project.config.appVersion = gui.App.manifest.version;
                project.dirty = true;
            }

            if (project.config.autoSave === undefined) {
                project.config.autoSave = true;
                project.dirty = true;
            }
            // since 0.1.6
            if (project.config.writingSystems === undefined) {
                project.config.writingSystems = WritingSystemServices.importWritingSystems(project.liftObject.directory + "WritingSystems");
            }
        },
        saveConfig: function (afterSave) {
            var data = angular.toJson(project.config, true);
            var path = stripFilePath(project.liftObject.liftPathNoExt) + "config";
            try {
                fs.writeFile(path, data, function (err, errData) {
                    if (err) {
                        console.log(err + ": " + errData);
                        alert(err + ": " + errData);
                        //throw err;
                    }
                    if (afterSave) {
                        afterSave();
                    }
                });
            }
            catch (e) {
                alert(e);
                console.log(e);
            }
        },
        openProject: function (path) {
            project.liftObject = LiftServices.loadLift(path);

            var defaultColumnsFile;

            try {
                defaultColumnsFile = fs.readFileSync('app/defaultColumns.json', {encoding: "utf8"});

                project.defaultColumns = JSON.parse(defaultColumnsFile).columns;

                this.loadConfig();
                project.setColumns(project.config.listViewTemplate.columns);
            }
            catch (e) {
                //alert(e);
                console.log(e);
            }

            project.decks = DeckServices.openDecks(project.liftObject.liftPathNoExt + "deck");
            if (project.decks.length === 0) {
                project.decks.push({guid: GUID(), name: "Default", parent: null, subdecks: new Array(), cards: new Array(), expanded: true});
            }

            return project;
        },
        saveProject: function (path, afterSave) {
            function afterConfigSave() {
                DeckServices.saveDeck(project.liftObject.liftPathNoExt + "deck", project.decks, afterSave);
            }

            this.saveConfig(afterConfigSave);
        }

    };
});

VocabLiftServices.factory('PracticeServices', function ($http, $filter, $rootScope) {
    var filePath = "";
    var sessions = new Array();
    return {
        createSession: function (project, type, quickPractice, sDecks) {
            var now = new Date();
            var decks = [];

            for (var i = 0; i < sDecks.length; ++i) {
                decks.push(sDecks[i].guid);
            }

            return {
                sessionId: GUID(),
                type: type,
                quickPractice: quickPractice,
                decks: decks,
                dateCreated: now.toISOString(),
                dateModified: now.toISOString(),
                correct: 0,
                incorrect: 0,
                completed: 0,
                sessionCompleted: false,
                currentItemIndex: 0,
                sessionData: new Array()
                /* var sessionDataEntry = {
                 sessionId: "",
                 set: {},
                 attempts: {},
                 correct: 1,
                 dateCreated: now.toISOString(),
                 dateModified: now.toISOString()
                 }*/
            };
        },
        loadSessionsFromFile: function (path) {
            var SessionsDoc;
            //sessions = [];
            try {
                /*var unzip = zlib.createUnzip({
                 level: zlib.Z_DEFAULT_COMPRESSION,
                 windowBits: zlib.MAX_WBITS
                 });
                 var inp = fs.createReadStream(path, {encoding: "utf8"});

                 var data = inp.pipe(unzip);//.read();
                 sessions = JSON.parse(data);*/
                
                if (!fs.existsSync(path)) {
                    sessions = [];
                    this.saveSessionsToFile(path);
                }
                else {
                    SessionsDoc = fs.readFileSync(path, {encoding: "utf8"}, function (err, errData) {
                    });
                    var buffer = new Buffer(SessionsDoc, 'base64');
                    zlib.unzip(buffer, function (err, buffer) {
                        if (!err) {
                            var data = buffer.toString();
                            if (data) {
                                sessions = JSON.parse(data);
                            }
                            $rootScope.$broadcast("sessionsUpdated");
                            // TODO: change references in controllers to use .getAllSessions() to save RAM
                            //global.allSessions = sessions;
                        }
                    });
                }
                
            }
            catch (e) {
                alert(e);
                console.log(e);
            }
        },
        saveSessionsToFile: function (path, afterSave) {
            if (!path) {
                path = filePath;
            }
            try {
                if (sessions) {
                    var data = angular.toJson(sessions, true);
                    zlib.deflate(data, function (err, buffer) {
                        if (!err) {
                            data = (buffer.toString('base64'));
                            fs.writeFile(path, data, function (err, errData) {
                                if (err) {
                                    console.log(err + ": " + errData);
                                    alert(err + ": " + errData);
                                    //throw err;
                                }
                                if (afterSave) {
                                    afterSave();
                                }
                            });
                        }
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        addSession: function (session) {
            sessions.push(session);
            $rootScope.$broadcast("sessionsUpdated");
            //global.allSessions = sessions;
        },
        getAllSessions: function () {
            return angular.copy(sessions);
        },
        getSession: function (guid) {
            var session = $filter('filter')(sessions, {sessionId: guid})[0];
            if (session) {
                return session;
            }
            return false;
        },
        saveSession: function (session) {
            for (var i = 0; i < sessions.length; i++) {
                if (sessions[i].sessionId == session.sessionId) {
                    sessions[i] = session;
                    $rootScope.$broadcast("sessionsUpdated");
                    break;
                }
            }
            //global.allSessions = sessions;
        },
        deleteSession: function (guid) {
            var s = $filter('filter')(sessions, {sessionId: guid});
            if (s.length) {
                var i = sessions.indexOf(s[0]);
                if (i != -1) {
                    sessions.splice(i, 1);
                    $rootScope.$broadcast("sessionsUpdated");
                }
            }
            //global.allSessions = sessions;
        },
        deleteAllSessions: function () {
            sessions.length = 0;
        },
        initialize: function (path) {
            filePath = path;
            this.loadSessionsFromFile(filePath);
        }
    }
});
