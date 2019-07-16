import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default VotesContainer = ({ handleVote, direction }) => (
  <View style={styles.votesContainer}>
    <TouchableOpacity style={styles.voteBox} onPress={() => handleVote('upvote')}>
      <View>
        <Text style={styles.voteText}>UPVOTE</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.voteBox} onPress={() => handleVote('downvote')}>
      <View>
        <Text style={styles.voteText}>DOWNVOTE</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  votesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  voteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5
  },
  voteText: {
    fontSize: 12,
    color: 'white'
  }
});