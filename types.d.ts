import { Connection } from "mongoose";
declare global{
    namespace NodeJS{
        interface global{
            conn:Connection|null;
            promise:Promise<Connection>|null;
        }
    }
}