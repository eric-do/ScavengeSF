import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    flex: 1,
  },
  questionText: {
    fontSize: 18,
  },
  answerEntry: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  answerTextView: {
    width: '60%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20,
  },
  answerToggle: {
    width: '40%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  answerText: {
    fontSize: 16,
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  picker: {
    width: '75%',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#70EB92',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  list: {
    width: '100%',
  },
});
