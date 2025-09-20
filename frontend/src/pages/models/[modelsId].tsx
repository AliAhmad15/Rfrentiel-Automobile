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

import { update, fetch } from '../../stores/models/modelsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditModels = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'name': '',

    brand: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { models } = useAppSelector((state) => state.models)

  const { modelsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: modelsId }))
  }, [modelsId])

  useEffect(() => {
    if (typeof models === 'object') {
      setInitialValues(models)
    }
  }, [models])

  useEffect(() => {
      if (typeof models === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (models)[el])

          setInitialValues(newInitialVal);
      }
  }, [models])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: modelsId, data }))
    await router.push('/models/models-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit models')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit models'} main>
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
        label="ModelName"
    >
        <Field
            name="name"
            placeholder="ModelName"
        />
    </FormField>

    <FormField label='Brand' labelFor='brand'>
        <Field
            name='brand'
            id='brand'
            component={SelectField}
            options={initialValues.brand}
            itemRef={'brands'}

            showField={'name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/models/models-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditModels.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditModels
