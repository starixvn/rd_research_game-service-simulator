interface Window {
    appConfig?: AppConfig
}
interface ProxyConfig {
    ssl: string;
    subDomain: string;
    path: string;
}

interface ServerDomainMapper {
    [key: string]: string
}

interface AppConfig {
    serverDomainMapper: ServerDomainMapper;
    proxy: ProxyConfig;
    env: string;
    appType: string;
}