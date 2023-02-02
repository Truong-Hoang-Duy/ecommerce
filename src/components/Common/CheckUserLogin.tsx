import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CheckUserLoginStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.black};
  color: white;
  .page-content {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .description {
    max-width: 800px;
    margin: 0 auto 40px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-image: linear-gradient(
      to right top,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const CheckUserLogin = () => {
  const navigate = useNavigate();
  return (
    <CheckUserLoginStyles>
      <div className="page-content">
        <h1 className="heading">Warning not logged in</h1>
        <p className="description">
          Have you logged in yet? If not, please login before using the management pages
        </p>
        <button onClick={() => navigate('/sign-in')} className="back">
          Go back
        </button>
      </div>
    </CheckUserLoginStyles>
  );
};

export default CheckUserLogin;
