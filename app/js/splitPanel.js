VocabLiftDirectives.directive('splitPanel', function ($document) {
    return {
        compile: function (elem, attrs/*, transcludeFn*/) {

            return function (scope, element, attrs) {
                var orientation = attrs.orientation || "horizontal";

                var sSize;
                var parentMax;
                var splitters;

                function moveSplitter(sp, ev) {
                    var pBefore = sp.prev(".panel");
                    var pAfter = sp.next(".panel");
                    var pBeforeBounds, pAfterBounds;
                    if (orientation == "horizontal") {
                        pBeforeBounds = {min: pBefore.css("minWidth").replace(/[^-\d\.]/g, ''), max: pBefore.css("maxWidth").replace(/[^-\d\.]/g, '') /*+ pBefore.css("padding-left").replace(/[^-\d\.]/g, '') + pBefore.css("padding-right").replace(/[^-\d\.]/g, '')*/};
                        pAfterBounds = {min: pAfter.css("minWidth").replace(/[^-\d\.]/g, ''), max: pAfter.css("maxWidth").replace(/[^-\d\.]/g, '') /*+ pAfter.css("padding-left").replace(/[^-\d\.]/g, '') + pAfter.css("padding-right").replace(/[^-\d\.]/g, '')*/};
                    }
                    else {
                        pBeforeBounds = {min: pBefore.css("minHeight"), max: pBefore.css("maxHeight")};
                        pAfterBounds = {min: pAfter.css("minHeight"), max: pAfter.css("maxHeight")};
                    }

                    element.css("-webkit-user-select", "none");
                    sp.removeClass("splitterLimit");
                    if (orientation == "horizontal") {
                        var spx = ev.pageX;
                        var p1l = pBefore.position().left;
                        var p1r = pBefore.css("right").replace(/[^-\d\.]/g, '');
                        var p2l = pAfter.position().left;
                        var p2r = pAfter.css("right").replace(/[^-\d\.]/g, '');
                        if (pBefore.hasClass("panelCollapsed") || pAfter.hasClass("panelCollapsed") || ( spx > p1l) && (!pBeforeBounds.min || (spx - p1l) > pBeforeBounds.min) && (spx + sSize < parentMax) && (spx + sSize < p2r) && (!pBeforeBounds.max || (spx - p1l) < pBeforeBounds.max) && (!pAfterBounds.min || (p2r - (spx + sSize)) > pAfterBounds.min) && (!pAfterBounds.max || (p2r - (spx + sSize)) < pAfterBounds.max)) {
                            sp.css("left", spx);
                            var spLeft = sp.position().left, spRight = spLeft + sSize;
                            if (!pBefore.hasClass("panelCollapsed")) {
                                pBefore.css("right", spLeft + "px");
                                var t1w = (spLeft - pBefore.position().left) / element.width() * 100;
                                pBefore.css("width", t1w + "%");
                            }
                            if (!pAfter.hasClass("panelCollapsed")) {
                                pAfter.css("left", spRight);
                                pAfter.css("right", p2r);
                                var t2w = (p2r - pAfter.position().left) / element.width() * 100;
                                pAfter.css("width", t2w + "%");
                            }
                            element.resize();
                        }
                        else {
                            sp.addClass("splitterLimit");
                        }
                    }
                    else {
                        var spy = ev.pageY;
                        var p1t = pBefore.position().top;
                        var p1b = pBefore.css("bottom").replace(/[^-\d\.]/g, '');
                        var p2t = pAfter.position().top;
                        var p2b = pAfter.css("bottom").replace(/[^-\d\.]/g, '');
                        if (pBefore.hasClass("panelCollapsed") || pAfter.hasClass("panelCollapsed") || (spy > p1t) && (!pBeforeBounds.min || (spy - p1t) > pBeforeBounds.min) && (spy + sSize < parentMax) && (spy + sSize < p2b) && (!pBeforeBounds.max || (spy - p1t) < pBeforeBounds.max) && (!pAfterBounds.min || (p2b - (spy + sSize)) > pAfterBounds.min) && (!pAfterBounds.max || (p2b - (spy + sSize)) < pAfterBounds.max)) {
                            sp.css("top", spy);
                            var spTop = sp.position().top, spBottom = spTop + sSize;
                            if (!pBefore.hasClass("panelCollapsed")) {
                                pBefore.css("bottom", spTop + "px");
                                var t1w = (spBottom - pBefore.position().top) / element.height() * 100;
                                pBefore.css("height", t1w + "%");
                            }
                            if (!pAfter.hasClass("panelCollapsed")) {
                                pAfter.css("top", spBottom);
                                pAfter.height(p2b - pAfter.position().top);
                                var t2w = (p2r - pAfter.position().top) / element.height() * 100;
                                pAfter.css("height", t2w + "%");
                            }
                            element.resize();
                        }
                        else {
                            sp.addClass("splitterLimit");
                        }
                    }
                }

                function togglePanel(event) {
                    var collapser = $(this);
                    var panel = event.data.panel;
                    var cSplitter = event.data.splitter;
                    if (panel.hasClass("panelCollapsed")) {
                        if (event.data.position == "before" && !panel.hasClass("collapsedAfter")) {
                            collapser.removeClass('pointAfter');
                            collapser.addClass('pointBefore');
                            panel.removeClass("panelCollapsed collapsedBefore");
                            var pl = panel.css("right").replace(/[^-\d\.]/g, '');
                            var pt = panel.css("bottom").replace(/[^-\d\.]/g, '');
                            moveSplitter(cSplitter, {pageX: parseInt(pl), pageY: parseInt(pt)});
                        }
                        else if (event.data.position == "after" && !panel.hasClass("collapsedBefore")) {
                            panel.removeClass("panelCollapsed collapsedAfter");
                            collapser.removeClass('pointBefore');
                            collapser.addClass('pointAfter');
                            var pl = panel.position().left;
                            var pt = panel.position().top;
                            moveSplitter(cSplitter, {pageX: pl, pageY: pt});
                        }
                    }
                    else if (!panel.hasClass("panelCollapsed")) {
                        if (event.data.position == "before") {
                            var pl = panel.position().left;
                            var pt = panel.position().top;
                            panel.addClass("panelCollapsed collapsedBefore");
                            collapser.removeClass('pointBefore');
                            collapser.addClass('pointAfter')
                            moveSplitter(cSplitter, {pageX: pl, pageY: pt});
                        }
                        else if (event.data.position == "after") {
                            var pl = panel.css("right").replace(/[^-\d\.]/g, '');
                            var pt = panel.css("bottom").replace(/[^-\d\.]/g, '');
                            panel.addClass("panelCollapsed collapsedAfter");
                            collapser.removeClass('pointAfter');
                            collapser.addClass('pointBefore');
                            moveSplitter(cSplitter, {pageX: parseInt(pl), pageY: parseInt(pt)});
                        }
                    }

                }

                function addCollapsers(cSplitter) {
                    var cBefore = cSplitter.prev(".panel.collapsible");
                    var cAfter = cSplitter.next(".panel.collapsible");
                    if (cBefore.length || cAfter.length) {
                        var cGroup = $("<div class='collapserGroup'></div>").appendTo(cSplitter);
                        if (cBefore.length) {
                            var bCollapser = $("<div class='panelCollapser pointBefore'></div>").appendTo(cGroup).on("click", {panel: cBefore, splitter: cSplitter, position: "before"}, togglePanel);
                            if (cBefore.hasClass("panelCollapsed collapsedBefore")) {
                                bCollapser.trigger("click");
                                bCollapser.trigger("click");
                            }
                        }
                        if (cAfter.length) {
                            var aCollapser = $("<div class='panelCollapser pointAfter'></div>").appendTo(cGroup).on("click", {panel: cAfter, splitter: cSplitter, position: "after"}, togglePanel);
                            if (cAfter.hasClass("panelCollapsed collapsedAfter")) {
                                aCollapser.trigger("click");
                                aCollapser.trigger("click");
                            }
                        }

                    }
                }

                function resizeSplitPanel() {
                    if (orientation == "horizontal") {
                        parentMax = element.width();
                        splitters.each(function () {
                            var tSp = $(this);  
                            tSp.css("left", tSp.prev().position().left + tSp.prev().width());
                            tSp.next().css("left", tSp.position().left + tSp.width());
                            tSp.next().css("right", tSp.next().position().left + tSp.next().width() + "px");
                        });
                    }
                    else {
                        parentMax = element.height();
                        splitters.each(function () {
                            var tSp = $(this);
                            tSp.css("top", tSp.prev().position().top + tSp.prev().outerHeight());
                            tSp.next().css("top", tSp.position().top + tSp.width());
                            tSp.next().css("bottom", tSp.next().position().left + tSp.next().height() + "px");
                        });
                    }
                }

                $(window).resize(function (event) {
                    if (event.target != this) return;
                    resizeSplitPanel();
                });

                if (orientation == "horizontal") {
                    element.children(".panel").not(":last").after("<div class='panelHSplitter'></div>");
                    parentMax = element.width();
                    splitters = element.children("div.panelHSplitter");
                    sSize = splitters.width();
                    splitters.each(function () {
                        var tSp = $(this);
                        tSp.prev().css("right", tSp.prev().position().left + tSp.prev().outerWidth() - sSize + "px");
                        var t1w = (tSp.prev().width() - sSize) / element.width() * 100;
                        tSp.prev().css("width", t1w + "%");
                        
                        tSp.next().css("right", tSp.next().position().left + tSp.next().outerWidth() + "px");
                        var t2w = (tSp.next().css("right").replace(/[^-\d\.]/g, '') - tSp.next().position().left) / element.width() * 100;
                        tSp.next().css("width", t2w + "%");
                        
                        tSp.css("left", tSp.prev().position().left + tSp.prev().outerWidth());
                        /*var m = Math.abs(tSp.next().position().left - (tSp.position().left + sSize));
                         tSp.nextAll().each(function () {
                         var tD = $(this);
                         tD.css("left", tD.position().left + m);
                         });*/
                        addCollapsers(tSp);
                    });
                }
                else {
                    element.children(".panel").not(":last").after("<div class='panelVSplitter'></div>");
                    parentMax = element.height();
                    splitters = element.children("div.panelVSplitter");
                    sSize = splitters.height();
                    splitters.each(function () {
                        var tSp = $(this);
                        tSp.prev().css("bottom", tSp.prev().position().top + tSp.prev().outerHeight() - sSize + "px");
                        var t1w = (tSp.prev().height() - sSize) / element.height() * 100;
                        tSp.prev().css("height", t1w + "%");
                        
                        tSp.next().css("bottom", tSp.next().position().top + tSp.next().outerHeight() + "px");
                        var t2w = (tSp.next().css("bottom").replace(/[^-\d\.]/g, '') - tSp.next().position().top) / element.height() * 100;
                        tSp.next().css("height", t2w + "%");
                        
                        tSp.css("top", tSp.prev().position().top + tSp.prev().outerHeight());
                        /*var m = Math.abs(tSp.next().position().top - (tSp.position().top + sSize));
                        tSp.nextAll().each(function () {
                            var tD = $(this);
                            tD.css("top", tD.position().top + m);
                        });*/
                        addCollapsers(tSp);
                    });
                }

                if (splitters) {
                    splitters.mousedown(function (event) {
                        if ($(event.target).hasClass("panelCollapser")) {
                            return true;
                        }
                        global.resizeSplitter = true;
                        var sp = $(this);
                        var pBefore = sp.prev(".panel");
                        var pAfter = sp.next(".panel");
                        if (pBefore.hasClass("panelCollapsed")) {
                            togglePanel({data: {panel: pBefore, splitter: sp, position: "before"}});
                            return;
                        }
                        if (pAfter.hasClass("panelCollapsed")) {
                            togglePanel({data: {panel: pAfter, splitter: sp, position: "after"}});
                            return;
                        }

                        /*if (orientation == "horizontal") {
                         pBefore.addClass("panelHMoving");
                         pAfter.addClass("panelHMoving")
                         }

                         else  {
                         pBefore.addClass("panelVMoving");
                         pAfter.addClass("panelVMoving")
                         }*/

                        element.bind("mousemove", function (ev) {
                            sp.addClass("splitterMoving");
                            /*pBefore.removeClass("panelCollapsed");
                             pAfter.removeClass("panelCollapsed");*/
                            moveSplitter(sp, ev);
                        });
                        element.bind("mouseup", function (ev) {
                            element.unbind("mousemove");

                            element.css("-webkit-user-select", "auto");
                            sp.removeClass("splitterLimit");
                            sp.removeClass("splitterMoving");
                            /*pBefore.removeClass("panelHMoving");
                             pBefore.removeClass("panelVMoving");
                             pAfter.removeClass("panelHMoving");
                             pAfter.removeClass("panelVMoving");*/
                            element.unbind("mouseup");
                            global.resizeSplitter = false;
                        });
                    });

                    element.bind("resize", function () {
                        if (orientation == "horizontal") {
                            parentMax = element.width();
                        }
                        else {
                            parentMax = element.height();
                        }
                    });

                }
                /*transcludeFn(scope, function(clone) {

                 element.parent().append(clone);
                 });*/

            };
        }
    };
});

