import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 700px;
  height: 416px;

  // background-color: burlywood;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .answer-box {
    overflow-y: auto;
  }
  pre {
    white-space: pre-wrap;
  }
  .alone-title {
    font-size: 50px;
    font-weight: 700;
  }
  button {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .question-pre {
    transition: 0.2s ease-in;
  }
  .withAnswer-title {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  .answer-pre {
    font-size: 20px;
  }
`;
function PraticeCard({ cardInfo }) {
  const [isAnswer, setIsAnswer] = useState(false);
  return (
    <Container>
      <button onClick={() => setIsAnswer((prev) => !prev)} type="button">
        답보기
      </button>
      <pre
        className={`question-pre ${
          isAnswer ? 'withAnswer-title' : 'alone-title'
        }`}
      >
        {cardInfo.question}
      </pre>
      {isAnswer ? (
        <div className="answer-box">
          <pre className="answer-pre">{cardInfo.answer}</pre>
        </div>
      ) : null}
    </Container>
  );
}

export default PraticeCard;
