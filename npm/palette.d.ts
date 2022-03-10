import type {IWantHueSettings} from './index';

export interface PaletteSettings extends IWantHueSettings {
  trueCount?: number;
  maxCount?: number;
  defaultColor?: string;
}

export type Values<T> = Array<T> | Set<T>;

export default class Palette<T> {
  name: string;
  size: number;
  defaultColor: string;
  colors: Array<string>;
  map: Map<T, string>;
  overflowing: boolean;

  constructor(name: string, values: Values<T>, settings?: PaletteSettings);
  get(value: T): string;
  has(value: T): boolean;
  forEach(callback: (color: string, value: T) => void): void;
}
