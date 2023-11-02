/* eslint-disable no-undef */
/* eslint-disable camelcase */

if (window.__POWERED_BY_QIANKUN__) {
    let moduleName = `market/`;

    if (window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__.endsWith(`/market/`)) {
        moduleName = '';
    }

    __webpack_public_path__ =
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + moduleName;
}
