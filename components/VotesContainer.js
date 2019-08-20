import React from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  votesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  voteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    width: 85,
  },
  voteText: {
    fontSize: 12,
    color: 'white',
  },
  activeUpvote: {
    color: '#3498DB',
    fontWeight: 'bold',
  },
  activeDownvote: {
    color: 'orange',
    fontWeight: 'bold',
  },
});

const VotesContainer = ({ handleVote, direction }) => (
  <View style={styles.votesContainer}>
    <TouchableOpacity
      style={styles.voteBox}
      onPress={() => handleVote('upvote')}
    >
      <View>
        <Text
          style={[
            styles.voteText,
            direction === 1 ? styles.activeUpvote : null,
          ]}
        >
          UPVOTE
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.voteBox}
      onPress={() => handleVote('downvote')}
    >
      <View>
        <Text
          style={[
            styles.voteText,
            direction === -1 ? styles.activeDownvote : null,
          ]}
        >
          DOWNVOTE
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

VotesContainer.defaultProps = {
  direction: 0,
  handleVote: () => {},
};

VotesContainer.propTypes = {
  direction: PropTypes.number,
  handleVote: PropTypes.func,
};

export default VotesContainer;
