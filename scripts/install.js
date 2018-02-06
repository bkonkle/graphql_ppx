var fs = require('fs')
var os = require('os')
var path = require('path')

var os_type = os.type()
var os_arch = os.arch()
var is_windows = !(os_type.indexOf('Windows') < 0)
var is_macos = !(os_type.indexOf('Darwin') < 0)

var root_dir = path.join(__dirname, '..')
var bin_dir = path.join(root_dir, 'bin')
var ppx_path = path.join(root_dir, 'ppx')

function copy_binary(bin) {
    console.log(`[graphql_ppx] Copying binary from "${bin}" to "${ppx_path}"`)
    if (fs.existsSync(ppx_path)) {
        fs.unlinkSync(ppx_path)
    }
    fs.symlinkSync(bin, ppx_path)
}

if (is_windows) {
    throw new Error("Windows is not yet supported")
} else if (is_macos) {
    copy_binary(path.join(bin_dir, 'graphql_ppx.macos'))
} else {
    copy_binary(path.join(bin_dir, 'graphql_ppx.linux'))
}
