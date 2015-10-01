import React from 'react';
import IconView from '../IconView';

export default class OfflinePinIcon extends IconView {
  getSVG(){return <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24" height="24"><defs><path id="a" d="M0 0h24v24H0V0z"/></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible"/></clipPath><path clipPath="url(#b)" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"/></svg>;}
};