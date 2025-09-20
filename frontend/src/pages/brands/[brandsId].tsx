import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/brands/brandsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditBrands = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'name': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { brands } = useAppSelector((state) => state.brands)

  const { brandsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: brandsId }))
  }, [brandsId])

  useEffect(() => {
    if (typeof brands === 'object') {
      setInitialValues(brands)
    }
  }, [brands])

  useEffect(() => {
      if (typeof brands === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (brands)[el])

          setInitialValues(newInitialVal);
      }
  }, [brands])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: brandsId, data }))
    await router.push('/brands/brands-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit brands')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit brands'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="BrandName"
    >
        <Field
            name="name"
            placeholder="BrandName"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/brands/brands-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditBrands.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditBrands
