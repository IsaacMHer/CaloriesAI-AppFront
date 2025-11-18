import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text, Card, Button, TextInput, IconButton} from 'react-native-paper';
import {FoodDetectionResultScreenProps} from '@/types/navigation.types';
import {Colors, Sizes} from '@/config/theme';

const FoodDetectionResultScreen: React.FC<FoodDetectionResultScreenProps> = ({route, navigation}) => {
  const {photoUrl, detectedFoods} = route.params;
  const [foods, setFoods] = useState(detectedFoods);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Resultado del Análisis</Text>
        <View style={{width: 48}} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {photoUrl && <Image source={{uri: photoUrl}} style={styles.image} />}

        <Text variant="titleMedium" style={styles.title}>Alimentos Detectados</Text>

        {foods.map((food, index) => (
          <Card key={index} style={styles.foodCard}>
            <Card.Content>
              <Text variant="bodyLarge">{food.name}</Text>
              <View style={styles.row}>
                <TextInput
                  mode="outlined"
                  label="Cantidad"
                  value={food.estimatedQuantity.toString()}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  mode="outlined"
                  label="Unidad"
                  value={food.unit}
                  style={styles.input}
                />
              </View>
              <Text variant="bodySmall">
                {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | G: {food.fat}g
              </Text>
            </Card.Content>
          </Card>
        ))}

        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Guardar Comida
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.sm},
  scroll: {padding: Sizes.lg},
  image: {width: '100%', height: 200, borderRadius: Sizes.radiusMd, marginBottom: Sizes.lg},
  title: {marginBottom: Sizes.md},
  foodCard: {marginBottom: Sizes.md},
  row: {flexDirection: 'row', gap: Sizes.sm, marginVertical: Sizes.sm},
  input: {flex: 1},
  button: {marginTop: Sizes.lg},
});

export default FoodDetectionResultScreen;
