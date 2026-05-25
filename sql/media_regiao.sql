-- média por região do país
SELECT
  CASE
    WHEN l.UF IN ('AC','AP','AM','PA','RO','RR','TO') THEN 'Norte'
    WHEN l.UF IN ('AL','BA','CE','MA','PB','PE','PI','RN','SE') THEN 'Nordeste'
    WHEN l.UF IN ('DF','GO','MT','MS') THEN 'Centro-Oeste'
    WHEN l.UF IN ('ES','MG','RJ','SP') THEN 'Sudeste'
    WHEN l.UF IN ('PR','RS','SC') THEN 'Sul'
  END AS Regiao,
  ROUND(AVG(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END), 1) AS CienciasHumanas,
  ROUND(AVG(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END), 1) AS LinguagensECodigos,
  ROUND(AVG(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END), 1) AS Matematica,
  ROUND(AVG(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END), 1) AS CienciasDaNatureza,
  ROUND(AVG(a.Nota), 1) AS MediaGeral
FROM Avalia a
JOIN Disciplina d ON a.DisciplinaId = d.codigo
JOIN ProvaRealizada pr ON a.ParticipanteId = pr.ParticipanteId
JOIN Localidade l ON pr.IdMunicipio = l.IdMunicipio AND pr.IdUF = l.IdUF
GROUP BY Regiao
ORDER BY MediaGeral;
