pref("toolkit.defaultChromeURI", "chrome://VocabularyManager/content/main.html");
pref("toolkit.defaultChromeFeatures", "chrome,resizable=yes,dialog=no,width=1000px,height=700px");

pref("network.http.accept.default", "text/html,text/json,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")

/* debugging prefs */
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", true);
pref("javascript.options.strict", false);
pref("devtools.chrome.enabled", true);
pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);


/* added to allow <label class="text-links" ... /> to work */
pref("network.protocol-handler.expose.http", false);
pref("network.protocol-handler.warn-external.http", false);

pref("security.fileuri.strict_origin_policy", false);
pref("capability.principal.p0.id", "file:///");


pref("devtools.chrome.enabled", true);
pref("devtools.debugger.remote-enabled", true);