import type {IWantHueSettings} from './index';
import type {IntoInterator, IntoEntriesIterator, AnyMapping} from 'obliterator/types';

export interface PaletteGenerateFromValuesSettings extends IWantHueSettings {
  defaultColor?: string;
}

export type SerializedPalette<V> = {
  name: string;
  defaultColor: string;
  entries: Array<[value: V, color: string]>;
}

export default class Palette<V> {
  name: string;
  size: number;
  defaultColor: string;
  map: Map<V, string>;

  constructor(name: string, map: Map<V, string>, defaultColor?: string);
  get(value: V): string;
  has(value: V): boolean;
  forEach(callback: (color: string, value: V) => void): void;
  colors(): Array<string>;
  toJSON(): SerializedPalette<V>;

  static fromJSON<T>(data: SerializedPalette<T>): Palette<T>;

  static generateFromValues<T>(
    name: string,
    values: IntoInterator<T>,
    settings?: PaletteGenerateFromValuesSettings
  ): Palette<T>;

  static fromEntries<T>(
    name: string,
    entries: IntoEntriesIterator<T, string>,
    defaultColor?: string
  ): Palette<T>;

  static fromMapping<T>(
    name: string,
    mapping: AnyMapping<T, string>,
    defaultColor?: string
  ): Palette<T>;
}
