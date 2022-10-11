const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters

  try {
    const resp = await fetch (
      `https://api.yelp.com/v3/businesses/search?categories=restaurants`, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      });
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};

module.exports = { handler };
