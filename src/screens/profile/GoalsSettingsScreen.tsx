import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, Button, IconButton, Switch, Card} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {GoalsSettingsScreenProps} from '@/types/navigation.types';
import {useStats} from '@/hooks/useStats';
import {Colors, Sizes} from '@/config/theme';

const GoalsSettingsScreen: React.FC<GoalsSettingsScreenProps> = ({navigation}) => {
  const {goal, getGoal, updateGoal, getSuggestedGoal} = useStats();
  const [autoCalculate, setAutoCalculate] = useState(false);
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(150);
  const [carbs, setCarbs] = useState(250);
  const [fat, setFat] = useState(67);

  useEffect(() => {
    loadGoal();
  }, []);

  const loadGoal = async () => {
    const g = await getGoal();
    if (g) {
      setCalories(g.dailyCalories);
      setProtein(g.dailyProtein);
      setCarbs(g.dailyCarbs);
      setFat(g.dailyFat);
    }
  };

  const handleAutoCalculate = async (value: boolean) => {
    setAutoCalculate(value);
    if (value) {
      const suggested = await getSuggestedGoal();
      if (suggested) {
        setCalories(suggested.dailyCalories);
        setProtein(suggested.dailyProtein);
        setCarbs(suggested.dailyCarbs);
        setFat(suggested.dailyFat);
      }
    }
  };

  const handleSave = async () => {
    try {
      await updateGoal({
        dailyCalories: calories,
        dailyProtein: protein,
        dailyCarbs: carbs,
        dailyFat: fat,
        goalType: goal?.goalType || 1,
      });
      Alert.alert('Éxito', 'Metas actualizadas correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudieron actualizar las metas');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Metas Nutricionales</Text>
        <View style={{width: 48}} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.switchRow}>
              <Text variant="bodyLarge">Calcular automáticamente</Text>
              <Switch value={autoCalculate} onValueChange={handleAutoCalculate} />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Calorías Diarias</Text>
            <Text variant="headlineSmall" style={styles.value}>{Math.round(calories)} kcal</Text>
            <Slider
              value={calories}
              onValueChange={setCalories}
              minimumValue={800}
              maximumValue={5000}
              step={50}
              disabled={autoCalculate}
              minimumTrackTintColor={Colors.primary}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Proteína</Text>
            <Text variant="headlineSmall" style={styles.value}>{Math.round(protein)} g</Text>
            <Slider
              value={protein}
              onValueChange={setProtein}
              minimumValue={20}
              maximumValue={500}
              step={5}
              disabled={autoCalculate}
              minimumTrackTintColor={Colors.protein}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Carbohidratos</Text>
            <Text variant="headlineSmall" style={styles.value}>{Math.round(carbs)} g</Text>
            <Slider
              value={carbs}
              onValueChange={setCarbs}
              minimumValue={50}
              maximumValue={800}
              step={10}
              disabled={autoCalculate}
              minimumTrackTintColor={Colors.carbs}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Grasas</Text>
            <Text variant="headlineSmall" style={styles.value}>{Math.round(fat)} g</Text>
            <Slider
              value={fat}
              onValueChange={setFat}
              minimumValue={20}
              maximumValue={200}
              step={5}
              disabled={autoCalculate}
              minimumTrackTintColor={Colors.fat}
            />
          </Card.Content>
        </Card>

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Guardar Metas
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.sm},
  scroll: {padding: Sizes.lg},
  card: {marginBottom: Sizes.md},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {color: Colors.primary, fontWeight: '700', marginVertical: Sizes.sm},
  button: {marginTop: Sizes.lg},
});

export default GoalsSettingsScreen;
