module.exports = {
  'src/**/*.{js,jsx}': [
    'prettier --write',
    'eslint --fix --max-warnings=0'
  ],
  '*.json': 'prettier --write',
  "*.md": ["prettier --write", 'markdownlint']
}
