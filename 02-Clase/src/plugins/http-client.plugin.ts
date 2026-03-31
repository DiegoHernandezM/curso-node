import axios from 'axios';


export const httpClientPlugin = {

  get: async(url: string ) => {
    const { data } = await axios.get( url );
    return data;
    // const resp = await fetch( url );
    // return await resp.json();     
  },

<<<<<<< HEAD
  post: async(url: string, body: any ) => {
    throw new Error('Not implemented');
  },
  put: async(url: string, body: any) => {
    throw new Error('Not implemented');
  },
  delete: async(url: string ) => {
    throw new Error('Not implemented');
  },
=======
  post: async(url: string, body: any ) => {},
  put: async(url: string, body: any) => {},
  delete: async(url: string ) => {},
>>>>>>> ef102d61333903922f9c72ae22cf36bbcebbb9f6

};


