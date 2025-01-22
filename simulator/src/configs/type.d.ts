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

interface SocketInfo {
    path: string;
    namespace: string;
}

interface AppConfig {
    serverDomainMapper: ServerDomainMapper;
    proxy: ProxyConfig;
    env: string;
    appType: string;
    enableMsgpackParser: boolean;
}