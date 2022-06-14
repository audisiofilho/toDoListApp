import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  Modal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
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
  ButtonSwitch2,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

import TaskList from '../../components/TaskList';

import getRealm from '../../services/realm';

export default function Home() {
  const date = new Date().toLocaleDateString();

  const [active, setActive] = useState(true);
  const [dissable, setDissable] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskDesc, setTaskDesc] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      const realm = await getRealm();
      const data = realm.objects('ToDoList');
      setTasks(data);
    }

    loadTasks();
  }, []);

  async function saveTask(data) {
    const realm = await getRealm();

    const id =
      realm.objects('ToDoList').sorted('id', true).length > 0
        ? realm.objects('ToDoList').sorted('id', true)[0].id + 1
        : 1;

    const dataTask = {
      id: id,
      desc: data.desc,
      complete: false,
    };

    realm.write(() => {
      realm.create('ToDoList', dataTask);
    });
  }

  async function addTask() {
    if (taskDesc === '') {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const data = {desc: taskDesc};
      await saveTask(data);

      setTaskDesc('');
      setmodalVisible(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor="#000" />
      <ProfileContainer>
        <ProfileText>Olá!</ProfileText>
        <DateText>{date}</DateText>
      </ProfileContainer>

      <ControlContainer>
        <FieldText>
          <ControlTille>Pendentes:</ControlTille>
          <ControlNumber></ControlNumber>
        </FieldText>
        <FieldText>
          <ControlTille>Concluidas:</ControlTille>
          <ControlNumber></ControlNumber>
        </FieldText>
      </ControlContainer>

      <ContainerButtons>
        <Button onPress={() => setmodalVisible(true)}>
          <ContainerIcon>
            <Icon name="plus" size={25} color="#000" />
          </ContainerIcon>
          <ButtonText>Adicionar</ButtonText>
        </Button>
        <Button disabled={dissable} style={{opacity: dissable ? 0.1 : 1}}>
          <ContainerIcon>
            <Icon name="edit-2" size={25} color="#000"/>
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
        <ButtonSwitch
          onPress={() => setActive(true)}
          style={{borderBottomColor: active ? '#000' : '#ccc'}}>
          <SwitchText style={{color: active ? '#000' : '#ccc'}}>
            Pendentes
          </SwitchText>
        </ButtonSwitch>
        <ButtonSwitch2
          onPress={() => setActive(false)}
          style={{borderBottomColor: active ? '#ccc' : '#000'}}>
          <SwitchText style={{color: active ? '#ccc' : '#000'}}>
            Concluidas
          </SwitchText>
        </ButtonSwitch2>
      </ContainerSwitch>

      <List
        data={tasks}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TaskList data={item} active={active} />}
      />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(34,34,34,0.4)'}}>
          <TouchableWithoutFeedback onPress={() => setmodalVisible(false)}>
            <View style={{flex: 1}}></View>
          </TouchableWithoutFeedback>
          <View style={{flex: 1, backgroundColor: '#fff', padding: 15}}>
            <Text
              style={{
                marginTop: 15,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: '#000',
              }}>
              Criar uma nova tarefa?
            </Text>
            <TextInput
              onChangeText={text => setTaskDesc(text)}
              placeholder="Tarefa..."
              style={{
                borderRadius: 5,
                height: 45,
                backgroundColor: '#ddd',
                marginVertical: 15,
                fontSize: 15,
                paddingHorizontal: 5,
              }}
            />

            <TouchableOpacity
              style={{
                borderRadius: 4,
                backgroundColor: '#000',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => addTask()}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Criar Tarefa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setmodalVisible(false)}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  margin: 10,
                  fontSize: 20,
                }}>
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
