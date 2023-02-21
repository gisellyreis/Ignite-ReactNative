import React from 'react';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { 
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';
import { StatusBar, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../../components/ConfirmButton';

export function Confirmation() {
  const { width } = useWindowDimensions()

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>RENTX</Title>

        <Message>Aluguel realizado com sucesso</Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={() => {}} />
      </Footer>
    </Container>
  );
}