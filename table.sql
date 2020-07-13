CREATE TABLE IF NOT EXISTS usuario{
    usu_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
    usu_apelido TEXT NOT NULL,
    usu_senha TEXT NOT NULL
}

-- CREATE TABLE IF NOT EXISTS usuario_item {
--     usu_id INTEGER NOT NULL
--     ite_id INTEGER NOT NULL 
-- }

-- CREATE TABLE IF NOT EXISTS item {
--     ite_id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
--     ite_imagem_x
--     ite_imagem_o
-- }

CREATE TABLE IF NOT EXISTS jogo {
    jog_id       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
    jog_ganhador  TEXT NOT NULL,
    jog_perdedor TEXT NOT NULL,
    jog_jogadas TEXT NOT NULL
}
