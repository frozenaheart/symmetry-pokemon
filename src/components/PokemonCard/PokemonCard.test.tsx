import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonCard } from '../PokemonCard';
import { screen } from '@testing-library/react';
import { PokemonType } from '../../type/Pokemon';

describe('PokemonCard component unit test', () => {
  const fakeInfo = {
    id: 1,
    types: [
      {
        type: {
          name: 'Test Type'
        }
      }
    ],
    name: 'Test Name',
    image: 'Test Url'
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <PokemonCard {...fakeInfo} />
      </MemoryRouter>
    );
  });

  it('Name and id displays properly', () => {
    expect(screen.getByText(fakeInfo.name)).toBeInTheDocument();
    expect(screen.getByText(`#${fakeInfo.id}`)).toBeInTheDocument();
  });

  it('Image works properly', () => {
    expect(screen.getByAltText(fakeInfo.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', fakeInfo.image);
  });

  it('Types renders properly', () => {
    fakeInfo.types.map(({ type: { name } }: PokemonType) =>
      expect(screen.getByText(name)).toBeInTheDocument()
    );
  });
});
