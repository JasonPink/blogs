## vite 为什么比 webpack 快？

- 直接利用浏览器对 es module 的支持，将代码按需加载。在开发阶段，不需要对整个应用进行打包，浏览器可以直接请求和加载模块。
- 使用 esbuild 进行依赖预构建。esbuild 是一个基于 Go 语言的超高速构建工具，性能远远优于基于 JavaScript 的工具。
- 利用浏览器的 ES Module 能力，快速进行模块替换，仅重新加载改变的模块，并且模块之间的依赖关系处理更加高效。
- 编译是按需进行的，只有当模块被浏览器请求时才进行编译。这减少了不必要的编译时间和资源消耗。

Vite 的速度优势主要来自于其利用原生 ESM、按需编译、高效的依赖预构建和模块热替换等技术创新，使得在开发环境中的性能远远优于 Webpack。

## gzip 配置

```
import viteCompression from 'vite-plugin-compression';

plugins:[
  viteCompression:{
    verbose: true, // 是否在控制台输出压缩结果
    filter:/\.(js|mjs|json|css|html)$/i, // 指定哪些资源不被压缩
    disable: false, // 是否禁用
    threshold:10240, //如果体积大于阈值，则进行压缩，单位为b
    ext:.gz, // 后缀
    algorithm:'' // 压缩算法，可选['gzip'，'brotliCompress'，'deflate'，'deflateRaw']
    compressionOptions: '', // 对应压缩算法的参数
    deleteOriginFile:false, // 压缩后是否删除源文件
  }
]
```

## 拆分 bundle

```
build:{
  rollupOptions:{
    sourcemap: false, // 生产环境关闭 sourcemap
    minify: 'esbuild', // 使用 esbuild 进行代码压缩
    output:{
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks:{
          'element-plus': ['element-plus'],
        }
    }
  }
}
```

## vite 常用配置

```
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  root: './src',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: false, // 生产环境关闭 sourcemap
    minify: 'esbuild', // 使用 esbuild 进行代码压缩
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        manualChunks:{
          'element-plus': ['element-plus'],
        }
      }
    },
    cssCodeSplit: true, // 启用 CSS 代码拆分
    terserOptions: {
      compress: {
        drop_console: true, // 去除 console
        drop_debugger: true // 去除 debugger
      }
    }
  },
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL)
    }
  },
  optimizeDeps: {
    include: ['lodash', 'axios'],
    exclude: ['some-large-package']
  },
  assetsInclude: ['**/*.gltf'],
  configureServer: ({ app }) => {
    app.use((req, res, next) => {
      next();
    });
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});

```
