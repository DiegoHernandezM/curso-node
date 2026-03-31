import yargs from 'yargs';
import  { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .options(
    'b', {
      alias: 'base',
      type: 'number',
      demandOption: true,
      describe: 'Base number'
    },
  )
  .options(
    'l', {
      alias: 'limit',
      type: 'number',
      demandOption: true,
      describe: 'Limit number',
      default: 10
    },
  )
  .options(
    's', {
      alias: 'show',
      type: 'boolean',
      default: false,
      describe: 'Show multiplication table'
    }
  )
  .options(
    'n', {
      alias: 'name',
      type: 'string',
      default: 'multiplication-table.txt',
      describe: 'File name'
    }
  )
  .options(
    'd', {
      alias: 'destination',
      type: 'string',
      default: 'outputs',
      describe: 'Destination folder'
    }
  )
  .check((argv) => {
    if (argv.b < 1) {
      throw new Error('Base number must be greater than 0');
    }

    if (argv.l < 1) {
      throw new Error('Limit number must be greater than 0');
    }

    return true;
  })
  .parseSync();
