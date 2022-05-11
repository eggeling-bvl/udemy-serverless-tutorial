require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.handler = async (event,context,cb) =>{
    const method = event.httpMethod
    if(method !== 'POST'){
        return {
            statusCode:405,
            body: 'Only Post requests allowed',
        }

    }
    const {purchase, total_amount, shipping_fee} = JSON.parse(event.body)
    const calculateOrderAmount = () =>{
        return Number(shipping_fee)+Number(total_amount)
    }

    console.log(purchase, total_amount, shipping_fee);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:calculateOrderAmount(),
            currency:"usd"
        })
        return {
            statusCode:200,
            body: JSON.stringify({clientSecret:paymentIntent.client_secret}),
        }
    } catch (error) {
        return {
            statusCode:500,
            body: JSON.stringify({error:error.message}),
        }
    }

  
}