import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdvt } from '../../actions/advts';
import { Grid, Link, Typography, Box } from "@material-ui/core"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const AdvtPage = (props) => {

    const [toggler, setToggler] = useState(false);

    let params = useParams();

    useEffect(() => props.getAdvt(params.id), []);

    if (props.advt)
        return (
            <Fragment>
                <Grid container spacing={2} >
                    <Grid item xs={5}>
                        <Box component="div" sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom={true}> Информация об объявлении </Typography>
                            <Typography variant="subtitle2"> Источник:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.source} </Typography>
                            <Typography variant="subtitle2"> id в источнике:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.source_id} </Typography>
                            <Typography variant="subtitle2"> Размещено на сайте:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.placement_date} </Typography>
                            <Typography variant="subtitle2"> Скачано: </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.download_date} </Typography>
                            <Typography variant="subtitle2"> Ссылка в базе: </Typography>
                            <div><Link underline="hover" color="inherit" href={window.location.href}>{window.location.href}</Link></div>
                        </Box>

                        <Box component="div" sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom={true}> Подробно об объекте </Typography>
                            <Typography variant="subtitle2"> Тип недвижимости:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.deal_type?.name} </Typography>
                            <Typography variant="subtitle2"> Назначение:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.object_type?.object_kind?.name} </Typography>
                            <Typography variant="subtitle2"> Область:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.object_address?.address_region?.name} </Typography>
                            <Typography variant="subtitle2"> Неселенный пункт: </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.object_address?.address_locality?.name} </Typography>
                            <Typography variant="subtitle2"> Район:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.object_address?.address_district?.name} </Typography>
                            <Typography variant="subtitle2"> Улица:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.object_address?.address_street?.name} </Typography>
                            <Typography variant="subtitle2"> Полный адрес:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.object_address?.raw_string} </Typography>
                            <Typography variant="subtitle2"> Общая площадь, м<sup><small>2</small></sup>: </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.square} </Typography>
                            <Typography variant="subtitle2"> Стоимость, ₽:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.price} </Typography>
                            <Typography variant="subtitle2"> Стоимость, ₽ м<sup><small>2</small></sup>  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.unit_price} </Typography>
                            <Typography variant="subtitle2"> Полное описание:  </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.full_description} </Typography>
                            <Typography variant="subtitle2"> Телефон: </Typography>
                            <Typography variant="body2" gutterBottom={true}> {props.advt.phone_number}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box component="div" sx={{ p: 2 }}>
                            <img
                                src={`https://orbn-image-server.s3.us-east-2.amazonaws.com/${props.advt.id}.jpg`}
                                onClick={() => setToggler(!toggler)}
                                style={{ cursor: "zoom-in" }}
                            />
                            {toggler && (
                                <Lightbox
                                    mainSrc={`https://orbn-image-server.s3.us-east-2.amazonaws.com/${props.advt.id}.jpg`}
                                    onCloseRequest={() => setToggler(!toggler)}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Fragment>
        )
    else
        return (
            <Fragment>
                <div className="col-3">
                </div>
                <div className="col-9">
                </div>
            </Fragment>
        )
}

const mapStateToProps = state => {
    return {
        advt: state.advts.advt
    };
}

export default connect(mapStateToProps, { getAdvt })(AdvtPage);