import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import PraticeCard from './PraticeCard';

const Container = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

function Practice({ selectedCardsId, sharedCards }) {
  const [praticeCards, setPraticeCards] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setPraticeCards(
      sharedCards.filter((card) => selectedCardsId.includes(card.id)),
    );
  }, []);

  return (
    <Container>
      <Slider {...settings}>
        {praticeCards.map((cardInfo) => (
          <PraticeCard key={cardInfo.id} cardInfo={cardInfo} />
        ))}
      </Slider>
    </Container>
  );
}

export default Practice;
