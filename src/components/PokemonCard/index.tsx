import { Badge, Box, Flex, Heading, VStack, Image } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonType } from '../../type/Pokemon';

interface PokemonCardProp {
  id: number;
  types: PokemonType[];
  name: string;
  image: string | null;
}

type ImageSrcType = string | undefined;

export const PokemonCard = ({ id, types, name, image }: PokemonCardProp) => {
  const navigate = useNavigate();

  const onCardClick = useCallback(
    (id: number) => () => {
      navigate(`../individual/${id}`);
    },
    []
  );

  return (
    <Box
      color="white"
      borderRadius="30px"
      w={[200, 300, 300]}
      onClick={onCardClick(id)}
      bgColor={`var(--color-${types[0].type?.name}-type-dark)`}
      padding="20px">
      <Flex justifyContent="space-between">
        <Heading size="md">{name}</Heading>
        <Heading size="md">{`#${id}`}</Heading>
      </Flex>
      <Flex justifyContent="stretch">
        <Box flex={1}>
          <Image w="100%" src={image as ImageSrcType} alt={name}></Image>
        </Box>
        <Box>
          <VStack>
            {types.map((type) => (
              <Badge
                color="white"
                bgColor={`var(--color-${type?.type?.name}-type-light)`}
                padding="10px 20px 10px 20px"
                borderRadius="20px"
                key={type?.type?.name}>
                {type?.type?.name}
              </Badge>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};
