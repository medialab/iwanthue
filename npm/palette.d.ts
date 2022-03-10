import type {IWantHueSettings} from './index';

export interface PaletteSettings extends IWantHueSettings {
  trueCount?: number;
  maxCount?: number;
  defaultColor?: string;
}

export type Categories<T> = Array<T> | Set<T> | Map<T>;

export default class Palette<T> {
  name: string;
  size: number;
  defaultColor: string;
  colors: Array<string>;
  map: Map<T, string>;
  overflowing: boolean;

  constructor(name: string, values: Categories<T>, settings?: PaletteSettings);
  get(category: T): string;
  forEach(callback: (color: string, category: T) => void): void;
}
