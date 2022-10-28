import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EvolutionCard from '.';
import { render } from '../../test-utils';

describe('EvolutionCard component unit test', () => {
  const fakeInfo = {
    id: 1,
    name: 'Test Name',
    sprites: {
      front_default: null,
      other: {
        'official-artwork': {
          front_default: 'Test Url'
        }
      }
    }
  };

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route index element={<EvolutionCard {...fakeInfo} />}></Route>
        </Routes>
      </MemoryRouter>
    );
  });

  it('Image works properly', () => {
    expect(screen.getByAltText(fakeInfo.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      fakeInfo.sprites.other['official-artwork'].front_default
    );
  });

  it('Name displays properly', () => {
    expect(screen.getByAltText(fakeInfo.name)).toBeInTheDocument();
  });
});
