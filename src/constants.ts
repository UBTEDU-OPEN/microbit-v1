/*
 * @Description: 常量
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: Bright Lin
 * @LastEditTime: 2022-04-14 15:12:02
 */
export const MicroBitButtons = {
  A: 'A',
  B: 'B',
  ANY: 'any',
};

/**
 * Enum for tilt sensor direction.
 * @readonly
 * @enum {string}
 */
export const MicroBitTiltDirection = {
  FRONT: 'front',
  BACK: 'back',
  LEFT: 'left',
  RIGHT: 'right',
  ANY: 'any',
};

/**
 * Enum for micro:bit gestures.
 * @readonly
 * @enum {string}
 */
export const MicroBitGestures = {
  MOVED: 'moved',
  SHAKEN: 'shaken',
  JUMPED: 'jumped',
};
