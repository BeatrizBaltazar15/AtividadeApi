import colecaoInf from "../dados/dados.js";

export const buscarInf = () =>{
    return colecaoInf;
}

export const infPorAno = (anoInf) => {
    return colecaoInf.filter(inf => inf.ano == anoInf)
};

export const buscarPorId = (id) =>{
    const idInf = parseInt(id);
    return colecaoInf.find(inf => inf.id === idInf);
}

export const reajuste = (valores, inicialDomes, ano, finalDemes, anoFinal) => {
    const ipcaFiltrado = colecaoInf.filter((item) => {
        const anoMes = item.ano * 12 + item.mes;
        const anoMesInicio = ano * 12 + inicialDomes;
        const anoMesFinal = anoFinal * 12 + finalDemes;
        return anoMes >= anoMesInicio && anoMes <= anoMesFinal;
    });

    if (ipcaFiltrado.length === 0) {
        throw new Error("Nenhum índice IPCA encontrado no período informado.");
    }

    let resultado = valores;
    ipcaFiltrado.forEach((item) => {
        resultado *= 1 + item.ipca / 100;
        console.log(resultado)
    });

    return resultado;
}
