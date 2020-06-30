var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.css";
import "./styles.scss";
import { addDays, startOfDay } from "date-fns";
import { Timeline } from "./Timeline";
function generateEvents(numberOfEvents) {
    var baseDate, i, startAdd, eventLength;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseDate = new Date();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < numberOfEvents)) return [3 /*break*/, 4];
                startAdd = Math.floor(Math.random() * 55);
                eventLength = Math.ceil(Math.random() * 5);
                return [4 /*yield*/, {
                        id: i,
                        start: startOfDay(addDays(baseDate, startAdd)),
                        end: startOfDay(addDays(baseDate, startAdd + eventLength)),
                        groupId: Math.round(Math.random() * 2),
                        title: "Event " + i,
                    }];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
var groups = {
    "1": { title: "Group 1" },
    "2": { title: "Group 2" },
    "3": { title: "Group 3" },
    "4": { title: "Group 4" },
    "5": { title: "Group 5" },
    "0": { title: "Group 0" },
};
var GroupItem = function (_a) {
    var title = _a.group.title;
    return React.createElement("div", null,
        "sklep ",
        title);
};
//const events = Array.from(generateEvents(50));
var eventSource = [{ "id": 0, "start": "2020-07-18T22:00:00.000Z", "end": "2020-07-20T22:00:00.000Z", "groupId": 1, "title": "Event 0" }, { "id": 1, "start": "2020-06-26T22:00:00.000Z", "end": "2020-07-01T22:00:00.000Z", "groupId": 1, "title": "Event 1" }, { "id": 2, "start": "2020-07-09T22:00:00.000Z", "end": "2020-07-11T22:00:00.000Z", "groupId": 2, "title": "Event 2" }, { "id": 3, "start": "2020-06-15T22:00:00.000Z", "end": "2020-06-17T22:00:00.000Z", "groupId": 2, "title": "Event 3" }, { "id": 4, "start": "2020-07-14T22:00:00.000Z", "end": "2020-07-15T22:00:00.000Z", "groupId": 2, "title": "Event 4" }, { "id": 5, "start": "2020-07-10T22:00:00.000Z", "end": "2020-07-11T22:00:00.000Z", "groupId": 1, "title": "Event 5" }, { "id": 6, "start": "2020-06-29T22:00:00.000Z", "end": "2020-06-30T22:00:00.000Z", "groupId": 1, "title": "Event 6" }, { "id": 7, "start": "2020-06-24T22:00:00.000Z", "end": "2020-06-29T22:00:00.000Z", "groupId": 1, "title": "Event 7" }, { "id": 8, "start": "2020-07-15T22:00:00.000Z", "end": "2020-07-16T22:00:00.000Z", "groupId": 2, "title": "Event 8" }, { "id": 9, "start": "2020-07-04T22:00:00.000Z", "end": "2020-07-06T22:00:00.000Z", "groupId": 0, "title": "Event 9" }, { "id": 10, "start": "2020-06-14T22:00:00.000Z", "end": "2020-06-18T22:00:00.000Z", "groupId": 2, "title": "Event 10" }, { "id": 11, "start": "2020-07-07T22:00:00.000Z", "end": "2020-07-11T22:00:00.000Z", "groupId": 0, "title": "Event 11" }, { "id": 12, "start": "2020-07-30T22:00:00.000Z", "end": "2020-08-01T22:00:00.000Z", "groupId": 1, "title": "Event 12" }, { "id": 13, "start": "2020-07-24T22:00:00.000Z", "end": "2020-07-26T22:00:00.000Z", "groupId": 1, "title": "Event 13" }, { "id": 14, "start": "2020-08-07T22:00:00.000Z", "end": "2020-08-10T22:00:00.000Z", "groupId": 2, "title": "Event 14" }, { "id": 15, "start": "2020-07-12T22:00:00.000Z", "end": "2020-07-17T22:00:00.000Z", "groupId": 1, "title": "Event 15" }, { "id": 16, "start": "2020-08-07T22:00:00.000Z", "end": "2020-08-08T22:00:00.000Z", "groupId": 2, "title": "Event 16" }, { "id": 17, "start": "2020-07-22T22:00:00.000Z", "end": "2020-07-24T22:00:00.000Z", "groupId": 2, "title": "Event 17" }, { "id": 18, "start": "2020-06-30T22:00:00.000Z", "end": "2020-07-02T22:00:00.000Z", "groupId": 1, "title": "Event 18" }, { "id": 19, "start": "2020-07-04T22:00:00.000Z", "end": "2020-07-05T22:00:00.000Z", "groupId": 1, "title": "Event 19" }, { "id": 20, "start": "2020-07-06T22:00:00.000Z", "end": "2020-07-08T22:00:00.000Z", "groupId": 1, "title": "Event 20" }, { "id": 21, "start": "2020-06-26T22:00:00.000Z", "end": "2020-06-27T22:00:00.000Z", "groupId": 1, "title": "Event 21" }, { "id": 22, "start": "2020-06-18T22:00:00.000Z", "end": "2020-06-23T22:00:00.000Z", "groupId": 0, "title": "Event 22" }, { "id": 23, "start": "2020-08-05T22:00:00.000Z", "end": "2020-08-06T22:00:00.000Z", "groupId": 1, "title": "Event 23" }, { "id": 24, "start": "2020-07-03T22:00:00.000Z", "end": "2020-07-06T22:00:00.000Z", "groupId": 1, "title": "Event 24" }, { "id": 25, "start": "2020-06-22T22:00:00.000Z", "end": "2020-06-27T22:00:00.000Z", "groupId": 1, "title": "Event 25" }, { "id": 26, "start": "2020-07-26T22:00:00.000Z", "end": "2020-07-30T22:00:00.000Z", "groupId": 2, "title": "Event 26" }, { "id": 27, "start": "2020-07-05T22:00:00.000Z", "end": "2020-07-07T22:00:00.000Z", "groupId": 2, "title": "Event 27" }, { "id": 28, "start": "2020-08-02T22:00:00.000Z", "end": "2020-08-04T22:00:00.000Z", "groupId": 1, "title": "Event 28" }, { "id": 29, "start": "2020-06-22T22:00:00.000Z", "end": "2020-06-25T22:00:00.000Z", "groupId": 1, "title": "Event 29" }, { "id": 30, "start": "2020-07-23T22:00:00.000Z", "end": "2020-07-24T22:00:00.000Z", "groupId": 0, "title": "Event 30" }, { "id": 31, "start": "2020-07-16T22:00:00.000Z", "end": "2020-07-20T22:00:00.000Z", "groupId": 0, "title": "Event 31" }, { "id": 32, "start": "2020-07-07T22:00:00.000Z", "end": "2020-07-12T22:00:00.000Z", "groupId": 2, "title": "Event 32" }, { "id": 33, "start": "2020-07-10T22:00:00.000Z", "end": "2020-07-15T22:00:00.000Z", "groupId": 0, "title": "Event 33" }, { "id": 34, "start": "2020-07-11T22:00:00.000Z", "end": "2020-07-15T22:00:00.000Z", "groupId": 1, "title": "Event 34" }, { "id": 35, "start": "2020-06-14T22:00:00.000Z", "end": "2020-06-16T22:00:00.000Z", "groupId": 2, "title": "Event 35" }, { "id": 36, "start": "2020-06-28T22:00:00.000Z", "end": "2020-06-29T22:00:00.000Z", "groupId": 1, "title": "Event 36" }, { "id": 37, "start": "2020-06-25T22:00:00.000Z", "end": "2020-06-28T22:00:00.000Z", "groupId": 2, "title": "Event 37" }, { "id": 38, "start": "2020-07-12T22:00:00.000Z", "end": "2020-07-17T22:00:00.000Z", "groupId": 0, "title": "Event 38" }, { "id": 39, "start": "2020-06-29T22:00:00.000Z", "end": "2020-07-02T22:00:00.000Z", "groupId": 1, "title": "Event 39" }, { "id": 40, "start": "2020-06-24T22:00:00.000Z", "end": "2020-06-26T22:00:00.000Z", "groupId": 0, "title": "Event 40" }, { "id": 41, "start": "2020-06-29T22:00:00.000Z", "end": "2020-07-03T22:00:00.000Z", "groupId": 1, "title": "Event 41" }, { "id": 42, "start": "2020-07-21T22:00:00.000Z", "end": "2020-07-23T22:00:00.000Z", "groupId": 2, "title": "Event 42" }, { "id": 43, "start": "2020-07-01T22:00:00.000Z", "end": "2020-07-06T22:00:00.000Z", "groupId": 1, "title": "Event 43" }, { "id": 44, "start": "2020-06-26T22:00:00.000Z", "end": "2020-07-01T22:00:00.000Z", "groupId": 1, "title": "Event 44" }, { "id": 45, "start": "2020-06-28T22:00:00.000Z", "end": "2020-06-29T22:00:00.000Z", "groupId": 0, "title": "Event 45" }, { "id": 46, "start": "2020-06-24T22:00:00.000Z", "end": "2020-06-29T22:00:00.000Z", "groupId": 1, "title": "Event 46" }, { "id": 47, "start": "2020-07-03T22:00:00.000Z", "end": "2020-07-04T22:00:00.000Z", "groupId": 2, "title": "Event 47" }, { "id": 48, "start": "2020-08-03T22:00:00.000Z", "end": "2020-08-08T22:00:00.000Z", "groupId": 2, "title": "Event 48" }, { "id": 49, "start": "2020-06-28T22:00:00.000Z", "end": "2020-07-01T22:00:00.000Z", "groupId": 2, "title": "Event 49" }];
//const eventSource = [{"id":2,"start":"2020-07-09T22:00:00.000Z","end":"2020-07-11T22:00:00.000Z","groupId":2,"title":"Event 2"},{"id":3,"start":"2020-06-15T22:00:00.000Z","end":"2020-06-17T22:00:00.000Z","groupId":2,"title":"Event 3"},{"id":4,"start":"2020-07-14T22:00:00.000Z","end":"2020-07-15T22:00:00.000Z","groupId":2,"title":"Event 4"},{"id":8,"start":"2020-07-15T22:00:00.000Z","end":"2020-07-16T22:00:00.000Z","groupId":2,"title":"Event 8"},{"id":10,"start":"2020-06-14T22:00:00.000Z","end":"2020-06-18T22:00:00.000Z","groupId":2,"title":"Event 10"},{"id":14,"start":"2020-08-07T22:00:00.000Z","end":"2020-08-10T22:00:00.000Z","groupId":2,"title":"Event 14"},{"id":16,"start":"2020-08-07T22:00:00.000Z","end":"2020-08-08T22:00:00.000Z","groupId":2,"title":"Event 16"},{"id":17,"start":"2020-07-22T22:00:00.000Z","end":"2020-07-24T22:00:00.000Z","groupId":2,"title":"Event 17"},{"id":26,"start":"2020-07-26T22:00:00.000Z","end":"2020-07-30T22:00:00.000Z","groupId":2,"title":"Event 26"},{"id":27,"start":"2020-07-05T22:00:00.000Z","end":"2020-07-07T22:00:00.000Z","groupId":2,"title":"Event 27"},{"id":32,"start":"2020-07-07T22:00:00.000Z","end":"2020-07-12T22:00:00.000Z","groupId":2,"title":"Event 32"},{"id":35,"start":"2020-06-14T22:00:00.000Z","end":"2020-06-16T22:00:00.000Z","groupId":2,"title":"Event 35"},{"id":37,"start":"2020-06-25T22:00:00.000Z","end":"2020-06-28T22:00:00.000Z","groupId":2,"title":"Event 37"},{"id":42,"start":"2020-07-21T22:00:00.000Z","end":"2020-07-23T22:00:00.000Z","groupId":2,"title":"Event 42"},{"id":47,"start":"2020-07-03T22:00:00.000Z","end":"2020-07-04T22:00:00.000Z","groupId":2,"title":"Event 47"},{"id":48,"start":"2020-08-03T22:00:00.000Z","end":"2020-08-08T22:00:00.000Z","groupId":2,"title":"Event 48"},{"id":49,"start":"2020-06-28T22:00:00.000Z","end":"2020-07-01T22:00:00.000Z","groupId":2,"title":"Event 49"}];
var events = eventSource.map(function (event) { return (__assign(__assign({}, event), { start: new Date(event.start), end: new Date(event.end) })); });
//console.log(JSON.stringify(events.filter(d=>d.groupId==2)));
ReactDOM.render(React.createElement(Timeline, { events: events, groups: groups, groupKey: "groupId", resourceNode: GroupItem }), document.body);
//# sourceMappingURL=index.js.map