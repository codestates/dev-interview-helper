import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// import { LOAD_MY_CARDS_SUCCESS } from '../reducers/card';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import MyCards from '../components/myCards';
// eslint-disable-next-line import/no-named-as-default
import InfoChange from '../components/InfoChange';
import { getMyCardsApi, getSharedCards } from '../api/card';
import { tokenApi } from '../api/user';
import { LOAD_MY_CARDS_SUCCESS } from '../reducers/card';
import { LOG_IN_SUCCESS } from '../reducers/user';
import CardDetail from '../components/CardDetail';
import EditCardForm from '../components/EditCardForm';

const Background = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const MyPageComponent = styled.div`
  width: 100%;
  .myPage-title {
    text-align: center;
    padding: 20px;
    .title {
      padding: 10px;
    }
  }
  .bettwen {
    margin-top: 20px;
    background: black;
    padding-top: 1px;
  }
`;
const MyInfo = styled.section`
  @media screen and (max-width: 960px) {
    flex-wrap: wrap;
  }
  background: whitesmoke;
  display: flex;
  margin: auto;
  width: 80%;
  border-radius: 5px;
  font-weight: 700;
  padding: 15px 30px;
  align-items: center;
  justify-content: space-around;
  font-weight: 700;
  .left-profile {
    display: flex;
    min-width: 400px;
  }
  .sub-title {
    font-size: 25px;
    padding: 20px 10px;
    background: #0a174e;
    color: white;
    border-radius: 5px;
    margin-right: 20px;
  }
  .user-info {
    margin-right: 10px;
  }
  button {
    font-weight: 700;
    color: white;
    padding: 10px 20px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
    border: none;
    background: #0078ff;

    margin-top: 5px;
  }
  .Edit-btn {
    margin-left: 5px;
  }

  button:active {
    position: relative;
    top: 1px;
  }
  p {
    padding: 5px;
    margin-right: 15px;
  }
`;

const SetInFo = styled.div`
  display: flex;
`;

const MyStudyCards = styled.section`
  display: flex;
  justify-content: center;
  font-weight: 700;
`;
// { cardsInfo }
function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { myCards, isLoadMyCards, isDetail, isEditCard } = useSelector(
    (state) => state.card,
  );
  const [info, setInfo] = useState(false);

  const getToken = useQuery('getToken', tokenApi, {
    retry: false,
  });

  const getMyCards = useQuery('getMyCards', getMyCardsApi, {
    retry: false,
  });
  // 로드 상태가 true 가 된 상태! 카드 보여?

  useEffect(() => {
    if (!isLoadMyCards) {
      if (getMyCards.status === 'error') {
        console.error(getMyCards.error);
      } else if (getMyCards.status === 'success') {
        const customCards = getMyCards.data.data.map((data) => {
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
          type: LOAD_MY_CARDS_SUCCESS,
          data: customCards,
        });
      }
    }
  }, [getMyCards.status]);

  useEffect(() => {
    if (getToken.status === 'error') {
      console.error(getToken.error);
      navigate('/');
    } else if (getToken.status === 'success') {
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

  const handleInfoChange = () => {
    setInfo(!info);
  };
  if (getToken.status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (me) {
    return (
      <Background>
        {isDetail ? <CardDetail cardInfo={isDetail} /> : null}
        {isEditCard ? <EditCardForm card={isEditCard} /> : null}
        <MyPageComponent>
          <div className="myPage-title">
            <h1 className="title">My Page</h1>
            <h3>{me.username} 님, 환영합니다.</h3>
          </div>
          <MyInfo>
            <div className="left-profile">
              <div className="sub-title">
                <p>
                  my <br />
                  profile
                </p>
              </div>
              <div className="user-info">
                <p>이름 : {me.username}</p>
                <p>이메일 : {me.email}</p>
                <button
                  className="Edit-btn"
                  onClick={handleInfoChange}
                  type="button"
                >
                  info edit
                </button>
              </div>
            </div>
            <div className="Input-info">
              <SetInFo> {info ? <InfoChange /> : null}</SetInFo>
            </div>
          </MyInfo>

          <div className="myPage-title">
            <h1 className="title">Study Cards Storage</h1>
          </div>
          <MyCards cardsInfo={myCards} cardRole="mine" />
          <MyStudyCards />
        </MyPageComponent>
      </Background>
    );
  }
}
export default MyPage;
