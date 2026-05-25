-- Consulta: Agregação + agrupar por UF (com JOIN)
-- Objetivo: Média de notas por estado (UF).
SELECT l.UF, AVG(a.Nota) AS MediaNota
FROM Avalia a
JOIN ProvaRealizada pr ON a.ParticipanteId = pr.ParticipanteId
JOIN Localidade l ON pr.IdMunicipio = l.IdMunicipio AND pr.IdUF = l.IdUF
GROUP BY l.UF;
