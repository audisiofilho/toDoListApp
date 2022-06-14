export default class ToDoSchema {
  static schema = {
    name: 'ToDoList',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      desc: 'string',
      complete: {type: 'bool'},
    },
  };
}
