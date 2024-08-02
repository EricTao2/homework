const baseUrl = 'https://365.kdocs.cn';
const endpoint = '/3rd/drive/api/v3/userinfo';

export function fetchUserInfo() {
  return fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 如果需要身份验证或其他自定义头，请在此添加
      // 'Authorization': 'Bearer your-token'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // 如果响应成功，解析为 JSON
      } else {
        throw new Error('请求失败：' + response.statusText);
      }
    })
    .catch((error) => {
      console.error('发生错误：', error); // 处理错误
      throw error;
    });
}
