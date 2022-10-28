import { HStack } from '@chakra-ui/react';
import { EvolutionChainType } from '../../type/Pokemon';
import EvolutionCard from '../EvolutionCard';

const EvolutionContainer = ({ evolutions }: { evolutions: EvolutionChainType[] }) => {
  return (
    <HStack>
      {evolutions.map((evolution) => (
        <EvolutionCard key={evolution.name} {...evolution} />
      ))}
    </HStack>
  );
};

export default EvolutionContainer;
