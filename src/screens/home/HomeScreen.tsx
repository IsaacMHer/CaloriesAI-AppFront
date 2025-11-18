import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert} from 'react-native';
import {Text, Card, FAB, Chip, ProgressBar, IconButton} from 'react-native-paper';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {HomeMainScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {useMeals} from '@/hooks/useMeals';
import {useStats} from '@/hooks/useStats';
import {Colors, Sizes} from '@/config/theme';
import {formatCalories, formatMacros, formatRelativeDate, getGreeting} from '@/utils/formatters';
import {calculateProgress, getProgressColor} from '@/utils/calculations';
import {MealTypeLabels, MealTypeColors} from '@/types/api.types';

const HomeScreen: React.FC<HomeMainScreenProps> = ({navigation}) => {
  const {user} = useAuth();
  const {meals, getMealsByDate, deleteMeal} = useMeals();
  const {dailySummary, getDailySummary} = useStats();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        getMealsByDate(new Date()),
        getDailySummary(new Date()),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const handleDeleteMeal = (id: number) => {
    Alert.alert(
      'Eliminar Comida',
      '¿Estás seguro que deseas eliminar esta comida?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMeal(id);
              await loadData();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la comida');
            }
          },
        },
      ],
    );
  };

  const caloriesProgress = dailySummary ? calculateProgress(dailySummary.totalCalories, dailySummary.goalCalories) : 0;
  const proteinProgress = dailySummary ? calculateProgress(dailySummary.totalProtein, dailySummary.goalProtein) : 0;
  const carbsProgress = dailySummary ? calculateProgress(dailySummary.totalCarbs, dailySummary.goalCarbs) : 0;
  const fatProgress = dailySummary ? calculateProgress(dailySummary.totalFat, dailySummary.goalFat) : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />}>

        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.greeting}>
            {getGreeting(user?.name)}
          </Text>
          <Text variant="bodyMedium" style={styles.date}>
            {formatRelativeDate(new Date())}
          </Text>
        </View>

        {/* Resumen del Día */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>Resumen de Hoy</Text>

            {/* Circular Progress - Calorías */}
            <View style={styles.circularProgress}>
              <AnimatedCircularProgress
                size={180}
                width={15}
                fill={caloriesProgress}
                tintColor={getProgressColor(caloriesProgress)}
                backgroundColor={Colors.grey200}>
                {() => (
                  <View style={styles.progressContent}>
                    <Text variant="headlineLarge" style={styles.progressValue}>
                      {dailySummary?.totalCalories.toFixed(0) || 0}
                    </Text>
                    <Text variant="bodySmall" style={styles.progressLabel}>
                      de {dailySummary?.goalCalories.toFixed(0) || 0} kcal
                    </Text>
                    <Text variant="bodySmall" style={styles.progressRemaining}>
                      {dailySummary?.remainingCalories.toFixed(0) || 0} restantes
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>

            {/* Macros Progress Bars */}
            <View style={styles.macrosContainer}>
              <View style={styles.macroRow}>
                <Text variant="bodyMedium">Proteína</Text>
                <Text variant="bodyMedium" style={{color: Colors.protein}}>
                  {dailySummary?.totalProtein.toFixed(1) || 0}g / {dailySummary?.goalProtein.toFixed(0) || 0}g
                </Text>
              </View>
              <ProgressBar progress={proteinProgress / 100} color={Colors.protein} style={styles.progressBar} />

              <View style={styles.macroRow}>
                <Text variant="bodyMedium">Carbohidratos</Text>
                <Text variant="bodyMedium" style={{color: Colors.carbs}}>
                  {dailySummary?.totalCarbs.toFixed(1) || 0}g / {dailySummary?.goalCarbs.toFixed(0) || 0}g
                </Text>
              </View>
              <ProgressBar progress={carbsProgress / 100} color={Colors.carbs} style={styles.progressBar} />

              <View style={styles.macroRow}>
                <Text variant="bodyMedium">Grasas</Text>
                <Text variant="bodyMedium" style={{color: Colors.fat}}>
                  {dailySummary?.totalFat.toFixed(1) || 0}g / {dailySummary?.goalFat.toFixed(0) || 0}g
                </Text>
              </View>
              <ProgressBar progress={fatProgress / 100} color={Colors.fat} style={styles.progressBar} />
            </View>
          </Card.Content>
        </Card>

        {/* Lista de Comidas */}
        <View style={styles.mealsSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Comidas de Hoy</Text>

          {meals.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Text variant="bodyLarge" style={styles.emptyText}>
                  No has registrado comidas hoy
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtext}>
                  Toca el botón + para agregar tu primera comida
                </Text>
              </Card.Content>
            </Card>
          ) : (
            meals.map(meal => (
              <TouchableOpacity key={meal.id} onPress={() => navigation.navigate('MealDetail', {mealId: meal.id})}>
                <Card style={styles.mealCard}>
                  <Card.Content>
                    <View style={styles.mealHeader}>
                      <Chip
                        icon="silverware-fork-knife"
                        style={{backgroundColor: MealTypeColors[meal.mealType]}}>
                        {MealTypeLabels[meal.mealType]}
                      </Chip>
                      <IconButton
                        icon="delete"
                        iconColor={Colors.error}
                        size={20}
                        onPress={() => handleDeleteMeal(meal.id)}
                      />
                    </View>

                    <View style={styles.mealContent}>
                      <Text variant="bodyLarge" style={styles.mealCalories}>
                        {formatCalories(meal.totalCalories)}
                      </Text>
                      <View style={styles.mealMacros}>
                        <Text variant="bodySmall">P: {formatMacros(meal.totalProtein)}</Text>
                        <Text variant="bodySmall">C: {formatMacros(meal.totalCarbs)}</Text>
                        <Text variant="bodySmall">G: {formatMacros(meal.totalFat)}</Text>
                      </View>
                    </View>

                    {meal.foods && meal.foods.length > 0 && (
                      <Text variant="bodySmall" style={styles.foodsCount}>
                        {meal.foods.length} alimento(s)
                      </Text>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB - Agregar Comida */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddMeal')}
        color="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  scroll: {padding: Sizes.md, paddingBottom: 80},
  header: {marginBottom: Sizes.lg},
  greeting: {fontWeight: '700', color: Colors.text},
  date: {color: Colors.textSecondary, marginTop: Sizes.xs},
  summaryCard: {marginBottom: Sizes.lg},
  cardTitle: {fontWeight: '600', marginBottom: Sizes.md},
  circularProgress: {alignItems: 'center', marginVertical: Sizes.lg},
  progressContent: {alignItems: 'center'},
  progressValue: {fontWeight: '700', color: Colors.primary},
  progressLabel: {color: Colors.textSecondary},
  progressRemaining: {color: Colors.textSecondary, marginTop: Sizes.xs},
  macrosContainer: {gap: Sizes.sm},
  macroRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  progressBar: {height: 8, borderRadius: 4},
  mealsSection: {gap: Sizes.md},
  sectionTitle: {fontWeight: '600'},
  emptyCard: {padding: Sizes.lg},
  emptyContent: {alignItems: 'center'},
  emptyText: {color: Colors.textSecondary, textAlign: 'center'},
  emptySubtext: {color: Colors.textDisabled, textAlign: 'center', marginTop: Sizes.xs},
  mealCard: {marginBottom: Sizes.md},
  mealHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Sizes.sm},
  mealContent: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  mealCalories: {fontWeight: '600', color: Colors.primary},
  mealMacros: {flexDirection: 'row', gap: Sizes.md},
  foodsCount: {color: Colors.textSecondary, marginTop: Sizes.sm},
  fab: {position: 'absolute', right: 16, bottom: 16, backgroundColor: Colors.primary},
});

export default HomeScreen;
