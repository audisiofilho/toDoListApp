import React, {useState, useEffect} from 'react';
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
  ContainerSwitch,
  ButtonSwitch,
  SwitchText,
  ButtonSwitch2
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

import TaskList from '../../components/TaskList';

export default function Home() {
  const date = new Date().toLocaleDateString();

  const [active, setActive] = useState(true);
  const [pending, setPending] = useState();
  const [complete, setComplete] = useState([]);

  const list = [
    {
      id: 1,
      task: 'Fazer compras no mercado',
      date: '04/06/22',
      complete: false,
    },
    {
      id: 2,
      task: 'Buscar o Julio na escola',
      date: '04/06/22',
      complete: false,
    },
    {
      id: 3,
      task: 'Fazer compras',
      date: '04/06/22',
      complete: false,
    },
  ];

  const list2 = [
    {
      id: 4,
      task: 'Fazer janta',
      date: '04/06/22',
      complete: true,
    },
    {
      id: 5,
      task: 'Programar',
      date: '04/06/22',
      complete: true,
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
          <ControlNumber>{list.length}</ControlNumber>
        </FieldText>
        <FieldText>
          <ControlTille>Concluidas:</ControlTille>
          <ControlNumber>{list2.length}</ControlNumber>
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

      <ContainerSwitch>
        <ButtonSwitch onPress={() => setActive(true)} style={{borderBottomColor: active ? '#000' : '#ccc'}}>
          <SwitchText style={{color: active ? '#000' : '#ccc'}}>Pendentes</SwitchText>
        </ButtonSwitch>
        <ButtonSwitch2  onPress={() => setActive(false)} style={{borderBottomColor: active ? '#ccc' : '#000'}}>
          <SwitchText style={{color: active ? '#ccc' : '#000'}}>Concluidas</SwitchText>
        </ButtonSwitch2>
      </ContainerSwitch>

      <List
        data={active ? list : list2}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TaskList data={item} active={active}/>}
      />
    </Container>
  );
}
