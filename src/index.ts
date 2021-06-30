import { getAlert } from "./alert";

getAlert()
.then(result => console.log('Alert recieved'))
.catch(error => console.log(`Error: ${error.message}`));
