import { Box, Flex, HStack, Progress } from '@chakra-ui/react';
import { PokemonSprites, PokemonStat, PokemonType } from '../../type/Pokemon';
import { PokemonCard } from '../PokemonCard';

export interface PokemonBioProp {
  id: number;
  name: string;
  flavorText: string;
  types: [PokemonType];
  stats: [PokemonStat];
  sprites: PokemonSprites;
}

const PokemonBio = ({ flavorText, sprites, id, name, types, stats }: PokemonBioProp) => {
  return (
    <>
      {flavorText}
      <HStack spacing="30px" w="100%" marginTop="20px">
        <PokemonCard
          image={sprites.other['official-artwork'].front_default}
          id={id}
          name={name}
          types={types}
        />
        <Box flex={1}>
          {stats.map((stat: PokemonStat) => (
            <Flex key={stat.stat.name} alignItems="center">
              <Box w="200px">{stat.stat.name}</Box>
              <Flex justify="space-between" flex={1} alignItems="center">
                <Box w="40px">{stat.base_stat}</Box>
                <Progress flex={1} value={stat.base_stat / 3}></Progress>
              </Flex>
            </Flex>
          ))}
        </Box>
      </HStack>
    </>
  );
};

export default PokemonBio;
