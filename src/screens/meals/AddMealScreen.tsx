import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, Button, SegmentedButtons, IconButton} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {AddMealScreenProps} from '@/types/navigation.types';
import {takePhoto, pickFromGallery} from '@/utils/imageUtils';
import {useMeals} from '@/hooks/useMeals';
import {Colors, Sizes} from '@/config/theme';

const AddMealScreen: React.FC<AddMealScreenProps> = ({navigation}) => {
  const {analyzeImage, isAnalyzing} = useMeals();
  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'photo', title: 'Tomar Foto'},
    {key: 'manual', title: 'Manual'},
  ];

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      try {
        const result = await analyzeImage(uri);
        navigation.navigate('FoodDetectionResult', {
          photoUrl: result.photoUrl,
          detectedFoods: result.detectedFoods,
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo analizar la imagen');
      }
    }
  };

  const handlePickGallery = async () => {
    const uri = await pickFromGallery();
    if (uri) {
      try {
        const result = await analyzeImage(uri);
        navigation.navigate('FoodDetectionResult', {
          photoUrl: result.photoUrl,
          detectedFoods: result.detectedFoods,
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo analizar la imagen');
      }
    }
  };

  const PhotoRoute = () => (
    <View style={styles.tab}>
      <Text variant="titleMedium" style={styles.title}>Analizar Foto con IA</Text>
      <Button mode="contained" icon="camera" onPress={handleTakePhoto} style={styles.button}>
        Abrir Cámara
      </Button>
      <Button mode="outlined" icon="image" onPress={handlePickGallery} style={styles.button}>
        Seleccionar de Galería
      </Button>
    </View>
  );

  const ManualRoute = () => (
    <View style={styles.tab}>
      <Text variant="titleMedium" style={styles.title}>Agregar Manualmente</Text>
      <Button
        mode="contained"
        icon="magnify"
        onPress={() => navigation.navigate('FoodSearch', {onSelectFood: () => {}})}
        style={styles.button}>
        Buscar Alimentos
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="close" onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">Agregar Comida</Text>
        <View style={{width: 48}} />
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({photo: PhotoRoute, manual: ManualRoute})}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: Colors.primary}}
            style={{backgroundColor: Colors.surface}}
            activeColor={Colors.primary}
            inactiveColor={Colors.textSecondary}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.sm},
  tab: {flex: 1, padding: Sizes.lg, gap: Sizes.md},
  title: {textAlign: 'center', marginBottom: Sizes.lg},
  button: {marginVertical: Sizes.sm},
});

export default AddMealScreen;
