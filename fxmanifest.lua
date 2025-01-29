fx_version 'cerulean'
game { 'gta5' }
author 'Sinaps'
lua54 'yes'

client_script 'client/**/*.lua'
server_script 'server/**/*.lua'
shared_script 'shared/**/*.lua'

ui_page 'web/index.html'
files {
    'web/**/*'
}
escrow_ignore {
    'shared/config.lua',
    -- 'client/**/*.lua',
    -- 'server/server.lua'
}

-- dependecies {
--     'sLib'
-- }
dependency '/assetpacks'