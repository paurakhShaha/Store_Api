const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
 
  
const products = await Product.find({}).select('name price').skip(1).limit(10); // skip(1) to skip the first product
  res.status(200).json({products , nbHits: products.length});

}
const getAllProducts =  async (req, res,next) => {
  const {featured , company, name ,sort ,fields,limit ,numericFilter} = req.query;

  const numToShow = Number(limit) || 10;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company ;
  }
  if (name) {
    queryObject.name =  {$regex : name , $options : 'i'};  // i for case insensetive;
  }
  

  //sort for products
  let result = Product.find(queryObject);
  if(sort){
    const shortList = sort.split(',').join(' ');
    result = result.sort(shortList);
  }
  else{
    result = result.sort('createdAt');
  }


  //fields for products
  if(fields){
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
    console.log(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const skip = (page -1) * numToShow;
  // for page 1 page = 1 - 1 = 0 * 10 = 0 skip 0
  // for page 2 page = 2 - 1 = 1 * 10 = 10 skip 10
  //and so on
  



  //numeric filter
  if(numericFilter){
    const operatorMap= {
        '>' : '$gt',
        '>=' : '$gte',
        '<' : '$lt',
        '<=' : '$lte',
        '=' : '$eq',
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g
    let filter = numericFilter.replace(regEx,(match) =>`-${operatorMap[match]}-`)
    console.log(filter)
    const option = ['price','rating'];

    filter = filter.split(',').forEach(element => {
     const [field,opreator,value] = element.split('-');
     if(option.includes(field)){
      queryObject[field] = { [opreator] : Number(value)}
     }
    });
    console.log(queryObject)

  }
  const products = await result.find(queryObject).limit(numToShow).skip(skip);  // await Product.find({}); // find all products // limit(10) to get only 10 products
  if (products < 1) {
    next(); // if no products found throw 404 `next` will call the next middleware
  }
  
  res.status(200).json({products ,nbHits: products.length});
  

}

module.exports  = { getAllProducts, getAllProductsStatic };