-- TTI's general invention-disclosure guidance is not a student opportunity.
-- Remove the previously published directory page while retaining genuine NUS
-- Enterprise programmes such as NOC and founder incubators.

delete from public.opportunity_candidates
where source_type = 'public_web'
  and lower(coalesce(extracted_opportunity ->> 'title', raw_subject, '')) ~
    '^tti[[:space:]]*[-|][[:space:]]*nus enterprise([[:space:]]*[-|][[:space:]]*.*)?$';

delete from public.opportunities
where lower(title) ~
  '^tti[[:space:]]*[-|][[:space:]]*nus enterprise([[:space:]]*[-|][[:space:]]*.*)?$';
