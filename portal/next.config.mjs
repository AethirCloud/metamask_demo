/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-03-25 11:46:23
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-09 16:44:50
 */
import nextI18nConfig from './next-i18next.config.mjs';
/** @type {import('next').NextConfig} */

import withAntdLess from 'next-plugin-antd-less';
import env from './public/js/env.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    // antd & deps
    '@ant-design',
    '@rc-component',
    'antd',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-dialog',
    'rc-drawer',
    'rc-dropdown',
    'rc-field-form',
    'rc-image',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-menu',
    'rc-motion',
    'rc-notification',
    'rc-pagination',
    'rc-picker',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-steps',
    'rc-switch',
    'rc-table',
    'rc-tabs',
    'rc-textarea',
    'rc-tooltip',
    'rc-tree',
    'rc-tree-select',
    'rc-upload',
    'rc-util',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
  i18n: nextI18nConfig.i18n,
  async rewrites() {
    return [
		{
			source: "/off_chain/:path*",
			destination: `${process.env.NEXT_PUBLIC_API}/:path*`, // 将目标地址改为你的API服务器地址
		},
	];
  },
  typescript: {
    // 忽略 TypeScript 构建错误
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    console.log('next.config.mjs---', isServer);
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 删除所有的 console 语句
            },
          },
        })
      );
    }

    return config;
  },
  // distDir: "dist",
  // webpack(config, options) {
  //   config.plugins.push({
  //     apply: (compiler) => {
  //       compiler.hooks.make.tapAsync(
  //         "CopyExternalConfigPlugin",
  //         (compilation, callback) => {
  //           const content = fs.readFileSync(
  //             path.resolve(__dirname, "config.json"),
  //             "utf8"
  //           );
  //           const json = JSON.parse(content);
  //           compilation.assets["config.json"] = {
  //             source: () => JSON.stringify(json),
  //             size: () => content.length,
  //           };

  //           callback();
  //         }
  //       );
  //     },
  //   });

  //   return config;
  // },
};

export default withAntdLess(nextConfig);
