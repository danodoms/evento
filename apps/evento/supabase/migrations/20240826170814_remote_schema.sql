drop function if exists "public"."get_attendance_by_date"(attendance_date date);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_attendance_by_date(attendance_date date)
 RETURNS TABLE(school_id text, date date, "time" time without time zone, is_time_in boolean, scanned_by_email text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        a.school_id,
        a.date,
        a."time",
        a.is_time_in,
        a.scanned_by_email
    FROM
        attendance AS a
    WHERE
        a.date = attendance_date
    ORDER BY
        a.school_id;
END;
$function$
;


