import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
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
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.7}
        isVisible={modalVisible}
        onBackdropPress={this.handleHideModal}
        >
          <View style={styles.modalContent}>

              <Text style={styles.title}>
                {achievement ? achievement.name : null}
              </Text>

              <Text style={styles.description}>
                {achievement ? achievement.description : null}
              </Text>

              <TouchableHighlight onPress={this.handleHideModal}>
                  <Button
                    onPress={this.handleHideModal}
                    title="Dismiss"
                    color="blue"
                    accessibilityLabel="Dismiss this notification"
                  />
              </TouchableHighlight>

          </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modalContent: {
   backgroundColor: 'white',
   alignItems: 'center'
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 12,
  }
});

export default AchievementModal;