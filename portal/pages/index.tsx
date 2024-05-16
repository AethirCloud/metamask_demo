"use client"

import Image from "next/image";
import styles from "@/styles/index.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccountEffect, useDisconnect, useAccount, useChainId, useSwitchChain, } from "wagmi";
import React, { useEffect, useState, Suspense, startTransition } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "@/next-i18next.config.mjs";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { message, Select } from 'antd';
import { getChaim } from './api/claim'
import ContractAbi from "../abi/ContractAbi.json";
export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["common"],
      nextI18nConfig,
      nextI18nConfig.i18n.locales
    )),
  },
});

export default function Home() {
  const { t } = useTranslation<"common">("common");
  const router = useRouter();
  const status = 0;
  const account = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const contractAddress = "0xF6D9C101ceeA72655A13a8Cf1C88c1949Ed399bc";
  useAccountEffect({
    onConnect: async (data) => {
      console.log("success wallet!", data);
    },
    onDisconnect() {
      console.log("out wallet");
    },
  });
  useEffect(() => {
    initWeb3();
  }, [])
  const initWeb3 = () => {
    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      const provider = new ethers.providers.Web3Provider(web3Provider);
      var currentProvider = web3.currentProvider;
      var Web3 = web3js.getWeb3();
      web3 = new Web3();
      web3.setProvider(currentProvider);
    }
  }
  const changeSubmitClaim = async () => {
    // const res: any = await submitClaim({ athForm: Number(claim), athToClaim: receive, athToFee: 5, type: selectedOption });

    const res: any = await getChaim({
      "address": account.address,
      "cliff_seconds": 10,
      "order_id": 15000000001,
      "amount": 100,
      "expiry_timestamp": 1715569010
    });
    console.log('res--', res)
    if (res?.code === 0) {
      const { orderId, cliffSecond, amount, expiryTimestamp, signs } = res?.data;

      handelClaim(orderId, cliffSecond, amount, expiryTimestamp, signs)
    }
  };
  const handelClaim = async (orderId: any, cliffSecond: any, amount: any, expiryTimestamp: any, signs: any) => {
    console.log('claim')
    try {
      if (chainId != 421614) {
        await switchChain({ chainId: 421614 });
        return false;
      }
    } catch (err: any) {
      message.error(err?.message)
    }

    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      const provider = new ethers.providers.Web3Provider(web3Provider);
      var currentProvider = web3.currentProvider;
      var Web3 = web3js.getWeb3();
      web3 = new Web3();
      web3.setProvider(currentProvider);

      try {
        const smartContract = await new web3.eth.Contract(
          ContractAbi,
          contractAddress
        );
        console.log('smartContract==', smartContract)
        const status = await smartContract.methods
          .claim(
            orderId, cliffSecond, expiryTimestamp, amount, signs
          )
          .send({ from: account.address, gas: 3000000 });
        message.success('Claimed success!');
      } catch (err: any) {
        console.log('err', err)
        message.error(err?.message)
      }
    }
  };
  return (
    <main className={`flex min-h-screen flex-col ${styles.box}`}>
      <div className="mt-10 flex justify-center">
        <ConnectButton />

        <button
          className="btn btn-sm rounded-full btn-outline w-[131px] h-[40px] bg-[#14382D] text-[#FFFFFF] text-[16px] px-[16px] items-center disabled:bg-[#F5F5F5] disabled:text-[#BFBFBF] disabled:border-[#D9D9D9]"
          onClick={changeSubmitClaim}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M14.1547 13.425L13.5266 9.55C13.5172 9.48906 13.4641 9.44531 13.4031 9.44531H9.31563C9.25469 9.44531 9.20156 9.48906 9.19219 9.55L8.56406 13.425C8.5625 13.4313 8.5625 13.4391 8.5625 13.4453C8.5625 13.5141 8.61875 13.5703 8.6875 13.5703H14.0312C14.0375 13.5703 14.0453 13.5703 14.0516 13.5688C14.1187 13.5578 14.1656 13.4938 14.1547 13.425V13.425ZM6.80781 9.55C6.79844 9.48906 6.74531 9.44531 6.68437 9.44531H2.59687C2.53594 9.44531 2.48281 9.48906 2.47344 9.55L1.84531 13.425C1.84375 13.4313 1.84375 13.4391 1.84375 13.4453C1.84375 13.5141 1.9 13.5703 1.96875 13.5703H7.3125C7.31875 13.5703 7.32656 13.5703 7.33281 13.5688C7.40156 13.5578 7.44687 13.4938 7.43594 13.425L6.80781 9.55V9.55ZM5.34375 8.19531H10.6875C10.6938 8.19531 10.7016 8.19531 10.7078 8.19375C10.7766 8.18281 10.8219 8.11875 10.8109 8.05L10.1828 4.175C10.1734 4.11406 10.1203 4.07031 10.0594 4.07031H5.97188C5.91094 4.07031 5.85781 4.11406 5.84844 4.175L5.22031 8.05C5.21875 8.05625 5.21875 8.06406 5.21875 8.07031C5.21875 8.13906 5.275 8.19531 5.34375 8.19531Z" className={`${status != '1' ? "fill-[gray]" : "fill-[#FFF]"}`} />
          </svg>
          {t("Claim")}
        </button>
      </div>
    </main>
  );
}
