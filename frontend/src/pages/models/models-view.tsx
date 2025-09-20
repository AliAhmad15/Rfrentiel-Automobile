import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/models/modelsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const ModelsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { models } = useAppSelector((state) => state.models)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View models')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View models')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/models/models-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ModelName</p>
                    <p>{models?.name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Brand</p>

                        <p>{models?.brand?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Generations Model</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>GenerationName</th>

                            </tr>
                            </thead>
                            <tbody>
                            {models.generations_model && Array.isArray(models.generations_model) &&
                              models.generations_model.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/generations/generations-view/?id=${item.id}`)}>

                                    <td data-label="name">
                                        { item.name }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!models?.generations_model?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/models/models-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ModelsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ModelsView;
