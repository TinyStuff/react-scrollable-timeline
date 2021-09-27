import { Event, RenderedEvent, EventBase } from './model';
export declare const dateSort: (a: EventBase, b: EventBase) => number;
export declare const groupBy: <T>(arr: T[], criteria: (x: T) => any) => {};
export declare const objectMap: (data: any, cb: any) => any[];
export declare const getCollitions: (evt: Event, allEvents: RenderedEvent[]) => RenderedEvent[];
export declare const getPosition: (evt: EventBase, { startTime, ratio }: {
    startTime: any;
    ratio: any;
}) => {
    width: number;
    left: number;
};
