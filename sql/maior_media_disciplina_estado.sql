-- Disciplina com maior média em cada estado (UF)
WITH medias_disciplina_uf AS (
    SELECT
      l.UF,
      d.Nome AS Disciplina,
      AVG(a.Nota) AS MediaNota
    FROM Avalia a
    JOIN Disciplina d ON a.DisciplinaId = d.codigo
    JOIN ProvaRealizada pr ON a.ParticipanteId = pr.ParticipanteId
    JOIN Localidade l ON pr.IdMunicipio = l.IdMunicipio AND pr.IdUF = l.IdUF
    GROUP BY l.UF, d.Nome
)
SELECT
  md.UF,
  md.Disciplina,
  ROUND(md.MediaNota, 1) AS MediaNota
FROM medias_disciplina_uf md
JOIN (
    SELECT UF, MAX(MediaNota) AS MaiorMedia
    FROM medias_disciplina_uf
    GROUP BY UF
) maior ON md.UF = maior.UF AND md.MediaNota = maior.MaiorMedia
ORDER BY MediaNota DESC;
