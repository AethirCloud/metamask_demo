/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-26 18:22:41
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-11 17:26:28
 */
import styles from '@/styles/header.module.less'
import { useRouter } from 'next/router';
import { useAccountEffect, useDisconnect, useBalance } from "wagmi";
import React, { useState, useEffect, useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import ProgressBar from "./ProgressBar";
import { Tooltip } from 'antd'
import useSynapsVerification from '@/hooks/useSynapsVerification';
import localforage from 'localforage';
const Header = (props: any) => {
  const { MyAccount } = props;
  const { t } = useTranslation<"common">("common");
  const router = useRouter();
  const currentPath = router.pathname;
  const routeName = currentPath.split('/').pop();
  const { handleOpen, status, originalMessage } = useSynapsVerification();
  console.log('headerstatus--', status)
  const [total, setTotal] = useState<any>(0);
  const { disconnect } = useDisconnect();
  useEffect(() => {
    localforage.getItem("total").then((value: any) => {
      console.log('111', total)
      setTotal(value);
    })
  }, [])
  useAccountEffect({
    onDisconnect() {
      router.replace('/')
      localforage.removeItem("token");
    },
  });
  return (
    <>
      <div className={`${styles.header} min-w-full`}>
        <div className={`${styles.title}`}>{routeName && routeName !== 'operators' ? routeName.charAt(0).toUpperCase() + routeName.slice(1) : ''}
          {routeName == 'licenses' && (
            <>
              <span className="font-normal text-[#4B5F30] text-[40px] px-1"
                style={{
                  textShadow: '0px 0px 6px rgba(215, 254, 81, 0.30)',
                }}>

                {total}
              </span>
              <span className=" font-normal text-base  text-[#989898] inline-block text-[12px]">
                {t("Licenses.Title")}
              </span>
            </>
          )}
          {routeName == 'operators' && (<>Node Operator List</>)}
        </div>
        <div className="flex justify-center px-1.5">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          className="btn btn-outline rounded-full group"
                          onClick={openConnectModal}
                        >
                          {t("ConnectWallet")}
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:stroke-white"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.8354 11.4082H15.8354C15.007 11.4082 14.3354 12.0798 14.3354 12.9082C14.3354 13.7366 15.007 14.4082 15.8354 14.4082H19.8354V11.4082ZM15.8354 9.9082C14.1786 9.9082 12.8354 11.2513 12.8354 12.9082C12.8354 14.5651 14.1786 15.9082 15.8354 15.9082H20.3354C20.8877 15.9082 21.3354 15.4605 21.3354 14.9082V10.9082C21.3354 10.3559 20.8877 9.9082 20.3354 9.9082H15.8354Z"
                              fill="black"
                            />
                            <path
                              d="M4.83545 18.4082V7.4082H18.8354V9.9082H20.3354V7.9082C20.3354 6.9082 19.8354 5.9082 18.3354 5.9082H5.33545C4.33545 5.9082 3.33545 6.4082 3.33545 7.9082L3.33545 17.9082C3.33545 19.4082 4.33545 19.9082 5.33545 19.9082H18.3354C19.3354 19.9082 20.3354 19.4082 20.3354 17.9082V15.9082H18.8354V18.4082H4.83545Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }
                    return (
                      <div style={{ display: "flex" }}>
                        <button
                          onClick={openChainModal}
                          className="btn rounded-full bg-[#FFFFFF] text-[12px] font-normal text-[#1C2925] hover:bg-[#F1F1F1] border-0"
                        >
                          {chain.hasIcon && (
                            <div>
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? "Chain icon"}
                                  src="/img/Arbitrum.png"
                                  width={24}
                                  height={24}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <g clipPath="url(#clip0_4795_5200)">
                              <path d="M13.269 6.11108L8.26904 10.8333L3.26904 6.11108" stroke="#1C2925" strokeWidth="1.63112" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_4795_5200">
                                <rect width="16" height="15.1111" fill="white" transform="translate(0.269043 0.444458)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>

                        <button
                          onClick={openAccountModal}
                          className="btn rounded-full bg-[#FFFFFF] ml-[27px] text-[12px] font-normal text-[#1C2925] hover:bg-[#F1F1F1] border-0"
                        >
                          <Image
                            alt=""
                            src="/img/image96.png"
                            width={26}
                            height={26}
                          />
                          {account.displayName}
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <g clipPath="url(#clip0_4795_5200)">
                              <path d="M13.269 6.11108L8.26904 10.8333L3.26904 6.11108" stroke="#1C2925" strokeWidth="1.63112" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_4795_5200">
                                <rect width="16" height="15.1111" fill="white" transform="translate(0.269043 0.444458)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          {status == '0' && (<Tooltip title="Please complete KYC before claiming!">
            <button className="btn bg-[#262626] ml-[27px] rounded-[10px] text-[16px] font-normal text-[#FFF] hover:bg-[#FFF] hover:text-[#434343]"
              onClick={handleOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.5 3.5H12V2.625C12 2.55625 11.9438 2.5 11.875 2.5H11C10.9312 2.5 10.875 2.55625 10.875 2.625V3.5H8.5625V2.625C8.5625 2.55625 8.50625 2.5 8.4375 2.5H7.5625C7.49375 2.5 7.4375 2.55625 7.4375 2.625V3.5H5.125V2.625C5.125 2.55625 5.06875 2.5 5 2.5H4.125C4.05625 2.5 4 2.55625 4 2.625V3.5H1.5C1.22344 3.5 1 3.72344 1 4V13C1 13.2766 1.22344 13.5 1.5 13.5H14.5C14.7766 13.5 15 13.2766 15 13V4C15 3.72344 14.7766 3.5 14.5 3.5ZM13.875 12.375H2.125V4.625H4V5.5C4 5.56875 4.05625 5.625 4.125 5.625H5C5.06875 5.625 5.125 5.56875 5.125 5.5V4.625H7.4375V5.5C7.4375 5.56875 7.49375 5.625 7.5625 5.625H8.4375C8.50625 5.625 8.5625 5.56875 8.5625 5.5V4.625H10.875V5.5C10.875 5.56875 10.9312 5.625 11 5.625H11.875C11.9438 5.625 12 5.56875 12 5.5V4.625H13.875V12.375ZM6.5 7.75H3.625C3.55625 7.75 3.5 7.80625 3.5 7.875V8.625C3.5 8.69375 3.55625 8.75 3.625 8.75H6.5C6.56875 8.75 6.625 8.69375 6.625 8.625V7.875C6.625 7.80625 6.56875 7.75 6.5 7.75ZM6.5 9.875H3.625C3.55625 9.875 3.5 9.93125 3.5 10V10.75C3.5 10.8188 3.55625 10.875 3.625 10.875H6.5C6.56875 10.875 6.625 10.8188 6.625 10.75V10C6.625 9.93125 6.56875 9.875 6.5 9.875ZM11.3156 7.10313L9.69687 9.34844L8.87187 8.20625C8.825 8.14062 8.75 8.10312 8.67031 8.10312H7.8125C7.71094 8.10312 7.65156 8.21875 7.71094 8.30156L9.49375 10.7734C9.51677 10.8054 9.54704 10.8314 9.58209 10.8493C9.61713 10.8673 9.65594 10.8766 9.69531 10.8766C9.73468 10.8766 9.77349 10.8673 9.80854 10.8493C9.84358 10.8314 9.87386 10.8054 9.89688 10.7734L12.475 7.2C12.5344 7.11719 12.475 7.00156 12.3734 7.00156H11.5156C11.4375 7 11.3625 7.03906 11.3156 7.10313Z" fill="white" stroke="currentColor" />
              </svg>
              KYC
            </button>
          </Tooltip>
          )}
          {status == '2' && (<Tooltip title={`KYC verification rejected because ${originalMessage}, please redo. `}>
            <button className="btn bg-[#262626] ml-[27px] rounded-[10px] text-[16px] font-normal text-[#FFF] hover:bg-[#FFF] hover:text-[#434343]"
              onClick={handleOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.5 3.5H12V2.625C12 2.55625 11.9438 2.5 11.875 2.5H11C10.9312 2.5 10.875 2.55625 10.875 2.625V3.5H8.5625V2.625C8.5625 2.55625 8.50625 2.5 8.4375 2.5H7.5625C7.49375 2.5 7.4375 2.55625 7.4375 2.625V3.5H5.125V2.625C5.125 2.55625 5.06875 2.5 5 2.5H4.125C4.05625 2.5 4 2.55625 4 2.625V3.5H1.5C1.22344 3.5 1 3.72344 1 4V13C1 13.2766 1.22344 13.5 1.5 13.5H14.5C14.7766 13.5 15 13.2766 15 13V4C15 3.72344 14.7766 3.5 14.5 3.5ZM13.875 12.375H2.125V4.625H4V5.5C4 5.56875 4.05625 5.625 4.125 5.625H5C5.06875 5.625 5.125 5.56875 5.125 5.5V4.625H7.4375V5.5C7.4375 5.56875 7.49375 5.625 7.5625 5.625H8.4375C8.50625 5.625 8.5625 5.56875 8.5625 5.5V4.625H10.875V5.5C10.875 5.56875 10.9312 5.625 11 5.625H11.875C11.9438 5.625 12 5.56875 12 5.5V4.625H13.875V12.375ZM6.5 7.75H3.625C3.55625 7.75 3.5 7.80625 3.5 7.875V8.625C3.5 8.69375 3.55625 8.75 3.625 8.75H6.5C6.56875 8.75 6.625 8.69375 6.625 8.625V7.875C6.625 7.80625 6.56875 7.75 6.5 7.75ZM6.5 9.875H3.625C3.55625 9.875 3.5 9.93125 3.5 10V10.75C3.5 10.8188 3.55625 10.875 3.625 10.875H6.5C6.56875 10.875 6.625 10.8188 6.625 10.75V10C6.625 9.93125 6.56875 9.875 6.5 9.875ZM11.3156 7.10313L9.69687 9.34844L8.87187 8.20625C8.825 8.14062 8.75 8.10312 8.67031 8.10312H7.8125C7.71094 8.10312 7.65156 8.21875 7.71094 8.30156L9.49375 10.7734C9.51677 10.8054 9.54704 10.8314 9.58209 10.8493C9.61713 10.8673 9.65594 10.8766 9.69531 10.8766C9.73468 10.8766 9.77349 10.8673 9.80854 10.8493C9.84358 10.8314 9.87386 10.8054 9.89688 10.7734L12.475 7.2C12.5344 7.11719 12.475 7.00156 12.3734 7.00156H11.5156C11.4375 7 11.3625 7.03906 11.3156 7.10313Z" fill="white" stroke="currentColor" />
              </svg>
              KYC
            </button>
          </Tooltip>
          )}
          {status == '3' && (
            <Tooltip title="KYC verification pending, please wait.">
              <button className="btn bg-[#595959] ml-[27px] rounded-[10px] text-[16px] font-normal text-[#FFF] hover:bg-[#FFF] hover:text-[#595959]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14.5 3.5H12V2.625C12 2.55625 11.9438 2.5 11.875 2.5H11C10.9312 2.5 10.875 2.55625 10.875 2.625V3.5H8.5625V2.625C8.5625 2.55625 8.50625 2.5 8.4375 2.5H7.5625C7.49375 2.5 7.4375 2.55625 7.4375 2.625V3.5H5.125V2.625C5.125 2.55625 5.06875 2.5 5 2.5H4.125C4.05625 2.5 4 2.55625 4 2.625V3.5H1.5C1.22344 3.5 1 3.72344 1 4V13C1 13.2766 1.22344 13.5 1.5 13.5H14.5C14.7766 13.5 15 13.2766 15 13V4C15 3.72344 14.7766 3.5 14.5 3.5ZM13.875 12.375H2.125V4.625H4V5.5C4 5.56875 4.05625 5.625 4.125 5.625H5C5.06875 5.625 5.125 5.56875 5.125 5.5V4.625H7.4375V5.5C7.4375 5.56875 7.49375 5.625 7.5625 5.625H8.4375C8.50625 5.625 8.5625 5.56875 8.5625 5.5V4.625H10.875V5.5C10.875 5.56875 10.9312 5.625 11 5.625H11.875C11.9438 5.625 12 5.56875 12 5.5V4.625H13.875V12.375ZM6.5 7.75H3.625C3.55625 7.75 3.5 7.80625 3.5 7.875V8.625C3.5 8.69375 3.55625 8.75 3.625 8.75H6.5C6.56875 8.75 6.625 8.69375 6.625 8.625V7.875C6.625 7.80625 6.56875 7.75 6.5 7.75ZM6.5 9.875H3.625C3.55625 9.875 3.5 9.93125 3.5 10V10.75C3.5 10.8188 3.55625 10.875 3.625 10.875H6.5C6.56875 10.875 6.625 10.8188 6.625 10.75V10C6.625 9.93125 6.56875 9.875 6.5 9.875ZM11.3156 7.10313L9.69687 9.34844L8.87187 8.20625C8.825 8.14062 8.75 8.10312 8.67031 8.10312H7.8125C7.71094 8.10312 7.65156 8.21875 7.71094 8.30156L9.49375 10.7734C9.51677 10.8054 9.54704 10.8314 9.58209 10.8493C9.61713 10.8673 9.65594 10.8766 9.69531 10.8766C9.73468 10.8766 9.77349 10.8673 9.80854 10.8493C9.84358 10.8314 9.87386 10.8054 9.89688 10.7734L12.475 7.2C12.5344 7.11719 12.475 7.00156 12.3734 7.00156H11.5156C11.4375 7 11.3625 7.03906 11.3156 7.10313Z" fill="white" stroke="currentColor" />
                </svg>
                KYC Pending Verification
              </button>
            </Tooltip>
          )}
          <div className={`dropdown dropdown-bottom dropdown-end ml-[28px]`}>
            <div tabIndex={0} role="button" className={`bg-transparent`}>

              <Image src={`${status == '1' ? '/img/image97.png' : status == '2' ? '/img/image97(3).png' : '/img/image97(2).png'}`} width={50} height={50} alt="" />
            </div>
            <div tabIndex={0} className={`dropdown-content z-[1] px-[24px] ${styles.dropdownCard} `}>
              <div className="p-[0] w-full">
                <div className={`flex justify-between items-center h-[53px] py-[16px] w-full`}>
                  <p className={`text-[16px] font-normal text-[#434343]`}>Personal Center</p>
                  {status == '0' && (<p className={`text-[12px] font-normal text-[#7CB305] ml-[30px]`}>Please complete KYC before claiming!</p>)}
                  {status == '3' && (
                    <p className={`text-[12px] font-normal text-[#7CB305] ml-[30px]`}>KYC verification pending, please wait</p>
                  )}
                  {status == '2' && (
                    <p className={`text-[12px] font-normal text-[#F5222D] ml-[30px]`}>KYC Verification Rejected</p>
                  )}
                  {status == '1' && (
                    <p className={`text-[12px] font-normal text-[#7CB305] ml-[30px] flex`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" className={`mr-[8px]`}>
                        <path d="M14.5 4H12V3.125C12 3.05625 11.9438 3 11.875 3H11C10.9312 3 10.875 3.05625 10.875 3.125V4H8.5625V3.125C8.5625 3.05625 8.50625 3 8.4375 3H7.5625C7.49375 3 7.4375 3.05625 7.4375 3.125V4H5.125V3.125C5.125 3.05625 5.06875 3 5 3H4.125C4.05625 3 4 3.05625 4 3.125V4H1.5C1.22344 4 1 4.22344 1 4.5V13.5C1 13.7766 1.22344 14 1.5 14H14.5C14.7766 14 15 13.7766 15 13.5V4.5C15 4.22344 14.7766 4 14.5 4ZM13.875 12.875H2.125V5.125H4V6C4 6.06875 4.05625 6.125 4.125 6.125H5C5.06875 6.125 5.125 6.06875 5.125 6V5.125H7.4375V6C7.4375 6.06875 7.49375 6.125 7.5625 6.125H8.4375C8.50625 6.125 8.5625 6.06875 8.5625 6V5.125H10.875V6C10.875 6.06875 10.9312 6.125 11 6.125H11.875C11.9438 6.125 12 6.06875 12 6V5.125H13.875V12.875ZM6.5 8.25H3.625C3.55625 8.25 3.5 8.30625 3.5 8.375V9.125C3.5 9.19375 3.55625 9.25 3.625 9.25H6.5C6.56875 9.25 6.625 9.19375 6.625 9.125V8.375C6.625 8.30625 6.56875 8.25 6.5 8.25ZM6.5 10.375H3.625C3.55625 10.375 3.5 10.4312 3.5 10.5V11.25C3.5 11.3188 3.55625 11.375 3.625 11.375H6.5C6.56875 11.375 6.625 11.3188 6.625 11.25V10.5C6.625 10.4312 6.56875 10.375 6.5 10.375ZM11.3156 7.60313L9.69687 9.84844L8.87187 8.70625C8.825 8.64063 8.75 8.60312 8.67031 8.60312H7.8125C7.71094 8.60312 7.65156 8.71875 7.71094 8.80156L9.49375 11.2734C9.51677 11.3054 9.54704 11.3314 9.58209 11.3493C9.61713 11.3673 9.65594 11.3766 9.69531 11.3766C9.73468 11.3766 9.77349 11.3673 9.80854 11.3493C9.84358 11.3314 9.87386 11.3054 9.89688 11.2734L12.475 7.7C12.5344 7.61719 12.475 7.50156 12.3734 7.50156H11.5156C11.4375 7.5 11.3625 7.53906 11.3156 7.60313Z" fill="#7CB305" />
                      </svg>
                      KYC Completed!
                    </p>)}
                </div>

              </div>
              <div className={`divider m-[0] h-[0]`}></div>
              <div className={`py-[24px] px-[12px] w-full`}>
                <ProgressBar data={MyAccount} />
              </div>
              <button className={`btn text-[16px] font-normal mb-[24px] btn-outline border-[#D9D9D9]`} onClick={() => disconnect()}>Log-out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header;