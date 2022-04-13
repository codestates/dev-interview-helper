import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import MyCards from '../components/myCards';
import CardDetail from '../components/CardDetail';
import { SELECT_ALL_CARDS, UNSELECT_ALL_CARDS } from '../reducers/card';
import { tokenApi } from '../api/user';
import { getSharedCards } from '../api/card';
import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS } from '../reducers/user';
import Practice from '../components/Practice';

const ButtonContainer = styled.div`
  text-align: center;
  button {
    border: none;
    font-size: 17px;
    width: 130px;
    height: 45px;
    font-weight: 700;
    color: white;
    background-color: #00b894;
    border-radius: 5px;
    box-shadow: 5px 6px 16px -7px #000000;
    margin-left: 2rem;
    margin-top: 1rem;
  }
  .abled-btn {
    background-color: #3498db;
  }
  .disabled-btn {
    background-color: #95a5a6;
  }
  h3 {
    margin-top: 1rem;
  }
  .unseleteAll-btn {
    background-color: #f39c12;
  }
`;
function Study() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { isDetail, selectedCardsId, isSelectAll } = useSelector(
    (state) => state.card,
  );
  const getToken = useQuery('getToken', tokenApi, {
    retry: false,
  });
  const [isPratice, setIsPratice] = useState(false);
  const [customCards, setCustomCards] = useState([]);
  useEffect(() => {
    if (me) {
      setCustomCards(
        me.Shared.map((cardInfo) => {
          const customCardInfo = {
            ...cardInfo,
            username: cardInfo.User.username,
          };
          return customCardInfo;
        }),
      );
    }
  }, [me]);

  useEffect(() => {
    if (me) {
      if (selectedCardsId.length === me.Shared.length) {
        dispatch({
          type: SELECT_ALL_CARDS,
          data: selectedCardsId,
        });
      }
    }
  }, [selectedCardsId.length]);

  useEffect(() => {
    if (getToken.status === 'error') {
      console.error(getToken.error);
      dispatch({
        type: LOG_OUT_SUCCESS,
      });
      navigate('/');
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

  const handleSelectAll = () => {
    const seletedCardsId = me.Shared.map((cardInfo) => cardInfo.id);
    dispatch({
      type: SELECT_ALL_CARDS,
      data: seletedCardsId,
    });
  };
  const handleUnSelectAll = () => {
    dispatch({
      type: UNSELECT_ALL_CARDS,
    });
  };

  const handlePractice = (data) => {
    setIsPratice(data);
  };
  if (getToken.status === 'loading') {
    return <h1>Loading....</h1>;
  }
  if (me && !isPratice) {
    return (
      <div>
        <ButtonContainer>
          {isSelectAll ? (
            <button
              onClick={handleUnSelectAll}
              type="button"
              className="unseleteAll-btn"
            >
              전체선택취소
            </button>
          ) : (
            <button
              onClick={handleSelectAll}
              type="button"
              className="seleteAll-btn"
            >
              전체선택
            </button>
          )}

          <button
            type="button"
            disabled={!selectedCardsId.length > 0}
            onClick={() => handlePractice(true)}
            className={`study-btn ${
              selectedCardsId.length > 0 ? 'abled-btn' : 'disabled-btn'
            }`}
          >
            학습하기
          </button>
          <h3>{selectedCardsId.length}개 카드를 선택했습니다</h3>
        </ButtonContainer>

        {isDetail ? <CardDetail cardInfo={isDetail} /> : null}
        <MyCards cardsInfo={customCards} cardRole="study" />
      </div>
    );
  }
  if (me && isPratice) {
    return (
      <Practice
        handlePractice={handlePractice}
        selectedCardsId={selectedCardsId}
        sharedCards={me.Shared}
      />
    );
  }
}

export default Study;
