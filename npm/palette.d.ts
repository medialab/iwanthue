import type {IWantHueSettings} from './index';
import type {IntoInterator} from 'obliterator/types';

export type PaletteSettings = {
  defaultColor?: string;
  overflowing?: boolean;
}

export interface PaletteFromValuesSettings extends IWantHueSettings, PaletteSettings {
  trueCount?: number;
  maxCount?: number;
}

export default class Palette<V> {
  name: string;
  size: number;
  defaultColor: string;
  map: Map<V, string>;
  overflowing: boolean;

  constructor(name: string, map: Map<V, string>, settings?: PaletteSettings);
  get(value: V): string;
  has(value: V): boolean;
  forEach(callback: (color: string, value: V) => void): void;
  colors(): Array<string>;

  static fromValues<T>(
    name: string,
    values: IntoInterator<T>,
    settings?: PaletteFromValuesSettings
  ): Palette<T>;

  static fromEntries<T>(
    name: string,
    entries: IntoInterator<[value: T, color: string]>,
    settings?: PaletteSettings
  ): Palette<T>;

  static fromMapping<T>(
    name: string,
    mapping: Map<T, string> | {[value: T]: string},
    settings?: PaletteSettings
  ): Palette<T>;
}
