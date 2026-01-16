
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Card } from './components/Card';
import { INITIAL_CARDS } from './constants';
import type { CardData } from './types';

const { width, height } = Dimensions.get('window');
const CARD_ASPECT_RATIO = 1.586; // Standard credit card aspect ratio
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
const STACK_CARD_SEPARATION = 50; // Vertical separation for stacked cards

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const cardAnimations = useRef(
    cards.map(() => ({
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      scale: new Animated.Value(1),
    }))
  ).current;
  
  // Animate cards to their initial stacked position
  const animateInitial = () => {
    cards.forEach((_, i) => {
      const scale = 1 - (cards.length - 1 - i) * 0.04;
      const toValueY = -i * STACK_CARD_SEPARATION;
      
      Animated.spring(cardAnimations[i].position, {
        toValue: { x: 0, y: toValueY },
        useNativeDriver: false,
      }).start();

      Animated.spring(cardAnimations[i].scale, {
        toValue: scale,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    animateInitial();
  }, []);

  const handlePress = (pressedIndex: number) => {
    const isDeselecting = selectedIndex === pressedIndex;
    const newSelectedIndex = isDeselecting ? null : pressedIndex;
    
    setSelectedIndex(newSelectedIndex);
    
    if (newSelectedIndex !== null && !isDeselecting) {
      // Bring pressed card to the front of the state array
      setCards(prevCards => {
        const selected = prevCards[pressedIndex];
        const rest = prevCards.filter((_, idx) => idx !== pressedIndex);
        return [selected, ...rest];
      });
    }

    // Animate all cards based on the new selection
    cards.forEach((_, i) => {
      let toValueY, toValueScale;
      const isSelectedCard = i === pressedIndex && !isDeselecting;

      if (isSelectedCard) {
        toValueY = -height * 0.15;
        toValueScale = 1.1;
      } else {
        // All other cards are in the stack
        const stackIndex = i > pressedIndex ? i -1 : i;
        toValueY = height * 0.4 + stackIndex * 20;
        toValueScale = 0.9;
      }

      if (isDeselecting) {
        // Return all cards to initial stack
        animateInitial();
      } else {
        Animated.spring(cardAnimations[i].position, {
            toValue: { x: 0, y: toValueY },
            useNativeDriver: false,
        }).start();

        Animated.spring(cardAnimations[i].scale, {
            toValue: toValueScale,
            useNativeDriver: true,
        }).start();
      }
    });
  };

  // FIX: Use refs to provide the latest state and functions to the PanResponder callbacks, avoiding stale closures.
  const selectedIndexRef = useRef(selectedIndex);
  const cardsRef = useRef(cards);
  const handlePressRef = useRef(handlePress);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
    cardsRef.current = cards;
    handlePressRef.current = handlePress;
  });


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => selectedIndexRef.current !== null,
      onPanResponderMove: (_, gestureState) => {
        if (selectedIndexRef.current !== null) {
          // FIX: Correctly update only the x-value for horizontal drag, resolving the error from accessing private property '_value'.
          cardAnimations[selectedIndexRef.current].position.x.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (selectedIndexRef.current === null) return;

        if (Math.abs(gestureState.dx) > width / 4) {
          // Swipe detected
          const direction = gestureState.dx > 0 ? 1 : -1;
          const nextIndex = selectedIndexRef.current - direction; // Inverted because top of stack is end of array
          
          if (nextIndex >= 0 && nextIndex < cardsRef.current.length) {
            handlePressRef.current(nextIndex);
          } else {
            // Swipe out of bounds, snap back
            handlePressRef.current(selectedIndexRef.current);
          }
        } else {
          // Not a strong enough swipe, snap back
          handlePressRef.current(selectedIndexRef.current);
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardArea} {...panResponder.panHandlers}>
        {cards.map((card, index) => {
          const isSelected = selectedIndex === index;
          
          const animatedStyle = {
            transform: [
              { translateX: cardAnimations[index].position.x },
              { translateY: cardAnimations[index].position.y },
              { scale: cardAnimations[index].scale },
            ],
            zIndex: isSelected ? 100 : cards.length - index,
          };

          return (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.9}
              onPress={() => handlePress(index)}
            >
              <Card card={card} style={animatedStyle} />
            </TouchableOpacity>
          );
        }).reverse()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E', // Dark background like Apple Wallet
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    position: 'relative',
  },
});

export default App;
