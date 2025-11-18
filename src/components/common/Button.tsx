import React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, Sizes} from '@/config/theme';

interface ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'error';
}

const Button: React.FC<ButtonProps> = ({
  mode = 'contained',
  onPress,
  children,
  loading = false,
  disabled = false,
  icon,
  style,
  variant = 'primary',
}) => {
  const getButtonColor = () => {
    if (variant === 'error') return Colors.error;
    if (variant === 'secondary') return Colors.accent;
    return Colors.primary;
  };

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      buttonColor={mode === 'contained' ? getButtonColor() : undefined}
      textColor={mode === 'outlined' ? getButtonColor() : undefined}
      style={[styles.button, style]}
      contentStyle={styles.content}>
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Sizes.radiusMd,
  },
  content: {
    height: Sizes.buttonHeight,
  },
});

export default Button;
