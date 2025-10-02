USE TestSchedulingRoutine;
SHOW TABLES;







/*#######################################*/
CREATE DATABASE ScheduleEvanderDiscipline;

INSERT INTO humantemps(
    PainterName,
    PainterBalance,
    PainterYear
)VALUES 
('Van Gogh2',1000, '1853-03-31');

DROP DATABASE TestSchedulingRoutine;


CREATE DATABASE TestSchedulingRoutine;
USE TestSchedulingRoutine;
SHOW TABLES;

DESCRIBE codestacks;
DESCRIBE codedetails;

DESCRIBE gymdays;
DESCRIBE gymworkouts;
DESCRIBE gymdetails;

DESCRIBE schedules;

SELECT * FROM codestacks;
SELECT * FROM codedetails;

SELECT * FROM gymdays;
SELECT * FROM gymworkouts;
SELECT * FROM gymdetails;
SELECT * FROM gymworkouts LEFT JOIN gymdays on (gymworkouts.GymDayId = gymdays.id);

SELECT * FROM schedules;


UPDATE gymworkouts SET GymDayId = "8f8a34ee-a249-42ce-8b23-2e8eb1a24bf1"

SELECT 
    s.date,
    s.DoaPagi Doa,
    s.Cucipiring CcPiring,
    cs.stackName code,
    cs.projectName proj,
    cd.detail
FROM schedules AS s 
JOIN codedetails AS cd ON (s.id = cd.TableId)
JOIN codestacks AS cs ON (cs.id = cd.CodeId);


DELETE FROM schedules
