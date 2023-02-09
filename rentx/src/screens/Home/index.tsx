import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, HeaderContent, TotalCars } from './styles';
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

export function Home() {
  const cardata = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
        period: 'Ao dia',
        price: 120,
    },
    thumbnail: 'https://e7.pngegg.com/pngimages/183/675/png-clipart-audi-audi.png',
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={cardata}/>
    </Container>
  );
}
