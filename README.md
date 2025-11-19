# CaloriesAI - Aplicación Móvil con Expo

Aplicación móvil de seguimiento de calorías con análisis de imágenes mediante IA, construida con **Expo SDK 54** y **TypeScript**.

## 🚀 Características

- ✅ **React Native con Expo** (SDK 54)
- ✅ **TypeScript** con configuración estricta
- ✅ **Redux Toolkit** con persistencia offline (Redux Persist)
- ✅ **React Navigation** (Stack + Bottom Tabs)
- ✅ **React Native Paper** (Material Design)
- ✅ **Tema Oscuro** con soporte automático del sistema
- ✅ **Modo Offline** con sincronización automática
- ✅ **Caché de Imágenes** con Expo Image
- ✅ **Image Picker** (Cámara y Galería)
- ✅ **Gestión de Estado** con Redux Toolkit
- ✅ **Formularios** con React Hook Form + Yup
- ✅ **Gráficas** para estadísticas nutricionales
- ✅ **API REST** con Axios

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18 (recomendado: 20 LTS)
- **npm** o **yarn**
- **Expo Go** app en tu dispositivo móvil (Android/iOS):
  - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

### Para desarrollo avanzado (opcional):

- **Android Studio** (para emulador Android)
- **Xcode** (para emulador iOS, solo en macOS)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/IsaacMHer/CaloriesAI-AppFront.git
cd CaloriesAI-AppFront
```

### 2. Instalar dependencias

```bash
npm install
```

Si encuentras problemas con versiones de dependencias:

```bash
npm install --legacy-peer-deps
```

### 3. Configurar variables de entorno

El archivo `src/config/api.ts` contiene la configuración de la API. Actualiza la URL según tu entorno:

```typescript
export const API_CONFIG = {
  baseURL: __DEV__
    ? Platform.OS === 'android'
      ? 'http://10.0.2.2:5015/api'  // Para emulador Android
      : 'http://localhost:5015/api'  // Para iOS
    : 'https://tu-servidor.com/api',  // URL de producción
  timeout: 30000,
};
```

## 🚀 Ejecución en Desarrollo

### Iniciar Expo Development Server

```bash
npm start
```

o

```bash
npx expo start
```

Esto abrirá Expo DevTools en tu navegador con un código QR.

### Ejecutar en dispositivo físico

#### Android

1. Instala **Expo Go** desde Google Play Store
2. Abre Expo Go y escanea el código QR desde la terminal o navegador
3. La app se cargará automáticamente en tu dispositivo

#### iOS

1. Instala **Expo Go** desde App Store
2. Abre la app Cámara de iOS y escanea el código QR
3. Toca la notificación para abrir en Expo Go
4. La app se cargará automáticamente en tu dispositivo

### Ejecutar en emulador

#### Android Emulator

```bash
npm run android
```

o

```bash
npx expo start --android
```

**Requisitos:**
- Android Studio instalado
- Emulador Android configurado y en ejecución

#### iOS Simulator (solo macOS)

```bash
npm run ios
```

o

```bash
npx expo start --ios
```

**Requisitos:**
- Xcode instalado
- Simulador iOS configurado

## 📱 Compilación para Producción

### Build con EAS (Expo Application Services)

#### 1. Instalar EAS CLI

```bash
npm install -g eas-cli
```

#### 2. Login en Expo

```bash
eas login
```

#### 3. Configurar el proyecto

```bash
eas build:configure
```

#### 4. Build para Android (APK/AAB)

```bash
# APK para distribución directa
eas build --platform android --profile preview

# AAB para Google Play Store
eas build --platform android --profile production
```

#### 5. Build para iOS (solo con cuenta de Apple Developer)

```bash
eas build --platform ios --profile production
```

### Descargar builds

Una vez completado el build, recibirás un enlace para descargar el APK/IPA:

```bash
# Listar builds
eas build:list

