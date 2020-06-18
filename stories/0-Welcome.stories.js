import React from 'react';
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'Welcome',
  component: Welcome,
};

const Welcome = () => (
  <div>
    <h1>React Scrollable Timeline</h1>
    <div>
      A component for dynamic visualization of events.
    </div>
  </div>
)

export const ToStorybook = () => <Welcome />;

ToStorybook.story = {
  name: 'to Storybook',
};
