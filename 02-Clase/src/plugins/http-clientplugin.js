const axios = require('axios');

const httpClientPlugin = {
    get: async (url) => {
        // const response = await fetch(url);
        // const data = await response.json();
        // return data;
        const {data} = await axios.get(url);
        return data;
    }
}

module.exports = {
    httpClientPlugin,
};
