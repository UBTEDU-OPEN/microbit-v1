const fs = require('fs');
const base64Img = require('base64-img');

// 将图片压缩到代码中，加快显示速度。
base64Img.base64('static/microbit-connect.png', function (err, data) {
  if (!err) {
    const content = `// 连接提示图片数据。(此文件为编译自动生成，请勿手动修改！)
export const tipImg =
  '${data}';
`;
    fs.writeFileSync('src/devices/tip-img.ts', content);
  } else {
    console.log(err);
  }
});
