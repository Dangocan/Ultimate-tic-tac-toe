# Paginas
* entrar.html -> /entrar
* cadastrar.html -> /cadatrar
* menu.html -> /menu
* jogar.html -> /jogar
* espectar.html -/espectar

# URLs de acesso
__Os parâmetros devem ser todos passados em forma de JSON__
## POST /api/cadastrar/usuario
Cadastra usuário novo
#### Parâmetros necessários: 
- usu_apelido
- usu_senha
#### Respostas:
- 200: [Usuario[object]]
- 400: Resposta[object]



# Socket eventos:



1 - qualquer jogador
2 - amigos
3 - jogar com jogador de mesma habilidade
<!-- 4 - tela dividida -->
5 - contra pc
6 - espectar