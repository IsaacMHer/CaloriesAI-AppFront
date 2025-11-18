import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {Text, TextInput, Button, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {loginSchema} from '@/utils/validators';
import {Colors, Sizes} from '@/config/theme';
import {Strings} from '@/constants/strings';

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {login, isLoading} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
      // Navegación manejada automáticamente por Redux
    } catch (error: any) {
      Alert.alert('Error', error.message || Strings.common.unexpectedError);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            {Strings.auth.login}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {Strings.appTagline}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  mode="outlined"
                  label={Strings.auth.email}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.email}
                  left={<TextInput.Icon icon="email" />}
                  style={styles.input}
                />
                {errors.email && (
                  <HelperText type="error" visible={!!errors.email}>
                    {errors.email.message}
                  </HelperText>
                )}
              </>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  mode="outlined"
                  label={Strings.auth.password}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  error={!!errors.password}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                />
                {errors.password && (
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password.message}
                  </HelperText>
                )}
              </>
            )}
          />

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
            contentStyle={styles.buttonContent}>
            {Strings.auth.login}
          </Button>

          {/* Register Link */}
          <View style={styles.footer}>
            <Text variant="bodyMedium" style={styles.footerText}>
              {Strings.auth.noAccount}{' '}
            </Text>
            <Text
              variant="bodyMedium"
              style={styles.link}
              onPress={() => navigation.navigate('Register')}>
              {Strings.auth.registerLink}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Sizes.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Sizes.xxl,
  },
  title: {
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Sizes.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: Sizes.sm,
  },
  button: {
    marginTop: Sizes.lg,
    borderRadius: Sizes.radiusMd,
  },
  buttonContent: {
    height: Sizes.buttonHeight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Sizes.lg,
  },
  footerText: {
    color: Colors.textSecondary,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
