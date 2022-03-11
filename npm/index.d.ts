export type RGBColor = [r: number, g: number, b: number];
export type LABColor = [l: number, a: number, b: number];

export type ColorFilterFunction = (rgb: RGBColor, lab: LABColor) => boolean;

export type ColorSpaceArray = [
  hmin: number,
  hmax: number,
  cmin: number,
  cmax: number,
  lmin: number,
  lmax: number
];

export type ColorSpaceObject = {
  hmin: number,
  hmax: number,
  cmin: number,
  cmax: number,
  lmin: number,
  lmax: number
};

/**
 * Available color spaces
 * @see https://github.com/medialab/iwanthue/blob/master/npm/presets.js
 */
export type ColorSpacePreset =
  | 'all'
  | 'default'
  | 'sensible'
  | 'colorblind'
  | 'fancy-light'
  | 'fancy-dark'
  | 'shades'
  | 'tarnish'
  | 'pastel'
  | 'pimp'
  | 'intense'
  | 'fluo'
  | 'red-roses'
  | 'ochre-sand'
  | 'yellow-lime'
  | 'green-mint'
  | 'ice-cube'
  | 'blue-ocean'
  | 'indigo-night'
  | 'purple-wine';

export type ColorSpace = ColorSpacePreset | ColorSpaceArray | Partial<ColorSpaceObject>;

export type Distance =
  | 'euclidean'
  | 'cmc'
  | 'compromise'
  | 'protanope'
  | 'deuteranope'
  | 'tritanope';

export type ClusteringType = 'k-means' | 'force-vector';

export interface IWantHueSettings {
  attempts?: number,
  colorFilter?: ColorFilterFunction,
  colorSpace?: ColorSpace,
  clustering?: ClusteringType,
  quality?: number,
  ultraPrecision?: boolean,
  distance?: Distance,
  seed?: string | number | null
}

export default function iwanthue(count: number, settings?: IWantHueSettings): Array<string>;
