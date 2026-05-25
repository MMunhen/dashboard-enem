-- consulta da média por municipio do rj
SELECT l.Municipio, AVG(a.Nota) AS MediaNota
FROM Avalia a
JOIN ProvaRealizada pr ON a.ParticipanteId = pr.ParticipanteId
JOIN Localidade l ON pr.IdMunicipio = l.IdMunicipio AND pr.IdUF = l.IdUF
WHERE l.UF = 'RJ'
GROUP BY l.Municipio
ORDER BY MediaNota DESC
;
