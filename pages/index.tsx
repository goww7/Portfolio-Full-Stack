import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import "@/utils/gsap";

import Head from "@/components/common/Head";
import Layer from "@/components/common/Layer";
import Lenis from "@/components/Lenis";
import LandingPage from "@/components/pages/home/Index";
import Noise from "@/components/ui/noise";

import nextI18NextConfig from "../next-i18next.config.js";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head
        title={t("head.home.title")}
        description={t("head.home.description")}
        keywords={t("head.home.keywords")}
        author={t("head.home.author")}
        logo="/favicon.svg"
      />
      <Lenis>
        <Layer>
          <LandingPage />
          <Noise />
        </Layer>
      </Lenis>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
    }
  };
}
