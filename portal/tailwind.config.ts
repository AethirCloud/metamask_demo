/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-03-25 11:46:23
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-26 15:20:27
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Hedvig: ['Hedvig Letters Sans']
      },
    },
    screens:{
      'lg':'1133px',
      'xl': '1440px',
      '2xl':'1600px'
    }
  },
  plugins: [require("daisyui")],
  // corePlugins: {
  //   preflight: false, // 添加这一行
  // },
};
export default config;
