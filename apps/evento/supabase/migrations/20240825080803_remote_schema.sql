CREATE INDEX attendance_school_id_idx ON public.attendance USING btree (school_id);

set check_function_bodies = off;

create or replace view "public"."event_scanner_stats_view" as  SELECT attendance.date,
    attendance.scanned_by_email,
    count(
        CASE
            WHEN (attendance.is_time_in = true) THEN attendance.id
            ELSE NULL::bigint
        END) AS time_in_count,
    count(
        CASE
            WHEN (attendance.is_time_in = false) THEN attendance.id
            ELSE NULL::bigint
        END) AS time_out_count
   FROM attendance
  GROUP BY attendance.date, attendance.scanned_by_email
  ORDER BY attendance.date;


create or replace view "public"."event_stats_view" as  SELECT attendance.date,
    count(
        CASE
            WHEN (attendance.is_time_in = true) THEN attendance.id
            ELSE NULL::bigint
        END) AS time_in_count,
    count(
        CASE
            WHEN (attendance.is_time_in = false) THEN attendance.id
            ELSE NULL::bigint
        END) AS time_out_count
   FROM attendance
  GROUP BY attendance.date
  ORDER BY attendance.date;


CREATE OR REPLACE FUNCTION public.get_attendance_by_date(attendance_date date)
 RETURNS TABLE(school_id text, date date, "time" time without time zone, is_time_in boolean)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        a.school_id,
        a.date,
        a."time",
        a.is_time_in
    FROM
        attendance AS a
    WHERE
        a.date = attendance_date
    ORDER BY
        a.school_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_filtered_paginated_school_ids(current_page integer, search_query text, limit_count integer)
 RETURNS TABLE(school_id text, total_count integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (a.school_id) 
         a.school_id, 
         COUNT(*) OVER()::INTEGER AS total_count
  FROM attendance a
  WHERE a.school_id ILIKE '%' || search_query || '%'
  ORDER BY a.school_id
  LIMIT limit_count
  OFFSET (current_page - 1) * limit_count;
END;
$function$
;


