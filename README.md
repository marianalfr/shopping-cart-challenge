# Cabify coding challenge

## Description
This challenge entails the development of a shopping cart UI with some basic functionality.

To implement it I have used React and I have split my code into styled components. 
On top of the basic requirements and the bonus points, I have added a couple of extra features:
- A highlight for proucts on offer. 
- Data persistance.
- A Promotional Code functionality that fetches data simulating an API call through an express.js server.
- Regression tests for each component (snapshots).

I have made the following assumptions to design the implementation:

- This shopping cart lives in a larger e-commerce app.
- The buyer does not need to log in, and chosen products have already been individually added to the cart (This would mean that all the information for each of them has been stored within the App state on user's click on 'add to cart', and that the order summary has been updated accordingly).
- At the moment of adding products to the cart, the buyer has also specified a certain amount for each of them. These are the default quantities the cart shows when starting the app.
- The products contain some basic data as well as information on the offers they currently have.
- The seller can easily edit product information like price, description, images... They are also able to design the offers for each product.
- The type of offers currently available are 'AxB', bulk % discounts and promotional codes. 
- Unless the seller wants to design additional types of offers, they should only need to edit products info for offers to be successfully applied on chekout.
- The promotional codes are stored in the seller's e-store database and server. The seller is also able to add/remove codes with ease. (I am mocking an API call to a database with a local express server. This means that for the promo code discount to work, the server must be running on a separate terminal window/tab by running `node server.js`).
- On clicking 'Checkout' the buyer would be taken to a different page to complete the buying process, so the order details should be available to collect from the component's state.
- Should the cart be empty, the Checkout button is disabled.


### Basic Requirements
- Decompose the markup in components or whatever suits you better to make it a production ready App.
- Implement the shopping cart logic with the following requisites:
    - Add/Remove product card items using the +/- buttons.
    - Calculate the totals of each product and the summary total accordingly.
    - All totals in order summary should be updated whenever a product is added or removed.

### Bonus
- Product Detail modal.
- Discounts: 
    - 2x1.
    - bulk.

### Extra (personal choice):
- Offer highlight on product list and product modal.
- Promotional Code functionality.
- Data persistance.
- API call to same origin backend with an express.js server. 
- Regression testing (snapshots).


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
  |	|	  |···cabify-base.css			//default css  
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
Issue tracker: [https://github.com/marianalfr/cabify/issues](https://github.com/marianalfr/cabify/issues)

## Licensing
### MIT License.
Copyright (c) 2020 Mariana Lerma.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

