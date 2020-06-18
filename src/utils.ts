import { Event, RenderedEvent, EventBase } from "./model";

export const dateSort = (a: EventBase, b: EventBase) => a.start.getTime() - b.start.getTime();

export const groupBy = function<T> (arr: T[], criteria: (x: T) => any) {
  return arr.reduce((obj, item) => {
    const key = criteria(item);
    return { ...obj, [key]: [...(obj[key] || []), item] };
  }, {});
};

export const objectMap = (data: any, cb: any) => {
  let ret: any[] = [];
  Object.keys(data).map((key) => {
    ret.push({
      ...cb(data[key], key),
      key:key
    });
  });
  return ret;
};

const timeStampMatch = (first: Event, second: Event) =>
  !(first.end <= second.start || first.start >= second.end);

export const getCollitions = (evt: Event, allEvents: RenderedEvent[]) => {
  const otherEvents = allEvents.filter((d) => d.id != evt.id);
  return otherEvents.filter((e: Event) => timeStampMatch(e, evt));
};

export const getPosition = (evt: EventBase, { startTime, ratio }) => {
  const timeStampLeft = evt.start.getTime() - startTime
  const timeStampRight = evt.end.getTime() - startTime;

  const left = Math.round(timeStampLeft * ratio);
  const right = Math.round(timeStampRight * ratio);

  return {
    width: right - left,
    left,
  };
};