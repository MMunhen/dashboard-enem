SELECT
  l.UF,
  AVG(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END) AS CienciasHumanas,
  AVG(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END) AS LinguagensECodigos,
  AVG(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END) AS Matematica,
  AVG(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END) AS CienciasDaNatureza,
  AVG(a.Nota) AS MediaGeral
 FROM Avalia as a
 JOIN Disciplina as d ON 
 a.DisciplinaId = d.codigo
 JOIN ProvaRealizada pr ON a.ParticipanteId = pr.ParticipanteId
 JOIN Localidade l ON pr.IdMunicipio = l.IdMunicipio AND pr.IdUF = l.IdUF
 GROUP BY l.UF
 ORDER BY MediaGeral;
