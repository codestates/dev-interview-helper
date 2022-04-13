import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { updateCardApi } from '../api/card';
import { CLOSE_EDIT_CARD_FORM, EDIT_CARD_SUCCESS } from '../reducers/card';

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 5, 12, 0.5);
  z-index: 10;
  .post-form {
    position: fixed;
    top: 5%;
    width: 660px;
    height: 650px;
    background-color: white;
    border-radius: 3px;
  }
  .back-arrow {
    font-size: 20px;
    margin-left: 15px;
    margin-top: 5px;
    font-weight: 800;
    cursor: pointer;
  }
  #question,
  #answer {
    display: block;
    margin: auto;
    width: 580px;
    height: 240px;
    font-size: 20px;
  }
  #postBtn {
    display: block;
    border: none;
    width: 344px;
    height: 54px;
    margin: 20px auto 10px;
    font-size: 20px;
    font-weight: 700;
    border-radius: 3px;
    color: white;
  }
  p {
    font-size: 20px;
    margin-left: 2.5rem;
  }
  .ableBtn {
    background-color: #00b894;
    cursor: pointer;
  }
  .disabledBtn {
    background-color: #b2bec3;
    cursor: not-allowed;
  }
`;
function EditCardForm({ card }) {
  const dispatch = useDispatch();
  const [isFull, setIsFull] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardId: card.id,
    question: card.question,
    answer: card.answer,
  });
  const handleInputValue = (key) => (e) => {
    setCardInfo({ ...cardInfo, [key]: e.target.value });
  };
  const editCardMutation = useMutation(updateCardApi);
  const handleCloseForm = () => {
    dispatch({
      type: CLOSE_EDIT_CARD_FORM,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const editCard = {
      cardId: cardInfo.cardId,
      question: cardInfo.question,
      answer: cardInfo.answer,
    };
    editCardMutation.mutate(editCard);
  };

  useEffect(() => {
    if (editCardMutation.status === 'success') {
      dispatch({
        type: EDIT_CARD_SUCCESS,
        data: cardInfo,
      });
    } else if (editCardMutation.status === 'error') {
      alert('실패');
    }
  }, [editCardMutation.status]);

  useEffect(() => {
    if (cardInfo.question && cardInfo.answer) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [cardInfo.question, cardInfo.answer]);

  return (
    <Container>
      <form className="post-form" onSubmit={handleSubmit}>
        <div
          role="button"
          onClick={handleCloseForm}
          className="back-arrow"
          aria-hidden="true"
        >
          ❌
        </div>
        <p>질문</p>
        <textarea
          id="question"
          value={cardInfo.question}
          onChange={handleInputValue('question')}
        />
        <p>답변</p>
        <textarea
          id="answer"
          value={cardInfo.answer}
          onChange={handleInputValue('answer')}
        />
        <button
          id="postBtn"
          disabled={!isFull}
          className={isFull ? 'ableBtn' : 'disabledBtn'}
          type="submit"
        >
          수정하기
        </button>
      </form>
    </Container>
  );
}

export default EditCardForm;
