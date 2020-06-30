export interface EventBase {
    start: Date;
    end: Date;
}
export interface Event extends EventBase {
    id: string | number;
    title: string;
}
export interface RenderedEvent extends Event {
    positionFromTop: number;
}
