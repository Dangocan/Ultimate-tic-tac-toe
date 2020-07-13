/*
indice                              ij macro                            ij micro
00|01|02 | 03|04|05 | 06|07|08      00|00|00 | 01|01|01 | 02|02|02      00|01|02 | 00|01|02 | 00|01|02
09|10|11 | 12|13|14 | 15|16|17      00|00|00 | 01|01|01 | 02|02|02      10|11|12 | 10|11|12 | 10|11|12
18|19|20 | 21|22|23 | 24|25|26      00|00|00 | 01|01|01 | 02|02|02      20|21|22 | 20|21|22 | 20|21|22

27|28|29 | 30|31|32 | 33|34|35      10|10|10 | 11|11|11 | 12|12|12      00|01|02 | 00|01|02 | 00|01|02
36|37|38 | 39|40|41 | 42|43|44      10|10|10 | 11|11|11 | 12|12|12      10|11|12 | 10|11|12 | 10|11|12
45|46|47 | 48|49|50 | 51|52|53      10|10|10 | 11|11|11 | 12|12|12      20|21|22 | 20|21|22 | 20|21|22

54|55|56 | 57|58|59 | 60|61|62      20|20|20 | 21|21|21 | 22|22|22      00|01|02 | 00|01|02 | 00|01|02
63|64|65 | 66|67|68 | 69|70|71      20|20|20 | 21|21|21 | 22|22|22      10|11|12 | 10|11|12 | 10|11|12
72|73|74 | 75|76|77 | 78|79|80      20|20|20 | 21|21|21 | 22|22|22      20|21|22 | 20|21|22 | 20|21|22

0|1|2
3|4|5
6|7|8
*/

class Jogada {
    constructor(codigo) {
        // codigo = "[usuario]/[indice_9x9_0_a_80]"
        let [usuario, indice] = codigo.split("/");
        this.indice = Number(indice);
        this.usuario = Number(usuario);
    }
    get micro_i() {
        return Math.floor(this.indice % 27 / 9);
    }
    get micro_j() {
        return this.indice % 3;
    }
    get macro_i() {
        return Math.floor(this.indice / 27);
    }
    get macro_j() {
        return Math.floor(this.indice / 3) % 3;
    }
    get codigo() {
        return `${this.usuario}/${this.indice}`;
    }
    igual(jogada) {
        return this.indice === jogada.indice;
    }
    identico(jogada) {
        return this.codigo === jogada.codigo;
    }
    static indices2indice(macro_i, macro_j, micro_i, micro_j) {
        return macro_i * 27 + macro_j * 3 + micro_i * 9 + micro_j;
    }
}

