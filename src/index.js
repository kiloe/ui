import DOM from './utils/dom';
import CSS from './utils/css';
import viewport from './utils/viewport';
import {defaultTheme,ThemeManager} from './utils/themeManager';


export default {
  viewport: viewport,
  render: DOM.render,
  renderComponentCSS: CSS.render,
  theme: defaultTheme,
  ThemeManager: ThemeManager,
};

