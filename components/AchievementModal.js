import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';

/**
 * Component to display an achievement modal 
 * @param { object } achievement - the achievement object (id, name, description)
 */

class AchievementModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  handleHideModal() {
    this.props.handleModalVisibility(false);
  }

  render() {
    const achievement = this.props.achievement;
    const modalVisible = this.props.visible;
    return (
      <Modal 
        animationIn="zoomInDown"
        animationInTiming={500}
        animationOut="zoomOutUp"
        animationOutTiming={500}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.7}
        isVisible={modalVisible}
        onBackdropPress={this.handleHideModal}
        >
          <View style={styles.modalContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {achievement ? achievement.name : null}
                </Text>
                <Text style={styles.description}>
                  {achievement ? achievement.description : null}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.handleHideModal}>
                    <View
                      onPress={this.handleHideModal}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>DISMISS</Text>
                    </View>
                </TouchableOpacity>
              </View>
          </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modalContent: {
   backgroundColor: 'white',
   alignItems: 'center',
   justifyContent: 'center',
   height: '35%',
  },
  textContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 10
  },
  description: {
    fontSize: 14
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#3498DB',
    height: 50,
    width: 200,
  },
  buttonText: {
    color: '#3498DB'
  }
});

export default AchievementModal;