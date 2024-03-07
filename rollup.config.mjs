import { babel } from '@rollup/plugin-babel'
import clear from 'rollup-plugin-clear'
import copy from 'rollup-plugin-copy'
import filesize from 'rollup-plugin-filesize'
import resolve from '@rollup/plugin-node-resolve';

import createBanner from './build/banner.js'
import { output, outputs } from './build/output.js'
import { pluginsBase, pluginsProd, injectVersion } from './build/plugins.js'

import pkg from './package.json' with { type: "json" }

const { ROLLUP_WATCH, DEBUG, TEST } = process.env

const debugMode = DEBUG || ROLLUP_WATCH || false
const sourcemap = debugMode
const logging = debugMode || TEST

const pluginsJs = TEST 
  ? injectVersion
  : pluginsBase(!logging)

console.log('\nBuilding iframe-resizer version', pkg.version, debugMode ? 'DEVELOPMENT' : 'PRODUCTION', '\n')

const npm = [
  // Core
  {
    input: 'src/core/index.js',
    output: [
      {
        name: 'createResizer',
        ...output('core')('umd')
      },
      output('core')('esm'), 
      output('core')('cjs')
    ],
    plugins: pluginsProd('core'),
  }, 

  //  Parent ES module (for bundlers) and CommonJS (for Node) build.
  {
    input: 'src/parent/esm.js',
    output: [
      output('parent')('esm'), 
      output('parent')('cjs')
    ],
    external: ['@iframe-resizer/core'],
    plugins: pluginsProd('parent'),
  },
  
  // Parent browser-friendly UMD build
  {
    input: 'src/parent/umd.js',
    output: [{
      name: 'iframeResize',
      ...output('parent')('umd'),
    }],
    plugins:[
      ...pluginsProd('parent'),
      resolve(),
    ]
  }, 

  // Child
  {
    input: 'src/child/index.js',
    output: outputs('child'),
    plugins: pluginsProd('child'),
  },

  //  jQuery (ES) 
  {
    input: 'src/jquery/plugin.js',
    output: [
      output('jquery')('esm'), 
      output('jquery')('cjs')
    ],
    external: ['@iframe-resizer/core'],
    plugins: pluginsProd('parent'),
  },

  // jQuery (umd)
  {
    input: 'src/jquery/plugin.js',
    output: output('jquery')('umd'),
    plugins: [
      ...pluginsProd('jquery'),
      resolve()
    ],
  },

  // React
  {
    input: 'src/react/index.jsx',
    output: [
      output('react')('esm'), 
      output('react')('cjs'),
    ],
    external: ['@iframe-resizer/core', 'prop-types', 'react', 'warning'],
    plugins: [
      ...pluginsProd('react'),
      copy({
        targets: [{ 
          src: 'src/react/index.d.ts',
          dest: 'dist/react/',
          rename: 'iframe-resizer.react.d.ts',
        }],
      }),
      babel({
        exclude: 'node_modules/**',
      }),
    ]
  }, 
]

// JS folder
const js = [ 
  {
    input: `src/parent/iife.js`,
    output: [{
      banner: createBanner('parent', 'iife'),
      file: 'js/iframe-resizer.parent.js',
      format: 'iife' ,
      name: 'iframeResize',
      sourcemap,
    }],
    plugins: [
      clear({ targets: ['js']}),
      filesize(),
      ...pluginsJs('parent'),,
      resolve(),
    ],
  }, 

  {
    input: 'src/child/index.js',
    output: [{ 
      banner: createBanner('child', TEST ? 'iife': 'umd'),
      file: 'js/iframe-resizer.child.js',
      format: TEST ? 'iife': 'umd',
      sourcemap,
    }],
    plugins: [
      filesize(),
      ...pluginsJs('child'),
    ],
  }, 

  {
    input: 'src/jquery/plugin.js',
    output: [{
      banner: createBanner('jquery', 'iife'),
      file: 'js/iframe-resizer.jquery.js',
      format: 'iife',
      sourcemap,
    }],
    plugins: [
      filesize(),
      ...pluginsJs('jquery'),
      resolve(),
    ],
  }, 
]

export default debugMode ? js : npm.concat(js)
