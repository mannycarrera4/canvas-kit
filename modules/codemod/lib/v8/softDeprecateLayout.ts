import {API, FileInfo, Identifier, ImportDeclaration, Options} from 'jscodeshift';

const mainPackage = '@workday/canvas-kit-react';
const layoutPackage = '@workday/canvas-kit-react/layout';
const allImportNames = ['Layout', 'LayoutProps', 'Column', 'ColumnProps'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;

  const root = j(file.source);
  let hasLayoutImports = false;

  // This toggles the failsafe that prevents us from accidentally transforming something unintentionally.
  root.find(j.ImportDeclaration, (nodePath: ImportDeclaration) => {
    const value = nodePath.source.value;
    // If there's an import from the layout package, set the import boolean check to true
    if (value === layoutPackage) {
      hasLayoutImports = true;
      return false;
    }
    // If there's an import from the main package, check to see if Layout or LayoutProps are among the named imports
    // e.g. import {Layout} from '@workday/canvas-kit-react';
    if (value === mainPackage) {
      (nodePath.specifiers || []).forEach(specifier => {
        if (specifier.type === 'ImportSpecifier') {
          if (allImportNames.includes(specifier.imported.name)) {
            hasLayoutImports = true;
          }
        }
      });
    }
    return false;
  });

  // Failsafe to skip transforms unless a Layout import is detected
  if (!hasLayoutImports) {
    return root.toSource();
  }

  root
    .find(j.ImportDeclaration, {
      source: {value: (value: string) => value.includes(mainPackage)},
    })
    .forEach(nodePath => {
      nodePath.value.specifiers?.forEach(specifier => {
        if (specifier.type === 'ImportSpecifier') {
          //  Adds Deprecated part to a import name for Layout, LayoutProps, Column, ColumnProps
          if (allImportNames.includes(specifier.imported.name)) {
            specifier.imported.name = `Deprecated${specifier.imported.name}`;
          }
        }
        return specifier;
      });
    });

  // Add Deprecated in menu types and type interfaces
  const typeNames = ['LayoutProps', 'ColumnProps'];
  root
    .find(j.TSTypeReference, {
      typeName: {
        type: 'Identifier',
        name: (name: string) => typeNames.includes(name),
      },
    })
    .forEach(nodePath => {
      const identifier = nodePath.value.typeName as Identifier;
      identifier.name = `Deprecated${identifier.name}`;
    });

  // Add Deprecated to all interface names
  root.find(j.TSInterfaceDeclaration).forEach(nodePath => {
    // If the interface is extending menu interfaces it should add Deprecated to them
    nodePath.node.extends?.forEach(typeExtension => {
      if (
        typeExtension.expression.type === 'Identifier' &&
        typeNames.includes(typeExtension.expression.name)
      ) {
        typeExtension.expression.name = `Deprecated${typeExtension.expression.name}`;
      }
    });
  });

  // Transform Layout and LayoutItem JSXElements
  // e.g. `<Layout>` becomes `<DeprecatedLayout>`
  // e.g. `<Column>` becomes `<DeprecatedColumn>`
  root
    .find(j.JSXIdentifier, {name: (name: string) => name === 'Layout' || name === 'Column'})
    .forEach(nodePath => {
      if (nodePath.name !== 'property') {
        nodePath.node.name = `Deprecated${nodePath.node.name}`;
      }
    });

  return root.toSource();
}
