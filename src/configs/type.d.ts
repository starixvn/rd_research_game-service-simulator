interface Game {
    name?: string;
    namespace?: string;
    path?: string;
}

interface Window {
    appConfig?: AppConfig;
    supportedGames?: Game[]
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
    useCustomUrl?: boolean;
    customUrl?: string;
}

interface AppConfig {
    serverDomainMapper: ServerDomainMapper;
    proxy: ProxyConfig;
    env: string;
    appType: string;
    enableMsgpackParser: boolean;
}