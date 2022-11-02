// To parse this data:
//
//   import { Convert, ResponseAutocomplete } from "./file";
//
//   const responseAutocomplete = Convert.toResponseAutocomplete(json);

export interface ResponseAutocomplete {
  autocomplete_terms: AutocompleteTerm[];
  metadata: ResponseAutocompleteMetadata;
  terms_offsets: TermsOffsets;
  autocomplete_result_title: string;
  experiments_to_log: any[];
  disable_cdn_cache: boolean;
  autocompleteResultTitle: string;
}

export interface AutocompleteTerm {
  id: string;
  explore_search_params: ExploreSearchParams;
  suggestion_type: string;
  vertical_type: string;
  display_name: string;
  metadata: AutocompleteTermMetadata;
  location: Location;
  refinements: any[];
  highlights: Highlight[];
  sxs_debug_info: SxsDebugInfo;
  suggestionType: string;
  verticalType: string;
}

export interface ExploreSearchParams {
  params: Param[];
  place_id: string;
  query: string;
  refinement_paths: string[];
  refinement_path: string;
  tab_id: string;
  reset_filters: boolean;
  reset_keys: any[];
}

export interface Param {
  key: string;
  value_type: string;
  in_array: boolean;
  value: string;
  delete: boolean;
  invisible_to_user: boolean;
}

export interface Highlight {
  offset_start: number;
  offset_end: number;
}

export interface Location {
  offset_start: number;
  offset_end: number;
  location_name: string;
  google_place_id: string;
  types: string[];
  terms: Term[];
  parent_city_display_name?: string;
  country_code?: string;
  countryCode?: string;
  parentCityDisplayName?: string;
  parent_city_place_id?: string;
  parentCityPlaceId?: string;
}

export interface Term {
  offset: number;
  value: string;
}

export interface AutocompleteTermMetadata {
  location_only_result: boolean;
  airmoji: string;
}

export interface SxsDebugInfo {
  sxs_score_attrs: TermsOffsets;
  sxs_debug_metadata: TermsOffsets;
}

export interface TermsOffsets {}

export interface ResponseAutocompleteMetadata {
  request_id: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toResponseAutocomplete(json: string): ResponseAutocomplete {
    return JSON.parse(json);
  }

  public static responseAutocompleteToJson(
    value: ResponseAutocomplete
  ): string {
    return JSON.stringify(value);
  }
}
