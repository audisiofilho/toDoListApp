import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
`;

export const ProfileContainer = styled.View`
  height: 135px;
  background-color: #000;
  flex-direction: row;
  padding: 20px;
  //align-items: center ;
  justify-content: space-between;
`;
export const ProfileText = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;
export const DateText = styled.Text`
  color: #fff;
  font-size: 15px;
`;

export const ControlContainer = styled.View`
  background-color: #fff;
  margin-left: 20px;
  margin-right: 20px;
  top: -35px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
`;

export const FieldText = styled.View`
  padding: 10px;
`;
export const ControlTille = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 15px;
`;
export const ControlNumber = styled.Text`
  text-align: center;
  color: #000;
  font-size: 45px;
`;

export const ContainerButtons = styled.View`
  padding-left: 40px;
  padding-right: 40px;
  //margin: 20px;
  flex-direction: row;
  justify-content: space-between ;
`;
export const Button = styled.TouchableOpacity`
    align-items: center ;
`;
export const ContainerIcon = styled.View`
    width:60px ;
    height:60px ;
    background-color: #fff;
    border-radius: 30px;
    align-items: center ;
    justify-content: center ;
`;
export const ButtonText = styled.Text`
    color:#000 ;
    font-size:15px ;
`;

export const List = styled.FlatList`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff ;
`;
