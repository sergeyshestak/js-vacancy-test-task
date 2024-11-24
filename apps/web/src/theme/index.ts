import { Inter } from 'next/font/google';
import { createTheme, DEFAULT_THEME, defaultVariantColorsResolver, VariantColorsResolver } from '@mantine/core';

import * as components from './components';

const inter = Inter({ subsets: ['latin'] });

const variantColorResolver: VariantColorsResolver = (component) => {
  const defaultResolvedColors = defaultVariantColorsResolver(component);

  if (component.variant === 'sold') {
    return {
      background: '#E8F7F0',
      hover: '#E8F7F0',
      color: '#17B26A',
      border: 'none',
    };
  }

  if (component.variant === 'onSale') {
    return {
      background: '#FEF4E6',
      hover: '#FEF4E6',
      color: '#F79009',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: `${inter.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
    fontWeight: '600',
  },
  primaryColor: 'dark',
  colors: {
    white: [
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
    ],
    black: [
      '#201F22',
      '#767676',
      '#A3A3A3',
      '#CFCFCF',
      '#ECECEE',
      '#FCFCFC',
      '#FCFCFC',
      '#FCFCFC',
      '#FCFCFC',
      '#FCFCFC',
    ],
    blue: [
      '#235FBC',
      '#2B77EB',
      '#5692EF',
      '#EAF1FD',
      '#EAF1FD',
      '#EAF1FD',
      '#EAF1FD',
      '#EAF1FD',
      '#EAF1FD',
      '#EAF1FD',
    ],
  },
  variantColorResolver,
  components,
});

export default theme;
