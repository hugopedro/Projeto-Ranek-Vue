// funções javascript gerais que podem ser re-utilizadas no site

export function serialize(obj) {
  let queryString = "";
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`; //isso é pra poder acumular &q=x&q=y na url
  }

  return queryString;
}

export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      },
    };
  }
  return object;
}
