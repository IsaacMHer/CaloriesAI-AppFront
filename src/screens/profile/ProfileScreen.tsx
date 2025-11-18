import React from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, Card, List, Avatar, Button, Divider} from 'react-native-paper';
import {ProfileMainScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {Colors, Sizes} from '@/config/theme';
import {getInitials, formatWeight, formatHeight} from '@/utils/formatters';

const ProfileScreen: React.FC<ProfileMainScreenProps> = ({navigation}) => {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({index: 0, routes: [{name: 'Auth' as never}]});
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text
              size={80}
              label={user ? getInitials(user.name) : '?'}
              style={styles.avatar}
            />
            <Text variant="headlineSmall" style={styles.name}>
              {user?.name || 'Usuario'}
            </Text>
            <Text variant="bodyMedium" style={styles.email}>
              {user?.email}
            </Text>
          </Card.Content>
        </Card>

        {/* Datos Personales */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Información Personal
            </Text>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Peso:</Text>
              <Text variant="bodyMedium">
                {user?.weight ? formatWeight(user.weight) : 'No definido'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Altura:</Text>
              <Text variant="bodyMedium">
                {user?.height ? formatHeight(user.height) : 'No definido'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Edad:</Text>
              <Text variant="bodyMedium">
                {user?.age ? `${user.age} años` : 'No definido'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Configuración */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Configuración
            </Text>
          </Card.Content>
          <List.Item
            title="Editar Perfil"
            left={props => <List.Icon {...props} icon="account-edit" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <Divider />
          <List.Item
            title="Metas Nutricionales"
            left={props => <List.Icon {...props} icon="target" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('GoalsSettings')}
          />
          <Divider />
          <List.Item
            title="API Key de Gemini"
            left={props => <List.Icon {...props} icon="key" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card>

        {/* Cerrar Sesión */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          icon="logout"
          style={styles.logoutButton}
          textColor={Colors.error}>
          Cerrar Sesión
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  scroll: {padding: Sizes.lg},
  profileCard: {marginBottom: Sizes.lg, alignItems: 'center'},
  profileContent: {alignItems: 'center'},
  avatar: {backgroundColor: Colors.primary, marginBottom: Sizes.md},
  name: {fontWeight: '700', marginBottom: Sizes.xs},
  email: {color: Colors.textSecondary},
  card: {marginBottom: Sizes.lg},
  sectionTitle: {fontWeight: '600', marginBottom: Sizes.md},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Sizes.sm,
  },
  logoutButton: {marginTop: Sizes.lg, borderColor: Colors.error},
});

export default ProfileScreen;
