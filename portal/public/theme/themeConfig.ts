/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-03-29 14:59:13
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-11 16:30:00
 */
// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
  },
  components: {
    Select: {
      optionSelectedColor: "#434343",
      optionActiveBg: "rgba(245, 245, 245, 0.60)",
      optionSelectedBg: "#EEF9E5",
    },
    Table: {
      headerBg: "#1C2925",
      headerSplitColor: "#F0F0F0",
      headerColor: "#FFF",
      rowHoverBg: "#EEF9E5",
      footerColor: "#3C3C3C",
      bodySortBg: "#FFF",
      headerSortHoverBg: "#14382D",
      headerSortActiveBg: "#14382D"
    },
    Button: {
      defaultBorderColor: "#D9D9D9",
      defaultHoverBg: "#092B00",
      defaultHoverColor: "#FAFAFF",
      defaultColor: "#434343",
      defaultBg: "#FBFBFF",
      defaultActiveBg: "#FBFBFF",
      primaryColor: "#434343",
      defaultActiveBorderColor: "#434343",
      defaultHoverBorderColor: "#434343"
    },
    Input: {
      activeShadow: "#FFFFFF",
      activeBorderColor: "#1C2925",
      hoverBorderColor: "#1C2925",
    },
    Pagination: {
      itemInputBg: "#4E3395",
      itemActiveBg: "transparent",
      itemSize: 26,
    },
  },
};

export default theme;
