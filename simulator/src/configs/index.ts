export function getAppConfig(): AppConfig {
    const config = window?.appConfig;
    if (!config) throw new Error("Please specify app config in public/c.<env>.js");
    return config;
}