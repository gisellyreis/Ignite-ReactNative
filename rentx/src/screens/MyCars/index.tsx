import React, { useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons'
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { 
  Appointments, 
  AppointmentsQuantity, 
  AppointmentsTitle, 
  CarFooter, 
  CarFooterDate, 
  CarFooterPeriod, 
  CarFooterTitle, 
  CarWrapper, 
  Container, 
  Content, 
  Header, 
  SubTitle, 
  Title 
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
  car: {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
  };
}

interface DataProps {
  id: string;
  car: {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
  };
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<DataProps[]>([])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={() => {}} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {
        loading ? <></> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>1</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate> {item.start_date} </CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate> {item.end_date} </CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}