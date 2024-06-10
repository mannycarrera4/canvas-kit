const fs = require('fs');
const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'whole-source-loader-docusaurus',

    async loadContent() {
      // Read the file content
      const filePath = path.resolve(__dirname, options.filePath);
      const content = fs.readFileSync(filePath, 'utf-8');
      const raw = JSON.stringify(content)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
      const exportPattern =
        /export (?:default|const|var|function)(?: class)?(?: function)? ([^:\s<();]*)/;
      const exports = (content.match(new RegExp(exportPattern, 'g')) || [])
        .map(match => match.match(exportPattern)[1] || 'Example') // default export name to "Example"
        .filter(name => name.charAt(0).toUpperCase() === name.charAt(0))
        .filter((value, index, self) => self.indexOf(value) === index); // unique names only
      const rewriteExampleSource = content.includes('export default (')
        ? content.replace('export default (', 'const Example = (') + '\nexport default Example;'
        : content;
      // console.log('raw', raw);
      const fullrewrite = `${rewriteExampleSource}
      ${exports.map(name => `${name}.__RAW__ = ${raw};`).join('\n')}
      `;
      return fullrewrite;
      // return content;
    },

    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      // console.log('content', content);
      setGlobalData({fileContent: content});
      return content;
    },
  };
};

// const raw = JSON.stringify(source)
//   .replace(/\u2028/g, '\\u2028')
//   .replace(/\u2029/g, '\\u2029');

// const exports = extractExports(source);

// // rewrite out example files so that we can attach the __RAW__ property
// // This will rewrite this:
// //  export default () => <div />;
// // to this:
// //  const Example = () => <div />;
// //  export default Example;
// //  Example.__RAW__ = 'export default () => <div />;';
// // We do this so that the whole source code can be used in Storybook examples
// const rewriteExampleSource = source.includes('export default (')
//   ? source.replace('export default (', 'const Example = (') + '\nexport default Example;'
//   : source;

// return `${rewriteExampleSource}
// ${exports.map(name => `${name}.__RAW__ = ${raw};`).join('\n')}
// `;
