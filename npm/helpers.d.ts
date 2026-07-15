import { ColorSpacePreset } from ".";

export function rgbHexToLab(hex: string): [number, number, number];
export function labToHcl(
  hcl: [number, number, number],
): [number, number, number];
export function detectSmallestCompatibleColorSpace(
  hexColors: string[],
): ColorSpacePreset | undefined;
