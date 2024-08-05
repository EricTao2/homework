// const pkg = require('./package.json');
const path = require('path');
const MY_DIST_PATH = path.resolve(__dirname, 'dist');
exports.groupName = '专业班健壮性专题考试2024'; // 可选，设置分组， 要求 Whistle 版本 >= v2.9.21
exports.name = `张巨芳`;
exports.rules = `
https://365.kdocs.cn/zhangjufang/dev/search/   http://localhost:5173/zhangjufang/dev/search/ 
$https://365.kdocs.cn/zhangjufang/prod/search/  ${MY_DIST_PATH}/index.html
https://365.kdocs.cn/zhangjufang/prod/search/  ${MY_DIST_PATH}
365.kdocs.cn resCookies://wps_sid=V02SG6xEflHN-kGDeQr5_3qKnT1tNEU00a0af9ff005fc48afd
`;
