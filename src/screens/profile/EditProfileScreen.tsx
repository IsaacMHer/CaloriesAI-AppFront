import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {EditProfileScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {profileSchema} from '@/utils/validators';
import {Colors, Sizes} from '@/config/theme';

interface ProfileForm {
  name: string;
  weight: string;
  height: string;
  age: string;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({navigation}) => {
  const {user, updateProfile} = useAuth();

  const {control, handleSubmit, formState: {errors}} = useForm<ProfileForm>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      weight: user?.weight?.toString() || '',
      height: user?.height?.toString() || '',
      age: user?.age?.toString() || '',
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile({
        name: data.name,
        weight: data.weight ? Number(data.weight) : null,
        height: data.height ? Number(data.height) : null,
        age: data.age ? Number(data.age) : null,
        gender: user?.gender,
        activityLevel: user?.activityLevel,
      });
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Editar Perfil</Text>
        <View style={{width: 48}} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Controller control={control} name="name" render={({field}) => (
          <TextInput mode="outlined" label="Nombre" {...field} style={styles.input} error={!!errors.name} />
        )} />
        <Controller control={control} name="weight" render={({field}) => (
          <TextInput mode="outlined" label="Peso (kg)" {...field} keyboardType="numeric" style={styles.input} />
        )} />
        <Controller control={control} name="height" render={({field}) => (
          <TextInput mode="outlined" label="Altura (cm)" {...field} keyboardType="numeric" style={styles.input} />
        )} />
        <Controller control={control} name="age" render={({field}) => (
          <TextInput mode="outlined" label="Edad" {...field} keyboardType="numeric" style={styles.input} />
        )} />

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
          Guardar Cambios
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

export default EditProfileScreen;
