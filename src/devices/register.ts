/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';
import { MicrobitBleConnection } from './ble-device';
import { connectionTip } from './connection-tip';

const { getWebBleDeviceRegister, getUCodeBleDeviceRegister } = CommonProtocols.BLE;

const bleOption = {
  services: {
    serviceUUID: '0000f005-0000-1000-8000-00805f9b34fb', // ble 的服务 id
    characteristics: [
      {
        name: 'read',
        uuid: '5261da01-fa7e-42ab-850b-7c80220097cc', // notify 的特征id
        readable: true,
      },
      {
        name: 'write',
        uuid: '5261da02-fa7e-42ab-850b-7c80220097cc', // 写数据的特征id
      },
    ],
  },
  defaultWriteCharacteristicUUID: '5261da02-fa7e-42ab-850b-7c80220097cc', // 默认写的特征id
  filters: [{ namePrefix: 'BBC micro:bit' }], // 过滤字符，配置后发现设备时将只显示该字符开头的蓝牙设备
  queueOptions: {
    enable: true, // 数据发送是否启用队列
    interval: 150, // 启用队列时数据发送的间隔
  },
};

const ProtocolRegister: any[] = [];
/**
 * 蓝牙协议注册器。包含蓝牙服务、读写特征、名称过滤等
 */
const webBleRegister = getWebBleDeviceRegister({
  DeviceConnection: MicrobitBleConnection,
  Options: bleOption,
});

const ucodeBleRegister = getUCodeBleDeviceRegister({
  DeviceConnection: MicrobitBleConnection,
  Options: bleOption,
});

if ((navigator as any).bluetooth) {
  // 增加连接提示
  webBleRegister.DeviceType.tip = connectionTip;
  ProtocolRegister.push(webBleRegister);
} else {
  ucodeBleRegister.DeviceType.tip = connectionTip;
  ProtocolRegister.push(ucodeBleRegister);
}

export default ProtocolRegister;
