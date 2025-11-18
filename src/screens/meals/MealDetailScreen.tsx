import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Card, IconButton} from 'react-native-paper';
import {MealDetailScreenProps} from '@/types/navigation.types';
import {useMeals} from '@/hooks/useMeals';
import {Colors, Sizes} from '@/config/theme';
import {formatCalories, formatMacros} from '@/utils/formatters';

const MealDetailScreen: React.FC<MealDetailScreenProps> = ({route, navigation}) => {
  const {mealId} = route.params;
  const {currentMeal, getMealById} = useMeals();

  useEffect(() => {
    getMealById(mealId);
  }, [mealId]);

  if (!currentMeal) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Detalle de Comida</Text>
        <IconButton icon="delete" iconColor={Colors.error} onPress={() => {}} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Resumen</Text>
            <Text variant="headlineMedium" style={styles.calories}>
              {formatCalories(currentMeal.totalCalories)}
            </Text>
            <View style={styles.macros}>
              <Text>Proteína: {formatMacros(currentMeal.totalProtein)}</Text>
              <Text>Carbos: {formatMacros(currentMeal.totalCarbs)}</Text>
              <Text>Grasas: {formatMacros(currentMeal.totalFat)}</Text>
            </View>
          </Card.Content>
        </Card>

        <Text variant="titleMedium" style={styles.sectionTitle}>Alimentos</Text>
        {currentMeal.foods?.map(food => (
          <Card key={food.id} style={styles.foodCard}>
            <Card.Content>
              <Text variant="bodyLarge">{food.foodName}</Text>
              <Text variant="bodySmall">
                {food.quantity} {food.unit} - {formatCalories(food.calories)}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.sm},
  scroll: {padding: Sizes.lg},
  card: {marginBottom: Sizes.lg},
  calories: {color: Colors.primary, fontWeight: '700', marginVertical: Sizes.sm},
  macros: {flexDirection: 'row', gap: Sizes.md, marginTop: Sizes.sm},
  sectionTitle: {marginVertical: Sizes.md},
  foodCard: {marginBottom: Sizes.sm},
});

export default MealDetailScreen;
