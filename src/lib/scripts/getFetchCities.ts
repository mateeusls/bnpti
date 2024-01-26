export async function getFetchCities() {
  const res = await fetch(process.env.URL + '/api/cities/10');
  const cities = await res.json()

  return cities
}