import { screen } from '@testing-library/react';
import { render } from './test-utils';
import { cleanup } from '@testing-library/react';
import { App } from './App';
import { fetchAllPokemonList as mockFetchAllPokemonList } from './utils/api';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage';
import Individual from './containers/Individual';

jest.mock('./utils/api');

describe('Pokedex app integration test', () => {
  test('Pokedex renders properly when there is no pokemons', async () => {
    const mockPokemon = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
    (mockFetchAllPokemonList as unknown as jest.Mock).mockResolvedValueOnce(mockPokemon);
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/individual/:id" element={<Individual />} />
        </Routes>
      </MemoryRouter>
    );

    expect((await screen.findAllByRole('input')).length).toBe(1);
    const selects = screen.getAllByRole('select');
    expect(selects.length).toBe(2);
    selects.forEach((select) => expect(select.children.length).toBe(1));
  });
});
