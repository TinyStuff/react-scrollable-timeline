import * as React from "react";
const { useRef, useEffect } = React;
import { format, isToday, isPast, addDays, startOfDay } from "date-fns";
import { groupBy, objectMap, dateSort, getCollitions, getPosition } from "./utils";
const HEIGHT = 36;
const EventRow = ({ evt }) => {
    return (React.createElement("div", { key: evt.id, className: "timeline-event" }, evt.title ? evt.title : evt.id));
};
const getNodesInRange = ({ start, end, interval }) => {
    const ret = [];
    const startTime = start.getTime();
    const endTime = end.getTime();
    const steps = Math.ceil((endTime - startTime) / interval);
    for (var i = 0; i < steps; i++) {
        ret.push({
            start: new Date(startTime + (interval * i)),
            end: new Date(startTime + (interval * (i + 1)))
        });
    }
    return ret;
};
const eventReducer = (Elm, position, onEventClick) => ({ rendered = [], maxHeight = 0, elements = [] }, evt) => {
    const collisions = getCollitions(evt, rendered);
    let firstFreePosition = collisions.length;
    for (var i = 0; i < rendered.length + 1; i++) {
        if (!collisions.some((d) => d.positionFromTop == i)) {
            firstFreePosition = i;
            break;
        }
    }
    const top = firstFreePosition * HEIGHT;
    const node = (React.createElement("div", { key: evt.id, className: `timeline-event-wrapper ${onEventClick ? 'pointer' : ''}`, style: Object.assign(Object.assign({}, position(evt)), { height: HEIGHT, top }), onClick: () => onEventClick(evt) },
        React.createElement(Elm, { evt: evt })));
    return {
        elements: [...elements, node],
        maxHeight: Math.max(maxHeight || 0, top),
        rendered: [...rendered, Object.assign(Object.assign({}, evt), { positionFromTop: firstFreePosition })],
    };
};
const Resources = ({ group, maxHeight, resourceNode }) => {
    return (React.createElement("div", { style: {
            position: "relative",
            height: maxHeight + HEIGHT,
        } },
        React.createElement("div", { className: "resource-header", style: {
                height: maxHeight + HEIGHT,
            } }, resourceNode({ group }))));
};
const EventElementsGroup = ({ children, maxHeight, viewSize: { width } }) => {
    return (React.createElement("div", { className: "timeline-separator", style: {
            height: maxHeight + HEIGHT,
            overflow: 'hidden',
            width,
        } }, children));
};
const GroupNode = ({ group: { title } }) => React.createElement("div", null, title);
const DateNode = (date) => React.createElement("div", null, format(date.start, "yyyy-MM-dd HH"));
const dateNodeWrapper = (dateNode, date, position) => {
    const { width, left } = position(date);
    let cls = "is-future";
    switch (true) {
        default:
            cls = "is-future";
            break;
        case isToday(date.start):
            cls = "is-today";
            break;
        case isPast(date.start):
            cls = "is-past";
            break;
    }
    return (React.createElement("div", { style: {
            width: `${width}px`,
            position: "absolute",
            left: `${left}px`,
            top: 0,
        }, className: "timeline-date " + cls }, dateNode(date)));
};
const extractGroupData = (groupKey, groups) => (groups && groupKey && groups[groupKey]) ? groups[groupKey] : { title: groupKey };
const Timeline = ({ groups, events, startDate = startOfDay(new Date()), endDate = addDays(startOfDay(new Date()), 40), width = 5000, interval = 86400 * 500, resourceHeaderWidth = 200, groupKey, getGroupData = extractGroupData, resourceNode = GroupNode, itemNode = EventRow, dateNode = DateNode, onEventClick = (evt) => { }, }) => {
    const startTime = startDate.getTime();
    const totalTicks = endDate.getTime() - startTime;
    const viewSize = {
        startDate,
        startTime,
        endDate,
        totalTicks,
        ratio: width / totalTicks,
        width,
    };
    const dateWrapperRef = useRef(null);
    const resourceWrapperRef = useRef(null);
    const position = (date) => getPosition(date, viewSize);
    const grouped = groupBy(events, (e) => groupKey ? e[groupKey] : 'single');
    const range = getNodesInRange({ start: startDate, end: endDate, interval });
    const dateElements = range.map(date => dateNodeWrapper(dateNode, date, position));
    const groupsWithNodes = objectMap(grouped, (evts) => evts
        .sort(dateSort)
        .reduce(eventReducer(itemNode, position, onEventClick), {}));
    const resourceElements = groupsWithNodes.map(({ maxHeight, key }) => {
        return (React.createElement(Resources, { key: `resource-${key}`, group: getGroupData(key, groups), resourceNode: resourceNode, maxHeight: maxHeight }));
    });
    const eventElements = groupsWithNodes.map(({ elements, maxHeight, key }) => {
        return (React.createElement(EventElementsGroup, { key: `group-${key}`, maxHeight: maxHeight, children: elements, viewSize: viewSize }));
    });
    useEffect(() => {
        if (dateWrapperRef && dateWrapperRef.current) {
            const firstChild = dateWrapperRef.current.children[0];
            const height = firstChild.clientHeight;
            dateWrapperRef.current.style.height = `${height}px`;
            if (resourceWrapperRef && resourceWrapperRef.current)
                resourceWrapperRef.current.style.marginTop = `${height - 1}px`;
        }
    }, []);
    return (React.createElement("div", { className: "timeline", style: {
            maxWidth: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            border: "1px solid #DDD",
        } },
        groupKey && React.createElement("div", { ref: resourceWrapperRef, style: {
                width: `${resourceHeaderWidth}px`,
                position: "relative",
                flexGrow: 0,
                flexShrink: 0,
            } }, resourceElements),
        React.createElement("div", { style: {
                overflowX: "scroll",
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
const DateLines = ({ dates, lineItem, viewSize, }) => (React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, dates.map((date) => lineItem({ date, viewSize }))));
const DateLine = ({ date, viewSize }) => {
    const { width, left } = getPosition(date, viewSize);
    return (React.createElement("div", { key: date.start.getTime(), style: {
            width: `${width}px`,
            display: "inline-flex",
            position: "absolute",
            left: `${left}px`,
            height: "100%",
            borderLeft: "1px solid #DDD",
            top: 0,
        } }));
};
export { Timeline };
