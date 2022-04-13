import styled from 'styled-components';

const CardsContainner = styled.section`
  display: flex;
  margin-left: 20px;
  width: 75%;
  flex-wrap: wrap;
  padding-top: 3rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: auto;
  margin-bottom: 2rem;
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
    top: 0rem;
    right: 1.1rem;
    cursor: pointer;
  }
  @media screen and (max-width: 1360px) {
    width: 80%;
  }
  @media screen and (max-width: 900px) {
    width: 95%;
  }
  @media screen and (max-width: 760px) {
    justify-content: center;
  }
`;
export default CardsContainner;
