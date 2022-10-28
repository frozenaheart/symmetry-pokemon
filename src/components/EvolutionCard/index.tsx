import { VStack, Image, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { EvolutionChainType } from '../../type/Pokemon';

type ImageSrcType = string | undefined;

const EvolutionCard = ({ id, name, sprites }: EvolutionChainType) => {
  const image = sprites.other['official-artwork'].front_default;
  const navigate = useNavigate();

  return (
    <VStack onClick={() => navigate(`../individual/${id}`)}>
      <Image w="100%" src={image as ImageSrcType} alt={name}></Image>
      <Center>{name}</Center>
    </VStack>
  );
};

export default EvolutionCard;
