import { Flex, Input, Select, SimpleGrid, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import Pagination from '../../components/Pagination';
import { PokemonCard } from '../../components/PokemonCard';
import { PokemonContext } from '../../context/PokemonProvider';
import { PokemonBase } from '../../type/Pokemon';

const MainPage = () => {
  const {
    search,
    setSearch,
    pokemonList,
    pokemonTypes,
    pokemonSpecies,
    curType,
    curSpecie,
    setCurSpecie,
    onSortBy,
    setCurType
  } = useContext(PokemonContext);

  return (
    <>
      <VStack>
        <Flex gap="20px">
          <Input
            placeholder="Search pokemon..."
            onChange={({ target: { value } }) => setSearch(value)}
            value={search}
            role="input"
          />
          <Select
            placeholder="Select pokemon type..."
            role="select"
            value={curType}
            onChange={({ target: { value } }) => setCurType(value)}>
            {pokemonTypes?.map(({ name }: PokemonBase) => (
              <option key={name}>{name}</option>
            ))}
          </Select>
          <Select
            placeholder="Select pokemon species..."
            role="select"
            value={curSpecie}
            onChange={({ target: { value } }) => setCurSpecie(value)}>
            {pokemonSpecies?.map(({ name }: PokemonBase) => (
              <option key={name}>{name}</option>
            ))}
          </Select>
          <Select placeholder="Sort By..." onChange={({ target: { value } }) => onSortBy(value)}>
            {['id', 'name', 'height', 'weight'].map((name) => (
              <option key={name}>{name}</option>
            ))}
          </Select>
        </Flex>
        <SimpleGrid columns={[2, 3, 4]} spacing="30px">
          {pokemonList?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              image={pokemon.sprites.other['official-artwork'].front_default}
            />
          ))}
        </SimpleGrid>
        <Pagination />
      </VStack>
    </>
  );
};

export default MainPage;
