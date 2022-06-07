import styled from "styled-components";
import Space from "antd/lib/space";
import Spin from "antd/lib/spin";

export const Box = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction && direction};
  justify-content: ${({ justify }) => justify && justify};
  align-items: ${({ align }) => align && align};
`;

export const SpaceContainer = styled(Space)`
  width: 100%;
`;

export const Action = styled(Box)`
  cursor: pointer;
  width: 33px;
  height: 33px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

export const Loading = styled(Spin)`
  max-height: initial !important;

  > span {
    font-size: 24px;
    color: #044700;
  }
`;