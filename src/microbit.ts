/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/*
 * @Description: microbit对象
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-11-29 10:40:15
 */
import { ExtensionUI } from '@ubtech/ucode-extension-common-sdk';
import type { CommonBleDataType } from '@ubtech/ucode-extension-common-sdk/extension-common/src/protocol/ble';
import type { MicrobitBleConnection } from './devices/ble-device';
import { MicroBitTiltDirection } from './constants';
import messages from './messages';

const { Toast } = ExtensionUI;

/**
 * Enum for micro:bit BLE command protocol.
 * https://github.com/LLK/scratch-microbit-firmware/blob/master/protocol.md
 * @readonly
 * @enum {number}
 */
export const BLECommand = {
  CMD_PIN_CONFIG: 0x80,
  CMD_DISPLAY_TEXT: 0x81,
  CMD_DISPLAY_LED: 0x82,
};

const TILT_THRESHOLD = 15;

/**
 * micro:bit对象，包含通信（device）、数据缓存、数据解析等。device与target绑定，通过targetId拿到device
 */
class MicroBit {
  private targetId: string;

  private static mInstance: MicroBit;

  constructor(targetId: string) {
    this.targetId = targetId;
  }

  /**
   * 做成单例模式
   * @param {*} targetId
   * @returns
   */
  static getInstance(targetId: string) {
    if (!MicroBit.mInstance) {
      MicroBit.mInstance = new MicroBit(targetId);
    }
    return MicroBit.mInstance;
  }

  getDevice(needToast = true): MicrobitBleConnection | undefined {
    // eslint-disable-next-line no-undef
    const device = window.UCode.extensions.getDevice<MicrobitBleConnection>(this.targetId);
    if (!device?.isConnected() && needToast) {
      Toast(messages.noConnected);
      return undefined;
    }
    // device?.onData(this.onReceiveMsg.bind(this));
    return device;
  }

  /**
   * 监听数据，可接收一问一答数据，也可接收自动上报的数据
   * @param {*} data
   */
  onReceiveMsg(data: CommonBleDataType) {
    // console.log('received from micro:bit :', data);
  }

  /**
   * 连接成功后，可以获取到protocol
   * @param {*} needToast
   * @returns
   */
  isConnected(needToast = true) {
    return this.getDevice(needToast)?.isConnected();
  }

  send(command: number, message: Uint8Array, timeout = 3000) {
    return new Promise((resolve, reject) => {
      // 获取通信设备对象
      const device = this.getDevice();
      if (device) {
        // 监听消息
        const { dispose } = device.onData((data: CommonBleDataType) => {
          if (timeoutDispose) {
            clearTimeout(timeoutDispose);
          }
          // 注销监听器
          dispose();
          resolve(data);
        });
        // 设置通信超时
        const timeoutDispose = setTimeout(() => {
          dispose?.();
          reject(new Error('timeout'));
        }, timeout);
        // 发送消息
        device?.sendMsg(command, message);
      } else {
        resolve('');
      }
    });
  }

  /**
   * 显示文本
   * @param {*} text
   * @returns
   */
  displayText(text: string) {
    const output = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      output[i] = text.charCodeAt(i);
    }
    return this.send(BLECommand.CMD_DISPLAY_TEXT, output);
  }

  /**
   * 显示点阵LED
   * @param {*} matrix
   * @returns
   */
  displayMatrix(matrix: Uint8Array) {
    return this.send(BLECommand.CMD_DISPLAY_LED, matrix);
  }

  /**
   * @return {number} - the latest value received for the tilt sensor's tilt about the X axis.
   */
  get tiltX() {
    const device = this.getDevice(false);
    return device?.sensors?.tiltX || 0;
  }

  /**
   * @return {number} - the latest value received for the tilt sensor's tilt about the Y axis.
   */
  get tiltY() {
    const device = this.getDevice(false);
    return device?.sensors?.tiltY || 0;
  }

  /**
   * @return {boolean} - the latest value received for the A button.
   */
  get buttonA() {
    const device = this.getDevice(false);
    return device?.sensors?.buttonA || false;
  }

  /**
   * @return {boolean} - the latest value received for the B button.
   */
  get buttonB() {
    const device = this.getDevice(false);
    return device?.sensors?.buttonB || false;
  }

  /**
   * @return {number} - the latest value received for the motion gesture states.
   */
  get gestureState() {
    const device = this.getDevice(false);
    return device?.sensors?.gestureState || 0;
  }

  /**
   * @return {Uint8Array} - the current state of the 5x5 LED matrix.
   */
  get ledMatrixState() {
    const device = this.getDevice(false);
    return device?.sensors?.ledMatrixState || [0, 0, 0, 0, 0];
  }

  get touchPins() {
    const device = this.getDevice(false);
    return device?.sensors?.touchPins || [0, 0, 0];
  }

  /**
   * 倾斜
   * @param {MicroBitTiltDirection} direction : 方向;
   * @returns
   */
  getTiltAngle(direction: keyof typeof MicroBitTiltDirection) {
    switch (direction) {
      case MicroBitTiltDirection.FRONT:
        return Math.round(this.tiltY / -10);
      case MicroBitTiltDirection.BACK:
        return Math.round(this.tiltY / 10);
      case MicroBitTiltDirection.LEFT:
        return Math.round(this.tiltX / -10);
      case MicroBitTiltDirection.RIGHT:
        return Math.round(this.tiltX / 10);
      default:
        console.warn(`Unknown tilt direction in _getTiltAngle: ${direction}`);
        return -100;
    }
  }

  /**
   * 倾斜
   * @param {MicroBitTiltDirection} direction : 方向;
   * @returns
   */
  isTilted(direction: keyof typeof MicroBitTiltDirection) {
    switch (direction) {
      case MicroBitTiltDirection.ANY:
        return Math.abs(this.tiltX / 10) >= TILT_THRESHOLD || Math.abs(this.tiltY / 10) >= TILT_THRESHOLD;
      default:
        return this.getTiltAngle(direction) >= TILT_THRESHOLD;
    }
  }
}

export default MicroBit;
