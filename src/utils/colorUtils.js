export const lightenColor = (color, percent = 25) => {
  // Rimuovi spazi e # iniziale se presente
  let hex = color.replace(/^\s*#|\s*$/g, '');
  
  // Converti il colore in RGB
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  
  // Mescola con il bianco in base alla percentuale
  // Un valore più alto di percent significa più bianco (più chiaro)
  r = Math.round(r + (255 - r) * (percent / 100));
  g = Math.round(g + (255 - g) * (percent / 100));
  b = Math.round(b + (255 - b) * (percent / 100));
  
  // Converti di nuovo in hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
