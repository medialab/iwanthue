type Color = [number, number, number];

type ColorFilterFunction = (rgb: Color, lab: Color) => boolean;

type ColorSpaceArray = [number, number, number, number, number, number];
type ColorSpaceObject = {
  hmin?: number,
  hmax?: number,
  cmin?: number,
  cmax?: number,
  lmin?: number,
  lmax?: number
};

/**
 * Available color spaces
 * @see https://github.com/medialab/iwanthue/blob/master/npm/presets.js
 */
type ColorSpacePreset =
  | "all"
  | "default"
  | "colorblind"
  | "fancy-light"
  | "fancy-dark"
  | "shades"
  | "tarnish"
  | "pastel"
  | "pimp"
  | "intense"
  | "fluo"
  | "red-roses"
  | "ochre-sand"
  | "yellow-lime"
  | "green-mint"
  | "ice-cube"
  | "blue-ocean"
  | "indigo-night"
  | "purple-wine"
type ColorSpace = ColorSpacePreset | ColorSpaceArray | ColorSpaceObject;

type IWantHueOptions = {
  colorFilter?: ColorFilterFunction,
  colorSpace?: ColorSpace,
  clustering?: 'k-means' | 'force-vector',
  quality?: number,
  ultraPrecision?: boolean,
  distance?: 'euclidean' | 'cmc' | 'compromise' | 'protanope' | 'deuteranope' | 'tritanope',
  seed?: string | null
};

export default function iwanthue(colors: number, options?: IWantHueOptions): Array<string>;
