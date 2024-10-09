import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MyLogo } from './logo.svg'; // Add your SVG logo here

const LoginPage = () => {
  return (
    <FullPageContainer>
      <MainContainer>
        <Container>
          <BackgroundLayer />
          <WelcomeSection>
            <LogoContainer>
              <MyLogo />
            </LogoContainer>
            <WelcomeText>Welcome Page</WelcomeText>
            <SubText>Sign in to continue access</SubText>
          </WelcomeSection>
          <FormSection>
            <Form>
              <Title>Sign In</Title>
              <Input type="email" placeholder="Email Address" />
              <Input type="password" placeholder="Password" />
              <Button>CONTINUE</Button>
              <SocialLoginText>or Connect with Social Media</SocialLoginText>
              <SocialButtons>
                <SocialButton style={{ backgroundColor: '#1DA1F2' }}>Sign in with Twitter</SocialButton>
                <SocialButton style={{ backgroundColor: '#3b5998' }}>Sign in with Facebook</SocialButton>
              </SocialButtons>
            </Form>
          </FormSection>
        </Container>
      </MainContainer>
    </FullPageContainer>
  );
};

export default LoginPage;

// Styled Components
// const FullPageContainer = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// min-height: 100vh;
// min-width: 100vw;
// backgrsound: url('https://w0.peakpx.com/wallpaper/35/260/HD-wallpaper-background-bg-textures-purple-abstract-pink.jpg') no-repeat center center;
// //  <source src="https://mixkit.co/free-stock-video/mirrored-shot-of-colorful-powders-jumping-on-a-dark-background-51803/" type="video/mp4" />
// background-size: cover; /* Ensure the image covers the entire container */
// font-family: 'Arial', sans-serif;
// `;
const FullPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background: url('https://png.pngtree.com/thumb_back/fh260/background/20210819/pngtree-starlight-bubbles-abstract-dreamy-gradient-pink-purple-background-image_761750.jpg') no-repeat center center;
  background-size: cover; /* Ensure the image covers the entire container */
  font-family: 'Arial', sans-serif;
`;

const MainContainer = styled.div`
width: 70%;
height: 70%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
border-radius: 15px;
overflow: hidden;
transition: all 0.3s ease; /* Smooth transition for hover effect */

&:hover {
  transform: scale(1.05); /* Slightly scale up */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); /* Add a shadow effect */
  background-color: rgba(255, 255, 255, 0.2); /* Slightly change background on hover */
}
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: -50px;
  left: -50px;
  width: 120%;
  height: 120%;
  background: linear-gradient(135deg, #764ba2, #667eea);
  border-radius: 20%;
  transform: rotate(10deg);
  z-index: 1;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
`;

const WelcomeSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #fff;
  z-index: 2;
  position: relative;
`;

const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;

  svg {
    width: 100%;
    height: 100%;
    fill: #fff;
  }
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SubText = styled.p`
  font-size: 1.25rem;
`;

const FormSection = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
`;

const Form = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const SocialLoginText = styled.p`
  text-align: center;
  color: #666;
  margin: 1rem 0;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
