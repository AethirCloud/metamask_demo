/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-13 18:35:56
 */
import { useCallback } from "react";

const usePurchaseLicense = () => {
  const handlePurchase = useCallback(() => {
    window.open("https://checker.aethir.com", "_blank");
  }, []);

  return { handlePurchase };
};

export default usePurchaseLicense;
