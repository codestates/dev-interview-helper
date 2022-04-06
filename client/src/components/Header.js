import React from 'react';
import Styled from 'styled-components';

const HeaderWrapper = Styled.header`
  display:flex;
  width: 100%;
  height: 63px;
  border-bottom:1px solid black;
  justify-content: space-between;
`;

const ContentRight = Styled.div`
  width: 210px;
  padding: 10px;
`;

const ContentLeft = Styled.div`
  
`;

function Header() {
  return (
    <HeaderWrapper>
      <ContentLeft>
        <div>LOGO</div>
        <input placeholder="Search" />
      </ContentLeft>

      <ContentRight>
        <button type="button">로그인</button>
        <button type="button">회원가입</button>
      </ContentRight>
    </HeaderWrapper>
  );
}

export default Header;
