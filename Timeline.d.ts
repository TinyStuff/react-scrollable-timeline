/// <reference types="react" />
import { Event } from "./model";
interface Groups {
    [key: string]: any;
}
interface TimeLineProps {
    events: Event[];
    groups?: Groups;
    groupKey?: string;
    startDate?: Date;
    endDate?: Date;
    width?: number;
    interval?: number;
    resourceHeaderWidth?: number;
    getGroupData?: any;
    resourceNode: any;
    itemNode?: any;
    dateNode?: any;
    onEventClick?: (Event: any) => void;
}
declare const Timeline: ({ groups, events, startDate, endDate, width, interval, resourceHeaderWidth, groupKey, getGroupData, resourceNode, itemNode, dateNode, onEventClick, }: TimeLineProps) => JSX.Element;
export { Timeline };
