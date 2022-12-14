/*
 * @Description: 积木块菜单
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-11-23 16:54:58
 */
import { MicroBitButtons, MicroBitGestures, MicroBitTiltDirection } from './constants';
import messages from './messages';

export const buttonsMenu = [
  {
    text: 'A',
    value: MicroBitButtons.A,
  },
  {
    text: 'B',
    value: MicroBitButtons.B,
  },
  {
    text: messages.any,
    value: MicroBitButtons.ANY,
  },
];

export const gesturesMenu = [
  {
    text: messages.moved,
    value: MicroBitGestures.MOVED,
  },
  {
    text: messages.shaken,
    value: MicroBitGestures.SHAKEN,
  },
  {
    text: messages.jumped,
    value: MicroBitGestures.JUMPED,
  },
];

export const tiltDirectionMenu = [
  {
    text: messages.front,
    value: MicroBitTiltDirection.FRONT,
  },
  {
    text: messages.back,
    value: MicroBitTiltDirection.BACK,
  },
  {
    text: messages.left,
    value: MicroBitTiltDirection.LEFT,
  },
  {
    text: messages.right,
    value: MicroBitTiltDirection.RIGHT,
  },
];

export const tiltDirectionAnyMenu = [
  ...tiltDirectionMenu,
  {
    text: messages.any,
    value: MicroBitTiltDirection.ANY,
  },
];
