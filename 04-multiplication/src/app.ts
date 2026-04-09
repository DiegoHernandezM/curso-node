import { ServeApp } from './presentation/serve-app';
import { yarg } from './config/plugins/args.plugin';
// console.log(yarg.b);

(async () => {
  //console.log("Ejecutado");

  await main();
})();

async function main() {
  const { b: base, l: limit, s: show, n: name, d: destination } = yarg;
  ServeApp.run({
    base,
    limit,
    show,
    name,
    destination,
  });
}
