export default {
  '*.{ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,md,mdx,css,scss,html,yml,yaml,mjs,js}': ['prettier --write'],
  'package.json': ['prettier --write'],
}
