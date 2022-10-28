export type PokemonType = { type: { name: string } };

export type PokemonStat = { base_stat: number; stat: { name: string } };

export type PokemonVersionGroupDetail = {
  level_learned_at: number;
  version_group: PokemonBase;
  move_learn_method: PokemonBase;
};

export type PokemonMove = {
  move: PokemonBase;
  version_group_details: [PokemonVersionGroupDetail];
  damage_class?: string;
  type?: string;
  name?: string;
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: PokemonBase;
};

export type PokemonSprites = {
  front_default: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
    };
  };
};

export type Pokemon = {
  id: number;
  name: string;
  types: [PokemonType];
  species: PokemonBase;
  weight: number;
  height: number;
  stats: [PokemonStat];
  sprites: PokemonSprites;
};

export type PokemonBase = {
  name: string;
  url: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  flavorText: string;
  types: [PokemonType];
  species: PokemonBase;
  weight: number;
  height: number;
  stats: [PokemonStat];
  sprites: PokemonSprites;
  moves: [PokemonMove];
  abilities: [PokemonAbility];
  gender_rate: number;
  capture_rate: number;
};

export type EvolutionChainType = {
  id: number;
  name: string;
  sprites: PokemonSprites;
};

export type ProfileFieldType = 'height' | 'weight' | 'capture_rate' | 'gender_rate';
