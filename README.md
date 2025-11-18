# CaloriesAI - Mobile App

Aplicación móvil React Native para seguimiento de calorías con análisis de imágenes mediante IA (Gemini).

## 📱 Características

- ✅ **Autenticación** completa (Login/Register)
- ✅ **Onboarding** interactivo de 5 pasos
- ✅ **Análisis de imágenes** con IA Gemini
- ✅ **Seguimiento de calorías** y macros diarios
- ✅ **Registro manual** de alimentos
- ✅ **Alimentos personalizados**
- ✅ **Estadísticas** con gráficas
- ✅ **Metas nutricionales** personalizadas
- ✅ **Perfil de usuario** editable

## 🏗️ Arquitectura

```
src/
├── config/          # Configuración (API, theme)
├── constants/       # Strings y constantes
├── hooks/           # Custom hooks (useAuth, useMeals, useStats, useDebounce)
├── navigation/      # React Navigation (Stack + Bottom Tabs)
├── screens/         # Pantallas de la app
├── services/        # Servicios de API (Axios)
├── store/           # Redux Toolkit (slices + store)
├── types/           # TypeScript types (generados desde Swagger)
└── utils/           # Utilidades (validators, formatters, calculations, etc.)
```

## 🛠️ Stack Tecnológico

- **Framework**: React Native 0.73 (CLI)
- **Lenguaje**: TypeScript
- **Estado**: Redux Toolkit
- **Navegación**: React Navigation v6
- **UI**: React Native Paper (Material Design)
- **Formularios**: react-hook-form + yup
- **Gráficas**: react-native-chart-kit
- **HTTP**: Axios
- **Storage**: AsyncStorage

## 📦 Instalación

### Prerequisitos

- Node.js >= 18
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS, solo macOS)

### Pasos

1. **Instalar dependencias**:
```bash
npm install
```

2. **Instalar dependencias nativas (iOS)**:
```bash
cd ios && pod install && cd ..
```

3. **Configurar la URL del backend**:

Edita `src/config/api.ts` y cambia la URL base:

```typescript
export const API_CONFIG = {
  baseURL: __DEV__
    ? Platform.OS === 'android'
      ? 'http://10.0.2.2:5015/api'  // Android emulator
      : 'http://localhost:5015/api'  // iOS simulator
    : 'https://tu-servidor.com/api', // CAMBIAR ESTA URL EN PRODUCCIÓN
  timeout: 30000,
};
```

**IMPORTANTE**: Para dispositivos físicos, usa la IP de tu computadora:
```typescript
baseURL: 'http://192.168.1.X:5015/api'  // Reemplaza X con tu IP
```

4. **Ejecutar la app**:

Android:
```bash
npm run android
```

iOS:
```bash
npm run ios
```

## 🔧 Configuración Adicional

### Android

#### Permisos (android/app/src/main/AndroidManifest.xml):
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

#### Network Security (android/app/src/main/res/xml/network_security_config.xml):
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">192.168.1.1</domain>
    </domain-config>
</network-security-config>
```

Agregar en AndroidManifest.xml dentro de `<application>`:
```xml
android:networkSecurityConfig="@xml/network_security_config"
```

### iOS

#### Permisos (ios/CaloriesAI/Info.plist):
```xml
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para tomar fotos de tus comidas</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Necesitamos acceso a tu galería para seleccionar fotos</string>
```

## 📱 Flujo de la Aplicación

1. **SplashScreen** → Verifica token
2. **Auth Flow**:
   - Login / Register
   - Después de registro → Onboarding (5 pasos)
3. **Main App**:
   - **Home Tab**: Resumen diario + lista de comidas
   - **Statistics Tab**: Gráficas y estadísticas
   - **Profile Tab**: Perfil y configuración

## 🎨 Paleta de Colores

```typescript
Primary: #4CAF50      // Verde moderno
Accent: #FF9800       // Naranja energía
Background: #FAFAFA   // Gris claro
Error: #F44336        // Rojo
Success: #8BC34A      // Verde claro

