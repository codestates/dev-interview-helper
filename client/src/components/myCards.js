import React from 'react';
import Card from './Card';
import CardsContainner from '../styles/CardsStyle';

function MyCards({ cardsInfo, cardRole }) {
  return (
    <CardsContainner>
      {cardsInfo.map((cardInfo) => (
        <Card key={cardInfo.id} cardRole={cardRole} cardInfo={cardInfo} />
      ))}
    </CardsContainner>
  );
}

export default MyCards;
