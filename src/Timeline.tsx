import * as React from "react";
const { useRef, useEffect } = React;
import { eachDayOfInterval, format, isToday, isPast, subDays,addDays } from "date-fns";
import { Event } from './model';
import { groupBy, objectMap, dateSort } from "./utils";

const HEIGHT = 36;


export const timeStampMatch = (first: Event, second: Event) =>
  !(first.end <= second.start || first.start >= second.end);

const getCollitions = (evt: Event, allEvents: RenderdEvent[]) => {
  const otherEvents = allEvents.filter((d) => d.id != evt.id);
  const filterFunc = (e: Event) => timeStampMatch(e, evt);

  return otherEvents.filter(filterFunc);
};

const getPosition = (evt, { startDate, ratio }) => {
  const timeStampLeft = evt.start.getTime() - startDate.getTime();
  const timeStampRight = evt.end.getTime() - startDate.getTime();

  const left = Math.round(timeStampLeft * ratio);
  const right = Math.round(timeStampRight * ratio);
  return {
    width: right - left,
    left,
  };
};


const EventRow = ({ evt }) => {
  return (
    <div
      key={evt.id}
      className="timeline-event"
    >
      {evt.title?evt.title:evt.id}
    </div>
  );
};

interface RenderdEvent extends Event {
  positionFromTop: number;
}

interface EventReducer {
  rendered: RenderdEvent[];
  maxHeight: number;
  elements: any[];
}

const eventReducer = (Elm, position, onEventClick) => (
  { rendered = [], maxHeight = 0, elements = [] }: EventReducer,
  evt
) => {
  const collisions = getCollitions(evt, rendered);
  let firstFreePosition = collisions.length;

  for (var i = 0; i < rendered.length + 1; i++) {
    if (!collisions.some((d) => d.positionFromTop == i)) {
      firstFreePosition = i;
      break;
    }
  }
  const top = firstFreePosition * HEIGHT;
  const node = (
    <div
      key={evt.id}
      className={`timeline-event-wrapper ${onEventClick ? 'pointer' : ''}`}
      style={{
        ...position(evt),
        height: HEIGHT,
        top,
      }}
      onClick={() => onEventClick(evt)}
    >
      <Elm evt={evt} />
    </div>
  );
  return {
    elements: [...elements, node],
    maxHeight: Math.max(maxHeight || 0, top),
    rendered: [...rendered, { ...evt, positionFromTop: firstFreePosition }],
  };
};

const Resources = ({ group, maxHeight, resourceNode }) => {
  return (
    <div
      style={{
        position: "relative",
        height: maxHeight + HEIGHT,
      }}
    >
      <div
        className="resource-header"
        style={{
          height: maxHeight + HEIGHT,
        }}
      >
        {resourceNode({ group })}
      </div>
      {/* {elements} */}
    </div>
  );
};

const EventElementsGroup = ({ children, maxHeight, viewSize: { width } }) => {
  return (
    <div
      className="timeline-separator"
      style={{
        height: maxHeight + HEIGHT,
        width,
      }}
    >
      {children}
    </div>
  );
};

const GroupNode = ({ group: { title } }) => <div>{title}</div>;

const DateNode = (date: Date) => <div>{format(date, "yyyy-MM-dd")}</div>;

const dateNodeWrapper = (dateNode, date: Date, viewSize) => {
  const { width, left } = getPosition(
    { start: date, end: addDays(date, 1) },
    viewSize
  );

  let cls = "is-future";

  switch (true) {
    default:
      cls = "is-future";
      break;
    case isToday(date):
      cls = "is-today";
      break;
    case isPast(date):
      cls = "is-past";
      break;
  }

  return (
    <div
      style={{
        width: `${width}px`,
        position: "absolute",
        left: `${left}px`,
        top: 0,
      }}
      className={"timeline-date " + cls}
    >
      {dateNode(date)}
    </div>
  );
};

