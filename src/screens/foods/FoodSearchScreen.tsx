import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Searchbar, Card, IconButton, FAB} from 'react-native-paper';
import {FoodSearchScreenProps} from '@/types/navigation.types';
import {useDebounce} from '@/hooks/useDebounce';
import foodService from '@/services/food.service';
import {FoodDto} from '@/types/food.types';
import {Colors, Sizes} from '@/config/theme';

const FoodSearchScreen: React.FC<FoodSearchScreenProps> = ({route, navigation}) => {
  const {onSelectFood} = route.params;
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<FoodDto[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      searchFoods();
    }
  }, [debouncedQuery]);

  const searchFoods = async () => {
    setLoading(true);
    try {
      const result = await foodService.searchFoods(debouncedQuery);
      if (result.success && result.data) {
        setFoods(result.data);
      }
    } catch (error) {
      console.error('Error searching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Searchbar
          placeholder="Buscar alimentos..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={foods}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card} onPress={() => onSelectFood(item)}>
            <Card.Content>
              <Text variant="bodyLarge">{item.name}</Text>
              <Text variant="bodySmall">
                {item.calories} kcal | {item.servingSize}
              </Text>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        label="Crear Personalizado"
        onPress={() => navigation.navigate('CustomFoodForm', {onFoodCreated: () => {}})}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center', padding: Sizes.sm},
  searchbar: {flex: 1},
  list: {padding: Sizes.md},
  card: {marginBottom: Sizes.sm},
  fab: {position: 'absolute', right: 16, bottom: 16, backgroundColor: Colors.primary},
});

export default FoodSearchScreen;
