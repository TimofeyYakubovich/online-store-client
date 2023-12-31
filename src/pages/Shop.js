import React, { useContext, useEffect } from 'react';
import {Container, Button, Card, Form, Row, Col} from 'react-bootstrap'
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviseAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {

        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count) // сколько товаров получили что бы посчитать количество страниц
        })
    }, [device.page, device.selectedType, device.selectedBrand])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 8).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count) // сколько товаров получили что бы посчитать количество страниц
        })
    }, [])

    

    return (
        <Container>
            <Row className='mt-2'>
                {/* строка состоит из 12 колонок */}
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;