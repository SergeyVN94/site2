const importAll = function importAll(resolve: __WebpackModuleApi.RequireContext): void {
    resolve.keys().forEach(resolve);
};

require('./styles/fonts.scss');
importAll(require.context('./desktop.blocks', true, /.ts$/));
importAll(require.context('./desktop.blocks', true, /.(sa|sc|c)ss$/));
importAll(require.context('./pages', true, /.(sa|sc|c)ss$/));
