import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Card from './Card';
import CardsContainner from '../styles/CardsStyle';

const Image = styled.img`
  display: block;
  width: 500px;
  height: 355px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
`;
function ShareCards() {
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.user);
  return (
    <CardsContainner>
      {me ? (
        <>
          {' '}
          <button
            onClick={() => navigate('/study')}
            className="studyBtn"
            type="button"
          >
            학습하러 가기
          </button>
          {me.Shared.map((cardInfo) => {
            const customCardInfo = {
              ...cardInfo,
              username: cardInfo.User.username,
            };
            return (
              <Card
                key={cardInfo.id}
                cardRole="share"
                cardInfo={customCardInfo}
              />
            );
          })}
        </>
      ) : (
        <ImageBox>
          <h3>로그인 후 나만의 문제집을 만들어 보세요.</h3>
          <Image
            src="./images/13210.jpg"
            className="decoration"
            alt="배경이미지"
          />
        </ImageBox>
      )}
    </CardsContainner>
  );
}

export default ShareCards;
