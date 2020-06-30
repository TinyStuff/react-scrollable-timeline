import * as React from "react";
const { useRef, useEffect } = React;
const { format, isToday, isPast, addDays, startOfDay } = require("date-fns");
import { Event, RenderedEvent, EventBase } from './model';
import { groupBy, objectMap, dateSort, getCollitions, getPosition } from "./utils";

const HEIGHT = 36;

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

interface DateRange extends EventBase {
  interval:number
}

const getNodesInRange = ({start, end, interval}:DateRange) => {
  const ret:EventBase[] = [];
  const startTime = start.getTime();
  const endTime = end.getTime();
  const steps = Math.ceil((endTime-startTime)/interval);
  for(var i =0;i<steps;i++) {
    ret.push({
      start:new Date(startTime+(interval*i)),
      end:new Date(startTime+(interval*(i+1)))
    });
  }
  return ret;
}

interface EventReducer {
  rendered: RenderedEvent[];
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
        overflow:'hidden',
        width,
      }}
    >
      {children}
    </div>
  );
};

const GroupNode = ({ group: { title } }) => <div>{title}</div>;

const DateNode = (date: EventBase) => <div>{format(date.start, "yyyy-MM-dd HH")}</div>;

const dateNodeWrapper = (dateNode, date: EventBase, position:any) => {
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

const extractGroupData = (groupKey, groups) => (groupKey && groups && groupKey && groups[groupKey]) ? groups[groupKey]: {title:groupKey||''};

interface Groups {
  [key: string]: any
}

interface TimeLineProps {
  events: Event[]
  groups?: Groups
  groupKey?: string
  startDate?: Date
  endDate?: Date
  width?: number
  interval?: number
  resourceHeaderWidth?: number
  getGroupData?: any
  resourceNode: any
  itemNode?: any
  dateNode?: any
  onEventClick?: (Event) => void
}

const Timeline = ({
  groups,
  events,
  startDate = startOfDay(new Date()),
  endDate = addDays(startOfDay(new Date()), 40),
  width = 5000,
  interval = 86400*500,
  resourceHeaderWidth = 200,
  groupKey,
  getGroupData = extractGroupData,
  resourceNode = GroupNode,
  itemNode = EventRow,
  dateNode = DateNode,
  onEventClick = (evt: any) => {},
}: TimeLineProps) => {
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

  const dateWrapperRef = useRef<HTMLDivElement>(null);
  const resourceWrapperRef = useRef<HTMLDivElement>(null);

  const position = (date) => getPosition(date, viewSize);
  const grouped = groupBy<Event>(events, (e) => groupKey ? e[groupKey] : 'single');
  const range = getNodesInRange({ start: startDate, end: endDate, interval });

  const dateElements = range.map(date => dateNodeWrapper(dateNode, date, position));

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
      {groupKey && <div
        ref={resourceWrapperRef}
        style={{
          width: `${resourceHeaderWidth}px`,
          position: "relative",
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        {resourceElements}
      </div>}
      <div
        style={{
          overflowX: "scroll",
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
  dates: EventBase[];
  lineItem: any;
  viewSize: any;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {dates.map((date) => lineItem({ date, viewSize }))}
  </div>
);

const DateLine = ({ date, viewSize }: { date: EventBase; viewSize: any }) => {
  const { width, left } = getPosition(
    date,
    viewSize
  );

  return (
    <div
      key={date.start.getTime()}
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
