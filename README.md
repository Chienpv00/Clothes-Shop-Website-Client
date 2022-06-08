//Initialize with new project

1. npm i customize-cra react-app-rewired -D
2. Create file named config-overrides.js
   /* eslint-disable react-hooks/rules-of-hooks */
   const { override, useBabelRc } = require('customize-cra')

module.exports = override(
useBabelRc()
)

3. Replace "react-scripts" with "react-app-rewired" in scripts at package.json
4. npm i --save-dev babel-plugin-module-resolver
5. Create file named .babelrc
   {
   "plugins": [
   ["module-resolver", {
   "alias": {
   "~": "./src"
   }
   }]
   ]
   }
6. Create file named jsconfig.json
   {
   "compilerOptions": {
   "baseUrl": ".",
   "paths": {
   "~/*": ["src/*"]
   }
   }
   }
7. Create file named .prettierrc
8. Create file named .vscode/settings.json
   {
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
9. npm i -D sass
10. npm i --save normalize.css
11. npm i classnames
