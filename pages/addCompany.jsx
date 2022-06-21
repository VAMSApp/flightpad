import Head from 'next/head'
import Image from 'next/image'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import _ from 'lodash'
import { AddCompanyForm } from 'components/company'
import { companyService } from 'services/company.service'

async function doAddCompany(payload, opts) {
    console.log('doAddCompany()', payload)
    return await companyService.create(payload)
}

export default function AddCompany(props) {

    const addCompany = async (values) => {
        console.log('addCompany()', values)
        await doAddCompany(values)
    }

    return (<div>
        <Row>
            <Col>
                <h1>Add a new company</h1>
            </Col>
        </Row>
        <Row>
            <AddCompanyForm
                doSubmit={addCompany}
            />
        </Row>
    </div>)
}