class JogoDaVelha {
    constructor() {
        this.tabuleiro = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => null));
    }

    vencedor() {
        /*
        null -> não finalizado
        undefined -> empate
        usuario -> usu_id
        */
        let combinacoes = new Array(8).fill(0).map(() => new Array(3).fill(0).map(() => null))
        let nulls = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.tabuleiro[i][j] === null) nulls++;
                combinacoes[i][j] = this.tabuleiro[i][j];
                combinacoes[i + 3][j] = this.tabuleiro[j][i];
            }
            combinacoes[6][i] = this.tabuleiro[i][i];
            combinacoes[7][i] = this.tabuleiro[i][2 - i];
        }
        for (let i = 0; i < combinacoes.length; i++) {
            if (combinacoes[i].every(function (v) {
                    return v === this && v !== null
                }, combinacoes[i][0])) {
                return combinacoes[i][0];
            }
        }
        if (nulls > 0) return null;
        return undefined;
    }

    movimentos_possiveis() {
        // [indice]
        let nulls = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.tabuleiro[i][j] === null)
                    nulls.push({
                        i,
                        j
                    });
            }
        }
        return nulls;
    }

    adicionar_jogada(jogada) {
        // adiciona a jogada do usuario
        // return this.vencedor()
        if (!(jogada instanceof Jogada)) throw Error("Não é do tipo jogada");
        if (this.tabuleiro[jogada.micro_i][jogada.micro_j] === null) {
            this.tabuleiro[jogada.micro_i][jogada.micro_j] = jogada.usuario;
        } else throw Error("Lugar não vazio");
        return this.vencedor();
    }
}
class MacroJogoDaVelha {
    constructor() {
        this.tabuleiro = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new JogoDaVelha()));
    }

    vencedor() {
        let jogos = this.tabuleiro.map(array => array.map(jdv => jdv.vencedor()));
        let combinacoes = new Array(8).fill(0).map(() => new Array(3).fill(0).map(() => null))
        let nulls = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (jogos[i][j] === null) nulls++;
                combinacoes[i][j] = jogos[i][j];
                combinacoes[i + 3][j] = jogos[j][i];
            }
            combinacoes[6][i] = jogos[i][i];
            combinacoes[7][i] = jogos[i][2 - i];
        }
        for (let i = 0; i < combinacoes.length; i++) {
            if (combinacoes[i].every(function (v) {
                    return v === this && v !== null
                }, combinacoes[i][0])) {
                return combinacoes[i][0];
            }
        }
        if (nulls > 0) return null;
        return undefined;
    }

    movimentos_possiveis(ultima_jogada) {
        // [indice]
        let nulls = [];
        if (ultima_jogada !== undefined) {
            // não é primeira jogada
            let tabuleiro_para_jogar = this.tabuleiro[ultima_jogada.micro_i][ultima_jogada.micro_j]; //pega o tabuleiro a ser jogado
            let vencedor = tabuleiro_para_jogar.vencedor(); // verifica vencedor
            if (vencedor === null) {
                //ainda não finalizado
                nulls.push(...this.tabuleiro[ultima_jogada.micro_i][ultima_jogada.micro_j].movimentos_possiveis().map(micro => Jogada.indices2indice(i, j, micro.i, micro.j)));
            } else {
                //tabuleiro finalizado, escolher qualquer um
                for (let i = 0; i < this.tabuleiro.length; i++) {
                    for (let j = 0; j < this.tabuleiro[i].length; j++) {
                        nulls.push(...this.tabuleiro[i][j].movimentos_possiveis().map(micro => Jogada.indices2indice(i, j, micro.i, micro.j)));
                    }
                }
            }
        } else {
            // primeira jogada
            for (let i = 0; i < this.tabuleiro.length; i++) {
                for (let j = 0; j < this.tabuleiro[i].length; j++) {
                    nulls.push(...this.tabuleiro[i][j].movimentos_possiveis().map(micro => Jogada.indices2indice(i, j, micro.i, micro.j)));
                }
            }
        }
        return nulls;
    }

    adicionar_jogada(jogada) {
        // adiciona a jogada do usuario
        // return this.vencedor()
        if (!(jogada instanceof Jogada)) throw Error("Não é do tipo jogada");
        this.tabuleiro[jogada.macro_i][jogada.macro_j].adicionar_jogada(jogada);
        return this.vencedor();
    }
}

class Jogo {
    constructor(jogadores) {
        /*
        jogadores: lista de jogadores na ordem de jogada
        */
        this.jogadores = jogadores;
        this.jogadas = [];
        this.tabuleiro = new MacroJogoDaVelha();
    }

    movimentos_possiveis() {
        // retorna lista de objetos com as posições de jogadas possiveis
        return this.tabuleiro.movimentos_possiveis(this.jogadas[this.jogadas.length - 1]);
    }

    proximo_jogador() {
        return this.jogadores[this.jogadas.length % this.jogadores.length];
    }

    valida(jogada) {
        let esta_no_lugar_possivel = false;
        for (let indice_possivel of this.movimentos_possiveis()) {
            if (indice_possivel === jogada.indice) {
                esta_no_lugar_possivel = true;
                break;
            }
        }
        if (!esta_no_lugar_possivel) throw Error("Jogada inválida");
        if (jogada.usuario !== this.proximo_jogador()) throw Error("Não é a vez desse jogador");
    }

    adicionar_jogada(jogada) {
        if (!(typeof jogada === "object" && jogada instanceof Jogada)) throw Error("Jogada não é do tipo Jogada");
        this.valida(jogada);
        this.jogadas.push(jogada);
        this.tabuleiro.adicionar_jogada(jogada);
    }
}

// let j1 = Jogada.por_codigo(1, "8/7");
// let j2 = Jogada.por_codigo(2, "7/5");
// let j3 = Jogada.por_codigo(2, "5/2");
let jogo = new Jogo([1, 2]);
console.log(jogo.movimentos_possiveis())
// jogo.adicionar_jogada(j1);
// jogo.adicionar_jogada(j2);
// jogo.adicionar_jogada(j3);