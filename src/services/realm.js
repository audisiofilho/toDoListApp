import Realm from "realm";
import ToDoSchema from "../schemas/ToDoSchema";

export default function getRealm(){
    return Realm.open({
        schema: [ToDoSchema]
    })
}