import { Box, Center, Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { PokemonMove } from '../../type/Pokemon';

const PokemonMoves = ({ moves }: { moves: PokemonMove[] }) => {
  return (
    <VStack>
      {moves.map((move) => (
        <SimpleGrid w="100%" columns={2} key={move.name}>
          <Box>{move.name}</Box>
          <Flex w="100%">
            <Center bgColor={`var(--color-${move.type}-type-dark)`} flex={1}>
              {move.type}
            </Center>
            <Center flex={1} bgColor={`var(--color-${move.damage_class}-type-dark)`}>
              {move.damage_class}
            </Center>
          </Flex>
        </SimpleGrid>
      ))}
    </VStack>
  );
};

export default PokemonMoves;
