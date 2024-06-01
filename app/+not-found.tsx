import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { useRoute } from '@react-navigation/native';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  const route = useRoute();
  console.log(route.name);
  console.log(route.path);

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText variant="heading">404</ThemedText>
        <ThemedText variant="body2">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText variant="body">Back to home screen</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: colors.danger,
  },
});
