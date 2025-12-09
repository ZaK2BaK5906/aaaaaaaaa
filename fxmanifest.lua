fx_version 'cerulean'
game 'gta5'

author 'Boss Menu Phone App'
description 'Application de menu patron pour lb-phone'
version '1.0.0'

ui_page 'ui_built/index.html'

shared_scripts {
    '@es_extended/imports.lua',
    'config.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua'
}

files {
    'ui_built/**/*'
}

dependencies {
    'lb-phone',
    'es_extended'
}
