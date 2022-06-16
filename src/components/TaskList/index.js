import React from 'react';
import {Container, ButtonTask, TaskText, TaskDate} from './styles';

import Icon from 'react-native-vector-icons/Feather';

export default function TasktList({data, active, edit, complete}) {
  return (
    <Container onLongPress={() => edit(data)}>
      <ButtonTask onPress={() => active ? complete(data) : ''}>
        {active === true ? (
          <Icon name="square" size={25} color="#000" />
        ) : (
          <Icon name="check-square" size={25} color="#000" />
        )}
      </ButtonTask>

      <TaskText>{data.desc}</TaskText>
    </Container>
  );
}
