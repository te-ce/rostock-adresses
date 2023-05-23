export const fetchCities = async () => {
  const res = await fetch('https://geo.sv.rostock.de/download/opendata/adressenliste/adressenliste.json')
  return res.json()
}