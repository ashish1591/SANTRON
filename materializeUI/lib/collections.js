//code shared between client and server


// lastUpdateTime     - moment() 
// creationTime       - moment()
// itemName           - string
// itemNumber         - string
// itemMainCategory   - string
// productDescription - string
// productTitle       - string
// productPrice       - number
// itemSubCategory    - string
Items1 = new Mongo.Collection('items');


uniqueProductList=new Mongo.Collection('uniqueproductlist')
// var imageStore;

// imageStore = new FS.Store.GridFS("assetFiles", {
//   chunkSize: 1024 * 1024 * 50
// });

// assetFiles = new FS.Collection("assetFiles", {
//   stores: [imageStore]
// });

