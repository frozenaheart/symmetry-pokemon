import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import MainPage from './containers/MainPage';
import PokemonProvider from './context/PokemonProvider';
import GlobalStyle from './styles/global';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Individual from './containers/Individual';

export const App = () => (
  <ChakraProvider theme={theme}>
    <PokemonProvider>
      <ColorModeSwitcher justifySelf="flex-end" />
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="individual/:id" element={<Individual />} />
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
    <GlobalStyle />
  </ChakraProvider>
);
