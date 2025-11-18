# Guía de Configuración - CaloriesAI Mobile App

## 🚀 Configuración Inicial

### 1. Instalar React Native CLI

```bash
npm install -g react-native-cli
```

### 2. Instalar Dependencias

```bash
npm install
```

Para iOS (solo macOS):
```bash
cd ios && pod install && cd ..
```

### 3. Instalar Dependencia Adicional para Babel

La configuración de paths alias requiere el plugin de babel:

```bash
npm install --save-dev babel-plugin-module-resolver
```

## 📱 Configuración Android

### 1. Crear archivo de configuración de red

Crea `android/app/src/main/res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
        <!-- Agrega tu IP local aquí -->
        <domain includeSubdomains="true">192.168.1.X</domain>
    </domain-config>
</network-security-config>
```

### 2. Actualizar AndroidManifest.xml

Abre `android/app/src/main/AndroidManifest.xml` y agrega:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permisos -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
        android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />

    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme"
        android:networkSecurityConfig="@xml/network_security_config">

        <!-- Resto de la configuración... -->
    </application>
</manifest>
```

### 3. Configurar Vector Icons

Edita `android/app/build.gradle` y agrega al final:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 4. Ejecutar en Android

```bash
npm run android
```

O para limpiar caché:
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

## 🍎 Configuración iOS

### 1. Instalar CocoaPods

Si no tienes CocoaPods instalado:
```bash
sudo gem install cocoapods
```

### 2. Instalar Pods

```bash
cd ios
pod install
cd ..
```

Si tienes problemas:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### 3. Actualizar Info.plist

Abre `ios/CaloriesAI/Info.plist` y agrega:

```xml
<key>NSCameraUsageDescription</key>
<string>CaloriesAI necesita acceso a la cámara para tomar fotos de tus comidas y analizarlas con IA</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>CaloriesAI necesita acceso a tu galería para seleccionar fotos de comidas y analizarlas</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>CaloriesAI necesita permiso para guardar fotos de tus comidas</string>
```

### 4. Configurar Vector Icons

Los iconos deberían configurarse automáticamente con CocoaPods. Si tienes problemas, verifica que `node_modules/react-native-vector-icons/Fonts` esté en Build Phases > Copy Bundle Resources.

### 5. Ejecutar en iOS

```bash
npm run ios
```

O para un dispositivo específico:
```bash
npm run ios -- --simulator="iPhone 15 Pro"
```

## 🔧 Configuración del Backend

### 1. Actualizar URL del API

Edita `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  baseURL: __DEV__
    ? Platform.OS === 'android'
      ? 'http://10.0.2.2:5015/api'      // Emulador Android
      : 'http://localhost:5015/api'      // Simulador iOS
    : 'https://tu-servidor.com/api',     // Producción
  timeout: 30000,
};
```

### 2. Para dispositivos físicos

Si estás probando en un dispositivo físico, usa la IP de tu computadora:

1. Encuentra tu IP:
   - **Windows**: `ipconfig`
   - **Mac/Linux**: `ifconfig` o `ip addr`

2. Actualiza la URL:
```typescript
baseURL: 'http://192.168.1.X:5015/api'  // Reemplaza X con tu IP
```

3. Asegúrate de que el backend esté escuchando en todas las interfaces (0.0.0.0) y no solo en localhost.

## ⚠️ Solución de Problemas Comunes

### Error: "Unable to resolve module"

```bash
npm start -- --reset-cache
```

### Error de bundling en Android

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Error de pods en iOS

```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

### Error de permisos de cámara

Asegúrate de que los permisos están correctamente configurados en:
- Android: `AndroidManifest.xml`
- iOS: `Info.plist`

### Error de conexión al backend

1. Verifica que el backend esté corriendo
2. Verifica la URL en `src/config/api.ts`
3. Para Android emulator, usa `10.0.2.2` en lugar de `localhost`
4. Para iOS simulator, usa `localhost`
5. Para dispositivos físicos, usa tu IP local

### Error: "react-native-vector-icons"

```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS
cd ios && pod install && cd ..
```

## 📦 Dependencias Importantes

Asegúrate de tener instaladas todas las dependencias de `package.json`. Si alguna falta:

```bash
npm install
```

Para dependencias nativas que requieren linking:
```bash
npx pod-install  # iOS
```

## 🧪 Testing

Para ejecutar la app en modo desarrollo:

```bash
# Iniciar Metro bundler
npm start

# En otra terminal, ejecutar Android
npm run android

# O iOS
npm run ios
```

## 🏗️ Build de Producción

### Android (APK)

```bash
cd android
./gradlew assembleRelease
```

El APK estará en: `android/app/build/outputs/apk/release/app-release.apk`

### iOS

1. Abre `ios/CaloriesAI.xcworkspace` en Xcode
2. Selecciona Product > Archive
3. Sigue el proceso de distribución de Apple

## 📝 Variables de Entorno

Para usar variables de entorno, instala:

```bash
npm install react-native-config
```

Luego crea un archivo `.env`:

```env
API_URL=http://localhost:5015/api
GEMINI_DEFAULT_KEY=tu_key_aqui
```

## ✅ Checklist de Configuración

- [ ] Node.js >= 18 instalado
- [ ] React Native CLI instalado
- [ ] Android Studio configurado (para Android)
- [ ] Xcode instalado (para iOS, solo macOS)
- [ ] Dependencias npm instaladas
- [ ] CocoaPods instalados (iOS)
- [ ] URL del backend configurada
- [ ] Permisos configurados (cámara, galería)
- [ ] Vector icons configurados
- [ ] Backend corriendo y accesible

## 🎉 ¡Listo!

Si completaste todos los pasos, la app debería compilar y ejecutarse correctamente. Si encuentras problemas, revisa la sección de Solución de Problemas Comunes.

---

**¿Necesitas ayuda?** Consulta la documentación oficial de React Native: https://reactnative.dev/
