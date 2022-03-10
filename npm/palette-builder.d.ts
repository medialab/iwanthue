import type {IWantHueSettings} from './index';
import type Palette from './palette';
import type MultiSet from 'mnemonist/multi-set';

export interface PaletteBuilderSettings extends IWantHueSettings {
  defaultColor?: string;
}

export default class PaletteBuilder<T> {
  frequencies: MultiSet<T>

  constructor(name: string, maxCount: number, settings?: PaletteBuilderSettings);
  add(value: T): void;
  build(): Palette<T>;
}
