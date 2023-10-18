# IDM react component usage


# V1.2.0



* Added user management react components
* Provide apiUrl as props
* Set authToken in localstorage with key **_authToken_**


```
import { UserManagement } from "@crayond_dev/idm-components";

function App() {
return <UserManagement apiUrl="https://dev-idm-api.crayond.com/api/v1" />;
}

export default App;
```


This dependency will be fixed in coming updates.
