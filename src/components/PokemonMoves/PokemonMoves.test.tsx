import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { PokemonMove, PokemonVersionGroupDetail } from '../../type/Pokemon';
import PokemonMoves from '.';

describe('PokemonMoves component unit test', () => {
  const fakeMoves = [
    {
      move: {
        name: 'Test Move 1',
        url: 'Test Url 1'
      },
      version_group_details: [] as PokemonVersionGroupDetail[],
      damage_class: 'Test Damage 1',
      type: 'Test Type 1',
      name: 'Test Name 1'
    },
    {
      move: {
        name: 'Test Move 2',
        url: 'Test Url 2'
      },
      version_group_details: [] as PokemonVersionGroupDetail[],
      damage_class: 'Test Damage 2',
      type: 'Test Type 2',
      name: 'Test Name 2'
    },
    {
      move: {
        name: 'Test Move 3',
        url: 'Test Url 3'
      },
      version_group_details: [] as PokemonVersionGroupDetail[],
      damage_class: 'Test Damage 3',
      type: 'Test Type 3',
      name: 'Test Name 3'
    }
  ];

  beforeEach(() => {
    render(<PokemonMoves moves={fakeMoves as PokemonMove[]} />);
  });

  it('All the moves are rendered', () => {
    fakeMoves.forEach((move) => {
      const { damage_class, type, name } = move;
      expect(screen.getByText(damage_class)).toBeInTheDocument();
      expect(screen.getByText(type)).toBeInTheDocument();
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
