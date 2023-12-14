import { UCodeLinkAPI } from '@ubtech/ucode-extension-common-sdk';
import { MicrobitExtension } from './block';
import ProtocolRegister from './devices/register';

const { injectRpcClient } = UCodeLinkAPI;

// 初始化通信模块
injectRpcClient();

// 插件注册信息
self.UCode.extensions.register({
  DeviceRegister: ProtocolRegister, // 注册蓝牙通信
  BlockRegister: MicrobitExtension, // 注册插件类
}); // 向插件系统注册
