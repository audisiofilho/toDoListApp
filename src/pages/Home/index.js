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
  const [control, setControl] = useState(true);
  const [complete, setComplete] = useState('0');
  const [pending, setPending] = useState('0');
  const [idEdit, setIdEdit] = useState(null);
  const [dissable, setDissable] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskDesc, setTaskDesc] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      const realm = await getRealm();
      const pending = realm
        .objects('ToDoList')
        .filtered('complete =' + false).length;
      const complete = realm
        .objects('ToDoList')
        .filtered('complete =' + true).length;
      const data = active
        ? realm.objects('ToDoList').filtered('complete =' + false)
        : realm.objects('ToDoList').filtered('complete =' + true);
      setTasks(data);
      setPending(pending);
      setComplete(complete);
    }

    loadTasks();
  }, [control, active]);

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

      setControl(!control);
      setTaskDesc('');
      setmodalVisible(false);
    } catch (err) {
      alert(err);
    }
  }

  function editTask(data) {
    setIdEdit(data.id);
    setTaskDesc(data.desc);
    setDissable(false);
  }

  async function completeTask(data) {
    if (data.id === null) {
      return;
    }

    const realm = await getRealm();

    const response = {
      id: data.id,
      complete: true,
    };

    await realm.write(() => {
      realm.create('ToDoList', response, 'modified');
    });
    setControl(!control);
    
  }

  async function addEditTask() {
    if (idEdit === null) {
      alert('Você não esta editando nenhum item!');
      return;
    }

    const realm = await getRealm();

    const response = {
      id: idEdit,
      desc: taskDesc,
    };

    await realm.write(() => {
      realm.create('ToDoList', response, 'modified');
    });
    setControl(!control);
    setTaskDesc('');
    setIdEdit(null);
    setDissable(true);
    setmodalVisible(false);
    Keyboard.dismiss();
  }

  async function deleteTask() {
    const realm = await getRealm();

    const ID = idEdit;

    realm.write(() => {
      if (realm.objects('ToDoList').filtered('id =' + ID).length > 0) {
        realm.delete(realm.objects('ToDoList').filtered('id =' + ID));
      }
    });
    setIdEdit(null);
    setTaskDesc('');
    setControl(!control);
    setDissable(true);
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
          <ControlNumber>{pending}</ControlNumber>
        </FieldText>
        <FieldText>
          <ControlTille>Concluidas:</ControlTille>
          <ControlNumber>{complete}</ControlNumber>
        </FieldText>
      </ControlContainer>

      <ContainerButtons>
        <Button
          onPress={() => setmodalVisible(true)}
          disabled={!dissable}
          style={{opacity: !dissable ? 0.1 : 1}}>
          <ContainerIcon>
            <Icon name="plus" size={25} color="#000" />
          </ContainerIcon>
          <ButtonText>Adicionar</ButtonText>
        </Button>
        <Button
          onPress={() => setmodalVisible(true)}
          disabled={dissable}
          style={{opacity: dissable ? 0.1 : 1}}>
          <ContainerIcon>
            <Icon name="edit-2" size={25} color="#000" />
          </ContainerIcon>
          <ButtonText>Editar</ButtonText>
        </Button>
        <Button
          onPress={() => deleteTask()}
          disabled={dissable}
          style={{opacity: dissable ? 0.1 : 1}}>
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
        renderItem={({item}) => (
          <TaskList data={item} active={active} edit={editTask} complete={completeTask} />
        )}
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
              {idEdit !== null
                ? 'Editar uma Tarefa?'
                : 'Criar uma nova Tarefa?'}
            </Text>
            <TextInput
              onChangeText={text => setTaskDesc(text)}
              value={taskDesc}
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
              onPress={() => (idEdit !== null ? addEditTask() : addTask())}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {idEdit !== null ? 'Editar Tarefa' : 'Criar Tarefa'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setmodalVisible(false)}}>
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
