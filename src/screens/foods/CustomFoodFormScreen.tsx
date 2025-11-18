import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {CustomFoodFormScreenProps} from '@/types/navigation.types';
import {customFoodSchema} from '@/utils/validators';
import foodService from '@/services/food.service';
import {Colors, Sizes} from '@/config/theme';

interface CustomFoodForm {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  servingSize: string;
  category?: string;
}

const CustomFoodFormScreen: React.FC<CustomFoodFormScreenProps> = ({route, navigation}) => {
  const {onFoodCreated} = route.params;
  const {control, handleSubmit, formState: {errors}} = useForm<CustomFoodForm>({
    resolver: yupResolver(customFoodSchema),
  });

  const onSubmit = async (data: CustomFoodForm) => {
    try {
      await foodService.createCustomFood({
        name: data.name,
        calories: Number(data.calories),
        protein: Number(data.protein),
        carbs: Number(data.carbs),
        fat: Number(data.fat),
        servingSize: data.servingSize,
        category: data.category,
      });
      Alert.alert('Éxito', 'Alimento creado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el alimento');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="close" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Crear Alimento</Text>
        <View style={{width: 48}} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Controller control={control} name="name" render={({field}) => (
          <TextInput mode="outlined" label="Nombre" {...field} style={styles.input} error={!!errors.name} />
        )} />
        <Controller control={control} name="calories" render={({field}) => (
          <TextInput mode="outlined" label="Calorías" {...field} keyboardType="numeric" style={styles.input} />
        )} />
        <Controller control={control} name="protein" render={({field}) => (
          <TextInput mode="outlined" label="Proteína (g)" {...field} keyboardType="numeric" style={styles.input} />
        )} />
        <Controller control={control} name="carbs" render={({field}) => (
          <TextInput mode="outlined" label="Carbohidratos (g)" {...field} keyboardType="numeric" style={styles.input} />
        )} />
        <Controller control={control} name="fat" render={({field}) => (
          <TextInput mode="outlined" label="Grasas (g)" {...field} keyboardType="numeric" style={styles.input} />
        )} />
        <Controller control={control} name="servingSize" render={({field}) => (
          <TextInput mode="outlined" label="Tamaño de Porción" {...field} style={styles.input} />
        )} />

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
          Guardar Alimento
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.sm},
  scroll: {padding: Sizes.lg},
  input: {marginBottom: Sizes.md},
  button: {marginTop: Sizes.lg},
});

export default CustomFoodFormScreen;
