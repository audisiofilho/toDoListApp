import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  flex-direction: row ;
  justify-content: space-between ;
`;

export const ButtonTask = styled.TouchableOpacity``;

export const TaskDate = styled.Text`
    color:#ccc ;
    font-size:10px ;
`;

export const TaskText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;
