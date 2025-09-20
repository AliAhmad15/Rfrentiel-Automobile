import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/generations/generationsSlice'
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

const GenerationsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { generations } = useAppSelector((state) => state.generations)

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
              <title>{getPageTitle('View generations')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View generations')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/generations/generations-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>GenerationName</p>
                    <p>{generations?.name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Model</p>

                        <p>{generations?.model?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Images Generation</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Tag</th>

                            </tr>
                            </thead>
                            <tbody>
                            {generations.images_generation && Array.isArray(generations.images_generation) &&
                              generations.images_generation.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/images/images-view/?id=${item.id}`)}>

                                    <td data-label="tag">
                                        { item.tag }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!generations?.images_generation?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/generations/generations-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

GenerationsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default GenerationsView;
