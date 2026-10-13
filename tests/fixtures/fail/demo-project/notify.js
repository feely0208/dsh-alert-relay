// 违规：告警带敏感信息 + 明文 webhook + 把带 token 的 URL 打进日志
const hookUrl = 'http://oapi.dingtalk.com/robot/send?access_token=abc123';
async function alertUser(err, req) {
  await post(hookUrl, { text: err.stack + JSON.stringify(req.body) });
  console.log('alert sent to ' + webhookUrl);
}
