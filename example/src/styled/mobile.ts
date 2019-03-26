import { css } from '../styled';

export const mobile = (inner: any) => css`
  @media (max-width: ${1000 / 16}em) {
    ${inner};
  }
`;

export const phone = (inner: any) => css`
  @media (max-width: ${650 / 16}em) {
    ${inner};
  }
`;
