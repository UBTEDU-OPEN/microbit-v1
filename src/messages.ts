const formatMessage = self.UCode.formatMessage;

export default {
  // ------------------------- blocks
  whenButtonPressed: formatMessage({
    id: 'block.whenButtonPressed',
    defaultMessage: '当按下 [BTN] 按钮',
  }),
  isButtonPressed: formatMessage({
    id: 'block.isButtonPressed',
    defaultMessage: '按下 [BTN] 按钮？',
  }),
  whenGesture: formatMessage({
    id: 'block.whenGesture',
    defaultMessage: '当被 [GESTURE]',
  }),
  displaySymbol: formatMessage({
    id: 'block.displaySymbol',
    defaultMessage: '显示 [MATRIX]',
  }),
  displayText: formatMessage({
    id: 'block.displayText',
    defaultMessage: '显示文本 [TEXT]',
  }),
  displayClear: formatMessage({
    id: 'block.displayClear',
    defaultMessage: '清空显示',
  }),
  whenTilted: formatMessage({
    id: 'block.whenTilted',
    defaultMessage: '当向 [DIRECTION] 倾斜',
  }),
  isTilted: formatMessage({
    id: 'block.isTilted',
    defaultMessage: '向 [DIRECTION] 倾斜?',
  }),
  getTiltAngle: formatMessage({
    id: 'block.getTiltAngle',
    defaultMessage: '向 [DIRECTION] 的倾斜角',
  }),
  whenPinConnected: formatMessage({
    id: 'block.whenPinConnected',
    defaultMessage: '当引脚 [PIN] 接地',
  }),

  // ------------------------- menus
  any: formatMessage({
    id: 'menus.any',
    defaultMessage: '任意',
  }),
  moved: formatMessage({
    id: 'menus.moved',
    defaultMessage: '移动',
  }),
  shaken: formatMessage({
    id: 'menus.shaken',
    defaultMessage: '摇晃',
  }),
  jumped: formatMessage({
    id: 'menus.jumped',
    defaultMessage: '抛起',
  }),
  front: formatMessage({
    id: 'menus.front',
    defaultMessage: '前',
  }),
  back: formatMessage({
    id: 'menus.back',
    defaultMessage: '后',
  }),
  left: formatMessage({
    id: 'menus.left',
    defaultMessage: '左',
  }),
  right: formatMessage({
    id: 'menus.right',
    defaultMessage: '右',
  }),

  // ------------------------- devices
  noConnected: formatMessage({
    id: 'device.noConnected',
    defaultMessage: '抱歉，您还没有连接设备',
  }),
  tipLine: formatMessage({
    id: 'device.tipLine',
    defaultMessage: '首次使用、无法正常搜索、无法正常连接时请尝试：',
  }),
  stepFirst: formatMessage({
    id: 'device.stepFirst',
    defaultMessage: '使用USB线缆连接micro:bit与电脑',
  }),
  clickDownload: formatMessage({
    id: 'device.clickDownload',
    defaultMessage: '点击这里',
  }),
  stepSecond: formatMessage({
    id: 'device.stepSecond',
    defaultMessage: '下载固件，并将固件写入到“MICROBIT”虚拟磁盘中',
  }),
  stepThird: formatMessage({
    id: 'device.stepThird',
    defaultMessage: '等待设备的固件更新完成(板载指示灯停止快闪）',
  }),
  stepFourth: formatMessage({
    id: 'device.stepFourth',
    defaultMessage: '再次尝试点击“搜索设备”按钮',
  }),

  // -------------------------
};
