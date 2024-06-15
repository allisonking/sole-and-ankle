import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const VARIANTS = {
  "on-sale": {
    flag: "Sale",
    backgroundColor: COLORS.primary,
  },
  "new-release": {
    flag: "Just Released!",
    backgroundColor: COLORS.secondary,
  },
  default: {
    flag: undefined,
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const flag = VARIANTS[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant === "on-sale" ? <SaleFlag>Sale</SaleFlag> : null}
        {variant === "new-release" ? <NewFlag>Just Released!</NewFlag> : null}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price strikethrough={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  background-color: var(--background-color);
  color: ${COLORS.white};
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px 12px;
  border-radius: 2px;
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) => (p.strikethrough ? "line-through" : "auto")};
  color: ${(p) => (p.strikethrough ? COLORS.gray[700] : "inherit")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
