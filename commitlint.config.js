export default {
  extends: ['@commitlint/config-conventional'],

  plugins: [
    {
      rules: {
        'issue-number-format': parsed => {
          const { header } = parsed;

          if (!header) {
            return [false, '커밋 메시지가 비어 있습니다.'];
          }

          if (!/\(#\d+\)$/.test(header)) {
            return [
              false,
              '커밋 메시지 끝에 이슈번호가 필요합니다. 예: feat: 설정 추가(#2)',
            ];
          }

          if (/\s\(#\d+\)$/.test(header)) {
            return [
              false,
              '이슈번호 앞에는 공백을 둘 수 없습니다. 예: 설정 추가(#2)',
            ];
          }

          return [true];
        },
      },
    },
  ],

  rules: {
    'issue-number-format': [2, 'always'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
      ],
    ],
  },
};
