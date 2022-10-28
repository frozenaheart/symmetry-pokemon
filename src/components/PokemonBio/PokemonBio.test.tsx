import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonBio, { PokemonBioProp } from '.';
import { render } from '../../test-utils';
import { PokemonStat } from '../../type/Pokemon';

describe('PokemonBio component unit test', () => {
  const fakeInfo: PokemonBioProp = {
    id: 1,
    name: 'Test Name',
    flavorText: 'This is test flavorText',
    sprites: {
      front_default: null,
      other: {
        'official-artwork': {
          front_default: 'Test Url'
        }
      }
    },
    types: [
      {
        type: {
          name: 'Test Type'
        }
      }
    ],
    stats: [
      {
        base_stat: 45,
        stat: {
          name: 'test stat 1'
        }
      }
    ]
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <PokemonBio {...(fakeInfo as PokemonBioProp)} />
      </MemoryRouter>
    );
  });

  it('FlavourText renders properly', () => {
    expect(screen.getByText(fakeInfo.flavorText)).toBeInTheDocument();
  });

  it('Stats render properly', () => {
    fakeInfo.stats.forEach(({ base_stat, stat: { name } }: PokemonStat) => {
      expect(screen.getByText(base_stat)).toBeInTheDocument();
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
