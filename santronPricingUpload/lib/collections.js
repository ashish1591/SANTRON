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
Items1 = new Ground.Collection('items');


// Items.attachSchema(new SimpleSchema({
// 									  itemName: {
// 									    type: String,
// 									    label: "Name",
// 									    max: 200
// 									  },
// 									  itemNumber: {
// 									    type: String,
// 									    label: "Number",
// 									    max: 200
// 									  },
// 									  itemMainCategory: {
// 									    type: String,
// 									    label: "Category"
// 									  } ,
// 									  itemSubCategory: {
// 									    type: String,
// 									    label: "Sub Category"
// 									  },
// 									  productPrice: {
// 									    type: Number,
// 									    label: "Price",
// 									    decimal:true
// 									  },
// 									  productTitle: {
// 									    type: String,
// 									    label: "Title"
// 									  },
// 									  lastUpdateTime: {
// 									    type: Date,
// 									    optional: true,
// 									    autoform:{ 
// 												    value: new Date(),
// 												    type: "hidden" 
// 												}
// 									  },  
// 									  creationTime: {
// 									    type: Date,
// 									    optional: true,
// 									    autoform:{ 
// 												    value: new Date(),
// 												    type: "hidden" 
// 												}
// 									  },
// 									  productDescription: {
// 									    type: String,
// 									    label: "Description",
// 									    optional: true,
// 									    max: 1000,
// 									    autoform:{ 
// 												    rows:5
// 												}
// 									  },
// 									}));


TabularTables = {};
if(Meteor.isClient){
   Template.registerHelper('TabularTables',  TabularTables); 
}
TabularTables.ItemDetails = new Tabular.Table({
  name: "ItemList",
  collection: Items1,
  columns: [
    {data: "title", title: "productTitle"},
    {data: "itemName", title: "itemName"},
    {data: "productDescription", title: "productDescription"}
  ]
});
