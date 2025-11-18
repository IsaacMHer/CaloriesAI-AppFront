import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, Card, SegmentedButtons} from 'react-native-paper';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {StatisticsScreenProps} from '@/types/navigation.types';
import {useStats} from '@/hooks/useStats';
import {Colors, Sizes} from '@/config/theme';
import {ChartPeriod} from '@/types/stats.types';

const StatisticsScreen: React.FC<StatisticsScreenProps> = () => {
  const {chartData, getChartData} = useStats();
  const [period, setPeriod] = useState<ChartPeriod>('7days');

  useEffect(() => {
    getChartData(period);
  }, [period]);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    style: {borderRadius: 16},
  };

  const pieData = chartData
    ? [
        {name: 'Proteína', population: chartData.macrosDistribution.totalProteinGrams, color: Colors.protein, legendFontColor: Colors.text},
        {name: 'Carbos', population: chartData.macrosDistribution.totalCarbsGrams, color: Colors.carbs, legendFontColor: Colors.text},
        {name: 'Grasas', population: chartData.macrosDistribution.totalFatGrams, color: Colors.fat, legendFontColor: Colors.text},
      ]
    : [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="headlineMedium" style={styles.title}>Estadísticas</Text>

        <SegmentedButtons
          value={period}
          onValueChange={(value) => setPeriod(value as ChartPeriod)}
          buttons={[
            {value: '7days', label: '7 días'},
            {value: '30days', label: '30 días'},
          ]}
          style={styles.segmented}
        />

        {chartData && chartData.dailyCalories.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Calorías Diarias</Text>
              <LineChart
                data={{
                  labels: chartData.dailyCalories.map((_, i) => `${i + 1}`),
                  datasets: [{data: chartData.dailyCalories.map(d => d.calories)}],
                }}
                width={Dimensions.get('window').width - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </Card.Content>
          </Card>
        )}

        {pieData.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Distribución de Macros</Text>
              <PieChart
                data={pieData}
                width={Dimensions.get('window').width - 64}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  scroll: {padding: Sizes.lg},
  title: {fontWeight: '700', marginBottom: Sizes.lg},
  segmented: {marginBottom: Sizes.lg},
  card: {marginBottom: Sizes.lg},
  chart: {marginTop: Sizes.md, borderRadius: Sizes.radiusMd},
});

export default StatisticsScreen;
