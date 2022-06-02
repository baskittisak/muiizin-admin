import { memo } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/swrService";
import Layout from "./center_components/Layout";
import PageRoutes from "./resource/PageRoutes";
import th_TH from "antd/lib/locale/th_TH";
import "dayjs/locale/th";

const App = () => {
  return (
    <Layout>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          errorRetryCount: 2,
          fetcher,
        }}
      >
        <ConfigProvider locale={th_TH}>
          <PageRoutes />
        </ConfigProvider>
      </SWRConfig>
    </Layout>
  );
};

export default memo(App);
