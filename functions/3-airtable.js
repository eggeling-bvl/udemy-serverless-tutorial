require('dotenv').config()
const Airtable = require('airtable-node');
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
.base('apprJpnAytillVe6H')
.table('products')


exports.handler = async (event,context,cb) =>{
    try {
       const {records} = await airtable.list();
       const products = records.map((product)=>{
           const {id} = product;
           const {name, image, price} = product.fields;
           const url = image[0].url
           console.log(id)
           return {id, name, url, price}

       })
     
    return {
        statusCode:200,
        body: JSON.stringify(records),
    }
    } catch (error) {
        return {
            statusCode:500,
            body: 'Server',
        }
    }

}