module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.tsx',
    './pages/**/*.tsx',
    './src/**/*.ts',
    './posts/**/*.md',
    './posts/**/*.markdown',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px', // iPhone SE 1
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
