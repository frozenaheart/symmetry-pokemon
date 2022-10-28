import { RenderOptions, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '.';
import { PokemonContext, PokemonContextData } from '../../context/PokemonProvider';
import { render } from '../../test-utils';

describe('Pagination unit test', () => {
  const customRender = (
    ui: React.ReactNode,
    value: PokemonContextData,
    renderOptions: RenderOptions
  ) => {
    return render(
      <PokemonContext.Provider value={value}>{ui}</PokemonContext.Provider>,
      renderOptions
    );
  };

  it('Works properly when the total number of page is less than 10', () => {
    customRender(
      <MemoryRouter initialEntries={['/']}>
        <Pagination />
      </MemoryRouter>,
      { page: 0, countPerPage: 12, totalCount: 100 } as PokemonContextData,
      {} as RenderOptions
    );
    expect(screen.getAllByRole('button').length).toBe(Math.ceil(100 / 12));
  });

  it('Works properly when the total number of page is larger than 10', () => {
    customRender(
      <MemoryRouter initialEntries={['/']}>
        <Pagination />
      </MemoryRouter>,
      { page: 20, countPerPage: 12, totalCount: 1000 } as PokemonContextData,
      {} as RenderOptions
    );
    expect(screen.getAllByRole('button').length).toBe(10);
    expect(screen.getAllByText('...').length).toBe(2);
  });
});
