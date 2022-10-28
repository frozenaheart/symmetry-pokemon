import { Box, SimpleGrid } from '@chakra-ui/react';
import { PokemonDetail, ProfileFieldType } from '../../type/Pokemon';
import { convertToPascalCase } from '../../utils/string';

const ProfileField = ['height', 'weight', 'capture_rate', 'gender_rate'];

const PokemonProfile = (pokemonInfo: PokemonDetail) => {
  return (
    <SimpleGrid columns={2} spacing="10px">
      {ProfileField.map((field) => (
        <Box key={field}>
          {convertToPascalCase(field)} : {pokemonInfo[field as ProfileFieldType]}
        </Box>
      ))}
      <Box>Abilities : {pokemonInfo.abilities.map(({ ability: { name } }) => name).join(',')}</Box>
    </SimpleGrid>
  );
};

export default PokemonProfile;
