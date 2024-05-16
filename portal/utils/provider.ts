/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2023-04-13 09:49:55
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-10 17:59:41
 */
import { ethers } from "ethers";
import { goerli } from "@wagmi/core/chains";
export const PROVIDER = new ethers.providers.AlchemyProvider(
	goerli.id,
	process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);
