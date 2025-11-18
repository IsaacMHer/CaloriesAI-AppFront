/**
 * Strings y textos de la aplicación
 * TODO: Implementar i18n para múltiples idiomas
 */

export const Strings = {
  // App
  appName: 'CaloriesAI',
  appTagline: 'Tu asistente inteligente de nutrición',

  // Auth
  auth: {
    login: 'Iniciar Sesión',
    register: 'Crear Cuenta',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    name: 'Nombre',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes cuenta?',
    hasAccount: '¿Ya tienes cuenta?',
    registerLink: 'Regístrate',
    loginLink: 'Inicia sesión',
    logout: 'Cerrar Sesión',
    logoutConfirm: '¿Estás seguro que deseas cerrar sesión?',
  },

  // Onboarding
  onboarding: {
    step1Title: 'Datos Personales',
    step1Subtitle: 'Cuéntanos sobre ti',
    step2Title: 'Nivel de Actividad',
    step2Subtitle: '¿Qué tan activo eres?',
    step3Title: 'Objetivo',
    step3Subtitle: '¿Cuál es tu meta?',
    step4Title: 'API Key de Gemini',
    step4Subtitle: 'Opcional pero recomendado',
    step5Title: 'Metas Nutricionales',
    step5Subtitle: 'Personaliza tus objetivos',
    next: 'Siguiente',
    back: 'Atrás',
    finish: 'Finalizar',
    skip: 'Omitir por ahora',
    howToGetApiKey: '¿Cómo obtener mi API Key?',
    autoCalculate: 'Calcular automáticamente según mi objetivo',
    weight: 'Peso (kg)',
    height: 'Altura (cm)',
    age: 'Edad',
    gender: 'Género',
  },

  // Home
  home: {
    greeting: 'Hola',
    todaySummary: 'Resumen de Hoy',
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    dinner: 'Cena',
    snack: 'Snack',
    addMeal: 'Agregar Comida',
    noMealsToday: 'No has registrado comidas hoy',
    noMealsDescription: 'Comienza agregando tu primera comida del día',
    calories: 'Calorías',
    protein: 'Proteína',
    carbs: 'Carbohidratos',
    fat: 'Grasas',
    remaining: 'Restantes',
    consumed: 'Consumidas',
  },

  // Meals
  meals: {
    addMeal: 'Agregar Comida',
    takePhoto: 'Tomar Foto',
    selectFromGallery: 'Seleccionar de Galería',
    analyzeWithAI: 'Analizar con IA',
    addManually: 'Agregar Manualmente',
    mealType: 'Tipo de Comida',
    notes: 'Notas',
    save: 'Guardar Comida',
    edit: 'Editar',
    delete: 'Eliminar',
    deleteConfirm: '¿Estás seguro que deseas eliminar esta comida?',
    analyzing: 'Analizando imagen...',
    detectedFoods: 'Alimentos Detectados',
    addMoreFoods: 'Agregar más alimentos',
    total: 'Total',
    quantity: 'Cantidad',
    unit: 'Unidad',
    aiLimitReached: 'Límite de IA alcanzado',
    aiLimitMessage: 'Has alcanzado el límite de análisis de IA. Agrega alimentos manualmente.',
  },

  // Foods
  foods: {
    searchFoods: 'Buscar Alimentos',
    searchPlaceholder: 'Buscar alimentos...',
    createCustom: 'Crear Alimento Personalizado',
    customFood: 'Alimento Personalizado',
    foodName: 'Nombre del Alimento',
    servingSize: 'Tamaño de Porción',
    category: 'Categoría',
    noResults: 'No se encontraron resultados',
    noResultsDescription: 'Intenta con otro término de búsqueda',
  },

  // Statistics
  stats: {
    statistics: 'Estadísticas',
    period: 'Período',
    last7Days: 'Últimos 7 días',
    last30Days: 'Últimos 30 días',
    custom: 'Personalizado',
    dailyCalories: 'Calorías Diarias',
    macrosDistribution: 'Distribución de Macros',
    averageCalories: 'Calorías Promedio',
    daysOnGoal: 'Días Cumpliendo Meta',
    mostEatenFood: 'Alimento Más Consumido',
    history: 'Historial',
  },

  // Profile
  profile: {
    profile: 'Perfil',
    editProfile: 'Editar Perfil',
    personalInfo: 'Información Personal',
    settings: 'Configuración',
    nutritionalGoal: 'Meta Nutricional',
    geminiApiKey: 'API Key de Gemini',
    activityLevel: 'Nivel de Actividad',
    darkTheme: 'Tema Oscuro',
    language: 'Idioma',
    saveChanges: 'Guardar Cambios',
    goals: 'Metas',
    dailyGoals: 'Metas Diarias',
  },

  // Common
  common: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    ok: 'OK',
    yes: 'Sí',
    no: 'No',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    close: 'Cerrar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    retry: 'Reintentar',
    noInternet: 'Sin conexión a internet',
    serverError: 'Error del servidor',
    unexpectedError: 'Error inesperado',
    required: 'Este campo es requerido',
  },

  // Validations
  validation: {
    emailInvalid: 'Correo electrónico inválido',
    passwordMin: 'La contraseña debe tener al menos 6 caracteres',
    passwordsNotMatch: 'Las contraseñas no coinciden',
    nameMin: 'El nombre debe tener al menos 2 caracteres',
    required: 'Este campo es requerido',
    numberInvalid: 'Número inválido',
    minValue: (min: number) => `El valor mínimo es ${min}`,
    maxValue: (max: number) => `El valor máximo es ${max}`,
  },
};
