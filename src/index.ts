const importAll = function importAll(resolve: __WebpackModuleApi.RequireContext): void {
  resolve.keys().forEach(resolve);
};

importAll(require.context('./desktop.blocks', true, /.(((sa|sc|c)ss)|ts)$/));
importAll(require.context('./pages', true, /.(sa|sc|c)ss$/));
importAll(require.context('./styles', true, /.(sa|sc|c)ss$/));