const extractGroupData = (groupKey, groups) => (groups && groupKey && groups[groupKey]) ? groups[groupKey]: {title:groupKey};

const Timeline = ({
  groups,
  events,
  startDate = subDays(new Date(), 1),
  endDate = addDays(new Date(), 60),
  width = 5000,
  resourceHeaderWidth = 200,
  groupKey,
  getGroupData = extractGroupData,
  resourceNode = GroupNode,
  itemNode = EventRow,
  dateNode = DateNode,
  onEventClick = (evt: any) => {},
}) => {
  const totalTicks = endDate.getTime() - startDate.getTime();
  const viewSize = {
    startDate,
    endDate,
    totalTicks,
    ratio: width / totalTicks,
    width,
  };

  const dateWrapperRef = useRef<HTMLDivElement>(null);
  const resourceWrapperRef = useRef<HTMLDivElement>(null);

  const position = (date) => getPosition(date, viewSize);
  const grouped = groupBy<Event>(events, (e) => groupKey ? e[groupKey] : 'single');
  const range = eachDayOfInterval({ start: startDate, end: endDate });

  const dateElements = range.map((date: Date) =>
    dateNodeWrapper(dateNode, date, viewSize)
  );

  const groupsWithNodes = objectMap(grouped, (evts: any) =>
    evts
      .sort(dateSort)
      .reduce(eventReducer(itemNode, position, onEventClick), {})
  );

  const resourceElements = groupsWithNodes.map(({ maxHeight,key }) => {
    return (
      <Resources
        key={`resource-${key}`}
        group={getGroupData(key, groups)}
        resourceNode={resourceNode}
        maxHeight={maxHeight}
      />
    );
  });

  const eventElements = groupsWithNodes.map(({ elements, maxHeight, key }) => {
      return (
        <EventElementsGroup
          key={`group-${key}`}
          maxHeight={maxHeight}
          children={elements}
          viewSize={viewSize}
        />
      );
    }
  );

  console.log(eventElements);

  useEffect(() => {
    if (dateWrapperRef && dateWrapperRef.current) {
      const firstChild = dateWrapperRef.current.children[0];
      const height = firstChild.clientHeight;
      dateWrapperRef.current.style.height = `${height}px`;
      if (resourceWrapperRef && resourceWrapperRef.current)
        resourceWrapperRef.current.style.marginTop = `${height - 1}px`;
    }
  }, []);

  return (
    <div
      className={"timeline"}
      style={{
        maxWidth: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        border: "1px solid #DDD",
      }}
    >
      <div
        ref={resourceWrapperRef}
        style={{
          width: `${resourceHeaderWidth}px`,
          position: "relative",
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        {resourceElements}
      </div>
      <div
        style={{
          overflow: "scroll",
          maxWidth: "100%",
          position: "relative",
          flexGrow: 1,
        }}
      >
        <DateLines dates={range} lineItem={DateLine} viewSize={viewSize} />

        <div
          ref={dateWrapperRef}
          style={{
            width: viewSize.width,
            position: "relative",
            height: "5rem",
          }}
        >
          {dateElements}
        </div>
        {eventElements}
      </div>
    </div>
  );
};

const DateLines = ({
  dates,
  lineItem,
  viewSize,
}: {
  dates: Date[];
  lineItem: any;
  viewSize: any;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {dates.map((date) => lineItem({ date, viewSize }))}
  </div>
);

const DateLine = ({ date, viewSize }: { date: Date; viewSize: any }) => {
  const { width, left } = getPosition(
    { start: date, end: addDays(date, 1) },
    viewSize
  );

  return (
    <div
      key={date.getTime()}
      style={{
        width: `${width}px`,
        display: "inline-flex",
        position: "absolute",
        left: `${left}px`,
        height: "100%",
        borderLeft: "1px solid #DDD",
        top: 0,
      }}
    />
  );
};

export { Timeline };
