# react-scrollable-timeline

demo (https://tinystuff.github.io/react-scrollable-timeline/storybook-static/)

```sh
npm install react-scrollable-timeline
```

```javascript
const events = [{
    start: Date,
    end: Date,
    groupId: 'groupId',
    title: 'eventtitle'
}];

<Timeline
    events={events}
    groups={groups}
    groupKey={"groupId"}
  />
```

## Props

```javascript
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
```