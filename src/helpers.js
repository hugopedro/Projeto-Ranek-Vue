// funções javascript gerais que podem ser re-utilizadas no site

export function serialize(obj) {
  let queryString = "";
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`; //isso é pra poder acumular &q=x&q=y na url
  }

  return queryString;
}
