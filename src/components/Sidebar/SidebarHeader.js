/* @flow */
import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

type Props = {
  isPrimaryColor: string,
  logoImg: string,
  logoLink: string,
};
const LogoElement = styled.div`
  justify-content: center;
  width: 100%;
  position: relative;
  margin: 0 auto;
`;
const InfoElement = styled.div`
  padding-left: 6px;
  padding-top: 6px;
`;
const Header = styled.div`
    display: block;
    position: relative;
    height: 54px;
    background-color: #00bcd4;
    line-height: 54px;
    padding: 0 18px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  `;
const SidebarHeader = (props: Props) => {
  return (
    <Header>
      <LogoElement>
        <Link to={props.logoLink}>
          <img
            src={props.logoImg}
            className="boldrui-sidebar-header-logo"
            style={{
              height: '40px',
              display: 'inline-block',
              verticalAlign: 'middle',
              marginTop: '6px',
            }}
          />
        </Link>
      </LogoElement>
    </Header>
  );
};

SidebarHeader.defaultProps = {
  logoImg: 'https://boldr.io/assets/boldr-white-logo.png',
  isPrimaryColor: true,
};

export default SidebarHeader;
