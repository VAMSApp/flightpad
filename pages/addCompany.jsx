import { useEffect, useState, } from 'react'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
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

export async function getServerSideProps(context) {
    const prisma = new PrismaClient()
    const worlds = await prisma.world.findMany().then((x) => JSON.stringify(x));

    return {
        props: {
            worlds,
        }
    }
}

export default function AddCompany({ worlds, }) {
    const initialState = {
        formDefaults: null,
        firstLoad: true,
    }
    const [state, setState] = useState(initialState)
    const {
        formDefaults,
        firstLoad,
    } = state
    
    const router = useRouter()

    const addCompany = async (values) => {
        console.log('addCompany()', values)
        await doAddCompany(values).then((company) => {
            router.push('/')
        })
    }
      
    function storeAddCompanyDefaults(x) {
        localStorage.setItem('addCompanyDefaults', JSON.stringify(x))
    }

    useEffect(function() {
        function loadAddCompanyDefaults() {
            let x = localStorage.getItem('addCompanyDefaults')
            x = (x) ? JSON.parse(x) : null
            console.log('addCompanyDefaults', x)
            return x
        }

        if (firstLoad) {
            let x = loadAddCompanyDefaults()
            console.log('useEffect firstLoad()', x)
            if (x) {
                setState({
                    formDefaults: x,
                    firstLoad: false
                })
            }
        }
    }, [state, firstLoad])

    return (<div>
        <Row>
            <Col>
                <h1>Add a new company</h1>
            </Col>
        </Row>
        <Row>
            <AddCompanyForm
                doSubmit={addCompany}
                worlds={worlds}
                defaults={formDefaults}
                storeDefaults={storeAddCompanyDefaults}
            />
        </Row>
    </div>)
}