import React from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Timeline } from "../src/Timeline";

const groups = {
  "1": { title: "Group 1" },
  "2": { title: "Group 2" },
  "3": { title: "Group 3" },
  "4": { title: "Group 4" },
  "5": { title: "Group 5" },
  "0": { title: "Group 0" },
};

const eventSource = [{"id":0,"start":"2020-07-18T22:00:00.000Z","end":"2020-07-20T22:00:00.000Z","groupId":1,"title":"Event 0"},{"id":1,"start":"2020-06-26T22:00:00.000Z","end":"2020-07-01T22:00:00.000Z","groupId":1,"title":"Event 1"},{"id":2,"start":"2020-07-09T22:00:00.000Z","end":"2020-07-11T22:00:00.000Z","groupId":2,"title":"Event 2"},{"id":3,"start":"2020-06-15T22:00:00.000Z","end":"2020-06-17T22:00:00.000Z","groupId":2,"title":"Event 3"},{"id":4,"start":"2020-07-14T22:00:00.000Z","end":"2020-07-15T22:00:00.000Z","groupId":2,"title":"Event 4"},{"id":5,"start":"2020-07-10T22:00:00.000Z","end":"2020-07-11T22:00:00.000Z","groupId":1,"title":"Event 5"},{"id":6,"start":"2020-06-29T22:00:00.000Z","end":"2020-06-30T22:00:00.000Z","groupId":1,"title":"Event 6"},{"id":7,"start":"2020-06-24T22:00:00.000Z","end":"2020-06-29T22:00:00.000Z","groupId":1,"title":"Event 7"},{"id":8,"start":"2020-07-15T22:00:00.000Z","end":"2020-07-16T22:00:00.000Z","groupId":2,"title":"Event 8"},{"id":9,"start":"2020-07-04T22:00:00.000Z","end":"2020-07-06T22:00:00.000Z","groupId":0,"title":"Event 9"},{"id":10,"start":"2020-06-14T22:00:00.000Z","end":"2020-06-18T22:00:00.000Z","groupId":2,"title":"Event 10"},{"id":11,"start":"2020-07-07T22:00:00.000Z","end":"2020-07-11T22:00:00.000Z","groupId":0,"title":"Event 11"},{"id":12,"start":"2020-07-30T22:00:00.000Z","end":"2020-08-01T22:00:00.000Z","groupId":1,"title":"Event 12"},{"id":13,"start":"2020-07-24T22:00:00.000Z","end":"2020-07-26T22:00:00.000Z","groupId":1,"title":"Event 13"},{"id":14,"start":"2020-08-07T22:00:00.000Z","end":"2020-08-10T22:00:00.000Z","groupId":2,"title":"Event 14"},{"id":15,"start":"2020-07-12T22:00:00.000Z","end":"2020-07-17T22:00:00.000Z","groupId":1,"title":"Event 15"},{"id":16,"start":"2020-08-07T22:00:00.000Z","end":"2020-08-08T22:00:00.000Z","groupId":2,"title":"Event 16"},{"id":17,"start":"2020-07-22T22:00:00.000Z","end":"2020-07-24T22:00:00.000Z","groupId":2,"title":"Event 17"},{"id":18,"start":"2020-06-30T22:00:00.000Z","end":"2020-07-02T22:00:00.000Z","groupId":1,"title":"Event 18"},{"id":19,"start":"2020-07-04T22:00:00.000Z","end":"2020-07-05T22:00:00.000Z","groupId":1,"title":"Event 19"},{"id":20,"start":"2020-07-06T22:00:00.000Z","end":"2020-07-08T22:00:00.000Z","groupId":1,"title":"Event 20"},{"id":21,"start":"2020-06-26T22:00:00.000Z","end":"2020-06-27T22:00:00.000Z","groupId":1,"title":"Event 21"},{"id":22,"start":"2020-06-18T22:00:00.000Z","end":"2020-06-23T22:00:00.000Z","groupId":0,"title":"Event 22"},{"id":23,"start":"2020-08-05T22:00:00.000Z","end":"2020-08-06T22:00:00.000Z","groupId":1,"title":"Event 23"},{"id":24,"start":"2020-07-03T22:00:00.000Z","end":"2020-07-06T22:00:00.000Z","groupId":1,"title":"Event 24"},{"id":25,"start":"2020-06-22T22:00:00.000Z","end":"2020-06-27T22:00:00.000Z","groupId":1,"title":"Event 25"},{"id":26,"start":"2020-07-26T22:00:00.000Z","end":"2020-07-30T22:00:00.000Z","groupId":2,"title":"Event 26"},{"id":27,"start":"2020-07-05T22:00:00.000Z","end":"2020-07-07T22:00:00.000Z","groupId":2,"title":"Event 27"},{"id":28,"start":"2020-08-02T22:00:00.000Z","end":"2020-08-04T22:00:00.000Z","groupId":1,"title":"Event 28"},{"id":29,"start":"2020-06-22T22:00:00.000Z","end":"2020-06-25T22:00:00.000Z","groupId":1,"title":"Event 29"},{"id":30,"start":"2020-07-23T22:00:00.000Z","end":"2020-07-24T22:00:00.000Z","groupId":0,"title":"Event 30"},{"id":31,"start":"2020-07-16T22:00:00.000Z","end":"2020-07-20T22:00:00.000Z","groupId":0,"title":"Event 31"},{"id":32,"start":"2020-07-07T22:00:00.000Z","end":"2020-07-12T22:00:00.000Z","groupId":2,"title":"Event 32"},{"id":33,"start":"2020-07-10T22:00:00.000Z","end":"2020-07-15T22:00:00.000Z","groupId":0,"title":"Event 33"},{"id":34,"start":"2020-07-11T22:00:00.000Z","end":"2020-07-15T22:00:00.000Z","groupId":1,"title":"Event 34"},{"id":35,"start":"2020-06-14T22:00:00.000Z","end":"2020-06-16T22:00:00.000Z","groupId":2,"title":"Event 35"},{"id":36,"start":"2020-06-28T22:00:00.000Z","end":"2020-06-29T22:00:00.000Z","groupId":1,"title":"Event 36"},{"id":37,"start":"2020-06-25T22:00:00.000Z","end":"2020-06-28T22:00:00.000Z","groupId":2,"title":"Event 37"},{"id":38,"start":"2020-07-12T22:00:00.000Z","end":"2020-07-17T22:00:00.000Z","groupId":0,"title":"Event 38"},{"id":39,"start":"2020-06-29T22:00:00.000Z","end":"2020-07-02T22:00:00.000Z","groupId":1,"title":"Event 39"},{"id":40,"start":"2020-06-24T22:00:00.000Z","end":"2020-06-26T22:00:00.000Z","groupId":0,"title":"Event 40"},{"id":41,"start":"2020-06-29T22:00:00.000Z","end":"2020-07-03T22:00:00.000Z","groupId":1,"title":"Event 41"},{"id":42,"start":"2020-07-21T22:00:00.000Z","end":"2020-07-23T22:00:00.000Z","groupId":2,"title":"Event 42"},{"id":43,"start":"2020-07-01T22:00:00.000Z","end":"2020-07-06T22:00:00.000Z","groupId":1,"title":"Event 43"},{"id":44,"start":"2020-06-26T22:00:00.000Z","end":"2020-07-01T22:00:00.000Z","groupId":1,"title":"Event 44"},{"id":45,"start":"2020-06-28T22:00:00.000Z","end":"2020-06-29T22:00:00.000Z","groupId":0,"title":"Event 45"},{"id":46,"start":"2020-06-24T22:00:00.000Z","end":"2020-06-29T22:00:00.000Z","groupId":1,"title":"Event 46"},{"id":47,"start":"2020-07-03T22:00:00.000Z","end":"2020-07-04T22:00:00.000Z","groupId":2,"title":"Event 47"},{"id":48,"start":"2020-08-03T22:00:00.000Z","end":"2020-08-08T22:00:00.000Z","groupId":2,"title":"Event 48"},{"id":49,"start":"2020-06-28T22:00:00.000Z","end":"2020-07-01T22:00:00.000Z","groupId":2,"title":"Event 49"}];

const events = eventSource.map(event => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end)
}));


export default {
  title: 'Timeline',
  component: Timeline,
};

export const Simple = () => <Timeline
events={events}
groups={groups}
groupKey={"groupId"}
resourceNode={GroupItem}
/>;

