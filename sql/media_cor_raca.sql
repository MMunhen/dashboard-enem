-- Média de notas por cor ou raça:
SELECT
  CASE p.CorRaca
    WHEN '0' THEN 'Não declarado'
    WHEN '1' THEN 'Branca'
    WHEN '2' THEN 'Preta'
    WHEN '3' THEN 'Parda'
    WHEN '4' THEN 'Amarela'
    WHEN '5' THEN 'Indígena'
    WHEN '6' THEN 'Não dispõe informação'
    ELSE 'Outro'
  END AS CorRaca,
  AVG(CASE WHEN d.Nome = 'Ciências Humanas' THEN a.Nota END) AS CienciasHumanas,
  AVG(CASE WHEN d.Nome = 'Linguagens e Códigos' THEN a.Nota END) AS LinguagensECodigos,
  AVG(CASE WHEN d.Nome = 'Matemática' THEN a.Nota END) AS Matematica,
  AVG(CASE WHEN d.Nome = 'Ciências da Natureza' THEN a.Nota END) AS CienciasDaNatureza,
  AVG(a.Nota) AS MediaGeral
FROM Participante p
JOIN Avalia a ON p.Id = a.ParticipanteId
JOIN Disciplina d ON a.DisciplinaId = d.codigo
GROUP BY p.CorRaca
ORDER BY MediaGeral DESC;

