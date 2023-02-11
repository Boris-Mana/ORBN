import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MainSidebar from '../layout/mainSidebar'
import { getAdvts, setCurrentPage } from '../../actions/advts'
import { Grid, Link } from "@material-ui/core"
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export class AdvtsListPage extends Component {

    componentDidMount() {
        this.props.setCurrentPage(0);
        this.props.getAdvts();
    }

    static propTypes = {
        advts: PropTypes.array.isRequired,
    };

    handleChange = (event, value) => {
        this.props.advtsGetParams.offset = (value - 1) * this.props.advtsGetParams.limit;
        this.props.setCurrentPage(value - 1);
        this.props.getAdvts();
    };

    createData(id, ind, link, unitPrice, square, price, objectAddress, shortDescription) {
        return { id, ind, link, unitPrice, square, price, objectAddress, shortDescription };
    }

    render() {
        const perPage = this.props.advtsGetParams.limit;
        const totalPages = Math.ceil(this.props.totalCount / perPage);

        let ind = this.props.currentPage * perPage;

        const rows = this.props.advts.map(advt =>
            this.createData(advt.id, ++ind, `#/advt/${advt.id}`, advt.unit_price, advt.square, advt.price, advt.object_address, advt.short_description));

        return (
            <Fragment>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <MainSidebar />
                    </Grid>
                    <Grid item xs={9}>
                        <TableContainer component={Paper} sx={{ borderRadius: 0 }} >
                            <Table aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№</TableCell>
                                        <TableCell align="right">Стоимость, ₽ м<sup><small>2</small></sup></TableCell>
                                        <TableCell align="right">Общая площадь, м<sup><small>2</small></sup></TableCell>
                                        <TableCell align="right">Стоимость</TableCell>
                                        <TableCell align="right">Полный адрес</TableCell>
                                        <TableCell align="right">Описание</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            component={Link} underline="hover" color="inherit" href={row.link} target="_blank">
                                            <TableCell align="right">{row.ind}</TableCell>
                                            <TableCell align="right">{row.unitPrice}</TableCell>
                                            <TableCell align="right">{row.square}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.objectAddress}</TableCell>
                                            <TableCell align="right">{row.shortDescription}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination count={totalPages} variant="text" shape="rounded" style={{ padding: "10" }} onChange={this.handleChange} />
                        </TableContainer>
                    </Grid>
                </Grid>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    advts: state.advts.advts,
    currentPage: state.advts.currentPage,
    advtsGetParams: state.advts.advtsGetParams,
    totalCount: state.advts.totalCount,
});

export default connect(mapStateToProps, { getAdvts, setCurrentPage })(AdvtsListPage);
