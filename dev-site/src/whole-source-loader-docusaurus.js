const plugin = options => {
  const transformer = async (ast, vfile) => {
    console.log('vfile>>>', vfile.value);
    ast.children.unshift({
      type: 'text',
      value: `The current file path is ${vfile.path}`,
    });
  };
  return transformer;
};
export default plugin;
