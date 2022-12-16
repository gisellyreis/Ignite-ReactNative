import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 24
  },
  logo: {
    marginTop: 48,
    alignSelf: 'center'
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 42,
    marginBottom: 42
  },
  input: {
    flex: 1,
    height: 54,
    padding: 16,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: '#262626',
    borderRadius: 6,
    color: '#F2F2F2',
  },
  btnAdd: {
    width: 52,
    height: 52,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E6F9F'
  },
  btnAddIcon: {
    color: '#FFF'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    flexDirection: 'row',
    alignItems:  'center',
    marginBottom: 20
  },
  counter: {
    backgroundColor: '#333333',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 19,
    marginLeft: 8
  },
  counterText: {
    color: '#D9D9D9',
  },
  emptyImg: {
    marginBottom: 16
  },
  textEmptyTasks: {
    fontSize: 14,
    textAlign: 'center',
    color: '#808080'
  },
  empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,

    borderTopColor: '#333333',
    borderTopWidth: 1
  }
})