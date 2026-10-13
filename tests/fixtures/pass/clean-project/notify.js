// 合规：只发摘要 + trace id；https；不打印 URL
const hookUrl = process.env.ALERT_WEBHOOK_URL; // https
async function alertUser(traceId, level) {
  await post(hookUrl, { text: `[${level}] trace=${traceId} 详见内部面板` });
  logger.info('alert sent trace=' + traceId);
}
