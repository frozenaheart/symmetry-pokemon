import { Spinner } from '@chakra-ui/react';
import { createContext, useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { Pokemon, PokemonBase } from '../type/Pokemon';
import { fetchAllPokemonList, fetchAllTypes, fetchAllSpecies } from '../utils/api';

interface PokemonContextProp {
  children: JSX.Element | JSX.Element[];
}

type PokemonField = 'name' | 'id' | 'weight' | 'height';

export interface PokemonContextData {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  countPerPage: number;
  setCountPerPage: Dispatch<SetStateAction<number>>;
  pokemonList: Pokemon[];
  setPokemonList: Dispatch<SetStateAction<Pokemon[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  curType: string;
  setCurType: Dispatch<SetStateAction<string>>;
  curSpecie: string;
  setCurSpecie: Dispatch<SetStateAction<string>>;
  totalCount: number;
  pokemonTypes: PokemonBase[];
  pokemonSpecies: PokemonBase[];
  onSortBy: (field: string) => void;
}

export const PokemonContext = createContext({} as PokemonContextData);

const PokemonProvider = ({ children }: PokemonContextProp) => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(12);
  const [pokemonAll, setPokemonAll] = useState<Pokemon[]>([]);
  const [curType, setCurType] = useState<string>('');
  const [curSpecie, setCurSpecie] = useState<string>('');
  const [pokemonTypes, setPokemonTypes] = useState<PokemonBase[]>([]);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonBase[]>([]);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<unknown>(null);

  const getPokemonList = useCallback(async () => {
    try {
      setIsLoading(true);
      let data = await fetchAllPokemonList();
      const dataJson = await data.json();
      let totalPokemonBase = [];
      let { results, next } = dataJson;
      totalPokemonBase = results;
      while (next) {
        data = await fetch(next);
        const dataJson = await data.json();
        results = dataJson.results;
        totalPokemonBase = [...totalPokemonBase, ...results];
        next = dataJson.next;
      }
      const resolves = totalPokemonBase.map(
        async ({ url }: PokemonBase) => await (await fetch(url)).json()
      );
      const res = await Promise.all(resolves);
      setPokemonAll(res);
      data = await fetchAllTypes();
      setPokemonTypes((await data.json()).results);
      data = await fetchAllSpecies();
      setPokemonSpecies((await data.json()).results);
      setIsLoading(false);
      setError(null);
    } catch (err: unknown) {
      setError(err);
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setPokemonAll]);

  useEffect(() => {
    getPokemonList();
  }, []);

  const filterByName = useCallback(
    (list: Pokemon[]) => {
      return list.filter(({ name }: Pokemon) => name.includes(search));
    },
    [search]
  );

  const filterBySpecie = useCallback(
    (list: Pokemon[]) => {
      if (curSpecie === '') {
        return list;
      }
      return list.filter(({ species: { name } }: Pokemon) => name === curSpecie);
    },
    [curSpecie]
  );

  const filterByType = useCallback(
    (list: Pokemon[]) => {
      return list.filter(
        ({ types }: Pokemon) => curType === '' || types.some((type) => type.type.name === curType)
      );
    },
    [curType]
  );

  const onSortBy = useCallback(
    (field1: string) => {
      setPokemonAll((prev: Pokemon[]) => [
        ...prev.sort((a, b) => {
          const field = field1 as PokemonField;
          if (['id', 'weight', 'height'].includes(field)) {
            return (a[field] as number) - (b[field] as number);
          } else if (field === 'name') {
            return a[field].localeCompare(b[field]);
          }
          return 0;
        })
      ]);
    },
    [setPokemonAll]
  );

  const getCurrentPokemonList = useCallback(async () => {
    const filteredPokemonsByName = filterByName(pokemonAll);
    const filteredPokemonsBySpecie = filterBySpecie(filteredPokemonsByName);
    const filteredPokemonsByType = filterByType(filteredPokemonsBySpecie);
    const result = filteredPokemonsByType.splice(
      (page - 1) * countPerPage,
      Math.min(countPerPage, filteredPokemonsByType.length - (page - 1) * countPerPage)
    );
    setPokemonList(result);
  }, [page, countPerPage, filterByName, filterByType, filterBySpecie, setPokemonList, pokemonAll]);

  useEffect(() => {
    getCurrentPokemonList();
  }, [getCurrentPokemonList]);

  useEffect(() => {
    setPage(1);
  }, [search, curType, curSpecie]);

  if (isLoading === true) {
    return <Spinner></Spinner>;
  }

  if (error !== null) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <PokemonContext.Provider
      value={{
        page,
        curType,
        setCurType,
        onSortBy,
        setPage,
        pokemonTypes,
        pokemonSpecies,
        countPerPage,
        setCountPerPage,
        pokemonList,
        setPokemonList,
        search,
        setSearch,
        curSpecie,
        setCurSpecie,
        totalCount: filterBySpecie(filterByType(filterByName(pokemonAll))).length
      }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
