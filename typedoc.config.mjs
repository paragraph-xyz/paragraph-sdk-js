/** @type {import('typedoc').TypeDocOptions} */
export default {
  // Only document the generated SDK surface:
  entryPoints: [
    'src/index.ts',
    //'src/generated/api.ts',
    //'src/generated/models/**/*.ts'
  ],

  // Use the Markdown theme from the plugin
  plugin: ['typedoc-plugin-markdown'],
  theme: 'markdown',

  // Send output to your existing folder, but as .md
  out: 'docs-markdown',
  fileExtension: '.md',

  // Make README.md the landing page AND append the API index to it
  readme: 'README.md',
  mergeReadme: true,
  entryFileName: 'README',

  // (Optional) keep module list in a predictable file
  modulesFileName: 'modules',
}