# Descargar último build
eas build:download
```

## 📁 Estructura del Proyecto

```
CaloriesAI-AppFront/
├── assets/                 # Imágenes, iconos, splash screen
├── src/
│   ├── components/        # Componentes reutilizables
│   │   └── common/        # Componentes comunes (CachedImage, etc.)
│   ├── config/            # Configuración (API, theme, etc.)
│   ├── constants/         # Constantes y strings
│   ├── contexts/          # Context API (ThemeContext)
│   ├── hooks/             # Custom hooks
│   ├── navigation/        # Configuración de navegación
│   ├── screens/           # Pantallas de la app
│   │   ├── auth/         # Login, Register
│   │   ├── home/         # Dashboard
│   │   ├── meals/        # Gestión de comidas
│   │   ├── foods/        # Búsqueda de alimentos
│   │   ├── profile/      # Perfil y configuración
│   │   ├── statistics/   # Gráficas y estadísticas
│   │   └── onboarding/   # Onboarding inicial
│   ├── services/          # Servicios de API
│   ├── store/             # Redux store y slices
│   ├── types/             # TypeScript types
│   └── utils/             # Utilidades y helpers
├── App.tsx                # Componente raíz
├── app.json               # Configuración de Expo
├── babel.config.js        # Configuración de Babel
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias
```

## 🔑 Características Principales

### 1. Autenticación

- Login y registro de usuarios
- Almacenamiento seguro de tokens con AsyncStorage
- Protección de rutas según autenticación

### 2. Dashboard

- Resumen diario de calorías consumidas
- Progreso de macros (proteínas, carbohidratos, grasas)
- Lista de comidas del día
- Gráficos circulares de progreso

### 3. Gestión de Comidas

- Captura de fotos con cámara
- Selección de imágenes de galería
- Análisis de alimentos con IA (Gemini)
- Edición manual de comidas
- Búsqueda de alimentos en base de datos

### 4. Estadísticas

- Gráficas de progreso semanal/mensual
- Historial de consumo calórico
- Tendencias de macronutrientes
- Comparativa con objetivos

### 5. Perfil

- Edición de datos personales
- Configuración de metas nutricionales
- Cambio de tema (claro/oscuro/automático)
- Limpieza de caché de imágenes

### 6. Modo Offline

- Funcionamiento sin conexión
- Cola de operaciones pendientes
- Sincronización automática al reconectar
- Indicador de estado de conexión

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm start              # Iniciar Expo DevTools
npm run android        # Ejecutar en Android
npm run ios            # Ejecutar en iOS
npm run web            # Ejecutar en navegador

# Utilidades
npm test               # Ejecutar tests (si están configurados)
npm run lint           # Linter (si está configurado)
npm run type-check     # Verificar tipos de TypeScript
```

## 🐛 Solución de Problemas

### Error: "Unable to resolve module"

```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### Error de permisos de cámara/galería

- **Android**: Verifica que los permisos estén declarados en `app.json`
- **iOS**: Verifica las descripciones de permisos en `app.json` → `ios.infoPlist`

### Error: "Network request failed"

- Verifica que la URL de la API en `src/config/api.ts` sea correcta
- Para emulador Android, usa `10.0.2.2` en lugar de `localhost`
- Para dispositivo físico, usa la IP de tu computadora en la red local

### La app no se actualiza

```bash
# Reiniciar servidor con caché limpio
npx expo start --clear
```

### Problemas con React Native Reanimated

Si ves warnings sobre Reanimated, asegúrate de que esté al final de `babel.config.js`:

```javascript
plugins: [
  // ... otros plugins
  'react-native-reanimated/plugin',  // Debe ser el último
],
```

## 📦 Dependencias Principales

### Core

- **expo**: ~54.0.25
- **react**: 19.1.0
- **react-native**: 0.81.5
- **typescript**: ~5.9.2

### Navegación

- **@react-navigation/native**: ^6.1.9
- **@react-navigation/stack**: ^6.3.20
- **@react-navigation/bottom-tabs**: ^6.5.11

### Estado

- **@reduxjs/toolkit**: ^2.0.1
- **react-redux**: ^9.0.4
- **redux-persist**: ^6.0.0

### UI

- **react-native-paper**: ^5.11.3
- **react-native-reanimated**: ~4.1.1
- **react-native-svg**: 15.12.1
- **react-native-chart-kit**: ^6.12.0

### Utilidades

- **expo-image**: (incluido en Expo)
- **expo-image-picker**: (incluido en Expo)
- **expo-file-system**: (incluido en Expo)
- **@react-native-community/netinfo**: (compatible con Expo)
- **axios**: ^1.6.2
- **date-fns**: ^3.0.6

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y no tiene una licencia pública.

## 👥 Autor

**Isaac M. Her**

## 🆘 Soporte

Para problemas o preguntas:

- Abre un **Issue** en GitHub
- Contacta al equipo de desarrollo

## 🎯 Roadmap

- [ ] Integración con wearables (smartwatches)
- [ ] Modo oscuro automático por ubicación
- [ ] Recetas personalizadas
- [ ] Compartir progreso en redes sociales
- [ ] Widget para pantalla de inicio
- [ ] Notificaciones push para recordatorios

---

**¡Gracias por usar CaloriesAI!** 🥗📊
