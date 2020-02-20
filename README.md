# Cabify coding challenge

## Description
This challenge entails the development of a shopping cart UI with some basic functionality.

To implement it I have used React and I have decomposed my code into styled components.


## Prerequisites
[Node.js and npm should be installed globally.](https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/)
### Dependencies:
- [`npm`](https://www.npmjs.com/)
- [`react`](https://reactjs.org/)
- [`express`](https://expressjs.com/) : The app uses an express.js server to simulate an API call.
- [`styled-components`](https://styled-components.com/)

	#### Dev (testing):
	- [`jest-styled-components`](https://styled-components.com/docs/tooling#snapshot-testing)
	- [`enzyme`](https://airbnb.io/enzyme/)

## Installation:

- #### Clone the repo: 
	- Clone the [git repo for this app](https://github.com/marianalfr/cabify) from Ghitub (use `$ git clone https://github.com/marianalfr/cabify.git` on your terminal).
- #### or Download zip file:
	-  Download the zip version [from Github](https://github.com/marianalfr/cabify) using the 'clone or download' tab and unzip it in your local directory.
- Using the command line, in the repo directory, run `npm install` to install all dependencies.
- Start the express server to make data available from the backend. To do this, run `node server.js` on a new Terminal window/tab.
- To start the app in development mode run `npm start`. This will launch the app on your browser on port 3000. The page will reload after edits.
	**Note:** in order to keep both the app and the server running at the same time, use two separate Terminal tabs/windows. 

### File structure:

 ```
/ -- data···promoCodes.js			//promotional codes info
  |-- docs					//production folder
  |-- public					//contains HTML file
  |-- src -- components -- __test__		//test suites
  |	| 	      |···App.js		//main component
  |	| 	      |···OrderSummary.js	//price breakdown < App
  |	| 	      |···ProductItem.js		//list item < ProductList < ShoppingCart < App
  |	| 	      |···ProductList.js		//list component < App
  |	| 	      |···ProductModal.js		//modal component < ProductItem < ProductList < ShoppingCart < App 
  |	| 	      |···ShoppingCart.js		//product list < App
  |	| 	      |···setupTests.js		//testing 
  |	| 			  
  |	|-- images				//image folder
  |	|-- services ···PromosService.js		//data fetch
  |	| 
  |	|-- styles -- vendors			//normalize.css
  |	|	  |···map.css			//map styles  
  |	|	  |···theme.js			//styled components theme 
  |	|  
  |	|···index.js				//index component
  |	
  |···server.js					//express server
```


## Testing:
To run the tests use `npm test`. The included suites should pass if no code is changed.

## To create production bundle: 
Run `npm run build`. This will create a new folder called 'build' where the app is 'built' for production. It correctly bundles React in production mode and optimises the build for the best performance. The build is also minified and the filenames include the hashes.

**Note**: If it fails to minify please [see troubleshooting here](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).

**Note**: To use GitHub pages simply rename build to docs (`mv build docs`) and upload it to your master branch.

## create-react-app:
This app has been bootstrapped using `create-react-app`. This means all the features and scripts that come with `create-react-app` are still available.
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

· [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

· [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

· [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

· [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

· [Deployment](https://facebook.github.io/create-react-app/docs/deployment)

## Contributing
Issue tracker: [https://github.com/marianalfr/help-greta/issues](https://github.com/marianalfr/help-greta/issues)

## Licensing
### MIT License.
Copyright (c) 2020 Mariana Lerma.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Image credits:
Greta Thunberg's portrait by @crisvector. I edited the text to match the name of the app.

