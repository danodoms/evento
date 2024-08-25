alter table "public"."attendance" add column "scanned_by_email" text;

set check_function_bodies = off;

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


