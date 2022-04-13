import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Cards from '../components/Cards';
import ShareCards from '../components/ShareCards';
import { LOAD_CARDS_SUCCESS } from '../reducers/card';
import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS } from '../reducers/user';
import Divider from '../components/Divider';
import CardForm from '../components/CardForm';
import CardDetail from '../components/CardDetail';
import { tokenApi } from '../api/user';
import { getCardsApi, getSharedCards } from '../api/card';

const Container = styled.main`
  width: 100%;
  margin: auto;
  position: relative;
  .studyBtn {
    position: absolute;
    border: none;
    font-size: 17px;
    width: 130px;
    height: 45px;
    font-weight: 700;
    color: white;
    background-color: #00b894;
    border-radius: 5px;
    box-shadow: 5px 6px 16px -7px #000000;
    right: 1.1rem;
    cursor: pointer;
  }
`;

function Home() {
  const dispatch = useDispatch();
  const { mainCards, isLoadCards, isDetail } = useSelector(
    (state) => state.card,
  );

  const getToken = useQuery('getToken', tokenApi, {
    retry: false,
  });
  const getMainCards = useQuery('getCards', getCardsApi, {
    retry: false,
  });
  const [isPostCard, setPostCard] = useState(false);

  useEffect(() => {
    if (getToken.status === 'error') {
      console.error(getToken.error);
      dispatch({
        type: LOG_OUT_SUCCESS,
      });
    } else if (getToken.status === 'success') {
      // 로그인 성공시 공유된카드 불러오기
      getSharedCards().then((cbData) => {
        const SharedIdArr = cbData.data.Shared.map((card) => card.id);
        const userInfo = {
          ...cbData.data,
          SharedIdArr,
        };
        dispatch({
          type: LOG_IN_SUCCESS,
          data: userInfo,
        });
      });
    }
  }, [getToken.status]);

  useEffect(() => {
    if (!isLoadCards) {
      if (getMainCards.status === 'success') {
        const customCards = getMainCards.data.data.map((data) => {
          const { id, question, answer, Likers } = data;
          const { username } = data.User;
          const newData = {
            userId: data.User.id,
            id,
            question,
            answer,
            Likers,
            username,
          };
          return newData;
        });
        dispatch({
          type: LOAD_CARDS_SUCCESS,
          data: customCards,
        });
      } else if (getMainCards.status === 'error') {
        console.error(getMainCards.error);
      }
    }
  }, [getMainCards.status]);

  return (
    <Container>
      <Divider title="학습 중" />
      <ShareCards />
      <Divider title="문제집" />
      {isDetail ? <CardDetail cardInfo={isDetail} /> : null}
      {isPostCard ? <CardForm handlePostCard={setPostCard} /> : null}
      <Cards cardsInfo={mainCards} handlePostCard={setPostCard} />
    </Container>
  );
}

export default Home;
