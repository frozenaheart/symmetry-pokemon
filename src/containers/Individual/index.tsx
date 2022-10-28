import { Box, Center, Divider, Flex, Heading, VStack, Wrap } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import EvolutionContainer from '../../components/EvolutionContainer';
import PokemonBio from '../../components/PokemonBio';
import PokemonMoves from '../../components/PokemonMoves';
import PokemonProfile from '../../components/PokemonProfile';
import { EvolutionChainType, PokemonDetail, PokemonMove } from '../../type/Pokemon';
import { fetchPokemon, fetchPokemonSpecie } from '../../utils/api';

const Individual = () => {
  const { id = '0' } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonDetail | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChainType[]>([]);
  const navigate = useNavigate();

  const getPokemonInfo = useCallback(async () => {
    const result = await fetchPokemon(+id);
    const data = await result.json();

    const { moves } = data;
    const movesPromises = moves.map(async ({ move: { name, url } }: PokemonMove) => {
      const { damage_class, type } = await (await fetch(url)).json();
      return { name, damage_class: damage_class.name, type: type.name };
    });
    const movesResult = await Promise.all(movesPromises);
    console.log('🚀 ~ file: index.tsx ~ line 35 ~ getPokemonInfo ~ movesResult', movesResult);
    const specie = await fetchPokemonSpecie(data.species.name);
    const specieData = await specie.json();
    const { gender_rate, capture_rate, evolution_chain, flavor_text_entries } = specieData;
    const flavorText =
      flavor_text_entries.find(
        (text: { language: { name: string } }) => text.language.name === 'en'
      )?.flavor_text ?? '';
    const evolution_result = await fetch(evolution_chain.url);
    const evolution_data = await evolution_result.json();
    const chain = [];
    let curChain = [evolution_data.chain];
    while (curChain.length !== 0) {
      chain.push(curChain[0]?.species);
      curChain = curChain[0]?.evolves_to;
    }

    const promises = chain.map(async ({ name }) => {
      const { sprites, id } = await (await fetchPokemon(name)).json();
      return { id, name, sprites };
    });
    const chain_result = await Promise.all(promises);

    setPokemonInfo({ ...data, moves: movesResult, flavorText, gender_rate, capture_rate });
    setEvolutionChain(chain_result);
  }, [id]);

  const getPokemonBioInfo = useCallback(
    ({ flavorText, sprites, id, name, types, stats }: PokemonDetail) => ({
      flavorText,
      sprites,
      id,
      name,
      types,
      stats
    }),
    []
  );

  useEffect(() => {
    getPokemonInfo();
  }, [getPokemonInfo]);

  if (pokemonInfo === null) {
    return <Heading>Loading ...</Heading>;
  }

  return (
    <Flex w="100vw" justifyContent="center">
      <Wrap
        borderRadius="20px"
        w="800px"
        border={`1px solid var(--color-${pokemonInfo.types[0].type?.name}-type-dark)`}>
        <VStack>
          <Box w="100%" pos="relative">
            <Center
              borderRadius="20px 20px 0px 0px"
              bgColor={`var(--color-${pokemonInfo.types[0].type?.name}-type-dark)`}>
              <Heading>{pokemonInfo.name}</Heading>
            </Center>
            <Box onClick={() => navigate('../')} pos="absolute" right="10px" top="20px">
              <FaChevronLeft />
            </Box>
          </Box>
          <Box padding="20px">
            <PokemonBio {...getPokemonBioInfo(pokemonInfo)} />
            <Divider margin="20px 0px 20px 0px" />
            <PokemonProfile {...pokemonInfo} />
            <Divider margin="20px 0px 20px 0px" />
            <EvolutionContainer evolutions={evolutionChain} />
            <Divider margin="20px 0px 20px 0px" />
            <PokemonMoves moves={pokemonInfo.moves} />
          </Box>
        </VStack>
      </Wrap>
    </Flex>
  );
};

export default Individual;
