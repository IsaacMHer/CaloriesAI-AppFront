import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {Text, TextInput, Button, HelperText, IconButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RegisterScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {registerSchema} from '@/utils/validators';
import {Colors, Sizes} from '@/config/theme';
import {Strings} from '@/constants/strings';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const {register, isLoading} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      // Después del registro exitoso, ir a Onboarding
      navigation.replace('Onboarding' as never);
    } catch (error: any) {
      Alert.alert('Error', error.message || Strings.common.unexpectedError);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header con botón de volver */}
      <View style={styles.headerBar}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            {Strings.auth.register}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Crea tu cuenta para comenzar
          </Text>
        </View>

        <View style={styles.form}>
          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  mode="outlined"
                  label={Strings.auth.name}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.name}
                  left={<TextInput.Icon icon="account" />}
                  style={styles.input}
                />
                {errors.name && (
                  <HelperText type="error">{errors.name.message}</HelperText>
                )}
              </>
            )}
          />

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
                  <HelperText type="error">{errors.email.message}</HelperText>
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
                  <HelperText type="error">{errors.password.message}</HelperText>
                )}
              </>
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInput
                  mode="outlined"
                  label={Strings.auth.confirmPassword}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showConfirmPassword}
                  error={!!errors.confirmPassword}
                  left={<TextInput.Icon icon="lock-check" />}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                  style={styles.input}
                />
                {errors.confirmPassword && (
                  <HelperText type="error">{errors.confirmPassword.message}</HelperText>
                )}
              </>
            )}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
            contentStyle={styles.buttonContent}>
            {Strings.auth.register}
          </Button>

          <View style={styles.footer}>
            <Text variant="bodyMedium" style={styles.footerText}>
              {Strings.auth.hasAccount}{' '}
            </Text>
            <Text
              variant="bodyMedium"
              style={styles.link}
              onPress={() => navigation.goBack()}>
              {Strings.auth.loginLink}
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
  headerBar: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingHorizontal: Sizes.sm,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Sizes.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Sizes.xl,
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

export default RegisterScreen;
