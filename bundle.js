'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dateFns = require('date-fns');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var useRef = React.useRef, useEffect = React.useEffect;
var HEIGHT = 36;
var dateSort = function (a, b) { return a.start - b.start; };
var timeStampMatch = function (first, second) {
    return !(first.end <= second.start || first.start >= second.end);
};
var getCollitions = function (evt, allEvents) {
    var otherEvents = allEvents.filter(function (d) { return d.id != evt.id; });
    var filterFunc = function (e) { return timeStampMatch(e, evt); };
    return otherEvents.filter(filterFunc);
};
var getPosition = function (evt, _a) {
    var startDate = _a.startDate, totalTicks = _a.totalTicks, width = _a.width, ratio = _a.ratio;
    var timeStampLeft = evt.start.getTime() - startDate.getTime();
    var timeStampRight = evt.end.getTime() - startDate.getTime();
    var left = Math.round(timeStampLeft * ratio);
    var right = Math.round(timeStampRight * ratio);
    return {
        width: right - left,
        left: left,
    };
};
var groupBy = function (arr, criteria) {
    return arr.reduce(function (obj, item) {
        var _a;
        var key = criteria(item);
        return __assign(__assign({}, obj), (_a = {}, _a[key] = __spreadArrays((obj[key] || []), [item]), _a));
    }, {});
};
var EventRow = function (_a) {
    var evt = _a.evt;
    return (React.createElement("div", { key: evt.id, style: {
            backgroundColor: "blue",
            color: "#fff",
            border: "solid 2px red",
        } }, evt.id));
};
var eventReducer = function (Elm, position, onEventClick) { return function (_a, evt) {
    var _b = _a.rendered, rendered = _b === void 0 ? [] : _b, _c = _a.maxHeight, maxHeight = _c === void 0 ? 0 : _c, _d = _a.elements, elements = _d === void 0 ? [] : _d;
    var collisions = getCollitions(evt, rendered);
    var firstFreePosition = collisions.length;
    for (var i = 0; i < rendered.length + 1; i++) {
        if (!collisions.some(function (d) { return d.positionFromTop == i; })) {
            //debugger;
            firstFreePosition = i;
            break;
        }
    }
    var top = firstFreePosition * HEIGHT;
    var node = (React.createElement("div", { key: evt.id, style: __assign(__assign({}, position(evt)), { height: HEIGHT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", top: top, position: "absolute", cursor: onEventClick ? "pointer" : "default" }), onClick: function () { return onEventClick(evt); } },
        React.createElement(Elm, { evt: evt })));
    return {
        elements: __spreadArrays(elements, [node]),
        maxHeight: Math.max(maxHeight || 0, top),
        rendered: __spreadArrays(rendered, [__assign(__assign({}, evt), { positionFromTop: firstFreePosition })]),
    };
}; };
var Resources = function (_a) {
    var group = _a.group, maxHeight = _a.maxHeight, resourceNode = _a.resourceNode;
    return (React.createElement("div", { style: {
            position: "relative",
            height: maxHeight + HEIGHT,
        } },
        React.createElement("div", { style: {
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: maxHeight + HEIGHT,
                width: "100%",
                borderTop: "1px solid rgb(221, 221, 221)",
            } }, resourceNode({ group: group }))));
};
var EventElementsGroup = function (_a) {
    var children = _a.children, maxHeight = _a.maxHeight, width = _a.viewSize.width;
    return (React.createElement("div", { style: {
            position: "relative",
            height: maxHeight + HEIGHT,
            width: width,
            borderBottom: "1px solid rgb(221, 221, 221)",
        } }, children));
};
var GroupNode = function (_a) {
    var title = _a.group.title;
    return React.createElement("div", null, title);
};
var DateNode = function (date) { return React.createElement("div", null, dateFns.format(date, "yyyy-MM-dd")); };
var dateNodeWrapper = function (dateNode, date, viewSize) {
    var _a = getPosition({ start: date, end: dateFns.addDays(date, 1) }, viewSize), width = _a.width, left = _a.left;
    var cls = "is-future";
    switch (true) {
        default:
            cls = "is-future";
            break;
        case dateFns.isToday(date):
            cls = "is-today";
            break;
        case dateFns.isPast(date):
            cls = "is-past";
            break;
    }
    return (React.createElement("div", { style: {
            width: width + "px",
            position: "absolute",
            left: left + "px",
            top: 0,
        }, className: "timeline-date " + cls }, dateNode(date)));
};
var objectMap = function (data, cb) {
    var ret = [];
    Object.keys(data).map(function (key) {
        ret[key] = cb(data[key], key);
    });
    return ret;
};
var extractGroupData = function (groupKey, groups) { return groups[groupKey] || groupKey; };
var Timeline = function (_a) {
    var groups = _a.groups, events = _a.events, _b = _a.startDate, startDate = _b === void 0 ? dateFns.subDays(new Date(), 1) : _b, _c = _a.endDate, endDate = _c === void 0 ? dateFns.addDays(new Date(), 60) : _c, _d = _a.width, width = _d === void 0 ? 5000 : _d, _e = _a.resourceHeaderWidth, resourceHeaderWidth = _e === void 0 ? 200 : _e, _f = _a.groupKey, groupKey = _f === void 0 ? "articleId" : _f, _g = _a.getGroupData, getGroupData = _g === void 0 ? extractGroupData : _g, _h = _a.resourceNode, resourceNode = _h === void 0 ? GroupNode : _h, _j = _a.itemNode, itemNode = _j === void 0 ? EventRow : _j, _k = _a.dateNode, dateNode = _k === void 0 ? DateNode : _k, _l = _a.onEventClick, onEventClick = _l === void 0 ? function (evt) { } : _l;
    var totalTicks = endDate.getTime() - startDate.getTime();
    var viewSize = {
        startDate: startDate,
        endDate: endDate,
        totalTicks: totalTicks,
        ratio: width / totalTicks,
        width: width,
    };
    var dateWrapperRef = useRef(null);
    var resourceWrapperRef = useRef(null);
    var position = function (date) { return getPosition(date, viewSize); };
    var grouped = groupBy(events, function (e) { return e[groupKey]; });
    var range = dateFns.eachDayOfInterval({ start: startDate, end: endDate });
    var dateElements = range.map(function (date) {
        return dateNodeWrapper(dateNode, date, viewSize);
    });
    var groupsWithNodes = objectMap(grouped, function (evts) {
        return evts
            .sort(dateSort)
            .reduce(eventReducer(itemNode, position, onEventClick), {});
    });
    var resourceElements = objectMap(groupsWithNodes, function (_a, key) {
        var maxHeight = _a.maxHeight;
        return (React.createElement(Resources, { key: key, group: getGroupData(key, groups), resourceNode: resourceNode, maxHeight: maxHeight }));
    });
    var eventElements = objectMap(groupsWithNodes, function (_a, key) {
        var elements = _a.elements, maxHeight = _a.maxHeight;
        return (React.createElement(EventElementsGroup, { key: key, maxHeight: maxHeight, children: elements, viewSize: viewSize }));
    });
    useEffect(function () {
        if (dateWrapperRef && dateWrapperRef.current) {
            var firstChild = dateWrapperRef.current.children[0];
            var height = firstChild.clientHeight;
            dateWrapperRef.current.style.height = height + "px";
            if (resourceWrapperRef && resourceWrapperRef.current)
                resourceWrapperRef.current.style.marginTop = height - 1 + "px";
        }
    }, []);
    return (React.createElement("div", { className: "timeline", style: {
            maxWidth: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            border: "1px solid #DDD",
        } },
        React.createElement("div", { ref: resourceWrapperRef, style: {
                width: resourceHeaderWidth + "px",
                position: "relative",
                flexGrow: 0,
                flexShrink: 0,
            } }, resourceElements),
        React.createElement("div", { style: {
                overflow: "scroll",
                maxWidth: "100%",
                position: "relative",
                flexGrow: 1,
            } },
            React.createElement(DateLines, { dates: range, lineItem: DateLine, viewSize: viewSize }),
            React.createElement("div", { ref: dateWrapperRef, style: {
                    width: viewSize.width,
                    position: "relative",
                    height: "5rem",
                } }, dateElements),
            eventElements)));
};
var DateLines = function (_a) {
    var dates = _a.dates, lineItem = _a.lineItem, viewSize = _a.viewSize;
    return (React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, dates.map(function (date) { return lineItem({ date: date, viewSize: viewSize }); })));
};
var DateLine = function (_a) {
    var date = _a.date, viewSize = _a.viewSize;
    var _b = getPosition({ start: date, end: dateFns.addDays(date, 1) }, viewSize), width = _b.width, left = _b.left;
    return (React.createElement("div", { style: {
            width: width + "px",
            display: "inline-flex",
            position: "absolute",
            left: left + "px",
            height: "100%",
            borderLeft: "1px solid #DDD",
            top: 0,
        } }));
};

exports.Timeline = Timeline;
