import * as SQLite from "expo-sqlite";
const DATABASE="todolistdb";
const db = SQLite.openDatabaseSync(DATABASE);



export default db 
