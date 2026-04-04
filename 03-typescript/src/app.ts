import { findHeroById } from './services/hero.service.js';



const hero = findHeroById(4);
console.log(hero?.name ?? 'Hero not found !!');
