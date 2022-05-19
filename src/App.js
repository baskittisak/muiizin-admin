import { memo } from "react";
import Layout from "./center_components/Layout";
import PageRoutes from "./resource/PageRoutes";

const App = () => {
  return (
    <Layout>
      <PageRoutes />
    </Layout>
  );
};

export default memo(App);
