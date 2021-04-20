module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'fix', //修补bug
        'perf',
        'style', // 格式（不影响代码运行的变动）
        'docs', //文档（documentation）
        'test', // 增加测试
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'build',
        'ci',
        'chore', // 构建过程或辅助工具的变动
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
}
