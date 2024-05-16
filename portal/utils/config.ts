/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-05-05 13:27:28
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-05 13:27:40
 */
import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})