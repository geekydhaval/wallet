
import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { CardData } from '../types';

interface CardProps {
  card: CardData;
  style: any;
}

const { width } = Dimensions.get('window');
const CARD_ASPECT_RATIO = 1.586;
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export const Card: React.FC<CardProps> = ({ card, style }) => {
  return (
    <Animated.View style={[styles.cardContainer, style]}>
      <LinearGradient colors={card.gradient} style={styles.gradient}>
        <View style={styles.topRow}>
          <View>
            <Text style={[styles.typeText, { color: card.textColor }]}>{card.type}</Text>
            <Text style={[styles.issuerText, { color: card.textColor }]}>{card.issuer}</Text>
          </View>
          <Text style={styles.emoji}>{card.emoji}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={[styles.nameText, { color: card.textColor }]}>{card.name}</Text>
          <Text style={[styles.numberText, { color: card.textColor }]}>{card.number}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  gradient: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bottomRow: {
    alignItems: 'flex-end',
  },
  typeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  issuerText: {
    fontSize: 14,
    opacity: 0.8,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  numberText: {
    fontSize: 14,
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  emoji: {
    fontSize: 40,
  },
});
