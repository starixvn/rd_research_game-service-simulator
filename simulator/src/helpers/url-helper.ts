import { getAppConfig } from "../configs";

const defaultSubDomain = getAppConfig().proxy?.subDomain ?? "l1-proxy1";

export function buildUrl(
    subDomain: string = defaultSubDomain, 
    path = "/") {
    
    const { proxy } = getAppConfig();
    const domain = getRootDomain();
    const protocol = getProxyProtocol(proxy);

    const fullDomain = getFullDomain(
        subDomain,
        domain,
        path
    );

    return `${protocol}://${fullDomain}`;
}

export const buildServerUrl = (path: string) => {
    const pathStr = `/user/${path}`;
    return buildUrlWithPath(pathStr);
};

export function buildUrlWithPath(path: string) {
    return buildUrl(
        getAppConfig().proxy?.subDomain,
        path
    );
}

function getRootDomain() {
    if (isWebBrowserEnv()) {
        const hostName = window.location.hostname;
        return (
            (!!getAppConfig().serverDomainMapper 
            && getAppConfig().serverDomainMapper[hostName]) 
            || extractDomainFromHostName(hostName)
        );
    }

    return "";
}

function extractDomainFromHostName(hostName: string) {
    const domainParts = hostName.split(".").reverse();
    return `${domainParts[1]}.${domainParts[0]}`;
};

function getProxyProtocol(proxy: ProxyConfig) {
    return proxy.ssl
        ? "https"
        : "http";
}

function getFullDomain(
    subDomain: string,
    domain: string,
    path: string
) {
    const subDomainString =  subDomain === ""
        ? ""
        : `${subDomain}.`;

    if (path[0] !== "/") {
        console.warn(`path ${path} should start with /`);
    }
    return `${subDomainString}${domain}${path}`;
}

function isWebBrowserEnv() {
    return typeof window !== "undefined" 
        && window.location 
        && window.location.hostname
}