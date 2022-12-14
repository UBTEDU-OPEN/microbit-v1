/*
 * @Description: microbit协议
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-11-23 16:32:50
 */
import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';
import type { CommonBleDataType } from '@ubtech/ucode-extension-common-sdk/extension-common/src/protocol/ble';

const { WebBleProtocol } = CommonProtocols.BLE;

type SensorType = {
  tiltX: number;
  tiltY: number;
  buttonA: number;
  buttonB: number;
  touchPins: [number, number, number];
  gestureState: number;
  ledMatrixState: Uint8Array;
};

type GestureType = {
  // 姿态数据
  moving: boolean;
  move: {
    active: boolean;
    timeout: boolean;
  };
  shake: {
    active: boolean;
    timeout: boolean;
  };
  jump: {
    active: boolean;
    timeout: boolean;
  };
};

export class MicrobitBleConnection extends WebBleProtocol {
  sensors?: SensorType;

  gestures?: GestureType;

  dataDisposable?: { dispose: () => void };

  /**
   * 发送消息
   * @param command 协议指令
   * @param message 协议数据
   */
  sendMsg(command: number, message: Uint8Array) {
    const messageBuf = Buffer.allocUnsafe(message.length + 1);
    messageBuf.fill(0);
    messageBuf[0] = command;
    for (let i = 0; i < message.length; i++) {
      messageBuf[i + 1] = message[i];
    }
    this.send(messageBuf); // 父类方法
  }

  /**
   * 连接成功后，重置缓存数据状态
   */
  afterConnect(): Promise<void> {
    this.sensors = {
      // 部分传感器数据
      tiltX: 0,
      tiltY: 0,
      buttonA: 0,
      buttonB: 0,
      touchPins: [0, 0, 0],
      gestureState: 0,
      ledMatrixState: new Uint8Array(5),
    };
    this.gestures = {
      // 姿态数据
      moving: false,
      move: {
        active: false,
        timeout: false,
      },
      shake: {
        active: false,
        timeout: false,
      },
      jump: {
        active: false,
        timeout: false,
      },
    };
    this.dataDisposable = this.onData(this.onMessage);
    return Promise.resolve();
  }

  /**
   * 断开连接前，清除数据监听器
   */
  beforeDisconnect() {
    this.dataDisposable?.dispose();
    return Promise.resolve();
  }

  /**
   * 接收到micro:bit发来的消息
   * @param {*} args
   */
  onMessage = (args: CommonBleDataType) => {
    const data = new Uint8Array(args.data);

    if (this.sensors) {
      this.sensors.tiltX = data[1] | (data[0] << 8);
      if (this.sensors.tiltX > 1 << 15) this.sensors.tiltX -= 1 << 16;

      this.sensors.tiltY = data[3] | (data[2] << 8);
      if (this.sensors.tiltY > 1 << 15) this.sensors.tiltY -= 1 << 16;

      // 解构数组数据
      [
        ,
        ,
        ,
        ,
        this.sensors.buttonA, // data[4]
        this.sensors.buttonB,
        this.sensors.touchPins[0],
        this.sensors.touchPins[1],
        this.sensors.touchPins[2],
        this.sensors.gestureState,
      ] = data;
    }
  };
}
