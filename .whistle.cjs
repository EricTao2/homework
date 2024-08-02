// const pkg = require('./package.json');
const path = require('path');
const MY_DIST_PATH = path.resolve(__dirname, 'dist');
exports.groupName = '专业班工程专题考试2024'; // 可选，设置分组， 要求 Whistle 版本 >= v2.9.21
exports.name = `张巨芳`;
exports.rules = `
https://www.kdocs.cn/zhangjufang1/dev/search/   http://localhost:5173/zhangjufang1/dev/search/ 
$https://www.kdocs.cn/zhangjufang1/prod/search/  ${MY_DIST_PATH}/index.html
https://www.kdocs.cn/zhangjufang1/prod/search/  ${MY_DIST_PATH}
`;
