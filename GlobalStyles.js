import { StyleSheet } from 'react-native';

export const colors = {
  text: '#042417',
  background: '#f6fefb',
  primary: '#1be58c',
  secondary: '#ef77d9',
  accent: '#eb5d53',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: colors.text,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: colors.text,
  },
});
