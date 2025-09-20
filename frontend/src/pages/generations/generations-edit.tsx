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

import { update, fetch } from '../../stores/generations/generationsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditGenerationsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'name': '',

    model: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { generations } = useAppSelector((state) => state.generations)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof generations === 'object') {
      setInitialValues(generations)
    }
  }, [generations])

  useEffect(() => {
      if (typeof generations === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (generations)[el])
          setInitialValues(newInitialVal);
      }
  }, [generations])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/generations/generations-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit generations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit generations'} main>
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
        label="GenerationName"
    >
        <Field
            name="name"
            placeholder="GenerationName"
        />
    </FormField>

  <FormField label='Model' labelFor='model'>
        <Field
            name='model'
            id='model'
            component={SelectField}
            options={initialValues.model}
            itemRef={'models'}

            showField={'name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/generations/generations-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditGenerationsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditGenerationsPage
