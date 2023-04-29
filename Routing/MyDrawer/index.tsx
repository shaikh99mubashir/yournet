import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../Screens/Home';
import MyTabs from '../MyTabs';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={MyTabs} />
    </Drawer.Navigator>
  );
}
export default MyDrawer
