import React from 'react';
import {Container, ButtonTask, TaskText,TaskDate} from './styles';

import Icon from 'react-native-vector-icons/Feather';

export default function TasktList({data, active}) {
  return (
    <Container onLongPress={()=>alert('Container')}>
      <ButtonTask onPress={()=> alert('task')}>
        {active === true ? (<Icon name="square" size={25} color="#000" />) : (<Icon name="check-square" size={25} color="#000" />)}

      </ButtonTask>

        <TaskText>
          {data.task}
        </TaskText>

        <TaskDate>
          {data.date}
        </TaskDate>
      
    </Container>
  );
}
