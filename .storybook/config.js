import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => {
      console.log(filename)
      return req(filename)}
      );
}

configure(loadStories, module);