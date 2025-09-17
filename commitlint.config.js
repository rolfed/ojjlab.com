module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Require Jira ticket reference in commit message
    'references-empty': [2, 'never'],
    // Custom rule to enforce Jira ticket format (e.g., PROJ-123)
    'subject-case': [2, 'always', 'sentence-case'],
    // Allow longer subject lines for detailed descriptions
    'subject-max-length': [2, 'always', 100],
    // Custom pattern for Jira tickets
    'header-pattern': [
      2,
      'always',
      /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+ \[(PROJ|DEV|TASK)-\d+\]$/
    ]
  },
  plugins: [
    {
      rules: {
        'header-pattern': ({ header }) => {
          const pattern = /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+ \[(PROJ|DEV|TASK)-\d+\]$/;
          return [
            pattern.test(header),
            'Commit message must include Jira ticket reference in format: type: description [PROJ-123]'
          ];
        }
      }
    }
  ]
};