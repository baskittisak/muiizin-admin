import mock_hat from "../../../assets/image/mock_hat.png";

export const defaultProductInfo = {
  name: {
    th: "",
    en: "",
  },
  owner: {
    th: "",
    en: "",
  },
  category: "",
  price: "",
  status: "",
};

export const defaultOption = {
  enable: null,
  size: false,
  color: false,
};

export const defaultOptionSize = [{ name: "" }, { name: "" }];

export const defaultOptionColor = [
  {
    name: {
      th: "",
      en: "",
    },
    code: "",
    images: [],
  },
  {
    name: {
      th: "",
      en: "",
    },
    code: "",
    images: [],
  },
];

export const mockProduct = [
  {
    key: "1",
    name: "กระเป๋ากระจูด จ.ระยอง คนพื้นเมืองทำเพื่อ คนเมือง",
    category: "กระเป๋า",
    price: 850,
    status: "พร้อมส่ง",
    updatedTime: "01/02/2022",
    image: mock_hat,
  },
  {
    key: "2",
    name: "หมอนอิง จ.กาญจนบุรี อิงของเก่าให้เข้า ยุคใหม่",
    category: "หมอน",
    price: 650,
    status: "พรีออเดอร์",
    updatedTime: "01/02/2022",
    image: mock_hat,
  },
  {
    key: "3",
    name: "OTOP SELECT หมวกแก๊ปผ้าไหมแท้​ทอมือ",
    category: "หมวก",
    price: 1500,
    status: "พรีออเดอร์",
    updatedTime: "01/02/2022",
    image: mock_hat,
  },
  {
    key: "4",
    name: "กระเป๋ากระจูด จ.ระยอง คนพื้นเมืองทำเพื่อ คนเมือง",
    category: "กระเป๋า",
    price: 850,
    status: "พร้อมส่ง",
    updatedTime: "01/02/2022",
    image: mock_hat,
  },
  {
    key: "5",
    name: "หมอนอิง จ.กาญจนบุรี อิงของเก่าให้เข้า ยุคใหม่",
    category: "หมอน",
    price: 650.0,
    status: "พรีออเดอร์",
    updatedTime: "01/02/2022",
    image: mock_hat,
  },
  {
    key: "6",
    name: "OTOP SELECT หมวกแก๊ปผ้าไหมแท้​ทอมือ",
    category: "หมวก",
    price: 1500.0,
    status: "พรีออเดอร์",
    updatedTime: "01/02/2022",
    image: mock_hat,
  },
];
