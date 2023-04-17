import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { useNavigation } from '@react-navigation/native';

export default function AboutScreen() {
  const navigation = useNavigation();
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>About App Page</Header>
    </Background>
  )
}

