import { Typography } from '@mui/material';
import styled from 'styled-components';

const AuthenticationStyles = styled.div`
  background: hsla(18, 76%, 85%, 1);
  background: linear-gradient(90deg, hsla(18, 76%, 85%, 1) 0%, hsla(203, 69%, 84%, 1) 100%);
  background: -moz-linear-gradient(90deg, hsla(18, 76%, 85%, 1) 0%, hsla(203, 69%, 84%, 1) 100%);
  background: -webkit-linear-gradient(90deg, hsla(18, 76%, 85%, 1) 0%, hsla(203, 69%, 84%, 1) 100%);
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#F6CFBE", endColorstr="#B9DCF2", GradientType=1 );

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px;
  .box {
    background-color: white;
    width: 1000px;
    padding: 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
  }
  .form {
    max-width: 800px;
    margin: 0 auto;
  }
  .have-account {
    margin-top: -20px;
    margin-bottom: 10px;
    font-weight: bold;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 600;
    }
  }
`;

const Authentication = ({ children, text }: { children?: JSX.Element; text: string }) => {
  return (
    <AuthenticationStyles>
      <div className="box">
        <Typography variant="h5" component="h1" className="heading">
          {text}
        </Typography>
        {children}
      </div>
    </AuthenticationStyles>
  );
};

export default Authentication;
