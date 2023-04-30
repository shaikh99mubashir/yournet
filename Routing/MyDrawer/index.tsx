import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../Screens/Home';
import MyTabs from '../MyTabs';
import CustomDrawer from '../../Components/CustomDrawer';
import Payment from '../../Screens/Payment';
import Complaint from '../../Screens/Complaint';
import Notification from '../../Screens/Notification';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator 
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      // drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#fff',
      drawerLabelStyle: {
        marginLeft: 0,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
      },
    }}>
      <Drawer.Screen name="HomeScreen" component={MyTabs} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="Complaint" component={Complaint} />
      <Drawer.Screen name="Notification" component={Notification} />
    </Drawer.Navigator>
  );
}
export default MyDrawer
