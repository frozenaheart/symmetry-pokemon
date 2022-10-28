const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemon = async (id: number) => {
  const URL = `${API_URL}/pokemon/${id}`;
  return fetch(URL);
}

export const fetchAllTypes = async () => {
  const URL = `${API_URL}/type`;
  return fetch(URL);
}

export const fetchAllSpecies = async () => {
  const URL = `${API_URL}/pokemon-species?limit=1000`;
  return fetch(URL);
}

export const fetchPokemonSpecie = async (id: number | string) => {
  const URL = `${API_URL}/pokemon-species/${id}`;
  return fetch(URL);
}


export const fetchPokemonList = async (offset: number, limit: number, search: string) => {
  const URL = `${API_URL}/pokemon?offset=${offset}&limit=${limit}&name=${search}`;
  return fetch(URL);
}

export const fetchAllPokemonList = async () => {
  const URL = `${API_URL}/pokemon?limit=1000`;
  return fetch(URL);
}

export const fetchPokemonByType = async (type: string) => {
  const URL = `${API_URL}/type/${type}`;
  return fetch(URL);
}

export const fetchPokemonCount = async () => {
  const URL = `${API_URL}/pokedex/national`;
  return fetch(URL);
}