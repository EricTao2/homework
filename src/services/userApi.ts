const baseUrl = 'https://365.kdocs.cn';
const endpoint = '/3rd/drive/api/v3/userinfo';

export function fetchUserInfo() {
  console.log('fetchUserInfo API');
  return fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 如果需要身份验证或其他自定义头，请在此添加
      // 'Authorization': 'Bearer your-token'
      cookie:
        'weboffice_device_id=cfcbd6650b7a475650cf42e1c02df74b; weboffice_cdn=21; wps_endcloud=1; userInNewLayout=true; xsr-diffversion=3; appcdn=volcengine-kdocs-cache.wpscdn.cn; lang=zh-CN; Hm_lvt_cb2fa0997df4ff8e739c666ee2487fd9=1721057472,1721209822,1722696215,1722696395; swi_acc_redirect_limit=0; lang=zh-CN; visitorid=1638309824; region=hw; csrf=CCxzzJP7ChHDWXTJ2mGt8NfbakFXYJeb; wpsua=V1BTVUEvMS4wICh3ZWIta2RvY3M6Q2hyb21lXzEyMi4wLjAuMDsgd2luZG93czpXaW5kb3dzIDEwLjA7IE9hTUwzX3VIUUl5TWJZNFh1N2xJeHc9PTpRMmh5YjIxbElDQXhNakl1TUM0d0xqQT0pIENocm9tZS8xMjIuMC4wLjA=; userid=1606716157; env=prod_rc; wps_sid=V02SG6xEflHN-kGDeQr5_3qKnT1tNEU00a0af9ff005fc48afd'
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
