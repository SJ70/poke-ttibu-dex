import { SEALS_INFO } from '../const/sealsInfo';

const KEY_BASE = 'poke-ttibu-dex-seals-';

export function updateSeal(idx, bool) {
  const key = `${KEY_BASE}${idx}`;
  if (bool) {
    window.localStorage.setItem(key, '');
  }
  else {
    window.localStorage.removeItem(key);
  }
}

export function loadSeals() {
  const seals = Array(SEALS_INFO.length).fill(false);
  for (let i=0; i<SEALS_INFO.length; i++) {
    const key = `${KEY_BASE}${i}`;
    seals[i] = (window.localStorage.getItem(key) !== null);
  }
  return seals;
}
