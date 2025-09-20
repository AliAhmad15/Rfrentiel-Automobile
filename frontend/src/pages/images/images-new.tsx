import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/images/imagesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    tag: 'Vueavant',

    generation: '',

}

const ImagesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/images/images-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label="Tag" labelFor="tag">
      <Field name="tag" id="tag" component="select">

        <option value="Vueavant">Vueavant</option>

        <option value="Vuearrière">Vuearrière</option>

      </Field>
  </FormField>

  <FormField label="Generation" labelFor="generation">
      <Field name="generation" id="generation" component={SelectField} options={[]} itemRef={'generations'}></Field>
  </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/images/images-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

ImagesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default ImagesNew
