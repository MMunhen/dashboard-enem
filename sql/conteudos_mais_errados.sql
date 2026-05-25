SELECT 
    T.Materia,
    T.Conteudo AS Conteudo,
    ROUND(SUM(
        CASE 
             WHEN SUBSTRING(PR.Respostas, A.Questao - 90, 1) != SUBSTRING(TP.Gabarito, A.Questao - 90, 1)
             THEN 1 ELSE 0
         END
    ) / COUNT(*), 2) AS TaxaErroPercentual
 FROM (
    SELECT * 
     FROM ProvaRealizada 
     WHERE TipoProvaId=1221
) AS PR
 JOIN TipoProva TP 
     ON PR.TipoProvaId = TP.Codigo AND PR.TipoProvaAno = TP.Ano
 JOIN Aborda A 
     ON A.TipoProvaCodigo = TP.Codigo AND A.TipoProvaAno = TP.Ano
 JOIN Topicos T 
     ON A.TopicoId = T.ID
 WHERE 
     A.Questao BETWEEN 91 AND 135
 GROUP BY 
     T.Materia,
     T.Conteudo
 ORDER BY 
     Taxa_de_Erro DESC;
