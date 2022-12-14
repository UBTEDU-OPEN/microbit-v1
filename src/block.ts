/*
 * @Description: micro:bit hex: https://eduoss.ubtrobot.com/ucode4/assets/ucode-microbit-1.1.0.hex
 * @Create by:  bright.lin@ubtrobot.com
 * @LastEditors: bright.lin
 * @LastEditTime: 2022-11-29 10:35:56
 */
import { CommonUtility } from '@ubtech/ucode-extension-common-sdk';
import type { UCodeExternalHardwareDefinition } from '@ubtech/ucode-extension-common-sdk/types';
import { MicroBitButtons, MicroBitGestures, MicroBitTiltDirection } from './constants';
import { buttonsMenu, gesturesMenu, tiltDirectionMenu, tiltDirectionAnyMenu } from './menus';
import MicroBit, { BLECommand } from './microbit';
import messages from './messages';

const { Cast } = CommonUtility;

/**
 * micro:bit积木块插件
 */
export class MicrobitExtension {
  getInfo(): UCodeExternalHardwareDefinition.GetInfo | UCodeExternalHardwareDefinition.GetInfo[] {
    return {
      name: 'micro:bit', // 插件名，在toolbox侧边栏展示
      blocks: [
        // 插件积木块列表
        {
          opcode: 'whenButtonPressed',
          text: messages.whenButtonPressed,
          blockType: self.UCode.BlockType.HAT,
          isEdgeActivated: true,
          arguments: {
            BTN: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'buttons',
              defaultValue: MicroBitButtons.A,
            },
          },
        },
        {
          opcode: 'isButtonPressed',
          text: messages.isButtonPressed,
          blockType: self.UCode.BlockType.BOOLEAN,
          arguments: {
            BTN: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'buttons',
              defaultValue: MicroBitButtons.A,
            },
          },
        },
        '---',
        {
          opcode: 'whenGesture',
          text: messages.whenGesture,
          blockType: self.UCode.BlockType.HAT,
          isEdgeActivated: true,
          arguments: {
            GESTURE: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'gestures',
              defaultValue: MicroBitGestures.MOVED,
            },
          },
        },
        '---',
        {
          opcode: 'displaySymbol',
          text: messages.displaySymbol,
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            MATRIX: {
              type: self.UCode.ArgumentType.MATRIX,
              defaultValue: '0101010101100010101000100',
            },
          },
        },
        {
          opcode: 'displayText',
          text: messages.displayText,
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'micro:bit',
            },
          },
        },
        {
          opcode: 'displayClear',
          text: messages.displayClear,
          blockType: self.UCode.BlockType.COMMAND,
        },
        '---',
        {
          opcode: 'whenTilted',
          text: messages.whenTilted,
          blockType: self.UCode.BlockType.HAT,
          isEdgeActivated: true,
          arguments: {
            DIRECTION: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'tiltDirectionAny',
              defaultValue: MicroBitTiltDirection.ANY,
            },
          },
        },
        {
          opcode: 'isTilted',
          text: messages.isTilted,
          blockType: self.UCode.BlockType.BOOLEAN,
          arguments: {
            DIRECTION: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'tiltDirectionAny',
              defaultValue: MicroBitTiltDirection.ANY,
            },
          },
        },
        {
          opcode: 'getTiltAngle',
          text: messages.getTiltAngle,
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            DIRECTION: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'tiltDirection',
              defaultValue: MicroBitTiltDirection.FRONT,
            },
          },
        },
        '---',
        {
          opcode: 'whenPinConnected',
          text: messages.whenPinConnected,
          blockType: self.UCode.BlockType.HAT,
          isEdgeActivated: true,
          arguments: {
            PIN: {
              type: self.UCode.ArgumentType.STRING,
              menu: 'touchPins',
              defaultValue: '0',
            },
          },
        },
      ],
      menus: {
        // 插件积木块依赖的下拉菜单
        buttons: {
          acceptReporters: false,
          items: buttonsMenu,
        },
        gestures: {
          acceptReporters: false,
          items: gesturesMenu,
        },
        tiltDirection: {
          acceptReporters: false,
          items: tiltDirectionMenu,
        },
        tiltDirectionAny: {
          acceptReporters: false,
          items: tiltDirectionAnyMenu,
        },
        touchPins: {
          acceptReporters: false,
          items: ['0', '1', '2'],
        },
      },
    };
  }

  whenButtonPressed(args: { BTN: string }, util: { targetId: string }) {
    // 与 getInfo中，blocks对应block的opcode或func字段同名。
    const device = MicroBit.getInstance(util.targetId);
    if (args.BTN === 'any') {
      return device.buttonA || device.buttonB;
    } else if (args.BTN === 'A') {
      return device.buttonA;
    } else if (args.BTN === 'B') {
      return device.buttonB;
    }
    return false;
  }

  isButtonPressed(args: { BTN: string }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    if (device.isConnected()) {
      // 检查连接，未连接时有Toast提示
      if (args.BTN === 'any') {
        return device.buttonA || device.buttonB;
      }
      if (args.BTN === 'A') {
        return device.buttonA;
      }
      if (args.BTN === 'B') {
        return device.buttonB;
      }
    }
  }

  whenGesture(args: { GESTURE: string }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    const gesture = Cast.toString(args.GESTURE);
    if (gesture === 'moved') {
      return (device.gestureState >> 2) & 1;
    }
    if (gesture === 'shaken') {
      return device.gestureState & 1;
    }
    if (gesture === 'jumped') {
      return (device.gestureState >> 1) & 1;
    }
    return false;
  }

  displaySymbol(args: { MATRIX: string }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    if (device.isConnected()) {
      const symbol = Cast.toString(args.MATRIX).replace(/\s/g, '');
      const reducer = (accumulator: string, c: string, index: number) => {
        const value = c === '0' ? accumulator : accumulator + 2 ** index;
        return value;
      };
      const hex: any = symbol.split('').reduce(reducer, 0);
      if (hex !== null) {
        const ledMatrixState = new Uint8Array(5);
        ledMatrixState[0] = hex & 0x1f;
        ledMatrixState[1] = (hex >> 5) & 0x1f;
        ledMatrixState[2] = (hex >> 10) & 0x1f;
        ledMatrixState[3] = (hex >> 15) & 0x1f;
        ledMatrixState[4] = (hex >> 20) & 0x1f;
        device.send(BLECommand.CMD_DISPLAY_LED, ledMatrixState);
      }
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    }
  }

  displayText(args: { TEXT: string }, util: { targetId: string }) {
    const text = String(args.TEXT).substring(0, 19);
    const device = MicroBit.getInstance(util.targetId);
    if (device.isConnected()) {
      if (text.length > 0) device.displayText(text);
      const yieldDelay = 120 * (6 * text.length + 6);

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, yieldDelay);
      });
    }
  }

  displayClear(args: any, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    if (device.isConnected()) {
      const ledMatrixState = new Uint8Array([0, 0, 0, 0, 0]);
      device.send(BLECommand.CMD_DISPLAY_LED, ledMatrixState);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    }
  }

  whenTilted(args: { DIRECTION: keyof typeof MicroBitTiltDirection }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    return device.isTilted(args.DIRECTION);
  }

  isTilted(args: { DIRECTION: keyof typeof MicroBitTiltDirection }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    if (device.isConnected()) {
      return device.isTilted(args.DIRECTION);
    }
  }

  getTiltAngle(args: { DIRECTION: keyof typeof MicroBitTiltDirection }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    if (device.isConnected()) {
      return device.getTiltAngle(args.DIRECTION);
    }
  }

  whenPinConnected(args: { PIN: string }, util: { targetId: string }) {
    const device = MicroBit.getInstance(util.targetId);
    const pin = parseInt(args.PIN, 10);
    if (isNaN(pin)) return false;
    if (pin < 0 || pin > 2) return false;
    return device.touchPins[pin];
  }
}
