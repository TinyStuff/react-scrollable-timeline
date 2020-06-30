import React from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Timeline } from "../src/Timeline";
import { addDays, startOfDay } from "date-fns";

const groups = {
  "1": { title: "Group 1" },
  "2": { title: "Group 2" },
  "3": { title: "Group 3" },
  "4": { title: "Group 4" },
  "5": { title: "Group 5" },
  "0": { title: "Group 0" },
};

function* generateEvents(numberOfEvents: number) {
  var baseDate = new Date();
  for (var i = 0; i < numberOfEvents; i++) {
    var startAdd = Math.floor(Math.random() * 55);
    var eventLength = Math.ceil(Math.random() * 5);
    yield {
      id: i,
      start: startOfDay(addDays(baseDate, startAdd)),
      end: startOfDay(addDays(baseDate, startAdd + eventLength)),
      groupId: Math.round(Math.random() * 2),
      title: "Event " + i,
    };
  }
}

const events = Array.from(generateEvents(50));

export default {
  title: 'Timeline',
  component: Timeline,
};

export const Simple = () => <Timeline
events={events}
groups={groups}
groupKey={"groupId"}
/>;

