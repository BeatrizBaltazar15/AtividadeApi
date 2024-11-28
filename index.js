import express from "express";
import { buscarInf, buscarPorId, infPorAno, reajuste } from "./serviço/serviço.js";

const app = express();

app.get('/historicoIPCA', (req, res) => {
    const anoInf = req.query.ano;
    const resultado = anoInf ? infPorAno(anoInf) : inf();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": "Nenhum registro encontrado" });
    }
});

app.get('/historicoIPCA/calculo', (req, res) => {
    const valores = parseFloat(req.query.valor);
    const inicialDomes = parseInt(req.query.mesInicial);
    const ano = parseInt(req.query.anoInicial);
    const finalDemes = parseInt(req.query.mesFinal);
    const anoFinal = parseInt(req.query.anoFinal);

    if (isNaN(valores) || isNaN(inicialDomes) || isNaN(ano) || isNaN(finalDemes) || isNaN(anoFinal)) {
        return res.status(400).json({ error: "Todos os parâmetros (valor, mesInicial, anoInicial, mesFinal, anoFinal) são obrigatórios e devem ser válidos." });
    }

    if (ano > anoFinal || (ano === anoFinal && inicialDomes > finalDemes)) {
        return res.status(400).json({ error: "O mês/ano inicial deve ser menor ou igual ao mês/ano final." });
    }

    try {
        const resultado = reajuste(valores, inicialDomes, ano, finalDemes, anoFinal);
        res.json({ valorReajustado: resultado.toFixed(2) });
    } catch (error) {
        res.status(500).json({ "erro": "Erro ao calcular o reajuste." });
    }
});

app.get('/historicoIPCA/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ "erro": "Requisição inválida, o ID deve ser numérico" });
    }

    const inf = buscarPorId(id);

    if (inf) {
        res.json(inf);
    } else {
        res.status(404).send({ "erro": "ID não encontrado" });
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});
