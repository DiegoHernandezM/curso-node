import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const base = yarg.b;
const limit = yarg.l;
const show = yarg.s;



let multiplicationTable = `
  ====================================
              TABLA DEL ${base}
  ====================================
  `;
for (let i = 1; i <= limit; i++) {
  multiplicationTable += `${base} x ${i} = ${base * i}\n`;
}
if (show) {
  console.log(multiplicationTable);
}

