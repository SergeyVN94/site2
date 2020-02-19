const _importAll = function _importAll(resolve: __WebpackModuleApi.RequireContext): void {
    resolve.keys().forEach(resolve);
};

const importAll = function importAll(): void {
    require('../styles/fonts.scss');
    _importAll(require.context('../desktop.blocks', true, /.ts$/));
    _importAll(require.context('./', true, /.(sa|sc|c)ss$/));
    _importAll(require.context('../desktop.blocks', true, /.(sa|sc|c)ss$/));
};

export default importAll;
