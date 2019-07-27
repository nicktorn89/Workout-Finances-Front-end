import { ThemedCssFunction, css } from 'styled-components';

export const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 320,
};

interface ThemeInterface {}

// Iterate through the sizes and create a media template
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(first, ...interpolations)}
      }
    `;

    return acc;
  },
  {} as { [key in keyof typeof sizes]: ThemedCssFunction<ThemeInterface> },
);
