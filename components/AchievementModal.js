import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

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
    console.log('Making call to hide modal');
    this.props.handleModalVisibility(false);
  }

  render() {
    const achievement = this.props.achievement;
    const modalVisible = this.props.visible;
    return (
    <View style={styles.modalContainer} >
      <Modal 
        animation="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={this.handleHideModal}
        >
          <View style={styles.modalContent}>
            <View>
              <Text>{achievement ? achievement.name : null}</Text>
              <TouchableHighlight
                onPress={this.handleHideModal}>
                  <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 22
  },
  modalContent: {
    paddingTop: 22
  }
});

export default AchievementModal;