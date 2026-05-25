-- consulta com a maior nota de cada disciplina pra cada estado do brasil
SELECT
  l.UF,
  ROUND(MAX(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END), 1) AS CienciasHumanas,
  ROUND(MAX(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END), 1) AS LinguagensECodigos,
  ROUND(MAX(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END), 1) AS Matematica,
  ROUND(MAX(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END), 1) AS CienciasDaNatureza,
  ROUND(MIN(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END), 1) AS MINCienciasHumanas,
  ROUND(MIN(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END), 1) AS MINLinguagensECodigos,
  ROUND(MIN(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END), 1) AS MINMatematica,
  ROUND(MIN(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END), 1) AS MINCienciasDaNatureza
FROM Avalia a
JOIN Disciplina d ON a.DisciplinaId = d.codigo
JOIN ProvaRealizada pr ON a.ParticipanteId = pr.ParticipanteId
JOIN Localidade l ON pr.IdMunicipio = l.IdMunicipio AND pr.IdUF = l.IdUF
GROUP BY l.UF
ORDER BY l.UF;
