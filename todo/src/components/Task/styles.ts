import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#262626',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333'
  },
  check: {
    marginLeft: 12,
    marginVertical: 20
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#F2F2F2',
    marginLeft: 8,
    padding: 8
  },
  btnText: {
    color: '#FFF',
    fontSize: 24
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})