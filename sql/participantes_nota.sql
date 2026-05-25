-- Consulta: Junções com mais de duas tabelas e junção externa (LEFT JOIN)
-- Objetivo: Listar participantes com suas notas em cada disciplina e o nome da disciplina, mesmo que não tenham nota registrada (junção externa).
SELECT
  p.Id AS ParticipanteID,
  MAX(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END) AS CienciasHumanas,
  MAX(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END) AS LinguagensECodigos,
  MAX(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END) AS Matematica,
  MAX(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END) AS CienciasDaNatureza
FROM Participante p
LEFT JOIN Avalia a ON p.Id = a.ParticipanteId
LEFT JOIN Disciplina d ON a.DisciplinaId = d.codigo
GROUP BY p.Id
limit 100
;

