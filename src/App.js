import { memo, useMemo } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/swrService";
import { useAuthContext } from "./store/AuthContext";
import { LoadingIcon } from "./style/common";
import Layout from "./center_components/Layout";
import PageRoutes from "./resource/PageRoutes";
import Auth from "./resource/Auth";
import th_TH from "antd/lib/locale/th_TH";
import "dayjs/locale/th";

const App = () => {
  const { pageLoading, isLogin } = useAuthContext();

  const app = useMemo(() => {
    if (isLogin) {
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
    } else {
      return <Auth />;
    }
  }, [isLogin]);

  if (pageLoading) return <LoadingIcon />;

  return app;
};

export default memo(App);
