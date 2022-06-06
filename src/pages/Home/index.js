import React from 'react';
import {StatusBar} from 'react-native';
import {
  Container,
  ControlContainer,
  DateText,
  ProfileContainer,
  ProfileText,
  FieldText,
  ControlTille,
  ControlNumber,
  ContainerButtons,
  Button,
  ButtonText,
  ContainerIcon,
  List,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

import TaskList from '../../components/TaskList';

export default function Home() {
  const date = new Date().toLocaleDateString();

  const list = [
    {
      id: 1,
      task: 'Fazer compras no mercado',
      date: '04/06/22'
    },
    {
      id: 2,
      task: 'Buscar o Julio na escola',
      date: '04/06/22'
    },
    {
      id: 3,
      task: 'Fazer compras',
      date: '04/06/22'
    },
  ];
  return (
    <Container>
      <StatusBar backgroundColor="#000" />
      <ProfileContainer>
        <ProfileText>Olá, Audisio!</ProfileText>
        <DateText>{date}</DateText>
      </ProfileContainer>

      <ControlContainer>
        <FieldText>
          <ControlTille>Pendentes:</ControlTille>
          <ControlNumber>3</ControlNumber>
        </FieldText>
        <FieldText>
          <ControlTille>Concluidas:</ControlTille>
          <ControlNumber>3</ControlNumber>
        </FieldText>
      </ControlContainer>

      <ContainerButtons>
        <Button>
          <ContainerIcon>
            <Icon name="plus" size={25} color="#000" />
          </ContainerIcon>
          <ButtonText>Adicionar</ButtonText>
        </Button>
        <Button>
          <ContainerIcon>
            <Icon name="edit-2" size={25} color="#000" />
          </ContainerIcon>
          <ButtonText>Editar</ButtonText>
        </Button>
        <Button>
          <ContainerIcon>
            <Icon name="trash" size={25} color="#000" />
          </ContainerIcon>
          <ButtonText>Excluir</ButtonText>
        </Button>
      </ContainerButtons>

      <List
        data={list}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TaskList data={item}/>}
      />
    </Container>
  );
}
