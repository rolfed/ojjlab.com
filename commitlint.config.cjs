module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Custom rule to enforce Jira ticket format (e.g., PROJ-123)
    'subject-case': [2, 'always', 'sentence-case'],
    // Allow longer subject lines for detailed descriptions
    'subject-max-length': [2, 'always', 100],
    // Disable references-empty since we'll use header-pattern instead
    'references-empty': [0],
    // Custom pattern for Jira tickets in subject line
    'subject-full-stop': [0],
    'header-max-length': [2, 'always', 150],
  },
  plugins: [
    {
      rules: {
        'jira-ticket-in-subject': ({ subject }) => {
          const pattern = /\[(PROJ|DEV|TASK)-\d+\]$/;
          return [
            pattern.test(subject),
            'Subject must end with Jira ticket reference: [PROJ-123]',
          ];
        },
      },
    },
  ],
};
