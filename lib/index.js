import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'alert-relay',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/alert-relay.md',
  binFile: 'bin/cli.mjs',
  description: '检查告警链路：有没有告警、发到哪、有没有把敏感信息一起发出去',
  whenToUse: 'TODO：写清什么时候该用（用户会说的话也列上）',
});
