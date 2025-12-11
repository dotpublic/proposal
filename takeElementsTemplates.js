// this is just an example of a script that takes the elements components templates and
// puts them into a consumer node application
// use a similar script to take the elements components templates from node_modules 

// do a npm run elements:templates in the root of this application, this command will run this script and make elements templates available to this node app for use.

import path from 'path';
import fsj from 'fs-jetpack';
import createDebug from 'debug';
import { fileURLToPath } from 'url';

const debug = createDebug(process.env.DEBUG || '');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ELEMENTS_PACKAGE_PATH = path.join(__dirname, 'node_modules', '@springernature', 'elements', 'components');
const VIEWS_PATH = path.join(__dirname, 'src/templates', 'partials');

const _generateFolderPath = (p) => {
  const components = p.split('/');
  const lastComponent = components[components.length - 1];
  return lastComponent === 'partials' ? `${components[components.length - 2]}/${lastComponent}` : lastComponent;
};

const _getPartials = (src) => {
  const partials = fsj.find(src, { matching: '*.hbs' });
  if (!partials.length) {
    debug(`⛔ Templates not found in ${src}`);
    process.exit(1);
  }
  return partials;
};

const _generatePartialObj = (acc, partial) => {
  const fileName = path.basename(partial); // Extracts the file name
  const folderName = _generateFolderPath(path.dirname(partial)); // Extracts the folder name
  const partialName = fileName.split('.')[0];
  const partialContent = fsj.read(partial);

  acc[partialName] = { folderName, partialContent };
  return acc;
};

const _replacePartialPath = (partialsObj, env) => (match, partial) => {
	const [partialName, ...rest] = partial.split(' ');
	if (
		partial === '(lookup . \'template\')' ||
		partial === '@partial-block' ||
		partial === '(lookup . \'cartTemplate\')' ||
		partial === '(lookup . \'snidTemplate\')'
	) {
		return match;
	}
	const { folderName } = partialsObj[partialName];
	return `{{> ${env}/${folderName}/${partialName} ${rest.join(' ')}}}`;
};

const movePartials = (src, dest) => {
  const env = path.basename(dest);
  const partials = _getPartials(src);
  const partialsObj = partials.reduce(_generatePartialObj, {});

  Object.keys(partialsObj).forEach((partialName) => {
    const { folderName, partialContent } = partialsObj[partialName];
    const partialTemplate = partialContent.replace(/{{>\s*([^}]+)}}/g, _replacePartialPath(partialsObj, env));

    const partialPath = path.join(dest, folderName, `${partialName}.hbs`);
    fsj.write(partialPath, partialTemplate);
    debug(`✅ Partials moved in ${partialPath}`);
  });
};

movePartials(ELEMENTS_PACKAGE_PATH, path.join(VIEWS_PATH, 'elements-components-templates'));