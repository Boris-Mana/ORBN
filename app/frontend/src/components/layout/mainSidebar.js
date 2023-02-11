import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { getLocalities } from '../../actions/localities'
import { getRegions } from '../../actions/regions'
import { getDealTypes } from '../../actions/dealTypes'
import { getAdvtTypes } from '../../actions/advtTypes'
import { getAdvtKinds } from '../../actions/advtKinds'
import { getSources } from '../../actions/sources'
import { getAdvtTypesKinds } from '../../actions/advtTypesKinds'
import { setCurrentPage } from '../../actions/advts';
import { getAdvts, clearAdvtsFilters, updateAdvtsFilters } from '../../actions/advts'
import { Typography, Box, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core"
import Multiselect from 'multiselect-react-dropdown';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const MainSidebar = (props) => {

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTill, setDateTill] = useState(null);
    const [isChecked, setIsChecked] = React.useState(new Set());

    useEffect(() => {
        props.getAdvtTypesKinds()
        props.getLocalities()
        props.getRegions()
        props.getDealTypes()
        props.getAdvtTypes()
        props.getAdvtKinds()
        props.getSources()
    }, []);

    const resetCheckboxes = () => {
        setIsChecked(new Set());
    };

    const onFiltersChanged = (e) => {
        props.advtsGetParams.offset = 0;
        props.setCurrentPage(0);
        props.updateAdvtsFilters(props.advtsGetParams)
    }

    const onRegionSelect = (selectedList, selectedItem) => {
        props.advtsGetParams.object_address__address_region__in = selectedList.map(i => i.id);
        onFiltersChanged();
    }
    const onRegionRemove = (selectedList, selectedItem) => {
        props.advtsGetParams.object_address__address_region__in = selectedList.map(i => i.id);
        onFiltersChanged();
    }
    const onSourceSelect = (selectedList, selectedItem) => {
        props.advtsGetParams.source_link__in = selectedList.map(i => i.id);
        onFiltersChanged();
    }
    const onSourceRemove = (selectedList, selectedItem) => {
        props.advtsGetParams.source_link__in = selectedList.map(i => i.id);
        onFiltersChanged();
    }
    const onLocalitySelect = (selectedList, selectedItem) => {
        props.advtsGetParams.object_address__address_locality__in = selectedList.map(i => i.id);
        onFiltersChanged();
    }
    const onLocalityRemove = (selectedList, selectedItem) => {
        props.advtsGetParams.object_address__address_locality__in = selectedList.map(i => i.id);
        onFiltersChanged();
    }

    const regionsState = {
        options: props.regions.map(r => ({ name: r.name, id: r.id }))
    };

    const sourceState = {
        options: props.sources.map(r => ({ name: r.name, id: r.id }))
    };
    const localityState = {
        options: props.localities.map(l => ({ name: l.name, id: l.id }))
    };

    const sourceMultiselectRef = useRef(null)
    const regionMultiselectRef = useRef(null)
    const localityMultiselectRef = useRef(null)

    const handleFormReset = () => {
        resetCheckboxes();
        setDateTill(null);
        setDateFrom(null);
        sourceMultiselectRef.current.resetSelectedValues();
        regionMultiselectRef.current.resetSelectedValues();
        localityMultiselectRef.current.resetSelectedValues();
        props.clearAdvtsFilters();
        props.getAdvts();
    }

    return (
        <Box component="div" sx={{ p: 2 }}>
            <form onReset={handleFormReset}>
                <Typography variant="h4" > Источник </Typography>
                <Box component="div" sx={{ paddingTop: 1, paddingBottom: 1 }} >
                    <Box component="div" sx={{ p: 1 }}>
                        <TextField
                            fullWidth
                            label="ID в источнике"
                            onChange={(e) => {
                                props.advtsGetParams.source_id = e.target.value;
                                onFiltersChanged()
                            }}
                            autoFocus />
                    </Box>
                    <Box component="div" sx={{ p: 1 }}>
                        <Multiselect
                            ref={sourceMultiselectRef}
                            options={sourceState.options} // Options to display in the dropdown
                            selectedValues={sourceState.selectedValue} // Preselected value to persist in dropdown
                            onSelect={onSourceSelect} // Function will trigger on select event
                            onRemove={onSourceRemove} // Function will trigger on remove event
                            placeholder="Источник"
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </Box>
                </Box>
                <Typography variant="h4"> Назначение </Typography>
                {props.advtTypes.map(advtType => (
                    <Box component="div" sx={{ p: 1 }}>
                        <Typography variant="h5"> {advtType.name} </Typography>
                        <FormGroup>
                            {props.advtTypesKinds.filter(x => x.object_type.id == advtType.id).map(advtTypeKind => (
                                <FormControlLabel control={
                                    <Checkbox
                                        id={advtTypeKind.id}
                                        checked={isChecked.has(advtTypeKind.id)}
                                        onChange={(e) => {
                                            const newChecked = new Set(isChecked)
                                            if (e.target.checked) {
                                                newChecked.add(advtTypeKind.id);
                                                props.advtsGetParams.object_types_and_kinds__in.push(advtTypeKind.id)
                                            }
                                            else {
                                                newChecked.delete(advtTypeKind.id);
                                                props.advtsGetParams.object_types_and_kinds__in = props.advtsGetParams.object_types_and_kinds__in.filter(x => x != advtTypeKind.id);
                                            }
                                            setIsChecked(newChecked);
                                            onFiltersChanged();
                                        }}
                                    />
                                } label={advtTypeKind.object_kind.name} />
                            ))}
                        </FormGroup>
                    </Box>
                ))}
                <Typography variant="h4" > Местоположение </Typography>
                <Box component="div" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    <Box component="div" sx={{ p: 1 }}>
                        <Multiselect
                            ref={regionMultiselectRef}
                            options={regionsState.options} // Options to display in the dropdown
                            selectedValues={regionsState.selectedValue} // Preselected value to persist in dropdown
                            onSelect={onRegionSelect} // Function will trigger on select event
                            onRemove={onRegionRemove} // Function will trigger on remove event
                            placeholder="Регион"
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </Box>
                    <Box component="div" sx={{ p: 1 }}>
                        <Multiselect
                            ref={localityMultiselectRef}
                            options={localityState.options} // Options to display in the dropdown
                            selectedValues={localityState.selectedValue} // Preselected value to persist in dropdown
                            onSelect={onLocalitySelect} // Function will trigger on select event
                            onRemove={onLocalityRemove} // Function will trigger on remove event
                            placeholder="Населенный пункт"
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </Box>
                    <Box component="div" sx={{ p: 1 }}>
                        <TextField
                            component="div"
                            fullWidth
                            label="Произвольная часть адреса"
                            onChange={(e) => {
                                props.advtsGetParams.object_address__raw_string__icontains = e.target.value;
                                onFiltersChanged()
                            }}
                            autoFocus />
                    </Box>
                </Box>
                <Typography variant="h4" > Тип сделки </Typography>
                <Box component="div" sx={{ p: 1 }}>
                    <FormGroup>
                        {props.dealTypes.map(dealType => (
                            <FormControlLabel control={
                                <Checkbox
                                    id={dealType.id}
                                    checked={isChecked.has(dealType.id)}
                                    onChange={(e) => {
                                        const newChecked = new Set(isChecked)
                                        setIsChecked({ ...isChecked, [dealType.id]: e.target.checked });
                                        if (e.target.checked) {
                                            newChecked.add(dealType.id);
                                            props.advtsGetParams.deal_type__in.push(dealType.id)
                                        }
                                        else {
                                            newChecked.delete(dealType.id);
                                            props.advtsGetParams.deal_type__in = props.advtsGetParams.deal_type__in.filter(x => x != dealType.id);
                                        }
                                        setIsChecked(newChecked);
                                        onFiltersChanged();
                                    }}
                                />
                            } label={dealType.name} />
                        ))}
                    </FormGroup>
                </Box>
                <Typography variant="h4" > Площадь, м<sup><small>2</small></sup> </Typography>
                <Box component="div" sx={{ paddingTop: 1, paddingBottom: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="От"
                                onChange={(e) => {
                                    props.advtsGetParams.square__gte = e.target.value;
                                    onFiltersChanged()
                                }}
                                autoFocus />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="До"
                                onChange={(e) => {
                                    props.advtsGetParams.square__lte = e.target.value;
                                    onFiltersChanged()
                                }}
                                autoFocus />
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="h4" > Цена, ₽/м<sup><small>2</small></sup> </Typography>
                <Box component="div" sx={{ paddingTop: 1, paddingBottom: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="От"
                                onChange={(e) => {
                                    props.advtsGetParams.unit_price__gte = e.target.value;
                                    onFiltersChanged()
                                }}
                                autoFocus />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="До"
                                onChange={(e) => {
                                    props.advtsGetParams.unit_price__lte = e.target.value;
                                    onFiltersChanged()
                                }}
                                autoFocus />
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="h4" > Цена, ₽</Typography>
                <Box component="div" sx={{ paddingTop: 1, paddingBottom: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="От"
                                onChange={(e) => {
                                    props.advtsGetParams.price__gte = e.target.value;
                                    onFiltersChanged()
                                }}
                                autoFocus />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="До"
                                onChange={(e) => {
                                    props.advtsGetParams.price__lte = e.target.value;
                                    onFiltersChanged()
                                }}
                                autoFocus />
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="h4" sx={{ paddingBottom: 0.5 }} > Период публикации </Typography>
                <Box component="div" >
                    <Grid container spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="От"
                                    value={dateFrom}
                                    onChange={(newValue) => {
                                        setDateFrom(newValue)
                                        props.advtsGetParams.placement_date__gte = newValue.toJSON();
                                        onFiltersChanged()
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                    label="До"
                                    value={dateTill}
                                    onChange={(newValue) => {
                                        setDateTill(newValue)
                                        props.advtsGetParams.placement_date__lte = newValue.toJSON();
                                        onFiltersChanged()
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={props.getAdvts.bind(this)}
                >
                    Применить фильтры
                </Button>
                <Button
                    type="reset"
                    value="Reset"
                    fullWidth
                    variant="contained"
                >
                    Сбросить фильтры
                </Button>
            </form>
        </Box>
    )
}

const mapStateToProps = state => ({
    localities: state.localities.localities,
    regions: state.regions.regions,
    dealTypes: state.dealTypes.dealTypes,
    sources: state.sources.sources,
    advtTypes: state.advtTypes.advtTypes,
    advtKinds: state.advtKinds.advtKinds,
    advtTypesKinds: state.advtTypesKinds.advtTypesKinds,
    advtsGetParams: state.advts.advtsGetParams,
});

export default connect(mapStateToProps, { setCurrentPage, getLocalities, getRegions, getSources, getDealTypes, getAdvtTypes, getAdvtKinds, getAdvtTypesKinds, getAdvts, clearAdvtsFilters, updateAdvtsFilters })(MainSidebar);