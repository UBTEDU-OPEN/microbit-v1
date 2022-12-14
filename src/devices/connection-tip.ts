import messages from '../messages';
import { tipImg } from './tip-img';

const hexUrl = 'https://eduoss.ubtrobot.com/ucode4/assets/ucode-microbit-1.1.0.hex';

function getDescription() {
  return `${messages.tipLine} <br/>
1. ${messages.stepFirst} <br/>
2. <a href="${hexUrl}">${messages.clickDownload}</a>${messages.stepSecond} <br/>
3. ${messages.stepThird} <br/>
4. ${messages.stepFourth} <br/>
`;
}

// 搜索界面提示信息
export const connectionTip = {
  type: 'markdown',
  data: `

<img src="${tipImg}" width="66%" />

<div style="display: flex; justify-content: center;">
<div style="text-align: left; margin-top: 0.75rem;" >
${getDescription()}
</div>
</div>
  `,
};
