/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-03-25 11:46:23
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-14 19:12:01
 */
import "@/styles/globals.css";
// import "../styles/styles.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  getDefaultWallets,
  Locale,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
const { wallets } = getDefaultWallets();
const avalanche = {
  id: 421614,
  name: "Arbitrum Sepolia",
  iconUrl: "/img/Arbitrum.png",
  iconBackground: "#fff",
  nativeCurrency: {
    name: "Arbitrum Sepolia",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    // default: { http: ["https://endpoints.omniatech.io/v1/arbitrum/sepolia/public"] },
    default: { http: ["https://arbitrum-sepolia.blockpi.network/v1/rpc/public"] },
  },
  blockExplorers: {
    default: {
      name: "Arbitrum Sepolia",
      url: "https://testnet.bscscan.com",
    },
  },
  contracts: {
    multicall3: {
      address: "0x2C1c010538e8A7700b741a9c9990e64825506617",
      blockCreated: 421614,
    },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "5ebafa702e0e6da909e1b6b40333eebf",
  chains: [avalanche],
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  // chains: [
  //   mainnet,
  //   polygon,
  //   optimism,
  //   arbitrum,
  //   base,
  //   ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  // ],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../next-i18next.config.mjs";
import { ConfigProvider } from "antd";
import theme from "../public/theme/themeConfig";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider {...pageProps}>
          <ConfigProvider theme={theme}>
            <Component {...pageProps} />
          </ConfigProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const I18nApp = appWithTranslation(App, nextI18nConfig);

export default I18nApp;
