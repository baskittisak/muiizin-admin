import mock_banner_1 from "../../../assets/image/mock_banner_1.png";
import mock_banner_2 from "../../../assets/image/mock_banner_2.png";
import mock_banner_3 from "../../../assets/image/mock_banner_3.png";
import mock_banner_4 from "../../../assets/image/mock_banner_4.png";
import mock_banner_5 from "../../../assets/image/mock_banner_5.png";

export const mockBanner = [
  {
    key: "1",
    image: mock_banner_1,
    name: "Banner_1",
    status: "เตรียมใช้งาน",
    startDate: "01/03/2022",
    endDate: "31/03/2022",
    createdTime: "27/02/2022",
  },
  {
    key: "2",
    image: mock_banner_2,
    name: "Banner_2",
    status: "กำลังใช้งาน",
    startDate: "01/03/2022",
    endDate: "31/03/2022",
    createdTime: "27/02/2022",
  },
  {
    key: "3",
    image: mock_banner_3,
    name: "Banner_3",
    status: "กำลังใช้งาน",
    startDate: "01/03/2022",
    endDate: "31/03/2022",
    createdTime: "27/02/2022",
  },
  {
    key: "4",
    image: mock_banner_4,
    name: "Banner_4",
    status: "กำลังใช้งาน",
    startDate: "01/03/2022",
    endDate: "31/03/2022",
    createdTime: "27/02/2022",
  },
  {
    key: "5",
    image: mock_banner_5,
    name: "Banner_5",
    status: "หมดอายุ",
    startDate: "15/01/2022",
    endDate: "31/01/2022",
    createdTime: "14/01/2022",
  },
];

export const defaultBannerData = {
  name: "",
  image: {
    en: [],
    th: [],
  },
  date: {
    start: null,
    end: null,
  },
  isProduct: false,
  products: [],
};
