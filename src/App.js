import { memo } from "react";
import { ConfigProvider } from "antd";
import Layout from "./center_components/Layout";
import PageRoutes from "./resource/PageRoutes";
import th_TH from "antd/lib/locale/th_TH";
import "dayjs/locale/th";

const App = () => {
  return (
    <Layout>
      <ConfigProvider locale={th_TH}>
        <PageRoutes />
      </ConfigProvider>
    </Layout>
  );
};

export default memo(App);
