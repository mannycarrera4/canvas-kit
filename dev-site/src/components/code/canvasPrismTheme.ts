import {PrismTheme} from 'prism-react-renderer';
import {colors, typeColors} from '@workday/canvas-kit-react/tokens';

const theme: PrismTheme = {
  plain: {
    color: typeColors.body,
    backgroundColor: colors.soap100,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: typeColors.hint,
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: colors.greenApple500,
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: typeColors.body,
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: colors.jewel400,
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: colors.pomegranate400,
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: colors.cinammon500,
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: colors.islandPunch400,
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: colors.blueberry400,
      },
    },
  ],
};

export default theme;
