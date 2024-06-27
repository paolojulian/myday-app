export const getEnv = () => ({
  FORCE_MIGRATION: process.env.EXPO_PUBLIC_FORCE_MIGRATION === 'true',
  DATABASE_VERSION: Number(process.env.EXPO_PUBLIC_DATABASE_VERSION) ?? 1,
});
