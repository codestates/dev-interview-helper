import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import CardsContainner from '../styles/CardsStyle';

function Cards({ cardsInfo, handlePostCard }) {
  const { me } = useSelector((state) => state.user);
  console.log(cardsInfo);
  const handleStudyBtn = () => {
    handlePostCard(true);
  };
  return (
    <CardsContainner>
      {me ? (
        <button onClick={handleStudyBtn} className="studyBtn" type="button">
          문제 추가하기
        </button>
      ) : null}
      {cardsInfo.map((cardInfo) => (
        <Card key={cardInfo.id} cardRole="main" cardInfo={cardInfo} />
      ))}
    </CardsContainner>
  );
}

export default Cards;
