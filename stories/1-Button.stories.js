import React from "react";
import { withKnobs, object, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import { Timeline } from "../src/Timeline";
import { generateEvents } from "./codegen";

import "../src/styles.scss";

const events = Array.from(generateEvents(50));

const label = "Events";
const defaultValue = events;
const groupId = "GROUP-ID1";

export default {
  title: "Timeline",
  component: Timeline,
  decorators: [withKnobs],
};

export const Simple = () => (
  <Timeline events={object(label, defaultValue, groupId)} />
);

export const CustomInterval = () => (
  <Timeline
    events={object(label, defaultValue, groupId)}
    interval={1000 * 60 * 60 * 24 * 7}
  />
);

const groups = {
  "1": { title: "Group 1" },
  "2": { title: "Group 2" },
  "3": { title: "Group 3" },
  "4": { title: "Group 4" },
  "5": { title: "Group 5" },
  "0": { title: "Group 0" },
};

export const Grouped = () => (
  <Timeline
    events={object(label, defaultValue, groupId)}
    groups={groups}
    groupKey={"groupId"}
  />
);

const CustomEvent = ({ evt }) => {
  const { start, end } = evt;
  const diff = (end - start) / 1000000;
  let background = "green";

  if (diff > 100) {
    background = "cornflowerblue";
  }
  if (diff > 350) {
    background = "red";
  }

  return (
    <div
      className="react-scrollable-timeline-event"
      style={{ backgroundColor: background }}
    >
      {evt.title} {diff}
    </div>
  );
};

export const CustomEventRender = () => (
  <Timeline
    events={object(label, defaultValue, groupId)}
    itemNode={CustomEvent}
  />
);
