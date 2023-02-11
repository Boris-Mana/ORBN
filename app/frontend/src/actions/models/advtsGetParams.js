export class AdvtsGetParams {
    constructor() {
        this.offset = 0;
        this.limit = 25;
        this.object_address__address_region__in = [];
        this.object_address__address_locality__in = [];
        this.source_link__in = [];
        this.deal_type__in = [];
        this.object_types_and_kinds__in = [];
    }
    placement_date__lte;
    placement_date__gte;
    unit_price__lte;
    unit_price__gte;
    price__lte;
    price__gte;
    source_id;
    source_link__in;
    square__lte;
    square__gte;
    object_address__address_region__in;
    object_address__address_locality__in;
    object_address__address_district;
    object_address__address_street;
    object_address__raw_string__icontains;
    full_description__icontains;
    deal_type__in;
    object_types_and_kinds__in;
    offset;
    limit;
}