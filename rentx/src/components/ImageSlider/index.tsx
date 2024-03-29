import React from 'react';
import { 
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWeapper,
  CarImage
 } from './styles';

 interface Props {
  imageUrl: string[];
 }

export function ImageSlider({imageUrl}: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWeapper>
        <CarImage 
          source={{uri: imageUrl[0]}}
          resizeMode="contain"
        />
      </CarImageWeapper>
    </Container>
  );
}