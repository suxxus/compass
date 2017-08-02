var bs = require('browser-sync').create();

bs.watch('build/**/*').on('change', bs.reload);
bs.init({
    server: {
        name: 'dev',
        baseDir: './build'

    },
    port: 5000,
    ui: {
        port: 3012
    },
    reloadDelay: 3000
});
