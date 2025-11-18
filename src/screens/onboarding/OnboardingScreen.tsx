import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, TextInput, Button, RadioButton, Chip, Switch} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {OnboardingScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {useStats} from '@/hooks/useStats';
import {Colors, Sizes} from '@/config/theme';
import {ActivityLevel, Gender, GoalType, ActivityLevelLabels, GenderLabels, GoalTypeLabels} from '@/types/api.types';
import {calculateBMR, calculateTDEE, calculateGoalCalories, calculateMacros} from '@/utils/calculations';

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const [step, setStep] = useState(1);
  const {updateProfile, user} = useAuth();
  const {updateGoal} = useStats();

  // Step 1: Datos personales
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);

  // Step 2: Nivel de actividad
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.Moderate);

  // Step 3: Objetivo
  const [goalType, setGoalType] = useState<GoalType>(GoalType.MaintainWeight);

  // Step 4: API Key (opcional)
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // Step 5: Metas
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(150);
  const [carbs, setCarbs] = useState(250);
  const [fat, setFat] = useState(67);

  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 5) {
      // Calcular automáticamente si está activado
      if (step === 3 && autoCalculate) {
        const bmr = calculateBMR(Number(weight), Number(height), Number(age), gender);
        const tdee = calculateTDEE(bmr, activityLevel);
        const goalCals = calculateGoalCalories(tdee, goalType);
        const macros = calculateMacros(goalCals, goalType);

        setCalories(goalCals);
        setProtein(macros.protein);
        setCarbs(macros.carbs);
        setFat(macros.fat);
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Actualizar perfil
      await updateProfile({
        name: user?.name || '',
        weight: Number(weight),
        height: Number(height),
        age: Number(age),
        gender,
        activityLevel,
      });

      // Actualizar metas
      await updateGoal({
        dailyCalories: calories,
        dailyProtein: protein,
        dailyCarbs: carbs,
        dailyFat: fat,
        goalType,
      });

      // Navegar a Main
      navigation.replace('Main');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text variant="headlineMedium" style={styles.stepTitle}>Datos Personales</Text>
            <TextInput mode="outlined" label="Peso (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" style={styles.input} />
            <TextInput mode="outlined" label="Altura (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" style={styles.input} />
            <TextInput mode="outlined" label="Edad" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
            <Text variant="bodyLarge" style={styles.label}>Género</Text>
            <RadioButton.Group onValueChange={v => setGender(Number(v))} value={gender.toString()}>
              {Object.values(Gender).filter(v => typeof v === 'number').map(g => (
                <RadioButton.Item key={g} label={GenderLabels[g as Gender]} value={g.toString()} />
              ))}
            </RadioButton.Group>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text variant="headlineMedium" style={styles.stepTitle}>Nivel de Actividad</Text>
            <RadioButton.Group onValueChange={v => setActivityLevel(Number(v))} value={activityLevel.toString()}>
              {Object.values(ActivityLevel).filter(v => typeof v === 'number').map(al => (
                <RadioButton.Item key={al} label={ActivityLevelLabels[al as ActivityLevel]} value={al.toString()} />
              ))}
            </RadioButton.Group>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text variant="headlineMedium" style={styles.stepTitle}>Objetivo</Text>
            <RadioButton.Group onValueChange={v => setGoalType(Number(v))} value={goalType.toString()}>
              {Object.values(GoalType).filter(v => typeof v === 'number').map(gt => (
                <RadioButton.Item key={gt} label={GoalTypeLabels[gt as GoalType]} value={gt.toString()} />
              ))}
            </RadioButton.Group>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text variant="headlineMedium" style={styles.stepTitle}>API Key de Gemini (Opcional)</Text>
            <TextInput mode="outlined" label="API Key" value={geminiApiKey} onChangeText={setGeminiApiKey} style={styles.input} />
            <Button mode="text" onPress={() => setStep(5)}>Omitir por ahora</Button>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContent}>
            <Text variant="headlineMedium" style={styles.stepTitle}>Metas Nutricionales</Text>
            <View style={styles.switchRow}>
              <Text>Calcular automáticamente</Text>
              <Switch value={autoCalculate} onValueChange={setAutoCalculate} />
            </View>
            <Text>Calorías: {calories}</Text>
            <Slider value={calories} onValueChange={setCalories} minimumValue={800} maximumValue={5000} step={50} disabled={autoCalculate} />
            <Text>Proteína: {protein}g</Text>
            <Slider value={protein} onValueChange={setProtein} minimumValue={20} maximumValue={500} step={5} disabled={autoCalculate} />
            <Text>Carbohidratos: {carbs}g</Text>
            <Slider value={carbs} onValueChange={setCarbs} minimumValue={50} maximumValue={800} step={10} disabled={autoCalculate} />
            <Text>Grasas: {fat}g</Text>
            <Slider value={fat} onValueChange={setFat} minimumValue={20} maximumValue={200} step={5} disabled={autoCalculate} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Text variant="bodyMedium">Paso {step} de 5</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {renderStep()}
      </ScrollView>
      <View style={styles.actions}>
        {step > 1 && <Button mode="outlined" onPress={handleBack}>Atrás</Button>}
        {step < 5 ? (
          <Button mode="contained" onPress={handleNext}>Siguiente</Button>
        ) : (
          <Button mode="contained" onPress={handleFinish} loading={loading}>Finalizar</Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  progress: {padding: Sizes.md, alignItems: 'center'},
  scroll: {padding: Sizes.lg},
  stepContent: {gap: Sizes.md},
  stepTitle: {fontWeight: '700', color: Colors.primary, marginBottom: Sizes.md},
  input: {marginBottom: Sizes.sm},
  label: {marginTop: Sizes.md, marginBottom: Sizes.sm},
  switchRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  actions: {padding: Sizes.lg, flexDirection: 'row', gap: Sizes.md, justifyContent: 'space-between'},
});

export default OnboardingScreen;
