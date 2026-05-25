-- Média de notas por sexo:
SELECT
  p.Sexo,
  AVG(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END) AS CienciasHumanas,
  AVG(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END) AS LinguagensECodigos,
  AVG(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END) AS Matematica,
  AVG(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END) AS CienciasDaNatureza,
  AVG(a.Nota) AS MediaGeral
FROM Participante p
JOIN Avalia a ON p.Id = a.ParticipanteId
JOIN Disciplina d ON a.DisciplinaId = d.codigo
GROUP BY p.Sexo
ORDER BY MediaGeral DESC;