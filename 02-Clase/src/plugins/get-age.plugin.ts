// const getAgePlugin = require('get-age');


export const getAge = ( birthdate: string ) => {

  // return getAgePlugin(birthdate);
<<<<<<< HEAD
  // console.log({ currentYear: new Date().getFullYear() });


=======
>>>>>>> ef102d61333903922f9c72ae22cf36bbcebbb9f6
  return new Date().getFullYear() - new Date(birthdate).getFullYear();
}
