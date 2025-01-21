import { SEALS_INFO } from '../const/sealsInfo';

export function decodeSeals(value) {
  const seals = value.split('').map(b => b === '1');
  while (seals.length < SEALS_INFO.length) {
    seals.push(false);
  }
  return seals;
}

export function encodeSeals(seals) {
  return seals.map(b => b ? "1" : "0").join('');
}