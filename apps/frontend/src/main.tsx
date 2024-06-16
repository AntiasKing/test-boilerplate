import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import Actions from './actions';
import Credits from './credits';
import Queue from './queue';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

// @INFO: styled-components is installed, you can use it if you want ;)
const Container = styled.div`
  background-color: #7699D4;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  height: 100%;
`;

root.render(
  <StrictMode>
    <Container>
      <Actions/>
      <Queue/>
      <Credits/>
    </Container>
  </StrictMode>
);