// Macros
Protein: #FF6384      // Rojo
Carbs: #36A2EB        // Azul
Fat: #FFCE56          // Amarillo
```

## 🔐 Autenticación

La app usa JWT tokens almacenados en AsyncStorage:

```typescript
// Token guardado automáticamente en login/register
await AsyncStorage.setItem('auth_token', token);

// Interceptor de Axios agrega el token a todas las requests
config.headers.Authorization = `Bearer ${token}`;

// Si el token expira (401), se limpia y redirige a login
```

## 📊 Redux State Management

### Slices disponibles:

1. **authSlice**: Estado de autenticación
   - `user`, `isAuthenticated`, `isLoading`, `error`
   - Thunks: `login`, `register`, `logout`, `getProfile`, `updateProfile`

2. **mealSlice**: Estado de comidas
   - `meals`, `currentMeal`, `isLoading`, `isAnalyzing`
   - Thunks: `fetchMealsByDate`, `createMeal`, `deleteMeal`, `analyzeImage`

3. **statsSlice**: Estado de estadísticas
   - `dailySummary`, `chartData`, `goal`
   - Thunks: `fetchDailySummary`, `fetchChartData`, `updateGoal`

### Uso en componentes:

```typescript
import {useAuth} from '@/hooks/useAuth';
import {useMeals} from '@/hooks/useMeals';
import {useStats} from '@/hooks/useStats';

const MyComponent = () => {
  const {user, login, logout} = useAuth();
  const {meals, getMealsByDate} = useMeals();
  const {dailySummary, getDailySummary} = useStats();

  // ...
};
```

## 📸 Análisis de Imágenes

```typescript
import {takePhoto, pickFromGallery} from '@/utils/imageUtils';
import {useMeals} from '@/hooks/useMeals';

const {analyzeImage} = useMeals();

// Tomar foto
const uri = await takePhoto();
if (uri) {
  const result = await analyzeImage(uri);
  // result contiene: {photoUrl, detectedFoods[]}
}
```

## 🧮 Cálculos Nutricionales

La app incluye utilidades para calcular:

- **BMR** (Tasa Metabólica Basal) - Fórmula Mifflin-St Jeor
- **TDEE** (Gasto Energético Total Diario)
- **Calorías objetivo** según meta (perder/mantener/ganar peso)
- **Distribución de macros** automática
- **IMC** (Índice de Masa Corporal)

```typescript
import {
  calculateBMR,
  calculateTDEE,
  calculateGoalCalories,
  calculateMacros,
} from '@/utils/calculations';

const bmr = calculateBMR(weight, height, age, gender);
const tdee = calculateTDEE(bmr, activityLevel);
const goalCalories = calculateGoalCalories(tdee, goalType);
const macros = calculateMacros(goalCalories, goalType);
```

## 🐛 Debugging

### React Native Debugger

```bash
# Abrir menú de desarrollo
# Android: Ctrl + M o Cmd + M
# iOS: Cmd + D

# Opciones:
# - Reload
# - Debug
# - Enable Fast Refresh
# - Show Inspector
```

### Logs

```bash
# Android
npx react-native log-android

# iOS
npx react-native log-ios
```

## 📝 Tareas Pendientes / Mejoras Futuras

- [ ] Implementar tema oscuro completo
- [ ] Agregar internacionalización (i18n)
- [ ] Implementar búsqueda de alimentos con debouncing mejorado
- [ ] Agregar animaciones adicionales con react-native-reanimated
- [ ] Implementar notificaciones push
- [ ] Agregar exportación de datos a PDF/CSV
- [ ] Implementar caché de imágenes más robusto
- [ ] Agregar tests unitarios y de integración
- [ ] Implementar actualizaciones OTA (CodePush)
- [ ] Agregar soporte offline con persistencia Redux

## 🤝 Contribuciones

Este proyecto fue generado como una aplicación completa y funcional. Para contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para el propietario.

## 📧 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Generado con ❤️ por Claude Code**
